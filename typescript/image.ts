namespace jBB{
	export class jImage{
		private path:string;
		private img:HTMLImageElement = new Image();
		private imgData;
		private loaded:boolean = false;
		private ctx:Core;
		private frame = { num : 1, width : 0, height: 0, start: 1, current: 1 };
		private hndl = { x : 0, y : 0 };
		private autoMidHandle:boolean = false;
		private localMidHandle:boolean = false;

		constructor(width:number, height:number, context:Core)
		constructor(path:string, cellWidth:number, cellHeight:number, startCell:number, cellCount:number, context:Core)
		constructor(arg01?:any, arg02?:any, arg03?:any, arg04?:any, arg05?:any, arg06?:any){
			this.ctx = arg06;

			this.autoMidHandle = this.ctx.data.global.autoMidHandle;

			if(typeof(arg01) === "string"){
				// load image
				this.img.src = arg01;

				if(typeof(arg02) === "number") this.frame.width = arg02;
				if(typeof(arg03) === "number") this.frame.height = arg03;
				this.frame.start = arg04;
				this.frame.num = arg05;
				this.ctx = arg06;

				this.img.onload = (data) => {
					this.loaded = true;
					
					if(this.frame.num === 1){
						this.frame.width = this.img.width;
						this.frame.height = this.img.height;
					} 
				}

			}else if(typeof(arg01) === "number"){
				// create a new image
				this.img.width = arg01;
				this.img.height = arg02;
				this.ctx = arg03;
			}
		}

		public draw = (x:number, y:number) => {
			if(this.loaded == true){
				var sx:number = 0; var sy:number = 0;
				var dx = x - this.hndl.x; var dy = y - this.hndl.y;

				if(this.autoMidHandle == true || this.localMidHandle){ dx -= this.frame.width / 2; dy -= this.frame.height / 2; }
				
				this.ctx.data.canvas.ctx.drawImage(this.img, sx, sy, this.frame.width, this.frame.height, dx, dy, this.frame.width, this.frame.height);
			}
		}

		public handle = (x:number, y:number) => {
			if(x === undefined){
				return this.hndl;
			}else{
				this.hndl = { x : x, y : y };
			}
		}

		public midHandle = (value:boolean) => { this.localMidHandle = value; }

		public imageDataObject = ():ImageData => {
			// create image data
			this.ctx.clearBackbuffer();
			this.ctx.data.canvas.bbf.drawImage(this.img, 0, 0);
			this.imgData = this.ctx.data.canvas.bbf.getImageData(0, 0, this.img.width, this.img.height);

			return this.imgData;
		}
	}
}