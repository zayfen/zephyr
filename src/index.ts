import { UIEngine } from "./uiengine";
import { Node, DefaultNode, Layout, LayoutNode, Theme, ThemeNode } from './core/proptype';

// import { Page, Row, Col, Card, Image, Button, Text } from './core/node-factory'
import * as Components from './core/node-factory';
import {BasicTheme} from './themes/base/base-theme'
import {BasicHTMLLayout} from './layouts/html/html-layout'
import {BasicWXMLLayout} from './layouts/wxml/wxml-layout'

// 原型接口
export {
  UIEngine,
  Node,
  DefaultNode,
  Layout,
  LayoutNode,
  Theme,
  ThemeNode,
}

// 基础组件的 主题 和 HTML & WXML的布局对象
export {
  Components,
  BasicTheme,
  BasicHTMLLayout,
  BasicWXMLLayout
}

