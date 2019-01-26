import {
  renderReact2Node,
  getPropsFromNode,
  sendPropsToReact
} from "./prop-bridge";

const getCustomElementFromReactComponent = RComponent => {
  return class ReactAsCustomElement extends HTMLElement {
    shadow = null;
    propBridgeRef = null;
    props = {};
    observer = null;

    constructor() {
      super();
      this.props = getPropsFromNode(this);
      this.observer = new MutationObserver(this._onMutation);
      this.shadow = this.attachShadow({ mode: "closed" });
      renderReact2Node(RComponent, this.props, this.shadow, this._onReactMount);
    }

    setProps = newProps => {
      this.props = { ...this.props, ...newProps };
      sendPropsToReact(this.propBridgeRef, this.props);
    };

    _onReactMount = propBridgeRef => {
      this.propBridgeRef = propBridgeRef;
      this.setProps(this.props);
    };

    _onMutation = mutationsList => {
      const newProps = mutationsList.reduce((props, mutation) => {
        if (mutation.type === "attributes") {
          const propKey = mutation.attributeName;
          props[propKey] = this.getAttribute(propKey);
        }
        return props;
      }, {});
      this.setProps(newProps);
    };
    /*
        No need to observe child elements here.
        Child elements are HTMLCollection which are live by default. 
        That means when child elements change the HTMLCollection will change automatically.
        The reference to HTMLCollection doesnt change, only the items inside it will change.
        Hence we should just pass through the children (HTMLCollection) as is on first render to react and forget about it.
    */

    connectedCallback() {
      this.observer.observe(this, { attributes: true });
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
  };
};

export const registerAsWebComponent = (component, customElementName) => {
  const ReactCustomElement = getCustomElementFromReactComponent(component);
  customElements.define(customElementName, ReactCustomElement);
};
