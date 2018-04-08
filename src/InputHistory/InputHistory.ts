
/**
 * A data structure representing user input history.
 * 
 */
class InputHistory
{

    constructor()
    {
        
    }

    /**
     * Returns the current item.
     * If there is no item to return (i.e., history is empty),
     * returns the empty string.
     * 
     */
    current(): string
    {
        return ""; // this is a stub, rewrite
    }

    /**
     * Appends an item to history and resets the current item
     * to front of history (an empty string).
     * 
     * @param item History item to append
     */
    push(item: string): void
    {
        
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
        
    }
}

export default InputHistory;
