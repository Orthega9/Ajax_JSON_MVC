ListarPeriodoGC();


function ListarPeriodoGC() {
    $.get("PeriodoGradoCurso/ListarPeriodoGC", function (data) {
        CargarTablaPGC(["IID", "NOMBREPERIODO", "NOMBREGRADO","NOMBRECURSO"],data);
    });         

    $.get("PeriodoGradoCurso/ListarGrado", function (data) {
        llenarCombos(document.getElementById("cboGrado"), data, true);
    });
    $.get("PeriodoGradoCurso/ListarPeriodo", function (data) {
        llenarCombos(document.getElementById("cboPeriodo"), data, true);
    });

    $.get("PeriodoGradoCurso/ListarCurso", function (data) {
        llenarCombos(document.getElementById("cboCurso"), data, true);
    });

}                       

function CargarTablaPGC(arrayColumnas, data){
    var contenido = "";

    contenido += "<table id='tb-pgc' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }
    contenido += "<td>Operaciones</td>";
    contenido += "</tr>";

    var llaves = Object.keys(data[0]);
    contenido += "</thead>";
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            contenido += "<td>";
            contenido += data[i][llaves[j]];
            contenido += "</td>";
        }
        var llaveID = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModalPGC(" + data[i][llaveID] + ")'  data-toggle='modal' data-target='#myModal' ><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='Eliminar(" + data[i][llaveID] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $('#tb-pgc').DataTable({
        searching: false
    }
    );
}

function llenarCombos(data, control, primerElemento) {
    //debugger;
    var contenido = "";
    if (primerElemento) {
        contenido += "<option value=''>---Seleccione---</option>"; 
    }

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].IDD + "'>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }

    control.innerHTML = contenido;
}
