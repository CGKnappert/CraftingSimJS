import { ProgressViewIOSBase, TouchableNativeFeedbackBase } from 'react-native';
import CrafterSim from '../code/craftingSim.js'
import CraftSearchTree from '../code/CraftTree.js'
import CraftNode from '../code/CraftTree.js'

// this.enumReturnState = {
//     0: "Failed. Insufficient progress.",
//     1: "Failed. Insufficient CP.",
//     2: "Failed. Insufficient durability.",
//     3: "Failed. No macro.",
//     4: "Complete."
// }

const debugPrint = 1;
const startLoops = 50;
const maxExploration = .9;
const threadCount = 12;
const maxBranches = 500;

class CrafterSolver {
    constructor(craftsmanship, control, CP, recipeName, macro) {
        if (debugPrint) console.log("Craft Solver init with :");
        if (debugPrint) console.log("craftsmanship:" + craftsmanship);
        if (debugPrint) console.log("control:" + control);
        if (debugPrint) console.log("CP:" + CP);
        if (debugPrint) console.log("recipeName:" + recipeName);
        this.craftSim = new CrafterSim(recipeName, 0, craftsmanship, control, CP, 90, 0);
        this.craftSim.loadActions();
        this.craftSim.setRecipe(recipeName);
        this.currMacroState = null;
        this.startingMacro = macro;
        this.macro = macro;
        this.bestQuality = 0;
        this.bestMacro = macro;
        this.finishingSynthesis = "";
        this.simpleSynthesisStack = [`Basic Synthesis`, `Careful Synthesis`, `Groundwork`];
        this.synthesisStack = [`Basic Synthesis`, `Careful Synthesis`, `Focused Synthesis`, `Groundwork`, `Prudent Synthesis`];
        this.simpleTouchStack = [`Basic Touch`, `Standard Touch`, `Advanced Touch`];
        this.touchStack = [`Prudent Touch`, `Basic Touch`, `Standard Touch`, `Advanced Touch`, `Preparatory Touch`, `Focused Touch`, `Hasty Touch`];
        this.fullStack = [`Muscle Memory`, `Basic Synthesis`, `Careful Synthesis`, `Focused Synthesis`, `Delicate Synthesis`, `Groundwork`, `Prudent Synthesis`, `Prudent Touch`, `Basic Touch`, `Standard Touch`, `Advanced Touch`, `Preparatory Touch`, `Focused Touch`, `Hasty Touch`, `Byregot's Blessing`];
        this.buffStack = [`Innovation`, `Veneration`, `Great Strides`, `Manipulation`, `Master's Mend`, `Waste Not`, `Waste Not II`]
        //TODO: Special circumstances for Trained Finesse, Delicate Synthesis and work in Observe to combo actions

        this.possibleStarts = [];

        this.solvedMacros = {};
        this.solvedDict = {};
    }
    
    get macro() { return this._macro }
    set macro(value) { this._macro = value }

    solve() {
        // if (this.craftSim.recipe === undefined || this.craftSim.recipe === "") {
        //     console.log("Recipe not set. Cannot solve.");
        //     return;
        // }
        
        //Check for saved macros that we've solved before and easy return of solution previously found
        if (!this.solvedMacros && this.solvedMacros.contains(this.macro.toString())) {
            if (debugPrint) console.log("Solution found");
            return this.solvedMacros[this.macro.toString()];
        }

        // Determine if new macro needs started
        this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
        if (this.macro.length === 0 && this.craftSim.executeMacro(this.macro, 0, 0).returnState !== 4) {

            this.starterMacro()
            // this.solveQuality()
        }

        this.fullRandom()

        // this.solvedMacros[this.startingMacro.toString()] = this.macro.toString()

        if (debugPrint) console.log("solve returned: " + this.bestMacro);
        this.macro = this.bestMacro.slice();
        return this.bestMacro;
    }

    starterMacro() {
        if (debugPrint) console.log("solveProgress");
        if (this.craftSim.difficulty === 0) { 
            console.log("Quitting cuz bad recipe")
            return;
        }
        this.bestMacro = [];
        this.bestQuality = 0;
        let progessMacro = [];
        let qualityMacro = [];
        let finisherMacro = [];

        this.startProgress(progessMacro, finisherMacro);

        this.startQuality(qualityMacro)
    }

