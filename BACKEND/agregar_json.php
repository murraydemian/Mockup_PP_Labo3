<?php
        //recibo la info para agregar en el json
        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $objJson = json_decode($cadenaJSON);
        
        //abro el archivo perro json para escribirlo
        $ar = fopen("./perro.json", "a");
        $extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);  //obtengo la extension para el nombre
        $destino = $objJson->nombre ."." . date("Gis") . "." . $extension;

        $objJson->pathFoto= $destino;   //recupero el path
        $cadenaJSONNombrePath = json_encode($objJson);  //lo paso como cadena de json para guardarlo en el archivo
        $escrt = fwrite($ar, $cadenaJSONNombrePath . "\r\n");
        fclose($ar);  

        //recibo la imagen para guardarla en fotos     
        $resultado = new \stdClass();
        $resultado->ok = false;      
        if(move_uploaded_file($_FILES["foto"]["tmp_name"], "fotos/". $destino)) //y asi poder guardar la foto con su nombre
        {
            if($escrt > 0){
                $resultado->ok = true;
                $resultado->pathFoto=$destino;  //le devolemos el path nuevo, ya que al haberle cambiado el nombre, hay que actualizar el path
            }
        }  

        echo json_encode($resultado);   //mando un ok si se pudo agregar el televisor y mover la foto
?>