
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'def'

class Def extends VNode {
  constructor () {
    super(TAG)
  }

}


class DefHTML extends LayoutNode<Def> {

  constructor () {
    super(TAG)
  }

  render(node: Def): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<def>${childrenRendered} </def>`
  }
}


class DefWXML extends LayoutNode<Def> {

  constructor () {
    super(TAG)
  }

  render(node: Def): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class DefTheme extends ThemeNode<Def> {

  constructor () {
    super(TAG)
  }

  inject(node: Def): Def {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Def)
  assets.defineLayoutNode('html', new DefHTML)
  assets.defineLayoutNode('wxml', new DefWXML)
  assets.defineThemeNode('zephyr', new DefTheme)
}

  