let modInfo = {
	name: "The Skypixel Hyblock Tree",
	id: "hypixeltree",
	author: "Thane-Stus",
	pointsName: "Work",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.1",
	name: "The Forests for the Trees",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2.1, The Forests for the Trees</h3><br>
		- Fixed Work gain being way too high<br><br>
	<h3>v0.2.0, The Forests for the Trees</h3><br>
		- Added Spruce, Dark Oak, Acacia, and Jungle logs and their associated Enchanted layers<br>
		- This save wont work with any made on v0.1 or v0.1.5<br><br>
	<h3>v0.1.5, Oak and Cobble and Birch</h3><br>
	 	- Added Birch and Enchanted Birch layer<br><br>
	<h3>v0.1, Oak and Cobble</h3><br>
		- Added Oak, Cobblestone, Enchanted Oak, and Enchanted Cobblestone layers`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("ol", 11)) {gain = gain.add(1)};
	if(hasUpgrade("cb", 11)) {gain = gain.add(1)};
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}