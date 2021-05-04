import React from 'react';
export declare const renderReact2Node: (RComponent: React.ElementType, initialProps: {}, targetDomNode: Element | DocumentFragment, onRender: (ref: React.RefObject<any>) => void) => void;
export declare const sendPropsToReact: (propBridgeRef: React.RefObject<any>, props: any) => void;
export declare const getPropsFromNode: (node: HTMLElement) => {
    [key: string]: string | JSX.Element;
};
