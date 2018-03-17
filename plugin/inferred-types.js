import * as ts from "typescript";
import { String, StringBuilder } from "./string-operations";
var defaultOptions = {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
};
function printInferredTypes(fileName, name, options) {
    if (options === void 0) { options = defaultOptions; }
    var program = ts.createProgram([fileName], options);
    var checker = program.getTypeChecker();
    var knownTypes = {};
    var pendingTypes = [];
    var sbData = new StringBuilder('');
    var sbMethods = new StringBuilder('');
    var sbOutput = new StringBuilder('');
    fileName = fileName.split('\\').join('/');
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        if (sourceFile.fileName == fileName) {
            ts.forEachChild(sourceFile, visit);
        }
    }
    while (pendingTypes.length > 0) {
        var pendingType = pendingTypes.shift();
        printJsonType(pendingType.name, pendingType.symbol);
    }
    var moduleName = capitalize(name.replace('.html', ''));
    var outputOptions = sbData.ToString();
    if (outputOptions) {
        sbOutput.Append("interface " + moduleName + "Options ");
        sbOutput.Append(outputOptions + '\n');
    }
    sbOutput.Append("declare class " + moduleName + " extends Svelte<" + moduleName + "Options>\n");
    var outputMethods = sbMethods.ToString();
    if (outputMethods) {
        outputMethods = outputMethods.split('): ').join(' => ');
        outputMethods = String.replaceAll(outputMethods, '; ', ';\n');
        sbOutput.Append("{\n" + outputMethods + "\n}\n");
    }
    else {
        sbOutput.Append('{ }\n');
    }
    sbOutput.Append("export default " + moduleName);
    var result = sbOutput.ToString();
    function visit(node) {
        if (node.kind == ts.SyntaxKind.VariableStatement) {
            node.declarationList.declarations.forEach(function (declaration) {
                if (declaration.name.kind == ts.SyntaxKind.Identifier) {
                    var identifier = declaration.name;
                    var symbol = checker.getSymbolAtLocation(identifier);
                    if (symbol) {
                        var t = checker.getTypeOfSymbolAtLocation(symbol, identifier);
                        if (t && t.symbol) {
                            pendingTypes.push({ name: identifier.text, symbol: t.symbol });
                        }
                    }
                }
            });
        }
    }
    function printJsonType(name, symbol) {
        if (symbol.members) {
            console.log("export interface " + capitalize(name) + " {");
            var isMethods_1 = name === 'Methods';
            symbol.members.forEach(function (member) {
                var k = member.name;
                var memberDeclaration = member.declarations[0];
                var typeName = null;
                if (memberDeclaration) {
                    if (memberDeclaration.kind == ts.SyntaxKind.MethodDeclaration) {
                        var signature = checker.getSignatureFromDeclaration(memberDeclaration);
                        typeName = checker.signatureToString(signature);
                        if (isMethods_1) {
                            sbMethods.Append("    " + k + ": " + typeName + ";");
                        }
                    }
                    else {
                        var memberType = checker.getTypeOfSymbolAtLocation(member, memberDeclaration);
                        if (memberType) {
                            typeName = getMemberTypeName(k, memberType);
                        }
                    }
                }
                if (!typeName) {
                    console.log("// Sorry, could not get type name for " + k + "!");
                }
                else {
                    console.log("    " + k + ": " + typeName + ";");
                    if (k === 'data') {
                        var options_1 = typeName.replace('():', '');
                        options_1 = String.replaceAll(options_1, ': ', '?: ');
                        sbData.Append("    " + String.replaceAll(options_1, '; ', ';\n'));
                    }
                }
            });
            console.log("}");
        }
    }
    function getMemberTypeName(memberName, memberType) {
        if (memberType.flags == ts.TypeFlags.String) {
            return 'string';
        }
        else if (memberType.flags == ts.TypeFlags.Number) {
            return 'number';
        }
        else if (0 !== (memberType.flags & ts.TypeFlags.Boolean)) {
            return 'boolean';
        }
        else if (memberType.symbol) {
            if (memberType.symbol.name == 'Array' && memberType.typeArguments) {
                var elementType = memberType.typeArguments[0];
                if (elementType && elementType.symbol) {
                    var elementTypeName = capitalize(stripS(memberName));
                    if (!knownTypes[elementTypeName]) {
                        knownTypes[elementTypeName] = true;
                        pendingTypes.push({ name: elementTypeName, symbol: elementType.symbol });
                    }
                    return elementTypeName + "[]";
                }
            }
            else if (memberType.symbol.name == '__object') {
                var typeName = capitalize(memberName);
                if (!knownTypes[typeName]) {
                    knownTypes[typeName] = true;
                    pendingTypes.push({ name: typeName, symbol: memberType.symbol });
                }
                return typeName;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
        return null;
    }
    function capitalize(n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }
    function stripS(n) {
        return n.endsWith('s') ? n.substring(0, n.length - 1) : n;
    }
    // console.log(result);
    return result;
}
export default printInferredTypes;
