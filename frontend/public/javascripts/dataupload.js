var mainColor = 'red'
let rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

function handleFile(e) {
    let files = e.target.files;
    let f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
        let sheet_name_list = workbook.SheetNames;
        datapoints = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

        $('#data-table').append('<tr><th>Postal Code</th><th>1-room / 2-room</th><th>3-room</th><th>4-room</th>' +
            '<th>5-room/ Executive</th><th>Postal Code Average</th><th>Year</th><th>Month</th><th>Lat</th>' +
            '<th>Long</th></tr>');
        datapoints.forEach(function(data){
            $('#data-table').append('<tr><td>'+data.postal+'</td><td>'+
                data.oneroom+'</td><td>'+
                data.threeroom+'</td><td>'+
                data.fourroom+'</td><td>'+
                data.fiveroom+'</td><td>'+
                data.average+'</td><td>'+
                data.year+'</td><td>'+
                data.month+'</td><td>'+
                data.lat+'</td><td>'+
                data.long+'</td></tr>');
        })
        generateData(datapoints)
        avgOfAvgs(datapoints, mainColor)
        return datapoints;
    };
    if (rABS)
        reader.readAsBinaryString(f);
    else
        reader.readAsArrayBuffer(f);
}