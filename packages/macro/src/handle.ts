import { callExpression, identifier, stringLiteral } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import extractArguments from './extractArguments';
import evalFirstArgument from './evalFirstArgument';

import type { MacroParams } from 'babel-plugin-macros';

function handle({ references, state }: MacroParams): void {
  const filename = state?.file?.opts?.filename;
  if (!filename) {
    throw new MacroError('Failed to retrieve filename');
  }

  references.default.forEach((referencePath) => {
    const [argPath] = extractArguments(referencePath);
    const arg = evalFirstArgument(argPath);
    return referencePath.parentPath.replaceWith(
      callExpression(identifier('require'), [stringLiteral(arg)])
    );
  });
}

export default handle;
