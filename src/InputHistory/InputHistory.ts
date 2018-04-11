
/**
 * A data structure representing user input history.
 * 
 */
class InputHistory
{
    memStorage: Array<string>;
    pos: number;
    size: number;
    constructor()
    {
        //array representing the memory
        this.memStorage = [""];
        this.pos = 0;
        this.size = 1;
    }

    /**
     * Returns the current item.
     * If there is no item to return (i.e., history is empty),
     * returns the empty string.
     * 
     */
    current(): string
    {
        if (this.size == 0) {
            return ""; // this is a stub, rewrite
        } else {
            return this.memStorage[this.pos];
        }
    }

    /**
     * Appends an item to history and resets the current item
     * to front of history (an empty string).
     * 
     * @param item History item to append
     */
    push(item: string): void
    {
        this.memStorage[0] = item;
        this.memStorage.unshift("");
        this.size++;
    }

    /**
     * Scrolls back one value in memory.
     * If already at the back, does nothing.
     * 
     * This method does not have any side effects. If the user wishes to return
     * the new current value, they should call the current() method.
     */
    back(): void
    {
        if (this.pos < this.size-1) {
            this.pos++;  
        }
    }

    /**
     * Scrolls forward one value in memory.
     * If already at the front, does nothing.
     * 
     * This method does not have any side effects. If the user wishes to return
     * the new current value, they should call the current() method.
     */
    forward(): void
    {
        if (this.pos > 0) {
            this.pos--;  
        }
    }
}

export default InputHistory;
