addLayer("ol", {
    name: "Oak Forest", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["eol"],
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Oak Logs", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown(){return true},

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Oak Logs",
            effectDescription: "Unlock Oak Minions",
            done() { return player.ol.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Oak Logs",
            effectDescription: "Unlock the Birch Park",
            done() { return player.ol.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Oak Logs",
            effectDescription: "ph", //Leaflet Armor in game, not sure what to do here for now
            done() { return player.ol.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Oak Logs",
            effectDescription: "Unlocks Small Storage Upgrade, This upgrade shows in all layers with Minions",
            done() { return player.ol.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Oak Logs",
            effectDescription: "ph", //Forest Biome Stick in game, not sure what to put here
            done() { return player.ol.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Oak Logs",
            effectDescription: "Unlocks Enchanted Oak Logs Layer",
            done() { return player.ol.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Oak Logs",
            effectDescription: "Unlocks Medium Storage Upgrade",
            done() { return player.ol.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Oak Logs",
            effectDescription: "ph", //Wood Affinity Talisman, Make a talisman layer that lets you buy talismans when you unlock this, this one should cost 8 enchanted wood or something, and add tier 2 and tier 3 talismans too
            done() { return player.ol.best.gte(10000) },
        },
        8: {
            requirementDescription: "30000 Oak Logs",
            effectDescription: "Unlocks Large Storage",
            done() { return player.ol.best.gte(30000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Rookie Axe",
            description: "x2 All Log Gain and +1 Work Gain",
            cost: new Decimal("10"),
        },
        12: {
            title: "Promising Axe",
            description: "Boosts Log gains based on current count for that Log",
            cost: new Decimal("20"),
            effect() {
                //let  eff = Decimal.pow(2, player.ol.points.plus(1).log10().pow(.8)); //Cant remember if I borrowed this from TPTR or DynasTree, either way its not getting used anymore so /shrug
                let eff = player[this.layer].points.add(1).ln().div(5).add(2) //Modified version of a formula from The Leveling Tree
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        21: {
            title: "Oak Minion I",
            description: "Generates 100% of Oak Log Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
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
            description: "Boosts first Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Oak Minion III",
            description: "Boosts first Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Oak Minion IV",
            description: "Boosts first Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //These should show in ALL layers, always costs Oak but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        31: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Oak Storage</h3><br>Boosts first Oak Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Oak Storage</h3><br>Boosts first Oak Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("eol", {
    name: "Enchanted Oak Logs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EOL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66502e", // CHANGE ME
    resource: "Enchanted Oak Logs", // Name of prestige currency
    //This is honestly a fucking mess, but it works so /shrug
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    baseResource: "Oak Logs",
    baseAmount() { return player.ol.points },
    requires: new Decimal(160),                         // Determines the formula used for calculating prestige currency.
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if(player.eol.points.gte(1)) mult = mult.div(2)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    canBuyMax() {return false},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("ol", 5)},

    onPrestige(gain) {
        player.ol.points = player.ol.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Oak Minion V",
            description: "Boosts first Oak Minion gain by 6%",
            unlocked() { return hasUpgrade("ol", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Oak Minion VI",
            description: "Boosts first Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Oak Minion VII",
            description: "Boosts first Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Oak Minion VIII",
            description: "Boosts first Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Oak Minion IX",
            description: "Boosts first Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Oak Minion X",
            description: "Boosts first Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Oak Minion XI",
            description: "Boosts first Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

addLayer("bl", {
    name: "Birch Park", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["ol", "ebl"],
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Birch Logs", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown(){return hasMilestone("ol", 1)},

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Birch Logs",
            effectDescription: "Unlock Birch Minions, Minions are automation",
            done() { return player.bl.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Birch Logs",
            effectDescription: "Unlock the Spruce Woods",
            done() { return player.bl.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Birch Logs",
            effectDescription: "ph", //Birch Park Portal
            done() { return player.bl.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Birch Logs",
            effectDescription: "Unlocks Sculptor's Axe Upgrade",
            done() { return player.bl.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Birch Logs",
            effectDescription: "(Coming Soon) Unlocks Small Foraging Sack Upgrade", //Birch Forest Biome Stick in game, Going to put Foraging sack here, actually add it when Cow layer is added
            done() { return player.bl.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Birch Logs",
            effectDescription: "Unlocks Enchanted Birch Logs Layer",
            done() { return player.bl.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Birch Logs",
            effectDescription: "(Coming Soon) Unlocks Mediumn Foraging Sack Upgrade",
            done() { return player.bl.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Birch Logs",
            effectDescription: "(Coming Soon) Unlocks Woodcutting Crystal",
            done() { return player.bl.best.gte(10000) },
        },
        8: {
            requirementDescription: "25000 Birch Logs",
            effectDescription: "(Coming Soon) Unlocks Large Foraging Sack Upgrade",
            done() { return player.bl.best.gte(25000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Sculptor's Axe",
            description: "x1.5 All Log Gains",
            cost: new Decimal("192"),
        },

        21: {
            title: "Birch Minion I",
            description: "Generates 100% of Birch Log Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("ebl", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("ebl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("ebl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("ebl", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("ebl", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("ebl", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("ebl", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Birch Minion II",
            description: "Boosts first Birch Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Birch Minion III",
            description: "Boosts first Birch Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Birch Minion IV",
            description: "Boosts first Birch Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //These should show in ALL layers, always costs Oak but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        31: {
            fullDisplay() {return "<h3>Small Birch Storage</h3><br>Boosts first Birch Minion gain by 33%<br><br>Cost: 64 Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ol.points
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = player.ol.points
                if(amount.gte(64)) amount = amount.sub(64)
                return amount
            },
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Birch Storage</h3><br>Boosts first Birch Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Birch Storage</h3><br>Boosts first Birch Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("ebl", {
    name: "Enchanted Birch Logs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EBL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66502e", // CHANGE ME
    resource: "Enchanted Birch Logs", // Name of prestige currency
    //This is honestly a fucking mess, but it works so /shrug
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    baseResource: "Birch Logs",
    baseAmount() { return player.bl.points },
    requires: new Decimal(160),                         // Determines the formula used for calculating prestige currency.
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if(player.ebl.points.gte(1)) mult = mult.div(2)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    canBuyMax() {return false},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("bl", 5)},

    onPrestige(gain) {
        player.bl.points = player.bl.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Birch Minion V",
            description: "Boosts first Birch Minion gain by 6%",
            unlocked() { return hasUpgrade("bl", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Birch Minion VI",
            description: "Boosts first Birch Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Birch Minion VII",
            description: "Boosts first Birch Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Birch Minion VIII",
            description: "Boosts first Birch Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Birch Minion IX",
            description: "Boosts first Birch Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Birch Minion X",
            description: "Boosts first Birch Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Birch Minion XI",
            description: "Boosts first Birch Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

addLayer("sl", {
    name: "Spruce Woods",
    symbol: "SL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["bl", "esl"],
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10),
    resource: "Spruce Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        return mult
    },
    
    gainExp() {
        return new Decimal(1)
    },
    row: 2,

    layerShown(){return hasMilestone("bl", 1)},

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Spruce Logs",
            effectDescription: "Unlock Spruce Minions",
            done() { return player.sl.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Spruce Logs",
            effectDescription: "Unlocks the Dark Thicket",
            done() { return player.sl.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Spruce Logs",
            effectDescription: "ph", //Spruce Portal
            done() { return player.sl.best.gte(250) },
        },
        3: {
            requirementDescription: "1000 Spruce Logs",
            effectDescription: "ph", //taiga stick
            done() { return player.sl.best.gte(1000) },
        },
        4: {
            requirementDescription: "2000 Spruce Logs",
            effectDescription: "Unlocks Enchanted Spruce Logs",
            done() { return player.sl.best.gte(2000) },
        },
        5: {
            requirementDescription: "5000 Spruce Logs",
            effectDescription: "ph", //sawmill
            done() { return player.sl.best.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Spruce Logs",
            effectDescription: "ph", //foraging xp
            done() { return player.sl.best.gte(10000) },
        },
        7: {
            requirementDescription: "25000 Spruce Logs",
            effectDescription: "ph", //Wolf Pet
            done() { return player.sl.best.gte(25000) },
        },
        8: {
            requirementDescription: "50000 Spruce Logs",
            effectDescription: "ph", //foraging xp
            done() { return player.sl.best.gte(50000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,

        21: {
            title: "Spruce Minion I",
            description: "Generates 100% of Spruce Log Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("esl", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("esl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("esl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("esl", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("esl", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("esl", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("esl", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Spruce Minion II",
            description: "Boosts first Spruce Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Spruce Minion III",
            description: "Boosts first Spruce Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Spruce Minion IV",
            description: "Boosts first Spruce Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //The effect from the Small storage directly boosts the base minion
        31: {
            fullDisplay() {return "<h3>Small Spruce Storage</h3><br>Boosts first Spruce Minion gain by 33%<br><br>Cost: 64 Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ol.points
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.ol.points = player.ol.points.sub(64)
            },
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Spruce Storage</h3><br>Boosts first Spruce Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Spruce Storage</h3><br>Boosts first Spruce Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("esl", {
    name: "Enchanted Spruce Logs",
    symbol: "ESL",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66502e",
    resource: "Enchanted Spruce Logs",
    //This is honestly a fucking mess, but it works so /shrug
    type: "static",
    baseResource: "Spruce Logs",
    baseAmount() { return player.sl.points },
    requires: new Decimal(160),
    
    gainMult() {
        let mult = new Decimal(1)
        if(player.esl.points.gte(1)) mult = mult.div(2)
        return mult
    },
    canBuyMax() {return false},
    row: 2,
    layerShown(){return hasMilestone("sl", 4)},

    onPrestige(gain) {
        player.sl.points = player.sl.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Spruce Minion V",
            description: "Boosts first Spruce Minion gain by 6%",
            unlocked() { return hasUpgrade("sl", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Spruce Minion VI",
            description: "Boosts first Spruce Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Spruce Minion VII",
            description: "Boosts first Spruce Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Spruce Minion VIII",
            description: "Boosts first Spruce Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Spruce Minion IX",
            description: "Boosts first Spruce Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Spruce Minion X",
            description: "Boosts first Spruce Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Spruce Minion XI",
            description: "Boosts first Spruce Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

addLayer("dl", {
    name: "Dark Thicket",
    symbol: "DL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["sl", "edl"],
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10),
    resource: "Dark Oak Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        return mult
    },
    
    gainExp() {
        return new Decimal(1)
    },
    row: 3,

    layerShown(){return hasMilestone("sl", 1)},

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Dark Oak Logs",
            effectDescription: "Unlock Dark Oak Minions",
            done() { return player.dl.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Dark Oak Logs",
            effectDescription: "Unlocks the Savanna Woodland",
            done() { return player.dl.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Dark Oak Logs",
            effectDescription: "ph", //Dark Oak Portal
            done() { return player.dl.best.gte(250) },
        },
        3: {
            requirementDescription: "1000 Dark Oak Logs",
            effectDescription: "ph", //Roofed Forest Biome Stick
            done() { return player.dl.best.gte(1000) },
        },
        4: {
            requirementDescription: "2000 Dark Oak Logs",
            effectDescription: "Unlocks Enchanted Dark Oak Logs",
            done() { return player.dl.best.gte(2000) },
        },
        5: {
            requirementDescription: "5000 Dark Oak Logs",
            effectDescription: "ph", //Roofed Forest Island Stick
            done() { return player.dl.best.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Dark Oak Logs",
            effectDescription: "ph", //Growth 4 Book
            done() { return player.dl.best.gte(10000) },
        },
        7: {
            requirementDescription: "15000 Dark Oak Logs",
            effectDescription: "ph", //Foraging XP
            done() { return player.dl.best.gte(15000) },
        },
        8: {
            requirementDescription: "25000 Dark Oak Logs",
            effectDescription: "ph", //Growth Armor
            done() { return player.dl.best.gte(25000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,

        21: {
            title: "Dark Oak Minion I",
            description: "Generates 100% of Dark Oak Log Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("edl", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("edl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("edl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("edl", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("edl", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("edl", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("edl", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Dark Oak Minion II",
            description: "Boosts first Dark Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Dark Oak Minion III",
            description: "Boosts first Dark Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Dark Oak Minion IV",
            description: "Boosts first Dark Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //The effect from the Small storage directly boosts the base minion
        31: {
            fullDisplay() {return "<h3>Small Dark Oak Storage</h3><br>Boosts first Dark Oak Minion gain by 33%<br><br>Cost: 64 Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ol.points
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.ol.points = player.ol.points.sub(64)
            },
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Dark Oak Storage</h3><br>Boosts first Dark Oak Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Dark Oak Storage</h3><br>Boosts first Dark Oak Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("edl", {
    name: "Enchanted Dark Oak Logs",
    symbol: "EDL",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66502e",
    resource: "Enchanted Dark Oak Logs",
    //This is honestly a fucking mess, but it works so /shrug
    type: "static",
    baseResource: "Dark Oak Logs",
    baseAmount() { return player.dl.points },
    requires: new Decimal(160),
    
    gainMult() {
        let mult = new Decimal(1)
        if(player.edl.points.gte(1)) mult = mult.div(2)
        return mult
    },
    canBuyMax() {return false},
    row: 3,
    layerShown(){return hasMilestone("dl", 4)},

    onPrestige(gain) {
        player.dl.points = player.dl.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Dark Oak Minion V",
            description: "Boosts first Dark Oak Minion gain by 6%",
            unlocked() { return hasUpgrade("dl", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Dark Oak Minion VI",
            description: "Boosts first Dark Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Dark Oak Minion VII",
            description: "Boosts first Dark Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Dark Oak Minion VIII",
            description: "Boosts first Dark Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Dark Oak Minion IX",
            description: "Boosts first Dark Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Dark Oak Minion X",
            description: "Boosts first Dark Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Dark Oak Minion XI",
            description: "Boosts first Dark Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

addLayer("al", {
    name: "Savanna Woodland",
    symbol: "AL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["dl", "eal"],
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10),
    resource: "Acacia Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        return mult
    },
    
    gainExp() {
        return new Decimal(1)
    },
    row: 4,

    layerShown(){return hasMilestone("dl", 1)},

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Acacia Logs",
            effectDescription: "Unlock Acacia Minions",
            done() { return player.al.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Acacia Logs",
            effectDescription: "Unlocks the Jungle Island",
            done() { return player.al.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Acacia Logs",
            effectDescription: "ph", //Woodland Portal
            done() { return player.al.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Acacia Logs",
            effectDescription: "ph", //Foraging XP
            done() { return player.al.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Acacia Logs",
            effectDescription: "ph", //Savanna Biome Stick
            done() { return player.al.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Acacia Logs",
            effectDescription: "Unlocks Enchanted Acacia Logs",
            done() { return player.al.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Acacia Logs",
            effectDescription: "ph", //Savanna Bow
            done() { return player.al.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Acacia Logs",
            effectDescription: "ph", //Foraging XP
            done() { return player.al.best.gte(10000) },
        },
        8: {
            requirementDescription: "25000 Acacia Logs",
            effectDescription: "ph", //Repelling Candle
            done() { return player.al.best.gte(25000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,

        21: {
            title: "Acacia Minion I",
            description: "Generates 100% of Acacia Log Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("eal", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("eal", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("eal", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("eal", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("eal", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("eal", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("eal", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Acacia Minion II",
            description: "Boosts first Acacia Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Acacia Minion III",
            description: "Boosts first Acacia Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Acacia Minion IV",
            description: "Boosts first Acacia Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //The effect from the Small storage directly boosts the base minion
        31: {
            fullDisplay() {return "<h3>Small Acacia Storage</h3><br>Boosts first Acacia Minion gain by 33%<br><br>Cost: 64 Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ol.points
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.ol.points = player.ol.points.sub(64)
            },
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Acacia Storage</h3><br>Boosts first Acacia Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Acacia Storage</h3><br>Boosts first Acacia Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("eal", {
    name: "Enchanted Acacia Logs",
    symbol: "EAL",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66502e",
    resource: "Enchanted Acacia Logs",
    //This is honestly a fucking mess, but it works so /shrug
    type: "static",
    baseResource: "Acacia Logs",
    baseAmount() { return player.al.points },
    requires: new Decimal(160),
    
    gainMult() {
        let mult = new Decimal(1)
        if(player.eal.points.gte(1)) mult = mult.div(2)
        return mult
    },
    canBuyMax() {return false},
    row: 4,
    layerShown(){return hasMilestone("al", 5)},

    onPrestige(gain) {
        player.al.points = player.al.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Acacia Minion V",
            description: "Boosts first Acacia Minion gain by 6%",
            unlocked() { return hasUpgrade("al", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Acacia Minion VI",
            description: "Boosts first Acacia Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Acacia Minion VII",
            description: "Boosts first Acacia Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Acacia Minion VIII",
            description: "Boosts first Acacia Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Acacia Minion IX",
            description: "Boosts first Acacia Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Acacia Minion X",
            description: "Boosts first Acacia Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Acacia Minion XI",
            description: "Boosts first Acacia Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

addLayer("jl", {
    name: "Savanna Woodland",
    symbol: "JL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["al", "ejl"],
    color: "#83622f", // CHANGE ME
    requires: new Decimal(10),
    resource: "Jungle Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        return mult
    },
    
    gainExp() {
        return new Decimal(1)
    },
    row: 5,

    layerShown(){return hasMilestone("al", 1)},

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Jungle Logs",
            effectDescription: "Unlock Jungle Minions",
            done() { return player.jl.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Jungle Logs",
            effectDescription: "ph", //Jungle Leaves Trade
            done() { return player.jl.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Jungle Logs",
            effectDescription: "ph", //Jungle Island Portal
            done() { return player.jl.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Jungle Logs",
            effectDescription: "ph", //Vines Trade
            done() { return player.jl.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Jungle Logs",
            effectDescription: "ph", //Jungle Biome Stick
            done() { return player.jl.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Jungle Logs",
            effectDescription: "Unlocks Enchanted Jungle Logs",
            done() { return player.jl.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Jungle Logs",
            effectDescription: "Unlocks Jungle Axe Upgrade",
            done() { return player.jl.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Jungle Logs",
            effectDescription: "ph", //Foraging XP
            done() { return player.jl.best.gte(10000) },
        },
        8: {
            requirementDescription: "25000 Jungle Logs",
            effectDescription: "ph", //Ocelot Pet
            done() { return player.jl.best.gte(25000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            fullDisplay() {return "<h3>Jungle Axe</h3><br>x10 All Log Gains<br><br>Cost: 3 Enchanted Jungle Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ejl.points
                if (amount.gte(3)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = player.ejl.points
                if(amount.gte(3)) amount = amount.sub(3)
                return amount
            },
            unlocked() { return hasMilestone(this.layer, 6) },
        },

        21: {
            title: "Jungle Minion I",
            description: "Generates 100% of Jungle Log Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("ejl", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("ejl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("ejl", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("ejl", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("ejl", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("ejl", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("ejl", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Jungle Minion II",
            description: "Boosts first Jungle Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Jungle Minion III",
            description: "Boosts first Jungle Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Jungle Minion IV",
            description: "Boosts first Jungle Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //The effect from the Small storage directly boosts the base minion
        31: {
            fullDisplay() {return "<h3>Small Jungle Storage</h3><br>Boosts first Jungle Minion gain by 33%<br><br>Cost: 64 Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ol.points
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.ol.points = player.ol.points.sub(64)
            },
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Jungle Storage</h3><br>Boosts first Jungle Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Jungle Storage</h3><br>Boosts first Jungle Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("ejl", {
    name: "Enchanted Jungle Logs",
    symbol: "EJL",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66502e",
    resource: "Enchanted Jungle Logs",
    //This is honestly a fucking mess, but it works so /shrug
    type: "static",
    baseResource: "Jungle Logs",
    baseAmount() { return player.jl.points },
    requires: new Decimal(160),
    
    gainMult() {
        let mult = new Decimal(1)
        if(player.ejl.points.gte(1)) mult = mult.div(2)
        return mult
    },
    canBuyMax() {return false},
    row: 5,
    layerShown(){return hasMilestone("jl", 5)},

    onPrestige(gain) {
        player.jl.points = player.jl.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Jungle Minion V",
            description: "Boosts first Jungle Minion gain by 6%",
            unlocked() { return hasUpgrade("jl", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Jungle Minion VI",
            description: "Boosts first Jungle Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Jungle Minion VII",
            description: "Boosts first Jungle Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Jungle Minion VIII",
            description: "Boosts first Jungle Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Jungle Minion IX",
            description: "Boosts first Jungle Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Jungle Minion X",
            description: "Boosts first Jungle Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Jungle Minion XI",
            description: "Boosts first Jungle Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

addLayer("cb", {
    name: "Cobblestone Mine", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    branches: ["ec"],
    color: "#7f7f7f", // CHANGE ME
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Cobblestone", // Name of prestige currency
    baseResource: "Work", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 11)) mult = mult.mul(2);
        if (hasUpgrade(this.layer, 12)) mult = mult.mul(upgradeEffect(this.layer,12));
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)

    layerShown(){return true},

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    milestones: {
        0: {
            requirementDescription: "50 Cobblestone",
            effectDescription: "Unlock Cobblestone Minion, Minions are Automation",
            done() { return player.cb.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Cobblestone",
            effectDescription: "Unlocks Coal Mine Layer",
            done() { return player.cb.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Cobblestone",
            effectDescription: "(Coming Soon) Unlocks Compactors, Compactors are automation for Enchanted items",
            done() { return player.cb.best.gte(250) },
        },
        3: {
            requirementDescription: "1000 Cobblestone",
            effectDescription: "Unlocks Enchanted Cobblestone Layer",
            done() { return player.cb.best.gte(1000) },
        },
        4: {
            requirementDescription: "2500 Cobblestone",
            effectDescription: "(Coming Soon) Unlocks Compactor Upgrades",
            done() { return player.cb.best.gte(2500) },
        },
        5: {
            requirementDescription: "5000 Cobblestone",
            effectDescription: "ph", //Silverfish Pet ingame, pets will come eventually
            done() { return player.cb.best.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Cobblestone",
            effectDescription: "ph", //Miners Outfit, armor will get added eventually
            done() { return player.cb.best.gte(10000) },
        },
        7: {
            requirementDescription: "25000 Cobblestone",
            effectDescription: "Unlocks Enchanted Furnace Upgrade",
            done() { return player.cb.best.gte(25000) },
        },
        8: {
            requirementDescription: "40000 Cobblestone",
            effectDescription: "ph", //Haste ring, add this when talismans get added
            done() { return player.cb.best.gte(40000) },
        },
        8: {
            requirementDescription: "70000 Cobblestone",
            effectDescription: "(Coming Soon) Unlocks more Compactor Upgrades",
            done() { return player.cb.best.gte(70000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Rookie Pickaxe",
            description: "x2 Cobblestone Gain and +1 Work Gain",
            cost: new Decimal("10"),
        },
        12: {
            title: "Promising Pickaxe",
            description: "Boosts Cobblestone gain based on current Cobblestone count",
            cost: new Decimal("20"),
            effect() {
                let eff = player[this.layer].points.add(1).ln().div(5).add(2) //Modified version of a formula from The Leveling Tree
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        21: {
            title: "Cobblestone Minion I",
            description: "Generates 100% of Cobblestone Gain per second",
            unlocked() { return hasMilestone("ol", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade("ec", 11)) eff = eff.mul(1.06)
                if(hasUpgrade("ec", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("ec", 13)) eff = eff.mul(1.11)
                if(hasUpgrade("ec", 14)) eff = eff.mul(1.15)
                if(hasUpgrade("ec", 15)) eff = eff.mul(1.15)
                if(hasUpgrade("ec", 21)) eff = eff.mul(1.21)
                if(hasUpgrade("ec", 22)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(upgradeEffect(this.layer, 31))
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Cobblestone Minion II",
            description: "Boosts first Cobblestone Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Cobblestone Minion III",
            description: "Boosts first Cobblestone Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Cobblestone Minion IV",
            description: "Boosts first Cobblestone Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },

        //These should show in ALL layers, always costs Oak but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        31: {
            fullDisplay() {return "<h3>Small Cobblestone Storage</h3><br>Boosts first Cobblestone Minion gain by 33%<br><br>Cost: 64 Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ol.points
                if (amount.gte(64)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.ol.points = player.ol.points.sub(64)
            },
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 32)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 33)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        32: {
            fullDisplay() {return "<h3>Medium Cobblestone Storage</h3><br>Boosts first Cobblestone Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(8)
            },
            unlocked() { return hasMilestone("ol", 6) },
        },
        33: {
            fullDisplay() {return "<h3>Large Cobblestone Storage</h3><br>Boosts first Cobblestone Minion gain by 34%<br><br>Cost: 256 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                player.eol.points = player.eol.points.sub(256)
            },
            unlocked() { return hasMilestone("ol", 8) },
        },
    },
})

addLayer("ec", {
    name: "Enchanted Cobblestone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ECB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4d4d4d", // CHANGE ME
    resource: "Enchanted Cobblestone", // Name of prestige currency
    //This is honestly a fucking mess, but it works so /shrug
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    baseResource: "Cobblestone",
    baseAmount() { return player.cb.points },
    requires: new Decimal(160),                         // Determines the formula used for calculating prestige currency.
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if(player.cb.points.gte(1)) mult = mult.div(2)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    canBuyMax() {return false},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("cb", 3)},

    onPrestige(gain) {
        player.cb.points = player.cb.points.sub(160)
    },

    tabFormat() {
        return [
            "main-display", 
            "prestige-button", 
            "resource-display",
            "blank",
            "upgrades",
            "blank",
            "buyables",
            "blank",
            "milestones",
        ]
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Cobblestone Minion V",
            description: "Boosts first Cobblestone Minion gain by 6%",
            unlocked() { return hasUpgrade("cb", 24) },
            cost: new Decimal("8"),
        },
        12: {
            title: "Cobblestone Minion VI",
            description: "Boosts first Cobblestone Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 11) },
            cost: new Decimal("16"),
        },
        13: {
            title: "Cobblestone Minion VII",
            description: "Boosts first Cobblestone Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 12) },
            cost: new Decimal("32"),
        },
        14: {
            title: "Cobblestone Minion VIII",
            description: "Boosts first Cobblestone Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 13) },
            cost: new Decimal("64"),
        },
        15: {
            title: "Cobblestone Minion IX",
            description: "Boosts first Cobblestone Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 14) },
            cost: new Decimal("128"),
        },
        21: {
            title: "Cobblestone Minion X",
            description: "Boosts first Cobblestone Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 15) },
            cost: new Decimal("256"),
        },
        22: {
            title: "Cobblestone Minion XI",
            description: "Boosts first Cobblestone Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("512"),
        },
    },
})

//Coal Mine

//Iron Mine

//Gold Mine

//Lapis Mine

//Redstone Mine

//Emerald Mine

//Diamond Mine

//Obsidian Mine

//Mithril/Titanium here eventually
//Need to work in a nether tree for Netherrack/Glowstone/Quartz
//And add End Stone somewhere
//Gravel, Ice, and Sand are low priority, probably best to leave out to reduce clutter

//Foraging

//Mining