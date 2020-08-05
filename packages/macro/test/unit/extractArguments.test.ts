import { describe, test, expect } from '@jest/globals';
import util from 'util';
import {
  stringLiteral,
  objectExpression,
  continueStatement,
} from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import extractArgumentPaths from '../../src/extractArguments';

import type { NodePath } from '@babel/core';

function createReferencePath(argumentNodes: NodePath[]): NodePath {
  return {
    parentPath: {
      type: 'CallExpression',
      get(property: string) {
        if (property === 'arguments') return argumentNodes;
      },
    },
  } as NodePath;
}

describe('arguments', () => {
  test('parse valid input', () => {
    const path = 'docs.collection.js';
    const firstArgPath = { node: stringLiteral(path) } as NodePath;
    const referencePath = createReferencePath([firstArgPath]);
    const result = extractArgumentPaths(referencePath);
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(firstArgPath);
  });

  test('parse input that is not a function call', () => {
    const referencePath = { parentPath: { type: 'Expression' } } as NodePath;
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Please use it as a function')
    );
  });

  test('parse first argument of wrong type', () => {
    const nonExpression = continueStatement();
    const referencePath = createReferencePath([
      { node: nonExpression } as NodePath,
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError(
        `The first argument must be an expression, but got ${util.inspect(
          nonExpression,
          false,
          null,
          true
        )}`
      )
    );
  });

  test('parse extra arguments', () => {
    const path = 'docs.collection.js';
    const referencePath = createReferencePath([
      { node: stringLiteral(path) } as NodePath,
      { node: objectExpression([]) } as NodePath,
      { node: objectExpression([]) } as NodePath,
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Expect 1 argument, but got 3')
    );
  });

  test('parse zero arguments', () => {
    const referencePath = createReferencePath([]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Expect 1 argument, but got 0')
    );
  });
});
