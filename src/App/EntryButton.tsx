import * as React from "react";

interface EntryButtonProps
{
    children?: string;
    callback?: any;
}

const EntryButton = (props: EntryButtonProps) =>
{
    const callback = typeof props.callback == "undefined"
        ? () => {} : props.callback;
    
    const str = props.children || "";

    return (
        <button onClick={callback}>{str}</button>
    );
}

export default EntryButton;
