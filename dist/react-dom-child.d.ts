import React from 'react';
import 'child-replace-with-polyfill';
declare type PropsWithChildren<P = unknown> = P & {
    children?: Node[] | undefined;
};
export declare class ReactDomChild extends React.Component<PropsWithChildren> {
    ref: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    render(): React.JSX.Element;
}
export {};