    startProgress(progessMacro, finisherMacro) {
        let needProgress = true;
        let step = 0;
        while (needProgress) {
            for (let i = 0; i < this.simpleSynthesisStack.length; i++) {
                if (needProgress) {
                    // Add or change step in to next simple synthesis
                    if (i === 0) { 
                        this.macro.push(this.simpleSynthesisStack[i]); 
                    }
                    else { 
                        this.macro[step] = this.simpleSynthesisStack[i]; 
                    }

                    // if (debugPrint) console.log("Added " + this.macro[step]);
                    this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);

                    if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));
                    // craft not yet complete, durability not yet 0. Save macro prior to completion
                    if (this.currMacroState.returnState === 0) { 
                        this.bestMacro = [...this.macro]; 
                        if (debugPrint) console.log("best!" + JSON.stringify(this.bestMacro));
                    }
                    // craft failed, durability reached 0
                    if (this.currMacroState.returnState === 2) { needProgress = false; }
                    // craft complete, can now roll back to just under finished
                    if (this.currMacroState.returnState === 4) { 
                        needProgress = false; 
                        // now finished but need to roll back in order to create room for quality before finishing
                        if (debugPrint) console.log("best!" + JSON.stringify(this.bestMacro));
                        this.macro = [...this.bestMacro]; 

                        // first attempt with smallest progress amount
                        progessMacro = this.macro;
                        this.macro.push("Basic Synthesis")
                        if (this.craftSim.executeMacro(this.macro, 0, 0).returnState === 4) {
                            this.finishingSynthesis = "Basic Synthesis"
                            this.macro = this.bestMacro; 
                        }
                        else {
                            // Basic was not enough, try more
                            this.macro.pop()
                            this.macro.push("Careful Synthesis")
                            if (this.craftSim.executeMacro(this.macro, 0, 0).returnState === 4) {
                                this.finishingSynthesis = "Careful Synthesis";
                                finisherMacro = "Careful Synthesis";
                                this.macro = this.bestMacro; 
                            }
                            if (debugPrint) console.log("Did not finish!" + JSON.stringify(this.currMacroState));
                        }
                    }
                }
            }
            step++;
            if (step > 100) { needProgress = false; }
        }
    }

    startQuality(qualityMacro) {
        if (debugPrint) console.log("Start Quality: " + this.macro + "," + this.finishingSynthesis);

        let needQuality = true;
        let firstTouchStep = this.macro.length + 1;
        let step = this.macro.length;
        this.macro.push(this.finishingSynthesis); 
        while (needQuality) {
            for (let i = 0; i < this.simpleTouchStack.length; i++) {
                if (needQuality) {
                    // Add or change step in to next simple synthesis
                    if (i === 0) { 
                        this.macro.pop(); 
                        this.macro.push(this.simpleTouchStack[i]); 
                        this.macro.push(this.finishingSynthesis); 
                    }
                    else { 
                        console.log(this.macro)
                        console.log(this.macro.length)
                        this.macro[this.macro.length - 2] = this.simpleTouchStack[i]; 
                    }

                    // if (debugPrint) console.log("Added " + this.macro[step]);
                    this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
                    if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));
                    // craft not yet complete, durability not yet 0
                    // if (this.currMacroState.returnState === 4 && this.currMacroState.quality >= this.craftSim.recipeQuality) { needQuality = false; }
                    // remember best macro
                    if (this.currMacroState.returnState === 4 && this.currMacroState.quality > this.bestQuality) { 
                        if (debugPrint) console.log("New high quality: " + this.currMacroState.quality)
                        this.bestQuality = this.currMacroState.quality; 
                        this.bestMacro = this.macro; 
                        qualityMacro = this.macro;
                    }
                    // exit when stepped too far
                    if (this.currMacroState.returnState !== 4) { needQuality = false; }
                }
                step++;
                if (step > 100) { needQuality = false; }
            }
        }
    }



    // solveQuality() {
    //     return 0;
    // }

    explore(startSynthesisMacro, qualityMacro, finishSynthesisMacro) {
        // Define Prog starte vs quality vs prog finisher
        // Def 100 potentcy prog & qual
        var craftTree = new CraftSearchTree(new CraftNode(this.craftSim.executeMacro(startSynthesisMacro.concat(qualityMacro).concat(finishSynthesisMacro), 0, 0)));
        // let currMacroState = this.craftSim.executeMacro(startSynthesisMacro.concat(qualityMacro.concat(finishSynthesisMacro)), 0, 0);


        // this.improveSynthesis(startSynthesisMacro, qualityMacro, finishSynthesisMacro, currMacroState)
        // Search tree for new branches to follow, find above threshold or X num of branches
        // Explore branches for a while
        for (let i = 0; i < 10; i++) {
            // threads to fill out tree?
            // Math out when to bryegot

            // based on end results
            // More CP / Better strokes, more buffs, new strokes
            // More durability? Add strokes
            // No dura, add / move manip / Waste Not

            // None availabile, move randomly? but logically?


            // Finishing cleanup
            // Closer?
            // Sort touches
            // Condense strokes? For when not to over HQ, consider only bad bryegot
            // 
        }
    }

    improveSynthesis(startSynthesisMacro, qualityMacro, finishSynthesisMacro, macroState) {
        if (macroState) {
        }
    }

    createNode(startSynthesisMacro, qualityMacro, finishSynthesisMacro) {
        return new CraftNode(this.craftSim.executeMacro(startSynthesisMacro.concat(qualityMacro).concat(finishSynthesisMacro), 0, 0));
    }

    addBuff() {
        //remove?
        // Add Veneration if progress within reason > two times??
        // Otherwise add Inno
    }

    addSynthesis() {
        //In Veneration is possible
        //Careful not to finish early
    }

    addTouch() {
        // Check if Inno to add to, or combo
        // 
    }

    changeSynthesis() {

    }

    changeTouch() {

    }

    randomSynthesis() {

    }

    randomTouch() {

    }

    fullRandom() {
        let i = 0
        let attempt = this.macro.slice();

        while (i < 1000) {
            attempt = this.bestMacro.slice(); 
            // 0 - 99
            if (Math.floor(Math.random() * 100) < 50) {
                //Change action
                if (debugPrint) console.log("Changing action randomly");
                attempt[Math.floor(Math.random() * attempt.length)] = this.fullStack[Math.floor(Math.random() * this.fullStack.length)];
            }
            else {
                // Add action
                let newPos = Math.floor(Math.random() * attempt.length);
                if (debugPrint) console.log("Adding action randomly at: " + newPos);
                attempt = [...attempt.slice(0, newPos), this.fullStack[Math.floor(Math.random() * this.fullStack.length)], ...attempt.slice(newPos)];
            }
            
            // 0 - 99
            if (Math.floor(Math.random() * 100) < 50) {
                // Add buff
                let newPos = Math.floor(Math.random() * attempt.length);
                if (debugPrint) console.log("Adding buff randomly at: " + newPos);
                attempt = [...attempt.slice(0, newPos), this.buffStack[Math.floor(Math.random() * (this.buffStack.length - 1))], ...attempt.slice(newPos)];
            }
            else {
                // Remove buff
                let newPos = Math.floor(Math.random() * attempt.length);
                if (debugPrint) console.log("Adding buff randomly at: " + newPos);
                attempt = [...attempt.slice(0, newPos - 1), ...attempt.slice(newPos)];
            }

            if (!this.solvedDict[attempt.toString()]) {
                if (debugPrint) console.log("Random Attempt: " + attempt);
                this.currMacroState = this.craftSim.executeMacro(attempt, 0, 0);

                this.solvedDict[attempt.toString()] = this.currMacroState
            }
            else {
                if (debugPrint) console.log("Attempt Found");
            }
            

            if (this.currMacroState.returnState === 4 && this.currMacroState.quality > this.bestQuality) { 
                if (debugPrint) console.log("New high quality: " + this.currMacroState.quality);
                this.bestQuality = this.currMacroState.quality; 
                if (debugPrint) console.log("Last step: " + this.currMacroState.finishingStep);
                // this.bestMacro = attempt.slice(0, this.currMacroState.finishingStep); 
            }
            else {
                if (debugPrint) console.log("No new high quality: " + this.currMacroState.quality);
                attempt = this.bestMacro.slice(); 
            }

            i++;
        }
    }
}

export default CrafterSolver