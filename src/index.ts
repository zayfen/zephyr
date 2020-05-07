
import { Row } from './base/node_factory';
import { BasicLayout } from './base/layout';
import { BasicTheme } from './base/theme';
import { UIEngine } from './uiengine';

const root = new Row();


const engine = new UIEngine(root);
let result = engine.useTheme(BasicTheme).useLayout(BasicLayout).render();
console.log('uiengine result: ', result);
