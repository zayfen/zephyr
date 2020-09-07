
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'td'

class Td extends VNode {
  constructor () {
    super(TAG)
  }

}


class TdHTML extends LayoutNode<Td> {

  constructor () {
    super(TAG)
  }

  render(node: Td): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<td>${childrenRendered} </td>`
  }
}


class TdWXML extends LayoutNode<Td> {

  constructor () {
    super(TAG)
  }

  render(node: Td): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class TdTheme extends ThemeNode<Td> {

  constructor () {
    super(TAG)
  }

  inject(node: Td): Td {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Td)
  assets.defineLayoutNode('html', new TdHTML)
  assets.defineLayoutNode('wxml', new TdWXML)
  assets.defineThemeNode('zephyr', new TdTheme)
}

  