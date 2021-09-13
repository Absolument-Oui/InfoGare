function importCSV(file) {
    Papa.parse(file, {
        complete: function(results){
            console.log(results.data);
        }
    });
}