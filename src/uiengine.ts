import { Node, Layout, Theme } from './core/prototype';
import { createElementFromHTML } from './utils/dom-utils';

export class UIEngine {
  private root: Node = null;
  private layout: Layout = null;
  private theme: Theme = null;
  private observer: MutationObserver = null;

  private mutationCallback = function (mutations: MutationRecord[], observer: MutationObserver) {
    mutations.forEach(mutation => {
      console.log('[UIEngine]: mutation: ', mutation)
      if (mutation.addedNodes.length > 0) { // 增加了节点, 此时我们认为挂载成功,可以调用onMounted回调函数
        this.onMounted()
      }
    })
  }

  constructor (node: Node, layout?: Layout, theme?: Theme) {
    this.root = node;
    if (layout) {
      this.layout = layout;
    }
    if (theme) {
      this.theme = theme;
    }
    if (!this.observer) {
      this.observer = new MutationObserver(this.mutationCallback.bind(this))
    }
  }


  useLayout(layout: Layout): UIEngine {
    this.layout = layout;
    return this;
  }

  useTheme(theme: Theme): UIEngine {
    this.theme = theme;
    return this;
  }

  render<T extends Node>(root?: T) {
    if (root) {
      this.root = root;
    }

    if (this.layout === null || this.theme === null) {
      throw new Error('Please Set layout or theme');
    }

    if (this.root === null) {
      return '';
    }

    // step 1: inject theme and layout to Node
    let queue: Array<Node> = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode?.children && currentNode.children.length > 0) {
        currentNode.children.forEach(node => queue.push(node));
      }
      this.theme.injectThemeNode(currentNode);
      this.layout.injectLayoutNode(currentNode);
    }

    // step2: render root
    let dom = this.root.layoutNode.render(this.root);
    return dom;
  }

  setRootNode (node: Node): UIEngine {
    this.root = node
    return this
  }

  /**
   * 挂载k
   * @param target 挂载的目标元素(dom id或者dom元素)
   */
  mount (target: string | Element, node?: Node) {
    let _target: Element = null
    if (typeof target === 'string') { // is dom id
      _target = document.getElementById(target[0] === '#' ? target.substr(1) : target)
    } else if (target instanceof Element) {
      _target = target
    } else {
      throw new Error('target is wrong')
    }

    if (node) {
      this.setRootNode(node)
    }

    // 用MutationObserver监听挂载是否完成
    // 如果挂载完成,就对树进行后序遍历,依次调用onMounted方法
    this.observer.observe(_target, { childList: true, subtree: false })

    _target.appendChild(createElementFromHTML(this.render(this.root)))
  }

  /**
   * 挂载回调函数
   * 后序遍历,依次调用组件的onMounted方法
   */
  onMounted () {
    let stack: Node[] = []
    // push root, push right, push left, pop left and loop
    stack.push(this.root)

    let visitedNodesCache = Object.create(null)

    function allChildrenVisited (node: Node) {
      return node.children.reduce((prevVal: boolean, child: Node) => prevVal && visitedNodesCache[child.id], true)
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
