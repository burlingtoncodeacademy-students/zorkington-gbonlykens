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
// ------------------------- Player --------------------------  //
start();

//player 'deafults' makes sense to make it a const
const player = {
  name: null,
  description: null,
  currentLocation: null,
  currentRoom: null,
  nextRoom: null,
  inventory: [],


  // ------------------------- Functions --------------------------  //

  //viewing the room should list room inventory + pull from the const MapStrings for description
  viewRoom: () => {
    return this.currentRoom.description(MapStrings)
  },

  // to move/change rooms, more commonly move to next room
  moveRoom: (Room) => {
    if (!Room.doorLocked) {
      player.currentRoom = Room
    } else {
      console.log("The ${room.name} is locked!")
    }
  }
}



class Room {
  constructor(name, description, inventory, north, east, south, west) {

    this.name = name;
    this.description = description(Room.includes.MapStrings);
    this.inventory = inventory || [];
    this.doorLocked = true || false;
    //directions by compass
    this.north = north || null;
    this.east = east || null;
    this.south = south || null;
    this.west = west || null;

    //for unlocking the Ice Age Door / or stays locked w/o item in inventory
    this.unlockIceAgeDoor = () => {
      if (player.inventory.includes(Item['boots'])) {
        if (this.doorLocked === false) {
          return ("Because you have the boots, the door to the Ice Age Room has opened. You may proceed.")
        } else {
          return ("You must possess the boots from the library before gaining entry to the Ice Age Room.")
        }
      }
    };

    //for unlocking the Cave Room Door / or stays locked w/o pumpkin in inventory
    this.unlockCaveRoomDoor = () => {
      if (player.inventory.includes(Item['pumpkin'])) {
        if (this.doorLocked === false) {
          return ("This door has unlocked since you are in possession of the sacred Jack-O-Lantern.")
        } else {
          this.doorLocked === true;
          return ("You must climb the giant tree in the Jungle Room to get the pumpkin before accessing the Cave Room.")
        }
      }
    };

      // for unlocking the Boardwalk / or stays locked w/o the trident in inventory
    this.unlockBoardwalkDoor = () => {
      if (player.inventory.includes(Item['trident'])) {
        if (this.doorLocked === false) {
          return ("The trident you possess in your inventory has granted you access to the Boardwalk. You may enter.")
        } else {
          this.doorLocked === true;
          return ("You may not enter the Boardwalk without the trident.")
        }
      }
    };

    //for unlocking Marina 
    this.unlockMarinaDoor = () => {
      if (player.inventory.includes(Item['boat key'])) {
        if (this.doorLocked === false) {
          return ("You have found the boat key at the Boardwalk. Good job. You may enter the Marina.")
        } else {
          this.doorLocked === true;
          return ("You need the boat key to enter the Marina!")
        }
      }
    };

    //for unlocking Ocean
    this.unlockOceanDoor = () => {
      if (player.inventory.includes(Item['boat'])) {
        if (this.doorLocked === false) {
          return ("Because you have the boat in your possession. You can enter the Ocean Room.")
        } else {
          this.doorLocked === true;
          return ("You need to take the boat at the marina to enter the Ocean Room!")
        }
      }
    };

    this.unlockSunkenShipDoor = () => {
      if (player.inventory.includes(Item['armor'])) {
        if (this.doorLocked === false) {
          return ("You may enter the Sunken Ship since you possess the Ancient Viking Armor.")
        } else {
          this.doorLocked === true;
          return ("You cannot enter the Sunken Ship without the armor!")
        }
      }
    };



  }
}

