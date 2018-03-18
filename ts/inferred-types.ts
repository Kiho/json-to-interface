import * as ts from "typescript";
import { String, StringBuilder } from "./string-operations"

const defaultOptions = {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
};

let argFileName: string = process.argv[2];
if (argFileName) {
    printInferredTypes(argFileName, 'name', defaultOptions);
}

function printInferredTypes(fileName: string, name:string, options: ts.CompilerOptions = defaultOptions): string {
    console.log('fileName', fileName);
    let program = ts.createProgram([fileName], options);
    let checker = program.getTypeChecker();

    let knownTypes: {[name: string]: boolean} = {};
    let pendingTypes: {name: string, symbol: ts.Symbol}[] = [];

    const sbOutput = new StringBuilder('');

    fileName = fileName.split('\\').join('/');

    for (const sourceFile of program.getSourceFiles()) {
        console.log('sourceFile.fileName', sourceFile.fileName, fileName);
        if (sourceFile.fileName == fileName) {
            ts.forEachChild(sourceFile, visit);
        }
    }

    while (pendingTypes.length > 0) {
        let pendingType = pendingTypes.shift();
        printJsonType(pendingType.name, pendingType.symbol);
    }

    function visit(node: ts.Node) {
        if (node.kind == ts.SyntaxKind.VariableStatement) {
            (<ts.VariableStatement>node).declarationList.declarations.forEach(declaration => {
                if (declaration.name.kind == ts.SyntaxKind.Identifier) {
                    let identifier = <ts.Identifier>declaration.name;
                    let symbol = checker.getSymbolAtLocation(identifier);
                    if (symbol) {
                        let t = checker.getTypeOfSymbolAtLocation(symbol, identifier);
                        if (t && t.symbol) {
                            pendingTypes.push({name: identifier.text, symbol: t.symbol});
                        }
                    }
                }
            });
        }
    }

    function printJsonType(name: string, symbol: ts.Symbol) {
        if (symbol.members) {
            console.log(`export interface ${capitalize(name)} {`);
            sbOutput.Append(`export interface ${capitalize(name)} {\r\n`);
            symbol.members.forEach(member => {
                const k = member.name;
                let typeName = null;
                if (member.declarations[0]) {
                    let memberType = checker.getTypeOfSymbolAtLocation(member, member.declarations[0]);
                    if (memberType) {
                        typeName = getMemberTypeName(k, memberType);
                    }
                }
                if (!typeName) {
                    console.log(`// Sorry, could not get type name for ${k}!`);
                    sbOutput.Append(`    // ${k}: unknown;\r\n`);
                } else {
                    console.log(`    ${k}: ${typeName};`);
                    sbOutput.Append(`    ${k}: ${typeName};\r\n`);
                }
            });
            console.log(`}`);
            sbOutput.Append(`}\r\n`);
        }
    }

    function getMemberTypeName(memberName: string, memberType: ts.Type): string | null {
        if (memberType.flags == ts.TypeFlags.String) {
            return 'string';
        } else if (memberType.flags == ts.TypeFlags.Number) {
            return 'number';
        } else if (0 !== (memberType.flags & ts.TypeFlags.Boolean)) {
            return 'boolean';
        } else if (memberType.symbol) {
            if (memberType.symbol.name == 'Array' && (<ts.TypeReference>memberType).typeArguments) {
                let elementType = (<ts.TypeReference>memberType).typeArguments[0];
                if (elementType && elementType.symbol) {
                    let elementTypeName = capitalize(stripS(memberName));
                    if (!knownTypes[elementTypeName]) {
                        knownTypes[elementTypeName] = true;
                        pendingTypes.push({name: elementTypeName, symbol: elementType.symbol});
                    }
                    return `${elementTypeName}[]`;
                }
            } else if (memberType.symbol.name == '__object') {
                let typeName = capitalize(memberName);
                if (!knownTypes[typeName]) {
                    knownTypes[typeName] = true;
                    pendingTypes.push({name: typeName, symbol: memberType.symbol});
                }
                return typeName;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    function capitalize(n: string) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }
    function stripS(n: string) {
        return n.endsWith('s') ? n.substring(0, n.length - 1) : n;
    }
    const result = sbOutput.ToString();    
    console.log(result);
    return result;
}

export default printInferredTypes;
