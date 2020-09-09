
import { VNode } from './core/prototype'
import { LayoutManager } from './core/layout-manager'
import { ThemeManager } from './core/theme-manager'
import { ComponentAssets } from './core/component-assets'
import { Parser } from './compiler/parser'
import { AST } from './compiler/ast'
import { splitStyleStr2Styles } from './utils/node-utils'
import { createElementFromHTML } from './utils/dom-utils'
import componentInstallers from './components/index'


class MutationObserver {
  constructor (callback: any) {

  }

  observe (target: any, config: any) {

  }
}

export class Zephyr {
  private root: VNode = null
  private assets: ComponentAssets = null
  private layout: string = ''
  private theme: string = ''
  private observer: MutationObserver = null

  constructor (node?: VNode, layoutName: string = '', themeName: string = '') {
    this.root = node
    this.layout = layoutName
    this.theme = themeName
    this.assets = new ComponentAssets()

    this.observer = new MutationObserver(this.mutationCallback.bind(this))

  }


  private mutationCallback = function (mutations: MutationRecord[], observer: MutationObserver) {
    mutations.forEach(mutation => {
      console.log('[UIEngine]: mutation: ', mutation)
      if (mutation.addedNodes.length > 0) { // 增加了节点, 此时我们认为挂载成功,可以调用onMounted回调函数
        this.onMounted()
      }
    })
  }


  public setComponentAssets (assets: ComponentAssets) {
    this.assets = assets
  }


  // to install a component
  public use (installer: (assets: ComponentAssets) => void): void {
    installer(this.assets)
  }


  public useLayout (layout: string): Zephyr {
    this.layout = layout;
    return this;
  }


  public useTheme (theme: string): Zephyr {
    this.theme = theme;
    return this;
  }


  private injectLayoutAndTheme () {
    const layoutManager: LayoutManager = this.assets.findLayoutManager(this.layout)
    const themeManager: ThemeManager = this.assets.findThemeManager(this.theme)

    let queue: Array<VNode> = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode?.children && currentNode.children.length > 0) {
        currentNode.children.forEach(node => queue.push(node));
      }
      currentNode.app = this
      themeManager.injectThemeNode(currentNode);
      layoutManager.injectLayoutNode(currentNode);
    }
  }


  /**
   * 渲染模板
   * @param { string } template 模板字符串
   * @returns { VNode } 返回转换之后的VNode Tree
   */
  public renderTemplate (template: string): VNode {
    const parser = new Parser(template)
    const ast = parser.parse()

    console.log("renderTemplate ast: ", ast)

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


  /**
   * 创建ast的tag创建对应的VNode实例
   * @param {{ AST }} ast 解析的模板字符串中的AST中一个节点
   * @return {{ VNode }} 返回虚拟节点
   */
  private createVNodeInstance (ast: AST): VNode {
    const VNodeCtor = this.assets.findVNodeByTag(ast.tag)
    console.log("createVNodeInstance: ", ast.tag)
    console.log("createVNodeInstance: ", VNodeCtor, VNodeCtor == null)
    let instance = new VNodeCtor

    // set attributes
    ast.attrs?.forEach(attr => {
      let key = attr.key
      let value = attr.value

      // TODO: 这里解析归类所有的attributes, 有style class event  filter...
      switch (key) {
        case 'style':
          instance.addStyles(splitStyleStr2Styles(value as string))
          break
        case 'class':
          (value as string).split(' ').forEach(cls => instance.addClass(cls))
          break
        default:
          instance.addAttr(key, value)
      }
    })

    // 处理text节点
    if (ast.isText) {
      instance.isText = true
      instance.text = ast.text
    }
    return instance
  }


  // render 规范化之后的AST, 也就是增加了$vnode字段的AST
  public renderAST (ast: AST): VNode {
    let vnodeRoot = ast.$vnode

    // is text
    this.root = vnodeRoot

    let queue = []
    queue.push(ast)
    while (queue.length > 0) {
      let front = queue.shift()
      if (front.$parent) {
        front.$parent.children.push(front.$vnode)
      }

      if (front.children && front.children.length > 0) {
        front.children.forEach(child => queue.push(child))
      }
    }

    return this.root
  }



  /**
   * 渲染virtual node tree
   */
  public render<T extends VNode>(root?: T): string {
    if (root) {
      this.root = root
    }

    if (this.layout === '' || this.theme === '') {
      throw new Error('Please Set layout or theme')
    }

    if (this.root === null) {
      return ''
    }

    // step 1: inject theme and layout to Node
    this.injectLayoutAndTheme()

    // step2: render root
    // let dom = this.root.layoutNode.render(this.root);
    let dom: string = this.root.render()
    return dom
  }




  /**
   * 挂载
   * @param target 挂载的目标元素(dom id或者dom元素)
   */
  public mount (target: string | Element, node?: VNode) {
    let _target: Element = null
    if (typeof target === 'string') { // is dom id
      _target = document.getElementById(target[0] === '#' ? target.substr(1) : target)
    } else if (target instanceof Element) {
      _target = target
    } else {
      throw new Error('target is wrong')
    }

    // remove _target children
    while (_target.firstChild) {
      _target.removeChild(_target.lastChild)
    }

    // 用MutationObserver监听挂载是否完成
    // 如果挂载完成,就对树进行后序遍历,依次调用onMounted方法
    this.observer.observe(_target, { childList: true, subtree: false })

    _target.appendChild(createElementFromHTML(this.render(node)))
  }


  /**
   * 挂载回调函数
   * 后序遍历,依次调用组件的onMounted方法
   */
  onMounted () {
    let stack: VNode[] = []
    // push root, push right, push left, pop left and loop
    stack.push(this.root)

    let visitedNodesCache = Object.create(null)

    function allChildrenVisited (node: VNode) {
      return node.children.reduce((prevVal: boolean, child: VNode) => prevVal && visitedNodesCache[child.id], true)
    }

    while (stack.length > 0) {
      let top = stack[stack.length-1]
      if (allChildrenVisited(top) || (!top.children || top.children.length <= 0)) {
        top.onMounted()
        stack.pop()
        visitedNodesCache[top.id] = true
        continue
      }

      if (top.children && top.children.length > 0) {
        top.children.forEach(child => stack.push(child))
      }

    }

    visitedNodesCache = null // release memory
  }
}


/**
 * 生成一个带有内置组件的zephyr对象
 *
 * @returns {{ Zephyr }} zephyr对象
 **/
export function makeZephyrWithInnerComponents (): Zephyr {
  let zephyr = new Zephyr()
  componentInstallers.forEach(installer => zephyr.use(installer))
  return zephyr
}
