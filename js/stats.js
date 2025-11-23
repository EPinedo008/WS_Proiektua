
let initState = function(what, solutionId) { 

    let gordetakoa = localStorage.getItem(what);
    let state;

    if (gordetakoa) {
        state = JSON.parse(gordetakoa);

        
        if (state.solutionId !== solutionId) {
            state = {
                solutionId: solutionId,
                guesses: []
            };
            localStorage.setItem(what, JSON.stringify(state));
        }

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

function successRate (e){
    return e.successRate
}

let getStats = function(what) {
    let gordetakoa = localStorage.getItem(what);
    let e;
    
    if (gordetakoa) {
        e = JSON.parse(gordetakoa);
    } else {
        e ={winDistribution: [0,0,0,0,0,0,0,0,0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            gamesSucceded: 0,
            successRate: 0,
            tries: 0
            }
        localStorage.setItem(what, JSON.stringify(e));
    }
    return e
};

function successRateCalc(irabazi,jokatu){
    return Math.round((irabazi/jokatu)*100)
}

let gamestats = getStats('gameStats');

function updateStats(t){
    gamestats.totalGames +=1
    gamestats.tries = t
    if(t<8){
        
        gamestats.winDistribution[t] +=1
        gamestats.currentStreak += 1
        if(gamestats.currentStreak>gamestats.bestStreak)
            gamestats.bestStreak = gamestats.currentStreak;
        gamestats.gamesSucceded +=1
    }else{
        gamestats.winDistribution[8] +=1
        gamestats.currentStreak = 0
        gamestats.gamesFailed +=1
        
    }
    gamestats.successRate= successRateCalc(gamestats.gamesSucceded,gamestats.totalGames)

    localStorage.setItem('gameStats', JSON.stringify(gamestats));
};






module.exports = {
    initState,
    updateStats,
    successRate,
    getStats
};