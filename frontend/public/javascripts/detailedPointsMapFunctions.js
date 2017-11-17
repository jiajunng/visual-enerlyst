// var center = [1.344329, 104.060097];
var center = [1.3521, 103.8198];
let pointsArray = [];

var osm = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 18
});

let smallMap = new L.Map('detailedPointsMap',
    {
        layers: [osm],
        center: new L.LatLng(center[0], center[1]),
        zoom: 11,
        minZoom: 11,
        maxZoom: 18
    });
let sw = L.latLng(1.227834, 103.608210),
    ne = L.latLng(1.484059, 104.028566);
// let b = L.latLngBounds(sw, ne);
// map.setMaxBounds(b);

var myIcon = L.icon({
    iconUrl: '../images/house.png',
    iconSize: [10, 10],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

function plotMarkersInSelectedHexbin(d) {

    //remove points
    pointsArray.forEach(function (single) {
        smallMap.removeLayer(single);
    })
    pointsArray=[]

    d.forEach(function (single) {
        var o = single.o;
        var marker = new L.Marker(new L.LatLng(o.lat, o.long), {icon: myIcon}).bindPopup("" +
            "<div id='"+o.postal+"'><b>Hello world!</b><br />I am a popup.</div>")
            .on('click', function(e){
                console.log(e.target.postal)
                console.log(e.target.lat)
                console.log(e.target.lng)
        });
        marker.postal = o.postal;
        marker.lat = o.lat;
        marker.lng = o.long
        pointsArray.push(marker);
        smallMap.addLayer(marker);
    })

    var group = new L.featureGroup(pointsArray);
    smallMap.fitBounds(group.getBounds().pad(0.5));
    console.log(d)

}