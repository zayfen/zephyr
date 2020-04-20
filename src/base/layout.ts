// UI 布局组件

import { Node } from './node';


// 横向布局
class Row implements Node {
  id = '';
  level = 0;
  style = '';
  classList = ['ui-layout-row'];
  attrList = {};
}


// 居中布局
class Center extends Node {
  style = ''
  classList = ['ui-layout-center'];
}
