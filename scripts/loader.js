function createLoader() {
    var list = [
        {
            "caisse-1": "CoradiaLiner_ZMXi_Carm_L.gif",
            "caisse-2": "CoradiaLiner_RI4_Carm_R.gif",
            "caisse-3": "CoradiaLiner_ZMXp_Carm_R.gif"
        },
        {
            "caisse-1": "Regiolis_ZMXi_TER_L.gif",
            "caisse-2": "Regiolis_RI4_TER_L.gif",
            "caisse-3": "Regiolis_ZMXp_TER_R.gif"
        },
        {
            "caisse-1": "X72500_T2B_ML.gif",
            "caisse-2": "X72500_T2B_R_L.gif",
            "caisse-3": "X72500_T2B_MR.gif"
        },
        {
            "caisse-1": "X73500_T2.gif",
            "caisse-2": "X73500_T2.gif",
            "caisse-3": "X73500_T2.gif"
        },
        {
            "caisse-1": "Z24500_T2B_Z1_L.gif",
            "caisse-2": "Z24500_T2B_Z3_R.gif",
            "caisse-3": "Z24500_T2B_Z1_R.gif"
        },
        {
            "caisse-1": "ZGC_T2_AB_L.gif",
            "caisse-2": "ZRGC_T2_R.gif",
            "caisse-3": "ZGC_T2_R.gif"
        }
    ];

    var rdom = Math.floor((Math.random() * 6) + 1);

    document.getElementById('caisse-1').src = 'images/loading/caisse-1/'+list[rdom]['caisse-1'];
    document.getElementById('caisse-2').src = 'images/loading/caisse-2/'+list[rdom]['caisse-2'];
    document.getElementById('caisse-3').src = 'images/loading/caisse-3/'+list[rdom]['caisse-3'];
}