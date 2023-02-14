
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
    }
  
    get roomItem() {
      return this._roomItem
    }
  
    set name(value) {
      if (value.length < 4) {
        console.error("Room name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        console.error("Room description is too short.");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }
  
    set roomItem(value) {
      this._roomItem = value;
    }
  
    /**
     * a method to produce friendly room description
     * 
     * @returns {string} description of the room
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "Looking around the " + this._name + " you can see " + this._description;
    }
  
    /**
    * a method to add rooms to link rooms to this one
    * it does this by adding them to _linkedRooms
    * 
    * @param {string} direction the direction the other rooom is from this one
    * @param {object} roomToLink the room that is in that direction
    * @author Neil Bizzell
    * @version 1.0
    */
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    /**
     * a method to produce friendly description of linked rooms
     * 
     * @returns {array} descriptions of what rooms are in which direction
     * @author Neil Bizzell
     * @version 1.0
     */
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = " The " + room._name + " is to the " + direction;
        details.push(text);
      }
      return details;
    }
  
    /**
     * a method to move the adventurer to a new room
     * 
     * @param {string} direction the direction in which to move
     * @returns {object} the room moved to 
     * @author Neil Bizzell
     * @version 1.1
     */
    //method to move to a new room
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        //make better error msg method
        alert("You can't go that way",);
        return this;
      }
    }
  }
  
  class Item {
    constructor(name) {
      this._name = name,
        this._description = ""
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.error("Item name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        console.error("Item decription is too short.");
        return;
      }
      this._description = value;
    }
  
    /**
     * a method to produce friendly item description
     * 
     * @returns {string} description of the item
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "You have found the " + this._name + ", the " + this._name + " is " + this._description;
    }
  }
  
  class Character {
    constructor(name) {
      this._name = name,
        this._description = ""
      this._conversation = ""
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get conversation() {
      return this._conversation;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.error("Character name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        console.error("Character description is too short.");
        return;
      }
      this._description = value;
    }
  
    set conversation(value) {
      if (value.length < 4) {
        console.error("conversation is too short.");
        return;
      }
      this._conversation = value;
    }
  
    /**
     * a method to produce friendly character description
     * 
     * @returns {string} description of the character
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    /**
     * a method to produce friendly conversation text
     * 
     * @returns {string} the conversation text
     * @author Neil Bizzell
     * @version 1.0
     */
    converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
  }
  
  class Enemy extends Character {
    constructor(name) {
      super(name);
      this._weakness = "";
    }
    get weakness() {
  
    }
  
    set weakness(value) {
      if (value.length < 4) {
        console.error("Decription is too short.");
        return;
      }
      this._weakness = value;
    }
  
    /**
     * 
     * a method to determine the reult of fighting an enemy
     * 
     * @param {string} item the item used to fight the enemy 
     * @returns {boolean} the result of the fight true = win, falese = loose
     * @author Neil Bizzell
     * @version 1.0
     */
    fight(item) {
      //work out how to check what item to fight with and if in backpack
      if (item === this._weakness) {
        return true;
      } else {
        return false;
      }
    }
  
  }
  
  class Friend extends Character {
    constructor(name) {
      super(name)
      this._gift = ""
    }
  
    get gift() {
      return this._gift
    }
  
    set gift(value) {
      this._gift = value
    }
  
    hug() {
      //add how to give gift to player backpack
      return "you hug " + this._name + ", " + this._name + " is pleased and gives you a gift. You have been given the " + this._gift.name +
        ", the " + this._gift.name + "is " + this._gift.description;
    }
  
  }
  
  class Player {
    constructor() {
      this._backpack = []
      this._health = 10
    }
  
    get health() {
      return this._health
    }
  
    get backpack() {
      return this._backpack
    }
  
    /**
     * 
     * method to change player health value as a result of combat
     * 
     * @param {int} value number to change health by
     * @param {boolean} up flag to imdicate whcih way to modigy true for up
     * @returns {int} value of current player health.
     */
    changeHealth(value, up) {
      if (up) {
        this._health = this._health + value;
      } else {
        this._health = this._health - value;
      }
      return this._healh
    }
  
    /**
     * 
     * method to add item to players backpack
     * 
     * @param {Object} item the item to add to the backpack 
     */
    addToBackPack(item) {
      this._backpack.push(item);
    }
  
    /**
     * 
     * method to check if item exists in backpack
     * 
     * @param {object} item the item to be checked for 
     */
    checkBackPack(item) {
      for (let i = 0; i < this._backpack.length; i++) {
        if (list[i] === item) {
          return true;
        }
      }
      return false;
    }
  
  }
  
  
  
  //create the indiviual room objects and add their descriptions
  const Kitchen = new Room("kitchen");
  Kitchen.description = "a long narrow room with worktops on either side and a large bench in the middle";
  const Lounge = new Room("lounge");
  Lounge.description = "a large room with two sofas and a large fire place";
  const GamesRoom = new Room("Games Room");
  GamesRoom.description = "a large room with a pool table at it's centre";
  const Hall = new Room("hall");
  Hall.description = "a grand entrance hall with large paintings around the walls";
  
  //link the rooms together
  Kitchen.linkRoom("south", Lounge);
  Kitchen.linkRoom("east", Hall);
  Lounge.linkRoom("north", Kitchen);
  Lounge.linkRoom("east", GamesRoom);
  GamesRoom.linkRoom("west", Lounge);
  GamesRoom.linkRoom("north", Hall);
  Hall.linkRoom("south", GamesRoom);
  Hall.linkRoom("west", Kitchen);
  
  //add items
  const Cheese = new Item("Cheese");
  Cheese.description = "a smelly lump of Brie";
  const Sword = new Item("Sword");
  Sword.description = "a mighty elven blade with beautiful engraving and a deadly sharp blade."
  
  console.log(Sword)
  
  //add items to rooms
  GamesRoom.roomItem = Cheese;
  
  //add characters
  const Dave = new Enemy("Dave");
  Dave.conversation = "grrr brains";
  Dave.description = "a smelly Zombie";
  Dave.weakness = "Cheese";
  
  const Sarah = new Friend("Sarah");
  Sarah.conversation = "Hello will you be my friend";
  Sarah.description = "a friedly Skellington";
  Sarah.gift = Sword;
  
  console.log(Sarah);
  
  // add characters to rooms
  Kitchen.character = Dave;
  Lounge.character = Sarah;
  
  //create Player
  const thisPlayer = new Player();
  console.log(thisPlayer.health);
  
  
  /**
   * Subroutine to display information about the current room
   * 
   * @param {object} room the room to be displayed
   * @author Neil Bizzell
   * @version 1.0 
   */
  function displayRoomInfo(room) {
    let occupantMsg = "";
    let itemMsg = "";
    console.log(room);
    if (room.character === "") {
      if (room.roomItem == "") {
        occupantMsg = "";
      } else {
        console.log(room.roomItem.describe())
        occupantMsg = room.roomItem.describe();
      }
    } else {
      occupantMsg = room.character.describe() + ". ";
    }
  
    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  }
  
  function commandHandler(command, character) {
    switch (command) {
      case "fight":
        //work out how to pass items to fight method from player backpack
        if (character.fight() === true) {
          msg = "congratulations you defeated" + character.name;
          alert(msg)
        } else {
          alert("game over")
        }
        break;
      case "talk":
        msg = character.converse();
        alert(msg)
        break;
      case "hug":
        msg = character.hug();
        alert(msg)
        break;
      default:
        alert("not done yet")
        break;
      //blank command box after commands 
    }
  }
  

  function startGame() {
    //set and display start room
    currentRoom = Hall;
    displayRoomInfo(currentRoom);
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let command = document.getElementById("usertext").value.toLowerCase();
        const directions = ["north", "south", "east", "west"];
        const commands = ["fight", "hug", "talk", "take", "inventory"];
        if (directions.includes(command)) {
          currentRoom = currentRoom.move(command);
          displayRoomInfo(currentRoom);
        } else if (commands.includes(command)) {
          commandHandler(command, currentRoom.character)
        } else {
          document.getElementById("usertext").value = ""
          //change to text message for short time and then reshow
          alert("that is not a valid command please try again")
        }
      }
    });
  }
  