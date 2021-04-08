addLayer("o", {
    name: "Oak", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
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

    layerShown(){return true},

    passiveGeneration() {
        let gain = new Decimal(0)
        if ( amount = getBuyableAmount(this.layer, 11)) gain = gain.plus(getBuyableAmount(this.layer, 11)).times(0.1);
        if ( hasUpgrade("o", 11)) gain = gain.plus(getBuyableAmount(this.layer, 11)).times(0.2);
        return gain
    },

    tabFormat: {
        "Main":{
            content: [
                "main-display", 
                "prestige-button", "resource-display",
                "blank",
                "buyables", 
                "upgrades",]
        },
        "Milestones":{
            content: [
                "main-display", 
                "prestige-button", "resource-display",
                "blank",
                "milestones",]
        }
    },

    milestones: {
        0: {
            requirementDescription: "10 Oak Logs",
            effectDescription: "Unlock Lumber Merchant and Double Work Gain",
            done() { return player.o.best.gte(10) },
        },
        1: {
            requirementDescription: "50 Oak Logs",
            effectDescription: "Unlock Minions for this layer and Double Work Gain",
            done() { return player.o.best.gte(50) },
        },
        2: {
            requirementDescription: "100 Oak Logs",
            effectDescription: "Unlock Foraging layer and Double Work Gain",
            done() { return player.o.best.gte(100) },
        },
    },

    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "Oak Minion 1",
            unlocked() { return hasMilestone("o", 1) }, 
            cap() { 
                let cap = new Decimal(10)
                return cap
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(80)
                let amount = getBuyableAmount("o", 11)
                if (amount.gt(0)) cost = cost.mul(2);
                if (amount.gt(1)) cost = cost.mul(2);
                if (amount.gt(2)) cost = cost.mul(2);
                if (amount.gt(3)) cost = cost.mul(2);
                return cost
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = ((player[this.layer].buyables[this.id].gte(data.cap)?"MAXED":(("Cost: " + formatWhole(data.cost) + " Oak Logs")))+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+" / "+formatWhole(data.cap)+"\n\
                Each Minion produces 10% of your Oak Log gain per second \n\ Make the 10% above update with upgrades")
                return display;
            },
            canAfford () { return player.o.points.gte(this.cost()) && player[this.layer].buyables[this.id].lt(tmp[this.layer].buyables[this.id].cap) },
            buy() {
                player.o.points = player.o.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, amount.add(1))
            }
        },
    },

    upgrades: {
        rows: 1,
        cols: 2,
        11: {
            title: "Minion Tier 2",
            description: "Doubles Minion Output to 20%, Resets Minion count to 1, and Doubles Minion costs.",
            unlocked() { return hasMilestone("o", 1) },
            cost: new Decimal("100"),
        },
    },
})

addLayer("foraging", {
    name: "Foraging", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Foraging Skill Points", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)

    layerShown(){return hasMilestone("o", 2)},

    milestones: {
        0: {
            requirementDescription: "3 Oak Milestones",
            effectDescription: "Unlock Birch Forest, not implemented yet",
            done() { return hasMilestone("o", 2) },
        },
    },

    tabFormat: {
        "Main":{
            content: ["main-display", "milestones"]
        },
    }
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

    layerShown(){return player.o.best.gte(10)},

    upgrades: {
        rows: 1,
        cols: 2,
        11: {
            title: "Rookie Axe",
            description: "Doubles all log gains",
            cost: new Decimal("12"),
        
        },
        12: {
            title: "Promising Axe",
            description: "Boosts log gain based on current number of that log type",
            cost: new Decimal("35"),
            effect() {
                let  eff = Decimal.pow(2, player.o.points.plus(1).log10().pow(.8));
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
    },

    buyables: {
        rows: 1,
        cols: 1,
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
