"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var string_operations_1 = require("./string-operations");
var defaultOptions = {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
};
var argFileName = process.argv[2];
if (argFileName) {
    printInferredTypes(argFileName, 'name', defaultOptions);
}
function printInferredTypes(fileName, name, options) {
    if (options === void 0) { options = defaultOptions; }
    console.log('fileName', fileName);
    var program = ts.createProgram([fileName], options);
    var checker = program.getTypeChecker();
    var knownTypes = {};
    var pendingTypes = [];
    var sbOutput = new string_operations_1.StringBuilder('');
    fileName = fileName.split('\\').join('/');
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        console.log('sourceFile.fileName', sourceFile.fileName, fileName);
        if (sourceFile.fileName == fileName) {
            ts.forEachChild(sourceFile, visit);
        }
    }
    while (pendingTypes.length > 0) {
        var pendingType = pendingTypes.shift();
        printJsonType(pendingType.name, pendingType.symbol);
    }
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
            console.log("export interface I" + capitalize(name) + " {");
            sbOutput.Append("export interface I" + capitalize(name) + " {\r\n");
            symbol.members.forEach(function (member) {
                var k = member.name;
                var typeName = null;
                if (member.declarations[0]) {
                    var memberType = checker.getTypeOfSymbolAtLocation(member, member.declarations[0]);
                    if (memberType) {
                        typeName = getMemberTypeName(k, memberType);
                    }
                }
                if (!typeName) {
                    console.log("// Sorry, could not get type name for " + k + "!");
                    sbOutput.Append("    // " + k + ": unknown;\r\n");
                }
                else {
                    console.log("    " + k + ": " + typeName + ";");
                    sbOutput.Append("    " + k + ": " + typeName + ";\r\n");
                }
            });
            console.log("}");
            sbOutput.Append("}\r\n");
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
    }
    function capitalize(n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }
    function stripS(n) {
        return n.endsWith('s') ? n.substring(0, n.length - 1) : n;
    }
    var result = sbOutput.ToString();
    console.log(result);
    return result;
}
exports.default = printInferredTypes;
