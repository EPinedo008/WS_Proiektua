fetch('http://api.football-data.org/v4/competitions/2021/teams',{
    headers: { 'X-Auth-Token': '7aa682c5beac4a71902345d7c894cf15' }

})
.then(
r => r.json())
.then(
data => {
    let arsenal = data.teams.filter(team => team.name === "Arsenal FC");   //Arsenal taldea
    let jokalariak = arsenal[0].squad;   //Arsenal taldeko jokalariak. Filter-ek array bat itzultzen duenez, [0] elementua aztertuko dugula zehaztu
    console.log("jokalariak")
    console.log(JSON.stringify(jokalariak))

    let izenak= jokalariak.map(j=> j.name)  //Arsenal taldeko jokalarien izenak bakarrik
    console.log("jokalari izenak")
    console.log(JSON.stringify(izenak))

    let lehen_jokalari=jokalariak[0]
    console.log("lehen jokalaria")
    console.log(JSON.stringify(lehen_jokalari))


    //Atributo berriak sortu, izena aldatu eta balorea aldatu

    let jokalari_berriak= jokalariak.map(j=>{
        izena=izena_aldatu(j.position)

        console.log(j.position)
        console.log(izena)
        
        let birthDate=j.dateOfBirth

        return{
            id:j.id,
            name:j.name,
            birthDate:j.dateOfBirth,
            nationality:j.nationality,
            teamId:taldearen_id(arsenal),
            leagueId:2021,
            position:izena
        }

    })
    console.log(JSON.stringify(jokalari_berriak))

}
)

function izena_aldatu(posizioa){
    if(posizioa=="Goalkeeper")
        return "GK"
    else if(posizioa== "Defence" || posizioa=="Centre-Back" || posizioa=="Right-Back" || posizioa=="Left-Back")
        return "DF"
    else if(posizioa == "Midfield" || posizioa == "Central Midfield" || posizioa == "Defensive Midfield" || posizioa == "Attacking Midfield" || posizioa == "Left Midfield") 
        return "MF"
    else if(posizioa == "Offence" || posizioa == "Centre-Forward" || posizioa == "Right Winger" || posizioa == "Left Winger")
        return "FW"
    
    return "errorea"
}


function taldearen_id(taldea){
    return taldea.id
}