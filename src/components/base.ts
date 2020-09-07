
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'base'

class Base extends VNode {
  constructor () {
    super(TAG)
  }

}


class BaseHTML extends LayoutNode<Base> {

  constructor () {
    super(TAG)
  }

  render(node: Base): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<base>${childrenRendered} </base>`
  }
}


class BaseWXML extends LayoutNode<Base> {

  constructor () {
    super(TAG)
  }

  render(node: Base): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class BaseTheme extends ThemeNode<Base> {

  constructor () {
    super(TAG)
  }

  inject(node: Base): Base {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Base)
  assets.defineLayoutNode('html', new BaseHTML)
  assets.defineLayoutNode('wxml', new BaseWXML)
  assets.defineThemeNode('zephyr', new BaseTheme)
}

  