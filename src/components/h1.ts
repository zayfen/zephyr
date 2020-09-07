
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'h1'

class H1 extends VNode {
  constructor () {
    super(TAG)
  }

}


class H1HTML extends LayoutNode<H1> {

  constructor () {
    super(TAG)
  }

  render(node: H1): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<h1>${childrenRendered} </h1>`
  }
}


class H1WXML extends LayoutNode<H1> {

  constructor () {
    super(TAG)
  }

  render(node: H1): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class H1Theme extends ThemeNode<H1> {

  constructor () {
    super(TAG)
  }

  inject(node: H1): H1 {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, H1)
  assets.defineLayoutNode('html', new H1HTML)
  assets.defineLayoutNode('wxml', new H1WXML)
  assets.defineThemeNode('zephyr', new H1Theme)
}

  