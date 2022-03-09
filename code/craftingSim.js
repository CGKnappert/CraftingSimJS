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

    get name() { return this._name }
    set name(value) { this._name = value }

    get durability() { return this._durability }
    set durability(value) { this._durability = value }

    get difficulty() { return this._difficulty }
    set difficulty(value) { this._difficulty = value }

    get quality() { return this._quality }
    set quality(value) { this._quality = value }

    get rlvl() { return this._rlvl }
    set rlvl(value) { this._rlvl = value }

    get master() { return this._master }
    set master(value) { this._master = value }

    get progressModifier() { return this._progressModifier }
    set progressModifier(value) { this._progressModifier = value }

    get progressDivider() { return this._progressDivider }
    set progressDivider(value) { this._progressDivider = value }

    get qualityModifier() { return this._qualityModifier }
    set qualityModifier(value) { this._qualityModifier = value }

    get qualityDivider() { return this._qualityDivider }
    set qualityDivider(value) { this._qualityDivider = value }
}

class CrafterSim {
    constructor(recipeName, startingQuality, craftsmanship, control, CP, clvl, specialist) {
        this.recipeName = recipeName;
        this.durability = 0;
        this.craftsmanship = craftsmanship;
        this.control = control;
        this.maxCP = CP;
        this.CP = CP;
        this.clvl = clvl;
        this.specialist = specialist;
        this.progress = 0;
        this.startingQuality = startingQuality;
        this.quality = startingQuality;
        this.actionDict = {};
        this.activeBuffs = {};

        let currRecipe = new Recipe(this.recipeName);
        this.recipeDurability = currRecipe.durability;
        this.difficulty = currRecipe.difficulty;
        this.recipeQuality = currRecipe.quality;
        this.rlvl = currRecipe.rlvl;
        this.master = false;
        this.progressModifier = currRecipe.progressModifier;
        this.progressDivider = currRecipe.progressDivider;
        this.qualityModifier = currRecipe.qualityModifier;
        this.qualityDivider = currRecipe.qualityDivider;

    }

    get recipeName() { return this._recipeName }
    set recipeName(value) { this._recipeName = value }

    get recipe() { return this._recipe }
    set recipe(value) { this._recipe = value }

    get durability() { return this._durability }
    set durability(value) { this._durability = value }

    get craftsmanship() { return this._craftsmanship }
    set craftsmanship(value) { this._craftsmanship = value }

    get progress() { return this._progress }
    set progress(value) { this._progress = value }

    get control() { return this._control }
    set control(value) { this._control = value }
    
    get maxCP() { return this._maxCP }
    set maxCP(value) { this._maxCP = value }

    get CP() { return this._CP }
    set CP(value) { this._CP = value }
    
    get clvl() { return this._clvl }
    set clvl(value) { this._clvl = value }

    get specialist() { return this._specialist }
    set specialist(value) { this._specialist = value }
    
    get startingQuality() { return this._startingQuality }
    set startingQuality(value) { this._startingQuality = value }

    get quality() { return this._quality }
    set quality(value) { this._quality = value }

    get actionDict() { return this._actionDict }
    set actionDict(value) { this._actionDict = value }

    get activeBuffs() { return this._activeBuffs }
    set activeBuffs(value) { this._activeBuffs = value }

    get recipeDurability() { return this._recipeDurability }
    set recipeDurability(value) { this._recipeDurability = value }

    get difficulty() { return this._difficulty }
    set difficulty(value) { this._difficulty = value }

    get quality() { return this._quality }
    set quality(value) { this._quality = value }

    get rlvl() { return this._rlvl }
    set rlvl(value) { this._rlvl = value }

    get master() { return this._master }
    set master(value) { this._master = value }

    get progressModifier() { return this._progressModifier }
    set progressModifier(value) { this._progressModifier = value }

    get progressDivider() { return this._progressDivider }
    set progressDivider(value) { this._progressDivider = value }

    get qualityModifier() { return this._qualityModifier }
    set qualityModifier(value) { this._qualityModifier = value }

    get qualityDivider() { return this._qualityDivider }
    set qualityDivider(value) { this._qualityDivider = value }

