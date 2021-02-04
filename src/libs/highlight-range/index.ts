//ref https://github.com/Treora/dom-highlight-range/blob/master/highlight-range.js

import { v4 as uuid } from 'uuid';

export type HighlightRangeI = ReturnType<typeof HighlightRange>;

export function HighlightRange() {
  function makeHighlight(
    range: Range,
    tagName?: string,
    attributes?: { [key: string]: string }
  ): string | null {
    if (range.collapsed) return null;

    // id for removing highlight
    const id = uuid();
    const newAttributes = { ...attributes, highlightid: id, highlighted: '' };

    // First put all nodes in an array (splits start and end nodes if needed)
    const nodesToHighlight = nodesInRange(range, filterTextNodes);

    // Highlight each node
    for (let i = 0; i < nodesToHighlight.length; i++) {
      const highlightedNode = wrapNodeInHighlight(
        nodesToHighlight[i],
        tagName,
        newAttributes
      );

      // set range start to new node
      if (i === 0) range.setStart(highlightedNode, 0);
      // set range end to new node
      if (i === nodesToHighlight.length - 1) range.setEnd(highlightedNode, 1);
    }

    return id;
  }

  function removeHighlight(
    highlightid: string,
    rootElement: Document | HTMLElement = document
  ) {
    const highlightedNodes = rootElement.querySelectorAll(
      `[highlightid="${highlightid}"]`
    );

    for (let i = 0; i < highlightedNodes.length; i++) {
      const node = highlightedNodes[i];
      const parent = node.parentNode;
      if (node.childNodes.length === 1)
        parent?.replaceChild(node.firstChild as Text, node);
      else {
        while (node.firstChild)
          parent?.insertBefore(node.firstChild as Text, node);
      }
      if (i === 0) parent?.normalize();
      if (i === highlightedNodes.length - 1) parent?.normalize();
    }
  }

  return { makeHighlight, removeHighlight };
}

// Return an array of the text nodes in the range. Split the start and end nodes if required.
function nodesInRange(
  range: Range,
  filter?: (node: Node | null) => Node | null
): Node[] {
  if (
    range.startContainer.nodeType === Node.TEXT_NODE &&
    range.startOffset > 0 &&
    range.startOffset < (range.startContainer as Text).length
  ) {
    // (this may get lost when the splitting the node)
    const endOffset = range.endOffset;
    const createdNode = (range.startContainer as Text).splitText(
      range.startOffset
    );

    // If the end was in the same container,
    // it will now be in the newly created node.
    if (range.endContainer === range.startContainer)
      range.setEnd(createdNode, endOffset - range.startOffset);
    range.setStart(createdNode, 0);
  }

  if (
    range.endContainer.nodeType === Node.TEXT_NODE &&
    range.endOffset > 0 &&
    range.endOffset < (range.endContainer as Text).length
  )
    (range.endContainer as Text).splitText(range.endOffset);

  // Collect the text nodes.
  const owner = range.startContainer.ownerDocument ?? document;
  const walker = owner.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ALL
  );
  walker.currentNode = range.startContainer;

  let reachedEnd = range.endContainer.contains(walker.currentNode);
  const skipStartContainer =
    range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startOffset === (range.startContainer as Text).length
      : range.startOffset === range.startContainer.cloneNode.length;
  const skipEndContainer = range.endOffset === 0;
  const nodes: Node[] = [];

  if (walker.currentNode.nodeType === Node.TEXT_NODE && !skipStartContainer)
    nodes.push(walker.currentNode);
  while (walker.nextNode()) {
    const isInsideEnd = range.endContainer.contains(walker.currentNode);
    if (!reachedEnd && isInsideEnd) reachedEnd = true;
    if (reachedEnd && (skipEndContainer || !isInsideEnd)) break;
    if (skipStartContainer && range.startContainer.contains(walker.currentNode))
      continue;
    const filteredNode = filter
      ? filter(walker.currentNode)
      : walker.currentNode;
    filteredNode && nodes.push(walker.currentNode);
  }

  return nodes;
}

// Replace [node] with <tagName ...attributes>[node]</tagName>
function wrapNodeInHighlight(
  node: Node,
  tagName: string = 'mark',
  attributes?: { [key: string]: string }
) {
  const highlightElement = document.createElement(tagName);

  if (attributes) {
    for (const key in attributes) {
      highlightElement.setAttribute(key, attributes[key]);
    }
  }

  const owner = node.ownerDocument ?? document;
  const tempRange = owner.createRange();
  tempRange.selectNode(node);
  tempRange.surroundContents(highlightElement);
  return highlightElement;
}

// returns textNode with content or null
function filterTextNodes(node: Node | null): Node | null {
  if (
    node &&
    node.nodeType === Node.TEXT_NODE &&
    node.textContent &&
    !/^\n$/.test(node.textContent) // filter newline
  )
    return node;
  else return null;
}
