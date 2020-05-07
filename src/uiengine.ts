import { Node, Layout, Theme, ThemeNode } from './base/proptype';

export class UIEngine {
  private root: Node = null;
  private layout: Layout = null;
  private theme: Theme = null;

  constructor (node: Node, layout?: Layout, theme?: Theme) {
    this.root = node;
    if (layout) {
      this.layout = layout;
    }
    if (theme) {
      this.theme = theme;
    }
  }

  useLayout(layout: Layout): UIEngine {
    this.layout = layout;
    return this;
  }

  useTheme(theme: Theme): UIEngine {
    this.theme = theme;
    return this;
  }

  render() {
    if (this.layout === null || this.theme === null) {
      throw new Error('Please Set layout or theme');
    }

    if (this.root === null) {
      return '';
    }

    // step 1: inject theme and layout to Node
    let queue: Array<Node> = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode.children && currentNode.children.length > 0) {
        currentNode.children.forEach(node => queue.push(node));
      }
      this.theme.injectThemeNode(currentNode);
      this.layout.injectLayoutNode(currentNode);
    }

    // step2: render root
    let dom = this.root.layoutNode.render(this.root);
    return dom;
  }
}
