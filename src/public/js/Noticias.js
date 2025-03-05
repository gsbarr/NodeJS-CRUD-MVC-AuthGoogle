async function listar_noticias(){

    console.log(document.cookie);
    //alert(document.cookie);

    const respuesta = await fetch("http://localhost:3000/noticias/listar"
        , {
            method: "GET", // *GET, POST, PUT, DELETE, etc.    
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            //credentials: 'include',
            mode: 'no-cors' 
        });
    
    console.log(respuesta.status);

    try{
        datos = await respuesta.json(); 
        console.log(datos);

        datos.forEach(noti => {

            nuevaNoticia = `<div class="row">
                    <div class="col s12">
                        <div class="card-panel noticias">
                            <h6 class="fecha">${noti.fechahora}</h6>
                            <h2 class="titulo"> ${noti.titulo}</h2>
                            <span class="texto">${noti.texto}
                            </span>
                        </div>
                    </div>
                </div>
            `;
    
            seccionNoticias = document.querySelector(".SeccionNoticias");
            seccionNoticias.innerHTML += nuevaNoticia;
    
        });
    }
    catch(err) {
        console.log("código de respuesta: " + respuesta.status);

        div =  `<div class="row">
                    <div clas="col s12">
                        <div class="card-panel noticias">
                        <h6> NO ESTÁ AUTORIZADO A VER LOS DATOS </h6>
        `;

        seccionNoticias = document.querySelector(".SeccionNoticias");
        seccionNoticias.innerHTML += div;
    }
    
}


async function buscarNoticiaPorID(){
    inputIDNoticia = document.querySelector("#idNoticia");
    inputAutor = document.querySelector("#autorNoticia");
    inputTitulo = document.querySelector("#tituloNoticia");
    inputTexto = document.querySelector("#textoNoticia");
    console.log("ENTRA FETCH");

    const respuesta = await fetch("http://localhost:3000/noticias/porID/" + inputIDNoticia.value
        , {
            method: "GET", // *GET, POST, PUT, DELETE, etc.    
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            }
        });

    datos = await respuesta.json(); 


    console.log(respuesta.status);
    
    if(respuesta.status != "404")
    {
        console.log("CON DATOS");
        inputIDNoticia.value= datos._id;
        inputAutor.value = datos.autor;
        inputTitulo.value = datos.titulo;
        inputTexto.value = datos.texto;
    } else{
        console.log("SIN DATOS");
        alert("Datos no encontrados");
    }
}


async function buscarNoticiaPorTitulo(){
    inputIDNoticia = document.querySelector("#idNoticia");
    inputAutor = document.querySelector("#autorNoticia");
    inputTitulo = document.querySelector("#tituloNoticia");
    inputTexto = document.querySelector("#textoNoticia");
    
    const respuesta = await fetch("http://localhost:3000/noticias/porTitulo/" + inputTitulo.value
        , {
            method: "GET", // *GET, POST, PUT, DELETE, etc.    
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            }
        });

    datos = await respuesta.json(); 


    console.log(datos);

    if (datos.length > 0){
        console.log("Con datos");
        datos.forEach(noti => {
            inputIDNoticia.value= noti._id;
            inputAutor.value = noti.autor;
            inputTitulo.value = noti.titulo;
            inputTexto.value = noti.texto;
        });
    }
    else{
        console.log("SIN DATOS");
        alert("Datos no encontrados");
    }
    
    
}



