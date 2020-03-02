ListarSeccion();

function ListarSeccion() {
    $.get("Seccion/ListarSeccion", function (data) {

        CrearListado(["Id Seccion","Nombre"],data);
    });
}

function CrearListado(arrayColumnas, data) {
    var contenido = "";
    contenido += "<table id='tablaSeccion' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }
    contenido += "<td>Acciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";

    contenido += "<tbody>";
    var llaves = Object.keys(data[0]);
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            contenido += "<td>";
            contenido += data[i][llaves[j]];
            contenido += "</td>";
        }
        contenido += "<td>";
        contenido += "<button class='btn btn-primary'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("tbSeccion").innerHTML = contenido;
    $("#tablaSeccion").DataTable(
        {
            searching: false
        }
    );
}

