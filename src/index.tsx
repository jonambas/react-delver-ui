import React from 'react';
import { App } from './App';
import { renderRoot } from './utils/root';

window.__delverConfig = __delverConfig;
const out = document.createElement('div');
document.body.append(out);

renderRoot(<App />, out);
