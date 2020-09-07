
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'option'

class Option extends VNode {
  constructor () {
    super(TAG)
  }

}


class OptionHTML extends LayoutNode<Option> {

  constructor () {
    super(TAG)
  }

  render(node: Option): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<option>${childrenRendered} </option>`
  }
}


class OptionWXML extends LayoutNode<Option> {

  constructor () {
    super(TAG)
  }

  render(node: Option): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class OptionTheme extends ThemeNode<Option> {

  constructor () {
    super(TAG)
  }

  inject(node: Option): Option {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Option)
  assets.defineLayoutNode('html', new OptionHTML)
  assets.defineLayoutNode('wxml', new OptionWXML)
  assets.defineThemeNode('zephyr', new OptionTheme)
}

  