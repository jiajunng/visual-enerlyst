

let rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
function handleFile(e) {
    myFunction();
    let files = e.target.files;
    let f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {

        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
        let sheet_name_list = workbook.SheetNames;
        myFunction();
        datapoints = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        console.log(datapoints)

        // $('#data-table').append('<tr><th>Postal Code</th><th>1-room / 2-room</th><th>3-room</th><th>4-room</th>' +
        //     '<th>5-room/ Executive</th><th>Postal Code Average</th><th>Year</th><th>Month</th><th>Lat</th>' +
        //     '<th>Long</th></tr>');

        // datapoints.forEach(function(data){
        //     // var someText = data.postal+'\n';
        //     // $('#data-table').append(document.createTextNode(someText));
        //     // console.log(someText)
        //     $('#data-table').append('<tr><td>'+data.postal+'</td><td>'+
        //         data.oneroom+'</td><td>'+
        //         data.threeroom+'</td><td>'+
        //         data.fourroom+'</td><td>'+
        //         data.fiveroom+'</td><td>'+
        //         data.average+'</td><td>'+
        //         data.year+'</td><td>'+
        //         data.month+'</td><td>'+
        //         data.lat+'</td><td>'+
        //         data.long+'</td></tr>');
        // })

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

        datapoints.forEach(function(data){
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
        $('#data-table').append(html);

        // $('#data-table').DataTable({
        //     data: datapoints,
        //     dataType: "json",
        //     cache: false,
        //     columns: [
        //         { title: "postal" },
        //         { title: "oneroom" },
        //         { title: "threeroom" },
        //         { title: "fourroom" },
        //         { title: "fiveroom" },
        //         { title: "average" },
        //         { title: "year" },
        //         { title: "month" },
        //         { title: "lat" },
        //         { title: "long" }
        //     ]
        // });

        generateData(datapoints)
        avgOfAvgs(datapoints, 'national')
        return datapoints;
    };
    if (rABS)
        reader.readAsBinaryString(f);
    else
        reader.readAsArrayBuffer(f);
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