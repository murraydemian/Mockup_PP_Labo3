/// <reference path="./perro.ts" />
/// <reference path="./node_modules/@types/jquery/index.d.ts" />

namespace PrimerParcial{    
    import Perro = Entidades.Perro;

    export class Manejadora{
        /**ModificarPerro. Mostrará todos los datos del perro que recibe por parámetro (objeto JSON), 
         * en el formulario, incluida la foto.
        Permitirá modificar cualquier campo, a excepción del nombre, dejarlo como de solo lectura.
        Modificar el método AgregarPerroEnBaseDatos para que cambie el comportamiento del método y 
        el texto del botón de “Agregar” a “Modificar”, según corresponda.
        Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.
        Se enviará (por AJAX) hacia “./BACKEND/modificar_bd.php”, modificando la tabla de la base de 
        datos y guardando la foto en “./BACKEND/fotos_modificadas”. */
        public static ModificarPerro(strJson : string){
            let objJson = JSON.parse(strJson);
            console.log(objJson);
            $('#tamaño').val(objJson.tamanio);
            $('#edad').val(objJson.edad);
            $('#precio').val(objJson.precio);
            $('#nombre').val(objJson.nombre);
            $('#raza').val(objJson.raza);
            $('#foto').val('');
            $('#imgFoto').attr('src', './BACKEND/fotos/' + objJson.pathFoto);
            let obj = Manejadora.CrearObjeto();
            let frmDta = Manejadora.PrepararFormData(obj);
            let response = Manejadora.Consultar('./BACKEND/modificar_bd.php', frmDta);
        }
        /**EliminarPerro. 
         * Eliminará al perro de la base de datos (por AJAX). 
         * Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación, 
         * mostrando nombre y raza, antes de eliminar. Refrescar el listado para visualizar los cambios. */
        public static EliminarPerro(strJson : string){
            //console.log(strJson);
            let objJson = JSON.parse(strJson);
            if(confirm('Esta seguro que desea eliminar a ' + objJson.nombre + ', de raza ' + objJson.raza)){
                let obj : Perro = Perro.Perro(objJson);
                let frmDta = Manejadora.PrepararFormData(obj);
                let response = Manejadora.Consultar('./BACKEND/eliminar_bd.php', frmDta);
                //console.log(response);
            }
        }
        /**VerificarExistencia. 
         * Verifica que el perro que se quiere agregar (en la base de datos) no exista. 
         * Para ello, comparará las edades y la raza de los perros guardados. 
         * Si el perro existe, se mostrará (por consola y alert) lo acontecido. 
         * Caso contrario, agregará el nuevo perro. */
        public static VerificarExistencia(){
            let edad = parseInt($('#edad').val().toString());
            let raza = $('#raza').val().toString();
            let agregar = true;
            $.ajax({
                async: true,
                url: './BACKEND/traer_bd.php'
            }).done(function(response){
                let jsonArray = JSON.parse(response);
                jsonArray.forEach(object=>{
                    if(object.raza == raza && object.edad == edad){
                        //console.log('repetido');
                        agregar = false;
                    }
                });
                if(agregar){
                    Manejadora.AgregarPerroEnBaseDatos();
                    //console.log('Se agrego');
                }
            })
            return false;
        }
        /**MostrarPerrosBaseDatos. 
         * Recuperá (por AJAX) de la base de datos todos los perros y
         *  generará un listado dinámico (en el FRONTEND) que mostrará toda la 
         * información de cada uno de los perros (incluida la foto). La foto nombrarla 
         * como en el método AgregarPerroJSON. */
        public static MostrarPerrosBaseDatos(){
            $.ajax({
                async: true,
                url: './BACKEND/traer_bd.php'
            }).done(function(response){
                let count = 0;
                $('#divTabla').empty();
                let table = document.createElement('table');
                table.setAttribute('style', 'border: 1px solid black;padding: 5px');
                let jsonArray = JSON.parse(response);
                Object.keys(jsonArray).forEach(campo =>{
                    let tr = Manejadora.TableRow(jsonArray[campo]);
                    if(count % 2 == 0){ tr.setAttribute('style', 'background-color:lightgray')}
                    table.appendChild(tr);
                    count++;
                });
                document.getElementById('divTabla').appendChild(table);
            })
        }
        /**AgregarPerroEnBaseDatos. Tomará los distintos valores desde la página index.html (incluida la foto), 
         * creará un objeto de tipo Perro, que se enviará (por AJAX) hacia “./BACKEND/agregar_bd.php”. 
         * En esta página se guardará al perro en la tabla perros de la base mascotas_bd y la foto en “./BACKEND/fotos”. */
        public static AgregarPerroEnBaseDatos(){
            
            let objeto : Perro = Manejadora.CrearObjeto();
            let frmDta = Manejadora.PrepararFormData(objeto);
            let respuesta = Manejadora.Consultar('./BACKEND/agregar_bd.php', frmDta);
            objeto.pathFoto = respuesta;
            //console.log(respuesta);
        }
        /**AgregarPerroJSON. Tomará los distintos valores desde la página index.html (incluida la foto),
         * creará un objeto de tipo Perro, que se enviará (por AJAX) hacia “./BACKEND/agregar_json.php”. 
         * En esta página se guardará al perro en el archivo “./BACKEND/perro.json” y la foto en “./BACKEND/fotos”. 
         * La foto nombrarla con el nombre más fecha, hora, minutos y segundos (boby.20181209_031000.jpg) */
        public static AgregarPerroJSON(){
            let perritou : Perro = new Perro(
                        $('#tamaño').val().toString(),
                        parseInt($('#edad').val().toString()),
                        parseFloat($('#precio').val().toString()),
                        $('#nombre').val().toString(),
                        $('#raza').val().toString(),
                        "foo");
            //perritou.pathFoto = perritou.nombre + "." + Manejadora.GetDate() + ".png";
            let frmDta = new FormData();
            let foto : any= $('#foto')[0];
            frmDta.append('cadenaJson', perritou.ToString());
            frmDta.append('foto', foto.files[0]);
            $.ajax({
                async: true,
                type: 'POST',
                dataType: 'json',
                cache : false,
                contentType: false,
                processData: false,
                url: './BACKEND/agregar_json.php',
                data: frmDta
            }).done(function(resultado){
                resultado.ok ? perritou.pathFoto = resultado.pathFoto : perritou.pathFoto = null;
                //console.log(perritou.ToString());
            }).fail(function(resultado){
                //console.log(resultado);
            });
        }
        public static CrearObjeto() : Perro{
            let perritou : Perro = new Perro(
                $('#tamaño').val().toString(),
                parseInt($('#edad').val().toString()),
                parseFloat($('#precio').val().toString()),
                $('#nombre').val().toString(),
                $('#raza').val().toString(),
                "foo");
            //console.log(perritou.ToString());
            return perritou;
        }
        public static PrepararFormData(objeto : Perro){
            let frmDta = new FormData();
            let foto : any= $('#foto')[0];
            frmDta.append('cadenaJson', objeto.ToString());
            //console.log(objeto.toString());
            frmDta.append('foto', foto.files[0]);
            return frmDta;
        }
        public static Consultar(destineUrl : string, frmDta : FormData) : string{
            let res : string = null;
            $.ajax({
                async: true,
                type: 'POST',
                dataType: 'json',
                cache : false,
                contentType: false,
                processData: false,
                url: destineUrl,
                data: frmDta
            }).done(function(resultado){
                resultado.ok ? res = resultado.pathFoto : res = null;
                return res;
            }).fail(function (){
                return res;
            });
            return res;
        }
        /**MostrarPerrosJSON. Recuperará (por AJAX), desde “./BACKEND/traer_json.php”, 
         * todos los perros del archivo .json y generará un listado dinámico (en el FRONTEND) 
         * que mostrará toda la información de cada uno de los perros (incluida la foto). */
        public static MostrarPerrosJSON(){
            $.ajax({
                async: true,
                url: './BACKEND/traer_json.php'
            }).done(function(response){
                $('#divTabla').empty();
                let table = Manejadora.Table(response);
                document.getElementById('divTabla').appendChild(table);
            });
        }
        private static GetDate(){
            let d : string = new Date().toJSON();
            let utc : string = d.slice(0, 10).replace(/-/g, '');
            utc += '_' + d.slice(12, 19).replace(/:/g, '');
            //console.log(utc);
            return utc;   
        }
        private static Table(response) : HTMLTableElement{
            let count = 0;
            let table = document.createElement('table');
            table.setAttribute('style', 'border: 1px solid black;padding: 5px');
            let jsonArray = JSON.parse(response);
            Object.keys(jsonArray).forEach(campo =>{
                let tr = Manejadora.TableRow(jsonArray[campo]);
                if(count % 2 == 0){ tr.setAttribute('style', 'background-color:lightgray')}
                table.appendChild(tr);
                count++;
            });
            return table;
        }
        private static TableRow(objeto){
            let tr = document.createElement('tr');
            Object.keys(objeto).forEach(keys =>{
                let td = document.createElement('td');
                td.setAttribute('style', 'width: 100px;border: 1px solid black;padding= 3px');
                if(keys.toString() == 'pathFoto'){
                    let img = document.createElement('img');
                    img.setAttribute('src', './BACKEND/fotos/' + objeto[keys]);//cambiar path acorde al proyecto
                    img.setAttribute('style', 'width:100px;height:100px');
                    td.appendChild(img);
                }else{
                    let text = document.createTextNode(objeto[keys]);
                    td.appendChild(text);
                }
                //console.log(keys);
                tr.appendChild(td);
            });
            ///Botones mod elim
            let id =  JSON.stringify(objeto);
            //console.log(id);
            let btnMod = document.createElement('button');
            btnMod.setAttribute('onclick', "PrimerParcial.Manejadora.ModificarPerro('" + id + "')");//modificar llamado
            btnMod.appendChild(document.createTextNode('Modificar'));
            let btnElim = document.createElement('button');
            btnElim.setAttribute('onclick' , "PrimerParcial.Manejadora.EliminarPerro('" + id + "')");//modificar llamado
            btnElim.appendChild(document.createTextNode('Eliminar'));
            tr.appendChild(btnMod);
            tr.appendChild(btnElim);
            ///
            return tr;
        }
    }
}