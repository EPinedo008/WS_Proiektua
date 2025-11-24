const { initState, updateStats } = require("./stats.js");
const { stringToHTML, higher, lower, stats, toggle, headless } = require("./fragments.js");

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate'];

let setupRows = function (game) {

    
    let [state, updateState] = initState('WAYgameState', game.solution.id);

   
    const displayed = new Set();

    function leagueToFlag(leagueId) {
        let ligak = {
            564: "es1",
            8: "en1",
            82: "de1",
            384: "it1",
            301: "fr1"
        };
        return ligak[leagueId];
    }

    
    function getAge(dateString) {
        if (!dateString) return '';
        const today = new Date();
        const parts = dateString.split('-').map(Number); 
        const year = parts[0];
        const month = parts[1]; // 1-12
        const day = parts[2];

        let age = today.getFullYear() - year;
        
        if ((today.getMonth() + 1) < month || ((today.getMonth() + 1) === month && today.getDate() < day)) {
            age -= 1;
        }
        return age;
    }

    let check = function (theKey, theValue) {

        if (theKey == 'birthdate') {
            let solAge = getAge(game.solution[theKey]);
            let bereAge = getAge(theValue);
            if (solAge > bereAge) {
                return higher;
            } else if (solAge < bereAge) {
                return lower;
            }
            return 'correct';
        }
        if (game.solution[theKey] != theValue) return 'incorrect';

        return 'correct';
    }

    function unblur(outcome) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mistery = document.getElementById("mistery");
                if (mistery) mistery.classList.remove("hue-rotate-180", "blur");
                const combobox = document.getElementById("combobox");
                if (combobox) combobox.remove();
                let color, text;
                if (outcome == 'success') {
                    color = "bg-blue-500";
                    text = "Awesome";
                } else {
                    color = "bg-rose-500";
                    text = "The player was " + game.solution.name;
                }
                const picbox = document.getElementById("picbox");
                if (picbox) {
                    picbox.innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`;
                }
                resolve();
            }, 2000);
        });
    }

    function showStats(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.body.appendChild(stringToHTML(headless(stats())));
                const showHide = document.getElementById("showHide");
                if (showHide) showHide.onclick = toggle;
                bindClose();
                resolve();
            }, timeout);
        });
    }

    function bindClose() {
        const closedialog = document.getElementById("closedialog");
        if (closedialog) {
            closedialog.onclick = function () {
                document.body.removeChild(document.body.lastChild);
                const mistery = document.getElementById("mistery");
                if (mistery) mistery.classList.remove("hue-rotate-180", "blur");
            }
        }
    }

    function setContent(guess) {
        let gezi_balio = check("birthdate", guess.birthdate);
        if (gezi_balio == 'correct') gezi_balio = '';
        return [
            `<img src="https://playfootball.games/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate) + (gezi_balio ? gezi_balio : '')}`,
        ];
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms");
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`;
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}</div>`;

        let playersNode = document.getElementById('players');
        if (playersNode) playersNode.prepend(stringToHTML(child));
    }

    function resetInput() {
        const myInput = document.getElementById('myInput');
        if (!myInput) return;
        myInput.value = "";
        
        myInput.placeholder = `Guess ${state.guesses.length +1} of 8`;
    }

    let getPlayer = function (playerId) {
        return game.players.find(j => j.id == playerId);
    }

    
    function gameEnded(lastGuess) {
        if (lastGuess == game.solution.id) return true;
        if (state.guesses.length >= 8) return true;
        return false;
    }

    function success() {
        unblur('success');
    }
    function gameOver() {
        unblur('gameOver');
    }

    
    if (state.solutionId === game.solution.id && state.guesses.length > 0) {
    
    const playersNode = document.getElementById('players');
    if (playersNode) playersNode.innerHTML = "";
   
    state.guesses.forEach(gid => {
        let guess = getPlayer(gid);
        if (!guess) return;
        let content = setContent(guess);
        showContent(content, guess);
        displayed.add(gid);
       
    });
    resetInput();
    emaitza(state.guesses[state.guesses.length - 1]);

}
function emaitza(playerId) {
    if (gameEnded(playerId)) {
                updateStats(state.guesses.length);

                if (playerId == game.solution.id) {
                    success();
                } else if (state.guesses.length >= 8) {
                    gameOver();
                }

                let newFootballerNoiz = calcNewFootballer();

                showStats(3000).then(() => {
                    let interval = setInterval(() => {
                        newFootballerNoiz--;
                        const nextPlayerEl = document.getElementById("nextPlayer");
                        if (nextPlayerEl) nextPlayerEl.textContent = formatTime(newFootballerNoiz);
                        if (newFootballerNoiz <= 0) clearInterval(interval);
                    }, 1000);
                });
            }
    }
    return /* addRow */ function (playerId) {

        
        if (!playerId) return;

        
        if (displayed.has(playerId)) {
            
            return;
        }

        if (state.guesses.includes(playerId)) {
            return; 
        }

        let guess = getPlayer(playerId);
        if (!guess) return; 

        
        updateState(playerId);

        
        displayed.add(playerId);
        let content = setContent(guess);
        showContent(content, guess);

        resetInput();

        
        emaitza(playerId);

    } 

    function calcNewFootballer() {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        return Math.floor((tomorrow - today) / 1000);
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}`;
    }

    function pad(a, b) {
        
        return String(a).padStart(b, '0');
    }

}

module.exports = {
    setupRows
};
