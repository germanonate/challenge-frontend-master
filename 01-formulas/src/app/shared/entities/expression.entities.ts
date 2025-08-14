/**
 * Binary Expression
 * EXPR + EXPR | EXPR - EXPR | EXPR * EXPR | EXPR / EXPR
 */
export enum BinaryExpTypes {
  "ADDITION" = "ADDITION",
  "SUBTRACTION" = "SUBTRACTION",
  "MULTIPLICATION" = "MULTIPLICATION",
  "DIVISION" = "DIVISION",
}
export interface BinaryExpression extends Node {
  type: BinaryExpTypes;
  left: Expression;
  right: Expression;
};

/**
 * Unary Expression
 * UNARY_EXPR = "-" EXPR
 */
export type UnaryExpressionType = "NEGATION";
export interface UnaryExpression extends Node {
  type: UnaryExpressionType;
  expression: Expression;
};

/**
 * Power
 * EXPR ^ EXPR
 */
 export type PowerType = "POWER";
 export interface Power extends Node {
   type: PowerType;
   expression: Expression;
   power: Expression;
 };

/**
 * Symbol: ()
 */
export enum SymbolTypes {
  "PAREN" = "PAREN",
}
export interface Symbol extends Node {
  type: SymbolTypes;
  expression: Expression;
};

/**
 * Function
 * <FunctionName>"(" (EXPR ("," EXPR)*)? ")"
 */
export type FuncType = "FUNCTION";
export enum FuncTypes {
  "SQRT" = "SQRT",
  "SQR" = "SQR",
};
export interface Func extends Node {
  type: FuncType;
  name: FuncTypes;
  arguments: Expression[];
};

/**
 * Value
 * NUMBER = [Float or Integer Number] or
 * PI = "PI"
 */
export enum ValueTypes {
  "NUMBER" = "NUMBER",
  "PI" = "PI",
};
export interface Value extends Node {
  type: ValueTypes;
  value: number;
};

/**
 * Variable
 * PARAMETER = "$"[PARAMETER_NAME]
 */
export type VariableType = "VARIABLE";
export interface Var extends Node {
  type: VariableType;
  name: string;
};

/**
 * All expression types (interfaces)
 * extends from here
 */
export interface Node {
  type: string;
}


/**
 * Main type
 * Differents tpyes of Expressions
 */
export type Expression = Symbol | Power | BinaryExpression | UnaryExpression | Value | Var | Func;

