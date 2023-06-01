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


let group = L.layerGroup()      // layerGroup adds container for multiple layer
                                //L.layerGroup(): This class is a general-purpose layer group in Leaflet that allows you to group multiple layers, including markers, into a single layer.
                                // use L.layerGroup() when you want to group and manage various types of layers together without clustering.

let randmarker1 = L.marker(getRandomLatLng(map1)).addTo(group)  // add random lat long to group
let randmarker2 = L.marker(getRandomLatLng(map1)).addTo(group)
let randmarker3 = L.marker(getRandomLatLng(map1)).addTo(group)  

group.addTo(map1)

