import { inspect } from 'util';
import { isExpression, isCallExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';

import type { NodePath } from '@babel/core';

function extractArguments(referencePath: NodePath): NodePath[] {
  if (!isCallExpression(referencePath.parentPath)) {
    throw new MacroError('Please use it as a function');
  }

  const argumentPaths = referencePath.parentPath.get('arguments') as NodePath[];
  const numberOfArguments = argumentPaths.length;
  if (numberOfArguments !== 1) {
    throw new MacroError(`Expect 1 argument, but got ${numberOfArguments}`);
  }

  if (!isExpression(argumentPaths[0].node)) {
    throw new MacroError(
      `The first argument must be an expression, but got ${inspect(
        argumentPaths[0].node,
        false,
        null,
        true
      )}`
    );
  }

  return argumentPaths;
}

export default extractArguments;
