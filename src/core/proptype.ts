// 节点接口
import { setStyle } from "../utils/node-utils";

type TAG_TYPE = TAGS | string

interface Node {
  tag: TAG_TYPE,
  id: string,
  level: number,
  style: { [key: string]: number | string },
  customClassList: string[],
  classList: string[],
  attrList: { [key: string]: string | number },
  attrWhiteList?: string[], // 属性白名单, 自由在白名单中的属性才能render到视图节点上
  children: Array<Node>
  themeNode: ThemeNode<Node>,
  layoutNode: LayoutNode<Node>,
  append(child: Node): this,
  appendTo(parent: Node): this,
  addAttr(key: string, value: any): this,
  addStyle(key: string, value: string | number): this,
  addCustomClass(cls: string): this,
  addClass(cls: string): this,
  attr(key: string): any,
  addWhiteListAttr(key: string): this
}


abstract class DefaultNode implements Node {
  attrWhiteList?: string[];
  tag: TAG_TYPE = TAGS.NONE;
  id: string = '';
  level: number = 0;
  style: { [key: string]: string | number } = {};
  customClassList: string[] = [];
  classList: string[] = [];
  attrList: { [key: string]: any; } = {};
  children: Node[] = [];
  themeNode: ThemeNode<Node>;
  layoutNode: LayoutNode<Node>;

  constructor() {
    this.attrWhiteList = [];
    this.id = '';
    this.level = 0;
    this.style = {};
    this.customClassList = [];
    this.classList = [];
    this.children = [];
  }

  append (child: Node): this {
    this.children.push(child);
    child.level = this.level + 1;
    return this;
  }

  appendTo (node: Node): this {
    node.children.push(this);
    this.level = node.level + 1;
    return this;
  }

  addCustomClass (cls: string): this {
    if (this.customClassList.indexOf(cls.trim()) === -1) {
      this.customClassList.push(cls);
    }
    return this;
  }

  addClass (cls: string): this {
    if (this.classList.indexOf(cls.trim()) === -1) {
      this.classList.push(cls);
    }
    return this;
  }

  addAttr (key: string, value: any): this {
    this.attrList[key] = value;
    return this;
  }

  attr (key: string): any {
    return this.attrList[key];
  }

  addStyle (key: string, value: string | number): this {
    setStyle(this, key, value);
    return this;
  }

  addWhiteListAttr (key: string): this {
    this.attrWhiteList.push(key);
    return this;
  }
}


abstract class LayoutNode<T extends Node> {
  tag: TAG_TYPE = TAGS.NONE;
  tabWidth: number = 2;
  abstract render(node: T): string;
}


abstract class ThemeNode<T extends Node> {
  tag: TAG_TYPE = TAGS.NONE;
  abstract inject(node: T): T;
}


class Layout {
  private name: string = ''; // render name
  private layoutNodeList: Array<LayoutNode<Node>> = [];

  public registerLayoutNode <T extends Node> (node: LayoutNode<T>) {
    let foundIndex = this.duplicatedLayoutNode(node);
    if (foundIndex === -1) {
      this.layoutNodeList.push(node);
      return;
    }
    this.layoutNodeList.splice(foundIndex, 1, node);
  }

  public injectLayoutNode <T extends Node> (node: T) {
    for (let i = 0; i < this.layoutNodeList.length; i++) {
      if (this.layoutNodeList[i].tag === node.tag) {
        node.layoutNode = this.layoutNodeList[i];
        return;
      }
    }
    debugger
    throw new Error('No Adapted LayoutNode: ' + node.tag);
  }

  private duplicatedLayoutNode<T extends Node> (node: LayoutNode<T>): number {
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
  private name: string = ''; // theme name
  private themeNodeList: Array<ThemeNode<Node>> = [];

  public registerThemeNode <T extends Node> (node: ThemeNode<T>) {
    let foundIndex = this.duplicatedThemeNode(node);
    if (foundIndex === -1) {
      this.themeNodeList.push(node);
      return;
    }
    this.themeNodeList.splice(foundIndex, 1, node);
  }


  private duplicatedThemeNode <T extends Node> (node: ThemeNode<T>): number {
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

  public injectThemeNode <T extends Node> (node: T) {
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

export { Node, DefaultNode, LayoutNode, ThemeNode, Layout, Theme, TAGS };
