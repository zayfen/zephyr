const { DefaultNode, LayoutNode, ThemeNode, Components } = require('../dist');

const { StringBuilder } = require('../dist/utils/string-utils');
const { resolveStyle, resolveClassList } = require('../dist/utils/node-utils');


const TAG = 'round-img-with-title';

 class RoundImgWithTitle extends DefaultNode {
  constructor() {
    super();
    this.image = new Components.Image();
    this.text = new Components.Text();
    this.append(this.image);
    this.append(this.text);
    this.tag = TAG;
    this.id = TAG + '-id';
  }

  setSrc (src) {
    this.image.setSrc(src);
  }

  getSrc () {
    return this.attr('src');
  }

  setTitle (title) {
    this.text.setText(title);
  }

  getTitle () {
    return this.text.getTitle();
  }
}

class RoundImgWithTitleLayout extends LayoutNode {
  constructor () {
    super();
    this.tag = TAG;
  }

  render (node) {
    let sb = new StringBuilder;
    let style = resolveStyle(node);
    let classString = resolveClassList(node);

    sb.appendLine(`<div class="${classString}" style="${style}">`);
    node.children.forEach(child => {
      sb.appendLine(child.layoutNode.render(child));
    })
    sb.appendLine('</div>');

    return sb.str();
  }
}

class RoundImgWithTitleTheme extends ThemeNode {
  constructor () {
    super();
    this.tag = TAG;
  }

  inject (node) {
    const kThemeClassList = ['ui-round-image-text'];
    kThemeClassList.forEach(cls => node.addClass(cls));
    return node;
  }
}


module.exports = exports = {
  RoundImgWithTitleTheme,
  RoundImgWithTitle,
  RoundImgWithTitleLayout
};
