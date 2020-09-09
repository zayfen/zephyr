
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'iframe'

class Iframe extends VNode {
  constructor () {
    super(TAG)
  }

}


class IframeHTML extends LayoutNode<Iframe> {

  constructor () {
    super(TAG)
  }

  render(node: Iframe): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<iframe id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</iframe>`
  }
}


class IframeWXML extends LayoutNode<Iframe> {

  constructor () {
    super(TAG)
  }

  render(node: Iframe): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<web-view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</web-view>`
  }

}

class IframeTheme extends ThemeNode<Iframe> {

  constructor () {
    super(TAG)
  }

  inject(node: Iframe): Iframe {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Iframe)
  assets.defineLayoutNode('html', new IframeHTML)
  assets.defineLayoutNode('wxml', new IframeWXML)
  assets.defineThemeNode('zephyr', new IframeTheme)
}

  