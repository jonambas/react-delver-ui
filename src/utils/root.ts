import React from 'react';
import ReactDOM, { version } from 'react-dom';

const use18 =
  version && (version.startsWith('18') || version.startsWith('0.0.0'));

export const renderRoot = async (
  node: React.ReactNode,
  container: HTMLElement
) => {
  if (use18) {
    const reactDomClient = (await import('react-dom/client')).default;
    const root = reactDomClient.createRoot(container);
    root.render(node);
  } else {
    ReactDOM.render(node as React.ReactElement, container);
  }
};
