import { Node } from './base/proptype';
import { Render } from './ui-render';
import { Theme } from './ui-theme';

export class UIEngine {
  private root: Node = null;
  private render = null;
  private theme = null;

  constructor (node: Node, render?: Render, theme?: Theme) {
    this.root = node;
    if (render) {
      this.render = render;
    }
    if (theme) {
      this.theme = theme;
    }
  }

  useRender(render: Render) {
    this.render = render;
  }

  useTheme(theme: Theme) {
    this.theme = theme;
  }

  render() {
    // to render tree
  }
}
