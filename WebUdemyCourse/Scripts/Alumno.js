
Listar();

function Listar() {
    $.get("Alumno/ListarAlumno", function (data) {
        CrearTablaAlumno(["Id Alunmo", "Nombre", "A. Paterno", "A. Materno", "Telefono"], data);
    });
}

function CrearTablaAlumno(arrayColumnas,data) {
    var resultado = "";

    resultado += "<table id='tbAlumno' class='table' >";
    resultado += "<thead>";
    resultado += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        resultado += "<td>";
        resultado += arrayColumnas[i];
        resultado += "</td>";
    }
    resultado += "<td>Aciones</td>";
    resultado += "</tr>";
    resultado += "</thead>";

    var llaves = Object.keys(data[0]);
    resultado += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        resultado += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLLaves = llaves[j];
            resultado += "<td>";
            resultado += data[i][valorLLaves];
            resultado += "</td>";
        }
        var llaveID = llaves[0];
        resultado += "<td>";
        resultado += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveID] + ")'  data-toggle='modal' data-target='#myModal' ><i class='glyphicon glyphicon-edit'></i></button> ";
        resultado += "<button class='btn btn-danger' onclick='BorrarAlumno(" + data[i][llaveID] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        resultado += "</td>";
        resultado += "</tr>";
    }


    resultado += "</tbody>";
    resultado += "</table>";
    document.getElementById("divTablaAlumno").innerHTML = resultado;
    $("#tbAlumno").DataTable(
        {
            searching: false
        });
}

$.get("Alumno/ListarSexo", function (data) {
    //var contenido = "";
    //for (var i = 0; i < data.length; i++) {
    //    contenido += "<option value='" + data[i].IIDSEXO + "'>";
    //    contenido += data[i].NOMBRE;
    //    contenido += "</option>";
    //}
    LlenarCombo(data, document.getElementById("cboSexo"), true);
    LlenarCombo(data, document.getElementById("cboSexo2"),true);
    //document.getElementById("cboSexo").innerHTML = contenido;
});

function LlenarCombo(data, control,primerElemento) {
    var contenido = "";

    if (primerElemento == true) {
        contenido +="<option value=''>---Seleccione---</option>"
    }

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].IID + "'>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
    var idSexo = document.getElementById("cboSexo").value;

    if (idSexo == "") {
        Listar();
    } else {
        $.get("Alumno/FiltrarSexo/?idSexo=" + idSexo, function (data) {

            CrearTablaAlumno(["Id Alunmo", "Nombre", "A. Paterno", "A. Materno", "Telefono"], data);
        });
    }

}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    Listar();
}

function BorrarAlumno(id) {
    if (confirm("Desea eliminar el Alumno?") == 1) {
        $.get("Alumno/EliminarAlumno/?id=" + id, function (data) {
            if (data == 0) {
                alert("Ocurrió un error");
            } else {
                alert("Se elimnó correctamente");
                Listar();
            }
        });
    }
}

function LimpiarCampos() {
    var controles = document.getElementsByClassName("limpiar");
    var numControles = controles.length;
    for (var i = 0; i < numControles; i++) {
        controles[i].value = "";
    }
}

function abrirModal(id) {
    if (id == 0) {
        LimpiarCampos();
    } else {
        $.get("Alumno/ObtenerEntidadAlumno/?id=" + id, function (data) {
            document.getElementById("txtIdAlumno").value = data[0].IIDALUMNO;
            document.getElementById("txtNombreAlumno").value = data[0].NOMBRE;
            document.getElementById("txtAPaterno").value = data[0].APPATERNO;
            document.getElementById("txtAMaterno").value = data[0].APMATERNO;
            document.getElementById("cboSexo2").value = data[0].IIDSEXO;
            document.getElementById("txtFechaNacimiento").value = data[0].FECHANAC;
            document.getElementById("txtTelPadre").value = data[0].TELEFONOPADRE;
            document.getElementById("txtTelMadre").value = data[0].TELEFONOMADRE;
            document.getElementById("txtNumHermanos").value = data[0].NUMEROHERMANOS;


        });
    }
}

$('#txtFechaNacimiento').datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy"
});

function Agregar() {
    var frm = new FormData();
    var idalumno = document.getElementById("txtIdAlumno").value;
    var nombre = document.getElementById("txtNombreAlumno").value;
    var paterno = document.getElementById("txtAPaterno").value;
    var materno = document.getElementById("txtAMaterno").value;
    var sexo = document.getElementById("cboSexo2").value;
    var fechan = document.getElementById("txtFechaNacimiento").value;
    var telpadre = document.getElementById("txtTelPadre").value;
    var telmadre = document.getElementById("txtTelMadre").value;
    var numhermanos = document.getElementById("txtNumHermanos").value;

    frm.append("IIDALUMNO", idalumno);
    frm.append("NOMBRE", nombre);
    frm.append("APPATERNO", paterno);
    frm.append("APMATERNO", materno);
    frm.append("IIDSEXO", sexo);
    frm.append("FECHANACIMIENTO", fechan);
    frm.append("TELEFONOPADRE", telpadre);
    frm.append("TELEFONOMADRE", telmadre);
    frm.append("NUMEROHERMANOS", numhermanos);
    frm.append("BHABILITADO", 1);

    if (confirm("Desea guardar los cambio?") == 1) {
        $.ajax({
            type: "POST",
            url: "Alumno/GuardarDatos",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("se ejecutó correctamente");
                    Listar();
                    document.getElementById("btnCancelar").click();
                }
            }

        });
    }
}