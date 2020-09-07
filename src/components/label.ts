
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'label'

class Label extends VNode {
  constructor () {
    super(TAG)
  }

}


class LabelHTML extends LayoutNode<Label> {

  constructor () {
    super(TAG)
  }

  render(node: Label): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<label>${childrenRendered} </label>`
  }
}


class LabelWXML extends LayoutNode<Label> {

  constructor () {
    super(TAG)
  }

  render(node: Label): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<label>${childrenRendered} </label>`
  }

}

class LabelTheme extends ThemeNode<Label> {

  constructor () {
    super(TAG)
  }

  inject(node: Label): Label {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Label)
  assets.defineLayoutNode('html', new LabelHTML)
  assets.defineLayoutNode('wxml', new LabelWXML)
  assets.defineThemeNode('zephyr', new LabelTheme)
}

  