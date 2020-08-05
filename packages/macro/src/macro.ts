import { createMacro } from 'babel-plugin-macros';

import handle from './handle';

export default createMacro(handle) as <T = Readonly<Record<string, unknown>>>(
  path: string
) => T[] & { default: T[] };
