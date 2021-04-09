addLayer("o", {
    name: "Oak Forest", // This is optional, only used in a few places, If absent it just uses the layer id.
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
        if(hasUpgrade("o", 21)) gain = gain.plus(0.1);
        if(hasUpgrade("o", 22)) gain = gain.plus(0.1);
        if(hasUpgrade("o", 23)) gain = gain.plus(0.1);
        if(hasUpgrade("o", 24)) gain = gain.plus(0.1);
        if(hasUpgrade("o", 25)) gain = gain.plus(0.1);
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
                "milestones",]
        },
        "Crafting":{
            content: [
                "main-display", 
                "prestige-button", 
                "resource-display",
                "blank",
                "buyables",],
                unlocked(){
                        return hasMilestone("o", 3)
                }
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
            effectDescription: "Unlock Foraging Skill(Coming Soon)",
            done() { return player.o.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Oak Logs",
            effectDescription: "ph", //Leaflet Armor in game, not sure what to do here for now
            done() { return player.o.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Oak Logs",
            effectDescription: "Unlocks Small Storage, located in Crafting tab",
            done() { return player.o.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Oak Logs",
            effectDescription: "ph", //
            done() { return player.o.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Oak Logs",
            effectDescription: "Unlocks Enchanted Oak, located in Crafting tab",
            done() { return player.o.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Oak Logs",
            effectDescription: "Unlocks Medium Storage",
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
                let  eff = Decimal.pow(2, player.o.points.plus(1).log10().pow(.8));
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        21: {
            title: "Oak Minion I",
            description: "Generates 10% of Oak Log gain per second",
            unlocked() { return hasMilestone("o", 0) },
            cost: new Decimal("80"),
        },
        22: {
            title: "Oak Minion II",
            description: "Boosts Oak Log gain per second to 20%",
            unlocked() { return hasMilestone("o", 0) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Oak Minion III",
            description: "Boosts Oak Log gain per second to 30%",
            unlocked() { return hasMilestone("o", 0) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Oak Minion IV",
            description: "Boosts Oak Log gain per second to 40%",
            unlocked() { return hasMilestone("o", 0) },
            cost: new Decimal("512"),
        },
        25: {
            unlocked() { return hasMilestone("o", 5) },
            fullDisplay() {return "<h3>Oak Minion V</h3> <br>Boosts Oak Log gain per second to 50%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = getBuyableAmount(this.layer, 11)
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = getBuyableAmount(this.layer, 11)
                setBuyableAmount(this.layer, 11, amount.sub(8))
            },
        },
        31: {
            unlocked() { return hasMilestone("o", 5) },
            fullDisplay() {return "<h3>Oak Minion VI</h3> <br>Boosts Oak Log gain per second to 60%<br><br>Cost: 16 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = getBuyableAmount(this.layer, 11)
                if (amount.gte(16)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = getBuyableAmount(this.layer, 11)
                setBuyableAmount(this.layer, 11, amount.sub(16))
            },
        },
        32: {
            unlocked() { return hasMilestone("o", 5) },
            fullDisplay() {return "<h3>Oak Minion VII</h3> <br>Boosts Oak Log gain per second to 70%<br><br>Cost: 32 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = getBuyableAmount(this.layer, 11)
                if (amount.gte(32)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = getBuyableAmount(this.layer, 11)
                setBuyableAmount(this.layer, 11, amount.sub(32))
            },
        },
        33: {
            unlocked() { return hasMilestone("o", 5) },
            fullDisplay() {return "<h3>Oak Minion VIII</h3> <br>Boosts Oak Log gain per second to 80%<br><br>Cost: 64 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = getBuyableAmount(this.layer, 11)
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = getBuyableAmount(this.layer, 11)
                setBuyableAmount(this.layer, 11, amount.sub(64))
            },
        },
        34: {
            unlocked() { return hasMilestone("o", 5) },
            fullDisplay() {return "<h3>Oak Minion IX</h3> <br>Boosts Oak Log gain per second to 90%<br><br>Cost: 128 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = getBuyableAmount(this.layer, 11)
                if (amount.gte(128)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = getBuyableAmount(this.layer, 11)
                setBuyableAmount(this.layer, 11, amount.sub(128))
            },
        },
        35: {
            unlocked() { return hasMilestone("o", 5) },
            fullDisplay() {return "<h3>Oak Minion X</h3> <br>Boosts Oak Log gain per second to 100%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = getBuyableAmount(this.layer, 11)
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = getBuyableAmount(this.layer, 11)
                setBuyableAmount(this.layer, 11, amount.sub(256))
            },
        },
    },

    buyables: {
        rows: 3,
        cols: 3,
        11: {
            title: "Enchanted Oak Log",
            unlocked() {return hasMilestone("o", 5)},
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (("Cost: " + formatWhole(data.cost) + " Oak Logs")+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                Used to buy upgrades. \n\ Doesnt do anything else.")
                return display;
            },
            cost() { 
                let cost = new Decimal(160)
                return cost 
            },
            canAfford () { return player.o.points.gte(this.cost()) },
            buy() { 
                player.o.points = player.o.points.sub(this.cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
        
        31: {
            title: "Small Storage",
            unlocked() {return hasMilestone("o", 3)},
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (("Cost: " + formatWhole(data.cost) + " Oak Logs")+"\n\
                Amount: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                placeholder text")
                return display;
            },
            cost() { 
                let cost = new Decimal(64)
                return cost 
            },
            canAfford () { return player.o.points.gte(this.cost()) },
            buy() { 
                player.o.points = player.o.points.sub(this.cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
    },
})