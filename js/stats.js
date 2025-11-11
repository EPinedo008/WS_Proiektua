export {initState}

let initState = function(what, solutionId) { 

    let exists=true;
    let guesses=[];
    if(what.getPlayer(solutionId)==null){
        exists=false;
    }
    guesses= function(guess){
        guess.push(what.getPlayer(solutionId))
        return guess
    }

    return [exists, guesses];
}



