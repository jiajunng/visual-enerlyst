var center = [1.3521, 103.8198];


var osm = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 18
});

// var osmUrl = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
//     osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

map = new L.Map('map',
    {
        layers: [osm],
        center: new L.LatLng(center[0], center[1]),
        zoom: 11,
        minZoom: 11,
        maxZoom: 15
    });

var options = {
    radius: 12,
    opacity: 0.7,
    duration: 500,
    // colorRange: ['#fffde6', '#d8c700'],
    // colorRange: ['#fffde6', '#f9e606'],
    // colorRange: ['#c9ebff', '#06a0f6'],
    // colorScaleExtent: [1, 10]
};

let southWest = L.latLng(1.227834, 103.608210),
    northEast = L.latLng(1.484059, 104.028566);
let bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

L.HexbinHoverHandler.myHoverHandler = function () {

    // return the handler instance
    return {
        mouseover: function (hexLayer, data) {
            // hexLayer - reference to the L.HexbinLayer instance
            // data - reference to the data bound to the hovered hexbin
            // this - D3 wrapped DOM element for hovered hexbin
            // console.log(data)

        },
        mouseout: function (hexLayer, data) {
            // console.log(data)
        }
    };

};
var hexLayer = L.hexbinLayer(options)
    .addTo(map)
    .hoverHandler(L.HexbinHoverHandler.compound({
        handlers: [
            L.HexbinHoverHandler.resizeFill(),
            L.HexbinHoverHandler.myHoverHandler(),
            L.HexbinHoverHandler.tooltip({
                tooltipContent: function (d) {
                    return d.length + ' data points';
                }
            })
        ]
    }))
hexLayer.colorScale().range(['white', 'blue']);
// hexLayer.colorScale().range(['#fffde6', '#f9e606']);
// hexLayer.colorScaleExtent([1,10])
var hexBinColor = "blue"

hexLayer.colorScale().range(['white', 'blue']);
hexLayer.dispatch()
    .on('click', function (d, i) {
        console.log({type: 'click', event: d, index: i, context: this});

        $('.points').remove();


        plotMarkersInSelectedHexbin(d);

        cleanedData = cleanSelectedData(d);
        avgOfAvgs(cleanedData, hexBinColor);


    });

function avgInEachHexbin(pointsInHexbin) {
    let energyUsedSum = 0;
    pointsInHexbin.forEach(function (singlePoint) {
        energyUsedSum += parseFloat(singlePoint.o.average);
    })
    let avgConsumption = energyUsedSum/pointsInHexbin.length;
    return avgConsumption
}

hexLayer
    .radiusRange([6, 13])
    .lng(function (d) {

        return d.long;
    })
    .lat(function (d) {
        return d.lat;

    })//will be called for each hexbin
    .colorValue(function (listOfPointsInHexbin) {
        return avgInEachHexbin(listOfPointsInHexbin);

    })
    .radiusValue(function (d) {
        return d.length;
    });
let generateData = function (dataPoints) {
    var data = [];
    dataPoints.forEach(function (singleData) {
        if (singleData.long !== undefined && singleData.lat !== undefined)

            data.push(
                {
                    // "lat": singleData.lat,
                    // "long": singleData.long,
                    // "postal": singleData.postal,
                    // "months": [
                    //     {"jan": singleData.Jan},
                    //     {"feb": singleData.Feb},
                    //     {"mar": singleData.Mar},
                    //     {"apr": singleData.Apr},
                    //     {"may": singleData.May},
                    //     {"jun": singleData.Jun},
                    //     {"jul": singleData.Jul},
                    //     {"aug": singleData.Aug},
                    //     {"sep": singleData.Sep},
                    //     {"oct": singleData.Oct},
                    //     {"nov": singleData.Nov},
                    //     {"dec": singleData.Dec},
                    // ]

                    "lat": singleData.lat,
                    "long": singleData.long,
                    "postal": singleData.postal,
                    "1room": singleData.oneroom,
                    "3room": singleData.threeroom,
                    "4room": singleData.fourroom,
                    "5room": singleData.fiveroom,
                    "average": singleData.average,
                    "month": singleData.month
                }
            )

    })
    hexLayer.data(data);
};

function cleanSelectedData(dataPoints){
    var data = []
    dataPoints.forEach(function (singleData) {
        data.push(
            {
            "average": singleData.o.average,
            "month": singleData.o.month,
                "lat": singleData.o.lat,
                "long": singleData.o.long
            }
        )
    })
    return data

}
