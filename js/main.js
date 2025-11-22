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
