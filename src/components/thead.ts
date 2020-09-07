
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'thead'

class Thead extends VNode {
  constructor () {
    super(TAG)
  }

}


class TheadHTML extends LayoutNode<Thead> {

  constructor () {
    super(TAG)
  }

  render(node: Thead): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<thead>${childrenRendered} </thead>`
  }
}


class TheadWXML extends LayoutNode<Thead> {

  constructor () {
    super(TAG)
  }

  render(node: Thead): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class TheadTheme extends ThemeNode<Thead> {

  constructor () {
    super(TAG)
  }

  inject(node: Thead): Thead {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Thead)
  assets.defineLayoutNode('html', new TheadHTML)
  assets.defineLayoutNode('wxml', new TheadWXML)
  assets.defineThemeNode('zephyr', new TheadTheme)
}

  