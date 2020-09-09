
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'base'

class Base extends VNode {
  constructor () {
    super(TAG)
  }

}


class BaseHTML extends LayoutNode<Base> {

  constructor () {
    super(TAG)
  }

  render(node: Base): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<base id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</base>`
  }
}


class BaseWXML extends LayoutNode<Base> {

  constructor () {
    super(TAG)
  }

  render(node: Base): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class BaseTheme extends ThemeNode<Base> {

  constructor () {
    super(TAG)
  }

  inject(node: Base): Base {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Base)
  assets.defineLayoutNode('html', new BaseHTML)
  assets.defineLayoutNode('wxml', new BaseWXML)
  assets.defineThemeNode('zephyr', new BaseTheme)
}

  