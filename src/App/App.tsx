import * as React from "react";
import EntryButton from "./EntryButton";

import { lex, parse } from "../Parser/parser";

interface AppProps {}

interface AppState
{
    input: string;
    output: string;
    prevInput: string;
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
            prevInput: ""
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
        this.setState({
            ...this.state, // this notation 
            input: this.state.input + input
        });
    }

    handleTyping(event)
    {
        this.setState({
            ...this.state,

            // `event.target` refers to the HTML element that
            // is the source of the event. We can access its attributes
            // using dot syntax. 
            input: event.target.value 
        });
    }

    handleClear(event)
    {
        this.setState({
            ...this.state,

            input: "",
            output: "= 0",
            prevInput: ""
        });

        this.userInput.current.focus();
    }

    handleBackspace(event)
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
            return;
        }

        this.setState({
            ...this.state,

            input: "",
            output: `= ${result.toString()}`,

            prevInput: this.state.input
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
                this.userInput.current.focus();
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

        return (
            <form id="calculator" onSubmit={this.handleSubmit}>
                <section id="input">
                    <input {...inputAttrs} />
                    <div className="output">{this.state.output}</div>
                </section>
                <section id="buttons">
                    <EntryButton>&nbsp;</EntryButton>
                    <EntryButton>&nbsp;</EntryButton>
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
