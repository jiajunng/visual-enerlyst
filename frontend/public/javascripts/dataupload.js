namespace = { allData: new HashTable() };

let rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

function handleFile(e) {
    myFunction();
    let files = e.target.files;
    let f = files[0];
    let reader = new FileReader();
    // let allData = new HashTable();

    reader.onload = function (e) {

        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
        let sheet_name_list = workbook.SheetNames;
        myFunction();

        sheet_name_list.forEach(function (sheet) {
            var yearData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            var sheetStr = sheet.toString()
            namespace.allData.setItem(sheetStr, yearData)
        })
        // datapoints = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        // console.log(datapoints)

        // console.log(namespace.allData)

        // print table

        var html = '<table class="table table-bordered"><theader>' +
            '<th>Postal Code</th>' +
            '<th>1-room / 2-room</th>' +
            '<th>3-room</th>' +
            '<th>4-room</th>' +
            '<th>5-room / Executive</th>' +
            '<th>Postal Code Average</th>' +
            '<th>Year</th>' +
            '<th>Month</th>' +
            '<th>Lat</th>' +
            '<th>Long</th>' +
            '</theader>';

        var year = namespace.allData.getItem(sheet_name_list[0])
        // console.log(year)
        year.forEach(function(data){
            html += '<tr>' +
                '<td>'+ data.postal + '</td>' +
                '<td>'+ data.oneroom + '</td>' +
                '<td>'+ data.threeroom + '</td>' +
                '<td>'+ data.fourroom + '</td>' +
                '<td>'+ data.fiveroom + '</td>' +
                '<td>'+ data.average + '</td>' +
                '<td>'+ data.year + '</td>' +
                '<td>'+ data.month + '</td>' +
                '<td>'+ data.lat + '</td>' +
                '<td>'+ data.long + '</td>' +
                '</tr>';
        })
        html += '</table>';
        // $('#data-table').append(html);

        // print dropdown menu for year
        // --- move this so that ppl wont assume table can be changed with the year selected

        html = '';
        var count = 1;
        var keys = namespace.allData.keys()
        keys.forEach(function (key) {
            if (count === 1) {
                html = '<select onChange="onYearChange(this.value);" name="year">';
            }
            // console.log(key)
            html += '<option value="' + key + '">'+ key + '</option>'
            count++;
        })
        html += '</select>';
        $('#year-select').append(html);

        generateData(sheet_name_list[0]);
        // generateData(allData.getItem(sheet_name_list[0]));
        // generateData(datapoints)    // change to dropdown menus' event handler

        /** TO DO TO DO TO DO TO DO TO DO TO DO TO DO TO DO TO DO TO DO TO DO TO DO TO DO **/

        // avgOfAvgs(sheet_name_list[0], true)
        return avgOfAvgs(namespace.allData.getItem(sheet_name_list[0]), 'national') // need to change handling of data in method


    };
    if (rABS)
        reader.readAsBinaryString(f);
    else
        reader.readAsArrayBuffer(f);
}

function onYearChange(year) {
    generateData(year);
    avgOfAvgs(namespace.allData.getItem(year), 'national')
}

function csvToArray(csvString){
    // The array we're going to build
    var csvArray   = [];
    // Break it into rows to start
    var csvRows    = csvString.split(/\n/);
    // Take off the first line to get the headers, then split that into an array
    var csvHeaders = csvRows.shift().split(',');

    // Loop through remaining rows
    for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){

        var rowArray  = csvRows[rowIndex].split(',');

        // Create a new row object to store our data.
        var rowObject = csvArray[rowIndex] = {};

        // Then iterate through the remaining properties and use the headers as keys
        for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
            // Grab the value from the row array we're looping through...
            var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
            // ...also grab the relevant header (the RegExp in both of these removes quotes)
            var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;

            rowObject[propLabel] = propValue;
        }
    }

    return csvArray;
}
function myFunction() {
    var x = document.getElementById("loadingArea");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}