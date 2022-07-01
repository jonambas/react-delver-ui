# react-delver-ui

A standalone UI built for [react-delver](https://github.com/jonambas/react-delver) that can installed and deployed with your React code.

Demo: https://react-delver-ui.vercel.app/

---

Usage
```bash
npm i react-delver-ui --save-dev
```

Create a `delver.config.js` config file in the root directory of your project.
```js
/**
 * @type {import('react-delver-ui').Config}
 */
export default {
  include: [
      '**/*.{jsx,tsx,js,ts}',
      '!**/*.stories.{jsx,tsx,js,ts}',
      '!**/node_modules',
      '!**/dist'
    ],
  port: 8080,
  outputPath: 'dist/delver-ui',
  title: 'My App'
};
```

Add the following scripts to `package.json`
```json
"scripts": {
  "start:delver": "delver start",
  "build:delver": "delver build"
},
```
Run the app!
```bash
npm run start:delver
```

---

## `delver.config.js` Options

This config object extends the `react-delver` config options. See [https://github.com/jonambas/react-delver#node-api](https://github.com/jonambas/react-delver#node-api) for a full list of JSX parsing options.

#### `port`

#### `outputPath`

#### `title`

#### `openBrowser`

#### `base`

