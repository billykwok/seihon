// TypeScript Version: 3.4
import unified = require('unified');
import { Plugin, Settings } from 'unified';

interface Options extends Settings {
  tagName: string;
  whitelist: string[];
}

interface sectionize<S> extends Plugin<S, Options> {}

const sectionize: Plugin<any[], Options>;

export default sectionize;
