
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'h4'

class H4 extends VNode {
  constructor () {
    super(TAG)
  }

}


class H4HTML extends LayoutNode<H4> {

  constructor () {
    super(TAG)
  }

  render(node: H4): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<h4 id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</h4>`
  }
}


class H4WXML extends LayoutNode<H4> {

  constructor () {
    super(TAG)
  }

  render(node: H4): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class H4Theme extends ThemeNode<H4> {

  constructor () {
    super(TAG)
  }

  inject(node: H4): H4 {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, H4)
  assets.defineLayoutNode('html', new H4HTML)
  assets.defineLayoutNode('wxml', new H4WXML)
  assets.defineThemeNode('zephyr', new H4Theme)
}

  