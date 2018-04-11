import * as ohm from "ohm-js";

const grammar = ohm.grammar(`

Math {
    Exp
      = AddExp

    AddExp
      = AddExp "+" MulExp  -- plus
      | AddExp "-" MulExp  -- minus
      | MulExp

    MulExp
      = MulExp "*" PriExp  -- times
      | MulExp "/" PriExp  -- divide
      | PriExp

    PriExp
      = "(" Exp ")"  -- paren
      | "+" PriExp   -- pos
      | "-" PriExp   -- neg
      | number
    
    number  (a number)
      = digit* "." digit+  -- fract
      | digit+             -- whole
    
}

`);

let semantics = grammar.createSemantics();

export function lex(input: string): boolean
{
    return grammar.match(input).succeeded();
}
