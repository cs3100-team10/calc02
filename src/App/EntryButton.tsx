import * as React from "react";

interface EntryButtonProps
{
    children: string;
    callback: any;
}

const EntryButton = (props: EntryButtonProps) =>
{
    return (
        <button onClick={props.callback}>{props.children}</button>
    );
}

export default EntryButton;
