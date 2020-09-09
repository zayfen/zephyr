
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


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
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<head id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</head>`
  }
}


class HeadWXML extends LayoutNode<Head> {

  constructor () {
    super(TAG)
  }

  render(node: Head): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
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

  