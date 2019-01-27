# react-webcomponentify

<img src="https://github.com/master-atul/react-webcomponentify/blob/master/assets/react-webcomponent.png" width="200" height="auto" alt="logo" style="display:block; margin:0 auto;"/>

Build and export React Components as Web Components without any extra effort.

Size = ~3kb after gzip

# Use cases

- Export existing react components as web components so you can use them with Vue or Angular.
- Use rich react api to build web components with state management/etc
- Lets say you are writing a component library with web components but you already have a huge collection of component in react.You can use this library to generate a component library with the existing components. And then safely continue to rewrite each one of them behind the scene. This makes sure other teams are not waiting for you to finish.
- For more crazy people - You can even export your entire react app as a web component and embed it into another app made with Angular or Vue. So you can keep writing newer parts of code in react while keeping your legacy code working on the side.
- Maybe (not tried) you can embed another old react app (wrapped with this module) inside ur current react app.

# Install

```
npm install react-webcomponentify
```

or

```
yarn add react-webcomponentify
```

# Usage

### Basic

**Simple use case**

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

### Advanced

**Sending non string props to react**

You can send serializable string props via the html attributes itself. But for props like callback functions or complex objects you can use the `setProps` method on the element as shown below.

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

**What about child elements?**

Thats possible too 😎

```js
import React from "react";
import { registerAsWebComponent } from "react-webcomponentify";

// You access the children just like you would in react (using this.props.children)
export const ComponentWithChild = props => {
  return (
    <div>
      Hello World
      {this.props.text}
      <div>{this.props.children}</div>
    </div>
  );
};

registerAsWebComponent(ComponentWithChild, "component-with-child");
```

In HTML:

```html
<!DOCTYPE html>
<html>
  ....
  <body>
    <component-with-child text="I love children">
      <p>Some child</p>
    </component-with-child>
  </body>
  ....
</html>
```

This will send `<p>Some Child</p>` via this.props.children to the React component `ComponentWithChild`.
Note that `<p>Some Child</p>` is a dom node and not a react component. So it will be wrapped with a simple react component found here: https://github.com/master-atul/react-webcomponentify/blob/master/src/react-dom-child.js
But for implementation purposed use it like a regular child component.

# TODO

- Live Demos
- Maybe Typescript this?
- Test cases
