
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'th'

class Th extends VNode {
  constructor () {
    super(TAG)
  }

}


class ThHTML extends LayoutNode<Th> {

  constructor () {
    super(TAG)
  }

  render(node: Th): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<th id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</th>`
  }
}


class ThWXML extends LayoutNode<Th> {

  constructor () {
    super(TAG)
  }

  render(node: Th): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class ThTheme extends ThemeNode<Th> {

  constructor () {
    super(TAG)
  }

  inject(node: Th): Th {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Th)
  assets.defineLayoutNode('html', new ThHTML)
  assets.defineLayoutNode('wxml', new ThWXML)
  assets.defineThemeNode('zephyr', new ThTheme)
}

  