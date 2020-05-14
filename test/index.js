

const {Components,  UIEngine, BasicTheme, BasicWXMLLayout, BasicHTMLLayout} = require('../dist');
const { Page, Card, Row, Col, Button, Image, Text } = Components;

const {RoundImgWithTitle, RoundImgWithTitleTheme, RoundImgWithTitleLayout } = require('./round-img-with-title') // 自定义组件

let page = new Page();

let engine = new UIEngine(page);

let card = new Card().appendTo(page);
card.setTitle('我是卡片的标题');
card.addStyle('marginTop', '20px');
const row = new Row().appendTo(card);

const col1 = new Col().appendTo(row);
col1.setSpan(6);
col1.setGutter(10);
let img1 = new Image();
img1.setSrc('https://avatars1.githubusercontent.com/u/1920250?s=60&v=4');
col1.append(img1);

const col2 = new Col().appendTo(row);
col2.setSpan(6);
col2.setGutter(10);
let button = new Button();
button.setButtonText('我是一个按钮');
col2.append(button);

const col3 = new Col().appendTo(row);
col3.setSpan(6);
col3.setGutter(10);

let img2 = new Image();
img2.setSrc('https://avatars1.githubusercontent.com/u/1920250?s=60&v=4');
img2.addWhiteListAttr('mode');
img2.addAttr('mode', 'aspectFill');
col3.append(img2);

engine.useLayout(BasicHTMLLayout).useTheme(BasicTheme);
let html = engine.render();

engine.useLayout(BasicWXMLLayout);
let wxml = engine.render();

console.log(html);
console.log('\n\n\n');
console.log(wxml);


// 自定义组件

BasicHTMLLayout.registerLayoutNode(new RoundImgWithTitleLayout);
BasicTheme.registerThemeNode(new RoundImgWithTitleTheme);
let riwt = new RoundImgWithTitle();
riwt.setSrc('https://avatars1.githubusercontent.com/u/1920250?s=60&v=4');
riwt.setTitle('图片title')
engine.useLayout(BasicHTMLLayout);

console.log(engine.render(riwt));
