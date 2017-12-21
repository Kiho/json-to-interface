bash: /Users/kchang/.cargo/env: No such file or directory
miss-mbp:json-to-interface kchang$ npm run build

> json-to-interface@1.0.0 build /Users/kchang/poc/typescript/json-to-interface
> rollup -c

production true
svelteCombiner

src/main.ts → public/js/bundle.min.js...
svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/main.ts
svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/App.html
svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/node_modules/svelte/shared.js
svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/Counter.html
svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/Value.html
svelteCombiner - id /Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.html
r <h2>{{counter}}</h2>

<script>
import { connect } from 'redux-zero/svelte';
import store from '../../store/store';

const mapToProps = ({ counter }) => ({ counter });
/// HELLO

let abcdef = {
    data() {
        return {
            showH2: true
        };
    },
    oncreate() {
        console.log('H2 oncreate');
        connect(this, store, mapToProps);
    },
    ondestroy(){
        console.log('H2 ondestroy');
    }
};
import "/Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.js"
import "/Users/kchang/poc/typescript/json-to-interface/src/components/counter/H2.css"
</script>
<style>
.test {
    font-size: 15px;
}
</style>
resultFile SourceFileObject {
  pos: 0,
  end: 399,
  flags: 0,
  transformFlags: undefined,
  parent: undefined,
  kind: 268,
  text: 'import { connect } from \'redux-zero/svelte\';\nimport store from \'../../store/store\';\n\nconst mapToProps = ({ counter }) => ({ counter });\n/// HELLO\n\nlet abcdef = {\n    data() {\n        return {\n            showH2: true\n        };\n    },\n    oncreate() {\n        console.log(\'H2 oncreate\');\n        connect(this, store, mapToProps);\n    },\n    ondestroy(){\n        console.log(\'H2 ondestroy\');\n    }\n};',
  bindDiagnostics: [],
  languageVersion: 5,
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
       transformFlags: undefined,
       parent: undefined,
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
       transformFlags: undefined,
       parent: undefined,
       kind: 238,
       decorators: undefined,
       modifiers: undefined,
       importClause: [Object],
       moduleSpecifier: [Object] },
     NodeObject {
       pos: 83,
       end: 135,
       flags: 0,
       transformFlags: undefined,
       parent: undefined,
       kind: 208,
       decorators: undefined,
       modifiers: undefined,
       declarationList: [Object] },
     NodeObject {
       pos: 135,
       end: 399,
       flags: 0,
       transformFlags: undefined,
       parent: undefined,
       kind: 208,
       decorators: undefined,
       modifiers: undefined,
       declarationList: [Object] },
     pos: 0,
     end: 399 ],
  endOfFileToken: TokenObject { pos: 399, end: 399, flags: 0, parent: undefined, kind: 1 },
  externalModuleIndicator:
   NodeObject {
     pos: 0,
     end: 44,
     flags: 0,
     transformFlags: undefined,
     parent: undefined,
     kind: 238,
     decorators: undefined,
     modifiers: undefined,
     importClause:
      NodeObject {
        pos: 6,
        end: 18,
        flags: 0,
        transformFlags: undefined,
        parent: undefined,
        kind: 239,
        namedBindings: [Object] },
     moduleSpecifier:
      TokenObject {
        pos: 23,
        end: 43,
        flags: 0,
        parent: undefined,
        kind: 9,
        text: 'redux-zero/svelte' },
     modifierFlagsCache: 536870912 },
  nodeCount: 70,
  identifierCount: 18,
  identifiers:
   Map {
     'connect' => 'connect',
     'redux-zero/svelte' => 'redux-zero/svelte',
     'store' => 'store',
     '../../store/store' => '../../store/store',
     'mapToProps' => 'mapToProps',
     'counter' => 'counter',
     'abcdef' => 'abcdef',
     'data' => 'data',
     'showH2' => 'showH2',
     'oncreate' => 'oncreate',
     'console' => 'console',
     'log' => 'log',
     'ondestroy' => 'ondestroy' },
  parseDiagnostics: [] }
