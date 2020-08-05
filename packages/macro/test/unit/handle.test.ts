import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import {
  callExpression,
  objectExpression,
  stringLiteral,
  identifier,
} from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import handle from '../../src/handle';

import type { NodePath, PluginPass } from '@babel/core';

describe('arguments', () => {
  const mockFirstArg = {
    node: stringLiteral('test.collection.js'),
    evaluate: () => ({ confident: true, value: 'test.collection.js' }),
  } as NodePath;
  const mockGetArguments = jest.fn(() => [mockFirstArg]);
  const mockReplaceWith = jest.fn();
  const referencePath = {
    parentPath: {
      ...callExpression(objectExpression([]), []),
      get: mockGetArguments,
      replaceWith: mockReplaceWith,
    } as Partial<NodePath>,
  } as NodePath;
  const references = { default: [referencePath] };

  beforeEach(() => {
    jest.doMock('../../src/extractArguments', () => ({
      __esModule: true,
      default: jest.fn(() => [mockFirstArg]),
    }));
    jest.doMock('../../src/evalFirstArgument', () => ({
      __esModule: true,
      default: jest.fn(() => 'test.collection.js'),
    }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('parse invalid filename 1', () => {
    expect(() => handle({ references, state: null, babel: null })).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 2', () => {
    const state = {} as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 3', () => {
    const state = { file: null } as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 4', () => {
    const state = { file: { opts: null } } as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 5', () => {
    const state = { file: { opts: { filename: null } } } as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse valid filename', () => {
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } },
    } as PluginPass;
    const params = { references, state, babel: null };
    handle(params);
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      callExpression(identifier('require'), [
        stringLiteral('test.collection.js'),
      ])
    );
  });
});
