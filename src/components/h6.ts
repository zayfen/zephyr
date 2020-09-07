
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'h6'

class H6 extends VNode {
  constructor () {
    super(TAG)
  }

}


class H6HTML extends LayoutNode<H6> {

  constructor () {
    super(TAG)
  }

  render(node: H6): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<h6>${childrenRendered} </h6>`
  }
}


class H6WXML extends LayoutNode<H6> {

  constructor () {
    super(TAG)
  }

  render(node: H6): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class H6Theme extends ThemeNode<H6> {

  constructor () {
    super(TAG)
  }

  inject(node: H6): H6 {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, H6)
  assets.defineLayoutNode('html', new H6HTML)
  assets.defineLayoutNode('wxml', new H6WXML)
  assets.defineThemeNode('zephyr', new H6Theme)
}

  