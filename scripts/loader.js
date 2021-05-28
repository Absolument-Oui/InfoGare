function createLoader() {
    var caisses_list = [
        {
            "caisse-1": "CoradiaLiner_L.gif",
            "caisse-2": "CoradiaLiner_M.gif",
            "caisse-3": "CoradiaLiner_R.gif"
        },
        {
            "caisse-1": "Regiolis_L.gif",
            "caisse-2": "Regiolis_M.gif",
            "caisse-3": "Regiolis_R.gif"
        },
        {
            "caisse-1": "X72500_L.gif",
            "caisse-2": "X72500_M.gif",
            "caisse-3": "X72500_R.gif"
        },
        {
            "caisse-1": "X73500_L.gif",
            "caisse-2": "X73500_M.gif",
            "caisse-3": "X73500_R.gif"
        },
        {
            "caisse-1": "Z24500_L.gif",
            "caisse-2": "Z24500_M.gif",
            "caisse-3": "Z24500_R.gif"
        },
        {
            "caisse-1": "ZGC_L.gif",
            "caisse-2": "ZGC_M.gif",
            "caisse-3": "ZGC_R.gif"
        }
    ];

    var rdom = Math.floor((Math.random() * 6));
    var livree = localStorage.getItem('livree');

    if (livree === null) {
        livree = "Neutre";
    }

    document.getElementById('caisse-1').src = 'images/loading/'+livree+'/caisse-1/'+caisses_list[rdom]['caisse-1'];
    document.getElementById('caisse-2').src = 'images/loading/'+livree+'/caisse-2/'+caisses_list[rdom]['caisse-2'];
    document.getElementById('caisse-3').src = 'images/loading/'+livree+'/caisse-3/'+caisses_list[rdom]['caisse-3'];
}