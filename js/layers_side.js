addLayer("eq", { //This just exists so that Coins can be tied to a layer that isnt foraging, probably going to actually use this in the future as well.
    name: "Equipment",
    symbol: "EQ",
    position: 0,
    row: "side",
    color: "#4BDC13",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    requires: new Decimal(100),
    resource: "Coins",
    baseResource: "Stamina",
    baseAmount() {return player.points},
    type: "none",
    layerShown(){return false},
})