
$("#datepickerInicio").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true
});

$("#datepickerFin").datepicker({
    dateFormat: "dd/mm/yy",
    changeYear: true,
    changeMonth: true

});

$(document).ready(function () {
    CargarTabla();
});


function CargarTabla() {
    $.ajax({
        type: "GET",
        url: "Periodo/ListarPeriodo",
        cache: false,
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length > 0) {
                LLenarTabla(["ID Periodo","Nombre","Fecha Inicio","Fecha fin"],data);
            } else {
                alert(data);
            }
        },
        error: function (objXMLHttpRequest) {
            alert(objXMLHttpRequest);
        }
    });
}

function LLenarTabla(arrayColumnas,data) {
    var contenido = "";
    contenido += "<table class='table' id='tabla-periodo'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>" + arrayColumnas[i]+"</td>";
    }
    contenido += "</tr>";
    contenido += "</thead>";

    contenido += "<tbody>";
    var llaves = Object.keys(data[0]);
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            contenido += "<td>"+data[i][llaves[j]]+"</td>";
        }
        var llaveID = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='EditarPeriodo(" + data[i][llaveID] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='EliminarPeriodo(" + data[i][llaveID] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    $("#tablaPeriodo").html(contenido);
}

function EditarPeriodo(id) {
    if (id == 0) {
        LimpiarCampos();
    } else {
        $.get("Periodo/ObtenerEntidad/?id=" + id, function (data) {
            document.getElementById("txtIdPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("txtNombrePeriodo").value = data[0].NOMBRE;
            document.getElementById("datepickerInicio").value = data[0].FECHAINICIO;
            document.getElementById("datepickerFin").value = data[0].FECHAFIN;
        });
    }
}

function EliminarPeriodo(id) {
    if (confirm("Desea Eliminar el registro?") == 1) {

        var frm = new FormData();
        frm.append("IIDPERIODO",id);
        $.ajax(
            {
                type: "POST",
                url: "Periodo/EliminarPeriodo",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    } else {
                        alert("Se eliminó correctamente");
                        CargarTabla();
                    }
                }
            });
    }
}

function LimpiarCampos() {
    var controles = document.getElementsByClassName("borrar");
    var numControles = controles.length;

    for (var i = 0; i <= numControles; i++) {
        controles[i].value = "";
    }
}

function AgregarPeriodo() {
    var frm = new FormData();
    var idPeriodo = document.getElementById("txtIdPeriodo").value;
    var nombre = document.getElementById("txtNombrePeriodo").value;
    var fechaInicio = document.getElementById("datepickerInicio").value;
    var fechaFin = document.getElementById("datepickerFin").value;

    frm.append("IIDPERIODO", idPeriodo);
    frm.append("NOMBRE", nombre);
    frm.append("FECHAINICIO", fechaInicio);
    frm.append("FECHAFIN", fechaFin);
    frm.append("BHABILITADO", 1);
    if (confirm("Desea realizar la operacion?") == 1) {
        $.ajax({
            type: "POST",
            url: "Periodo/GuardarDatos",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    CargarTabla();
                    LimpiarCampos();
                    alert("Se ejecutó correctamente");
                    document.getElementById("btnCancelar").click();
                } else {
                    alert("Ocurrió un error!");
                }
            }
        });
    }
}





























//$('#datepickerInicio').datepicker(
//    {
//        dateFormat: "dd/mm/yy",
//        changeMonth: true,
//        changeYear: true
//    }
//);
//$('#datepickerFin').datepicker(
//    {
//        dateFormat: "dd/mm/yy",
//        changeMonth: true,
//        changeYear: true
//    }
//);

//$.get("Periodo/ListarPeriodo", function (data) {
//    crearListadoPeriodo(data);

//});


//function crearListadoPeriodo(data) {
//    var contenido = "";
//    contenido += "<table class='table' id='tbPeriodo'>";
//    contenido += "<thead class='thead-dark'>";
//    contenido += "<tr>";
//    contenido += "<td> Id Periodo</td>";
//    contenido += "<td>Nombre</td>";
//    contenido += "<td>Fecha Inicio</td>";
//    contenido += "<td>Fecha Fin</td>";
//    contenido += "<td>Operaciones</td>";
//    contenido += "</tr>";
//    contenido += "</thead>";

//    contenido += "<tbody>";
//    for (var i = 0; i < data.length; i++) {
//        contenido += "<tr>";
//        contenido += "<td>" + data[i].IIDPERIODO + "</td>";
//        contenido += "<td>" + data[i].NOMBRE + "</td>";
//        contenido += "<td>" + data[i].FECHAINICIO + "</td>";
//        contenido += "<td>" + data[i].FECHAFIN + "</td>";
//        contenido += "<td>";
//        contenido += "<button class='btn btn-primary' data-toggle='modal' data-target='#Edit'><i class='glyphicon glyphicon-edit'></i></button> ";
//        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
//        contenido += "</td>";
//        contenido += "</tr>";
//    }
//    contenido += "</tbody>";
//    contenido += "</table>";
//    document.getElementById("tablaPeriodo").innerHTML = contenido;
//    $("#tbPeriodo").DataTable({
//        searching: false
//    });
//}

//var nombrePeriodo = document.getElementById("txtBuscarPeriodo");
//nombrePeriodo.onkeyup = function () {
//    var nombre = document.getElementById("txtBuscarPeriodo").value;
//    $.get("Periodo/BuscarPeriodoNombre/?nombrePeriodo=" + nombre, function (data) {
//        crearListadoPeriodo(data);
//    });
//}