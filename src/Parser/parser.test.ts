import { lex, parse } from "./parser";

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

    it("lexes binary modulus correctly", () =>
    {
        expect(lex(`${randInt.toString()} % ${randFloat.toString()}`)).toEqual(true);
    });

    it("lexes binary exponentiation correctly", () =>
    {
        expect(lex(`${randInt.toString()} ^ ${randFloat.toString()}`)).toEqual(true);
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

    it("lexes pi as a number", () =>
    {
        expect(lex(`pi`)).toEqual(true);
        expect(lex(String.fromCharCode(0x03C0))).toEqual(true); // unicode pi
    });

});

describe("the parser", () =>
{
    it("evaluates a number", () =>
    {
        expect(parse("10")).toEqual(10);
    });

    it("evaluates a signed number", () =>
    {
        expect(parse("-10")).toEqual(-10);
    });

    it("evaluates binary addition", () =>
    {
        expect(parse("2 + 2")).toEqual(4);
    });

    it("evaluates binary subtraction", () =>
    {
        expect(parse("7 - 5")).toEqual(2);
    });

    it("evaluates binary multiplication", () =>
    {
        expect(parse("10 * 10")).toEqual(100);
    });

    it("evaluates binary division", () =>
    {
        expect(parse("20 / 4")).toEqual(5);
    });

    it("evaluates binary modulus", () =>
    {
        expect(parse("10 % 3")).toEqual(1);
    });

    it("evaluates binary exponentiation", () =>
    {
        expect(parse("10 ^ 2")).toEqual(100);
    });

    it("evaluates expressions in parentheses", () =>
    {
        expect(parse("( 15 )")).toEqual(15)
    });

    it("evaluates parentheses before multiplication/division", () =>
    {
        expect(parse("( 4 - 3 ) * 10")).toEqual(10);
    });

    it("evaluates multiplication/division before addition/subtraction", () =>
    {
        expect(parse("4 - 5 * 10")).toEqual(-46);
    });

    it("evaluates pi correctly", () =>
    {
        expect(parse("pi")).toBeCloseTo(Math.PI);
    });

    it("throws an error if lexer does not pass", () =>
    {
        expect(() => parse("(")).toThrow();
    });

    it("throws an error on attempted division by zero", () =>
    {
        expect(() => parse("10 / 0")).toThrow();
    });
});
