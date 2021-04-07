addLayer("o", {
    name: "Oak", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Oak Logs", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("lm", 11)) mult = mult.mul(2);
        if (hasUpgrade("lm", 12)) mult = mult.mul(upgradeEffect("lm",12));
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Gather Oak Log", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}

})

addLayer("lm", {
    name: "Lumber Merchant", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "LM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Coins", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)

    layerShown(){return true},

    upgrades: {
        rows: 1,
        cols: 2,
        11: {
            title: "Rookie Axe",
            description: "Boosts ALL log gains by 2",
            cost: new Decimal("12"),
        
        },
        12: {
            title: "Promising Axe",
            description: "Boosts ALL log gains based on total number of all logs",
            cost: new Decimal("35"),
            effect() {
                let ret = player.o.points.div(5).add(1);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
    },

    buyables: {
        rows: 1,
        cols: 3,
        11: {
            title: "Sell 10 Oak Logs",
            display: "Earn 20 Coins",
            cost() { return new Decimal(10) },
            canAfford () { return player.o.points.gte(this.cost()) },
            buy() {
                player.o.points = player.o.points.sub(this.cost())
                player[this.layer].points = player[this.layer].points.add(20)
                setBuyableAmount(this.layer, this.id, getBuyableAmt(this.layer, this.id).add(1))
            }
        },
    },

    tabFormat: {
        "Buy":{
            content: ["main-display", "upgrades"]
        },
        "Sell":{
            content: ["main-display", "buyables"]
        }
    }

})