//const for when player enters a particular room (MapStrings)
//These are the strings for each room & pathway that will log when prompted
const MapStrings = {

  desc_KITCHEN: "You are standing in a farmhouse-style kitchen."
  + "\nThere is an exit to the north."
  +"\nThere is something on the counter.",

  desc_LIBRARY: "You are standing in the library."
  + "\nA small square room with walls soaring 20ft high and composed of bookshelves, filled with books."
  + "\nThere is a coatrack in the southeast corner of the room, where a pair of boots sit beside it."
  + "\nThere is an exit door on the east side of the room."
  + "\nThere is also a hidden doorway, disguised as a bookshelf on the west side of the room."
  + "\nYou may need to examine an item in your inventory if you wish to pass through this door.",

  desc_ICE_AGE_ROOM: "You are in the Ice Age Room."
  + "\nThis room has a floor made of thick ice."
  + "\nBeneath the ice there is a 10ft layer of clear, warm water."
  + "\nIn the center of the room there is a large circular hole cut into the ice."
  + "\nPerhaps there is something valuable down there.",

  desc_ICE_AGE_PATHWAY: "You have entered the Ice Age Passage."
  + "\nThere is a small, narrow, igloo-like tunnel leading to the next room."
  + "\nYou must crawl through the tunnel.",

  desc_JUNGLE_ROOM: "You are standing in the Jungle Room."
  + "\nYou are surrounded by thick, luscious vegetation; much like a forest or jungle."
  + "\nThere is an enormously tall and giant tree that is in the center of the room."
  + "\nNext to you is a machete, resting on a tree stump."
  + "\nThere is also a sacred Jack-O-Lantern that hangs on the giant tree, like a ripe fruit."
  + "\nIt may also be refered to as a 'pumpkin'."
  + "\nIt may prove useful to you on your quest.",

  desc_JUNGLE_PATHWAY: "You have made it to the Jungle Pathway."
  + "\nYou look down and see a one hundred foot drop to a river."
  + "\nIn front of you is a vine, which you may swing on to reach the north exit.",

  desc_CAVE_ROOM: "You are finally standing in the Cave Room."
  + "\nThe rounded walls are made of cold, damp rock."
  + "\nThe trident, needed to slay the sea monster is speculated to be hidden in this room."
  + "\nThere are three passageways in this room:"
  + "\nThe south exit from which you came,"
  + "\nThe west exit, which leads to a passage that connects to the library,"
  + "\nAnd a north exit, which leads to the boardwalk next to the marina.",

  desc_BOARDWALK: "You are standing on the Boardwalk."
  + "\nThere is a large sandcastle to the north."
  + "\nIf you dig in the spot where the sandcastle is, you might find something."
  + "\nThere is an exit to the east.",

  desc_MARINA: "You are standing in the marina room."
  + "\nThere are many boats docked here."
  + "\nTo find out which one to take, you might need to examine the boat key."
  + "\nThere is an exit to the north, leading to your next room.",

  desc_OCEAN: "You are in the ocean room."
  + "\nYou are surrounded by the steady, swaying tides of the ocean."
  + "\nYou must drive the boat to the north exit to reach your final room."
  + "\nBut beware, the sea monster is rumored to guard the Sunken Ship.",

  desc_SUNKEN_SHIP_ROOM: "You've finally made it to the Sunken Ship Room."
  + "\nThere are no other exits."
  + "\nThe Viking's treasure is in the treasure chest on the west side of the ship."
  + "\nTake the treasure chest back to your boat!",

};


const actions = {
  moving: ['walk', 'hike', 'crawl through', 'dig', 'cut through', 'enter', 'go', 'open'],
  use: ['use', 'read', 'take'],
  chests: ['open', 'unlock', 'close'],
  drop: ['drop', 'remove']
}

let inventory = [];

// class for creating items
class Item {
  constructor(name, description, action, takeable) {
    this.name = name;
    this.desc = description;
    this.action = action || "nothing happens.";
    this.takeable = takeable || false;
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `You have picked up the ${this.name}`;
    } else {
      return "You cannot take that item.";
    }
  }

  use() {
    if (this.name === "door4" && inventory.includes("parka")) {
      return "You can open door number four, since you have the parka in your inventory.";
    } else {
      return this.action;
    }
  }
}

// list of items

let newspaper = new Item(
  "folded newspaper",
  "The newspaper displays several articles.\nThere are numbers circled in red ink:\nThe date 'April 5th.\nThe number '9', in the article, '9 Sharks Spotted near Miami Beach'.\nAnd in the article, 'Twenty-two Palm Trees Fall Due to Storm,' the number is circled.",
  "It looks like there may be something written on the newspaper in red ink.",
  true
);

let sandwich = new Item("sandwich", "the sandwich is half-eaten", false);

let coatrack = new Item(
  "coatrack",
  "the coatrack is placed in the corner of the library.",
  false
);

let boots = new Item(
  "boots",
  "warm winter boots",
  "looks like they would be useful in a snow-filled room",
  true
);

let armor = new Item(
  "armor",
  "the Ancient Viking Armor was inside the chest",
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


let trident = new Item(
  "trident",
  "the trident is rumored to be the only weapon able to kill the Kraken",
  true
);

let book = new Item(
  "book",
  "a book with a turquoise spine\nthe title is 'VIKINGS'\nIt sits on a bookshelf on the west side of the library.",
  "open book",
  true
);


let boatkey = new Item("boatkey" || "boat key", "a metal boat key", true);

let boat = new Item(
  "boat",
  "the boat has a slot for a key and requires it to drive to the orange bouy.",
  "drive boat",
  true
);

let treasure = new Item(
  "treasure",
  "the treasure lies within the sunken Viking ship",
  "take treasure",
  true
);

let itemLookupTable = {
  newspaper: newspaper,
  sandwich: sandwich,
  coatrack: coatrack,
  boots: boots,
  chest: chest,
  armor: armor,
  machete: machete,
  "giant tree": gianttree,
  pumpkin: pumpkin,
  trident: trident,
  book: book,
  "boat key": boatkey,
  boat: boat,
  treasure: treasure
};

// add all rooms in map to room look-up table
let roomLookUpTable = {
  startingRoom: startingRoom,
}


async function start() {
  const welcomeMessage = `459 Ocean Ave.
You are standing on Ocean Avenue between Mediterranean Avenue and Seaweed Terrace.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log("Now write your code to make this work!");
  process.exit();
}

async function play() {
  let userAction = await ask("What would you like to do?");
  
  let inputArray = userAction.toLowerCase().split(" ");

  let action = inputArray[0];

  let target = inputArray.slice(1).join(" ");

  if (action === "use") {
    console.log(itemLookupTable[target].use());

  } else if (action === "take") {
    if (itemLookupTable[target] instanceof Item) {
      console.log(lookupTable[target] instanceof Item);
      console.log("That's not an item.")
    }
  // } else if (action === " ")
};
//need to move a few things around, add a few components, modify user actions commands