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

**Basic**

```js
import React from "react";
import { registerAsWebComponent } from "react-webcomponentify";

export const ExampleReactComponent = () => {
  return <div> Hello </div>;
};

registerAsWebComponent(ExampleReactComponent, "example-component");
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

**Advanced**

```js
import React from "react";
import { registerAsWebComponent } from "react-webcomponentify";

export const ButtonComponent = props => {
  return (
    <div>
      Hello <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

registerAsWebComponent(ButtonComponent, "button-web");
```

In HTML:

```html
<!DOCTYPE html>
<html>
  ....
  <body>
    <button-web text="click me" id="mybutton" />
  </body>
  ....
  <script>
    const myBtn = document.getElementById("mybutton");
    myBtn.setProps({
      onClick: () => console.log("btn was clicked")
    });
  </script>
</html>
```

Every custom component built using react-webcomponentify will have an instance method `setProps`

```js
element.setProps({
  ....
  /* set the props here that you want to send to react */
  ....
})
```

# More detailed examples and scenarios coming soon...
