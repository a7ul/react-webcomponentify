import React from "react";
import "child-replace-with-polyfill";

export class ReactDomChild extends React.Component {
  ref = React.createRef();
  componentDidMount() {
    const children = this.props.children || [];
    this.ref.current.replaceWith(...children);
  }
  render() {
    return <div ref={this.ref} />;
  }
}
