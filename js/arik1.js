fetch('http://api.football-data.org/v4/competitions')
  .then(erantzuna => {
        return erantzuna.json();
  })
  .then(datuak => {
        const ligak = datuak.competitions.filter(obj => obj.plan === 'TIER_ONE');
        console.log('Maila goreneko ligak:', ligak.length, 'aurkitu dira');
        const big4H = ['Spain', 'England', 'Italy', 'Germany'];
        const big4L = ligak.filter(obj =>
        big4H.includes(obj.area.name)
        );
        console.log('Big 4 ligak:');
        big4L.forEach(liga => {
        console.log(`${liga.area.name}: ${liga.name}`);
        });
  })
  .catch(errorea => {
        console.error('Errorea gertatu da:', errorea);
  });

  fetch('http://api.football-data.org/v4/competitions')
  .then(erantzuna => erantzuna.json())
  .then(datuak => {

        const liga2014 = datuak.competitions.filter(obj => obj.id === 2014);

        
        if (liga2014.length > 0) {
            const liga = liga2014[0];
            console.log(`ID: ${liga.id}`);
            console.log(`Izena): ${liga.name}`);
            console.log(`Herrialdea: ${liga.area.name}`);
        }
  })
  .catch(errorea => {
        console.error('Errorea gertatu da:', errorea);
  });

  