import * as ts from "typescript";
import { String, StringBuilder } from "./string-operations"

const defaultOptions = {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
};

function printInferredTypes(fileName: string, name:string, options: ts.CompilerOptions = defaultOptions): string {

    let program = ts.createProgram([fileName], options);
    let checker = program.getTypeChecker();

    let knownTypes: {[name: string]: boolean} = {};
    let pendingTypes: {name: string, symbol: ts.Symbol}[] = [];

    const sbData = new StringBuilder('');
    const sbMethods = new StringBuilder('');
    const sbOutput = new StringBuilder('');

    fileName = fileName.split('\\').join('/');

    for (const sourceFile of program.getSourceFiles()) {
        if (sourceFile.fileName == fileName) {
            ts.forEachChild(sourceFile, visit);
        }
    }

    while (pendingTypes.length > 0) {
        let pendingType = pendingTypes.shift();
        printJsonType(pendingType.name, pendingType.symbol);
    }

    const moduleName = capitalize(name.replace('.html', ''));
    const outputOptions = sbData.ToString();
    if (outputOptions) {
        sbOutput.Append(`interface ${moduleName}Options `);
        sbOutput.Append(outputOptions + '\n');
    }

    sbOutput.Append(`declare class ${moduleName} extends Svelte<${moduleName}Options>\n`);

    let outputMethods = sbMethods.ToString();
    if (outputMethods) {
        outputMethods = outputMethods.split('): ').join(' => ');
        outputMethods = String.replaceAll(outputMethods, '; ', ';\n');
        sbOutput.Append(`{\n${outputMethods}\n}\n`);
    }
    else {
        sbOutput.Append('{ }\n');
    }

    sbOutput.Append(`export default ${moduleName}`);
    const result = sbOutput.ToString();

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
            const isMethods = name === 'Methods';
            symbol.members.forEach(member => {
                const k = member.name;
                const memberDeclaration = member.declarations[0];
                let typeName = null;
                if (memberDeclaration) {
                    if (memberDeclaration.kind == ts.SyntaxKind.MethodDeclaration) {
                        const signature = checker.getSignatureFromDeclaration(<ts.MethodDeclaration>memberDeclaration);
                        typeName = checker.signatureToString(signature);
                        if (isMethods) {
                            sbMethods.Append(`    ${k}: ${typeName};`);
                        }
                    } else {
                        let memberType = checker.getTypeOfSymbolAtLocation(member, memberDeclaration);
                        if (memberType) {
                            typeName = getMemberTypeName(k, memberType);
                        }
                    }
                }
                if (!typeName) {
                    console.log(`// Sorry, could not get type name for ${k}!`);
                } else {
                    console.log(`    ${k}: ${typeName};`);
                    if (k === 'data') {
                        let options = typeName.replace('():', '');
                        options = String.replaceAll(options, ': ', '?: ')
                        sbData.Append(`    ${String.replaceAll(options, '; ', ';\n')}`);
                    }
                }
            });
            console.log(`}`);
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
        return null;
    }

    function capitalize(n: string) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }
    function stripS(n: string) {
        return n.endsWith('s') ? n.substring(0, n.length - 1) : n;
    }

    // console.log(result);
    return result;
}

export default printInferredTypes;
