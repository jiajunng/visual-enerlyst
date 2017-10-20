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

        $('#data-table').append('<tr><th>Postal Code</th><th>Lat</th><th>Lng</th><th>Jan</th>' +
            '<th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>' +
            '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>');
        datapoints.forEach(function(data){
            $('#data-table').append('<tr><td>'+data.postal+'</td><td>'+
                data.lat+'</td><td>'+
                data.long+'</td><td>'+
                data.Jan+'</td><td>'+
                data.Feb+'</td><td>'+
                data.Mar+'</td><td>'+
                data.Apr+'</td><td>'+
                data.May+'</td><td>'+
                data.Jun+'</td><td>'+
                data.Jul+'</td><td>'+
                data.Aug+'</td><td>'+
                data.Sep+'</td><td>'+
                data.Oct+'</td><td>'+
                data.Nov+'</td><td>'+
                data.Dec+'</td></tr>');
        })
        generateData(datapoints)
        return datapoints;
    };
    if (rABS)
        reader.readAsBinaryString(f);
    else
        reader.readAsArrayBuffer(f);
}