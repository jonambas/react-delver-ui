import React from 'react';
import ReactDOM from 'react-dom';

const use18 = __delverConfig.use18;

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
