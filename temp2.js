fileName  /Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.ts SourceFileObject {
    pos: 0,
    end: 403,
    flags: 0,
    transformFlags: 574619776,
    parent: undefined,
    kind: 268,
    text: 'import { connect } from \'redux-zero/svelte\';\nimport store from \'../../store/store\';\n\n// const mapToProps = ({ counter }) => ({ counter });\n/// HELLO\n\nlet test = {\n    data() {\n        return {\n            showH2: true\n        };\n    },\n    oncreate() {\n        console.log(\'H2 oncreate\');\n        // connect(this, store, mapToProps);\n    },\n    ondestroy(){\n        console.log(\'H2 ondestroy\');\n    }\n};',
    bindDiagnostics: [],
    languageVersion: 1,
    fileName: '/Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.ts',
    languageVariant: 0,
    isDeclarationFile: false,
    scriptKind: 3,
    referencedFiles: [],
    typeReferenceDirectives: [],
    amdDependencies: [],
    moduleName: undefined,
    checkJsDirective: undefined,
    statements:
     [ NodeObject {
         pos: 0,
         end: 44,
         flags: 0,
         transformFlags: 536870912,
         parent: [Circular],
         kind: 238,
         decorators: undefined,
         modifiers: undefined,
         importClause: [Object],
         moduleSpecifier: [Object],
         modifierFlagsCache: 536870912 },
       NodeObject {
         pos: 44,
         end: 83,
         flags: 0,
         transformFlags: 536870912,
         parent: [Circular],
         kind: 238,
         decorators: undefined,
         modifiers: undefined,
         importClause: [Object],
         moduleSpecifier: [Object] },
       NodeObject {
         pos: 83,
         end: 403,
         flags: 0,
         transformFlags: 574619840,
         parent: [Circular],
         kind: 208,
         decorators: undefined,
         modifiers: undefined,
         declarationList: [Object],
         modifierFlagsCache: 536870912 },
       pos: 0,
       end: 403,
       transformFlags: 574619840 ],
    endOfFileToken:
     TokenObject {
       pos: 403,
       end: 403,
       flags: 0,
       parent: [Circular],
       kind: 1,
       transformFlags: 536870912 },
    externalModuleIndicator:
     NodeObject {
       pos: 0,
       end: 44,
       flags: 0,
       transformFlags: 536870912,
       parent: [Circular],
       kind: 238,
       decorators: undefined,
       modifiers: undefined,
       importClause:
        NodeObject {
          pos: 6,
          end: 18,
          flags: 0,
          transformFlags: 536870912,
          parent: [Circular],
          kind: 239,
          namedBindings: [Object] },
       moduleSpecifier:
        TokenObject {
          pos: 23,
          end: 43,
          flags: 0,
          parent: [Circular],
          kind: 9,
          text: 'redux-zero/svelte',
          transformFlags: 536870912 },
       modifierFlagsCache: 536870912 },
    nodeCount: 45,
    identifierCount: 11,
    identifiers:
     Map {
       'connect' => 'connect',
       'redux-zero/svelte' => 'redux-zero/svelte',
       'store' => 'store',
       '../../store/store' => '../../store/store',
       'test' => 'test',
       'data' => 'data',
       'showH2' => 'showH2',
       'oncreate' => 'oncreate',
       'console' => 'console',
       'log' => 'log',
       'ondestroy' => 'ondestroy' },
    parseDiagnostics: [],
    path: '/users/kchang/poc/typescript/json-to-interface/src/components/counter/h2.ts',
    imports:
     [ TokenObject {
         pos: 23,
         end: 43,
         flags: 0,
         parent: [Object],
         kind: 9,
         text: 'redux-zero/svelte',
         transformFlags: 536870912 },
       TokenObject {
         pos: 62,
         end: 82,
         flags: 0,
         parent: [Object],
         kind: 9,
         text: '../../store/store',
         transformFlags: 536870912 } ],
    moduleAugmentations: [],
    ambientModuleNames: [],
    resolvedModules:
     Map {
       'redux-zero/svelte' => { resolvedFileName: '/Users/kchang/poc/typescript/json-to-interface/node_modules/redux-zero/svelte/index.d.ts',
       extension: '.d.ts',
       isExternalLibraryImport: true,
       packageId: [Object] },
       '../../store/store' => { resolvedFileName: '/Users/kchang/poc/typescript/json-to-interface/src/store/store.ts',
       extension: '.ts',
       isExternalLibraryImport: false,
       packageId: undefined } },
    modifierFlagsCache: 536870912,
    symbol:
     SymbolObject {
       flags: 512,
       escapedName: '"/Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2"',
       declarations: [ [Circular] ],
       exports: Map {},
       valueDeclaration: [Circular] },
    locals:
     Map {
       'connect' => SymbolObject {
       flags: 2097152,
       escapedName: 'connect',
       declarations: [Array],
       parent: undefined },
       'store' => SymbolObject {
       flags: 2097152,
       escapedName: 'store',
       declarations: [Array],
       parent: undefined },
       'test' => SymbolObject {
       flags: 2,
       escapedName: 'test',
       declarations: [Array],
       valueDeclaration: [Object],
       parent: undefined } },
    nextContainer:
     NodeObject {
       pos: 160,
       end: 402,
       flags: 0,
       transformFlags: 536871040,
       parent:
        NodeObject {
          pos: 153,
          end: 402,
          flags: 0,
          transformFlags: 545259712,
          parent: [Object],
          kind: 226,
          name: [Object],
          type: undefined,
          initializer: [Circular],
          modifierFlagsCache: 536870912,
          symbol: [Object] },
       kind: 178,
       multiLine: true,
       properties:
        [ [Object],
          [Object],
          [Object],
          pos: 162,
          end: 400,
          transformFlags: 570425536 ],
       symbol:
        SymbolObject {
          flags: 4096,
          escapedName: '__object',
          declarations: [Array],
          members: [Object] },
       modifierFlagsCache: 536870912,
       nextContainer:
        NodeObject {
          pos: 162,
          end: 234,
          flags: 0,
          transformFlags: 570425536,
          parent: [Circular],
          kind: 151,
          decorators: undefined,
          modifiers: undefined,
          asteriskToken: undefined,
          name: [Object],
          questionToken: undefined,
          modifierFlagsCache: 536870912,
          typeParameters: undefined,
          parameters: [Array],
          type: undefined,
          body: [Object],
          flowNode: [Object],
          symbol: [Object],
          locals: Map {},
          nextContainer: [Object] } },
    symbolCount: 10,
    classifiableNames: Map {} }
  export interface Test {
      data: (): { showH2: boolean; };
      oncreate: (): void;
      ondestroy: (): void;
  }
  interface IOptions
       { showH2?: boolean; };
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/node_modules/redux-zero/svelte/index.js
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/store/store.ts
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/node_modules/redux-zero/dist/redux-zero.js
  svelteCombiner - id typescript-helpers
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.ts
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.css
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/store/actions.ts
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/Value2.html
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/IncrementButton.html
  svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/DecrementButton.html
  created public/js/bundle.min.js in 1.2s
  miss-mbp:json-to-interface kchang$