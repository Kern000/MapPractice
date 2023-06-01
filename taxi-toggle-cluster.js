const singapore = [1.35, 103.85]

let map1 = L.map('map1').setView(singapore, 12)   // initialize map based on html div id and set initial view and zoom

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map1);

// creating a new instance of MarkerClusterGroup, you can add markers to it, and the plugin will automatically group them together based on their proximity. 

let markerClusterLayer = L.markerClusterGroup();

// L.markerClusterGroup(): This class is part of the Leaflet.markercluster plugin and is specifically designed for marker clustering. It allows you to group a large number of markers into clusters based on their proximity. When zoomed out on the map, clusters are displayed instead of individual markers

// let marker1 = L.marker([1.292, 103.65])
// let marker2 = L.marker([1.294, 103.85])
// let marker3 = L.marker([1.296, 103.95])

// marker1.addTo(map1)
// marker2.addTo(map1)
// marker3.addTo(map1)

// markerClusterLayer.addLayer(marker1);
// markerClusterLayer.addLayer(marker2);
// markerClusterLayer.addLayer(marker3);

// markerClusterLayer is one layer, now with three markers.

markerClusterLayer.addTo(map1);

// create three individual markers (marker1, marker2, and marker3) and then add them to the markerClusterLayer using the addLayer method.
// method 2:

// for (let i = 0; i < 100; i++) {
//     let pos = getRandomLatLng(map1)
//     L.marker(pos).addTo(markerClusterLayer)
// }

// notice it will only be within the defined boundary
// this is based on zoom level and what is visible on the map

// let firstMarker = L.marker([1.35, 103.85]).addTo(map1)
// firstMarker.bindPopup("<h2> Supreme Court </h2>")
// firstMarker.addEventListener('click', function(){
//     alert("Singapore")
// })

// if you did not add it to markerClusterLayer, it may interfere with adding on other markers through .layerGroup

let circle = L.circle([1.29, 103.85], {
    color: "white",
    fillColor: "purple",
    fillOpacity: 0.2,
    radius: 600
})
// circle.addTo(map1)

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

// getRandomLatLng(map1)


let url1 = 'https://api.data.gov.sg/v1/transport/taxi-availability'

async function loadData(url){
    let response = await axios.get(url)
    let markerToProcess = response.data.features[0].geometry.coordinates

    console.log(markerToProcess)
    return markerToProcess
}

let clickCount = 0;
// cannot put clickCount inside to always become 0

document.querySelector('#taxi-btn').addEventListener("click", async function(){

    let loadedData = await loadData(url1)
    console.log(loadedData)

    markerClusterLayer.clearLayers()    //markers create layer in markerClusterLayer container, so clear them

    for (let eachCoordinate of loadedData){
        lat = eachCoordinate[1]
        lng = eachCoordinate[0]
        processedCoordinate = [lat, lng]
        L.marker(processedCoordinate).addTo(markerClusterLayer)
    }
    markerClusterLayer.addTo(map1)

    clickCount ++
    if (clickCount == 2){
        map1.removeLayer(markerClusterLayer)
        clickCount = 0
    }
})






