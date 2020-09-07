
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'hgroup'

class Hgroup extends VNode {
  constructor () {
    super(TAG)
  }

}


class HgroupHTML extends LayoutNode<Hgroup> {

  constructor () {
    super(TAG)
  }

  render(node: Hgroup): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<hgroup>${childrenRendered} </hgroup>`
  }
}


class HgroupWXML extends LayoutNode<Hgroup> {

  constructor () {
    super(TAG)
  }

  render(node: Hgroup): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class HgroupTheme extends ThemeNode<Hgroup> {

  constructor () {
    super(TAG)
  }

  inject(node: Hgroup): Hgroup {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Hgroup)
  assets.defineLayoutNode('html', new HgroupHTML)
  assets.defineLayoutNode('wxml', new HgroupWXML)
  assets.defineThemeNode('zephyr', new HgroupTheme)
}

  