addLayer("ol", {
    name: "Oak Forest",
    symbol: "OL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        olench: new Decimal(0),
    }},
    branches: ["bl"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Oak Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        if (hasUpgrade("jl", 11)) mult = mult.mul(10);
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 0,

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

    tabFormat: {
        "Oak Logs": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.ol.olench) + "</h2> Enchanted Oak Logs</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 11], ["upgrade", 12]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Oak Logs": {
            unlocked() { return hasMilestone("ol", 5) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.ol.olench) + "</h2> Enchanted Oak Logs</div>"],
                "blank",
                "clickables",
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
            ]
        },
    },

    milestones: {
        0: {
            requirementDescription: "50 Oak Logs",
            effectDescription: "Unlock Oak Minion Upgrades, Minions are Automation",
            done() { return player.ol.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Oak Logs",
            effectDescription: "Unlock the Birch Park",
            done() { return player.ol.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Oak Logs",
            effectDescription: "ph", //Armor Leaflet
            done() { return player.ol.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Oak Logs",
            effectDescription: "Unlocks Small Storage Upgrade, This upgrade shows in all layers with Minions",
            done() { return player.ol.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Oak Logs",
            effectDescription: "ph", //Biome Stick Forest
            done() { return player.ol.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Oak Logs",
            effectDescription: "Unlocks Enchanted Oak Logs",
            done() { return player.ol.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Oak Logs",
            effectDescription: "Unlocks Medium Storage Upgrade",
            done() { return player.ol.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Oak Logs",
            effectDescription: "ph", //Talisman Wood Affinity
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
                if(hasUpgrade(this.layer, 25)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.mul(upgradeEffect(this.layer, 51))
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
        25: {
            title: "Oak Minion V",
            description: "Boosts first Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Oak Minion VI",
            description: "Boosts first Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Oak Minion VII",
            description: "Boosts first Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Oak Minion VIII",
            description: "Boosts first Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Oak Minion IX",
            description: "Boosts first Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Oak Minion X",
            description: "Boosts first Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Oak Minion XI",
            description: "Boosts first Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Oak but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.plus(0.34)
                return eff
            },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Medium Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
    },

    clickables: {
        rows: 1,
        cols: 1,
        11:{
            display() {
                return "<h3>Reset for +1 Enchated Oak Log<br><br> Oak Logs " + format(player[this.layer].points) + " / 160 </h3>"
            },
            style: {   
                "width": "180px",
                "height": "120px",
            },
            canClick() {
                return player[this.layer].points.gte(160)
            },
            onClick() {
                if (player.ol.points.gte(160)) {
                    player.ol.points = player.ol.points.sub(160)
                    player.ol.olench = player.ol.olench.add(1)
                }
            },
        },     
    },
})

addLayer("bl", {
    name: "Birch Park",
    symbol: "BL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        blench: new Decimal(0),
    }},
    branches: ["sl"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Birch Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        if (hasUpgrade("jl", 11)) mult = mult.mul(10);
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 1,

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown() { return hasMilestone("ol", 1) },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat: {
        "Birch Logs": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.bl.blench) + "</h2> Enchanted Birch Logs</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 11]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Birch Logs": {
            unlocked() { return hasMilestone("bl", 5) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.bl.blench) + "</h2> Enchanted Birch Logs</div>"],
                "blank",
                "clickables",
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
            ]
        },
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
            effectDescription: "ph", //Portal Birch Park
            done() { return player.bl.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Birch Logs",
            effectDescription: "Unlocks Sculptor's Axe Upgrade",
            done() { return player.bl.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Birch Logs",
            effectDescription: "(Coming Soon) Unlocks Small Foraging Sack Upgrade", //Biome Stick Birch Forest, Putting Small Foraging Sack here as filler since I probably wont be adding biome sticks
            done() { return player.bl.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Birch Logs",
            effectDescription: "Unlocks Enchanted Birch Logs",
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
            description: "x1.5 All Log Gain",
            cost: new Decimal("192"),
        },

        21: {
            title: "Birch Minion I",
            description: "Generates 100% of Birch Log Gain per second",
            unlocked() { return hasMilestone("bl", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.mul(upgradeEffect(this.layer, 51))
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
        25: {
            title: "Birch Minion V",
            description: "Boosts first Birch Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Birch Minion VI",
            description: "Boosts first Birch Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Birch Minion VII",
            description: "Boosts first Birch Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Birch Minion VIII",
            description: "Boosts first Birch Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Birch Minion IX",
            description: "Boosts first Birch Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Birch Minion X",
            description: "Boosts first Birch Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Birch Minion XI",
            description: "Boosts first Birch Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Birch Logs",
            currencyInternalName: "blench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Birch but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.plus(0.34)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Birch Storage",
            description: "Boosts first Birch Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Medium Birch Storage",
            description: "Boosts first Birch Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
    },

    clickables: {
        rows: 1,
        cols: 1,
        11:{
            display() {
                return "<h3>Reset for +1 Enchated Birch Log<br><br> Birch Logs " + format(player[this.layer].points) + " / 160 </h3>"
            },
            style: {   
                "width": "180px",
                "height": "120px",
            },
            canClick() {
                return player[this.layer].points.gte(160)
            },
            onClick() {
                if (player.bl.points.gte(160)) {
                    player.bl.points = player.bl.points.sub(160)
                    player.bl.blench = player.bl.blench.add(1)
                }
            },
        },     
    },
})

addLayer("sl", {
    name: "Spruce Park",
    symbol: "SL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        slench: new Decimal(0),
    }},
    branches: ["dl"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Spruce Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        if (hasUpgrade("jl", 11)) mult = mult.mul(10);
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 2,

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown() { return hasMilestone("bl", 1) },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat: {
        "Spruce Logs": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.sl.slench) + "</h2> Enchanted Spruce Logs</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Spruce Logs": {
            unlocked() { return hasMilestone("sl", 4) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.sl.slench) + "</h2> Enchanted Spruce Logs</div>"],
                "blank",
                "clickables",
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
            ]
        },
    },

    milestones: {
        0: {
            requirementDescription: "50 Spruce Logs",
            effectDescription: "Unlock Spruce Minions, Minions are automation",
            done() { return player.sl.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Spruce Logs",
            effectDescription: "Unlock the Dark Thicket",
            done() { return player.sl.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Spruce Logs",
            effectDescription: "ph", //Portal Spruce Woods
            done() { return player.sl.best.gte(250) },
        },
        3: {
            requirementDescription: "1000 Spruce Logs",
            effectDescription: "ph", //Biome Stick Taiga
            done() { return player.sl.best.gte(1000) },
        },
        4: {
            requirementDescription: "2000 Spruce Logs",
            effectDescription: "Unlocks Enchanted Spruce Logs",
            done() { return player.sl.best.gte(2000) },
        },
        5: {
            requirementDescription: "5000 Spruce Logs",
            effectDescription: "ph", //Sawmill
            done() { return player.sl.best.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Spruce Logs",
            effectDescription: "ph", //XP Foraging
            done() { return player.sl.best.gte(10000) },
        },
        7: {
            requirementDescription: "25000 Spruce Logs",
            effectDescription: "ph", //Pet Wolf
            done() { return player.sl.best.gte(25000) },
        },
        8: {
            requirementDescription: "50000 Spruce Logs",
            effectDescription: "ph", //XP Foraging
            done() { return player.sl.best.gte(50000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,

        21: {
            title: "Spruce Minion I",
            description: "Generates 100% of Spruce Log Gain per second",
            unlocked() { return hasMilestone("sl", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.mul(upgradeEffect(this.layer, 51))
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
        25: {
            title: "Spruce Minion V",
            description: "Boosts first Spruce Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Spruce Minion VI",
            description: "Boosts first Spruce Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Spruce Minion VII",
            description: "Boosts first Spruce Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Spruce Minion VIII",
            description: "Boosts first Spruce Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Spruce Minion IX",
            description: "Boosts first Spruce Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Spruce Minion X",
            description: "Boosts first Spruce Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Spruce Minion XI",
            description: "Boosts first Spruce Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Spruce Logs",
            currencyInternalName: "slench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Spruce but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.plus(0.34)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Spruce Storage",
            description: "Boosts first Spruce Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Medium Spruce Storage",
            description: "Boosts first Spruce Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
    },

    clickables: {
        rows: 1,
        cols: 1,
        11:{
            display() {
                return "<h3>Reset for +1 Enchated Spruce Log<br><br> Spruce Logs " + format(player[this.layer].points) + " / 160 </h3>"
            },
            style: {   
                "width": "180px",
                "height": "120px",
            },
            canClick() {
                return player[this.layer].points.gte(160)
            },
            onClick() {
                if (player.sl.points.gte(160)) {
                    player.sl.points = player.sl.points.sub(160)
                    player.sl.slench = player.sl.slench.add(1)
                }
            },
        },     
    },
})

addLayer("dl", {
    name: "Dark Oak Park",
    symbol: "DL",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        dlench: new Decimal(0),
    }},
    branches: ["al"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Dark Oak Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        if (hasUpgrade("jl", 11)) mult = mult.mul(10);
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 3,

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown() { return hasMilestone("sl", 1) },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat: {
        "Dark Oak Logs": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.dl.dlench) + "</h2> Enchanted Dark Oak Logs</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Dark Oak Logs": {
            unlocked() { return hasMilestone("dl", 4) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.dl.dlench) + "</h2> Enchanted Dark Oak Logs</div>"],
                "blank",
                "clickables",
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
            ]
        },
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
            effectDescription: "ph", //Portal Dark Thicket
            done() { return player.dl.best.gte(250) },
        },
        3: {
            requirementDescription: "1000 Dark Oak Logs",
            effectDescription: "ph", //Biome Stick Roofed Forest
            done() { return player.dl.best.gte(1000) },
        },
        4: {
            requirementDescription: "2000 Dark Oak Logs",
            effectDescription: "Unlocks Enchanted Dark Oak Logs",
            done() { return player.dl.best.gte(2000) },
        },
        5: {
            requirementDescription: "5000 Dark Oak Logs",
            effectDescription: "ph", //Island Stick Roofed Forest
            done() { return player.dl.best.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Dark Oak Logs",
            effectDescription: "ph", //Enchanted Book Growth IV
            done() { return player.dl.best.gte(10000) },
        },
        7: {
            requirementDescription: "15000 Dark Oak Logs",
            effectDescription: "ph", //XP Foraging
            done() { return player.dl.best.gte(15000) },
        },
        8: {
            requirementDescription: "25000 Dark Oak Logs",
            effectDescription: "ph", //Armor Growth
            done() { return player.dl.best.gte(25000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,

        21: {
            title: "Dark Oak Minion I",
            description: "Generates 100% of Dark Oak Log Gain per second",
            unlocked() { return hasMilestone("dl", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.mul(upgradeEffect(this.layer, 51))
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
        25: {
            title: "Dark Oak Minion V",
            description: "Boosts first Dark Oak Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Dark Oak Minion VI",
            description: "Boosts first Dark Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Dark Oak Minion VII",
            description: "Boosts first Dark Oak Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Dark Oak Minion VIII",
            description: "Boosts first Dark Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Dark Oak Minion IX",
            description: "Boosts first Dark Oak Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Dark Oak Minion X",
            description: "Boosts first Dark Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Dark Oak Minion XI",
            description: "Boosts first Dark Oak Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Dark Oak Logs",
            currencyInternalName: "dlench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Dark Oak but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.plus(0.34)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Dark Oak Storage",
            description: "Boosts first Dark Oak Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Medium Dark Oak Storage",
            description: "Boosts first Dark Oak Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
    },

    clickables: {
        rows: 1,
        cols: 1,
        11:{
            display() {
                return "<h3>Reset for +1 Enchated Dark Oak Log<br><br> Dark Oak Logs " + format(player[this.layer].points) + " / 160 </h3>"
            },
            style: {   
                "width": "180px",
                "height": "120px",
            },
            canClick() {
                return player[this.layer].points.gte(160)
            },
            onClick() {
                if (player.dl.points.gte(160)) {
                    player.dl.points = player.dl.points.sub(160)
                    player.dl.dlench = player.dl.dlench.add(1)
                }
            },
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
        alench: new Decimal(0),
    }},
    branches: ["dl"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Acacia Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        if (hasUpgrade("jl", 11)) mult = mult.mul(10);
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 4,

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown() { return hasMilestone("dl", 1) },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat: {
        "Acacia Logs": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.al.alench) + "</h2> Enchanted Acacia Logs</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Acacia Logs": {
            unlocked() { return hasMilestone("al", 5) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.al.alench) + "</h2> Enchanted Acacia Logs</div>"],
                "blank",
                "clickables",
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
            ]
        },
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
            effectDescription: "ph", //Portal Savanna Woodland
            done() { return player.al.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Acacia Logs",
            effectDescription: "ph", //XP Foraging
            done() { return player.al.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Acacia Logs",
            effectDescription: "ph", //Biome Stick Savanna Woodland
            done() { return player.al.best.gte(1000) },
        },
        5: {
            requirementDescription: "2000 Acacia Logs",
            effectDescription: "Unlocks Enchanted Acacia Logs",
            done() { return player.al.best.gte(2000) },
        },
        6: {
            requirementDescription: "5000 Acacia Logs",
            effectDescription: "ph", //Weapon Savanna Bow
            done() { return player.al.best.gte(5000) },
        },
        7: {
            requirementDescription: "10000 Acacia Logs",
            effectDescription: "ph", //XP Foraging
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
            unlocked() { return hasMilestone("al", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.mul(upgradeEffect(this.layer, 51))
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
        25: {
            title: "Acacia Minion V",
            description: "Boosts first Acacia Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Acacia Minion VI",
            description: "Boosts first Acacia Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Acacia Minion VII",
            description: "Boosts first Acacia Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Acacia Minion VIII",
            description: "Boosts first Acacia Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Acacia Minion IX",
            description: "Boosts first Acacia Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Acacia Minion X",
            description: "Boosts first Acacia Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Acacia Minion XI",
            description: "Boosts first Acacia Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Acacia Logs",
            currencyInternalName: "alench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Acacia but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.plus(0.34)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Acacia Storage",
            description: "Boosts first Acacia Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Medium Acacia Storage",
            description: "Boosts first Acacia Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
    },

    clickables: {
        rows: 1,
        cols: 1,
        11:{
            display() {
                return "<h3>Reset for +1 Enchated Acacia Log<br><br> Acacia Logs " + format(player[this.layer].points) + " / 160 </h3>"
            },
            style: {   
                "width": "180px",
                "height": "120px",
            },
            canClick() {
                return player[this.layer].points.gte(160)
            },
            onClick() {
                if (player.al.points.gte(160)) {
                    player.al.points = player.al.points.sub(160)
                    player.al.alench = player.al.alench.add(1)
                }
            },
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
        jlench: new Decimal(0),
    }},
    branches: ["al"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Jungle Logs",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("ol", 11)) mult = mult.mul(2);
        if (hasUpgrade("ol", 12)) mult = mult.mul(upgradeEffect("ol",12));
        if (hasUpgrade("bl", 11)) mult = mult.mul(1.5);
        if (hasUpgrade("jl", 11)) mult = mult.mul(10);
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 5,

    doReset(resettingLayer) {
        let keep = [];
        let amount = player.this.layer.points
        if (hasMilestone(this.layer, 0)) keep.push("upgrades")
        if (hasMilestone(this.layer, 0)) keep.push("milestones")
        if (hasMilestone(this.layer, 0)) keep.push(amount)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },

    layerShown() { return hasMilestone("al", 1) },

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    tabFormat: {
        "Jungle Logs": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.jl.jlench) + "</h2> Enchanted Jungle Logs</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 11]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Jungle Logs": {
            unlocked() { return hasMilestone("jl", 5) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.jl.jlench) + "</h2> Enchanted Jungle Logs</div>"],
                "blank",
                "clickables",
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
            ]
        },
    },

    milestones: {
        0: {
            requirementDescription: "50 Jungle Logs",
            effectDescription: "Unlock Jungle Minions",
            done() { return player.jl.best.gte(50) },
        },
        1: {
            requirementDescription: "100 Jungle Logs",
            effectDescription: "ph", //Trade Jungle Leaves
            done() { return player.jl.best.gte(100) },
        },
        2: {
            requirementDescription: "250 Jungle Logs",
            effectDescription: "ph", //Portal Jungle Island
            done() { return player.jl.best.gte(250) },
        },
        3: {
            requirementDescription: "500 Jungle Logs",
            effectDescription: "ph", //Trade Vines
            done() { return player.jl.best.gte(500) },
        },
        4: {
            requirementDescription: "1000 Jungle Logs",
            effectDescription: "ph", //Biome Stick Jungle
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
            effectDescription: "ph", //XP Foraging
            done() { return player.jl.best.gte(10000) },
        },
        8: {
            requirementDescription: "25000 Jungle Logs",
            effectDescription: "ph", //Pet Ocelot
            done() { return player.jl.best.gte(25000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Jungle Axe",
            description: "x10 All Log gains",
            cost: new Decimal("3"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
            unlocked() { return hasMilestone(this.layer, 6) },
        },

        21: {
            title: "Jungle Minion I",
            description: "Generates 100% of Jungle Log Gain per second",
            unlocked() { return hasMilestone("jl", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.mul(1.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.mul(1.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.mul(1.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.mul(1.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.mul(upgradeEffect(this.layer, 51))
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
        25: {
            title: "Jungle Minion V",
            description: "Boosts first Jungle Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Jungle Minion VI",
            description: "Boosts first Jungle Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Jungle Minion VII",
            description: "Boosts first Jungle Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Jungle Minion VIII",
            description: "Boosts first Jungle Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Jungle Minion IX",
            description: "Boosts first Jungle Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Jungle Minion X",
            description: "Boosts first Jungle Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Jungle Minion XI",
            description: "Boosts first Jungle Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Jungle Logs",
            currencyInternalName: "jlench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Jungle but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Oak Storage",
            description: "Boosts first Oak Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(1.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.plus(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.plus(0.34)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Jungle Storage",
            description: "Boosts first Jungle Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Medium Jungle Storage",
            description: "Boosts first Jungle Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
    },

    clickables: {
        rows: 1,
        cols: 1,
        11:{
            display() {
                return "<h3>Reset for +1 Enchated Jungle Log<br><br> Jungle Logs " + format(player[this.layer].points) + " / 160 </h3>"
            },
            style: {   
                "width": "180px",
                "height": "120px",
            },
            canClick() {
                return player[this.layer].points.gte(160)
            },
            onClick() {
                if (player.jl.points.gte(160)) {
                    player.jl.points = player.jl.points.sub(160)
                    player.jl.jlench = player.jl.jlench.add(1)
                }
            },
        },     
    },
})

//Cobblestone Mine

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
//Unimportant trees like sand/snow/ice/gravel can be added later as they are unimportant

//Foraging

//Mining