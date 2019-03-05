let jBBContext = {
	context : undefined
};
// ==== graphics ====
function Graphics(width:number = 640, height:number = 480, mainLoop:string = "main"){ jBBContext.context = new jBB.Core(width, height, mainLoop); }
function Cls(){ jBBContext.context.cls(); }
function ClsColor(red:number = 0, green:number = 0, blue:number = 0){ jBBContext.context.clsColor(red, green, blue); }
function Color(red:number = 255, green:number = 255, blue:number = 255, alpha:number = 1.0){ jBBContext.context.color(red, green, blue, alpha); }
function GraphicsWidth(){ return jBBContext.context.graphicsWidth(); }
function GraphicsHeight(){ return jBBContext.context.graphicsHeight(); }

// ==== drawing ====
function Rect(x:number, y:number, width:number, height:number, filled:number = 1){
	let f:boolean = true;
	if(filled !== 1) f = false;
	jBBContext.context.rect(x, y, width, height, filled);
}
function Line(startX:number, startY:number, endX:number, endY:number){ jBBContext.context.line(startX, startY, endX, endY); }

// ==== fonts ====
function LoadFont(path:string, name:string):jBB.jFont{ return jBBContext.context.loadFont(path, name); }
function SetFont(font:jBB.jFont, size:number = 16, bold:boolean = false, italic:boolean = false){ jBBContext.context.setFont(font, size, bold, italic); }

// ==== text ====
function DrawText(txt:string, x:number = 0, y:number = 0){ jBBContext.context.drawText(txt, x, y); }

// ==== images ====
function AutoMidHandle(value:boolean){ jBBContext.context.autoMidHandle(value); }
function LoadImage(path, cellWidth:number, cellHeight:number, startCell:number = 1, cellCount:number = 1):jBB.jImage{ return jBBContext.context.loadImage(path, cellWidth, cellHeight, startCell, cellCount); }
function DrawImage(img:jBB.jImage, x:number, y:number){ jBBContext.context.drawImage(img, x, y); }
function HandleImage(img:jBB.jImage, x:number, y:number){ img.handle(x, y); }

// ==== input ====
// ---- mouse ----
function MouseX():number{ return jBBContext.context.mouseX(); }
function MouseY():number{ return jBBContext.context.mouseY(); }
function FlushMouse(){ jBBContext.context.flushMouse(); }
function GetMouse():number[]{ return jBBContext.context.getMouse(); }

// ---- keyboard ----
function KeyDown(key:number):boolean{ return jBBContext.context.keyDown(key); }
function KeyHit(key:number):boolean{ return jBBContext.context.keyHit(key); }
function FlushKeys(){ jBBContext.context.flushKeys(); }