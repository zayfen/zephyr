// 节点接口
import { setStyle } from '../utils/node-utils';
import { LayoutManager } from './layout-manager';
import { ThemeManager } from './theme-manager';
import { randomKey } from '../utils/misc-utils';
import { Zephyr } from '../zephyr';

export type TAG_TYPE = TAGS | string;

// interface of VNode
export interface IVNode {
  tag: TAG_TYPE;
  zephyr: Zephyr;
  id: string;
  level: number;
  style: { [key: string]: number | string };
  customClassList: string[];
  classList: string[];
  attrList: { [key: string]: string | number };
  attrWhiteList?: string[]; // 属性白名单, 自由在白名单中的属性才能render到视图节点上
  children: Array<IVNode>;
  themeNode: ThemeNode<IVNode>;
  layoutNode: LayoutNode<IVNode>;
  layout: LayoutManager;
  theme: ThemeManager;
  isText: boolean;
  text?: string;
  $el?: Element;
  getId(): string;
  append(child: IVNode): this;
  appendTo(parent: IVNode): this;
  addAttr(key: string, value: any): this;
  addStyle(key: string, value: string | number): this;
  addStyles(styleObject: { [key: string]: string | number }): this;
  removeStyle(key: string): this;
  clearStyles (): this;
  addCustomClass(cls: string): this;
  removeCustomClass(cls: string): this;
  clearCustomClass(): this;
  addClass(cls: string): this;
  removeClass(cls: string): this;
  clearClass(): this;
  attr(key: string, elseDefault?: any): any;
  removeAttr(key: string): this;
  clearAttr(): this;
  addWhiteListAttr(key: string): this;
  removeWhiteListAttr(key: string): this;
  clearWhiteListAttr(): this;
  render(layout?: LayoutManager, theme?: ThemeManager): string;
  update(): void;
  onMounted(): void;
  onUpdate(): void;
}

export abstract class VNode implements IVNode {
  attrWhiteList?: string[];
  tag: TAG_TYPE = TAGS.NONE;
  zephyr: Zephyr = null;
  id: string = '';
  level: number = 0;
  style: { [key: string]: string | number } = {};
  customClassList: string[] = [];
  classList: string[] = [];
  attrList: { [key: string]: any } = {};
  children: VNode[] = [];
  themeNode: ThemeNode<IVNode>;
  layoutNode: LayoutNode<IVNode>;
  layout: LayoutManager;
  theme: ThemeManager;
  isText = false; // default is false
  text = ''; // default is not text, so value is empty string

  constructor(tag?: TAG_TYPE) {
    this.attrWhiteList = [];
    this.id = '';
    this.level = 0;
    this.style = {};
    this.customClassList = [];
    this.classList = [];
    this.children = [];
    this.tag = tag;
  }

  getId(): string {
    if (this.id === '') {
      this.id = this.tag ? this.tag + '-' + randomKey(8) : randomKey(12);
    }

    return this.id;
  }

  update(): void {
    this.onUpdate();
  }

  onMounted(): void {
    console.warn(
      'onMounted Method not implemented.' + `(${this.tag} :: ${this.id})`
    );
  }

  onUpdate(): void {
    console.warn(
      'onUpdate Method not implemented.' + `(${this.tag} :: ${this.id})`
    );
  }

  append(child: VNode): this {
    this.children.push(child);
    child.level = this.level + 1;
    return this;
  }

  appendTo(node: IVNode): this {
    node.children.push(this);
    this.level = node.level + 1;
    return this;
  }

  addCustomClass(cls: string): this {
    if (this.customClassList.indexOf(cls.trim()) === -1) {
      this.customClassList.push(cls);
    }
    return this;
  }

  removeCustomClass (cls: string): this {
    const foundIndex = this.customClassList.indexOf(cls.trim())
    if (foundIndex > -1) {
      this.customClassList.splice(foundIndex, 1)
    }
    return this
  }

  clearCustomClass (): this {
    this.customClassList.length = 0
    return this
  }

  addClass (cls: string): this {
    if (this.classList.indexOf(cls.trim()) === -1) {
      this.classList.push(cls);
    }
    return this;
  }

  removeClass (cls: string): this {
    const foundIndex = this.classList.indexOf(cls.trim())
    if (foundIndex > -1) {
      this.classList.splice(foundIndex, 1)
    }
    return this
  }

  clearClass (): this {
    this.classList.length = 0
    return this
  }

  addAttr(key: string, value: any): this {
    this.attrList[key] = value;
    return this;
  }

  attr(key: string, elseDefault?: any): any {
    return this.attrList[key] === void 0 ? elseDefault : this.attrList[key];
  }

  removeAttr (key: string): this {
    delete this.attrList[key]
    return this
  }

  clearAttr (): this {
    this.attrList = Object.create(null)
    return this
  }

  addStyle(key: string, value: string | number): this {
    setStyle(this, key, value);
    return this;
  }

  addStyles(styleObject: { [key: string]: string | number }): this {
    for (let key of Object.keys(styleObject)) {
      this.addStyle(key, styleObject[key]);
    }

    return this;
  }

  removeStyle (key: string): this {
    delete this.style[key]
    return this
  }

  clearStyles (): this {
    this.style = Object.create(null)
    return this
  }

  addWhiteListAttr(key: string): this {
    this.attrWhiteList.push(key);
    return this;
  }

  removeWhiteListAttr (key: string): this {
    const foundIndex = this.attrWhiteList.indexOf(key)
    if (foundIndex > -1) {
      this.attrWhiteList.splice(foundIndex, 1)
    }
    return this
  }

  clearWhiteListAttr (): this {
    this.attrWhiteList.length = 0
    return this
  }


  render(layout?: LayoutManager, theme?: ThemeManager): string {
    layout?.injectLayoutNode(this);
    theme?.injectThemeNode(this);
    if (this.layoutNode) {
      return this.layoutNode.render(this);
    }
    throw new Error('No layoutNode bind to ' + this);
  }
}

// 尺寸转换的接口
export abstract class SizeTranslator {
  readonly unit: string;
  abstract translate(size: number): string;
  constructor(unit: string) {
    this.unit = unit;
  }
}

export type TSizeTranslatorHolder = {
  translator?: SizeTranslator;
};

// 布局Node的原型接口
export abstract class LayoutNode<T extends IVNode> {
  tag: TAG_TYPE = TAGS.NONE;
  private tabWidth: number = 2;
  sizeTranslatorHolder?: TSizeTranslatorHolder;

  constructor(tag?: TAG_TYPE) {
    if (tag) {
      this.tag = tag;
    }
  }

  public hasSizeTranslator(): boolean {
    return !!this.sizeTranslatorHolder.translator;
  }

  public sizeTranslator(): SizeTranslator {
    return this.sizeTranslatorHolder.translator;
  }

  public setTranslatorHolder(translatorHolder: TSizeTranslatorHolder) {
    this.sizeTranslatorHolder = translatorHolder;
  }

  abstract render(node: T): string;
}

// 主题Node的原型接口
export abstract class ThemeNode<T extends IVNode> {
  tag: TAG_TYPE = TAGS.NONE;

  constructor(tag?: TAG_TYPE) {
    if (tag) {
      this.tag = tag;
    }
  }

  abstract inject(node: T): T;
}

// 声明组件的tag,所有的组件的识别都要基于这个tag
export enum TAGS {
  NONE = 0,
  PAGE,
  ROW,
  COL,
  CARD,
  IMAGE,
  BUTTON,
  TEXT,
}
