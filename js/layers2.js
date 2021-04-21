addLayer("cb", {
    name: "Cobblestone Mine",
    symbol: "CB",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        cbench: new Decimal(0),
        autotime: 0,
    }},
    branches: ["co"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Cobblestone",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("cb", 11)) mult = mult.mul(2);
        if (hasUpgrade("cb", 12)) mult = mult.mul(upgradeEffect("cb",12));
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

    update(diff){ //I borrowed this from pg132s Evcbution Tree, because I have no idea what the hell im doing
        let data = player.cb
        if (hasUpgrade("cb", 71)) {
            let mult = 1

            if (hasUpgrade("cb", 72)) mult *= 2
            if (hasUpgrade("cb", 73)) mult *= 2

            data.autotime += diff * mult
            
            if (data.autotime > 10) data.autotime = 10
            if (data.autotime > 1) {
                data.autotime += -1
                list = [11]

                for (i = 0; i < list.length; i++){
                    let id = list[i]
                    if (!tmp.cb.buyables[id].unlocked) continue
                    if (tmp.cb.buyables[id].canAfford) {
                        layers.cb.buyables[id].buy()

                        if (!hasUpgrade("cb", 71)) break
                    }
                }
            }
        } else {
            data.autotime = 0
        }
    },

    tabFormat: {
        "Cobblestone": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.cb.cbench) + "</h2> Enchanted Cobblestone</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                ["row", [["upgrade", 61], ["upgrade", 62], ["upgrade", 63], ["upgrade", 64]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Cobblestone": {
            unlocked() { return hasMilestone("cb", 3) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.cb.cbench) + "</h2> Enchanted Cobblestone</div>"],
                "blank",
                ["row", [["buyable", 11]]],
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
                ["row", [["upgrade", 71], ["upgrade", 72], ["upgrade", 73]]],
            ]
        },
    },

    milestones: {
        0: {
            requirementDescription: "50 Total Cobblestone",
            effectDescription: "Unlock Cobblestone Minion Upgrades, Minions are Automation",
            done() { return player.cb.total.gte(50) },
        },
        1: {
            requirementDescription: "100 Total Cobblestone",
            effectDescription: "Unlock the Coal Mine", //Stone Platform
            done() { return player.cb.total.gte(100) },
        },
        2: {
            requirementDescription: "250 Total Cobblestone",
            effectDescription: "Unlocks the Compactor I Upgrade, Compactors are automation for Enchanted items", //Auto Smelter, Compactor I
            done() { return player.cb.total.gte(250) },
        },
        3: {
            requirementDescription: "1000 Total Cobblestone",
            effectDescription: "Unlocks Enchanted Cobblestone",
            done() { return player.cb.total.gte(1000) },
        },
        4: {
            requirementDescription: "2500 Total Cobblestone",
            effectDescription: "Unlocks the Compactor II Upgrade", //Compactor, Compactor II
            done() { return player.cb.total.gte(2500) },
        },
        5: {
            requirementDescription: "5000 Total Cobblestone",
            effectDescription: "ph", //Pet Silverfish
            done() { return player.cb.total.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Total Cobblestone",
            effectDescription: "ph", //Armor Miner's Outfit
            done() { return player.cb.total.gte(10000) },
        },
        7: {
            requirementDescription: "25000 Total Cobblestone",
            effectDescription: "Unlocks Hyper Furnace Upgrade",
            done() { return player.cb.total.gte(25000) },
        },
        8: {
            requirementDescription: "40000 Total Cobblestone",
            effectDescription: "ph", //Talisman Haste Ring
            done() { return player.cb.total.gte(40000) },
        },
        9: {
            requirementDescription: "70000 Total Cobblestone",
            effectDescription: "Unlocks the Compactor III Upgrade",
            done() { return player.cb.total.gte(70000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Rookie Pickaxe",
            description: "x2 All Ore Gains and +1 Work Gain",
            cost: new Decimal("10"),
        },
        12: {
            title: "Promising Pickaxe",
            description: "Boosts Ore gains based on best Cobblestone count",
            cost: new Decimal("20"),
            effect() {
                eff = player[this.layer].best.add(1).ln().div(5).add(2) //Modified version of a formula from The Leveling Tree
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
        13: {
            title: "Furnace",
            description: "Unlocks a Minion boosting upgrade that costs Oak Logs",
            cost: new Decimal("8"),
            unlocked() { return hasMilestone("cb", 0) },
        },
        14: { //Make this cost 64 Enchanted Cobble and 8 Enchanted Coal
            unlocked() { return hasMilestone("cb", 7) },
            fullDisplay() {return "<h3>Hyper Furnace</h3><br>Unlocks a Minion boosting upgrade that costs Enchanted Oak Logs<br><br>Cost: 64 Enchanted Cobblestone and 8 Enchanted Coal"},
            canAfford() { 
                return player.cb.cbench.gte(64) && player.co.coench.gte(8)
            },
            onPurchase() {
                player.cb.cbench = player.cb.cbench.sub(64)
                player.co.coench = player.co.coench.sub(8)
            },
        },

        21: {
            title: "Cobblestone Minion I",
            description: "Generates 100% of Cobblestone Gain per second",
            unlocked() { return hasMilestone("cb", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.add(0.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.add(0.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.add(0.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.add(0.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.add(0.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.add(0.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.add(upgradeEffect(this.layer, 51))
                if(hasUpgrade(this.layer, 61)) eff = eff.add(0.05)
                if(hasUpgrade(this.layer, 62)) eff = eff.add(0.20)
                if(hasUpgrade(this.layer, 63)) eff = eff.add(0.05)
                if(hasUpgrade(this.layer, 64)) eff = eff.add(0.20)
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
        25: {
            title: "Cobblestone Minion V",
            description: "Boosts first Cobblestone Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Cobblestone Minion VI",
            description: "Boosts first Cobblestone Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Cobblestone Minion VII",
            description: "Boosts first Cobblestone Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Cobblestone Minion VIII",
            description: "Boosts first Cobblestone Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Cobblestone Minion IX",
            description: "Boosts first Cobblestone Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Cobblestone Minion X",
            description: "Boosts first Cobblestone Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Cobblestone Minion XI",
            description: "Boosts first Cobblestone Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Birch but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Storage",
            description: "Boosts first Cobblestone Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(0.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.add(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.add(0.33)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Storage",
            description: "Boosts first Cobblestone Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Large Storage",
            description: "Boosts first Cobblestone Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },

        //First set of Fuel upgrades
        //Maybe make these timed buyables later? Probably not.
        61: {
            title: "Coal",
            description: "Boosts first Cobblestone Minion gain by 5%",
            cost: new Decimal("1"),
            unlocked() { return hasMilestone("cb", 1) },
            effect() {
                let eff = Decimal.add(0.05);
                return eff
            },
            currencyDisplayName: "Coal",
            currencyInternalName: "points",
            currencyLocation() { return player.co },
        },
        62: {
            title: "Enchanted Coal",
            description: "Boosts first Cobblestone Minion gain by 20%",
            cost: new Decimal("1"),
            unlocked() { return hasMilestone("co", 3) },
            effect() {
                let eff = Decimal.add(0.20);
                return eff
            },
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player.co },
        },
        63: {
            title: "Charcoal",
            description: "Boosts first Cobblestone Minion gain by 5%",
            cost: new Decimal("1"),
            unlocked() { return hasUpgrade("cb", 13) },
            effect() {
                let eff = Decimal.add(0.05);
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        64: {
            title: "Enchanted Charcoal",
            description: "Boosts first Cobblestone Minion gain by 20%",
            cost: new Decimal("1"),
            unlocked() { return hasUpgrade("cb", 14) },
            effect() {
                let eff = Decimal.add(0.20);
                return eff
            },
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },

        71: {
            title: "Compactor I",
            description: "Gain 1 Enchanted Cobblestone per second",
            unlocked() { return hasMilestone("cb", 2) },
            cost: new Decimal("64"),
            currencyDisplayName: "Cobblestone",
            currencyInternalName: "points",
            currencyLocation() { return player.cb },
        },

        72: {
            title: "Compactor II",
            description: "Boosts Compactor I",
            unlocked() { return hasMilestone("cb", 4) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player.cb },
        },

        73: {
            title: "Compactor III",
            description: "Boosts Compactor I",
            unlocked() { return hasMilestone("cb", 9) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player.cb },
        },
    },

    buyables: {
        rows: 1,
        cols: 1,  
        11: {
            title: "Enchanted Cobblestone",
            style: {   
                "width": "180px",
                "height": "120px",
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (("Cost: " + format(player[this.layer].points) + " / " + formatWhole(data.cost) + " Cobblestone")+"\n\
                Amount: " + formatWhole(player.cb.cbench))
                return display;
            },
            cost() { 
                let cost = new Decimal(160)
                return cost 
            },
            canAfford () { return player[this.layer].points.gte(this.cost()) },
            buy() { 
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player.cb.cbench = player.cb.cbench.add(1)
            },
        },
    },
})

addLayer("co", {
    name: "Coal Mine",
    symbol: "CO",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        coench: new Decimal(0),
        cobench: new Decimal(0),
        autotime: 0,
    }},
    branches: ["co"],
    color: "#83622f",
    requires: new Decimal(10),
    resource: "Coal",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("cb", 11)) mult = mult.mul(2);
        if (hasUpgrade("cb", 12)) mult = mult.mul(upgradeEffect("cb",12));
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

    layerShown(){return hasMilestone("cb", 1)},

    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasUpgrade(this.layer, 21)) gain = gain.add(upgradeEffect(this.layer, 21));
        return gain
    },

    update(diff){ //I borrowed this from pg132s Evcoution Tree, because I have no idea what the hell im doing
        let data = player.co
        if (hasUpgrade("co", 71)) {
            let mult = 1

            if (hasUpgrade("co", 72)) mult *= 2
            if (hasUpgrade("co", 73)) mult *= 2

            data.autotime += diff * mult
            
            if (data.autotime > 10) data.autotime = 10
            if (data.autotime > 1) {
                data.autotime += -1
                list = [11]

                for (i = 0; i < list.length; i++){
                    let id = list[i]
                    if (!tmp.co.buyables[id].unlocked) continue
                    if (tmp.co.buyables[id].canAfford) {
                        layers.co.buyables[id].buy()

                        if (!hasUpgrade("co", 71)) break
                    }
                }
            }
        } else {
            data.autotime = 0
        }
    },

    tabFormat: {
        "Coal": {
            content: [
                "main-display", 
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.co.coench) + "</h2> Enchanted Coal</div>"],
                "blank",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.co.cobench) + "</h2> Enchanted Coal Block</div>"],
                "blank",
                "prestige-button", 
                "resource-display",
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53]]],
                ["row", [["upgrade", 61], ["upgrade", 62], ["upgrade", 63], ["upgrade", 64]]],
                "blank",
                "milestones"

            ]
        },
        "Enchanted Coal": {
            unlocked() { return hasMilestone("co", 3) },
            content: [
                "main-display",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.co.coench) + "</h2> Enchanted Coal</div>"],
                "blank",
                ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.co.cobench) + "</h2> Enchanted Coal Block</div>"],
                "blank",
                ["row", [["buyable", 11]]],
                "blank",
                ["row", [["upgrade", 25], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                ["row", [["upgrade", 34], ["upgrade", 35], ["upgrade", 41]]],
                ["row", [["upgrade", 71], ["upgrade", 72], ["upgrade", 73]]],
            ]
        },
    },

    milestones: {
        0: {
            requirementDescription: "50 Total Coal",
            effectDescription: "Unlock Coal Minion Upgrades",
            done() { return player.co.total.gte(50) },
        },
        1: {
            requirementDescription: "100 Total Coal",
            effectDescription: "Unlock the Iron Mine", //Book Smelting Touch I
            done() { return player.co.total.gte(100) },
        },
        2: {
            requirementDescription: "250 Total Coal",
            effectDescription: "ph", //Potion Haste
            done() { return player.co.total.gte(250) },
        },
        3: {
            requirementDescription: "1000 Total Coal",
            effectDescription: "Unlocks Enchanted Coal",
            done() { return player.co.total.gte(1000) },
        },
        4: {
            requirementDescription: "2500 Total Coal",
            effectDescription: "(Coming Soon) Unlocks Small Mining Sack", //Enchanted Charcoal is supposed to be here as well but I moved it to the Hyper Furnace ms/up in cb layer
            done() { return player.co.total.gte(2500) },
        },
        5: {
            requirementDescription: "5000 Total Coal",
            effectDescription: "(Coming Soon) Unlocks Medium Mining Sack", //Travel Scroll Gold Mine
            done() { return player.co.total.gte(5000) },
        },
        6: {
            requirementDescription: "10000 Total Coal",
            effectDescription: "Unlocks Enchanted Block of Coal",
            done() { return player.co.total.gte(10000) },
        },
        7: {
            requirementDescription: "25000 Total Coal",
            effectDescription: "(Coming Soon) Unlocks Enchanted Lava Bucket",
            done() { return player.co.total.gte(25000) },
        },
        8: {
            requirementDescription: "50000 Total Coal",
            effectDescription: "(Coming Soon) Unlocks Large Mining Sack", //Pet Wither Skeleton
            done() { return player.co.total.gte(50000) },
        },
    },

    upgrades: {
        rows: 5,
        cols: 5,

        21: {
            title: "Coal Minion I",
            description: "Generates 100% of Coal Gain per second",
            unlocked() { return hasMilestone("co", 0) },
            cost: new Decimal("80"),
            effect() {
                let eff = Decimal.plus(1);
                if(hasUpgrade(this.layer, 22)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 23)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 24)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 25)) eff = eff.add(0.06)
                if(hasUpgrade(this.layer, 31)) eff = eff.add(0.11)
                if(hasUpgrade(this.layer, 32)) eff = eff.add(0.11)
                if(hasUpgrade(this.layer, 33)) eff = eff.add(0.15)
                if(hasUpgrade(this.layer, 34)) eff = eff.add(0.15)
                if(hasUpgrade(this.layer, 35)) eff = eff.add(0.21)
                if(hasUpgrade(this.layer, 41)) eff = eff.add(0.21)
                if(hasUpgrade(this.layer, 51)) eff = eff.add(upgradeEffect(this.layer, 51))
                if(hasUpgrade(this.layer, 61)) eff = eff.add(0.05)
                if(hasUpgrade(this.layer, 62)) eff = eff.add(0.20)
                if(hasUpgrade(this.layer, 63)) eff = eff.add(0.05)
                if(hasUpgrade(this.layer, 64)) eff = eff.add(0.20)
                return eff
            },
            effectDisplay() { return format(this.effect()) },
        },
        22: {
            title: "Coal Minion II",
            description: "Boosts first Coal Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 21) },
            cost: new Decimal("160"),
        },
        23: {
            title: "Coal Minion III",
            description: "Boosts first Coal Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 22) },
            cost: new Decimal("320"),
        },
        24: {
            title: "Coal Minion IV",
            description: "Boosts first Coal Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 23) },
            cost: new Decimal("512"),
        },
        25: {
            title: "Coal Minion V",
            description: "Boosts first Coal Minion gain by 6%",
            unlocked() { return hasUpgrade(this.layer, 24) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player[this.layer] },
        },
        31: {
            title: "Coal Minion VI",
            description: "Boosts first Coal Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 25) },
            cost: new Decimal("24"),
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player[this.layer] },
        },
        32: {
            title: "Coal Minion VII",
            description: "Boosts first Coal Minion gain by 11%",
            unlocked() { return hasUpgrade(this.layer, 31) },
            cost: new Decimal("64"),
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player[this.layer] },
        },
        33: {
            title: "Coal Minion VIII",
            description: "Boosts first Coal Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 32) },
            cost: new Decimal("128"),
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player[this.layer] },
        },
        34: {
            title: "Coal Minion IX",
            description: "Boosts first Coal Minion gain by 15%",
            unlocked() { return hasUpgrade(this.layer, 33) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player[this.layer] },
        },
        35: {
            title: "Coal Minion X",
            description: "Boosts first Coal Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 34) },
            cost: new Decimal("512"),
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player[this.layer] },
        },
        41: {
            title: "Coal Minion XI",
            description: "Boosts first Coal Minion gain by 21%",
            unlocked() { return hasUpgrade(this.layer, 35) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Coal Blocks",
            currencyInternalName: "cobench",
            currencyLocation() { return player[this.layer] },
        },
        //Minion XII gets added with Tita and DM

        //These should show in ALL layers, always costs Birch but has different names because you need a new one for each Minion
        //The effect from the Small storage directly boosts the base minion
        51: {
            title: "Small Storage",
            description: "Boosts first Coal Minion gain by 33%",
            cost: new Decimal("64"),
            unlocked() { return hasMilestone("ol", 3) },
            effect() {
                let eff = Decimal.add(0.33);
                if(hasUpgrade(this.layer, 52)) eff = eff.add(0.33)
                if(hasUpgrade(this.layer, 53)) eff = eff.add(0.33)
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        //Medium and Large storage cost Enchanted Oak and boost Small Storage effect
        52: {
            title: "Medium Storage",
            description: "Boosts first Coal Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 6) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },
        53: {
            title: "Large Storage",
            description: "Boosts first Coal Minion gain by 33%",
            unlocked() { return hasMilestone("ol", 8) },
            cost: new Decimal("256"),
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },

        //First set of Fuel upgrades
        //Maybe make these timed buyables later? Probably not.
        61: {
            title: "Coal",
            description: "Boosts first Coal Minion gain by 5%",
            cost: new Decimal("1"),
            unlocked() { return hasMilestone("cb", 1) },
            effect() {
                let eff = Decimal.add(0.05);
                return eff
            },
        },
        62: {
            title: "Enchanted Coal",
            description: "Boosts first Coal Minion gain by 20%",
            cost: new Decimal("1"),
            unlocked() { return hasMilestone("co", 3) },
            effect() {
                let eff = Decimal.add(0.20);
                return eff
            },
            currencyDisplayName: "Enchanted Coal",
            currencyInternalName: "coench",
            currencyLocation() { return player.co },
        },
        63: {
            title: "Charcoal",
            description: "Boosts first Coal Minion gain by 5%",
            cost: new Decimal("1"),
            unlocked() { return hasUpgrade("cb", 13) },
            effect() {
                let eff = Decimal.add(0.05);
                return eff
            },
            currencyDisplayName: "Oak Logs",
            currencyInternalName: "points",
            currencyLocation() { return player.ol },
        },
        64: {
            title: "Enchanted Charcoal",
            description: "Boosts first Coal Minion gain by 20%",
            cost: new Decimal("1"),
            unlocked() { return hasUpgrade("cb", 14) },
            effect() {
                let eff = Decimal.add(0.20);
                return eff
            },
            currencyDisplayName: "Enchanted Oak Logs",
            currencyInternalName: "olench",
            currencyLocation() { return player.ol },
        },

        71: {
            title: "Compactor I",
            description: "Gain 1 Enchanted Birch Log per second",
            unlocked() { return hasMilestone("cb", 4) },
            cost: new Decimal("8"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player.cb },
        },

        72: {
            title: "Compactor II",
            description: "Boosts Compactor I",
            unlocked() { return hasMilestone("cb", 4) },
            cost: new Decimal("16"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player.cb },
        },

        73: {
            title: "Compactor III",
            description: "Boosts Compactor I",
            unlocked() { return hasMilestone("cb", 4) },
            cost: new Decimal("32"),
            currencyDisplayName: "Enchanted Cobblestone",
            currencyInternalName: "cbench",
            currencyLocation() { return player.cb },
        },
    },

    buyables: {
        rows: 1,
        cols: 2,  
        11: {
            title: "Enchanted Coal",
            style: {   
                "width": "180px",
                "height": "120px",
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (("Cost: " + format(player[this.layer].points) + " / " + formatWhole(data.cost) + " Coal")+"\n\
                Amount: " + formatWhole(player.co.coench))
                return display;
            },
            cost() { 
                let cost = new Decimal(160)
                return cost 
            },
            canAfford () { return player[this.layer].points.gte(this.cost()) },
            buy() { 
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player.co.coench = player.co.coench.add(1)
            },
        },
        12: {
            title: "Enchanted Coal Blocks",
            style: {   
                "width": "180px",
                "height": "120px",
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (("Cost: " + format(player.co.coench) + " / " + formatWhole(data.cost) + " Enchanted Coal")+"\n\
                Amount: " + formatWhole(player.co.cobench))
                return display;
            },
            cost() { 
                let cost = new Decimal(160)
                return cost 
            },
            canAfford () { return player.co.coench.gte(this.cost()) },
            buy() { 
                player[this.layer].coench = player[this.layer].coench.sub(this.cost())
                player.co.cobench = player.co.cobench.add(1)
            },
        },
    },
})

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