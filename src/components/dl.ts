
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'dl'

class Dl extends VNode {
  constructor () {
    super(TAG)
  }

}


class DlHTML extends LayoutNode<Dl> {

  constructor () {
    super(TAG)
  }

  render(node: Dl): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<dl>${childrenRendered} </dl>`
  }
}


class DlWXML extends LayoutNode<Dl> {

  constructor () {
    super(TAG)
  }

  render(node: Dl): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class DlTheme extends ThemeNode<Dl> {

  constructor () {
    super(TAG)
  }

  inject(node: Dl): Dl {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Dl)
  assets.defineLayoutNode('html', new DlHTML)
  assets.defineLayoutNode('wxml', new DlWXML)
  assets.defineThemeNode('zephyr', new DlTheme)
}

  