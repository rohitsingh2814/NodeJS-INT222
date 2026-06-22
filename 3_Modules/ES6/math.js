const add=(a,b)=>a+b;
const sub=(a,b)=>a-b;
const divide=(a,b)=>a/b;


export const multiply=(a,b)=>a*b; //direct export

export {add,sub};
export default divide; // In one file only one default export


//Named Export allows multiple exports from a file and must be imported using the exact exported names inside curly braces {}. 
// Default Export allows only one export per file and can be imported with any name without using curly braces.
