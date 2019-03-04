let jBBContext = {
	context : undefined
};

function Graphics(width:number = 640, height:number = 480){
	jBBContext.context = new jBB.Core(width, height, 0);
}

function Cls(){
	jBBContext.context.cls();
}

function ClsColor(red:number = 0, green:number = 0, blue:number = 0){
	jBBContext.context.clsColor(red, green, blue);
}

function Color(red:number = 255, green:number = 255, blue:number = 255, alpha:number = 1.0){
	jBBContext.context.color(red, green, blue, alpha);
}

function GraphicsWidth(){
	return jBBContext.context.graphicsWidth();
}

function GraphicsHeight(){
	return jBBContext.context.graphicsHeight();
}

function Rect(x:number, y:number, width:number, height:number, filled:number = 1){
	let f:boolean = true;
	if(filled !== 1) f = false;
	jBBContext.context.rect(x, y, width, height, filled);
}

function Line(startX:number, startY:number, endX:number, endY:number){
	jBBContext.context.line(startX, startY, endX, endY);
}

function LoadImage(path):jBB.jImage{
	return jBBContext.context.loadImage(path);
}