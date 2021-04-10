addLayer("o", {
    name: "Oak Forest", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Oak Logs", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("o", 11)) mult = mult.mul(2);
        if (hasUpgrade("o", 12)) mult = mult.mul(upgradeEffect("o",12));
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
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat: {
        "Main":{
            content: [
                "main-display", 
                "prestige-button", 
                "resource-display",
                "blank",
                "upgrades",
                "blank",
                "buyables",
                "blank",
                "milestones",]
        },
    },

    milestones: {
        0: {
            requirementDescription: "50 Oak Logs",
            effectDescription: "Unlock Oak Minions, Minions are automation",
            done() { return player.o.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Oak Logs",
            effectDescription: "(Coming Soon) Unlock Foraging Skill, Skills are Challenges",
            done() { return player.o.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Oak Logs",
            effectDescription: "ph", //Leaflet Armor in game, not sure what to do here for now
            done() { return player.o.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Oak Logs",
            effectDescription: "Unlocks Small Storage Upgrade, This upgrade shows in all trees with Minions",
            done() { return player.o.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Oak Logs",
            effectDescription: "ph", //Forest Biome Stick in game, not sure what to put here
            done() { return player.o.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Oak Logs",
            effectDescription: "Unlocks Enchanted Oak Logs Layer",
            done() { return player.o.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Oak Logs",
            effectDescription: "Unlocks Medium Storage Upgrade",
            done() { return player.o.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Oak Logs",
            effectDescription: "ph", //Wood Affinity Talisman, Make a talisman layer that lets you buy talismans when you unlock this, this one should cost 8 enchanted wood or something, and add tier 2 and tier 3 talismans too
            done() { return player.o.best.gte(10000) },
        },
        8: {
            requirementDescription: "30000 Oak Logs",
            effectDescription: "Unlocks Large Storage",
            done() { return player.o.best.gte(30000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Rookie Oak Axe",
            description: "x2 Oak Log Gain and +1 Work Gain",
            cost: new Decimal("10"),
        },
        12: {
            title: "Promising Oak Axe",
            description: "Boosts Oak Log gain based on current Oak Log count",
            cost: new Decimal("20"),
            effect() {
                //let  eff = Decimal.pow(2, player.o.points.plus(1).log10().pow(.8)); //Cant remember if I borrowed this from TPTR or DynasTree, either way its not getting used anymore so /shrug
                let eff = player[this.layer].points.add(1).ln().div(5).add(2) //Modified version of a formula from The Leveling Tree
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        21: {
            title: "Oak Minion I",
            description: "Generates 100% of Oak Log Gain per second",
            unlocked() { return hasMilestone("o", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("eol", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("eol", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("eol", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("eol", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("eol", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("eol", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("eol", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Oak Minion II",
            description: "Boosts first Oak Minion by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Oak Minion III",
            description: "Boosts first Oak Minion by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Oak Minion IV",
            description: "Boosts first Oak Minion by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //These should show in ALL layers, always costs Oak but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        31: {
            title: "Small Oak Storage",
            description: "Increases first Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("o", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            title: "Medium Oak Storage",
            description: "Increases first Minion gain by 33%",
            cost: new Decimal("8"),
            unlocked() { return hasUpgrade("o", 31) },
        },
        33: {
            title: "Large Oak Storage",
            description: "Increases first Minion gain by 33%",
            cost: new Decimal("256"),
            unlocked() { return hasUpgrade("o", 32) },
        },
    },
})

addLayer("eol", {
    name: "Enchanted Oak Logs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EOL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#66502e", // CHANGE ME
    resource: "Enchanted Oak Logs", // Name of prestige currency
    //This is honestly a fucking mess, but it works so /shrug
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    baseResource: "Oak Logs",
    baseAmount() { return player.o.points },
    requires: new Decimal(160),                         // Determines the formula used for calculating prestige currency.
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if(player.eol.points.gte(1)) mult = mult.div(2)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    canBuyMax() {return false},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("o", 5)},

    tabFormat: {
        "Main":{
            content: [
                "main-display", 
                "prestige-button", 
                "resource-display",
                "blank",
                "upgrades",
                "blank",
                "buyables",
                "blank",
                "milestones",]
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Oak Minion V",
            description: "Boosts first Oak Minion by 6%",
            unlocked() { return hasMilestone("o", 0) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Oak Minion VI",
            description: "Boosts first Oak Minion by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Oak Minion VII",
            description: "Boosts first Oak Minion by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Oak Minion VIII",
            description: "Boosts first Oak Minion by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Oak Minion IX",
            description: "Boosts first Oak Minion by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Oak Minion X",
            description: "Boosts first Oak Minion by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Oak Minion XI",
            description: "Boosts first Oak Minion by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})