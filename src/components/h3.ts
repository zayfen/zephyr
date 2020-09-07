
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'h3'

class H3 extends VNode {
  constructor () {
    super(TAG)
  }

}


class H3HTML extends LayoutNode<H3> {

  constructor () {
    super(TAG)
  }

  render(node: H3): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<h3>${childrenRendered} </h3>`
  }
}


class H3WXML extends LayoutNode<H3> {

  constructor () {
    super(TAG)
  }

  render(node: H3): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class H3Theme extends ThemeNode<H3> {

  constructor () {
    super(TAG)
  }

  inject(node: H3): H3 {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, H3)
  assets.defineLayoutNode('html', new H3HTML)
  assets.defineLayoutNode('wxml', new H3WXML)
  assets.defineThemeNode('zephyr', new H3Theme)
}

  