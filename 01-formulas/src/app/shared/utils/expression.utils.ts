import { BinaryExpression, BinaryExpTypes, Expression, Symbol, Power, SymbolTypes, UnaryExpression, Value, ValueTypes, Func } from "../entities";

// TYPE GUARDS
// For Values and Var
export const isLeaf = (expression?: Expression): boolean => Object.values(ValueTypes).includes((expression as Value).type) || expression?.type === 'VARIABLE';
export const isBinaryExpression = (expression?: Expression): boolean => Object.values(BinaryExpTypes).includes(expression?.type as BinaryExpTypes);
export const isUnaryExpression = (expression?: Expression): boolean => expression?.type === 'NEGATION';
export const isPower = (expression?: Expression): boolean => expression?.type === 'POWER';
export const isFunction = (expression?: Expression): boolean => expression?.type === 'FUNCTION';
export const isSymbol = (expression?: Expression): boolean => Object.values(SymbolTypes).includes((expression as Symbol).type);

/**
 * Converts Visualized Syntax Tree to Formula string
 * @param expression 
 * @returns string
 */
export const expressionToFormula = (expression: Expression): string => {
  const currentExpression = expression;

  // Check if Symbol type
  if (isSymbol(currentExpression)) {
    return `(${expressionToFormula((currentExpression as Symbol).expression)})`;
  }

  // Check if Leaf type
  if (isLeaf(currentExpression)) {
    return currentExpression.type === ValueTypes.NUMBER ? `${currentExpression.value}` : currentExpression.type === 'VARIABLE' ? `${currentExpression.name}` : `${currentExpression.type}`;
  }

  // Check if Unary expression type
  if (isUnaryExpression(currentExpression)) {
    return `- ${expressionToFormula((currentExpression as UnaryExpression).expression)}`;
  }

  // Check if Binary expression type
  if (isBinaryExpression(currentExpression)) {
    const beNode = currentExpression as BinaryExpression;
    return `${expressionToFormula(beNode.left)} ${getOperationalSign(beNode.type)} ${expressionToFormula(
      beNode.right
    )}`;
  }

  // Check if Power type
  if (isPower(currentExpression)) {
    const powerExpression = currentExpression as Power;
    return `${expressionToFormula(powerExpression.expression)} ^ ${expressionToFormula(
      powerExpression.power
    )}`;
  }

  // Check if Func type
  if (isFunction(currentExpression)) {
    const funcExpression = currentExpression as Func;
    const args = funcExpression.arguments.map((arg) => expressionToFormula(arg));

    return `${funcExpression.name.toUpperCase()}(${args.join(", ")})`;
  }

  // Default case
  return '';
};

/**
 * Returns operational sign based on BinaryExpTypes
 * @param type 
 * @returns string
 */
export const getOperationalSign = (type: BinaryExpTypes): string => {
  switch (type) {
    case BinaryExpTypes.ADDITION:
      return '+';
    case BinaryExpTypes.SUBTRACTION:
      return '-';
    case BinaryExpTypes.MULTIPLICATION:
      return '*';
    case BinaryExpTypes.DIVISION:
      return '/';
  }
}