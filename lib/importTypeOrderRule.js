"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        'ruleName': 'import-type-order',
        'description': 'Improves readability and organization by grouping related imports together. Imports should be listed in order of: external modules, absolute paths, relative paths, relative siblings.',
        'hasFix': false,
        'optionsDescription': 'Not configurable.',
        'options': null,
        'optionExamples': null,
        'type': 'style',
        'typescriptOnly': true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.IMPORT_TYPE_ORDER_ERROR = 'Imports should be listed in the following order: external imports, absolute imports, ancestor imports, sibling imports.';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ImportType;
(function (ImportType) {
    ImportType[ImportType["External"] = 0] = "External";
    ImportType[ImportType["Absolute"] = 1] = "Absolute";
    ImportType[ImportType["Ancestor"] = 2] = "Ancestor";
    ImportType[ImportType["Sibling"] = 3] = "Sibling";
})(ImportType || (ImportType = {}));
function walker(context) {
    var sourceFile = context.sourceFile;
    var importNodes = sourceFile.statements
        .filter(function (child) { return child.kind === ts.SyntaxKind.ImportDeclaration; })
        .map(function (child) { return child; });
    if (importNodes.length === 0) {
        return;
    }
    var lastValidType = getImportType(importNodes.shift());
    while (importNodes.length) {
        var currentNode = importNodes.shift();
        var currentType = getImportType(currentNode);
        if (lastValidType > currentType) {
            var moduleSpecifier = currentNode.moduleSpecifier;
            var errorStart = moduleSpecifier.getStart();
            var errorWidth = moduleSpecifier.getEnd() - errorStart;
            context.addFailureAt(errorStart, errorWidth, Rule.IMPORT_TYPE_ORDER_ERROR);
        }
        else {
            lastValidType = currentType;
        }
    }
}
function getImportType(_a) {
    var moduleSpecifier = _a.moduleSpecifier;
    var path = moduleSpecifier.getText();
    if (path.substr(1, 2) === './') {
        return ImportType.Sibling;
    }
    else if (path.substr(1, 3) === '../') {
        return ImportType.Ancestor;
    }
    else if (path[1] === '/') {
        return ImportType.Absolute;
    }
    return ImportType.External;
}
