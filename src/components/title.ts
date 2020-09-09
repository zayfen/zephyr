
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'title'

class Title extends VNode {
  constructor () {
    super(TAG)
  }

}


class TitleHTML extends LayoutNode<Title> {

  constructor () {
    super(TAG)
  }

  render(node: Title): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<title id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</title>`
  }
}


class TitleWXML extends LayoutNode<Title> {

  constructor () {
    super(TAG)
  }

  render(node: Title): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class TitleTheme extends ThemeNode<Title> {

  constructor () {
    super(TAG)
  }

  inject(node: Title): Title {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Title)
  assets.defineLayoutNode('html', new TitleHTML)
  assets.defineLayoutNode('wxml', new TitleWXML)
  assets.defineThemeNode('zephyr', new TitleTheme)
}

  