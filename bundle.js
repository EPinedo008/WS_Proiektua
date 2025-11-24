(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { setupRows } = require("./rows.js");
const match = require('autosuggest-highlight/match');
const parse = require('autosuggest-highlight/parse');


function autocomplete(inp, game) {

    console.log("autocomplete")

    let addRow = setupRows(game);

    let players = game.players;

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) return false;
        currentFocus = -2;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        let valLower = val.toLowerCase();

        for (i = 0; i < players.length; i++) {
            let playerName = players[i].name.toLowerCase();

            // **Substring check, ez soilik hitzen hasierarekin**
            if (playerName.includes(valLower)) {
                b = document.createElement("DIV");
                b.classList.add('flex', 'items-start', 'gap-x-3', 'leading-tight', 'uppercase', 'text-sm');
                b.innerHTML = `<img src="https://cdn.sportmonks.com/images/soccer/teams/${players[i].teamId % 32}/${players[i].teamId}.png"  width="28" height="28">`;

                const ind = match(players[i].name, val); 
                const parts = parse(players[i].name, ind);

                let nameHTML = `<div class='self-center'>`;
                parts.forEach(part => {
                    if (part.highlight) {
                        nameHTML += `<span class='font-bold'>${part.text}</span>`;
                    } else {
                        nameHTML += `<span>${part.text}</span>`;
                    }
                });
                nameHTML += `
                    <input type='hidden' name='name' value='${players[i].name}'>
                    <input type='hidden' name='id' value='${players[i].id}'>
                </div>`;
                b.innerHTML += nameHTML;

                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    addRow(this.getElementsByTagName("input")[1].value);
                });

                a.appendChild(b);
            }
        }
    });


    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus += 2;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus -= 2;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    // players.find ( p => { return p.id == 47323 })

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active", "bg-slate-200", "pointer");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active", "bg-slate-200", "pointer");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


module.exports = {
  autocomplete
};

},{"./rows.js":5,"autosuggest-highlight/match":7,"autosuggest-highlight/parse":8}],2:[function(require,module,exports){
const folder = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-6" name="folder"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>`;
const leftArrow = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="h-4 w-4 absolute right-0 -bottom-0.5" name="leftArrowInCircle"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>`;

const { getStats } = require("./stats.js");


const higher = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20
20" fill="white" aria-hidden="true" width="25" style="margin-right: -8
px; margin-left: -3px;"><path fill-rule="evenodd" d="M5.293 7.707a1 1
0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1
1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"
></path></svg>`
const lower = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20
" fill="white" aria-hidden="true" width="25" style="margin-right: -8px
; margin-left: -3px;"><path fill-rule="evenodd" d="M14.707 12.293a1 1
0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586
V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd
"></path></svg>`
const stringToHTML = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body;
};


let toggle = function(){
        if (document.getElementById("showHide").nextSibling.firstChild.style.display == 'none') {
            document.getElementById("showHide").innerText = "Hide Guess Distribution"
            document.getElementById("showHide").nextSibling.firstChild.style.display = 'block'
        }else {
            document.getElementById("showHide").innerText = "Show Guess Distribution"
            document.getElementById("showHide").nextSibling.firstChild.style.display = 'none'
        }
}

let headless = function (inner) {
    return `<div id="headlessui-portal-root">
  <div>
    <div class="fixed z-10 inset-0 overflow-y-auto" id="headlessui-dialog-1" role="dialog" aria-modal="true" aria-labelledby="headlessui-dialog-title-6">
      <div class="flex items-center justify-center min-h-screen py-10 px-2 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" id="headlessui-dialog-overlay-5" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&ZeroWidthSpace;</span>
        ${inner}
      </div>
    </div>
  </div>
</div>`
}

const stats = function () {
    const {totalGames, bestStreak, currentStreak, successRate, gamesFailed, winDistribution,tries} = getStats("gameStats");

    let blocks = `<div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden sh
adow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 dark:bg-gray-800"><div class="absolute right-4 top-4" id="closedialog"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="h-6 w-6 cursor-pointer dark:stroke-white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><div class="text-center"><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="headlessui-dialog-title-7">Statistics</h3><div class="mt-2"><div class="flex justify-center my-2"><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${tries}</div><div class="text-xs">Total tries</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${successRate}%</div><div class="text-xs">Success rate</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${currentStreak}</div><div class="text-xs">Current streak</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${bestStreak}</div><div class="text-xs">Best streak</div></div></div>
<h4 class="cursor-pointer text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="showHide">Show Guess Distribution</h4><div class="columns-1 justify-left m-2 text-sm dark:text-white">`

    let sum = winDistribution.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });

    blocks += "<div id='guesscontainer' style='display:none'>"
    for(let i=1; i<=8; i++){
        blocks += `<div class="flex justify-left m-1">
                        <div class="items-center justify-center w-2">${i}</div>
                        <div class="rounded-full w-full ml-2">
                            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 rounded-l-full" style="width: ${Math.ceil(winDistribution[i] / sum * 100) }%;">
                                ${winDistribution[i]}
                            </div>
                        </div>
                    </div>`
        }
    blocks += "</div>"

    blocks += `<div class="mt-2 justify-center items-center space-x-2 dark:text-white">
                    <div>
                        <h5>New footballer:</h5>
                        <span class="text-lg font-medium text-gray-900 dark:text-gray-100" id="nextPlayer"></span>
                    </div>
                   <!-- <button type="button" class="rounded-md border border-transparent shadow-sm px-4 pt-1 pb-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" tabindex="0"><span class="block text-2xl tracking-wide font-bold leading-7">Share</span>
                   <span class="block text-xs tracking-tight font-light">#HashTag</span></button> -->
               </div>
               <div class="mt-3">
               </div>
               <div class="dark:text-white">
                   <div class="text-lg font-extrabold text-[#b837c6] dark:text-[#ceff27]" style="color: #ceff27">Web Sistemak</div>
                   <div class="text-sm">2025/2026 ikasturteko praktika</div>
               </div>               
               </div></div></div></div>`

    return blocks
}

