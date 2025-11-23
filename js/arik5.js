fetch('http://api.football-data.org/v4/competitions')
  .then(erantzuna => erantzuna.json())
  .then(datuak => {

        
        const ligak = datuak.competitions.filter(obj => obj.plan === 'TIER_ONE');

        
        const ligakID = ligak.map(liga => liga.id);

        console.log(ligakID);  
  })
  .catch(errorea => {
        console.error('Errorea gertatu da:', errorea);
  });

  
