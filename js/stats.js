export {initState}

let initState = function(what, solutionId) { 

    let gordetakoa = localStorage.getItem(what);
    let state;

    if (gordetakoa) {
        state = JSON.parse(gordetakoa);
    } else {
        state = {
            solutionId: solutionId,
            guesses: []   
        };
        localStorage.setItem(what, JSON.stringify(state));
    }

    const addGuess = (guess) => {
        state.guesses.push(guess);              
        localStorage.setItem(what, JSON.stringify(state));  
    };

    return [state, addGuess];
}



