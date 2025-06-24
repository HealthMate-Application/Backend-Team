// SPDX-License-Identifier: MIT
// ======================== //     
// === Funding Contract === // 
// ======================== // 
pragma solidity  >=0.8.2 <0.9.0;

// + Crowdfunding Contract {{{ 
contract Crowdfunding{
    // ++ Global Vars {{{  
    string  public name;                // contract owner name 
    string  public desc;                // what is contract for ? 
    uint256 public goal;                // amount of money need to collect 
    uint256 public deadline;            // time limit on the contract 
    address public owner;               // owner of contract 
    bool    public paused;              // pause Compaign state 

    struct Tire {           
        string name;                    // name of tire 
        uint256 amount;                 // amount of money funded
        uint256 backers;                // people who fund me 
    }           
    Tire[] public tiers;                // Array for all tires in compaign 
    enum CampaignState { Active, Successful, Failed }
    CampaignState public state;  
    struct Backer{ 
        uint256                 totalContribution;      // A total Amount of Money Contributed so far 
        mapping(uint256 => bool) fundTiers;             // flag a tier index for a tire is funded
    }
    mapping(address => Backer) public backers; 
    // }}} 
    // ++ Global Modifiers {{{ 
   
    // Owner Modifier 
    modifier onlyOwner() {  // Modifier that checks the owner
        require(msg.sender == owner, "Not the owner");
        _; 
    }

    // Compaign State Modifier Open or Close  
    modifier campaignOpen() {  // Modifier that checks the state of contract 
        require(state == CampaignState.Active, "Campaign is not active.");  
        _; 
    }
    // Compaign State Modifier Pause or Working 
    modifier notPaused() { 
        require(!paused, "Contract is paused.");
        _; 
    }
    // }}} 
    
    // ++ Methods {{{ 
    // Constract func 
    constructor ( 
        address _owner, 
        string memory _name, 
        string memory _desc, 
        uint256 _goal, 
        uint256 _durationInDays
    ){
        name     = _name; 
        desc     = _desc; 
        goal     = _goal; 
        deadline = block.timestamp + (_durationInDays * 1 days); 
        owner    = _owner; 
        state    = CampaignState.Active;
    }

    // Check and Update Campaign Sate 
    function checkAndUpdateCampaignSate() internal  { 
        if(state == CampaignState.Active){
            if(block.timestamp >= deadline ){ 
                state = address(this).balance >= goal ? CampaignState.Successful : CampaignState.Failed ; 
            } else { 
                state = address(this).balance >= goal ? CampaignState.Successful  : CampaignState.Active ; 
            }
        }
    }

    // fund func 
    function fund(uint256 _tireIndex) public payable campaignOpen  notPaused { 
        // condition rules 
        require(_tireIndex < tiers.length, "Invaild tier.");
        require(msg.value == tiers[_tireIndex].amount, "Incorrect amount.");
        
        tiers[_tireIndex].backers++; 
        
        // Remember The Contributor and Their Founded Amount 
        backers[msg.sender].totalContribution += msg.value; 
        backers[msg.sender].fundTiers[_tireIndex] = true; 

        checkAndUpdateCampaignSate(); 
    }

    // refund func 
    function refund() public { 
        checkAndUpdateCampaignSate(); 
        require(state == CampaignState.Failed, "Refunds not available.");
        uint256 money = backers[msg.sender].totalContribution; 
        require(money > 0, "No Contribution to refund.");

        backers[msg.sender].totalContribution -= money; 
        payable(msg.sender).transfer(money);            // refund money to Contributor
    }
    // check fund tier 
    function hasFundTier(address _backer, uint256 _tierIndex) public view returns (bool){ 
        return backers[_backer].fundTiers[_tierIndex];
    }
    
    // withdraw func 
    function withdraw() public onlyOwner{ 
        // condition rules 
        checkAndUpdateCampaignSate(); 
        require(state == CampaignState.Successful, "Campaign not successful.");

        uint256 balance = address(this).balance; 
        require(balance > 0, "No balance to withdraw");

        payable(owner).transfer(balance); 
    }

    // get contract balance func  
    function getContractbalance() public  view returns (uint256) { 
        return address(this).balance; 
    }

    // add tire func 
    function addTire(
        string  memory _name,   
        uint256        _amount 
    ) public onlyOwner {
        require(_amount > 0, "Amount must be greater than 0.");
        tiers.push( Tire(_name, _amount, 1)); // Add new Tire to tires. 
    }

    // remove tire func     
    function removeTire(uint256 _tireIndex) public onlyOwner { 
        require(_tireIndex < tiers.length, "Tire index is invaild.");
        // delete tiers[_tireIndex]; // Use Method Delete To Remove a Tire 
        tiers[_tireIndex] = tiers[tiers.length -1 ]; 
        tiers.pop(); 
    }
    
    // list tires func 
    function getTires() public view returns (Tire[] memory) { 
        return tiers; 
    }
    
    // pause Compaign 
    function togglePause() public onlyOwner { 
        paused = !paused; 
    }

    // get campaign status func 
    function getCampaignStatus() public view returns(CampaignState){
        if (state == CampaignState.Active && block.timestamp >= deadline ){ 
                return address(this).balance < goal ? CampaignState.Failed : CampaignState.Successful;
        }
        return state; 
    } 

    // extend deadline func 
    function extendDeadline(uint256 _days) public onlyOwner campaignOpen { 
        deadline += _days * 1 days; 
    }
    // }}} 
}   
// }}} 
