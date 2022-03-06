class Action {
    constructor(name, durability, progressEfficiency, qualityEfficiency, CP, extraEffect, specialist, successRate, buff, steps) {
        this.name = name;
        this.durability = durability;
        this.progressEfficiency = progressEfficiency
        this.qualityEfficiency = qualityEfficiency;
        this.CP = CP;
        this.extraEffect = extraEffect;
        this.specialist = specialist;
        this.successRate = successRate;
        this.buff = buff;
        this.steps = steps;
    }

    print() {
        console.log("Name: " + String(this.name));
        console.log("durability: " + String(this.durability));
        console.log("progressEfficiency: " + String(this.progressEfficiency));
        console.log("qualityEfficiency: " + String(this.qualityEfficiency));
        console.log("CP: " + String(this.CP));
        console.log("successRate: " + String(this.successRate));
        console.log("extraEffect: " + this.extraEffect);
        console.log("specialist: " + String(this.specialist));
        console.log("buff: " + String(this.buff));
        console.log("steps: " + String(this.steps));
        console.log();
    }

}

class Recipe {
    // constructor(name, durability, difficulty, quality, rlvl, progressModifier, progressDivider, qualityModifier, qualityDivider, master) {
    //     this.name = name;
    //     this.durability = durability;
    //     this.difficulty = difficulty;
    //     this.quality = quality;
    //     this.rlvl = rlvl;
    //     this.master = master;
    //     this.progressModifier = progressModifier;
    //     this.progressDivider = progressDivider;
    //     this.qualityModifier = qualityModifier;
    //     this.qualityDivider = qualityDivider;
    // }

    constructor(name) {
        const fs = require('fs');
        const path = require('path');

        let jsonString = fs.readFileSync(path.join(__dirname,'..', '/JSON', 'CraftRecipe.json'));
        let recipeJSON = JSON.parse(jsonString);

        for (var recipe of recipeJSON) {
            if(recipe["Name"] == name) {
                console.log("Found: " + name)
                this.name = name;
                this.durability = recipe["RecipeLevelTable"]["Durability"];
                this.difficulty = recipe["RecipeLevelTable"]["Difficulty"];
                this.quality = recipe["RecipeLevelTable"]["Quality"];
                this.rlvl = recipe["RecipeLevelTable"]["ClassJobLevel"];
                this.master = false;
                this.progressModifier = recipe["RecipeLevelTable"]["ProgressModifier"];
                this.progressDivider = recipe["RecipeLevelTable"]["ProgressDivider"];
                this.qualityModifier = recipe["RecipeLevelTable"]["QualityModifier"];
                this.qualityDivider = recipe["RecipeLevelTable"]["QualityDivider"];
            }
        }
    }
    
    print() {
        console.log("Name: " + String(this.name));
        console.log("durability: " + String(this.durability));
        console.log("difficulty: " + String(this.difficulty));
        console.log("quality: " + String(this.quality));
        console.log("rlvl: " + String(this.rlvl));
        console.log("master: " + String(this.master));
        console.log("progressModifier: " + this.progressModifier);
        console.log("progressDivider: " + String(this.progressDivider));
        console.log("qualityModifier: " + String(this.buqualityModifierff));
        console.log("qualityDivider: " + String(this.qualityDivider));
        console.log();
    }
}

class CrafterSim {
    constructor(recipe, startingQuality, craftsmanship, control, CP, clvl, specialist) {
        this.Recipe = new Recipe(recipe);
        this.durability = 0;
        this.craftsmanship = craftsmanship;
        this.control = control;
        this.maxCP = CP;
        this.CP = CP;
        this.clvl = clvl;
        this.specialist = specialist
        this.progress = 0;
        this.startingQuality = startingQuality;
        this.quality = startingQuality;
        this.actionDict = {};
        this.activeBuffs = {};
    }

