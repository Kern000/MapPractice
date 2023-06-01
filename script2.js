function getRandomLatLng(map) {

    let boundary = map.getBounds();

    // returns both northEast and southWest Lat Lng

    let northEast = boundary.getNorthEast();
    let southWest = boundary.getSouthWest();

    // returns northEast lat lng, southWest lat lng individully

    let latSpan = northEast.lat - southWest.lat    // will get height of the map
 
    let lngSpan = northEast.lng - southWest.lng    // will get width of the map

    let randomLat = Math.random() * latSpan + southWest.lat;
    let randomLng = Math.random() * lngSpan + southWest.lng;

    // Math.random() return between 0 to 1. Multiplied by latSpan and lngSpan leads to a random location within the width and height.

    return[randomLat, randomLng]
}


let group1 = L.layerGroup()      // layerGroup adds container for multiple layer
                                //L.layerGroup(): This class is a general-purpose layer group in Leaflet that allows you to group multiple layers, including markers, into a single layer.
                                // use L.layerGroup() when you want to group and manage various types of layers together without clustering.

let randmarker1 = L.marker(getRandomLatLng(map1)).addTo(group1)  // add random lat long to group
let randmarker2 = L.marker(getRandomLatLng(map1)).addTo(group1)
let randmarker3 = L.marker(getRandomLatLng(map1)).addTo(group1)  

group1.addTo(map1)

//

let group2 = L.layerGroup()     // create 2nd container

for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map1),{
        color: 'white',
        fillColor: "orange",
        fillOpacity: 0.3,
        radius: 500
    }).addTo(group2)
}

group2.addTo(map1)

//

let group3 = L.layerGroup()

for(let i=0; i < 15; i++){

    L.circle(getRandomLatLng(map1), {
        color: 'black',
        fillColor: 'green',
        fillOpacity: 0.4,
        radius: 250    
    }).addTo(group3)
}

group3.addTo(map1)

//

let group4 = L.markerClusterGroup()

async function loadData1(){

    let busStops = []
    let response = await axios.get("https://gist.githubusercontent.com/kunxin-chor/b0a3e50161cd7a53d1bcdc5cc93b11fe/raw/05716c38af2b960d0f34d4db1fef6ce38d42455e/bus-stop.json")
    
    for (let rawData in response.data){

        let lat = response.data[rawData][1];
        let lng = response.data[rawData][0];
        let coordinate = [lat, lng]
        console.log(coordinate)
        busStops.push(coordinate)
        console.log(busStops)
    }
    
    for (let dataItem of busStops){
        
        L.marker(dataItem).addTo(group4)
    }
}

let group5 = L.markerClusterGroup()

url1 = 'https://api.data.gov.sg/v1/transport/taxi-availability'

async function loadData2(url){
    let response = await axios.get(url)
    let markerToProcess = response.data.features[0].geometry.coordinates

    console.log(markerToProcess)
    return markerToProcess
}

window.addEventListener("DOMContentLoaded", async function(){

    let loadedData1 = await loadData1()
    group4.addTo(map1)

    let loadedData2 = await loadData2(url1)

    for (let eachCoordinate of loadedData2){
        lat = eachCoordinate[1]
        lng = eachCoordinate[0]
        processedCoordinate = [lat, lng]
        L.marker(processedCoordinate).addTo(group5)
    }
    group5.addTo(map1)

})

//

let baseLayers = {
    'markers': group1,
    'circles': group2,
    'busStop': group4,
    'taxi' : group5
}

let overlays = {
    'greenCircle': group3
}

L.control.layers(baseLayers, overlays).addTo(map1)

// inbuild function, toggle between baseLayers of 'markers' and 'circles', and see if want to toggle overlaps

