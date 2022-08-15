const path = require('path');
//console logs the built dependency graph
class ModuleGraphExamplePlugin {
  apply(compiler) {
    const className = this.constructor.name;

    //tap into compilation
    compiler.hooks.compilation.tap(className, (compilation) => {
      //tap into finishModules hook
      compilation.hooks.finishModules.tap(className, (modules) => {
        //modules contain all built in modules (`NormalModule` instances produced by `NormalModuleFactory`)
        const {
          moduleGraph: { _moduleMap: moduleMap },
        } = compilation;

        //find root module to know where to start traversing the grapgh
        let firstLevelNodeKeys = [];
        for (const [key, value] of moduleMap.entries()) {
            if(value.incomingConnections.values().next().value.originModule === null) {
                firstLevelNodeKeys.push(key);
            }
        }

        debugger;
        const dfs = () => {
          const visited = new Map();

          const traverse = (crtNode) => {
            if (visited.get(crtNode)) {
              return;
            }

            visited.set(crtNode, true);
            //log the name of the module
            console.log(path.basename(crtNode?.resource));
            
            const correspondingGraphModule = moduleMap.get(crtNode);

            const children = new Set(
              Array.from(
                correspondingGraphModule.outgoingConnections || [],
                (c) => c.module
              )
            );
            for (const c of children) {
              traverse(c);
            }
          };

          //start traversal from level 1 (level 0 is the 'null module')
          for(const key of firstLevelNodeKeys) {
            traverse(key);
          }
          
        };

        console.log("---DFS Module graph---");
        dfs();
      });
    });
  }
}

module.exports = ModuleGraphExamplePlugin;
