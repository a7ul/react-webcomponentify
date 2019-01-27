import ReactDOM from "react-dom";
import React from "react";
import { ReactDomChild } from "./react-dom-child";
import createRef from "react-create-ref";

/*
PropBridge stores props passed to it via setProps in the state.
And then passes those to the component as regular props
Hence when you call setProps you are calling setState
and then passing those as props to the react component.
*/

export const renderReact2Node = (
  RComponent,
  initialProps,
  targetDomNode,
  onRender
) => {
  class PropBridge extends React.PureComponent {
    state = { ...initialProps };
    setProps = props => this.setState(() => props);
    render() {
      return <RComponent {...this.props} {...this.state} />;
    }
  }
  const propBridgeRef = createRef();
  ReactDOM.render(<PropBridge ref={propBridgeRef} />, targetDomNode, () =>
    onRender(propBridgeRef)
  );
};

export const sendPropsToReact = (propBridgeRef, props) => {
  if (propBridgeRef && propBridgeRef.current) {
    propBridgeRef.current.setProps(props);
  }
};

export const getPropsFromNode = node => {
  const attributeNames = node.getAttributeNames();
  const mappedProps = attributeNames.reduce((props, name) => {
    props[name] = node.getAttribute(name);
    return props;
  }, {});
  mappedProps.children = <ReactDomChild>{node.children}</ReactDomChild>;
  return mappedProps;
};
