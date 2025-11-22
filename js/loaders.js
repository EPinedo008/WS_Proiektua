

async function fetchJSON(what) {
    const response = await fetch("json/"+what+".json");
    console.log("JSON-a kargatzen")
    const data = await response.json();
    return data

}

module.exports = {
    fetchJSON
};
