
ListaCursos();

function ListaCursos() {
    $.get("Curso/listarCursos", function (data) {
        crearListado(["Id Curso", "Nombre", "Descripcion"], data);
    });
}

var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
    var nombre = document.getElementById("txtBuscar").value;

    $.get("Curso/BuscarCursoNombre/?nombre=" + nombre, function (data) {
        crearListado(data);
    });
}


function crearListado(arrayColumnas,data) {
    var contenido = "";

    contenido += "<table id='tablaCurso' class='table'>";
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
            contenido += "<td>" + data[i][llaves[j]] + "</td>";
        }
        var llaveID = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='EditarCurso(" + data[i][llaveID] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='EliminarCurso(" + data[i][llaveID]+")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    var llave = Object.keys(data[0]);
    var llaveID = llave[0];
    
    contenido += "</tbody>";

    contenido += "</table>";

    document.getElementById("divTabla").innerHTML = contenido;
    $("#tablaCurso").DataTable(
        {
            searching: false
        });
}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    document.getElementById("txtBuscar").value = "";
    $.get("Curso/listarCursos", function (data) {
        crearListado(data);
    });
}

function EditarCurso(id) {
    if (id == 0) {
        LimpiarCampos();
    } else {
        $.get("Curso/RecuperarDatos/?id=" + id, function (data) {
            document.getElementById("txtIdCurso").value = data[0].IIDCURSO;
            document.getElementById("txtNombreCurso").value = data[0].NOMBRE;
            document.getElementById("txtDescripcionCurso").value = data[0].DESCRIPCION;
        });
    }
}


function LimpiarCampos() {
    var controles = document.getElementsByClassName("borrar");
    var numControles = controles.length;

    for (var i = 0; i < numControles; i++) {
        controles[i].value = "";
    }
}

function datosObligatorios() {
    var exito = true;
    var controles = document.getElementsByClassName("obligatorio");
    var numControles = controles.length;

    for (var i = 0; i < numControles; i++) {
        if (controles[i].value == "") {
            exito = false;
            controles[i].parentNode.classList.add("error");
        } else {
            controles[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}

        
function AgregarCurso() {
    if (datosObligatorios() == true) {
        var frm = new FormData();
        var id = document.getElementById("txtIdCurso").value;
        var nombre = document.getElementById("txtNombreCurso").value;
        var descripcion = document.getElementById("txtDescripcionCurso").value;

        frm.append("IIDCURSO", id);
        frm.append("NOMBRE", nombre);
        frm.append("DESCRIPCION", descripcion);
        frm.append("BHABILITADO", 1);
        if (confirm("¿Desea realmente guardar los datos?") == 1) {
            $.ajax({
                type: "POST",
                url: "Curso/AgregarCurso",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        ListaCursos();
                        LimpiarCampos();
                        alert("Se ejecuto correctamente");
                        document.getElementById("btnCancelar").click();
                    } else {
                        alert("Ocurrio un error");
                    }
                }
            });
        }
    }
   
}

function EliminarCurso(id) {
    var frm = new FormData();
    frm.append("IIDCURSO", id);
    if (confirm("Seguro que desea Eliminar el registro?") == 1) {
        $.ajax({
            type: "POST",
            url: "Curso/EliminarCurso",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    alert("Se eliminó correctamente");
                    document.getElementById("btnCancelar").click();
                    ListaCursos();
                } else {
                    alert("Ocurrió un error");
                }
            }
        });
    }
}