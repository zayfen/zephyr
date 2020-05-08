// 节点接口

import { camelCase2kebabCase } from "../utils/string_utils";



interface Node {
  tag: TAGS | string,
  id: string,
  level: Number,
  style: { [key: string]: number | string },
  customClassList: string[],
  classList: string[],
  attrList: { [key: string]: string | number },
  attrWhiteList?: string[], // 属性白名单
  children: Array<Node>
  themeNode: ThemeNode,
  layoutNode: LayoutNode,
  append: (child: Node) => Node,
  appendTo: (parent: Node) => Node,
  addAttr: (key: string, value: any) => Node,
  addStyle: (key: string, value: string|number) => Node,
  addCustomClass: (cls: string) => Node
}


abstract class DefaultNode implements Node {
  attrWhiteList?: string[];
  tag = TAGS.NONE;
  id: string = '';
  level: Number = 0;
  style: { [key: string]: string | number } = {};
  customClassList: string[] = [];
  classList: string[] = [];
  attrList: { [key: string]: any; } = {};
  children: Node[] = [];
  themeNode: ThemeNode = null;
  layoutNode: LayoutNode = null;

  append (child: Node): Node {
    this.children.push(child);
    return this;
  }

  appendTo (node: Node): Node {
    node.children.push(this);
    return this;
  }

  addCustomClass (cls: string): Node {
    if (this.customClassList.indexOf(cls.trim()) === -1) {
      this.customClassList.push(cls);
    }
    return this;
  }

  addAttr (key: string, value: any): Node {
    this.attrList[key] = value;
    return this;
  }

  addStyle (key: string, value: string | number): Node {
    Utils.setStyle(this, key, value);
    return this;
  }
}


abstract class LayoutNode {
  tag: TAGS = TAGS.NONE;
  tabWidth: Number;
  abstract render(node: Node): string;
}


abstract class ThemeNode {
  tag: TAGS = TAGS.NONE;
  abstract inject(node: Node): Node;
}


class Layout {
  private name: string; // render name
  private layoutNodeList: Array<LayoutNode> = [];

  public registerLayoutNode (node: LayoutNode) {
    let foundIndex = this.duplicatedLayoutNode(node);
    if (foundIndex === -1) {
      this.layoutNodeList.push(node);
      return;
    }
    this.layoutNodeList.splice(foundIndex, 1, node);
  }

  public injectLayoutNode (node: Node) {
    for (let i = 0; i < this.layoutNodeList.length; i++) {
      if (this.layoutNodeList[i].tag === node.tag) {
        node.layoutNode = this.layoutNodeList[i];
        return;
      }
    }

    throw new Error('No Adapted LayoutNode: ' + node.tag);
  }

  private duplicatedLayoutNode (node: LayoutNode): number {
    let foundIndex = -1;

    for (let i = 0; i < this.layoutNodeList.length; i++) {
      let _node = this.layoutNodeList[i];
      if (_node.tag === node.tag) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  }

}

class Theme {
  private name: string; // theme name
  private themeNodeList: Array<ThemeNode> = [];

  public registerThemeNode (node: ThemeNode) {
    let foundIndex = this.duplicatedThemeNode(node);
    if (foundIndex === -1) {
      this.themeNodeList.push(node);
      return;
    }
    this.themeNodeList.splice(foundIndex, 1, node);
  }


  private duplicatedThemeNode (node: ThemeNode): number {
    let foundIndex = -1;
    for (let i = 0; i < this.themeNodeList.length; i++) {
      let _node = this.themeNodeList[i];
      if (_node.tag === node.tag) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  }

  public injectThemeNode (node: Node) {
    for (let i = 0; i < this.themeNodeList.length; i++) {
      if (this.themeNodeList[i].tag === node.tag) {
        node.themeNode = this.themeNodeList[i];
        node.classList.splice(0, node.classList.length);
        node.themeNode.inject(node);
        return;
      }
    }

    throw new Error('No Adapted ThemeNode: ' + node.tag);
  }

}


// 声明组件的tag,所有的组件的识别都要基于这个tag
enum TAGS {
  NONE = 0,
  PAGE,
  ROW,
  COL,
  CARD,
  IMAGE,
  BUTTON,
  TEXT
}


// some utils
const Utils = {
  resolveClassList (node: Node): string {
    let finalClassList: string[] = [];
    node.classList.forEach(cls => {
      if (finalClassList.indexOf(cls.trim()) === -1) {
        finalClassList.push(cls);
      }
    })

    node.customClassList.forEach(cls => {
      if (finalClassList.indexOf(cls) === -1) {
        finalClassList.push(cls);
      }
    })

    return finalClassList.join(' ');
  },

  resolveAttributes (node: Node): string {
    let validAttrList: string[] = node.attrWhiteList ? node.attrWhiteList : Object.keys(node.attrList);
    if (!validAttrList || !Array.isArray(validAttrList)) {
      return '';
    }

    let attributes = validAttrList.reduce((prev: string, curr: string) => {
      if (node.attrList.hasOwnProperty(curr)) {
        let val: string|number = node.attrList[curr];
        if (typeof val === 'string') {
          val = '\"' + encodeURIComponent(val) + '\"';
        }
        return `${prev} ${curr}=${val}`;
      }
      return prev;
    }, '');

    return attributes;
  },

  resolveStyle (node: Node): string {
    let keys = Object.keys(node.style);
    return keys.reduce((prev, curr) => {
      return prev + camelCase2kebabCase(curr) + ':' + node.style[curr] + ';';
    }, '');
  },

  setStyle (node: Node, styleKey: string, styleValue: string|number) {
    node.style[styleKey] = styleValue;
  }
}

export { Node, DefaultNode, LayoutNode, ThemeNode, Layout, Theme, TAGS, Utils };
