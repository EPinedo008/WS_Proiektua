// YOUR CODE HERE :  
// .... stringToHTML ....
// .... setupRows .....
import { stringToHTML } from "./fragments.js";
export { setupRows };

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {


    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        let ligak={
            564:"es1",
            8:"en1",
            82:"de1",
            384:"it1",
            301:"fr1"
        }
        return ligak[leagueId]
    }


    function getAge(dateString) {
        // YOUR CODE HERE
        const gaur= new Date();
        let data= dateString.split('-');
        let urtea = gaur.getFullYear() - data[0];

        if (gaur.getMonth < data[1]){
            urtea -= 1;
        }
        else if(gaur.getMonth = data[1]){
            if (gaur.getDay < data[2]){
                urtea -= 1;
            }
        }
        return urtea;
    }
    
    let check = function (theKey, theValue) {
            // YOUR CODE HERE
        console.log(theKey)

        if(theKey == 'birthdate'){
            let solAge = getAge(game.solution[theKey])
            let bereAge= getAge(theValue)
            if(solAge > bereAge)
             return 'lower' 
            else if(solAge < bereAge) return 'higher'
            else 'correct'
        }else{
            if(game.solution[theKey] == theValue) return 'correct'
            else return 'incorrect'    
        }
        
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
            // YOUR CODE HERE 
            let emaitza= game.players.filter(j=>{
                if(j.id==playerId)
                  return j
              });
              return emaitza[0]; //Requires optimization
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}
