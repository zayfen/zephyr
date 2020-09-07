
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'th'

class Th extends VNode {
  constructor () {
    super(TAG)
  }

}


class ThHTML extends LayoutNode<Th> {

  constructor () {
    super(TAG)
  }

  render(node: Th): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<th>${childrenRendered} </th>`
  }
}


class ThWXML extends LayoutNode<Th> {

  constructor () {
    super(TAG)
  }

  render(node: Th): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class ThTheme extends ThemeNode<Th> {

  constructor () {
    super(TAG)
  }

  inject(node: Th): Th {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Th)
  assets.defineLayoutNode('html', new ThHTML)
  assets.defineLayoutNode('wxml', new ThWXML)
  assets.defineThemeNode('zephyr', new ThTheme)
}

  