// SPDX-License-Identifier: MIT
// ============================ // 
// === Crwodfunding Facotry === //
// ============================ // 
pragma solidity  >=0.8.2 <0.9.0;

import {Crowdfunding} from "./Crwodfunding.sol"; 

// + Crwodfunding Factory Contract {{{ 
contract CrwodfundingFactory { 
    // ++ Global Vars {{{
    address public  owner; 
    bool    public  paused; 
    struct Campaign { 
        address campaignAddress; 
        address           owner; 
        string             name;
        uint256    creationTime;
    }
    Campaign[] public campaigns; 
    mapping(address => Campaign[]) public userCampaigns;
    // }}} 
    // ++ Modifiers {{{ 
    modifier onlyOnwer() { 
        require(msg.sender == owner, "You don't have permission for");
        _;
    }
    modifier notPaused() { 
        require(!paused, "Factory is paused");
        _;
    }
    // }}} 
    // ++ Methods {{{   
    constructor(){
        owner = msg.sender; 
    }
    // Create a Campaign
    function createCampaign(
        string  memory _name, 
        string  memory _desc, 
        uint256 _goal, 
        uint256 _duratoinInDays
    ) external notPaused { 
        Crowdfunding newCampaign = new Crowdfunding(msg.sender,_name,_desc,_goal,_duratoinInDays); 
        address campaignAddress = address(newCampaign);  
        Campaign memory campaign = Campaign({
            owner: msg.sender,
            creationTime : block.timestamp,
            name          : _name,
            campaignAddress     : campaignAddress
        }); // Create a new campaign 
        campaigns.push(campaign); // add campaign to array 
        userCampaigns[msg.sender].push(campaign); // attach campaign to its owner 
    }
    // list user campaigns 
    function getUsercampaigns(address _user) external view returns (Campaign[] memory) { 
        return userCampaigns[_user]; 
    }
    // list all campaigns 
    function getAllCampaigns() external view returns (Campaign[] memory) { 
        return campaigns;
    }
    // toggle pause 
    function togglePause() external onlyOnwer{ 
        paused = !paused; 
    } 
    // }}} 
}
// }}} 
