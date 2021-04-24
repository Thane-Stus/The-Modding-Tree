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
	num: "0.6.0",
	name: "Compactor II",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.6.0, Compactor II</h3><br>
		- Reworked Compactors into their own side layer.<br>
		- Next update is going to be more mine levels, atleast up to diamond.<br>
		- This version is probably incompatible with v0.5.0.<br><br>
	<h3>v0.5.0, Compactor I</h3><br>
		- Added Compactors which are automation for Enchanted stuff.<br>
		- Right now these go to level 3 and at that point will out produce the regular version of whatever.<br>
		- Probably gonna rework these into a weird buyable system later, this is mostly just figuring out how autobuyers for buyables works.<br>
		- Also tweaked some upgrade costs and made all milestones based on total instead of best.<br><br>
	<h3>v0.4.1, The Depths Bekon</h3><br>
		- Fixed some stuff, mostly things with the wrong names<br><br>
	<h3>v0.4.0, The Depths Bekon</h3><br>
		- Added Cobblestone and Coal layers<br>
		- These two layers combines introduce several minion boosting upgrades to all other layers<br>
		- This should be save compatible with v0.3.0 and v0.3.5<br><br>
	<h3>v0.3.5, The Forests for the Trees: Rewrite 2</h3><br>
		- Made the button for getting Enchanted stuff into a buyable<br>
		- This should be save compatible with 0.3.0<br><br>
	<h3>v0.3.0, The Forests for the Trees: Rewrite</h3><br>
		- Rewrote all Log/Foraging layers so now there is only 5 instead of 10<br>
		- Did this by redoing how Enchanted stuff is handled so they dont need their own layer<br>
		- Temporarily removed Cobblestone Mine, will readd this next update alongside a few other mines<br>
		- This version wont work with any saves made on v0.2.0 or v0.2.1<br><br>
	<h3>v0.2.1, The Forests for the Trees</h3><br>
		- Fixed Work gain being way too high<br><br>
	<h3>v0.2.0, The Forests for the Trees</h3><br>
		- Added Spruce, Dark Oak, Acacia, and Jungle logs and their associated Enchanted layers<br>
		- This version wont work with any saves made on v0.1 or v0.1.5<br><br>
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

	let gain = new Decimal(100000)
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