const debug = 0;

class Action {
    constructor(name, durability, progressEfficiency, qualityEfficiency, CP, comboAction, comboBonus, specialist, successRate, buff, steps) {
        this.name = name;
        this.durability = durability;
        this.progressEfficiency = progressEfficiency
        this.qualityEfficiency = qualityEfficiency;
        this.CP = CP;
        this.comboAction = comboAction;
        this.comboBonus = comboBonus;
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
        console.log("comboAction: " + this.comboAction);
        console.log("comboBonus: " + this.comboBonus);
        console.log("specialist: " + String(this.specialist));
        console.log("buff: " + String(this.buff));
        console.log("steps: " + String(this.steps));
        console.log("");
    }

}

class Recipe {
    constructor(name) {
        let jsonString = require('../JSON/CraftRecipe.json');
        let recipeJSON = jsonString;

        for (var recipe of recipeJSON) {
            if (recipe["Name"] === name) {
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
        this.actionDict = {};
        this.activeBuffs = {};
        this.currMacro = [];
        this.startingQuality = startingQuality;
        // Crafter's properties
        this.craftsmanship = craftsmanship;
        this.control = control;
        this.maxCP = CP;
        this.clvl = clvl;
        this.specialist = specialist;
        // Craft instanced sim properties
        this.CP = CP;
        this.durability = 0;
        this.progress = 0;
        this.quality = startingQuality;
        // Recipe properties
        this.recipeDurability = 0;
        this.difficulty = 0;
        this.recipeQuality = 0;
        this.rlvl = 1;
        this.master = false;
        this.progressModifier = 1;
        this.progressDivider = 1;
        this.qualityModifier = 1;
        this.qualityDivider = 1;

        this.enumReturnState = {
            0: "Failed. Insufficient progress.",
            1: "Failed. Insufficient CP.",
            2: "Failed. Insufficient durability.",
            3: "Failed. No macro.",
            4: "Complete."
        }
    }

    get recipeName() { return this._recipeName }
    set recipeName(value) { this._recipeName = value }

    get recipe() { return this._recipe }
    set recipe(value) { this._recipe = value }

    get currMacro() { return this._currMacro }
    set currMacro(value) { this._currMacro = value }

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


    updateCrafterCraftsmanshipStat(craftsmanship) {
        this.craftsmanship = craftsmanship;
    }

    updateCrafterControlStat(control) {
        this.control = control;
    }

    updateCrafterCPStat(CP) {
        this.maxCP = CP;
    }

    updateCrafterClvlStat(clvl) {
        this.clvl = clvl;
    }

    updateCrafterSpecialistStat(specialist) {
        this.specialist = specialist;
    }

    updateCrafterStats(craftsmanship, control, CP, clvl, specialist) {
        console.log(craftsmanship);
        console.log(control);
        console.log(CP);
        this.craftsmanship = craftsmanship;
        this.control = control;
        this.maxCP = CP;
        this.clvl = clvl;
        this.specialist = specialist;
    }

    setRecipe(newRecipe) {
        // Set recipe name
        this.recipeName = newRecipe;
        // Get recipe and set class properties
        let currRecipe = new Recipe(this.recipeName);
        if (currRecipe.name !== "") {
            this.recipeDurability = currRecipe.durability;
            this.difficulty = currRecipe.difficulty;
            this.recipeQuality = currRecipe.quality;
            this.rlvl = currRecipe.rlvl;
            this.master = false;
            this.progressModifier = currRecipe.progressModifier;
            this.progressDivider = currRecipe.progressDivider;
            this.qualityModifier = currRecipe.qualityModifier;
            this.qualityDivider = currRecipe.qualityDivider;
            // Reset craft instance properties
            this.CP = this.MaxCP;
            this.durability = 0;
            this.progress = 0;
            this.quality = this.startingQuality;
        }
        console.log("Recipe set: " + currRecipe.name)

        return {
            recipeDurability: currRecipe.durability,
            recipeDifficulty: currRecipe.difficulty,
            recipeQuality: currRecipe.quality
        }
    }

    loadActions() {
        let jsonString = require('../JSON/CraftAction.json');
        let actionJSON = jsonString;

        let actionArray = {};

        for (let action of actionJSON) {
            //Trim all <formatting> from description string
            let description = action["Description"].replaceAll(/<[^>]+>/g, '');

            //durability cost is 10 unless stated otherwise
            let durability = (description.search(/Durability Cost/) < 0 ? 10 : parseInt(description.substring(description.search(/Restores item durability/), description.length).match(/\d{2}/i)));
            //Overwrite default durability cost to 0 if no cost, IE Trained Finesse, or if buff action
            if (description.search(/no cost to durability/) >= 0 || description.search(/no cost to durability/) >= 0 || action.ActionCategory !== null) {
                durability = 0;
            }
            //Set durability to 5 for prudent actions
            if (description.search(/half the durability/) >= 0) {
                durability = 5;
            }
            //Set durability to 20 for grundwork && preparatory toouch actions
            if (description.search(/greater cost to durability/) >= 0) {
                durability = 20;
            }
            //Set durability to 0 for non actions TODO: heart && Soul?
            if (['Tricks of the Trade', 'Observe', `Master's Mend`].includes(action["Name"])) {
                durability = 0;
            }

            //If progress && efficiency found in description string them set to 3 digits following it
            let progressEfficiency = 0
            if (description.search(/Efficiency/) >= 0 && description.search(/progress/) >= 0) {
                progressEfficiency = parseInt(description.substring(description.search(/Efficiency/), description.length).match(/\d{3}/i));
            }

            //If quality && efficiency found in description string them set to 3 digits following it
            let qualityEfficiency = 0
            if (description.search(/Efficiency/) >= 0 && description.search(/quality/) >= 0) {
                qualityEfficiency = parseInt(description.substring(description.search(/Efficiency/), description.length).match(/\d{3}/i));
            }

            let CP = (action["Cost"] ? action["Cost"] : 0);

            let comboAction = (description.search(/Combo Action/) >= 0 ? description.substring(description.search(/Combo Action/) + "Combo Action: ".length, description.search(/Combo Action/) + "Combo Action: ".length + description.substring(description.search(/Combo Action/) + "Combo Action: ".length, description.length).search(/\n\n/)) : "");
            let comboBonus = (description.search(/Combo Bonus/) >= 0 ? description.substring(description.search(/Combo Bonus/) + "Combo Bonus".length, description.length) : "");



            //exists
            let specialist = action["Specialist"];
            //success rate = 100% unless otherwise stated
            let successRate = (description.search(/Success Rate/) < 0 ? 100 : description.substring(description.search(/Success Rate/).length, description.length).match(/\d{2,3}/i)[0]);

            let buff = (action["ActionCategory"] !== undefined && action["ActionCategory"] !== null);

            let steps = 0;
            if (description.search("steps") && description.substring(description.search("steps") - 20, description.search("steps")).search("three") >= 0) {
                steps = 3;
            }
            if (description.search("steps") && description.substring(description.search("steps") - 20, description.search("steps")).search("four") >= 0) {
                steps = 4;
            }
            if (description.search("steps") && (description.substring(description.search("steps") - 20, description.search("steps")).search("five") >= 0 || description.substring(description.lastIndexOf("steps") - 20, description.lastIndexOf("steps")).search("five") >= 0)) {
                steps = 5;
            }
            if (description.search("steps") && description.substring(description.search("steps") - 20, description.search("steps")).search("eight") >= 0) {
                steps = 8;
            }

            let newAction = new Action(action["Name"], durability, progressEfficiency, qualityEfficiency, CP, comboAction, comboBonus, specialist, successRate, buff, steps);
            actionArray[newAction.name] = newAction;
            if (debug) newAction.print();
        }

        this.actionDict = actionArray;
    }


    executeStep(prevAction, action, condition, simulateConditions) {
        // Exit early if invalid action
        if (prevAction && action === "Reflect") return 0;
        if (prevAction && action === "Muscel Memory") return 0;

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
        if (actionType.name === "Byregot's Blessing" && this.activeBuffs["Inner Quiet"] > 0) actionType.qualityEfficiency = 100 + (20 * this.activeBuffs["Inner Quiet"]);

        // Set consts to temp vars so they can be adjusted based on conditions and combos
        let conditonMultiplier = 1.0
        let actionProgressEfficiency = actionType.progressEfficiency;
        let actionQualityEfficiency = actionType.qualityEfficiency;
        let CPCost = actionType.CP;
        let craftSuccess = true;

        if (simulateConditions) {
            // onyl need to calc conditions if simulating conditions, otherwise 1
            if (condition === "poor") conditonMultiplier = .5;
            if (condition === "good") conditonMultiplier = 1.5;
            if (condition === "excellent") conditonMultiplier = 4;

            //if combo action was not prior action and combo bonus is not changing success rate
            if (actionType.comboAction && (!(actionType.comboAction === prevAction && actionType.comboBonus.search(/success rate/)))) {
                const rand = Math.floor(Math.random() * (100 - 1) + 1);
                // simulate failure only if simulating conditions for monte carlo
                if (actionType.successRate <= rand) {
                    craftSuccess = false;
                    if (debug) console.log("failed! rate: " + actionType.successRate + " rand: " + rand);
                }
            }
        }

        //if combo action was prior action and combo bonus is changing CP cost 
        if (actionType.comboAction === prevAction && actionType.comboBonus.search(/CP cost/)) {
            CPCost = actionType.comboBonus.match(/\d{2}/i)[0]
        }

        // Quit before assessing new values if not enough CP for action
        if (this.CP < ((condition !== "pliant") ? CPCost : Math.ceil(CPCost / 2))) { return 1; }
        // decrease current CP amount by action cost
        if (debug) console.log("Spent " + String((condition !== "pliant") ? CPCost : Math.ceil(CPCost / 2)) + " CP")
        this.CP -= ((condition !== "pliant") ? CPCost : Math.ceil(CPCost / 2));

        // Calculate action progress or quality changes
        if (this.clvl >= this.rlvl && craftSuccess) {
            this.progress += Math.floor((Math.floor(((this.craftsmanship * 10) / this.progressDivider) + 2) * Math.floor(actionProgressEfficiency) / 100) * progressMultiplier);
            if (debug) console.log(this.progress);
            this.quality += Math.floor((Math.floor(((this.control * 10) / this.qualityDivider) + 35) * (actionQualityEfficiency * qualityEfficiencyMultiplier * conditonMultiplier) / 100) * qualityMultiplier);
            if (debug) console.log(this.quality);
        }
        //TODO: Else for underleveled

        // decrease durability while considering waste not
        if ((this.activeBuffs["Waste Not"] === undefined && this.activeBuffs["Waste Not II"] === undefined)) {
            this.durability -= Math.floor(actionType.durability);
        }
        else {
            this.durability -= Math.floor(Math.ceil(Math.floor(actionType.durability) / 10)) * 5;
        }

        // Add durability if Master's Mend
        if (actionType.name === "Master's Mend") {
            this.durability += 30;
        }
        
        //Remove any buffs consumed this step
        if (action.search("Byregot's") >= 0) delete this.activeBuffs["Inner Quiet"];
        if (action.search("Synthesis") >= 0) this.activeBuffs["Final Appraisal"] = 0;
        if (actionType.progressEfficiency > 0 && actionType.name !== "Muscle Memory" && this.activeBuffs["Muscle Memory"] > 0) this.activeBuffs["Muscle Memory"] = 0;

        //Decrement buff step count
        for (const [buff] of Object.entries(this.activeBuffs)) {
            if (buff !== "Inner Quiet" && this.activeBuffs[buff] >= 0) {
                this.activeBuffs[buff] = this.activeBuffs[buff] - 1;
                if (this.activeBuffs[buff] <= 0) delete this.activeBuffs[buff];
            }
        }

        //Evaluate buffs
        //TODO: observe combo action
        if (this.activeBuffs["Manipulation"] > 0) this.durability += 5;
        //Don't let durability overcap
        if (this.durability > this.recipeDurability) this.durability = this.recipeDurability;

        //Add any new buffs executed this step
        if ((this.actionDict[action].buff && this.activeBuffs[action] !== undefined) || action === "Muscle Memory") this.activeBuffs[action] = actionType.steps;
        else if (this.actionDict[action].buff) this.activeBuffs[action] = actionType.steps;

        //Increment Inner Quiet
        if ((action.search("Touch") >= 0 || actionType.name === "Delicate Synthesis") && this.activeBuffs["Inner Quiet"] >= 0) this.activeBuffs["Inner Quiet"] = this.activeBuffs["Inner Quiet"] + 1;
        else if (actionType.name.search("Touch") >= 0 || actionType.name === "Delicate Synthesis") this.activeBuffs["Inner Quiet"] = 1;
        if (actionType.name === "Preparatory Touch" && this.activeBuffs["Inner Quiet"] >= 0) this.activeBuffs["Inner Quiet"] = this.activeBuffs["Inner Quiet"] + 1;
        if (actionType.name === "Precise Touch" && this.activeBuffs["Inner Quiet"] >= 0) this.activeBuffs["Inner Quiet"] = this.activeBuffs["Inner Quiet"] + 1;
        if (!prevAction && actionType.name === "Reflect") this.activeBuffs["Inner Quiet"] = 3;
        if (this.activeBuffs["Inner Quiet"] >= 0 && this.activeBuffs["Inner Quiet"] > 10) this.activeBuffs["Inner Quiet"] = 10; //Cap Inner Quiet at 10

        // this.printStatus(action, condition);
    }

    executeMacro(macro, simulateConditions, expert) {
        let step = 0;
        this.durability = this.recipeDurability;
        this.activeBuffs = {};
        this.currMacro = macro;
        this.CP = this.maxCP;
        this.progress = 0;
        this.quality = this.startingQuality;
        var condition = "normal";

        if (!macro.length > 0) {
            return {
                returnState: 3,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            };
        }

        while (this.durability > 0 && this.progress < this.difficulty && step < macro.length) {
            let stepEnum = this.executeStep(macro[step - 1], macro[step], condition, simulateConditions);
            if (simulateConditions && !expert) {
                const rand = Math.floor(Math.random() * (100 - 1) + 1);
                if (rand <= 10) condition = "poor"; //10% chance of poor
                else if (rand <= 30) condition = "good"; //12% chance of good
                else if (rand <= 34) condition = "excellent"; //12% chance of excellent
            }
            else if (simulateConditions && expert) {
                const rand = Math.floor(Math.random() * (100 - 1) + 1);
                if (rand <= 12) { condition = "good" } //12% chance of good
                else if (rand <= 27) condition = "centered";//15% chance of centered
                else if (rand <= 39) condition = "pliant"; //12% chance of pliant
                else if (rand <= 54) condition = "sturdy"; //15% chance of sturdy
                else if (rand <= 66) condition = "malleable"; //12% chance of malleable
                else if (rand <= 78) condition = "primed"; //12% chance of primed
            }
            if (debug) console.log(condition);

            // Quit if run out of CP
            if (stepEnum === 1) {
                if (debug) console.log("Craft failed! Ran out of CP at step " + step);
                if (debug) console.log({
                    returnState: 1,
                    currBuffs: this.activeBuffs,
                    durability: this.durability,
                    progress: this.progress,
                    recipeDifficulty: this.difficulty,
                    quality: this.quality,
                    recipeQuality: this.recipeQuality,
                    currCP: this.CP,
                    recipe: this.recipeName,
                    macro: macro
                })
                return {
                    returnState: 1,
                    currBuffs: this.activeBuffs,
                    durability: this.durability,
                    progress: this.progress,
                    recipeDifficulty: this.difficulty,
                    quality: this.quality,
                    recipeQuality: this.recipeQuality,
                    currCP: this.CP,
                    recipe: this.recipeName,
                    macro: macro
                };
            }
            step += 1;
        }
        // TODO: Simplifiy
        if (this.progress >= this.difficulty) {
            if (debug) console.log("Craft Complete! with " + this.quality + " quality.");
            if (debug) console.log({
                returnState: 4,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            })
            return {
                returnState: 4,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            };
        }
        else if (this.durability <= 0) {
            if (debug) console.log("Craft Failed!");
            if (debug) console.log({
                returnState: 2,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            })
            return {
                returnState: 2,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            };
        }
        else {
            if (debug) console.log("Craft Incomplete!");
            if (debug) console.log({
                returnState: 0,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            })

            return {
                returnState: 0,
                currBuffs: this.activeBuffs,
                durability: this.durability,
                progress: this.progress,
                recipeDifficulty: this.difficulty,
                quality: this.quality,
                recipeQuality: this.recipeQuality,
                currCP: this.CP,
                recipe: this.recipeName,
                macro: macro
            };
        }
    }

    reformatMacro(macro) {
        return macro.replaceAll(/\/echo[^\n]+/g, '').replaceAll(/"*[\t\r\v\f ]*<[^>]+>[\t\r\v\f ]*/g, '').replaceAll(/\/ac\s+/g, '').replaceAll(/"\s*/g, '').split(/[\r\n]+/).filter((val) => val !== "");
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

    printCrafter() {
        console.log("craftsmanship: " + this.craftsmanship)
        console.log("control: " + this.control)
        console.log("CP: " + this.maxCP)
        console.log("clvl: " + this.clvl)
        console.log("recipeDurability: " + this.difficulty)
        console.log("difficulty: " + this.difficulty)
        console.log("recipeQuality: " + this.recipeQuality)
        console.log("rlvl: " + this.rlvl)
        console.log("master: " + this.master)
        console.log("recipeName: " + this.recipeName)
        console.log()
    }
}

export default CrafterSim