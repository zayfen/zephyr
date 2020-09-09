
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'thead'

class Thead extends VNode {
  constructor () {
    super(TAG)
  }

}


class TheadHTML extends LayoutNode<Thead> {

  constructor () {
    super(TAG)
  }

  render(node: Thead): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<thead id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</thead>`
  }
}


class TheadWXML extends LayoutNode<Thead> {

  constructor () {
    super(TAG)
  }

  render(node: Thead): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class TheadTheme extends ThemeNode<Thead> {

  constructor () {
    super(TAG)
  }

  inject(node: Thead): Thead {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Thead)
  assets.defineLayoutNode('html', new TheadHTML)
  assets.defineLayoutNode('wxml', new TheadWXML)
  assets.defineThemeNode('zephyr', new TheadTheme)
}

  