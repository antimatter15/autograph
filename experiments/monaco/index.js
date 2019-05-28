

// https://blog.expo.io/building-a-code-editor-with-monaco-f84b3a06deaf



// (1) Desired editor features:
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js';
import 'monaco-editor/esm/vs/editor/browser/widget/diffEditorWidget.js';
import 'monaco-editor/esm/vs/editor/browser/widget/diffNavigator.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js';
import 'monaco-editor/esm/vs/editor/contrib/colorPicker/colorDetector.js';
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js';
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js';
import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/cursorUndo.js';
import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js';
import 'monaco-editor/esm/vs/editor/contrib/format/formatActions.js';
// import 'monaco-editor/esm/vs/editor/contrib/goToDeclaration/goToDeclarationCommands.js';
// import 'monaco-editor/esm/vs/editor/contrib/goToDeclaration/goToDeclarationMouse.js';
import 'monaco-editor/esm/vs/editor/contrib/gotoError/gotoError.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
import 'monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace.js';
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/links/links.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js';
// import 'monaco-editor/esm/vs/editor/contrib/quickFix/quickFixCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/referenceSearch/referenceSearch.js';
import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js';
import 'monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect.js';
import 'monaco-editor/esm/vs/editor/contrib/snippet/snippetController2.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode.js';
import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js';
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickOutline.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickCommand.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

// (2) Desired languages:
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
import 'monaco-editor/esm/vs/language/css/monaco.contribution';
// import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import 'monaco-editor/esm/vs/language/html/monaco.contribution';
// import 'monaco-editor/esm/vs/basic-languages/bat/bat.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/coffee/coffee.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/csp/csp.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/dockerfile/dockerfile.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/fsharp/fsharp.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/go/go.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/handlebars/handlebars.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/ini/ini.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/java/java.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/less/less.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/lua/lua.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/msdax/msdax.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/objective-c/objective-c.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/pgsql/pgsql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/php/php.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/postiats/postiats.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/powershell/powershell.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/pug/pug.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/python/python.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/r/r.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/razor/razor.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/redis/redis.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/redshift/redshift.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/sb/sb.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/scss/scss.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/solidity/solidity.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/swift/swift.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/vb/vb.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';



self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        // if (label === 'json') {
        //  return './json.worker.bundle.js';
        // }
        if (label === 'css') {
         return './css.worker.bundle.js';
        }
        if (label === 'html') {
         return './html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
}

// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//   target: monaco.languages.typescript.ScriptTarget.ES2016,
//   allowNonTsExtensions: true,
//   moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
//   module: monaco.languages.typescript.ModuleKind.CommonJS,
//   noEmit: true,
//   typeRoots: ["node_modules/@types"],
//   jsx: monaco.languages.typescript.JsxEmit.React,
//   jsxFactory: 'JSXAlone.createElement',
// })

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  // jsx: 'react',
  // moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  // module: monaco.languages.typescript.ModuleKind.CommonJS,

  jsx: monaco.languages.typescript.JsxEmit.React,
  jsxFactory: 'React.createElement',
  reactNamespace: 'React',
  allowNonTsExtensions: true,
  allowJs: true,
  target: monaco.languages.typescript.ScriptTarget.Latest,
});


// require('raw-loader!@types/react/index.d.ts').default

monaco.languages.typescript.typescriptDefaults.addExtraLib(
    require('raw-loader!@types/react/index.d.ts').default, 'file:///node_modules/@types/react/index.d.ts');

// monaco.languages.typescript.typescriptDefaults.addExtraLib(
//     require('raw-loader!react/cjs/react.production.min.js').default, 'node_modules/react/index.js');


// monaco.languages.typescript.typescriptDefaults.addExtraLib(
//     'export declare function foo():string;', 'node_modules/@types/external/index.d.ts');



// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//  target: monaco.languages.typescript.ScriptTarget.ES2016,
//  allowNonTsExtensions: true,
//  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
// });

import GoldenLayout from 'golden-layout'
import 'golden-layout/src/css/goldenlayout-base.css'
import './layout.less'

var config = {
settings: {
showPopoutIcon: false,
},
dimensions: {
        // borderWidth: 5,
        // minItemHeight: 10,
        // minItemWidth: 10,
        headerHeight: 40,
        // dragProxyWidth: 300,
        // dragProxyHeight: 200
    },
  content: [{
    type: 'row',
    content: [
        {
            type: 'stack',
            content: [
        {
        type:'component',
        componentName: 'example',
        title: 'app.tsx',
        isClosable: false,
        componentState: { filename: 'app.tsx' }
        },
        {
        type:'component',
        componentName: 'example',
        title: 'schema.ts',
        isClosable: false,
        componentState: { filename: 'schema.ts' }
        },
      {
        type:'component',
        componentName: 'example',
        title: 'app.css',
        isClosable: false,
        componentState: { filename: 'app.css' }
        },
        {
        type:'component',
        componentName: 'example',
        title: 'app.html',
        isClosable: false,
        componentState: { filename: 'app.html' }
        },]
        },
        
      {
        type:'component',
        componentName: 'preview',
        isClosable: false,
        title: 'Preview',
        componentState: { text: 'Component 3' }
        }
    ]
  }]
};

var myLayout = new GoldenLayout( config );


const fileModels = {
    'app.tsx': monaco.editor.createModel([
        'import * as React from "react";',
        '',
        'export const HelloComponent = () => {',
        '  return <h2>Hello component !</h2>;',
        '};',
            ].join('\n'), "typescript", monaco.Uri.parse("file:///app.tsx")),
    'app.html': monaco.editor.createModel([
        '<!doctype html>',
        '<html>',
        '<body>',
        
        '</body>',
        '</html>',
        
            ].join('\n'), "html", monaco.Uri.parse("file:///app.html")),
    'app.css': monaco.editor.createModel([
        'body {',
        '',
        '   font-family: Avenir;',
        '}',
            ].join('\n'), "css", monaco.Uri.parse("file:///app.css")),
    'schema.ts': monaco.editor.createModel([
        'export const blah = 42;',
            ].join('\n'), "typescript", monaco.Uri.parse("file:///schema.ts"))
}


myLayout.registerComponent( 'preview', function( container, state ){
    container.getElement().html( '<h2>' + state.text + '</h2>');
})

myLayout.registerComponent( 'example', function( container, state ){
    console.log('creating something', state.filename)
    monaco.editor.create(container.getElement()[0], {
        model: fileModels[state.filename],
        // language: 'typescript',

          automaticLayout: true,
          wordWrap: true
    })

  // 

//   window.verilogViewer = monaco.editor.create(container.getElement()[0], {
//       value: [
//         'Verilog code output here...'
//       ].join('\n'),
//       language: 'verilogOrOutput',
//       automaticLayout: true,
//       wordWrap: true,
//       readOnly: true
//     })



// monaco.editor.create(document.getElementById('container'), {
    
    // model: ,
    // language: 'typescript'
// });



});

myLayout.init();


