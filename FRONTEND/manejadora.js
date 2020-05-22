var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Mascota = /** @class */ (function () {
        function Mascota(t, e, p) {
            this.tamaño = t;
            this.edad = e;
            this.precio = p;
        }
        Mascota.prototype.ToString = function () {
            return '"tamanio":"' + this.tamaño + '",' +
                '"edad":' + this.edad + ',' +
                '"precio":' + this.precio + ',';
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
/// <reference path="mascota.ts" />
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(tamanio, edad, precio, nombre, raza, path) {
            var _this = _super.call(this, tamanio, edad, precio) || this;
            _this.nombre = nombre;
            _this.raza = raza;
            _this.pathFoto = path;
            return _this;
        }
        Perro.Perro = function (jdog) {
            return new Perro(jdog.tamanio, jdog.edad, jdog.precio, jdog.nombre, jdog.raza, jdog.path);
        };
        Perro.prototype.ToJSON = function () {
            return JSON.parse(this.ToString());
        };
        Perro.prototype.ToString = function () {
            return '{' + _super.prototype.ToString.call(this) + '"raza":"' + this.raza + '","nombre":"' +
                this.nombre + '","pathFoto":"' + this.pathFoto + '"}';
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
/// <reference path="./perro.ts" />
/// <reference path="./node_modules/@types/jquery/index.d.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Perro = Entidades.Perro;
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        /**ModificarPerro. Mostrará todos los datos del perro que recibe por parámetro (objeto JSON),
         * en el formulario, incluida la foto.
        Permitirá modificar cualquier campo, a excepción del nombre, dejarlo como de solo lectura.
        Modificar el método AgregarPerroEnBaseDatos para que cambie el comportamiento del método y
        el texto del botón de “Agregar” a “Modificar”, según corresponda.
        Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.
        Se enviará (por AJAX) hacia “./BACKEND/modificar_bd.php”, modificando la tabla de la base de
        datos y guardando la foto en “./BACKEND/fotos_modificadas”. */
        Manejadora.ModificarPerro = function (strJson) {
            var objJson = JSON.parse(strJson);
            console.log(objJson);
            $('#tamaño').val(objJson.tamanio);
            $('#edad').val(objJson.edad);
            $('#precio').val(objJson.precio);
            $('#nombre').val(objJson.nombre);
            $('#raza').val(objJson.raza);
            $('#foto').val('');
            $('#imgFoto').attr('src', './BACKEND/fotos/' + objJson.pathFoto);
        };
        /**EliminarPerro.
         * Eliminará al perro de la base de datos (por AJAX).
         * Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación,
         * mostrando nombre y raza, antes de eliminar. Refrescar el listado para visualizar los cambios. */
        Manejadora.EliminarPerro = function (strJson) {
            //console.log(strJson);
            var objJson = JSON.parse(strJson);
            if (confirm('Esta seguro que desea eliminar a ' + objJson.nombre + ', de raza ' + objJson.raza)) {
                var obj = Perro.Perro(objJson);
                var frmDta = Manejadora.PrepararFormData(obj);
                var response = Manejadora.Consultar('./BACKEND/eliminar_bd.php', frmDta);
                //console.log(response);
            }
        };
        /**VerificarExistencia.
         * Verifica que el perro que se quiere agregar (en la base de datos) no exista.
         * Para ello, comparará las edades y la raza de los perros guardados.
         * Si el perro existe, se mostrará (por consola y alert) lo acontecido.
         * Caso contrario, agregará el nuevo perro. */
        Manejadora.VerificarExistencia = function () {
            var edad = parseInt($('#edad').val().toString());
            var raza = $('#raza').val().toString();
            var agregar = true;
            $.ajax({
                async: true,
                url: './BACKEND/traer_bd.php'
            }).done(function (response) {
                var jsonArray = JSON.parse(response);
                jsonArray.forEach(function (object) {
                    if (object.raza == raza && object.edad == edad) {
                        //console.log('repetido');
                        agregar = false;
                    }
                });
                if (agregar) {
                    Manejadora.AgregarPerroEnBaseDatos();
                    //console.log('Se agrego');
                }
            });
            return false;
        };
        /**MostrarPerrosBaseDatos.
         * Recuperá (por AJAX) de la base de datos todos los perros y
         *  generará un listado dinámico (en el FRONTEND) que mostrará toda la
         * información de cada uno de los perros (incluida la foto). La foto nombrarla
         * como en el método AgregarPerroJSON. */
        Manejadora.MostrarPerrosBaseDatos = function () {
            $.ajax({
                async: true,
                url: './BACKEND/traer_bd.php'
            }).done(function (response) {
                var count = 0;
                $('#divTabla').empty();
                var table = document.createElement('table');
                table.setAttribute('style', 'border: 1px solid black;padding: 5px');
                var jsonArray = JSON.parse(response);
                Object.keys(jsonArray).forEach(function (campo) {
                    var tr = Manejadora.TableRow(jsonArray[campo]);
                    if (count % 2 == 0) {
                        tr.setAttribute('style', 'background-color:lightgray');
                    }
                    table.appendChild(tr);
                    count++;
                });
                document.getElementById('divTabla').appendChild(table);
            });
        };
        /**AgregarPerroEnBaseDatos. Tomará los distintos valores desde la página index.html (incluida la foto),
         * creará un objeto de tipo Perro, que se enviará (por AJAX) hacia “./BACKEND/agregar_bd.php”.
         * En esta página se guardará al perro en la tabla perros de la base mascotas_bd y la foto en “./BACKEND/fotos”. */
        Manejadora.AgregarPerroEnBaseDatos = function () {
            var objeto = Manejadora.CrearObjeto();
            var frmDta = Manejadora.PrepararFormData(objeto);
            var respuesta = Manejadora.Consultar('./BACKEND/agregar_bd.php', frmDta);
            objeto.pathFoto = respuesta;
            //console.log(respuesta);
        };
        /**AgregarPerroJSON. Tomará los distintos valores desde la página index.html (incluida la foto),
         * creará un objeto de tipo Perro, que se enviará (por AJAX) hacia “./BACKEND/agregar_json.php”.
         * En esta página se guardará al perro en el archivo “./BACKEND/perro.json” y la foto en “./BACKEND/fotos”.
         * La foto nombrarla con el nombre más fecha, hora, minutos y segundos (boby.20181209_031000.jpg) */
        Manejadora.AgregarPerroJSON = function () {
            var perritou = new Perro($('#tamaño').val().toString(), parseInt($('#edad').val().toString()), parseFloat($('#precio').val().toString()), $('#nombre').val().toString(), $('#raza').val().toString(), "foo");
            //perritou.pathFoto = perritou.nombre + "." + Manejadora.GetDate() + ".png";
            var frmDta = new FormData();
            var foto = $('#foto')[0];
            frmDta.append('cadenaJson', perritou.ToString());
            frmDta.append('foto', foto.files[0]);
            $.ajax({
                async: true,
                type: 'POST',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                url: './BACKEND/agregar_json.php',
                data: frmDta
            }).done(function (resultado) {
                resultado.ok ? perritou.pathFoto = resultado.pathFoto : perritou.pathFoto = null;
                //console.log(perritou.ToString());
            }).fail(function (resultado) {
                //console.log(resultado);
            });
        };
        Manejadora.CrearObjeto = function () {
            var perritou = new Perro($('#tamaño').val().toString(), parseInt($('#edad').val().toString()), parseFloat($('#precio').val().toString()), $('#nombre').val().toString(), $('#raza').val().toString(), "foo");
            //console.log(perritou.ToString());
            return perritou;
        };
        Manejadora.PrepararFormData = function (objeto) {
            var frmDta = new FormData();
            var foto = $('#foto')[0];
            frmDta.append('cadenaJson', objeto.ToString());
            //console.log(objeto.toString());
            frmDta.append('foto', foto.files[0]);
            return frmDta;
        };
        Manejadora.Consultar = function (destineUrl, frmDta) {
            var res = null;
            $.ajax({
                async: true,
                type: 'POST',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                url: destineUrl,
                data: frmDta
            }).done(function (resultado) {
                resultado.ok ? res = resultado.pathFoto : res = null;
                return res;
            }).fail(function () {
                return res;
            });
            return res;
        };
        /**MostrarPerrosJSON. Recuperará (por AJAX), desde “./BACKEND/traer_json.php”,
         * todos los perros del archivo .json y generará un listado dinámico (en el FRONTEND)
         * que mostrará toda la información de cada uno de los perros (incluida la foto). */
        Manejadora.MostrarPerrosJSON = function () {
            $.ajax({
                async: true,
                url: './BACKEND/traer_json.php'
            }).done(function (response) {
                $('#divTabla').empty();
                var table = Manejadora.Table(response);
                document.getElementById('divTabla').appendChild(table);
            });
        };
        Manejadora.GetDate = function () {
            var d = new Date().toJSON();
            var utc = d.slice(0, 10).replace(/-/g, '');
            utc += '_' + d.slice(12, 19).replace(/:/g, '');
            //console.log(utc);
            return utc;
        };
        Manejadora.Table = function (response) {
            var count = 0;
            var table = document.createElement('table');
            table.setAttribute('style', 'border: 1px solid black;padding: 5px');
            var jsonArray = JSON.parse(response);
            Object.keys(jsonArray).forEach(function (campo) {
                var tr = Manejadora.TableRow(jsonArray[campo]);
                if (count % 2 == 0) {
                    tr.setAttribute('style', 'background-color:lightgray');
                }
                table.appendChild(tr);
                count++;
            });
            return table;
        };
        Manejadora.TableRow = function (objeto) {
            var tr = document.createElement('tr');
            Object.keys(objeto).forEach(function (keys) {
                var td = document.createElement('td');
                td.setAttribute('style', 'width: 100px;border: 1px solid black;padding= 3px');
                if (keys.toString() == 'pathFoto') {
                    var img = document.createElement('img');
                    img.setAttribute('src', './BACKEND/fotos/' + objeto[keys]); //cambiar path acorde al proyecto
                    img.setAttribute('style', 'width:100px;height:100px');
                    td.appendChild(img);
                }
                else {
                    var text = document.createTextNode(objeto[keys]);
                    td.appendChild(text);
                }
                //console.log(keys);
                tr.appendChild(td);
            });
            ///Botones mod elim
            var id = JSON.stringify(objeto);
            //console.log(id);
            var btnMod = document.createElement('button');
            btnMod.setAttribute('onclick', "PrimerParcial.Manejadora.ModificarPerro('" + id + "')"); //modificar llamado
            btnMod.appendChild(document.createTextNode('Modificar'));
            var btnElim = document.createElement('button');
            btnElim.setAttribute('onclick', "PrimerParcial.Manejadora.EliminarPerro('" + id + "')"); //modificar llamado
            btnElim.appendChild(document.createTextNode('Eliminar'));
            tr.appendChild(btnMod);
            tr.appendChild(btnElim);
            ///
            return tr;
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
