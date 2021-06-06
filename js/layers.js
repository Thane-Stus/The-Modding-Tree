addLayer("f", {
    name: "Foraging",
    symbol: "F",
    position: 0,
    row: 0,
    color: "#4BDC13",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        oaklogs: new Decimal(0),
        oaklogstotal: new Decimal(0),
        birchlogs: new Decimal(0),
        birchlogstotal: new Decimal(0),
        sprucelogs: new Decimal(0),
        sprucelogstotal: new Decimal(0),
        darkoaklogs: new Decimal(0),
        darkoaklogstotal: new Decimal(0),
        acacialogs: new Decimal(0),
        acacialogstotal: new Decimal(0),
        junglelogs: new Decimal(0),
        junglelogstotal: new Decimal(0),
    }},
    requires: new Decimal(100),
    resource: "Foraging Experience",
    baseResource: "Stamina",
    baseAmount() {return player.points},
    type: "none",
    layerShown(){return true},

    microtabs: {
        foraging: {
            "Oak": {
                content: [
                    ["row", [["buyable", 1], ["buyable", 11]]],
                    "blank",
                    ["column", [["milestone", 51], ["milestone", 52], ["milestone", 53], ["milestone", 54], ["milestone", 55], ["milestone", 56], ["milestone", 57], ["milestone", 58], ["milestone", 59]]],
                ],
                unlocked() { return true },
            },
            "Birch": {
                content: [
                    ["row", [["buyable", 2], ["buyable", 12]]],
                ],
                unlocked() { return hasMilestone("f", 1) },
            },
            "Spruce": {
                content: [
                    ["row", [["buyable", 3], ["buyable", 13]]],
                ],
                unlocked() { return hasMilestone("f", 2) },
            },
            "Dark Oak": {
                content: [
                    ["row", [["buyable", 4], ["buyable", 14]]],
                ],
                unlocked() { return hasMilestone("f", 3) },
            },
            "Acacia": {
                content: [
                    ["row", [["buyable", 5], ["buyable", 15]]],
                ],
                unlocked() { return hasMilestone("f", 4) },
            },
            "Jungle": {
                content: [
                    ["row", [["buyable", 6], ["buyable", 16]]],
                ],
                unlocked() { return hasMilestone("f", 5) },
            },
            "Axes": {
                content: [
                    ["row", [["upgrade", 1]]],
                ],
                unlocked() { return player.f.points.gte(30) },
            },
        },
    },

    tabFormat: [
        ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#4BDC13;text-shadow:#83622f 0px 0px 10px;'>" + formatWhole(player.f.points) + "</h2> Foraging Experience Points</div>"],
        ["display-text", () => "<div style='width:360px'>You have <h2 style='color:#4BDC13;text-shadow:#83622f 0px 0px 0px;'>" + formatWhole(player.eq.points) + "</h2> Coins</div>"],
        "blank",
        ["display-text", () => "<div style='width:360px'>Oak Logs: " + formatWhole(player.f.oaklogs) + "</div>"],
        ["display-text", () => "<div style='width:360px'>Birch Logs: " + formatWhole(player.f.birchlogs) + "</div>"],
        ["display-text", () => "<div style='width:360px'>Spruce Logs: " + formatWhole(player.f.sprucelogs) + "</div>"],
        ["display-text", () => "<div style='width:360px'>Dark Oak Logs: " + formatWhole(player.f.darkoaklogs) + "</div>"],
        ["display-text", () => "<div style='width:360px'>Acacia Logs: " + formatWhole(player.f.acacialogs) + "</div>"],
        ["display-text", () => "<div style='width:360px'>Jungle Logs: " + formatWhole(player.f.junglelogs) + "</div>"],
        "blank",
        ["microtabs", "foraging"],
        "blank",
        ["column", [["milestone", 1], ["milestone", 2], ["milestone", 3], ["milestone", 4], ["milestone", 5], ["milestone", 6]]],
    ],

    buyables: {
        //Gathering
        1: {
            display() { return "Gather Oak Logs \nCost: 10 Stamina" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.points.gte(10) },
            buy() {
                player.f.oaklogs = player.f.oaklogs.add(1)
                player.f.points = player.f.points.add(6)
                player.points = player.points.sub(10)

                if(hasUpgrade(this.layer, 1)) player.f.oaklogs = player.f.oaklogs.add(1)
            },
        },

        2: {
            display() { return "Gather Birch Logs \nCost: 10 Stamina" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.points.gte(10) },
            buy() {
                player.f.birchlogs = player.f.birchlogs.add(1)
                player.f.points = player.f.points.add(6)
                player.points = player.points.sub(10)

                if(hasUpgrade(this.layer, 1)) player.f.birchlogs = player.f.birchlogs.add(1)
            },
        },

        3: {
            display() { return "Gather Spruce Logs \nCost: 10 Stamina" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.points.gte(10) },
            buy() {
                player.f.sprucelogs = player.f.sprucelogs.add(1)
                player.f.points = player.f.points.add(6)
                player.points = player.points.sub(10)

                if(hasUpgrade(this.layer, 1)) player.f.sprucelogs = player.f.sprucelogs.add(1)
            },
        },

        4: {
            display() { return "Gather Dark Oak Logs \nCost: 10 Stamina" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.points.gte(10) },
            buy() {
                player.f.darkoaklogs = player.f.darkoaklogs.add(1)
                player.f.points = player.f.points.add(6)
                player.points = player.points.sub(10)

                if(hasUpgrade(this.layer, 1)) player.f.darkoaklogs = player.f.darkoaklogs.add(1)
            },
        },

        5: {
            display() { return "Gather Acacia Logs \nCost: 10 Stamina" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.points.gte(10) },
            buy() {
                player.f.acacialogs = player.f.acacialogs.add(1)
                player.f.points = player.f.points.add(6)
                player.points = player.points.sub(10)

                if(hasUpgrade(this.layer, 1)) player.f.acacialogs = player.f.acacialogs.add(1)
            },
        },

        6: {
            display() { return "Gather Jungle Logs \nCost: 10 Stamina" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.points.gte(10) },
            buy() {
                player.f.junglelogs = player.f.junglelogs.add(1)
                player.f.points = player.f.points.add(6)
                player.points = player.points.sub(10)

                if(hasUpgrade(this.layer, 1)) player.f.junglelogs = player.f.junglelogs.add(1)
            },
        },

        //Selling
        11: {
            display() { return "Sell an Oak Log for 2 Coins" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.f.oaklogs.gte(1) },
            buy() {
                player.f.oaklogs = player.f.oaklogs.sub(1)
                player.eq.points = player.eq.points.add(2)
            },
            unlocked() { return player.f.points.gte(30) }
        },

        12: {
            display() { return "Sell a Birch Log for 2 Coins" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.f.birchlogs.gte(1) },
            buy() {
                player.f.birchlogs = player.f.birchlogs.sub(1)
                player.eq.points = player.eq.points.add(2)
            },
        },

        13: {
            display() { return "Sell a Spruce Log for 2 Coins" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.f.sprucelogs.gte(1) },
            buy() {
                player.f.sprucelogs = player.f.sprucelogs.sub(1)
                player.eq.points = player.eq.points.add(2)
            },
        },

        14: {
            display() { return "Sell a Dark Oak Log for 2 Coins" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.f.darkoaklogs.gte(1) },
            buy() {
                player.f.darkoaklogs = player.f.darkoaklogs.sub(1)
                player.eq.points = player.eq.points.add(2)
            },
        },
        
        15: {
            display() { return "Sell an Acacia Log for 2 Coins" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.f.acacialogs.gte(1) },
            buy() {
                player.f.acacialogs = player.f.acacialogs.sub(1)
                player.eq.points = player.eq.points.add(2)
            },
        },

        16: {
            display() { return "Sell a Jungle Log for 2 Coins" },
            style: {   
                "width": "120px",
                "height": "120px",
            },
            canAfford() { return player.f.junglelogs.gte(1) },
            buy() {
                player.f.junglelogs = player.f.junglelogs.sub(1)
                player.eq.points = player.eq.points.add(2)
            },
        },
    },

    upgrades: {
        //Axes
        1: {
            title: "Rookie Axe",
            description: "Doubles ALL Log Gains",
            cost: new Decimal(12),
            currencyDisplayName: "Coins",
            currencyInternalName: "points",
            currencyLocation() { return player.eq },
        },
    },

    milestones: {
        //1-50 Foraging Levels
        //51-59 Oak
        //61-69 Birch
        //71-79 Spruce
        //81-89 Dark Oak
        //91-99 Acacia
        //101-109 Jungle

        1: {
            requirementDescription: "50 Foraging Experience",
            effectDescription: "Unlocks Birch Logs and add +0.1 to Stamina Gain",
            done() { return player.f.points.gte(50) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },

        2: {
            requirementDescription: "125 Foraging Experience",
            effectDescription: "Unlocks Spruce Logs and add +0.1 to Stamina Gain",
            done() { return player.f.points.gte(125) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },
        
        3: {
            requirementDescription: "200 Foraging Experience",
            effectDescription: "Unlocks Dark Oak Logs and add +0.1 to Stamina Gain",
            done() { return player.f.points.gte(200) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },
        
        4: {
            requirementDescription: "300 Foraging Experience",
            effectDescription: "Unlocks Acacia Logs and add +0.1 to Stamina Gain",
            done() { return player.f.points.gte(300) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },

        5: {
            requirementDescription: "500 Foraging Experience",
            effectDescription: "Unlocks Jungle Logs and add +0.1 to Stamina Gain",
            done() { return player.f.points.gte(500) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },

        6: {
            requirementDescription: "More Coming Soon",
            effectDescription: "PH",
            done() { return player.f.points.gte(50000) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },

        //Oak Collection
        51: {
            requirementDescription: "50 Oak Logs",
            effectDescription: "(Coming Soon) Unlocks Oak Minion",
            done() { return player.f.oaklogs.gte(50) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
        },
        52: {
            requirementDescription: "100 Oak Logs",
            effectDescription: "PH",
            done() { return player.f.oaklogstotal.gte(100) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 51)}
        },
        53: {
            requirementDescription: "250 Oak Logs",
            effectDescription: "PH",
            done() { return player.f.oaklogstotal.gte(250) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 52)}
        },
        54: {
            requirementDescription: "500 Oak Logs",
            effectDescription: "(Coming Soon) Unlocks Small Storage",
            done() { return player.f.oaklogstotal.gte(500) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 53)}
        },
        55: {
            requirementDescription: "1000 Oak Logs",
            effectDescription: "PH",
            done() { return player.f.oaklogstotal.gte(1000) },
            style: {   
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 54)}
        },
        56: {
            requirementDescription: "2000 Oak Logs",
            effectDescription: "(Coming Soon) Unlocks Enchanted Oak Logs",
            done() { return player.f.oaklogstotal.gte(2000) },
            style: {
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 55)}
        },
        57: {
            requirementDescription: "5000 Oak Logs",
            effectDescription: "(Coming Soon) Unlocks Medium Storage",
            done() { return player.f.oaklogstotal.gte(5000) },
            style: {
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 56)}
        },
        58: {
            requirementDescription: "10000 Oak Logs",
            effectDescription: "PH",
            done() { return player.f.oaklogstotal.gte(10000) },
            style: {
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 57)}
        },
        59: {
            requirementDescription: "30000 Oak Logs",
            effectDescription: "(Coming Soon) Unlocks Large Storage",
            done() { return player.f.oaklogstotal.gte(30000) },
            style: {
                "width": "480px",
                "height": "40px",
            },
            unlocked() {return hasMilestone(this.layer, 58)}
        },
    },
})