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
        center: new L.LatLng(center[0],center[1]),
        zoom: 11,
        minZoom: 11,
        maxZoom: 15
    });

var options = {
    radius: 12,
    opacity: 0.7,
    duration: 500,
    //colorRange: ['#fffde6', '#f9e606'],
    colorRange: ['#c9ebff', '#06a0f6'],
    colorScaleExtent: [1, 10]
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
            console.log(data)

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
// hexLayer.colorScale().range(['#fffde6', '#f9e606']);
// hexLayer.colorScaleExtent([1,10])
hexLayer.dispatch()
    .on('click', function (d, i) {
        console.log({type: 'click', event: d, index: i, context: this});

        $('.points').remove();
        let test = {};
        d.forEach(function(single){
            test[single.o[2].postal] = single.o[2];
            $('#overlay').append('<div class="points">'+single.o[2].postal+'</div>');
        })

    });

hexLayer
    .radiusRange([6, 13])
    .lng(function (d) {
        return d[0];
    })
    .lat(function (d) {
        return d[1];
    })
    .colorValue(function (d) {

        // d.forEach(function(singlePoint){
        //     let test = singlePoint.o[2];
        //     let jan = singlePoint[2].o.jan;
        // })

        return d.length;
    })
    .radiusValue(function (d) {
        return d.length;
    });
let generateData = function (dataPoints) {
    var data = [];
    dataPoints.forEach(function (singleData) {
        if (singleData.long !== undefined && singleData.lat !== undefined)
            data.push([singleData.long, singleData.lat, {
                "postal": singleData.postal,
                "jan" : singleData.Jan,
                "feb" : singleData.Feb,
                "mar" : singleData.Mar,
                "apr" : singleData.Apr,
                "may" : singleData.May,
                "jun" : singleData.Jun,
                "jul" : singleData.Jul,
                "aug" : singleData.Aug,
                "sep" : singleData.Sep,
                "oct" : singleData.Oct,
                "nov" : singleData.Nov,
                "dec" : singleData.Dec,
            }]);
    })
    hexLayer.data(data);

};
