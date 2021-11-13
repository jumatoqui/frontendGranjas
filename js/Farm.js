function autoTraeCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://150.230.85.250:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionFarm() {
    $.ajax({
        url:"http://150.230.85.250:8080/api/Farm/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaFarm(response);
        }

    });

}

function pintarRespuestaFarm(response){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE GRANJA</th><th>DIRECCIÓN</th><th>EXTENSION</th><th>DESCRIPCION</th><th>NOMBRE CATEGORIA</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].address + "</td>";
        myTable+="<td>" + response[i].extension + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "ui yellow button" onclick="borrar(' + response[i].id + ')">Borrar!</button></td>';
        myTable+='<td><button class = "ui yellow button" onclick="cargarDatosFarm(' + response[i].id + ')">Editar!</button></td>';
        myTable+='<td><button class = "ui yellow button" onclick="actualizar(' + response[i].id + ')">Actualizar!</button></td>'
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaFarm").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosFarm(id) {
    $.ajax({
        dataType: 'json',
        url:"http://150.230.85.250:8080/api/Farm/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#namegranjas").val(item.name);
            $("#address").val(item.address);
            $("#extension").val(item.extension);
            $("#descriptiongranjas").val(item.description);
            $("#select-category").val(item.category.id)

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarFarm() {

    if($("#namegranjas").val().length == 0 || $("#address").val().length == 0 || $("#extension").val().length == 0 || $("#descriptiongranjas").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#namegranjas").val(),
                address: $("#address").val(),
                extension: $("#extension").val(),
                description: $("#descriptiongranjas").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://150.230.85.250:8080/api/Farm/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    traerInformacionFarm();
                    $("#miListaFarm").empty();
                    $("#namegranjas").val("");
                    $("#address").val("");
                    $("#extension").val("");
                    $("#descriptiongranjas").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://150.230.85.250:8080/api/Farm/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaFarm").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#namegranjas").val().length == 0 || $("#address").val().length == 0 || $("#extension").val().length == 0 || $("#descriptiongranjas").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#namegranjas").val(),
            address: $("#address").val(),
            extension: $("#extension").val(),
            description: $("#descriptiongranjas").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://150.230.85.250:8080/api/Farm/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaFarm").empty();
                traerInformacionFarm();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#miListaFarm").empty();
                $("#id").val("");
                $("#namegranjas").val("");
                $("#address").val("");
                $("#extension").val("");
                $("#descriptiongranjas").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
