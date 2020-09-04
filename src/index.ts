import { UIEngine } from "./uiengine";
import {
  IVNode,
  VNode,
  Layout,
  LayoutNode,
  Theme,
  ThemeNode,
  SizeTranslator
} from './core/prototype';
// export * from './core/prototype';
import * as Components from './core/node-factory';
import {BasicTheme} from './themes/base/base-theme'
import {BasicHTMLLayout} from './layouts/html/html-layout'
import {BasicWXMLLayout} from './layouts/wxml/wxml-layout'

import * as NodeUtils from './utils/node-utils';
import * as StringUtils from './utils/string-utils';

// 原型接口
export {
  UIEngine,
  IVNode,
  VNode,
  Layout,
  LayoutNode,
  Theme,
  ThemeNode,
  SizeTranslator
}

// 基础组件的 主题 和 HTML & WXML的布局对象
export {
  Components,
  BasicTheme,
  BasicHTMLLayout,
  BasicWXMLLayout
}

// 导出Utils
export {
  NodeUtils,
  StringUtils
}
