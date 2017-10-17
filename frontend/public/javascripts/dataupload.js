let rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
let dataPoints;
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

        $('#data-table').append('<tr><th>Postal Code</th><th>Lat</th><th>Lng</th></tr>');
        datapoints.forEach(function(data){
            $('#data-table').append('<tr><td>'+data.postal+'</td><td>'+data.lat+'</td><td>'+data.long+'</td></tr>');
        })
        return datapoints;
    };
    if (rABS)
        reader.readAsBinaryString(f);
    else
        reader.readAsArrayBuffer(f);
}