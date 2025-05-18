const catchAsync = require("express-async-handler");

const User = require("../models/user");
const Doctor = require("../models/doctorProfile");

// 1. Add constants for reusable values
const AGE_GROUPS = [
  { min: 10, max: 19, label: "10-19" },
  { min: 20, max: 29, label: "20-29" },
  { min: 30, max: 39, label: "30-39" },
  { min: 40, max: 49, label: "40-49" },
  { min: 50, max: 59, label: "50-59" },
  { min: 60, max: 69, label: "60-69" },
  { min: 70, max: 79, label: "70-79" },
  { min: 80, max: 89, label: "80-89" },
  { min: 90, max: 100, label: "90+" },
];

// 2. Create helper function for generating age grouping logic
const generateAgeBranches = (groups) => {
  return groups.map((group) => ({
    case: { $lt: ["$age", group.max + 1] },
    then: group.label,
  }));
};

// @desc Get dashboard statistics
// @route GET /api/v1/admin/dashboard/stats
// @access Private/Admin
exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // Get users statistics
  const userStats = await User.aggregate([
    // Handle potential missing values
    {
      $addFields: {
        age: { $ifNull: ["$age", 0] },
        gender: { $ifNull: ["$gender", "unknown"] },
      },
    },

    // Add age grouping
    {
      $addFields: {
        ageGroup: {
          $switch: {
            branches: generateAgeBranches(AGE_GROUPS),
            default: "unknown",
          },
        },
      },
    },

    // Group by role to get better separation of concerns
    {
      $facet: {
        // Overall user statistics
        allUsers: [
          {
            $group: {
              _id: null,
              totalUsers: { $sum: 1 },
              maleUsers: {
                $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] },
              },
              femaleUsers: {
                $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] },
              },
              ageAvg: { $avg: "$age" },
              minAge: { $min: "$age" },
              maxAge: { $max: "$age" },
            },
          },
        ],

        // Age distribution for all users
        ageGroups: [
          {
            $group: {
              _id: "$ageGroup",
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],

        // Patient statistics
        patients: [
          { $match: { role: "patient" } },
          {
            $group: {
              _id: null,
              totalPatients: { $sum: 1 },
              malePatients: {
                $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] },
              },
              femalePatients: {
                $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] },
              },
              ageAvg: { $avg: "$age" },
              minAge: { $min: "$age" },
              maxAge: { $max: "$age" },
            },
          },
        ],

        // Patient age distribution
        patientAgeGroups: [
          { $match: { role: "patient" } },
          {
            $group: {
              _id: "$ageGroup",
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],

        // Doctor statistics
        doctors: [
          { $match: { role: "doctor" } },
          {
            $group: {
              _id: null,
              totalDoctors: { $sum: 1 },
              maleDoctors: {
                $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] },
              },
              femaleDoctors: {
                $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] },
              },
              ageAvg: { $avg: "$age" },
              minAge: { $min: "$age" },
              maxAge: { $max: "$age" },
            },
          },
        ],

        // Doctor age distribution
        doctorAgeGroups: [
          { $match: { role: "doctor" } },
          {
            $group: {
              _id: "$ageGroup",
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
    },

    //  Project the data into a more usable structure
    {
      $project: {
        statistics: {
          users: { $arrayElemAt: ["$allUsers", 0] },
          userAgeGroups: "$ageGroups",
          patients: { $arrayElemAt: ["$patients", 0] },
          patientAgeGroups: "$patientAgeGroups",
          doctors: { $arrayElemAt: ["$doctors", 0] },
          doctorAgeGroups: "$doctorAgeGroups",
        },
      },
    },
  ]);

// Define default statistics structure
const defaultStats = {
  users: {
    totalUsers: 0,
    maleUsers: 0,
    femaleUsers: 0,
    ageAvg: 0,
    minAge: 0,
    maxAge: 0,
  },
  userAgeGroups: [],
  patients: {
    totalPatients: 0,
    malePatients: 0,
    femalePatients: 0,
    ageAvg: 0,
    minAge: 0,
    maxAge: 0,
  },
  patientAgeGroups: [],
  doctors: {
    totalDoctors: 0,
    maleDoctors: 0,
    femaleDoctors: 0,
    ageAvg: 0,
    minAge: 0,
    maxAge: 0,
  },
  doctorAgeGroups: [],
};

// Extract statistics with fallback to default values
const stats = userStats[0]?.statistics || defaultStats;

  // Get doctor specialization statistics
  const doctorSpecializationStats = await Doctor.aggregate([
    // Stage 1: Get the count of doctors by specialization
    {
      $facet: {
        // Count doctors by specialization
        specializationCounts: [
          {
            $group: {
              _id: "$specialization",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } }, // Sort by count in descending order
        ],

        // Get total count of distinct specializations
        distinctSpecializations: [
          {
            $group: {
              _id: null,
              specializations: { $addToSet: "$specialization" },
            },
          },
          {
            $project: {
              _id: 0,
              count: { $size: "$specializations" },
            },
          },
        ],
      },
    },

    // Stage 2: Project the data into a more usable structure
    {
      $project: {
        specializationSummary: {
          counts: "$specializationCounts",
          distinct: { $arrayElemAt: ["$distinctSpecializations", 0] },
        },
      },
    },
  ]);

  if (!userStats.length || !doctorSpecializationStats.length) {
    console.warn("No statistics found. This might indicate a database issue.");
  }

  // Extract results with default values for empty results
  const specializationStats = doctorSpecializationStats[0] || {
    specializationSummary: {
      counts: [],
      distinct: { count: 0 },
    },
  };

  res.status(200).json({
    status: "success",
    data: {
      stats,
      specializationStats,
    },
  });
});
