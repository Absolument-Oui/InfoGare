var add_motrice = document.getElementById('add_motrice');
var add_tgv_l = document.getElementById('add_tgv_l');
var add_tgv_r = document.getElementById('add_tgv_r');
var add_wagon = document.getElementById('add_wagon');
var add_wagon_bar = document.getElementById('add_wagon_bar');
var compo = document.getElementById('compo_area');

var compo_list = [];


add_motrice.onclick = function () {
    var motrice = document.createElement('div');
    motrice.setAttribute('class', 'train-wagons-train-wagon train-loco');
    motrice.onclick = function () {
        compo.removeChild(motrice);
        writeCompo();
    }
    compo.appendChild(motrice);
    writeCompo();
}

add_tgv_l.onclick = function () {
    var tgv = document.createElement('div');
    tgv.setAttribute('class', 'train-wagons-train-wagon train-tgv-l');
    tgv.onclick = function () {
        compo.removeChild(tgv);
        writeCompo();
    }
    compo.appendChild(tgv);
    writeCompo();
}

add_tgv_r.onclick = function () {
    var tgv = document.createElement('div');
    tgv.setAttribute('class', 'train-wagons-train-wagon train-tgv-r');
    tgv.onclick = function () {
        compo.removeChild(tgv);
        writeCompo();
    }
    compo.appendChild(tgv);
    writeCompo();
}

add_wagon.onclick = function () {
    var wagon = document.createElement('div');
    wagon.setAttribute('class', 'train-wagons-train-wagon train-wagon');
    wagon.onclick = function () {
        compo.removeChild(wagon);
        writeCompo();
    }
    compo.appendChild(wagon);
    writeCompo();
}

add_wagon_bar.onclick = function () {
    var wagon = document.createElement('div');
    wagon.setAttribute('class', 'train-wagons-train-wagon train-wagon-bar');
    wagon.onclick = function () {
        compo.removeChild(wagon);
        writeCompo();
    }
    compo.appendChild(wagon);
    writeCompo();
}

function writeCompo() {
    compo_list = [];
    $('#compo_area').children('.train-wagons-train-wagon').each(function () {
        var classList = $(this).attr('class');
        compo_list.push(classList.split(' ')[1]);
    });
}