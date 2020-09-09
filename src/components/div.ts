
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'div'

class Div extends VNode {
  constructor () {
    super(TAG)
  }

}


class DivHTML extends LayoutNode<Div> {

  constructor () {
    super(TAG)
  }

  render(node: Div): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<div id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</div>`
  }
}


class DivWXML extends LayoutNode<Div> {

  constructor () {
    super(TAG)
  }

  render(node: Div): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class DivTheme extends ThemeNode<Div> {

  constructor () {
    super(TAG)
  }

  inject(node: Div): Div {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Div)
  assets.defineLayoutNode('html', new DivHTML)
  assets.defineLayoutNode('wxml', new DivWXML)
  assets.defineThemeNode('zephyr', new DivTheme)
}

  