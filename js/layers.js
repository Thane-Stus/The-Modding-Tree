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

    tabFormat: {
        "Main":{
            content: [
                "main-display", 
                "prestige-button", 
                "blank",
                ["display-text",
				function() { return 'You have ' + format(player.o.points) + ' Oak Logs' } ],
                ["display-text",
				function() {return 'Your best Oak Logs is ' + formatWhole(player.o.best) },
					],
                "milestones",]
        },
        "Minions":{
            unlocked() { return hasMilestone("o", 1)},
            content: ["main-display", "prestige-button", "buyables", "upgrades",]
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
    }
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
