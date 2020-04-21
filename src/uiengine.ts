import { Render } from './ui-render';
import { Theme } from './ui-theme';

export class UIEngine {
  private root: Node = null;
  private render = null;
  private theme = null;

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
