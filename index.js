const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// <------------------------- Player --------------------------> //
const player = {
  name: null,
  description: null,
  currentLocation: null,
  currentRoom: null,
  nextRoom: null,
  inventory: [],

  // view room method will list room inventory + pull from the desc from MapStrings const
  viewRoom: () => {
    return this.currentRoom.description;
  },

  // method for move/change rooms
  moveRoom: (currentLocation) => {
    if (!Room.doorLocked) {
      player.currentRoom = Room;
    } else {
      console.log(`The ${room.name} is locked!`);
    }
  },
};

// <------------------------- Unlocking Locked Rooms -------------------------->  //


    //for unlocking the Ice Age Door / or stays locked w/o item in inventory
    this.unlockArcticRoom = () => {
      if (player.inventory.includes(Item["boots"])) {
        if (this.doorLocked === false) {
          return "Because you have the boots, the door to the Ice Age Room has opened. You may proceed.";
        } else {
          return "You must possess the boots from the library before gaining entry to the Ice Age Room.";
        }
      }
    };

    // for unlocking the Boardwalk / or stays locked w/o the trident in inventory
    this.unlockBoardwalk = () => {
      if (player.inventory.includes(Item["trident"])) {
        if (this.doorLocked === false) {
          return "The trident you possess in your inventory has granted you access to the Boardwalk. You may enter.";
        } else {
          this.doorLocked === true;
          return "You may not enter the Boardwalk without the trident.";
        }
      }
    };

    //for unlocking Marina
    this.unlockMarinaDoor = () => {
      if (player.inventory.includes(Item["boat key"])) {
        if (this.doorLocked === false) {
          return "You have found the boat key at the Boardwalk. Good job. You may enter the Marina.";
        } else {
          this.doorLocked === true;
          return "You need the boat key to enter the Marina!";
        }
      }
    };

    //for unlocking Ocean
    this.unlockOceanDoor = () => {
      if (player.inventory.includes(Item["boat"])) {
        if (this.doorLocked === false) {
          return "Because you have the boat in your possession. You can enter the Ocean Room.";
        } else {
          this.doorLocked === true;
          return "You need to take the boat at the marina to enter the Ocean Room!";
        }
      }
    };

    this.unlockShip = () => {
      if (player.inventory.includes(Item["armor"])) {
        if (this.doorLocked === false) {
          return "You may enter the Sunken Ship since you possess the Ancient Viking Armor.";
        } else {
          this.doorLocked === true;
          return "You cannot enter the Sunken Ship without the armor!";
        }
      }
    };

let inventory = [];

// <------------------------- Classes --------------------------->  //
// class for creating items
class Item {
  // constructor for item objects
  constructor(name, description, action, takeable) {
    // name and description required for all
    this.name = name;
    this.desc = description;
    // not all items have an action associated with them
    this.action = action || "nothing happens.";
    // some are takeable, some are not
    this.takeable = takeable || false;
   
  }

  // ------ Item Class Methods ----- //

  // method for opening an item, mainly chests that are locked
  open() {
    if (this.locked) {
      console.log(
        `Oh no! You cannot open the ${this.name}. You must unlock it first!`
      );
    }
  };

  // method for taking an item
  take() {
    if (!this.takeable) {
      // incase this item is already in player inventory
      if (player.inventory.includes(this.name)) {
        // informs player they already have that item
        console.log(
          `Good news! You already have the ${this.name} in your inventory!`
        );
      } else {
        // if this particular item isn't takeable
        console.log(`Sorry! The ${this.name} is not to be taken!`);
      }
      // if player wants to take inventory of items
      console.log(
        `In your inventory, you have: ${player.inventory.join(" , ")}`
      );
      // if the item is takeable and not currently in inventory
    } else {
      // log which item player is adding to inventory
      console.log(`You have put the ${this.name} into your inventory!`);
      // now since player has this item in their inventory, making it so that they cannot take the same item again
      this.takeable = false;
      // now a simple splicing of the room inventory to remove the item that the player just added to their inventory
      roomLookUpTable[player.currentRoom].roomInventory.splice(
        roomLookUpTable[player.currentRoom].roomInventory.indexOf(this.name),
        1
      );
      // after splicing off that item from room inventory, push that item to player's inventory
      player.inventory.push(this.name);
    }
  }


