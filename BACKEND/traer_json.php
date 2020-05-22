<?php
    //abro perro json para recuperarlos
    $a = fopen("./perro.json","r");

    $arrayObj=array();
    $datos='';
    while(!feof($a)){
        $datos= trim(fgets($a));    //obtener la linea
        if($datos==""){ //si no esta vacia
            continue;
        }
        $obj = json_decode($datos);
        array_push($arrayObj, $obj);
    }
    fclose($a);

    echo json_encode($arrayObj);
?>