import * as React from "react";
import EntryButton from "./EntryButton";

import { lex, parse } from "../Parser/parser";

interface AppProps {}

interface AppState
{
    input: string;
    output: string;
    prevInput: string;
    lex: boolean;
}

class App extends React.Component<AppProps, AppState>
{

    private userInput;

    constructor(props)
    {
        super(props);

        this.state = {
            input: "",
            output: "= 0",
            prevInput: "",
            lex: false
        };

        this.userInput = React.createRef();

        // this avoids some weird JavaScript stuff with `this`
        this.handleButtonPushed = this.handleButtonPushed.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleBackspace = this.handleBackspace.bind(this);
    }

    handleButtonPushed(input: string)
    {
        this.setState((prevState) =>
        {
            return {
                ...prevState,
                input: prevState.input + input
            };
        });

        this.userInput.current.focus();
    }

    handleTyping()
    {
        this.setState((prevState) =>
        {
            return {
                ...prevState,
                input: this.userInput.current.value,
                lex: lex(this.userInput.current.value)
            };
        });
    }

    handleClear()
    {
        this.setState((prevState) =>
        {
            return {
                input: "",
                output: "= 0",
                prevInput: ""
            }
        });

        this.userInput.current.focus();
    }

    handleBackspace()
    {
        this.setState((prevState) =>
        {
            let newInput = "";

            if (prevState.input.length > 0)
            {
                newInput = prevState.input.slice(0, prevState.input.length - 1);
            }

            return {
                ...prevState,
                input: newInput
            };
        });

        this.userInput.current.focus();
    }

    handleSubmit(event)
    {
        let result;

        try
        {
            result = parse(this.state.input);
        }

        catch (err)
        {
            console.error(err.message);
            event.preventDefault();
            return;
        }

        this.setState((prevState) =>
        {
            return {
                ...prevState,

                input: "",
                output: `= ${result.toString()}`,
                prevInput: prevState.input,
                lex: false
            };
        });

        event.preventDefault();
        this.userInput.current.focus();
    }

    render()
    {
        const CharacterButton = (props: {children: string}) =>
        {

            const callback = (event) =>
            {
                event.preventDefault();
                this.handleButtonPushed(props.children);
            }

            return <EntryButton callback={callback}>{props.children}</EntryButton>;
        }

        const inputAttrs = {
            autoFocus: true,
            type: "text",
            value: this.state.input,
            placeholder: this.state.prevInput,
            onChange: this.handleTyping,
            ref: this.userInput
        };

        const lexStatusClasses = [
            "lex-status",
            this.state.lex ? "pass" : "fail"
        ].join(" ");

        return (
            <form id="calculator" onSubmit={this.handleSubmit}>
                <section id="input">
                    <input {...inputAttrs} />
                    <div className={lexStatusClasses}></div>
                </section>
                <section id="output">
                    {this.state.output}
                </section>
                <section id="buttons">
                    <EntryButton>&#x025B3;</EntryButton>
                    <EntryButton>&#x025BD;</EntryButton>
                    <EntryButton callback={this.handleBackspace}>&larr;</EntryButton>
                    <EntryButton callback={this.handleClear}>clr</EntryButton>
                    <CharacterButton>7</CharacterButton>
                    <CharacterButton>8</CharacterButton>
                    <CharacterButton>9</CharacterButton>
                    <CharacterButton>/</CharacterButton>
                    <CharacterButton>4</CharacterButton>
                    <CharacterButton>5</CharacterButton>
                    <CharacterButton>6</CharacterButton>
                    <CharacterButton>*</CharacterButton>
                    <CharacterButton>1</CharacterButton>
                    <CharacterButton>2</CharacterButton>
                    <CharacterButton>3</CharacterButton>
                    <CharacterButton>-</CharacterButton>
                    <CharacterButton>0</CharacterButton>
                    <EntryButton>&nbsp;</EntryButton>
                    <EntryButton callback={this.handleSubmit} submit>=</EntryButton>
                    <CharacterButton>+</CharacterButton>
                </section>
            </form>
        );
    }
}

export default App;
