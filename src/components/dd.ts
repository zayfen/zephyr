
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'dd'

class Dd extends VNode {
  constructor () {
    super(TAG)
  }

}


class DdHTML extends LayoutNode<Dd> {

  constructor () {
    super(TAG)
  }

  render(node: Dd): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<dd>${childrenRendered} </dd>`
  }
}


class DdWXML extends LayoutNode<Dd> {

  constructor () {
    super(TAG)
  }

  render(node: Dd): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class DdTheme extends ThemeNode<Dd> {

  constructor () {
    super(TAG)
  }

  inject(node: Dd): Dd {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Dd)
  assets.defineLayoutNode('html', new DdHTML)
  assets.defineLayoutNode('wxml', new DdWXML)
  assets.defineThemeNode('zephyr', new DdTheme)
}

  