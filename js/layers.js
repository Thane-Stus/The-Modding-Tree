addLayer("o", {
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
            effectDescription: "Unlock Oak Minions, Minions are automation",
            done() { return player.o.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Oak Logs",
            effectDescription: "(Coming Soon) Unlock Foraging Challenges",
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
            fullDisplay() {return "<h3>Medium Oak Storage</h3><br>Boosts first Oak Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.eol.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = player.eol.points
                if(amount.gte(8)) amount = amount.sub(8)
                return amount
            },
            unlocked() { return hasMilestone("o", 6) },
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
                let amount = player.eol.points
                if(amount.gte(256)) amount = amount.sub(256)
                return amount
            },
            unlocked() { return hasMilestone("o", 8) },
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

    onPrestige(gain) {
        player.o.points = player.o.points.sub(160)
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
            unlocked() { return hasUpgrade("o", 14) },
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

//Birch Park

//Spruce Woods

//Dark Thicket

//Savanna Woodland

//Jungle

addLayer("c", {
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
    hotkeys: [
        {key: "c", description: "C: Gather Cobblestone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

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
            done() { return player.c.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Cobblestone",
            effectDescription: "(Coming Soon) Unlock Mining Skill, Skills are Challenges",
            done() { return player.c.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Cobblestone",
            effectDescription: "(Coming Soon) Unlocks Compactors, Compactors are automation for Enchanted items",
            done() { return player.c.best.gte(250) },
        },
        3: {
            requirementDescription: "1000 Cobblestone",
            effectDescription: "Unlocks Enchanted Cobblestone Layer",
            done() { return player.c.best.gte(1000) },
        },
        4: {
            requirementDescription: "2500 Cobblestone",
            effectDescription: "(Coming Soon) Unlocks Compactor Upgrades",
            done() { return player.c.best.gte(2500) },
        },
        5: {
            requirementDescription: "5000 Cobblestone",
            effectDescription: "ph", //Silverfish Pet ingame, pets will come eventually
            done() { return player.c.best.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Cobblestone",
            effectDescription: "ph", //Miners Outfit, armor will get represented one day
            done() { return player.c.best.gte(10000) },
        },
        7: {
            requirementDescription: "25000 Cobblestone",
            effectDescription: "Unlocks Enchanted Furnace Upgrade", //Wood Affinity Talisman, Make a talisman layer that lets you buy talismans when you unlock this, this one should cost 8 enchanted wood or something, and add tier 2 and tier 3 talismans too
            done() { return player.c.best.gte(25000) },
        },
        8: {
            requirementDescription: "40000 Cobblestone",
            effectDescription: "ph", //Haste ring, add this when talismans get added
            done() { return player.c.best.gte(40000) },
        },
        8: {
            requirementDescription: "70000 Cobblestone",
            effectDescription: "(Coming Soon) Unlocks more Compactor Upgrades",
            done() { return player.c.best.gte(70000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Rookie Cobblestone Pickaxe",
            description: "x2 Cobblestone Gain and +1 Work Gain",
            cost: new Decimal("10"),
        },
        12: {
            title: "Promising Cobblestone Pickaxe",
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
            unlocked() { return hasMilestone("o", 0) },
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
                let amount = player.o.points
                if (amount.gte(256)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = player.o.points
                if(amount.gte(64)) amount = amount.sub(64)
                return amount
            },
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
            fullDisplay() {return "<h3>Medium Cobblestone Storage</h3><br>Boosts first Cobblestone Minion gain by 33%<br><br>Cost: 8 Enchanted Oak Logs"},
            canAfford() { 
                let canAfford = false
                let amount = player.ec.points
                if (amount.gte(8)) canAfford = true
                return canAfford
            },
            onPurchase() {
                let amount = player.eol.points
                if(amount.gte(8)) amount = amount.sub(8)
                return amount
            },
            unlocked() { return hasMilestone("o", 6) },
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
                let amount = player.eol.points
                if(amount.gte(256)) amount = amount.sub(256)
                return amount
            },
            unlocked() { return hasMilestone("o", 8) },
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
        best: new Decimal(0),
    }},
    color: "#4d4d4d", // CHANGE ME
    resource: "Enchanted Cobblestone", // Name of prestige currency
    //This is honestly a fucking mess, but it works so /shrug
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    baseResource: "Cobblestone",
    baseAmount() { return player.c.points },
    requires: new Decimal(160),                         // Determines the formula used for calculating prestige currency.
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        if(player.c.points.gte(1)) mult = mult.div(2)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    canBuyMax() {return false},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("c", 3)},

    onPrestige(gain) {
        player.c.points = player.c.points.sub(160)
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
            unlocked() { return hasUpgrade("c", 14) },
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

addLayer("f", {
    name: "Foraging", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FOR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#83622f", // CHANGE ME
    resource: "Foraging Challenges", // Name of prestige currencye
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)

    layerShown(){return true},
    
    tabFormat: [
        "blank", 
        "challenges",
    ],
})

//Mining