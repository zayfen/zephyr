# UIEngine
将自定义的AST转换成 HTML 和 WXML

## Example
```typescript

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

```

**OUTPUT**
```html
<div class="ui-page" style="" >
	<div class="ui-card" style="" >
		<div class="ui-row" style="" >
			<div class="ui-col ui-col-8" style="ui-col ui-col-8"  span=8>
				<div class="ui-ima ge" style=""  src="https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1920250%3Fs%3D60%26v%3D4">
					<img src="https://avatars1.githubusercontent.com/u/1920250?s=60&v=4"></img>
				</div>
			</div>
			<div class="ui-col ui-col-8" style="ui-col ui-col-8"  span=8 gutter=10>
				<button class="ui-button" style=""   buttonText="%E6%88%91%E6%98%AF%E4%B8%80%E4%B8%AA%E6%8C%89%E9%92%AE">
					<span>我是一个按钮</span>
				</button>
			</div>
			<div class="ui-col ui-col-8" style="ui-col ui-col-8"  span=8>
				<div class="ui-image" style=""  src="https%3A%2F%2Favatars1.githubus
ercontent.com%2Fu%2F1920250%3Fs%3D60%26v%3D4">
					<img src="https://avatars1.githubusercontent.com/u/1920250?s=60&v=4"></img>
				</div>
			</div>
		</div>
	</div>
</div>
```

```wxml

<view class="ui-page" style="" >
	<view class="ui-card" style="" >
		<view class="ui-row" style="" >
			<view class="ui-col ui-col-8" style="padding-left:0px;padding-right:0px;"  span=8>
				<view class="ui-image" style=""  src="https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1920250%3Fs%3D60%26v%3D4">
					<image src="https://avatars1.githubusercontent.com/u/1920250?s=60&v=4"/>
				</view>
			</view>
			<view class="ui-col ui-col-8" style="padding-left:5px;padding-right:5px;"  span=8 gutter=10>
				<button class="ui-button" style=""  buttonText="%E6%88%91%E6%98%AF%E4%B8%80%E4%B8%AA%E6%8C%89%E9%92%AE">
					<text>我是一个按钮</text>
				</button>
			</view>
			<view class="ui-col ui-col-8" style="padding-left:0px;padding-right:0px;"  span=8>
				<view class="ui-image" style=""  src="https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1920250%3Fs%3D60%26v%3D4">
					<image src="https://avatars1.githubusercontent.com/u/1920250?s=60&v=4"/>
				</view>
			</view>
		</view>
	</view>
</view>
```
