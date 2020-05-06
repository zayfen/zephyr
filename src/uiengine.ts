import { Node, Layout, Theme } from './base/proptype';

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
    return this.layout.findRender(this.root).render(this.theme);
  }
}
