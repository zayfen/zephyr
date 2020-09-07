
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'ul'

class Ul extends VNode {
  constructor () {
    super(TAG)
  }

}


class UlHTML extends LayoutNode<Ul> {

  constructor () {
    super(TAG)
  }

  render(node: Ul): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<ul>${childrenRendered} </ul>`
  }
}


class UlWXML extends LayoutNode<Ul> {

  constructor () {
    super(TAG)
  }

  render(node: Ul): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class UlTheme extends ThemeNode<Ul> {

  constructor () {
    super(TAG)
  }

  inject(node: Ul): Ul {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Ul)
  assets.defineLayoutNode('html', new UlHTML)
  assets.defineLayoutNode('wxml', new UlWXML)
  assets.defineThemeNode('zephyr', new UlTheme)
}

  