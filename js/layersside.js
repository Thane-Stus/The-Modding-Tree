addLayer("c", {
    name: "Compactor",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: true,
        comslots: new Decimal(0),
    }},
    color: "#83622f",
    requires: new Decimal(),
    resource: "Compactor Slots",
    baseResource: "Work",
    baseAmount() {return player.points},
    type: "none",
    row: "side",
    layerShown(){return hasMilestone("cb", 2)},

    microtabs: {
        compactortabs: {
            "Foraging": {
                content: [
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                    ["row", [["buyable", 24], ["buyable", 25], ["buyable", 26]]],
                ],
                unlocked() { return true },
            },
            "Mining": {
                content: [
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 11], ["buyable", 11]]],
                    ["row", [["buyable", 11], ["buyable", 11], ["buyable", 11], ["buyable", 11]]],
                ],
                unlocked() { return true },
            },
        }
    },

    tabFormat: [
        ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#83622f;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.c.comslots) + "</h2> Free Compactor Slots</div>"],
        "blank",
        "upgrades",
        "blank",
        "respec-button",
        ["row", [["buyable", 11]]],
        ["microtabs", "compactortabs"]
    ],

    buyables: {
        rows: 1,
        cols: 1,
        showRespec() { return player.c.unlocked },
        respec() {
			player[this.layer].spent = new Decimal(0);
            resetBuyables(this.layer)
            doReset(this.layer, true)
            player.c.comslots = new Decimal(0)
        },
        respecText: "Reset Compactors",

        11: {
            title: "Compactor Slots",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("cb", 3) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (
                    "Amount: " + formatWhole(getBuyableAmount("c", this.id))+"\n\
                    Cap: " + formatWhole(data.cap)
                )
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            cap() {
                let cap = new Decimal(0)
                if (hasMilestone("cb", 2)) cap = cap.add(1)
                if (hasMilestone("cb", 4)) cap = cap.add(1)
                if (hasMilestone("cb", 6)) cap = cap.add(2)
                if (hasMilestone("cb", 8)) cap = cap.add(2)
                if (hasMilestone("cb", 9)) cap = cap.add(3)
                return cap
            },
            canAfford () { return player[this.layer].buyables[this.id].lt(tmp[this.layer].buyables[this.id].cap) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.add(1)
            },
        },

        21: {
            title: "Enchanted Oak Log",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("ol", 5) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
        22: {
            title: "Enchanted Birch Log",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("bl", 5) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
        23: {
            title: "Enchanted Spruce Log",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("sl", 5) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
        24: {
            title: "Enchanted Dark Oak Log",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("dl", 5) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
        25: {
            title: "Enchanted Acacia Log",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("al", 5) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
        26: {
            title: "Enchanted Acacia Log",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("jl", 5) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },

        31: {
            title: "Enchanted Cobblestone",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("cb", 3) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
        32: {
            title: "Enchanted Coal",
            style: {   
                "width": "120px",
                "height": "120px",
            },
            unlocked() { return hasMilestone("co", 3) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("Amount: " + formatWhole(getBuyableAmount("c", this.id)))
                return display;
            },
            cost() { 
                let cost = new Decimal(0)
                return cost 
            },
            canAfford () { return player.c.comslots.gte(1) },
            buy() { 
                player.c.buyables[this.id] = player.c.buyables[this.id].plus(1)
                player.c.comslots = player.c.comslots.sub(1)
            },
        },
    },
})