module.exports = {
  folder,
  leftArrow,
  stringToHTML,
  higher,
  lower,
  toggle,
  headless,
  stats
};
},{"./stats.js":6}],3:[function(require,module,exports){


async function fetchJSON(what) {
    const response = await fetch("json/"+what+".json");
    console.log("JSON-a kargatzen")
    const data = await response.json();
    return data

}

module.exports = {
    fetchJSON
};

},{}],4:[function(require,module,exports){
const { autocomplete } = require("./autocomplete.js");
const { folder, leftArrow } = require("./fragments.js");
const { fetchJSON } = require("./loaders.js");
const { setupRows } = require("./rows.js")



function differenceInDays(date1) {
    const gaur = new Date();
    
    var diferentzia_milisegunduetan=gaur-date1
    const egun_baten_milisegunduak= 1000 * 60 * 60 * 24;
    var diferentzia_egunetan=Math.floor(diferentzia_milisegunduetan/egun_baten_milisegunduak) //beti beheruntz borobildu
    
    return diferentzia_egunetan
}

let difference_In_Days = differenceInDays(new Date("01-10-2025"));

window.onload = function () {
  document.getElementById("gamenumber").innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;

  
  const input = document.getElementById("myInput");
 
  
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
 
  console.log(solutionArray.length)
  let indizea=(difference_In_Days - 1) % solutionArray.length
  

  console.log("jokalariak:")
  console.log(players)

  let solutionid=solutionArray[indizea]
  console.log("solutionid:"+solutionid)

  let jokalaria=players.filter(j=>{
    if(j.id==solutionid)
      return j
  })

  console.log("tokatu_den_jokalaria:")
  console.log(jokalaria[0])
  return jokalaria[0]

}

Promise.all([fetchJSON("fullplayers25"), fetchJSON("solution25")]).then(
  (values) => {

    let solution;
    
    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);
    
    console.log(game.solution);

    document.getElementById("mistery").src = `https://playfootball.games/media/players/${game.solution.id % 32}/${game.solution.id}.png`;


 
    let addRow = setupRows(game);
      const input = document.getElementById("myInput");
      autocomplete(input,game)
      input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
         const id = input.value.trim();
         
         addRow(id)
         input.value = "";
        }
      });
        
  }
);

},{"./autocomplete.js":1,"./fragments.js":2,"./loaders.js":3,"./rows.js":5}],5:[function(require,module,exports){
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

},{"./fragments.js":2,"./stats.js":6}],6:[function(require,module,exports){

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
},{}],7:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AutosuggestHighlightMatch=t():e.AutosuggestHighlightMatch=t()}(this,(()=>{return e={772:(e,t,o)=>{const r=o(826).remove,i=/[.*+?^${}()|[\]\\]/g,n=/[a-z0-9_]/i,u=/\s+/;e.exports=function(e,t,o){var s,a;a={insideWords:!1,findAllOccurrences:!1,requireMatchAll:!1},s=(s=o)||{},Object.keys(s).forEach((e=>{a[e]=!!s[e]})),o=a;const c=Array.from(e).map((e=>r(e)));let l=c.join("");return(t=r(t)).trim().split(u).filter((e=>e.length>0)).reduce(((e,t)=>{const r=t.length,u=!o.insideWords&&n.test(t[0])?"\\b":"",s=new RegExp(u+t.replace(i,"\\$&"),"i");let a,A;if(a=s.exec(l),o.requireMatchAll&&null===a)return l="",[];for(;a;){A=a.index;const t=r-c.slice(A,A+r).join("").length,i=A-c.slice(0,A).join("").length,n=[A+i,A+r+i+t];if(n[0]!==n[1]&&e.push(n),l=l.slice(0,A)+new Array(r+1).join(" ")+l.slice(A+r),!o.findAllOccurrences)break;a=s.exec(l)}return e}),[]).sort(((e,t)=>e[0]-t[0]))}},826:e=>{var t={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",Ấ:"A",Ắ:"A",Ẳ:"A",Ẵ:"A",Ặ:"A",Æ:"AE",Ầ:"A",Ằ:"A",Ȃ:"A",Ç:"C",Ḉ:"C",È:"E",É:"E",Ê:"E",Ë:"E",Ế:"E",Ḗ:"E",Ề:"E",Ḕ:"E",Ḝ:"E",Ȇ:"E",Ì:"I",Í:"I",Î:"I",Ï:"I",Ḯ:"I",Ȋ:"I",Ð:"D",Ñ:"N",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",Ố:"O",Ṍ:"O",Ṓ:"O",Ȏ:"O",Ù:"U",Ú:"U",Û:"U",Ü:"U",Ý:"Y",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",ấ:"a",ắ:"a",ẳ:"a",ẵ:"a",ặ:"a",æ:"ae",ầ:"a",ằ:"a",ȃ:"a",ç:"c",ḉ:"c",è:"e",é:"e",ê:"e",ë:"e",ế:"e",ḗ:"e",ề:"e",ḕ:"e",ḝ:"e",ȇ:"e",ì:"i",í:"i",î:"i",ï:"i",ḯ:"i",ȋ:"i",ð:"d",ñ:"n",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",ố:"o",ṍ:"o",ṓ:"o",ȏ:"o",ù:"u",ú:"u",û:"u",ü:"u",ý:"y",ÿ:"y",Ā:"A",ā:"a",Ă:"A",ă:"a",Ą:"A",ą:"a",Ć:"C",ć:"c",Ĉ:"C",ĉ:"c",Ċ:"C",ċ:"c",Č:"C",č:"c",C̆:"C",c̆:"c",Ď:"D",ď:"d",Đ:"D",đ:"d",Ē:"E",ē:"e",Ĕ:"E",ĕ:"e",Ė:"E",ė:"e",Ę:"E",ę:"e",Ě:"E",ě:"e",Ĝ:"G",Ǵ:"G",ĝ:"g",ǵ:"g",Ğ:"G",ğ:"g",Ġ:"G",ġ:"g",Ģ:"G",ģ:"g",Ĥ:"H",ĥ:"h",Ħ:"H",ħ:"h",Ḫ:"H",ḫ:"h",Ĩ:"I",ĩ:"i",Ī:"I",ī:"i",Ĭ:"I",ĭ:"i",Į:"I",į:"i",İ:"I",ı:"i",Ĳ:"IJ",ĳ:"ij",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",Ḱ:"K",ḱ:"k",K̆:"K",k̆:"k",Ĺ:"L",ĺ:"l",Ļ:"L",ļ:"l",Ľ:"L",ľ:"l",Ŀ:"L",ŀ:"l",Ł:"l",ł:"l",Ḿ:"M",ḿ:"m",M̆:"M",m̆:"m",Ń:"N",ń:"n",Ņ:"N",ņ:"n",Ň:"N",ň:"n",ŉ:"n",N̆:"N",n̆:"n",Ō:"O",ō:"o",Ŏ:"O",ŏ:"o",Ő:"O",ő:"o",Œ:"OE",œ:"oe",P̆:"P",p̆:"p",Ŕ:"R",ŕ:"r",Ŗ:"R",ŗ:"r",Ř:"R",ř:"r",R̆:"R",r̆:"r",Ȓ:"R",ȓ:"r",Ś:"S",ś:"s",Ŝ:"S",ŝ:"s",Ş:"S",Ș:"S",ș:"s",ş:"s",Š:"S",š:"s",Ţ:"T",ţ:"t",ț:"t",Ț:"T",Ť:"T",ť:"t",Ŧ:"T",ŧ:"t",T̆:"T",t̆:"t",Ũ:"U",ũ:"u",Ū:"U",ū:"u",Ŭ:"U",ŭ:"u",Ů:"U",ů:"u",Ű:"U",ű:"u",Ų:"U",ų:"u",Ȗ:"U",ȗ:"u",V̆:"V",v̆:"v",Ŵ:"W",ŵ:"w",Ẃ:"W",ẃ:"w",X̆:"X",x̆:"x",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Y̆:"Y",y̆:"y",Ź:"Z",ź:"z",Ż:"Z",ż:"z",Ž:"Z",ž:"z",ſ:"s",ƒ:"f",Ơ:"O",ơ:"o",Ư:"U",ư:"u",Ǎ:"A",ǎ:"a",Ǐ:"I",ǐ:"i",Ǒ:"O",ǒ:"o",Ǔ:"U",ǔ:"u",Ǖ:"U",ǖ:"u",Ǘ:"U",ǘ:"u",Ǚ:"U",ǚ:"u",Ǜ:"U",ǜ:"u",Ứ:"U",ứ:"u",Ṹ:"U",ṹ:"u",Ǻ:"A",ǻ:"a",Ǽ:"AE",ǽ:"ae",Ǿ:"O",ǿ:"o",Þ:"TH",þ:"th",Ṕ:"P",ṕ:"p",Ṥ:"S",ṥ:"s",X́:"X",x́:"x",Ѓ:"Г",ѓ:"г",Ќ:"К",ќ:"к",A̋:"A",a̋:"a",E̋:"E",e̋:"e",I̋:"I",i̋:"i",Ǹ:"N",ǹ:"n",Ồ:"O",ồ:"o",Ṑ:"O",ṑ:"o",Ừ:"U",ừ:"u",Ẁ:"W",ẁ:"w",Ỳ:"Y",ỳ:"y",Ȁ:"A",ȁ:"a",Ȅ:"E",ȅ:"e",Ȉ:"I",ȉ:"i",Ȍ:"O",ȍ:"o",Ȑ:"R",ȑ:"r",Ȕ:"U",ȕ:"u",B̌:"B",b̌:"b",Č̣:"C",č̣:"c",Ê̌:"E",ê̌:"e",F̌:"F",f̌:"f",Ǧ:"G",ǧ:"g",Ȟ:"H",ȟ:"h",J̌:"J",ǰ:"j",Ǩ:"K",ǩ:"k",M̌:"M",m̌:"m",P̌:"P",p̌:"p",Q̌:"Q",q̌:"q",Ř̩:"R",ř̩:"r",Ṧ:"S",ṧ:"s",V̌:"V",v̌:"v",W̌:"W",w̌:"w",X̌:"X",x̌:"x",Y̌:"Y",y̌:"y",A̧:"A",a̧:"a",B̧:"B",b̧:"b",Ḑ:"D",ḑ:"d",Ȩ:"E",ȩ:"e",Ɛ̧:"E",ɛ̧:"e",Ḩ:"H",ḩ:"h",I̧:"I",i̧:"i",Ɨ̧:"I",ɨ̧:"i",M̧:"M",m̧:"m",O̧:"O",o̧:"o",Q̧:"Q",q̧:"q",U̧:"U",u̧:"u",X̧:"X",x̧:"x",Z̧:"Z",z̧:"z"},o=Object.keys(t).join("|"),r=new RegExp(o,"g"),i=new RegExp(o,""),n=function(e){return e.replace(r,(function(e){return t[e]}))};e.exports=n,e.exports.has=function(e){return!!e.match(i)},e.exports.remove=n}},t={},function o(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,o),n.exports}(772);var e,t}));
},{}],8:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.AutosuggestHighlightParse=e():t.AutosuggestHighlightParse=e()}(this,(()=>{return t={705:t=>{t.exports=function(t,e){const h=[];return 0===e.length?h.push({text:t,highlight:!1}):e[0][0]>0&&h.push({text:t.slice(0,e[0][0]),highlight:!1}),e.forEach(((i,o)=>{const s=i[0],r=i[1];h.push({text:t.slice(s,r),highlight:!0}),o===e.length-1?r<t.length&&h.push({text:t.slice(r,t.length),highlight:!1}):r<e[o+1][0]&&h.push({text:t.slice(r,e[o+1][0]),highlight:!1})})),h}}},e={},function h(i){var o=e[i];if(void 0!==o)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,h),s.exports}(705);var t,e}));
},{}]},{},[4]);
