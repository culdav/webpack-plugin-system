const path = require('path');
const EntryDependencyExamplePlugin = require('./plugins/EntryDependencyExamplePlugin');
const ModuleGraphExamplePlugin = require('./plugins/ModuleGraphExamplePlugin');

module.exports = { 
    entry: {
        a: ['./src/a.js']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    mode: 'none',
    plugins: [
        new ModuleGraphExamplePlugin()
    ]
}