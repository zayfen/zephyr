
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'dt'

class Dt extends VNode {
  constructor () {
    super(TAG)
  }

}


class DtHTML extends LayoutNode<Dt> {

  constructor () {
    super(TAG)
  }

  render(node: Dt): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<dt>${childrenRendered} </dt>`
  }
}


class DtWXML extends LayoutNode<Dt> {

  constructor () {
    super(TAG)
  }

  render(node: Dt): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class DtTheme extends ThemeNode<Dt> {

  constructor () {
    super(TAG)
  }

  inject(node: Dt): Dt {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Dt)
  assets.defineLayoutNode('html', new DtHTML)
  assets.defineLayoutNode('wxml', new DtWXML)
  assets.defineThemeNode('zephyr', new DtTheme)
}

  