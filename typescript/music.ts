namespace jBB{
    export class jMusic{
        private music:any;
        private loaded:boolean = false;

        constructor(filename:string = "", autoPlay:boolean = true, loop:boolean = true){
            if(filename !== ""){
                this.load(filename);
            }
        }

        public load(filename:string, autoPlay:boolean = true, loop:boolean = true){
            this.music = new Audio(filename);
        }

        public play = () => {
            this.music.play();            
        }
    }
}