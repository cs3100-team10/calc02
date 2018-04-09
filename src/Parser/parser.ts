import * as ohm from "ohm-js";

const grammar = ohm.grammar(`

Math {

    Expression (an expression)
        = Expression "+" Term
        | Expression "-" Term
        | Term

    Term (a term)
        = Term "*" Factor
        | Term "/" Factor
        | Factor
    
    Factor
        = "(" Expression ")"
        | "+" Factor
        | "-" Factor
        | number
 
    number (an integer or floating point number)
        = digit* "." digit+     -- fract
        | digit+                -- whole
        }

`);

let semantics = grammar.createSemantics();

export function lex(input: string): boolean
{
    return grammar.match(input).succeeded();
}
