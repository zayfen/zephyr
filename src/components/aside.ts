
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'aside'

class Aside extends VNode {
  constructor () {
    super(TAG)
  }

}


class AsideHTML extends LayoutNode<Aside> {

  constructor () {
    super(TAG)
  }

  render(node: Aside): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<aside id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</aside>`
  }
}


class AsideWXML extends LayoutNode<Aside> {

  constructor () {
    super(TAG)
  }

  render(node: Aside): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class AsideTheme extends ThemeNode<Aside> {

  constructor () {
    super(TAG)
  }

  inject(node: Aside): Aside {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Aside)
  assets.defineLayoutNode('html', new AsideHTML)
  assets.defineLayoutNode('wxml', new AsideWXML)
  assets.defineThemeNode('zephyr', new AsideTheme)
}

  