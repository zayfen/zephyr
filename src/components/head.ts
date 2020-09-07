
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'head'

class Head extends VNode {
  constructor () {
    super(TAG)
  }

}


class HeadHTML extends LayoutNode<Head> {

  constructor () {
    super(TAG)
  }

  render(node: Head): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<head>${childrenRendered} </head>`
  }
}


class HeadWXML extends LayoutNode<Head> {

  constructor () {
    super(TAG)
  }

  render(node: Head): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class HeadTheme extends ThemeNode<Head> {

  constructor () {
    super(TAG)
  }

  inject(node: Head): Head {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Head)
  assets.defineLayoutNode('html', new HeadHTML)
  assets.defineLayoutNode('wxml', new HeadWXML)
  assets.defineThemeNode('zephyr', new HeadTheme)
}

  