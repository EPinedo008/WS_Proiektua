fetch('http://api.football-data.org/v4/competitions')
  .then(erantzuna => {
        return erantzuna.json();
  })
  .then(datuak => {
        const espainiakoLiga = datuak.competitions.find(obj => obj.area.name === 'Spain');

        if (espainiakoLiga) {
        console.log('Espainiako liga aurkitu da:');
        } else {
        console.log('Ez da aurkitu Espainiako liga.');
        }
  })
  .catch(errorea => {
        console.error('Errorea gertatu da:', errorea);
  })