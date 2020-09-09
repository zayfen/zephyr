
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


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
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<article id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</article>`
  }
}


class ArticleWXML extends LayoutNode<Article> {

  constructor () {
    super(TAG)
  }

  render(node: Article): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
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

  