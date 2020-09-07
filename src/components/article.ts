
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'article'

class Article extends VNode {
  constructor () {
    super(TAG)
  }

}


class ArticleHTML extends LayoutNode<Article> {

  constructor () {
    super(TAG)
  }

  render(node: Article): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<article>${childrenRendered} </article>`
  }
}


class ArticleWXML extends LayoutNode<Article> {

  constructor () {
    super(TAG)
  }

  render(node: Article): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class ArticleTheme extends ThemeNode<Article> {

  constructor () {
    super(TAG)
  }

  inject(node: Article): Article {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Article)
  assets.defineLayoutNode('html', new ArticleHTML)
  assets.defineLayoutNode('wxml', new ArticleWXML)
  assets.defineThemeNode('zephyr', new ArticleTheme)
}

  