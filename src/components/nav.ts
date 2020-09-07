
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'nav'

class Nav extends VNode {
  constructor () {
    super(TAG)
  }

}


class NavHTML extends LayoutNode<Nav> {

  constructor () {
    super(TAG)
  }

  render(node: Nav): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<nav>${childrenRendered} </nav>`
  }
}


class NavWXML extends LayoutNode<Nav> {

  constructor () {
    super(TAG)
  }

  render(node: Nav): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class NavTheme extends ThemeNode<Nav> {

  constructor () {
    super(TAG)
  }

  inject(node: Nav): Nav {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Nav)
  assets.defineLayoutNode('html', new NavHTML)
  assets.defineLayoutNode('wxml', new NavWXML)
  assets.defineThemeNode('zephyr', new NavTheme)
}

  