
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = '__text__'

class __text__ extends VNode {
  text: string = ''

  constructor (text: string) {
    super(TAG)
    this.text = text
  }
}


class __text__HTML extends LayoutNode<__text__> {

  constructor () {
    super(TAG)
  }

  render(node: __text__): string {
    return `${node.text}`
  }
}


class __text__WXML extends LayoutNode<__text__> {

  constructor () {
    super(TAG)
  }

  render(node: __text__): string {
    return `${node.text}`
  }

}

class __text__Theme extends ThemeNode<__text__> {

  constructor () {
    super(TAG)
  }

  inject(node: __text__): __text__ {
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, __text__)
  assets.defineLayoutNode('html', new __text__HTML)
  assets.defineLayoutNode('wxml', new __text__WXML)
  assets.defineThemeNode('zephyr', new __text__Theme)
}