  // method for dropping an item in inventory
  drop () {
    if (player.inventory.includes(this.name)) {
      // if the item does exist within their inventory at the time they want to drop it
      let roomInventory = roomLookUpTable[player.currentRoom].roomInventory;

      // specifiy the item name in player inventory
      let itemToDrop = player.inventory.splice(player.inventory.indexOf(this.name),
      1);
      // move the dropped inventory item into the player's current room's inventory
      roomInventory.push(itemToDrop.toString());
      // now that dropped item is dropped in the current room, make it takeable again
      this.takeable = true;
      console.log(`You have removed the ${this.name} from your inventory!`);
    } else {
      console.log(`You cannot drop the ${this.name} because it is not in your inventory!`);
    }
  }

  // method for viewing an item
  examine() {
    console.log(`You see ${this.description}`);
  }
}


// ---- list of items ---- //

let newspaper = new Item(
  "newspaper",
  "The newspaper displays several articles.\nThere are numbers circled in red ink:\nThe date 'April 5th.\nThe number '9', in the article, '9 Sharks Spotted near Miami Beach'.\nAnd in the article, 'Twenty-two Palm Trees Fall Due to Storm,' the number is circled.",
  true
);

let boots = new Item(
  "boots",
  "warm winter boots",
  "looks like they would be useful in a snow-filled room",
  true
);

let machete = new Item(
  "machete",
  "the machete may be useful in a jungle",
  "cut",
  true
);


let key = new Item(
  "key",
  "a metal boat key",
  "use key",
  true
  );

let boat = new Item(
  "boat",
  "the boat has a slot for a key and requires it to drive to the orange bouy.",
  "drive boat",
  true
);

let chest = new Item(
  "chest",
  "the treasure lies within the chest",
  "open chest",
  true
);

let treasure = new Item(
  "treasure",
  "the treasure lies within the sunken Viking ship",
  "take treasure",
  true
);


// ------------------------------- Room Class -------------------------------- //
class Room {
  constructor(name, description, roomInventory, connectingRooms, locked) {
    this.name = name;
    this.description = description;
    this.roomInventory = [roomInventory];
    this.locked = false

    // ---------------- room objects ---------------- //
    let kitchen = new Room (
      "kitchen",
      "You are standing in a farmhouse-style kitchen." +
    "\nThere is an exit to the north." +
    "\nThere is something on the counter.",
      ["newspaper"],
      false
      );

    let library = new Room (
      "library",
      "You are standing in the library." +
      "\nA small square room with walls soaring 20ft high and composed of bookshelves, filled with books." +
      "\nA pair of boots sit on the floor." +
      "\nThere is an exit door on the east side of the room.",
      ["boots"],
      false
      );

    let arctic = new Room (
      "arctic",
      "You are in the Arctic Room." +
    "\nThis room has a floor made of thick ice." +
    "\nBeneath the ice there is a 10ft layer of clear, warm water." +
    "\nIn the center of the room there is a large circular hole cut into the ice." +
    "\nPerhaps there is something valuable down there.",
    ["chest"],
    true
      );

    let jungle = new Room (
      "jungle",
      "You are standing in the Jungle Room." +
    "\nYou are surrounded by thick, luscious vegetation; much like a forest or jungle." +
    "\nThere is an enormously tall tree that is in the center of the room." +
    "\nNext to you is a machete, resting on a tree stump." +
    "\nThere is also a sacred Jack-O-Lantern that hangs on the tree, like a ripe fruit." +
    "\nIt may also be refered to as a 'pumpkin'." +
    "\nIt may prove useful to you on your quest.",
    ["machete", "pumpkin", "tree"],
    false
      );

    let cave = new Room (
      "cave",
      "You are finally standing in the Cave Room." +
    "\nThe rounded walls are made of cold, damp rock." +
    "\nThe trident, needed to slay the sea monster is speculated to be hidden in this room." +
    "\nThere are three passageways in this room:" +
    "\nThe south exit from which you came," +
    "\nAnd a north exit, which leads to the boardwalk next to the marina.",
    ["trident"],
    true
      );

    let boardwalk = new Room (
      "boardwalk",
      "You are standing on the Boardwalk." +
    "\nThere is a large sandcastle to the north." +
    "\nIf you dig in the spot where the sandcastle is, you might find something." +
    "\nThere is an exit to the east.",
    ["boat key"],
    );

    let marina = new Room (
      "marina",
      "You are standing in the marina room." +
      "\nThere are many boats docked here." +
      "\nTo find out which one to take, you might need to examine the boat key." +
      "\nThere is an exit to the north, leading to your next room.",
      ["boat"],
      );

      let ship = new Room(
        "ship",
        "You've finally made it to the Sunken Ship Room." +
        "\nThere are no other exits." +
        "\nThe Viking's treasure is in the treasure chest on the west side of the ship." +
        "\nTake the treasure chest back to your boat!",
        ["chest", "treasure"],
      );
  }
}
    
