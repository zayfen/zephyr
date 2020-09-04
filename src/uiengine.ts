
import { VNode } from './core/prototype'
import { LayoutManager } from './core/layout-manager'
import { ThemeManager } from './core/theme-manager'
import { ComponentAssets } from './core/component-assets'
import { Parser } from './compiler/parser'
import { AST } from './compiler/ast'
import { isReservedTag } from './utils/node-utils'

export class Zephyr {
  private root: VNode = null
  private assets: ComponentAssets = null
  private layout: string = ''
  private theme: string = ''

  constructor (node: VNode, layoutName: string = '', themeName: string = '') {
    this.root = node;
    this.layout = layoutName
    this.theme = themeName
  }

  public setComponentAssets (assets: ComponentAssets) {
    this.assets = assets
  }

  public useLayout(layout: string): Zephyr {
    this.layout = layout;
    return this;
  }

  public useTheme(theme: string): Zephyr {
    this.theme = theme;
    return this;
  }

  /**
   * 渲染virtual node tree
   */
  public render<T extends VNode>(root?: T) {
    if (root) {
      this.root = root;
    }

    if (this.layout === '' || this.theme === '') {
      throw new Error('Please Set layout or theme');
    }

    if (this.root === null) {
      return '';
    }

    const layoutManager: LayoutManager = this.assets.findLayoutManager(this.layout)
    const themeManager: ThemeManager = this.assets.findThemeManager(this.theme)

    // step 1: inject theme and layout to Node
    let queue: Array<VNode> = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode?.children && currentNode.children.length > 0) {
        currentNode.children.forEach(node => queue.push(node));
      }
      themeManager.injectThemeNode(currentNode);
      layoutManager.injectLayoutNode(currentNode);
    }

    // step2: render root
    // let dom = this.root.layoutNode.render(this.root);
    let dom = this.root.render()
    return dom;
  }

  // render 规范化之后的AST, 也就是增加了$vnode字段的AST
  public renderAST (ast: AST): string {
    let vnodeRoot = ast.$vnode

    let queue = []
    queue.push(ast)
    while (queue.length > 0) {
      let front = queue.shift()
      if (front.$parent) {
        front.$parent.push(front.$vnode)
      }

      if (front.children && front.children.length > 0) {
        front.children.forEach(child => queue.push(child))
      }
    }

    this.render(vnodeRoot)
  }


  private createVNodeInstance (ast: AST): VNode {
    if (isReservedTag(ast.tag) || ast.isText) {
      return null
    }

    const VNodeCtor = this.assets.findVNodeByTag(ast.tag)
    return new VNodeCtor
  }

  public renderTemplate (template: string): string {
    const parser = new Parser(template)
    const ast = parser.parse()

    // dfs create vnode by ast
    let stack: AST[] = []
    stack.push(ast)
    while (stack.length > 0) {
      // pop top
      let top = stack.pop()

      // create VNode instance
      top.$vnode = this.createVNodeInstance(top)

      // push children of top to stack
      if (top.children && top.children.length > 0) {
        top.children.forEach(child => {
          child.$parent = top.$vnode
          stack.push(child)
        })
      }
    }

    return this.renderAST(ast)
  }

}
