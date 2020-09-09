
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


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
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<hgroup id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</hgroup>`
  }
}


class HgroupWXML extends LayoutNode<Hgroup> {

  constructor () {
    super(TAG)
  }

  render(node: Hgroup): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
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

  