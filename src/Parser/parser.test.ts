import { lex } from "./parser";

describe("the lexer", () =>
{
    let randInt;
    let randFloat;

    beforeEach(() =>
    {
        randFloat = Math.random() * 100;
        randInt = Math.ceil(randFloat);
    });

    it("lexes just an integer", () =>
    {
        expect(lex(randInt.toString())).toEqual(true);
    });

    it("lexes just a float", () =>
    {
        expect(lex(randFloat.toString())).toEqual(true);
    });

    it("does not lex letters", () =>
    {
       expect(lex("abc")).toEqual(false); 
    });

    it("lexes a number with a sign before it", () =>
    {
        expect(lex(`+ ${randInt.toString()}`)).toEqual(true);
        expect(lex(`- ${randFloat.toString()}`)).toEqual(true);
    });

    it("does not lex binary operations if they only have a left operand", () =>
    {
        expect(lex(`${randInt.toString()} +`)).toEqual(false);
        expect(lex(`${randFloat.toString()} -`)).toEqual(false);
        expect(lex(`${randInt.toString()} *`)).toEqual(false);
        expect(lex(`${randFloat.toString()} /`)).toEqual(false);
    });

    it("lexes binary addition correctly", () =>
    {
        expect(lex(`${randInt.toString()} + ${randFloat.toString()}`)).toEqual(true);
    });

    it("lexes binary subtraction correctly", () =>
    {
        expect(lex(`${randInt.toString()} + ${randFloat.toString()}`)).toEqual(true);
    });

    it("lexes binary multiplication correctly", () =>
    {
        expect(lex(`${randInt.toString()} + ${randFloat.toString()}`)).toEqual(true);
    });

    it("lexes binary division correctly", () =>
    {
        expect(lex(`${randInt.toString()} + ${randFloat.toString()}`)).toEqual(true);
    });

    it("lexes expressions with parentheses", () =>
    {
        expect(lex(`( ${randInt.toString()} )`)).toEqual(true);
    });

    it("does not lex expressions with a missing parenthese", () =>
    {
        expect(lex(`( ${randInt.toString()}`)).toEqual(false);
        expect(lex(`${randFloat.toString()} )`)).toEqual(false);
    });



});
