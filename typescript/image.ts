namespace jBB{
	export class jImage{
		private path:string;
		private img:HTMLImageElement = new Image();
		private loaded:boolean = false;
		private context:jBB.Core;
		private frames:number = 1;
		private frameWidth:number;
		private frameHeight:number;

		constructor(context:jBB.Core)
		constructor(path:string, context:jBB.Core)
		constructor(width:number, height:number, context:jBB.Core)
		constructor(arg01?:any, arg02?:any, arg03?:any){
			if(arg01 instanceof jBB.Core){
				this.context = arg01;
			}else if(typeof(arg01) === "string"){
				// load image
				this.img.src = arg01;
				this.context = arg02;
				this.img.onload = (data) => {
					this.loaded = true;
				}

			}else if(typeof(arg01) === "number"){
				// create a new image
				this.img.width = arg01;
				this.img.height = arg01;
				this.context = arg03;
			}
		}
	}
}