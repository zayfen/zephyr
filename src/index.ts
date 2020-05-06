
const root: Node = {};

const basicTheme = {};
const htmlRender = {};

const engine = new UIEngine(root);
engine.useTheme(basicTheme).useRender(htmlRender).render();
