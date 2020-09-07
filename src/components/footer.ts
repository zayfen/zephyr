
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'footer'

class Footer extends VNode {
  constructor () {
    super(TAG)
  }

}


class FooterHTML extends LayoutNode<Footer> {

  constructor () {
    super(TAG)
  }

  render(node: Footer): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<footer>${childrenRendered} </footer>`
  }
}


class FooterWXML extends LayoutNode<Footer> {

  constructor () {
    super(TAG)
  }

  render(node: Footer): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class FooterTheme extends ThemeNode<Footer> {

  constructor () {
    super(TAG)
  }

  inject(node: Footer): Footer {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Footer)
  assets.defineLayoutNode('html', new FooterHTML)
  assets.defineLayoutNode('wxml', new FooterWXML)
  assets.defineThemeNode('zephyr', new FooterTheme)
}

  