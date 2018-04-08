import InputHistory from "./InputHistory";

describe("while empty", () =>
{
    let hist: InputHistory;

    beforeEach(() =>
    {
        hist = new InputHistory();
    });

    it("returns an empty string by default", () =>
    {
        expect(hist.current()).toEqual("");
    });

    it("returns an empty string after attempting to scroll back", () =>
    {
        hist.back();
        expect(hist.current()).toEqual("");
    });

    it("returns an empty string after attempting to scroll forward", () =>
    {
        hist.forward();
        expect(hist.current()).toEqual("");
    });

});

describe("while it has 1 item", () =>
{
    let hist: InputHistory;

    beforeEach(() =>
    {
        hist = new InputHistory();
        hist.push("first");
    });

    it("returns an empty string by default", () => 
    {
        expect(hist.current()).toEqual("");
    });

    it("returns the item after being scrolled back", () =>
    {
        hist.back();
        expect(hist.current()).toEqual("first");
    });

    it("returns the item after being scrolled back twice", () =>
    {
        hist.back();
        hist.back();
        expect(hist.current()).toEqual("first");
    });

    it("returns an empty string after being scrolled back and forward", () =>
    {
        hist.back();
        hist.forward();
        expect(hist.current()).toEqual("");
    });

});
