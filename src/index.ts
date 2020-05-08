
import { Row, Card, Page, Col, Image, Button } from './base/node_factory';
import { BasicLayout } from './base/layout';
import { BasicTheme } from './base/theme';
import { UIEngine } from './uiengine';
import { BasicWXMLLayout } from './base/wxml_layout';

const root = new Page();
const card = new Card().appendTo(root);
const row = new Row().appendTo(card);
const col1 = new Col().appendTo(row) as Col;
col1.setSpan(8);

const image = new Image().appendTo(col1) as Image;
image.setSrc('https://avatars1.githubusercontent.com/u/1920250?s=60&v=4');

const col2 = new Col().appendTo(row) as Col;
col2.setSpan(8);
col2.setGutter(10);

const button: Button = new Button().appendTo(col2) as Button;
button.setButtonText('我是一个按钮');

const col3 = new Col().appendTo(row) as Col;
col3.setSpan(8);

const image2 = new Image().appendTo(col3) as Image;
image2.setSrc('https://avatars1.githubusercontent.com/u/1920250?s=60&v=4');

// 通过引擎指定不同的主题和不同的布局就能渲染出不同的结果
const engine = new UIEngine(root);
let result = engine.useTheme(BasicTheme).useLayout(BasicLayout).render();
console.log('HTML: \n', result);

// 使用WXML的布局
engine.useLayout(BasicWXMLLayout);
console.log('\n\nWXML \n', engine.render());


// 如果要实现自己的布局，请继承BasicLayout，并自己实现每个LayoutNode中的render方法
// 如果想要实现自己的主题，请继承BasicTheme, 并自己实现每个ThemeNode中的inject方法
