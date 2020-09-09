
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'i'

class I extends VNode {
  constructor () {
    super(TAG)
  }

}


class IHTML extends LayoutNode<I> {

  constructor () {
    super(TAG)
  }

  render(node: I): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<i id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</i>`
  }
}


class IWXML extends LayoutNode<I> {

  constructor () {
    super(TAG)
  }

  render(node: I): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class ITheme extends ThemeNode<I> {

  constructor () {
    super(TAG)
  }

  inject(node: I): I {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, I)
  assets.defineLayoutNode('html', new IHTML)
  assets.defineLayoutNode('wxml', new IWXML)
  assets.defineThemeNode('zephyr', new ITheme)
}

  