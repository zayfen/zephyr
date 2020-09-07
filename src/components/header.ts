
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'header'

class Header extends VNode {
  constructor () {
    super(TAG)
  }

}


class HeaderHTML extends LayoutNode<Header> {

  constructor () {
    super(TAG)
  }

  render(node: Header): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<header>${childrenRendered} </header>`
  }
}


class HeaderWXML extends LayoutNode<Header> {

  constructor () {
    super(TAG)
  }

  render(node: Header): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class HeaderTheme extends ThemeNode<Header> {

  constructor () {
    super(TAG)
  }

  inject(node: Header): Header {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Header)
  assets.defineLayoutNode('html', new HeaderHTML)
  assets.defineLayoutNode('wxml', new HeaderWXML)
  assets.defineThemeNode('zephyr', new HeaderTheme)
}

  