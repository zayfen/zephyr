// UI 布局组件

import { Node, TAGS } from './proptype';


// 横向布局
class Row implements Node {
  tag = TAGS.ROW;
  id = '';
  level = 0;
  style = '';
  classList = ['ui-row'];
  attrList = {};
}
