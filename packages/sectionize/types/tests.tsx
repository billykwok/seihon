import unified from 'unified';
import sectionize from '@seihon/sectionize';

unified().use(sectionize, { tagName: 'test', whitelist: ['heading'] });
