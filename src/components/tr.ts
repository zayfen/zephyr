
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'tr'

class Tr extends VNode {
  constructor () {
    super(TAG)
  }

}


class TrHTML extends LayoutNode<Tr> {

  constructor () {
    super(TAG)
  }

  render(node: Tr): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<tr id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</tr>`
  }
}


class TrWXML extends LayoutNode<Tr> {

  constructor () {
    super(TAG)
  }

  render(node: Tr): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class TrTheme extends ThemeNode<Tr> {

  constructor () {
    super(TAG)
  }

  inject(node: Tr): Tr {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Tr)
  assets.defineLayoutNode('html', new TrHTML)
  assets.defineLayoutNode('wxml', new TrWXML)
  assets.defineThemeNode('zephyr', new TrTheme)
}

  