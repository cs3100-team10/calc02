import * as ohm from "ohm-js";

const constants = new Map<string, number>([
    [ "pi", Math.PI ],
    [ String.fromCharCode(0x03C0), Math.PI ]
]);

const grammar = ohm.grammar(`

Math {
    Exp
      = AddExp

    AddExp
      = AddExp "+" MulExp  -- plus
      | AddExp "-" MulExp  -- minus
      | MulExp

    MulExp
      = MulExp "*" ExpExp  -- times
      | MulExp "%" ExpExp  -- mod
      | MulExp "/" ExpExp  -- divide
      | ExpExp
    
    ExpExp
      = PriExp "^" ExpExp  -- power
      | PriExp

    PriExp
      = "(" Exp ")"  -- paren
      | "+" PriExp   -- pos
      | "-" PriExp   -- neg
      | ident
      | number
    
    number  (a number)
      = digit* "." digit+  -- fract
      | digit+             -- whole
    
    ident (an identifier)
      = letter alnum*
    
}

`);

const semantics = grammar.createSemantics();

semantics.addOperation("evaluate", {

    Exp(exp)
    {
        return exp.evaluate();
    },

    AddExp(exp)
    {
        return exp.evaluate();
    },

    AddExp_plus(lhs, _, rhs)
    {
        return lhs.evaluate() + rhs.evaluate();
    },

    AddExp_minus(lhs, _, rhs)
    {
        return lhs.evaluate() - rhs.evaluate();
    },

    MulExp(exp)
    {
        return exp.evaluate();
    },

    MulExp_times(lhs, _, rhs)
    {
        return lhs.evaluate() * rhs.evaluate();
    },

    MulExp_divide(lhs, _, rhs)
    {
        if (rhs.evaluate() == 0)
            throw new Error("Division by zero");
        
        return lhs.evaluate() / rhs.evaluate();    
    },

    MulExp_mod(lhs, _, rhs)
    {
        if (rhs.evaluate() == 0)
            throw new Error("Division by zero");
        
        return lhs.evaluate() % rhs.evaluate();
    },

    ExpExp(exp)
    {
        return exp.evaluate();
    },

    ExpExp_power(lhs, _, rhs)
    {
        return Math.pow(lhs.evaluate(), rhs.evaluate());
    },

    PriExp(exp)
    {
        return exp.evaluate();
    },

    PriExp_paren(_lhs, exp, _rhs)
    {
        return exp.evaluate();
    },

    PriExp_pos(_, exp)
    {
        return exp.evaluate();
    },

    PriExp_neg(_, exp)
    {
        return -1 * exp.evaluate();
    },

    number(_)
    {
        return parseFloat(this.sourceString);
    },

    ident(_l, _r)
    {
        return constants.get(this.sourceString.toLowerCase()) || 0;
    }
});

/**
 * Lexes a string according to the math grammar.
 * If the string follows the grammar, returns true; otherwise, returns false.
 * 
 * @param input The input string
 */
export function lex(input: string): boolean
{
    return grammar.match(input).succeeded();
}

/**
 * Parses a math expression and returns the result.
 * 
 * @throws {Error} if the lex fails -- make sure to lex first
 * @throws {Error} if the expression attempts to divide by 0
 * @param input The input string
 * @param options Other options (still in development)
 */
export function parse(input: string, options?: any): number
{
    let match = grammar.match(input);

    if (match.failed())
        throw new Error("Lex failed");

    return semantics(match).evaluate();
}
