import * as React from "react";
import EntryButton from "./EntryButton";

interface AppProps {}

interface AppState
{
    input: string;
}

class App extends React.Component<AppProps, AppState>
{
    constructor(props)
    {
        super(props);

        this.state = {
            input: ""
        };

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
        // Eventually, we will have to replace this array
        // with a better method of storing the buttons we will need to render
        
        let orderNumbers = ["^", "v", "<<", "clr", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", " ", "=", "+"];

        //let row1 = [7, 8, 9]
        //let row2 = [4, 5, 6]
        //let row3 = [1, 2, 3]
        //let row4 = [0]
        
        //let orderNumbers = [row1, row2, row3, row4]

        // Look up the `map` method on arrays.
        // Basically, for each nth item in the array, a function is called
        // that transforms the nth element of a new array. The new array
        // is then returned.
        // In this case, we're creating an array of EntryButtons
        let numbers = orderNumbers.map((num, i) =>
        {
            const callback = (event) =>
            {
                event.preventDefault();
                this.handleButtonPushed(num.toString())
            }
            
            return (
                <EntryButton key={i}
                callback={callback}>
                    {num.toString()}
                </EntryButton>
            );
        });

        return (
            <main id="calculator">
                <section id="input">
                    <input autoFocus type="text" value={this.state.input} onChange={this.handleTyping} />
                </section>
                <section id="buttons">
                    {numbers}
                </section>
            </main>
        );
    }
}

export default App;
