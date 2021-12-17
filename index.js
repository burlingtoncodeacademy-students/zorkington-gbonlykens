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

// calling start so the game runs
start();

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
  moveRoom: (Room) => {
    if (!Room.doorLocked) {
      player.currentRoom = Room;
    } else {
      console.log("The ${room.name} is locked!");
    }
  },
};

// <------------------------- Functions -------------------------->  //


    //for unlocking the Ice Age Door / or stays locked w/o item in inventory
    this.unlockIceAgeDoor = () => {
      if (player.inventory.includes(Item["boots"])) {
        if (this.doorLocked === false) {
          return "Because you have the boots, the door to the Ice Age Room has opened. You may proceed.";
        } else {
          return "You must possess the boots from the library before gaining entry to the Ice Age Room.";
        }
      }
    };

    //for unlocking the Cave Room Door / or stays locked w/o pumpkin in inventory
    this.unlockCaveRoomDoor = () => {
      if (player.inventory.includes(Item["pumpkin"])) {
        if (this.doorLocked === false) {
          return "This door has unlocked since you are in possession of the sacred Jack-O-Lantern.";
        } else {
          this.doorLocked === true;
          return "You must climb the giant tree in the Jungle Room to get the pumpkin before accessing the Cave Room.";
        }
      }
    };

    // for unlocking the Boardwalk / or stays locked w/o the trident in inventory
    this.unlockBoardwalkDoor = () => {
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

    this.unlockSunkenShipDoor = () => {
      if (player.inventory.includes(Item["armor"])) {
        if (this.doorLocked === false) {
          return "You may enter the Sunken Ship since you possess the Ancient Viking Armor.";
        } else {
          this.doorLocked === true;
          return "You cannot enter the Sunken Ship without the armor!";
        }
      }
    };


  desc_BOARDWALK:
    "You are standing on the Boardwalk." +
    "\nThere is a large sandcastle to the north." +
    "\nIf you dig in the spot where the sandcastle is, you might find something." +
    "\nThere is an exit to the east.",

  desc_MARINA:
    "You are standing in the marina room." +
    "\nThere are many boats docked here." +
    "\nTo find out which one to take, you might need to examine the boat key." +
    "\nThere is an exit to the north, leading to your next room.",

  desc_SUNKEN_SHIP_ROOM:
    "You've finally made it to the Sunken Ship Room." +
    "\nThere are no other exits." +
    "\nThe Viking's treasure is in the treasure chest on the west side of the ship." +
    "\nTake the treasure chest back to your boat!",


const actions = {
  // specific actions player can use
  moving: [
    "walk",
    "hike",
    "crawl through",
    "dig",
    "cut through",
    "enter",
    "go",
    "open",
  ],

  use: [
    "use",
    "read",
    "take"
  ],

  chest:[
    "open",
    "unlock",
    "close"
  ],

  drop: [
    "drop",
    "remove"
  ],
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
    this.locked = locked || true;
  }

  // ------ Item Class Methods ----- //

  // method for opening an item, mainly chests that are locked
  open() {
    if (this.locked) {
      console.log(
        `Oh no! You cannot open the ${this.name}. You must unlock it first!`
      );
    }
  }

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

  use() {
    if (this.name === "door4" && inventory.includes("parka")) {
      return "You can open door number four, since you have the parka in your inventory.";
    } else {
      return this.action;
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
  "can cut through a thick jungle",
  true
);

let gianttree = new Item(
  "giant tree",
  "a giant tree with enough footholds and thick branches to climb.",
  "climb tree",
  false
);

let pumpkin = new Item(
  "pumpkin",
  "a Sacred Jack-O-Lantern, or pumpkin, is seen hanging from a leaf of the tree as if it were ripe for plucking.",
  "can be used as a source of light later on, if needed.",
  true
);

let key = new Item("key", "a metal boat key", true);

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

// ------ Room Class ----- //
class Room {
  constructor(name, description, roomInventory, connectingRooms, doorLocked) {
    this.name = name;
    this.description = description;
    this.roomInventory = roomInventory || [];
    this.connectingRooms = connectingRooms;
    this.doorLocked = true;

    // ---------------- room objects ---------------- //
    let kitchen = new Room(
      "kitchen",
      "You are standing in a farmhouse-style kitchen." +
    "\nThere is an exit to the north." +
    "\nThere is something on the counter.",
      ["newspaper"],
      ["library"],
      false
      );

    let library = new Room (
      "library",
      "You are standing in the library." +
      "\nA small square room with walls soaring 20ft high and composed of bookshelves, filled with books." +
      "\nA pair of boots sit on the floor." +
      "\nThere is an exit door on the east side of the room.",
      ["boots"],
      ["arctic", "kitchen"],
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
    ["jungle", "library"],
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
    ["cave", "arctic"],
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
      "boardwalk",)
      
    let marina = new Room ("marina",)
    

// Item look-up table
let itemLookupTable = {
  newspaper: newspaper,
  boots: boots,
  chest: chest,
  armor: armor,
  machete: machete,
  tree: tree,
  pumpkin: pumpkin,
  trident: trident,
  book: book,
  "boat key": boatkey,
  boat: boat,
  treasure: treasure,
};

// Room look-up table
let roomLookUpTable = {
  kitchen: kitchen,
  library: library,
  arctic: arctic,
  jungle: jungle,
  cave: cave,
  boardwalk: boardwalk,
  marina: marina
};

async function start() {
  const welcomeMessage = `459 Ocean Ave.
You are standing on Ocean Avenue between Mediterranean Avenue and Seaweed Terrace.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log("Now write your code to make this work!");
  process.exit();
}

async function playGame() {
  let playerChoice = await ask("What would you like to do?");

  let inputArray = userAction.toLowerCase().split(" ");

  let action = inputArray[0];

  let target = inputArray.slice(1).join(" ");

  if (action === "use") {
    console.log(itemLookupTable[target].use());
  } else if (action === "take") {
    if (itemLookupTable[target] instanceof Item) {
      console.log(lookupTable[target] instanceof Item);
      console.log("That's not an item.");
    }
  }
  // } else if (action === " ")
}
//need to move a few things around, add a few components, modify user actions commands
