
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'h2'

class H2 extends VNode {
  constructor () {
    super(TAG)
  }

}


class H2HTML extends LayoutNode<H2> {

  constructor () {
    super(TAG)
  }

  render(node: H2): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<h2 id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</h2>`
  }
}


class H2WXML extends LayoutNode<H2> {

  constructor () {
    super(TAG)
  }

  render(node: H2): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class H2Theme extends ThemeNode<H2> {

  constructor () {
    super(TAG)
  }

  inject(node: H2): H2 {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, H2)
  assets.defineLayoutNode('html', new H2HTML)
  assets.defineLayoutNode('wxml', new H2WXML)
  assets.defineThemeNode('zephyr', new H2Theme)
}

  