import React from 'react';
import { App } from './App';
import { renderRoot } from './utils/root';

document.title = __delverConfig.title;
const out = document.createElement('div');
document.body.append(out);
renderRoot(<App />, out);
