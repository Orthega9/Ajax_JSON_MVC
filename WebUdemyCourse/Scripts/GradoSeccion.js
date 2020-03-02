ListarGradoSeccion();

function ListarGradoSeccion() {
    $.get("GradoSeccion/ListarGradoSeccion", function (data) {
        //alert(data);
        CrearListadoGS(["ID Grado Seccion", "Nombre Grado", "Nombre Seccion"], data);
    })

    $.get("GradoSeccion/ListarSeccion", function (data) {
        //alert(data);
        llenarCombo(data, document.getElementById("cboSeccion"), true);
    })

    $.get("GradoSeccion/ListarGrado", function (data) {
        //alert(data);
        llenarCombo(data, document.getElementById("cboGrado"), true);
    })
}

function CrearListadoGS(arrayColumna,data){
        var resultado = "";

        resultado += "<table class='table' id='tablaGS'>";
        resultado += "<thead>";
        resultado += "<tr>";
        for (var i = 0; i < arrayColumna.length; i++) {
            resultado += "<td>" + arrayColumna[i]+"</td>";
        }
        resultado += "<td>Acciones </td>";
        resultado += "</tr>";
        resultado += "</thead>";

        var llaves = Object.keys(data[0]);
        resultado += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            resultado += "<tr>";
            for (var j = 0; j < llaves.length; j++) {
                resultado += "<td>";
                resultado += data[i][llaves[j]];
                resultado += "</td>";
            }
            var llaveID = llaves[0];
            resultado += "<td>";
            resultado += "<button class='btn btn-primary' onclick='AbrirModal(" + data[i][llaveID] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button>";
            resultado += "<button class='btn btn-danger' onclick='EliminarGS(" + data[i][llaveID]+")'><i class='glyphicon glyphicon-trash'></i></button>";
            resultado += "</td>";
            resultado += "</tr>";
        }

        resultado += "</tbody>";
        resultado += "</table>";

        document.getElementById("tb-gradoSeccion").innerHTML = resultado;
        $('#tablaGS').DataTable({
            searching: false
        });
    }

function llenarCombo(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>---Seleccione---</option>";
    } 

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].IDD + "'>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

function LimpiarCampos() {
    var controles = document.getElementsByClassName("borrar");
    var numControles = controles.length;

    for (var i = 0; i < numControles; i++) {
        controles[i].value = "";
    }
}

function AbrirModal(id) {
    if (id == 0) {
        LimpiarCampos();
    } else {
        $.get("GradoSeccion/ObtenerGradoSeccion/?id=" + id, function (data) {
            alert(JSON.stringify(data));
            document.getElementById("txtIdGS").value = data[0].IID;
            document.getElementById("cboSeccion").value = data[0].IIDSECCION;
            document.getElementById("cboGrado").value = data[0].IIDGRADO;

        });
    }
   
}
