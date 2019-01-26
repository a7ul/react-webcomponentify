# react-webcomponentify

Build and export React Components as Web Components without any extra effort.

# Install

```
npm install react-webcomponentify
```

or

```
yarn add react-webcomponentify
```

# Usage

```js
import React from "react";
import { registerAsWebComponent } from "react-webcomponentify";

export const ExampleReactComponent = () => {
  return <div> Hello </div>;
};

registerAsWebComponent("example-component", ExampleReactComponent);
```

In HTML:

```html
<!DOCTYPE html>
<html>
  ....
  <body>
    <example-component />
  </body>
  ....
</html>
```
