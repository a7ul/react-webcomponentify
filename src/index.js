import {
  renderReact2Node,
  getPropsFromNode,
  sendPropsToReact
} from "./prop-bridge";

const getCustomElementFromReactComponent = (RComponent, mode) => {
  return class ReactAsCustomElement extends HTMLElement {
    targetNode = null;
    propBridgeRef = null;
    props = {};
    observer = null;

    constructor() {
      super();
      this.props = getPropsFromNode(this);
      this.observer = new MutationObserver(this._onMutation);

      switch (mode) {
        case 'open':
          this.targetNode = this.attachShadow({ mode: 'open' });
          break;
        case 'element':
          this.targetNode = this;
          break;
        default:
          this.targetNode = this.attachShadow({ mode: 'closed' });
          break;
      }

      renderReact2Node(RComponent, this.props, this.targetNode, this._onReactMount);
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

/* mode options:
  - no option (default) - closed shadow DOM
  - "open" - open shadow DOM
  - "element" - no shadow DOM
*/
export const registerAsWebComponent = (component, customElementName, mode) => {
  const ReactCustomElement = getCustomElementFromReactComponent(
    component,
    mode
  );
  customElements.define(customElementName, ReactCustomElement);
};
