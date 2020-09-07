
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'tbody'

class Tbody extends VNode {
  constructor () {
    super(TAG)
  }

}


class TbodyHTML extends LayoutNode<Tbody> {

  constructor () {
    super(TAG)
  }

  render(node: Tbody): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<tbody>${childrenRendered} </tbody>`
  }
}


class TbodyWXML extends LayoutNode<Tbody> {

  constructor () {
    super(TAG)
  }

  render(node: Tbody): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class TbodyTheme extends ThemeNode<Tbody> {

  constructor () {
    super(TAG)
  }

  inject(node: Tbody): Tbody {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Tbody)
  assets.defineLayoutNode('html', new TbodyHTML)
  assets.defineLayoutNode('wxml', new TbodyWXML)
  assets.defineThemeNode('zephyr', new TbodyTheme)
}

  