    loadActions() {
        const fileReader = require('../JSON/CraftAction.json');
        const fs = require('fs');
        const path = require('path');
        
        let jsonString = fs.readFileSync(path.join(__dirname,'..', '/JSON', 'CraftAction.json'));
        let actionJSON = JSON.parse(jsonString);

        let actionArray = {};

        for (var action of actionJSON) {
            //Trim all <formatting> from description string
            var description = action["Description"].replaceAll(/<[^>]+>/g, '');

            //durability cost is 10 unless stated otherwise
            var durability = (description.search(/Durability Cost/) < 0 ? 10 : parseInt(description.substring(description.search(/Restores item durability/), description.length).match(/\d{2}/i)));
            //Overwrite default durability cost to 0 if no cost, IE Trained Finesse, or if buff action
            if(description.search(/no cost to durability/) >= 0 || description.search(/no cost to durability/) >= 0 || action.ActionCategory !== null) { 
                durability = 0;
            }
            //Set durability to 5 for prudent actions
            if(description.search(/half the durability/) >= 0) { 
                    durability = 5;
            }

            //If progress && efficiency found in description string them set to 3 digits following it
            var progressEfficiency = 0
            if(description.search(/Efficiency/) >= 0 && description.search(/progress/) >= 0) {
                progressEfficiency = parseInt(description.substring(description.search(/Efficiency/), description.length).match(/\d{3}/i));
            }

            //If quality && efficiency found in description string them set to 3 digits following it
            var qualityEfficiency = 0
            if(description.search(/Efficiency/) >= 0 && description.search(/quality/) >= 0) {
                qualityEfficiency = parseInt(description.substring(description.search(/Efficiency/), description.length).match(/\d{3}/i));
            }

            var CP = (action["Cost"] ? action["Cost"] : 0);

            var extraEffect = (action["ActionCategory"] ? action["Name"] : "");
            //exists
            var specialist = action["Specialist"];
            //success rate = 100% unless otherwise stated
            var successRate =  (description.search(/Success Rate/) < 0 ? 100: description.substring(description.search(/Success Rate/), description.length).match(/\d{2,3}/i)[0]);

            var buff = action["ActionCategory"];

            var steps = 0;
            if (description.search("steps") && description.substring(description.search("steps")-20, description.search("steps")).search("three") >= 0) { 
                steps = 3;
            }
            if (description.search("steps") && description.substring(description.search("steps")-20, description.search("steps")).search("four") >= 0) { 
                steps = 4;
            }
            if (description.search("steps") && description.substring(description.search("steps")-20, description.search("steps")).search("five") >= 0) { 
                steps = 5;
            }
            if (description.search("steps") && description.substring(description.search("steps")-20, description.search("steps")).search("eight") >= 0) { 
                steps = 8;
            }

            var newAction = new Action(action["Name"], durability, progressEfficiency, qualityEfficiency, CP, extraEffect, specialist, successRate, buff, steps);
            actionArray[newAction.name] = newAction;
        }

        this.actionDict = actionArray;
    }


    executeStep(action, condition) {
        //TODO: simulate buffs, simulate expert, prep with < 10, expert buffs
        const actionType = this.actionDict[action];
        actionType.print();

        var progressMultiplier = 1.0;
        //If Muscle Memory buff is up, curent action is synthesis && not muscle memory
        if (!actionType.name == "Muscle Memory" && this.activeBuffs["Muscle Memory"] !== undefined && actionType.progressEfficiency > 0) { progressMultiplier += 1 };

        var qualityEfficiencyMultiplier = 1.0;
        if (this.activeBuffs["Inner Quiet"] !== undefined && actionType.qualityEfficiency > 0) qualityEfficiencyMultiplier += this.activeBuffs["Inner Quiet"] * .1;
        //qualityEfficiencyMultiplier += 0 if not actionType.name == "Byregot's Blessing" or not this.activeBuffs.get("Inner Quiet") else this.activeBuffs["Inner Quiet"] * 20

        var qualityMultiplier = 1.0;
        if (this.activeBuffs["Innovation"] !== undefined && actionType.qualityEfficiency > 0) qualityMultiplier += .5;
        if (actionType.name == "Byregot's Blessing" && this.activeBuffs["Inner Quiet"] !== undefined) actionType.qualityEfficiency = 100 + (20 * this.activeBuffs["Inner Quiet"]);

        var conditonMultiplier = 1.0
        if (condition == "poor") conditonMultiplier = .5;
        if (condition == "good") conditonMultiplier = 1.5;
        if (condition == "excellent") conditonMultiplier = 4;

        if (this.clvl >= this.Recipe.rlvl) {
            this.progress += Math.floor((Math.floor(((this.craftsmanship * 10) / this.Recipe.progressDivider) + 2) * Math.floor(actionType.progressEfficiency) / 100) * progressMultiplier);
            this.quality += Math.floor((Math.floor(((this.control * 10) / this.Recipe.qualityDivider) + 35) * (actionType.qualityEfficiency  * qualityEfficiencyMultiplier * conditonMultiplier) / 100) * qualityMultiplier);
        }

        //TODO: Else for underleveled
        if ((!this.activeBuffs["Waste Not"] !== undefined && !this.activeBuffs["Waste Not II"] !== undefined) ? this.durability -= Math.floor(actionType.durability) : this.durability -= Math.floor(math.ceil(Math.floor(actionType.durability) / 10)) * 5);

        if ( (!condition == "pliant") ? this.CP -= actionType.CP : Math.ceil(actionType.CP / 2) )

        //Remove any buffs consumed this step
        if (action.search("Byregot's") >= 0) this.activeBuffs["Inner Quiet"] = 0;
        if (actionType.progressEfficiency > 0 && !actionType.name == "Muscle Memory") this.activeBuffs["Muscle Memory"] = 0;

        //Decrement buff step count
        for (const [buff, value] of Object.entries(this.activeBuffs)) {
            if (!buff == "Inner Quiet" || this.activeBuffs[buff] <= 0) {
                this.activeBuffs[buff] -= 1
                if (this.activeBuffs[buff] <= 0) this.activeBuffs.pop(buff);
            }
        }

        //Evaluate buffs
        //TODO: Muscle Memory, observe combo action,
        if (this.activeBuffs["Manipulation"] !== undefined) this.durability += 5;

        //Add any new buffs executed this step
        if (this.actionDict[action].buff && this.activeBuffs[action] !== undefined || action == "Muscle Memory") this.activeBuffs[action] = actionType.steps;
        else if (this.actionDict[action].buff) this.activeBuffs[action] = actionType.steps;
        if (this.actionDict[action].buff && this.activeBuffs[action] !== undefined || action == "Observe") this.activeBuffs[action] = actionType.steps;
        else if (this.actionDict[action].buff) this.activeBuffs[action] = actionType.steps;


        //Increment Inner Quiet
        if (action.search("Touch") >= 0 && this.activeBuffs["Inner Quiet"] !== undefined) this.activeBuffs["Inner Quiet"] += 1;
        else if (action.search("Touch") >= 0) this.activeBuffs["Inner Quiet"] = 1;
        if (action.search("Preparatory Touch") >= 0 && this.activeBuffs["Inner Quiet"] !== undefined) this.activeBuffs["Inner Quiet"] += 1;
        if (action.search("Precise Touch") >= 0 && this.activeBuffs["Inner Quiet"] !== undefined) this.activeBuffs["Inner Quiet"] += 1;
        if (this.activeBuffs["Inner Quiet"] !== undefined && this.activeBuffs["Inner Quiet"] > 10) this.activeBuffs["Inner Quiet"] = 10; //Cap Inner Quiet at 10


        sim = new CrafterSim("Cunning Craftsman's Draught", 0, 3320, 3373, 500, 90, 0);
        sim.printStatus(action, condition);
    }

