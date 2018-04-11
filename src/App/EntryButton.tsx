import * as React from "react";

interface EntryButtonProps
{
    children?: string;
    callback?: any;
    submit?: boolean;
}

const EntryButton = (props: EntryButtonProps) =>
{
    const callback = typeof props.callback == "undefined"
        ? () => {} : props.callback;
    
    const str = props.children || "";

    const submit = props.submit || false;

    const attrs = {
        onClick: callback,
        type: submit ? "submit" : undefined
    };

    return (
        <button {...attrs}>{str}</button>
    );
}

export default EntryButton;
