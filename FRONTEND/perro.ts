/// <reference path="mascota.ts" />
namespace Entidades{
    export class Perro extends Mascota{
        public raza : string;
        public nombre : string;
        public pathFoto : string;

        public constructor(tamanio : string, edad : number, precio : number, nombre : string, raza : string, path : string){
            super(tamanio, edad, precio);
            this.nombre = nombre;
            this.raza = raza;
            this.pathFoto = path;
        }
        public static Perro(jdog : any){
            return new Perro(jdog.tamanio, jdog.edad, jdog.precio, jdog.nombre, jdog.raza, jdog.path);
        }
        public ToJSON() : JSON{
            return JSON.parse(this.ToString());
        }
        public ToString() : string{
            return '{' + super.ToString() + '"raza":"' + this.raza + '","nombre":"' +
                     this.nombre + '","pathFoto":"' + this.pathFoto + '"}';
        }
    }
}