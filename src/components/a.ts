
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'a'

class A extends VNode {
  constructor () {
    super(TAG)
  }

}


class AHTML extends LayoutNode<A> {

  constructor () {
    super(TAG)
  }

  render(node: A): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<a>${childrenRendered} </a>`
  }
}


class AWXML extends LayoutNode<A> {

  constructor () {
    super(TAG)
  }

  render(node: A): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<navigator>${childrenRendered} </navigator>`
  }

}

class ATheme extends ThemeNode<A> {

  constructor () {
    super(TAG)
  }

  inject(node: A): A {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, A)
  assets.defineLayoutNode('html', new AHTML)
  assets.defineLayoutNode('wxml', new AWXML)
  assets.defineThemeNode('zephyr', new ATheme)
}

  