import { createRoot } from 'react-dom/client';
import React from 'react';
import { ReactDomChild } from './react-dom-child';
import createRef from 'react-create-ref';

/*
PropBridge stores props passed to it via setProps in the state.
And then passes those to the component as regular props
Hence when you call setProps you are calling setState
and then passing those as props to the react component.
*/

export const renderReact2Node = (
  RComponent: React.ElementType,
  initialProps: {},
  targetDomNode: Element | DocumentFragment,
  onRender: (ref: React.RefObject<any>) => void
) => {
  class PropBridge extends React.PureComponent {
    state = { ...initialProps };
    setProps = (props: React.RefObject<PropBridge>) =>
      this.setState(() => props);
    render() {
      return <RComponent {...this.props} {...this.state} />;
    }
  }
  const propBridgeRef = createRef<PropBridge>();

  // support react 18
  const PropBridgeWithCallback = () => {
    React.useEffect(() => {
      onRender(propBridgeRef);
    }, []);
    return <PropBridge ref={propBridgeRef} />;
  }

  createRoot(targetDomNode).render(<PropBridgeWithCallback />);

};

export const sendPropsToReact = (
  propBridgeRef: React.RefObject<any>,
  props: any
) => {
  if (propBridgeRef && propBridgeRef.current) {
    propBridgeRef.current.setProps(props);
  }
};

export const getPropsFromNode = (node: HTMLElement) => {
  const attributeNames = node.getAttributeNames();
  const mappedProps = attributeNames.reduce(
    (props: { [key: string]: string | JSX.Element }, name: string) => {
      props[name] = node.getAttribute(name);
      return props;
    },
    {}
  );

  const children = Array.from(node.childNodes).map((e) => e.cloneNode(true));
  mappedProps.children = <ReactDomChild>{children}</ReactDomChild>;
  return mappedProps;
};
