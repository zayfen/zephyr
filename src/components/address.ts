
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'address'

class Address extends VNode {
  constructor () {
    super(TAG)
  }

}


class AddressHTML extends LayoutNode<Address> {

  constructor () {
    super(TAG)
  }

  render(node: Address): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<address>${childrenRendered} </address>`
  }
}


class AddressWXML extends LayoutNode<Address> {

  constructor () {
    super(TAG)
  }

  render(node: Address): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class AddressTheme extends ThemeNode<Address> {

  constructor () {
    super(TAG)
  }

  inject(node: Address): Address {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Address)
  assets.defineLayoutNode('html', new AddressHTML)
  assets.defineLayoutNode('wxml', new AddressWXML)
  assets.defineThemeNode('zephyr', new AddressTheme)
}

  