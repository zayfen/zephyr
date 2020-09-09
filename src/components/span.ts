
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'span'

class Span extends VNode {
  constructor () {
    super(TAG)
  }

}


class SpanHTML extends LayoutNode<Span> {

  constructor () {
    super(TAG)
  }

  render(node: Span): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<span id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</span>`
  }
}


class SpanWXML extends LayoutNode<Span> {

  constructor () {
    super(TAG)
  }

  render(node: Span): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<text id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</text>`
  }

}

class SpanTheme extends ThemeNode<Span> {

  constructor () {
    super(TAG)
  }

  inject(node: Span): Span {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Span)
  assets.defineLayoutNode('html', new SpanHTML)
  assets.defineLayoutNode('wxml', new SpanWXML)
  assets.defineThemeNode('zephyr', new SpanTheme)
}

  