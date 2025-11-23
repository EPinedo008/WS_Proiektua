fetch('http://api.football-data.org/v4/competitions')
  .then(erantzuna => {
    return erantzuna.json();
  })
  .then(datuak => {
    const tierOneLigak = datuak.competitions.filter(obj => obj.plan === 'TIER_ONE');
    const herrialdeKodeak = ['ESP', 'ENG', 'ITA', 'FRA'];
    const big4L = tierOneLigak.filter(obj =>
        herrialdeKodeak.includes(obj.area.code)
    );
    const big4 = big4L.filter(obj => 
        obj.name != 'Championship'
    )
    console.log('TIER_ONE Big4 (ESP, ENG, ITA, FRA) ligak:');
    big4.forEach(liga => {
        console.log(`${liga.area.name}: ${liga.name}`);
    });
  })
  .catch(errorea => {
        console.error('Errorea gertatu da:', errorea);
  });

