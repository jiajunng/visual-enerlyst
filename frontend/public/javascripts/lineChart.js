// Define margins, dimensions, and some line colors
const margin = {top: 40, right: 120, bottom: 30, left: 40};
// const width = 400 - margin.left - margin.right;
// const height = 200 - margin.top - margin.bottom;
const width = 430
const height = 220

// Define the scales and tell D3 how to draw the line
const x = d3.scaleLinear().domain([1, 12]).range([0, width]);
const y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
const line = d3.line().x(d => x(d.month)).y(d => y(d.average));


const chart = d3.select("#knn")
    .append("svg")
    .attr("width",'100%')
    .attr("height", '100%')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



// const chart = d3.select('svg').append('g')
//     .attr("width",'100%')
//     .attr("height", '100%')
//     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const tooltip = d3.select('#tooltip');
const tooltipLine = chart.append('line');

// Add the axes and a title
const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
chart.append('g').call(yAxis);
chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
chart.append('text').html('State Population Over Time').attr('x', 200);

// Load the data and draw a chart


function drawChart(averageOfEachMonth, color) {
    // let states, tipBox;
    var lastPointAverage = averageOfEachMonth[averageOfEachMonth.length-1].average

        chart.selectAll()
            .data(averageOfEachMonth).enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 2)
            .datum(averageOfEachMonth)
            .attr('d', line);

        chart.selectAll()
            .data(averageOfEachMonth).enter()
            .append('text')
            .html("Test")
            .attr('fill', color)
            .attr('alignment-baseline', 'middle')
            .attr('x', width)
            .attr('dx', '.5em')
            .attr('y', averageOfEachMonth => y(lastPointAverage));


        // tipBox = chart.append('rect')
        //     .attr('width', width)
        //     .attr('height', height)
        //     .attr('opacity', 0)
        //     .on('mousemove', drawTooltip)
        //     .on('mouseout', removeTooltip);
}

function removeTooltip() {
    if (tooltip) tooltip.style('display', 'none');
    if (tooltipLine) tooltipLine.attr('stroke', 'none');
}

function drawTooltip() {
    const year = Math.floor((x.invert(d3.mouse(tipBox.node())[0]) + 5) / 10) * 10;

    states.sort((a, b) => {
        return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
    })

    tooltipLine.attr('stroke', 'black')
        .attr('x1', x(year))
        .attr('x2', x(year))
        .attr('y1', 0)
        .attr('y2', height);

    tooltip.html(year)
        .style('display', 'block')
        .style('left', d3.event.pageX + 20)
        .style('top', d3.event.pageY - 20)
        .selectAll()
        .data(states).enter()
        .append('div')
        .style('color', d => d.color)
        .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
}


function avgOfAvgs(dataPoints, mainColor){
    var data = [];
    let jan = 0, feb = 0 , mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
    let countJan = 0, countFeb = 0, countMar = 0, countApr = 0, countMay = 0, countJun = 0, countJul = 0, countAug = 0,
        countSep = 0, countOct = 0, countNov = 0, countDec = 0;

    dataPoints.forEach(function (singleData) {
        if (singleData.long !== undefined && singleData.lat !== undefined) {
            switch (parseFloat(singleData.month)) {
                case 1:
                    jan += parseFloat(singleData.average)
                    countJan++
                    break;
                case 2:
                    feb += parseFloat(singleData.average)
                    countFeb++
                    break;
                case 3:
                    mar += parseFloat(singleData.average)
                    countMar++
                    break;
                case 4:
                    apr += parseFloat(singleData.average)
                    countApr++
                    break;
                case 5:
                    may += parseFloat(singleData.average)
                    countMay++
                    break;
                case 6:
                    jun += parseFloat(singleData.average)
                    countJun++
                    break;
                case 7:
                    jul += parseFloat(singleData.average)
                    countJul++
                    break;
                case 8:
                    aug += parseFloat(singleData.average)
                    countAug++
                    break;
                case 9:
                    sep += parseFloat(singleData.average)
                    countSep++
                    break;
                case 10:
                    oct += parseFloat(singleData.average)
                    countOct++
                    break;
                case 11:
                    nov += parseFloat(singleData.average)
                    countNov++
                    break;
                case 12:
                    dec += parseFloat(singleData.average)
                    countDec++
                    break;
            }
        }
    })


    let counter = 1;
    while (counter < 13) {
        switch(counter) {
            case 1:
                if (countJan > 0) {
                    data.push({
                        "month": 1,
                        "average": jan / countJan
                    })
                }
                    counter++
                break;
            case 2:
                if (countFeb > 0) {
                    data.push({
                        "month": 2,
                        "average": feb / countFeb
                    })
                }
                counter++
                break;
            case 3:
                if (countMar > 0) {
                    data.push({
                        "month": 3,
                        "average": mar / countMar
                    })
                }
                    counter++
            case 4:
                if (countApr > 0) {
                    data.push({
                        "month": 4,
                        "average": apr / countApr
                    })
                }
                counter++
                break;
            case 5:
                if (countMay > 0) {
                    data.push({
                        "month": 5,
                        "average": may / countMay
                    })
                }
                counter++
                break;
            case 6:
                if (countJun > 0) {
                    data.push({
                        "month": 6,
                        "average": jun / countJun
                    })
                }
                counter++
                break;
            case 7:
                if (countJul > 0) {
                    data.push({
                        "month": 7,
                        "average": jul / countJul
                    })
                }
                counter++
                break;
            case 8:
                if (countAug > 0) {
                    data.push({
                        "month": 8,
                        "average": aug / countAug
                    })
                }
                counter++
                break;
            case 9:
                if (countSep > 0) {
                    data.push({
                        "month": 9,
                        "average": sep / countSep
                    })
                }
                counter++
                break;
            case 10:
                if (countOct > 0) {
                    data.push({
                        "month": 10,
                        "average": oct / countOct
                    })
                }
                counter++
                break;
            case 11:
                if (countNov > 0) {
                    data.push({
                        "month": 11,
                        "average": nov / countNov
                    })
                }
                counter++
                break;
            case 12:
                if (countDec > 0) {
                    data.push({
                        "month": 12,
                        "average": dec / countDec
                    })
                }
                counter++
                break;
        }
    }
    drawChart(data, mainColor);
}