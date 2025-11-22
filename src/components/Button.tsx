import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type ButtonType = {
    href?: never;
    children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

type AnchorType = {
    href?: string;
    children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

function isAnchor(props: ButtonType | AnchorType): props is AnchorType {
    return "href" in props;
}

const Button = (props: ButtonType | AnchorType) => {
    if (isAnchor(props)) {
        return <a href={props.href}>{props.children}</a>;
    }
    return <button>{props.children}</button>;
};

export default Button;
