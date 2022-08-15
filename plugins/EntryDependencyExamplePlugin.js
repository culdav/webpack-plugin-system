class EntryDependencyExamplePlugin {
    apply(compiler) {
        compiler.hooks.entryOption.tap('EntryDependencyExamplePlugin', (context, entryObject) => {
            // const EntryOption = class {
            //     constructor (options) {
            //       this.options = options;
            //     };
        
            //     // Since this is still a plugin, we're abiding by the standard.
            //     apply(compiler) {
            //       // The `start` hook marks the start of the bundling process.
            //       // It will be called **after** `hooks.entryOption` is called.
            //       compiler.hooks.start('EntryOption', ({ createModuleTree }) => {
            //         // Creating new tree of modules, based on the configuration of this plugin.
            //         // The `EntryDependency` is a preliminary to an actual module instance. 
            //         // It will hold the module's request (i.e. path to file) and the module factory
            //         createModuleTree(new EntryDependency(this.options));
            //       });
            //     };
            // };
            // For each item in the `entryObject` we're preparing the creation of a module tree.
            
            console.log('---Entry objects---')
            debugger;
            for (const name in entryObject) {
                const obj = entryObject[name];
                // create a module tree for this entry.
                // new EntryOption({ name, fileName }).apply(compiler);
                console.log("EntryObject:", obj);
            };
        })
    }
}
module.exports = EntryDependencyExamplePlugin;