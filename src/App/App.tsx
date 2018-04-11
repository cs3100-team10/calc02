import * as React from "react";
import EntryButton from "./EntryButton";

interface AppProps {}

interface AppState
{
    input: string;
}

class App extends React.Component<AppProps, AppState>
{

    private userInput;

    constructor(props)
    {
        super(props);

        this.state = {
            input: ""
        };

        this.userInput = React.createRef();

        // this avoids some weird JavaScript stuff with `this`
        this.handleButtonPushed = this.handleButtonPushed.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
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

    render()
    {
        const CharacterButton = (props) =>
        {

            const callback = (event) =>
            {
                event.preventDefault();
                this.userInput.current.focus();
                this.handleButtonPushed(props.children);
            }

            return <EntryButton callback={callback}>{props.children}</EntryButton>
        }

        return (
            <main id="calculator">
                <section id="input">
                    <input autoFocus type="text" value={this.state.input} onChange={this.handleTyping} ref={this.userInput} />
                </section>
                <section id="buttons">
                    <EntryButton>&nbsp;</EntryButton>
                    <EntryButton>&nbsp;</EntryButton>
                    <EntryButton>&larr;</EntryButton>
                    <EntryButton>clear</EntryButton>
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
                    <EntryButton>&nbsp;</EntryButton>
                    <CharacterButton>+</CharacterButton>
                </section>
            </main>
        );
    }
}

export default App;