    loadActions() {
        const fileReader = require('../JSON/CraftAction.json');
        const fs = require('fs');
        const path = require('path');
        
        let jsonString = fs.readFileSync(path.join(__dirname,'..', '/JSON', 'CraftAction.json'));
        let actionJSON = JSON.parse(jsonString);

        let actionArray = {};

        for (let action of actionJSON) {
            //Trim all <formatting> from description string
            let description = action["Description"].replaceAll(/<[^>]+>/g, '');

            //durability cost is 10 unless stated otherwise
            let durability = (description.search(/Durability Cost/) < 0 ? 10 : parseInt(description.substring(description.search(/Restores item durability/), description.length).match(/\d{2}/i)));
            //Overwrite default durability cost to 0 if no cost, IE Trained Finesse, or if buff action
            if(description.search(/no cost to durability/) >= 0 || description.search(/no cost to durability/) >= 0 || action.ActionCategory !== null) { 
                durability = 0;
            }
            //Set durability to 5 for prudent actions
            if(description.search(/half the durability/) >= 0) { 
                    durability = 5;
            }
            //Set durability to 20 for grundwork and preparatory toouch actions
            if(description.search(/greater cost to durability/) >= 0) { 
                    durability = 20;
            }
            //Set durability to 0 for non actions TODO: heart and Soul?
            if(['Tricks of the Trade', 'Observe', `Master's Mend`].includes(action["Name"])) { 
                    durability = 20;
            }

            //If progress && efficiency found in description string them set to 3 digits following it
            let progressEfficiency = 0
            if(description.search(/Efficiency/) >= 0 && description.search(/progress/) >= 0) {
                progressEfficiency = parseInt(description.substring(description.search(/Efficiency/), description.length).match(/\d{3}/i));
            }

            //If quality && efficiency found in description string them set to 3 digits following it
            let qualityEfficiency = 0
            if(description.search(/Efficiency/) >= 0 && description.search(/quality/) >= 0) {
                qualityEfficiency = parseInt(description.substring(description.search(/Efficiency/), description.length).match(/\d{3}/i));
            }

            let CP = (action["Cost"] ? action["Cost"] : 0);

            let extraEffect = (action["ActionCategory"] ? action["Name"] : "");
            //exists
            let specialist = action["Specialist"];
            //success rate = 100% unless otherwise stated
            let successRate =  (description.search(/Success Rate/) < 0 ? 100: description.substring(description.search(/Success Rate/), description.length).match(/\d{2,3}/i)[0]);

            let buff = (action["ActionCategory"] != undefined);

            let steps = 0;
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

            let newAction = new Action(action["Name"], durability, progressEfficiency, qualityEfficiency, CP, extraEffect, specialist, successRate, buff, steps);
            actionArray[newAction.name] = newAction;
            // newAction.print();
        }

        this.actionDict = actionArray;
    }


