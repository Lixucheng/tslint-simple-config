import * as ts from 'typescript';
import * as Lint from 'tslint';
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static IMPORT_TYPE_ORDER_ERROR: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