async function  crearNoticia(){

    inputAutor = document.querySelector("#autorNoticia");
    inputTitulo = document.querySelector("#tituloNoticia");
    inputTexto = document.querySelector("#textoNoticia");

    let datos = {};
    let codigoResp;

  
    
    console.log(JSON.stringify(datos));
    console.log("creando usuario... ");
    // Petición HTTP
    try{   
        respuesta = fetch('http://localhost:3000/noticias/crear', {  // REEMPLAZAR ACA POR LA RUTA CORRESPONDIENTE
            
            method: 'POST', //metodo HTTP -- REEMPLAZAR POR EL METODO CORRESPONDIENTE
            headers: {   //aca decimos que devuelve un JSON
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: "no-cors",
            body: new URLSearchParams({    // ACA VAN LOS DATOS
                'autor': inputAutor.value,
                'titulo': inputTitulo.value,
                'texto': inputTexto.value
              })   
        })
        .then(response => {
            codigoResp = response.status;
            console.log("Respuesta de petición: "+response.status);

            //recargamos la pagina
            if(codigoResp >= 200 && codigoResp < 300){
            alert("Usuario registrado correctamente");
            console.log("Recargando pagina...")
            location.reload();
            }
        });
    }
    catch (error){
        //hubo un error
        console.log("Error en registro: " + error);
    }

}


async function  modificarNoticia(){

    inputIDNoticia = document.querySelector("#idNoticia");
    inputAutor = document.querySelector("#autorNoticia");
    inputTitulo = document.querySelector("#tituloNoticia");
    inputTexto = document.querySelector("#textoNoticia");
    
    if(inputIDNoticia.value && inputAutor && inputTitulo && inputTexto){


        let codigoResp;
        console.log("ID: "+ inputIDNoticia.value +" / Autor: "+ inputAutor.value + " / titulo: "+ inputTitulo.value + " / Texto: "+inputTexto.value);

        
        
        console.log("ACtualizando noticia... ");
        // Petición HTTP
        try{   
            respuesta = fetch('http://localhost:3000/noticias/actualizar/' + inputIDNoticia.value
            , {  // REEMPLAZAR ACA POR LA RUTA CORRESPONDIENTE
                
                method: 'PUT', //metodo HTTP -- REEMPLAZAR POR EL METODO CORRESPONDIENTe
                headers: {   //aca decimos que devuelve un JSON
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({    // ACA VAN LOS DATOS
                    'autor': inputAutor.value,
                    'titulo': inputTitulo.value,
                    'texto': inputTexto.value
                  })   
            })
            .then(response => {
                codigoResp = response.status;
                console.log("Respuesta de petición: "+response.status);

                //recargamos la pagina
                if(codigoResp >= 200 && codigoResp < 300){
                alert("Noticia actualizada correctamente");
                console.log("Recargando pagina...")
                location.reload();
                }
            });
        }
        catch (error){
            //hubo un error
            console.log("Error: " + error);
        }

    }
    else{
        alert("Buscar primero una noticia");
    }

}


async function  eliminarNoticia(){

    inputIDNoticia = document.querySelector("#idNoticia");
    inputAutor = document.querySelector("#autorNoticia");
    inputTitulo = document.querySelector("#tituloNoticia");
    inputTexto = document.querySelector("#textoNoticia");
    
    if(inputIDNoticia.value){

        let datos = {};
        let codigoResp;

    

        // Armamos el JSON con los datos del registro
        datos.autor = inputAutor.value;
        //datos.last_name = inputLastName.value;
        datos.titulo = inputTitulo.value;
        datos.texto = inputTexto.value;
        
        console.log(JSON.stringify(datos));
        console.log("Eliminando noticia... ");
        // Petición HTTP
        try{   
            respuesta = fetch('http://localhost:3000/noticias/eliminar/' + inputIDNoticia.value
            , {  // REEMPLAZAR ACA POR LA RUTA CORRESPONDIENTE
                
                method: 'DELETE', //metodo HTTP -- REEMPLAZAR POR EL METODO CORRESPONDIENTe
                headers: {   //aca decimos que devuelve un JSON
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)     //Acá van los datos del registro    
            })
            .then(response => {
                codigoResp = response.status;
                console.log("Respuesta de petición: "+response.status);

                //recargamos la pagina
                if(codigoResp >= 200 && codigoResp < 300){
                alert("Noticia eliminada correctamente");
                console.log("Recargando pagina...")

                inputIDNoticia.value = "";
                inputAutor.value = "";
                inputTitulo.value = "";
                inputTexto.value = "";

                location.reload();
                }
            });
        }
        catch (error){
            //hubo un error
            console.log("Error: " + error);
        }

    }
    else{
        alert("Especificar un ID");
    }

}