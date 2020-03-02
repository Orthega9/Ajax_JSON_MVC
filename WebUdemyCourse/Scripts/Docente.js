
ListarD();
ListarComboModalidad();
$("#txtFechaContrato").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);

$.get("Alumno/ListarSexo", function (data) {
    LlenarCombo(data, document.getElementById("cboSexoPopUp"), true);

});

function ListarD() {
    $.get("Docente/ListarDocente", function (data) {
        CrearListado(["Id Docente", "Nombre", "A. Paterno", "A. Materno", "E-mail"], data);
    });
}

function CrearListado(arrayColumnas, data) {
    var resultado = "";

    resultado += "<table id='tb-Docente' class='table' >";
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
        resultado += "<button class='btn btn-primary' onclick='abrirModalD(" + data[i][llaveID] + ")'  data-toggle='modal' data-target='#myModal' ><i class='glyphicon glyphicon-edit'></i></button> ";
        resultado += "<button class='btn btn-danger' onclick='Eliminar(" + data[i][llaveID] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        resultado += "</td>";
        resultado += "</tr>";
    }


    resultado += "</tbody>";
    resultado += "</table>";
    document.getElementById("tbDocente").innerHTML = resultado;
    $("#tb-Docente").DataTable(
        {
            searching: false
        });
}

function ListarComboModalidad() {
    $.get("Docente/ListarModalidadContrato", function (data) {
        LLenarCombo(data, document.getElementById("cboModalidad"), true);
        LLenarCombo(data, document.getElementById("cboModalidadContrato"), true);
    });
}

function LLenarCombo(data, control, seleccione) {
    var contenido = ""; 
    if (seleccione == true) {
        contenido += "<option value=''>---Seleccione---</option>";
    }
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" +data[i].IDD + "'>";
            contenido += data[i].NOMBRE;
            contenido += "</option>";
        }
    
    control.innerHTML = contenido;
}

var cboModalidad = document.getElementById("cboModalidad");
cboModalidad.onchange = function () {
    var idModalidad = document.getElementById("cboModalidad").value;

    if (idModalidad == "") {
        ListarD();
    } else {
        $.get("Docente/FiltrarDocenteModalidad/?idModalidad=" + idModalidad, function (data) {

            CrearListado(["Id Docente", "Nombre", "A. Paterno", "A. Materno", "E-mail"], data);
        });
    }
}

function LimpiarCamposD() {
    var controles = document.getElementsByClassName("borrar");
    var numControles = controles.length;
    for (var i = 0; i < numControles; i++) {
        controles[i].value = "";
    }
}

function Eliminar(id) {
    $.get("Docente/EliminarDocente/?id=" + id, function(data) {
        if (data == 0) {
            alert("Ocurrio un error! :( ");
        } else {
            alert("Se elimino correctamente");
            ListarD();
        }
    });
}

function abrirModalD(id) {
    if (id == 0) {
        LimpiarCamposD();
    } else {
        $.ajax({
            type: "GET",
            url: "Docente/ObtenerDocente/?id=" + id,
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
        success: function (data) {
       // $.get("Docente/ObtenerDocente/?id=" + id, function (data) {
                //alert(JSON.stringify(data));
                document.getElementById("txtIdDocente").value = data[0].IIDDOCENTE;
                document.getElementById("txtNombreDocente").value = data[0].NOMBRE;
                document.getElementById("txtAPaterno").value = data[0].APPATERNO;
                document.getElementById("txtAMaterno").value = data[0].APMATERNO;
                document.getElementById("txtDireccion").value = data[0].DIRECCION;
                document.getElementById("txtTelefonoCelular").value = data[0].TELEFONOCELULAR;
                document.getElementById("txtTelefonoFijo").value = data[0].TELEFONOFIJO;
                document.getElementById("txtEmail").value = data[0].EMAIL;
                document.getElementById("cboSexoPopUp").value = data[0].IIDSEXO;
                document.getElementById("txtFechaContrato").value = data[0].FECHA;
                document.getElementById("cboModalidadContrato").value = data[0].IIDMODALIDADCONTRATO;
                document.getElementById("imgFoto").src="data:image/png;base64,"+data[0].FOTOMOSTRAR;

            }
        });
    }
}

function AgregarDocente() {
    var frm = new FormData();

    var idDocente = document.getElementById("txtIdDocente").value;
    var Nombre = document.getElementById("txtNombreDocente").value;
    var paterno = document.getElementById("txtAPaterno").value;
    var materno = document.getElementById("txtAMaterno").value;
    var direccion = document.getElementById("txtDireccion").value;
    var celular = document.getElementById("txtTelefonoCelular").value;
    var telefono = document.getElementById("txtTelefonoFijo").value;
    var email = document.getElementById("txtEmail").value;
    var sexo = document.getElementById("cboSexoPopUp").value;
    var fechaContrato = document.getElementById("txtFechaContrato").value;
    var modalidad = document.getElementById("cboModalidadContrato").value;
    var foto = document.getElementById("imgFoto").src.replace("data:image/png;base64,","");

    frm.append("IIDDOCENTE", idDocente);
    frm.append("NOMBRE", Nombre);
    frm.append("APPATERNO", paterno);
    frm.append("APMATERNO", materno);
    frm.append("DIRECCION", direccion);
    frm.append("TELEFONOCELULAR", celular);
    frm.append("TELEFONOFIJO", telefono);
    frm.append("EMAIL", email);
    frm.append("IIDSEXO", sexo);
    frm.append("FECHACONTRATO", fechaContrato);
    frm.append("IIDMODALIDADCONTRATO", modalidad);
    frm.append("CADENAFOTO", foto);
    frm.append("BHABILITADO", 1);

    $.ajax({
        type: "POST",
        url: "Docente/GuardarDocente",
        data:  frm,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data == 0) {
                alert("Ocurrió un error!");
            } else {
                alert("Se ejecutó correctamente");
                ListarD();
                document.getElementById("btnCancelar").click();
            }
        }

    });
}

var btnFoto = document.getElementById("btnFoto");
btnFoto.onchange = function (e) {

    var file = document.getElementById("btnFoto").files[0];
    var reader = new FileReader();

    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("imgFoto");
            img.src = reader.result;
            alert(reader.result.replace("data:image/png;base64,",""));
        }
    }
    reader.readAsDataURL(file);
}