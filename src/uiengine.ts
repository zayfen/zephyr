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

  useLayout(layout: Layout) {
    this.layout = layout;
  }

  useTheme(theme: Theme) {
    this.theme = theme;
  }

  render() {
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
