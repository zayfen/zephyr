// template compiler utils

import { AST } from '../compiler/ast'
import { Parser } from '../compiler/parser'
import { Node, Layout } from '../core/prototype';

export function convertAstToLayoutNode<T extends Node> (ast: AST, layout: Layout): T {

  let tag = ast.tag
  while (tag) {
    let layoutNode = layout.findLayoutNodeByTag(tag)

    // set attrs

  }

  return null
}
