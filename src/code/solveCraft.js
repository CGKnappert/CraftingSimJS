import CrafterSim from '../code/craftingSim.js'

// this.enumReturnState = {
//     0: "Failed. Insufficient progress.",
//     1: "Failed. Insufficient CP.",
//     2: "Failed. Insufficient durability.",
//     3: "Failed. No macro.",
//     4: "Complete."
// }

const debugPrint = 1;

class CrafterSolver {
    constructor(craftsmanship, control, CP, recipeName, macro) {
        this.craftSim = new CrafterSim(recipeName, 0, craftsmanship, control, CP, 90, 0);
        this.craftSim.loadActions();
        this.craftSim.setRecipe(recipeName);
        this.currMacroState = null;
        this.macro = macro;
        this.simpleSynthesisStack = ['Basic Synthesis', 'Careful Synthesis', 'Groundwork'];
        this.synthesisStack = ['Basic Synthesis', 'Careful Synthesis', 'Focused Synthesis', 'Groundwork', 'Prudent Synthesis'];
        this.simpleTouchStack = ['Basic Touch', 'Standard Touch', 'Advanced Touch'];
        //TODO: Special circumstances for Trained Finesse, Delicate Synthesis and work in Observe to combo actions
        this.touchStack = ['Prudent Touch', 'Basic Touch', 'Standard Touch', 'Advanced Touch', 'Preparatory Touch', 'Focused Touch', 'Hasty Touch'];
    }
    
    get macro() { return this._macro }
    set macro(value) { this._macro = value }

    solve() {
        this.solveProgress()
        this.solveQuality()
        return this.macro;
    }

    solveProgress() {
        if (debugPrint) console.log("solveProgress");
        if (this.craftSim.difficulty === 0) { 
            console.log("Quitting cuz bad recipe")
            return;
        }
        // First get enough progress to finish
        // TODO:  if (this.macro === []) {
        if (true) {
            if (debugPrint) console.log("Starting progress with empty macro.");
            let needProgress = true;
            let step = 0;
            while (needProgress) {
                for (let i = 0; i < this.simpleSynthesisStack.length; i++) {
                    // Add or change step in to next simple synthesis
                    if (i === 0) { this.macro.push(this.simpleSynthesisStack[i]); }
                    else { this.macro[step] = this.simpleSynthesisStack[i]; }

                    if (debugPrint) console.log("Added " + this.macro[step]);
                    this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
                    if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));
                    if (this.currMacroState.returnState !== 0) { needProgress = false; }
                    if (this.currMacroState.returnState === 2) { needProgress = false; }
                }
                step++;
            }
            if (this.currMacroState.returnState === 2) {
                // Ran out of durability with simple crafts
                // Start with Veneration
                this.macro.unshift("Veneration");
                this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
                if (this.currMacroState.returnState !== 0) { needProgress = false; }
                if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));

                // If more needed add Muscle Memory
                this.macro.unshift("Muscle Memory");
                this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
                if (this.currMacroState.returnState !== 0) { needProgress = false; }
                if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));
            }
            
            if (this.currMacroState.returnState === 4) {
                // Able to complete now reduce
                if (this.macro.length > 2) {
                    //Veneration is worth it if more than 2 steps are synthesis
                    this.macro.unshift("Veneration");
                    this.macro.unshift("Muscle Memory");
                    this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
                    if (this.currMacroState.returnState !== 0) { needProgress = false; }
                    if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));
                }
                // Reduce
                for (let i = this.macro.length; i > 2; i--) {
                    for (let j = this.simpleSynthesisStack.length; j >= 0; j--) {
                        this.macro[i] = this.simpleSynthesisStack[j];
                        
                        this.currMacroState = this.craftSim.executeMacro(this.macro, 0, 0);
                        if (this.currMacroState.returnState === 0) { needProgress = false; }
                        if (debugPrint) console.log("Attempt made." + JSON.stringify(this.currMacroState));
                    }
                }


            }
        }
        //Then trim until minimum progress achieved
        return this.macro;
    }

    solveQuality() {
        return 0;
    }
}

export default CrafterSolver