/**
 * @preferred
 */
namespace jBB{
	export class Core{
		public data = {
			lastID : 0,
			canvas : {
				element : null,
				ctx : null,
				id : "",
				x : 0,
				y : 0,
				width : 640,
				height : 480
			},
			
			mainLoop : "main",

			color : {
				cls : new jColor(),
				draw : new jColor(255, 255, 255, 1.0)
			},

			global : {
				autoMidHandle : false,
				globalAlpha : 1.0
			}
		};

		constructor(arg01:any, arg02:any, arg03:any){
			if(typeof(arg01) == "number"){

				// (width, height, [mainloop])
				this.data.lastID++;
				this.data.canvas.id = "jbbCanvas" + this.data.lastID;
				this.data.canvas.width = arg01;
				if(typeof(arg02) == "number") this.data.canvas.height = arg02;
				if(typeof(arg03) == "string") this.data.mainLoop = arg03;
				this.createCanvasElement();

			}else if(typeof(arg01) == "string"){

				// (canvasID, [mainLoop])
				this.data.canvas.id = arg01;
				if(typeof(arg02) == "string") this.data.mainLoop = arg02;
				this.getCanvasElement();
			}

			this.data.canvas.ctx = this.data.canvas.element.getContext('2d');
			this.data.canvas.ctx.lineWidth = 1;

			window.requestAnimationFrame(this.render);
		}

		private getCanvasElement = () => {
			this.data.canvas.element = document.getElementById(this.data.canvas.id);
		}

		private createCanvasElement = () => {
			this.data.canvas.element = document.createElement("canvas");
			this.data.canvas.element.id = this.data.canvas.id;
			this.data.canvas.element.width = this.data.canvas.width;
			this.data.canvas.element.height = this.data.canvas.height;
			this.data.canvas.element.appendChild(document.createTextNode("your browser doesn't support the canvas element"));
			document.body.appendChild(this.data.canvas.element);
		}

		private preRender = () => {
			this.data.canvas.ctx.save();
		}

		private postRender = () => {
			this.data.canvas.ctx.restore();
		}

		private render = () => {
			window.requestAnimationFrame(this.render);
			this.preRender();
			window[this.data.mainLoop]();
			this.postRender();
		}
		/**
		 * Löscht das Canvas in der eingestellten Farbe
		 */
		public cls = () => {
			this.data.canvas.ctx.fillStyle = this.data.color.cls.rgba();
			this.data.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
			this.data.canvas.ctx.fillRect(0, 0, this.data.canvas.width, this.data.canvas.height);
		}
		/**
		 * Setzt die Löschfarbe für [[cls]]()
		 * 
		 * @param r - die Rotkomponente der Farbe
		 * @param g - die Grünkomponente der Farbe
		 * @param b - die Blaukomponente der Farbe
		 */
		public clsColor = (r:number, g:number, b:number) => {
			this.data.color.cls.set(r, g, b);
		}

		public color = (r:number = 255, g:number = 255, b:number = 255, a:number = 1.0) => {
			this.data.color.draw.set(r, g, b, a);
		}

		public graphicsWidth = () => {
			return this.data.canvas.width;
		}

		public graphicsHeight = () => {
			return this.data.canvas.height;
		}

		public rect = (x:number, y:number, width:number, height:number, filled:boolean = true) => {
			if(filled){
				this.data.canvas.ctx.fillStyle = this.data.color.draw.rgba();
				this.data.canvas.ctx.fillRect(x, y, width, height);
			}else{
				this.data.canvas.ctx.strokeStyle = this.data.color.draw.rgba();
				this.data.canvas.ctx.strokeRect(x, y, width, height);
			}
		}

		public line = (startX:number, startY:number, endX:number, endY:number)  => {
			this.data.canvas.ctx.strokeStyle = this.data.color.draw.rgba();
			this.data.canvas.ctx.beginPath();
			this.data.canvas.ctx.moveTo(startX, startY);
			this.data.canvas.ctx.lineTo(endX, endY);
			this.data.canvas.ctx.stroke();
		}

		public loadImage = (path:string) => {
			var img:jImage = new jImage(path, this);
		}
	}
}