    executeMacro(macro, simulateConditions, expert) {
        var step = 0;
        this.durability = this.Recipe.durability;
        // console.log(this.durability);
        this.CP = this.maxCP;
        this.progress = 0;
        this.quality = this.startingQuality;

        while (this.durability > 0 && this.progress < this.Recipe.difficulty && step < macro.length) {
            var condition = "normal";
            console.log(this.durability);
            if (simulateConditions && !expert) {
                var rand = Math.floor(Math.random() * (100 - 1) + 1)
                if (rand <= 10) condition = "poor"; //10% chance of poor
                else if (rand <= 30) condition = "good"; //12% chance of good
                else if (rand <= 34) condition = "excellent"; //12% chance of excellent
            }
            else if (simulateConditions && expert) {
                var rand = Math.floor(Math.random() * (100 - 1) + 1)
                if (rand <= 12) { condition = "good" } //12% chance of good
                else if (rand <= 27) condition = "centered";//15% chance of centered
                else if (rand <= 39) condition = "pliant"; //12% chance of pliant
                else if (rand <= 54) condition = "sturdy"; //15% chance of sturdy
                else if (rand <= 66) condition = "malleable"; //12% chance of malleable
                else if (rand <= 78) condition = "primed"; //12% chance of primed
            }
            this.executeStep(macro[step], condition);
            step += 1;
        }

        if (this.progress >= this.Recipe.difficulty) {
            console.log("Craft Complete! with " + str(this.quality) + " quality.");
            return this.quality;
        }
        else if (this.durability <= 0) {
            console.log("Craft Failed!");
            return 0;
        }
        else {
            console.log("Craft Incomplete!");
            return 0;
        }
    }

    reformatMacro(macro) {
        return macro.replaceAll(/\/echo[^\n]+/g, '').replaceAll(/"*[\t\r\v\f ]*<[^>]+>[\t\r\v\f ]*/g, '').replaceAll(/\/ac\s+/g, '').replaceAll(/"\s*/g, '').split(/[\r\n]+/).filter((val) => val != "");
    }

    printStatus(action, condition) {
        console.log("Executing Step: " + String(action))
        console.log("Condition: " + String(condition))
        console.log("Durability: " + String(this.durability))
        console.log("Progress: " + String(this.progress))
        console.log("Quality: " + String(this.quality))
        console.log("CP: " + String(this.CP))
        console.log("Buffs: ")
        console.log(this.activeBuffs)
        console.log()
    }
}

macro = `/ac "Muscle Memory" <wait.3>
/ac Manipulation <wait.2>
/ac "Waste Not II" <wait.2>
/ac Groundwork <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac Innovation <wait.2>  
/ac "Preparatory Touch" <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac "Preparatory Touch" <wait.3>
/ac "Byregot's Blessing" <wait.3>
/ac Groundwork <wait.3>
/ac "Careful Synthesis" <wait.3>
/echo Craft finished <se.1>`

sim = new CrafterSim("Cunning Craftsman's Draught", 0, 3320, 3373, 500, 90, 0);
sim.loadActions();

sim.executeMacro(sim.reformatMacro(macro), true, false);