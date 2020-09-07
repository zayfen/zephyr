
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'li'

class Li extends VNode {
  constructor () {
    super(TAG)
  }

}


class LiHTML extends LayoutNode<Li> {

  constructor () {
    super(TAG)
  }

  render(node: Li): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<li>${childrenRendered} </li>`
  }
}


class LiWXML extends LayoutNode<Li> {

  constructor () {
    super(TAG)
  }

  render(node: Li): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class LiTheme extends ThemeNode<Li> {

  constructor () {
    super(TAG)
  }

  inject(node: Li): Li {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Li)
  assets.defineLayoutNode('html', new LiHTML)
  assets.defineLayoutNode('wxml', new LiWXML)
  assets.defineThemeNode('zephyr', new LiTheme)
}

  