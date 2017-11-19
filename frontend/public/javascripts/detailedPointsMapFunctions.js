// var center = [1.344329, 104.060097];
var center = [1.3521, 103.8198];
let pointsArray = [];

var osm = L.tileLayer('http://maps-a.onemap.sg/v2/Default/{z}/{x}/{y}.png', {
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

function plotMarkersInSelectedHexbin(d, min, max) {

    //remove points
    pointsArray.forEach(function (single) {
        smallMap.removeLayer(single);
    })
    pointsArray=[]

    d.forEach(function (single) {
        var singlePointAllMonthsData = single.values
        var total = 0;
        singlePointAllMonthsData.forEach(function(data){
            total +=parseFloat(data.o.average)
        })
        var averagePerMonth = total/singlePointAllMonthsData.length

        var percentile = (averagePerMonth-min)/(max-min)*100
        if(percentile<25)
        {
            myIcon.options.iconUrl = "../images/below25.png"
        }else if(percentile>=25 && percentile<50)
        {
            myIcon.options.iconUrl = "../images/house.png"
        }else if(percentile>=50 && percentile<75)
        {
            myIcon.options.iconUrl = "../images/above50below75.png"
        }else
        {
            myIcon.options.iconUrl = "../images/above75below100.png"
        }



        // console.log(averagePerMonth);
        var oneRecord = single.values[0].o;
        var marker = new L.Marker(new L.LatLng(oneRecord.lat, oneRecord.long), {icon: myIcon}).bindPopup("" +
            "<div id='"+oneRecord.postal+"'><b>"+oneRecord.addr+"</b>")
            .on('click', function(e){
                console.log(e.target.postal)
                console.log(e.target.lat)
                console.log(e.target.lng)
                calculateAvgForSinglePoint(singlePointAllMonthsData)
            });
        marker.postal = oneRecord.postal;
        marker.lat = oneRecord.lat;
        marker.lng = oneRecord.long
        pointsArray.push(marker);
        smallMap.addLayer(marker);
    })

    var group = new L.featureGroup(pointsArray);
    smallMap.fitBounds(group.getBounds().pad(0.5));
    // console.log(d)

}