    executeStep(action, condition) {
        //TODO: simulate buffs, simulate expert, prep with < 10, expert buffs
        const actionType = this.actionDict[action];

        let progressMultiplier = 1.0;
        //If Muscle Memory buff is up, curent action is synthesis && not muscle memory
        if (actionType.name !== "Muscle Memory" && "Muscle Memory" in this.activeBuffs && actionType.progressEfficiency > 0) progressMultiplier += 1;

        let qualityEfficiencyMultiplier = 1.0;
        if (this.activeBuffs["Inner Quiet"] > 0 && actionType.qualityEfficiency > 0) qualityEfficiencyMultiplier = qualityEfficiencyMultiplier + this.activeBuffs["Inner Quiet"] * .1;
        //qualityEfficiencyMultiplier += 0 if not actionType.name == "Byregot's Blessing" or not this.activeBuffs.get("Inner Quiet") else this.activeBuffs["Inner Quiet"] * 20

        let qualityMultiplier = 1.0;
        if (this.activeBuffs["Innovation"] > 0 && actionType.qualityEfficiency > 0) qualityMultiplier = qualityMultiplier + .5;
        if (actionType.name == "Byregot's Blessing" &&  this.activeBuffs["Inner Quiet"] > 0) actionType.qualityEfficiency = 100 + (20 * this.activeBuffs["Inner Quiet"]);

        let conditonMultiplier = 1.0
        if (condition == "poor") conditonMultiplier = .5;
        if (condition == "good") conditonMultiplier = 1.5;
        if (condition == "excellent") conditonMultiplier = 4;
        console.log(qualityMultiplier)

        if (this.clvl >= this.rlvl) {
            this.progress += Math.floor((Math.floor(((this.craftsmanship * 10) / this.progressDivider) + 2) * Math.floor(actionType.progressEfficiency) / 100) * progressMultiplier);
            this.quality += Math.floor((Math.floor(((this.control * 10) / this.qualityDivider) + 35) * (actionType.qualityEfficiency  * qualityEfficiencyMultiplier * conditonMultiplier) / 100) * qualityMultiplier);

        }

        //TODO: Else for underleveled
        if ((this.activeBuffs["Waste Not"] == undefined && this.activeBuffs["Waste Not II"] == undefined)) {
             this.durability -= Math.floor(actionType.durability); 
            }
        else { 
                 this.durability -= Math.floor(Math.ceil(Math.floor(actionType.durability) / 10)) * 5;
        }

        if ( (condition !== "pliant") ? this.CP -= actionType.CP : Math.ceil(actionType.CP / 2) );

        //Remove any buffs consumed this step
        if (action.search("Byregot's") >= 0) this.activeBuffs["Inner Quiet"] = 0;
        if (actionType.progressEfficiency > 0 && actionType.name !== "Muscle Memory" && this.activeBuffs["Muscle Memory"] > 0) this.activeBuffs["Muscle Memory"] = 0;

        //Decrement buff step count
        for (const [buff, value] of Object.entries(this.activeBuffs)) {
            if (buff !== "Inner Quiet" && this.activeBuffs[buff] >= 0) {
                this.activeBuffs[buff] = this.activeBuffs[buff] - 1;
                if (this.activeBuffs[buff] <= 0) delete this.activeBuffs[buff];
            }
        }

        //Evaluate buffs
        //TODO: Muscle Memory, observe combo action,
        if (this.activeBuffs["Manipulation"] > 0) this.durability += 5;
        //Don't let durability overcap
        if (this.durability > this.recipeDurability) this.durability = this.recipeDurability;

        //Add any new buffs executed this step
        if (this.actionDict[action].buff && this.activeBuffs[action] !== undefined || action == "Muscle Memory" || action == "Observe") this.activeBuffs[action] = actionType.steps;
        else if (this.actionDict[action].buff) this.activeBuffs[action] = actionType.steps;
        // if (this.actionDict[action].buff && this.activeBuffs[action] !== undefined || action == "Observe") this.activeBuffs[action] = actionType.steps;
        // else if (this.actionDict[action].buff) this.activeBuffs[action] = actionType.steps;


        //Increment Inner Quiet
        if (action.search("Touch") >= 0 && this.activeBuffs["Inner Quiet"] >= 0) this.activeBuffs["Inner Quiet"] = this.activeBuffs["Inner Quiet"] + 1;
        else if (action.search("Touch") >= 0) this.activeBuffs["Inner Quiet"] = 1;
        if (actionType.name == "Preparatory Touch" && this.activeBuffs["Inner Quiet"] >= 0) this.activeBuffs["Inner Quiet"] = this.activeBuffs["Inner Quiet"] + 1;
        if (actionType.name == "Precise Touch" && this.activeBuffs["Inner Quiet"] >= 0) this.activeBuffs["Inner Quiet"] = this.activeBuffs["Inner Quiet"] + 1;
        if (this.activeBuffs["Inner Quiet"] >= 0 && this.activeBuffs["Inner Quiet"] > 10) this.activeBuffs["Inner Quiet"] = 10; //Cap Inner Quiet at 10

        sim.printStatus(action, condition);
    }

    executeMacro(macro, simulateConditions, expert) {
        let step = 0;
        this.durability = this.recipeDurability;
        console.log(this.maxCP)
        console.log(this.CP)
        this.CP = this.maxCP;
        this.progress = 0;
        this.quality = this.startingQuality;

        while (this.durability > 0 && this.progress < this.difficulty && step < macro.length) {
            var condition = "normal";
            if (simulateConditions && !expert) {
                const rand = Math.floor(Math.random() * (100 - 1) + 1)
                if (rand <= 10) condition = "poor"; //10% chance of poor
                else if (rand <= 30) condition = "good"; //12% chance of good
                else if (rand <= 34) condition = "excellent"; //12% chance of excellent
            }
            else if (simulateConditions && expert) {
                const rand = Math.floor(Math.random() * (100 - 1) + 1)
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

        if (this.progress >= this.difficulty) {
            console.log("Craft Complete! with " + this.quality + " quality.");
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
        console.log("Executing Step: " + action)
        console.log("Condition: " + condition)
        console.log("Durability: " + this._durability)
        console.log("Progress: " + this.progress)
        console.log("Quality: " + this.quality)
        console.log("CP: " + this.CP)
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

sim.executeMacro(sim.reformatMacro(macro), false, false);