// --------------------------- Look Up Tables --------------------------- //
// Item look-up table
let itemLookupTable = {
  'newspaper': newspaper,
  'boots': boots,
  'chest': chest,
  'armor': armor,
  'machete': machete,
  'trident': trident,
  'boat key': boatkey,
  'boat': boat,
  'chest': chest,
  'treasure': treasure,
};

// Room look-up table
let roomLookUpTable = {
  'kitchen': kitchen,
  'library': library,
  'arctic': arctic,
  'jungle': jungle,
  'cave': cave,
  'boardwalk': boardwalk,
  'marina': marina,
  'ship': ship,
};

// Look up table for actions 
const actions = {
  move: [
    "walk",
    "crawl",
    "dig",
    "dive",
    "swim",
    "jump",
    "cut",
    "enter",
    "go",
    "run",
    "drive",
    "move"
  ],
  use: [
    "use",
    "read",
    "take"
  ],
  examine: [
    "examine",
    "read",
    "view"
  ],

  chest: [
    "open",
    "unlock",
    "close"
  ],

  drop: [
    "drop",
    "remove",
    "throw",
    "leave"
  ],
}

// --------------------------- State Changes --------------------------- //

// table for what rooms connect to each other
let connectingRooms = {
  'kitchen': { canMoveTo: ['library'] },
  'library': { canMoveTo: ['kitchen', 'arctic'] },
  'arctic': { canMoveTo: ['library', 'jungle'] },
  'jungle': { canMoveTo: ['arctic', 'cave'] },
  'cave': { canMoveTo: ['jungle', 'boardwalk'] },
  'boardwalk': { canMoveTo: ['cave', 'marina'] },
  'marina': { canMoveTo: ['boardwalk', 'ship'] },
  'ship': {canMoveTo: ['marina']}
};

// player's starting room
let currentState = 'kitchen'

// --------------------------- Game --------------------------- //

const welcomeMessage = `459 Ocean Ave.
You are standing on Ocean Avenue between Mediterranean Avenue and Seaweed Terrace. Your objective is to reach the ship room, 'open' the chest to retrieve the Ancient Viking treasure, put the boat into your inventory, and execute the action 'drive' into the horizons of the sea. 
There is a door here.`;

async function start() {
  console.log(welcomeMessage);
 // userAction variable stores input from player
  let userAction = await ask("What would you like to do?");
// sanitizing player input and makes it lower case
  let inputArray = userAction.toLowerCase().split(" ");
// takes input array at index 0
  let action = inputArray[0];
// checks the last input and join finds it in the look up table, takes the input array and slices it at the first index of array then joins back together
  let target = inputArray.slice(1).join(" ");

  // nested else-ifs depending on what route the player decides to take
  if (action === "use") {
    console.log(itemLookupTable[target] instanceof Item); 
      // condition for if an item exists in player's current room & is takeable
      start();
      
    } else if (action === "take"){
      if (itemLookupTable[target] instanceof Item.takeable) {
        // item is takeable
        console.log(itemLookupTable[target].take());
        start();
      } else {
        // item is not takeable
        console.log("You cannot take that.");
      }
    } else if (action === "examine") {
      // allows player to examine and get description of item
      itemLookupTable[target].examine();
      start();
    } else if (action === "drop") {
      // drops an item as described in player method above
      console.log(itemLookupTable[target].drop());
    } else if (action === "move") {
      roomLookUpTable[target].connectingRooms.moveRoom();
    } else {
      console.log("Please enter a valid response");
      start();
    }
       
  } 
 

//starts game
start();

