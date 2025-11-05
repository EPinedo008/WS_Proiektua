export { fetchJSON };

async function fetchJSON(what) {
    // YOUR CODE HERE
    const response = await fetch("json/"+what+".json");
    console.log("JSON-a kargatzen")
    const data = await response.json();
    return data

}
