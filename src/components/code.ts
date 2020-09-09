
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'code'

class Code extends VNode {
  constructor () {
    super(TAG)
  }

}


class CodeHTML extends LayoutNode<Code> {

  constructor () {
    super(TAG)
  }

  render(node: Code): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<code id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</code>`
  }
}


class CodeWXML extends LayoutNode<Code> {

  constructor () {
    super(TAG)
  }

  render(node: Code): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class CodeTheme extends ThemeNode<Code> {

  constructor () {
    super(TAG)
  }

  inject(node: Code): Code {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Code)
  assets.defineLayoutNode('html', new CodeHTML)
  assets.defineLayoutNode('wxml', new CodeWXML)
  assets.defineThemeNode('zephyr', new CodeTheme)
}

  