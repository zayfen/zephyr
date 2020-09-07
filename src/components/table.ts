
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


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
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<table>${childrenRendered} </table>`
  }
}


class TableWXML extends LayoutNode<Table> {

  constructor () {
    super(TAG)
  }

  render(node: Table): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
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

  