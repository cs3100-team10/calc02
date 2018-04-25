import * as React from "react";
import EntryButton from "./EntryButton";

import { lex, parse } from "../Parser/parser";
import InputHistory from "../InputHistory/InputHistory";

enum CalcTheme
{
    Day = "day",
    Night = "night",
}

enum CalcTextSize
{
    Regular = "regular",
    Large = "large",
}

interface AppProps {}

interface AppState
{
    input: string;
    output: string;
    prevInput: string;
    lex: boolean;
    showMenu: boolean;
    closeMenu: boolean;
    theme: CalcTheme;
    textSize: CalcTextSize;
    power: boolean;
}

class App extends React.Component<AppProps, AppState>
{
    dropdownMenu: any;
    private userInput;
    //memory
    memory : InputHistory;
    
    constructor(props)
    {
        super(props);

        //memory
        this.memory = new InputHistory;

        this.state = {
            input: "",
            output: "= 0",
            prevInput: "",
            lex: false,
            showMenu: false,
            closeMenu: false,
            theme: CalcTheme.Night,
            textSize: CalcTextSize.Regular,
            power: true
        };

        this.userInput = React.createRef();

        // this avoids some weird JavaScript stuff with `this`
        this.handleButtonPushed = this.handleButtonPushed.bind(this);
        this.handleAns = this.handleAns.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleBackspace = this.handleBackspace.bind(this);
        this.handleMemoryUp = this.handleMemoryUp.bind(this);
        this.handleMemoryBack = this.handleMemoryBack.bind(this);
        this.handleOp = this.handleOp.bind(this);
        this.handleShowMenu = this.handleShowMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }

    handleShowMenu(event) {
        //event.preventDevault();

        this.setState({ showMenu: true }, () => {
                document.addEventListener('click', this.handleCloseMenu);
        });
    }

    handleCloseMenu() {
        if(!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.handleCloseMenu);
            });
        }
    }

    handleButtonPushed(input: string)
    {
        this.memory.begin();
        
        this.setState((prevState) =>
        {
            return {
                ...prevState,
                input: prevState.input + input,
                lex: lex(prevState.input + input)
            };
        });
    }
   
    handleOp(input: string)
    {
        this.memory.begin();

        this.setState((prevState) =>
        {
            if(this.state.input == '')
            {
                if(this.state.prevInput == '' && input != '-')
                {
                    return {
                        ...prevState,
                        input: '0' + input,
                        lex: lex('0' + input)
                    };
                }
                else if(this.state.prevInput == '' && input == '-')
                {
                    return {
                        ...prevState,
                        input: prevState.input + input,
                        lex: lex(prevState.input + input)
                    };
                }
                else
                {
                    return {
                        ...prevState,
                        input: this.state.prevInput + input,
                        lex: lex(this.state.prevInput + input)
                    };
                }
                
            }
            else
            {
                return {
                    ...prevState,
                    input: prevState.input + input,
                    lex: lex(prevState.input + input)
                };
            }
        });
        
    }

    handleAns()
    {
        this.memory.begin();

        this.setState((prevState) =>
        {
            return {
                ...prevState,
                input: prevState.input + this.state.prevInput,
                lex: lex(prevState.input + this.state.prevInput)
            };
        });
    }

    handleTyping()
    {
        this.memory.begin();

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
    }

    handleMemoryUp()
    {
        this.setState((prevState) =>
        {
      
            this.memory.back();
            let newInput = this.memory.current();

            return {
                input: newInput,
                output: "=0",
                prevInput: ""
            };
        });
    }

    handleMemoryBack()
    {
        this.setState((prevState) =>
        {
      
            this.memory.forward();
            let newInput = this.memory.current();

            return {
                input: newInput,
                output: "=0",
                prevInput: ""
            };
        });
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
        
            this.memory.push(`${result.toString()}`);

            return {
                ...prevState,

                input: "",
                output: `= ${result.toString()}`,
                prevInput: result.toString(),
                lex: false
            };
        
        });
      
        event.preventDefault();
    }

    render()
    {
        const CharacterButton = (props: {children: string, className?: string}) =>
        {

            const callback = (event) =>
            {
                event.preventDefault();
                this.handleButtonPushed(props.children);
            }

            return <EntryButton callback={callback} className={props.className}>{props.children}</EntryButton>;
        }

        const OpButton = (props: {children: string, className?: string}) =>
        {

            const callback = (event) =>
            {
                event.preventDefault();
                this.handleOp(props.children);
            }

            return <EntryButton callback={callback} className={props.className}>{props.children}</EntryButton>;
        }

        const inputAttrs = {
            autoFocus: true,
            type: "text",
            value: this.state.input,
            placeholder: this.state.prevInput,
            onChange: this.handleTyping,
            ref: this.userInput,
            className: this.state.lex ? "pass" : "fail"
        };

        const lexStatusClasses = [
            "lex-status",
            this.state.lex ? "pass" : "fail"
        ].join(" ");

        const themeClasses = [
            // this lets us target the power-off class from CSS
            // as if it were a theme
            this.state.power ? this.state.theme : "power-off",
            this.state.textSize
        ].join(" ");

        return (
            <div id="theme" className={themeClasses}><div id="root">
            <form id="calculator" onSubmit={this.handleSubmit}>
                <section id="input">
                    <input {...inputAttrs} />
                </section>
                <section id="output">
                    {this.state.output}
                </section>
                
                <div>
                    <button onClick={this.handleShowMenu}>Menu</button>
                </div>

                { 
                    this.state.showMenu
                        ? (
                            <div className="menu" ref={(element) => {this.dropdownMenu = element;}}>
                                <button> Theme </button>
                                <button> Font </button>
                                <button> Troll </button>
                            </div>
                        ) 
                        : (
                            null
                        ) 
                    }

                <section id="buttons">
                    <div className="memory">
                        <EntryButton className="action" callback={this.handleMemoryUp}>&#x025B3;</EntryButton>
                        <EntryButton className="action" callback={this.handleMemoryBack}>&#x025BD;</EntryButton>
                    </div>
                    <EntryButton className="action" callback={this.handleBackspace}>&larr;</EntryButton>
                    <EntryButton className="action" callback={this.handleClear}>C</EntryButton>
                    <EntryButton className="action" callback={this.handleAns}>Ans</EntryButton>
                    <CharacterButton className="operation">&pi;</CharacterButton>
                    <OpButton className="operation">%</OpButton>
                    <OpButton className="operation">^</OpButton>
                    <div className="parens">
                        <CharacterButton className="operation">(</CharacterButton>
                        <CharacterButton className="operation">)</CharacterButton>
                    </div>
                    <CharacterButton className="number">7</CharacterButton>
                    <CharacterButton className="number">8</CharacterButton>
                    <CharacterButton className="number">9</CharacterButton>
                    <OpButton className="operation">/</OpButton>
                    <CharacterButton className="number">4</CharacterButton>
                    <CharacterButton className="number">5</CharacterButton>
                    <CharacterButton className="number">6</CharacterButton>
                    <OpButton className="operation">*</OpButton>
                    <CharacterButton className="number">1</CharacterButton>
                    <CharacterButton className="number">2</CharacterButton>
                    <CharacterButton className="number">3</CharacterButton>
                    <OpButton className="operation">-</OpButton>
                    <CharacterButton className="number">0</CharacterButton>
                    <CharacterButton className="number">.</CharacterButton>
                    <EntryButton className="operation" callback={this.handleSubmit} submit>=</EntryButton>
                    <OpButton className="operation">+</OpButton>
                    
                </section>
            </form>
            </div></div>
        );
    }
}

export default App;
