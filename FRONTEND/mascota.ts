namespace Entidades{
    export class Mascota{
        public tamaño : string;
        public edad : number;
        public precio : number;

        public constructor(t : string, e : number, p : number){
            this.tamaño = t;
            this.edad = e;
            this.precio = p;
        }
        public ToString() : string {
            return '"tamanio":"' + this.tamaño + '",' +
                   '"edad":' + this.edad + ',' +
                   '"precio":' + this.precio + ',';
        }
    }
}
