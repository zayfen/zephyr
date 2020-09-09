
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'table'

class Table extends VNode {
  constructor () {
    super(TAG)
  }

}


class TableHTML extends LayoutNode<Table> {

  constructor () {
    super(TAG)
  }

  render(node: Table): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<table id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</table>`
  }
}


class TableWXML extends LayoutNode<Table> {

  constructor () {
    super(TAG)
  }

  render(node: Table): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class TableTheme extends ThemeNode<Table> {

  constructor () {
    super(TAG)
  }

  inject(node: Table): Table {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Table)
  assets.defineLayoutNode('html', new TableHTML)
  assets.defineLayoutNode('wxml', new TableWXML)
  assets.defineThemeNode('zephyr', new TableTheme)
}

  