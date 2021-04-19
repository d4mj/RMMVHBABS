/*:
 * @plugindesc 简易帧动画编辑器
 * @author 第四梦境
 * @help 
 * 第四梦境编为在RMMV里做动作游戏而编写的简易帧动画编辑器，可以生成特定格式的json动画数据，放置data目录下，
 * 可以通过d4mj_rmmv_HBABS_BASE插件调用该数据。
 * 作者:第四梦境
 * 利用规约：
 * rpg maker mv 简易帧动画编辑器，MIT协议发布，即可以商用、可以修改
 * 
 */
SceneManager._screenWidth = 528;
SceneManager._screenHeight = 432;
SceneManager._boxWidth = 528;
SceneManager._boxHeight = 432;

//Input.keyMapper = {};
Input.gamepadMapper = {};

Graphics.fs = require("fs");
Graphics.path = require("path");
$dataFramesAnimationKSH = {};
$CZDHZZ = {"Name":"","Cut":"","FIndex":0,"Direction":2};
$QJSZ = {"SFXSPZK":true,"PZKFZ":[],"CZMS":"选择","CPZKXZSL":-1};
$DIALOG = [];

$CZMS = {
	"选择":null,
	"生成矩形碰撞框":[],
	"生成三角形碰撞框":[],
	"生成圆形碰撞框":[]
}

$db64img = [
//0、关闭
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAOtJREFUSIm91r0JwzAQhuFXGiEDmCwSMKncZQeDpzKYLJDepcGbeIw0ThEI8o+kO9nKVwsedNwdZx5XO49TSdv15ExTV9yKATtOJbdioKmr7Ng4ldi268mJuljb9ViAXOgaA75gDnQPW4Bnoj5sA56BhrBd8Agaw7xgCirBgqAGlWJRUIJqMBEYQrUYgHk937Po5QoA1JgadFFAjYGwpGdGBbolTV0OYnDdIKnLQQT6ujEFjYKx1teiQVA6ZxrUC2qHWorugikbRIpuwFRMii7Ao5gE/YFnYTHU5sBCqLnY+5wDc+N+yPz71P8A9WUvQH8/4ecAAAAASUVORK5CYII=",
//1、选择
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAASxJREFUeJzt28ENwjAQBdEBUUQaSQspOi2kEbqAUyQkbraT2ZV3TlxAP09wsCUewIeJewHsx9veobStC097hF0B2APsCsAeYFcA9gC7ArAH2BWAPcCuAOwBdtMDvHo/YFuXrvfbR/FuAGh/iF68EU3/EygAe4BdAdgD7ArAHmBXAPYAuwKwB9gVgD3AbshpMMKprrVugN7z/LYu6p2A/hPYj7f6DdIBwEUIAQAeQhgAcBBCAcD9COEA4F6EkABwH0JYALgHITQAXI8QHgCuRUgBANchpAGAaxBSAcB4hHQA8I9wvm6BGXIfYPSLcL5uOVan/Ab81vPwkBjgfOjeC5W0ACMeHhIDjLpKSwsw6h4xLcCoCsAeYFcA9gC7ArAH2BWAPcBueoAHk/99/gttC1tjdu2HwgAAAABJRU5ErkJggg==",
//2、矩形
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAANNJREFUeJzt29EJwzAMBmGlZIgskhUydFfoIt2i3SEyfAT9N4A5DvRgZG9V9avB7FVV789XexCu86iXltAkgBbQJIAW0CSAFtAkgBbQJIAW0CSAFtCMD7B3D7jOY4XHbbpX+XaAFRJ3WRF//AgkgBbQJIAW0CSAFtAkgBbQJIAW0CSAFtAkgBbQJIAW0CSAFtAkgBbQJIAW0CSAFtAkgBbQJIAW0CzZDusVeYd2gKc/tR8/AgmgBTQJoAU0CaAFNAmgBTQJoAU0CaAFNOMDbDX8+/wfC1AOh+8OKQ4AAAAASUVORK5CYII=",
//3、圆形
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAWBJREFUeJztm9txwyAURK8zLkKNqAUV7RbciLtIvpghnjiJxN57orDn0wa8LMtYPHSJiPeYmGtExO3+oHUgbOsSb7QIGhtAC6CxAbQAGhtAC6CxAbQAGhtAC6CZ3oBr9Q9u6/Lt99ULsxID+k7/1ME9ZRWkGtA6s6cjfdkj9feSZsC2LsPCW31FW6+QG5Axarf7Iy0NUgMyRyorDbK/wczO9/RpUDD9c4DEgKrRbyhTMGxAdecbKhM8BUYqU6PfUKTACaAF0Bw2gI5/Y3QaOAG0ABobQAugsQG0ABobQAugOWyAemPiKKMPZE4ALYBmyAB6GijWI07AaANUClSrUUkCqk1QLsU9BVQNVaVAvREjPRrLPMM7xdlgRM4Z3qlOhxuKNJz6fkDE5zQ8f/aKf3VDpPHVrY/flK2g/JLUX9hK7/FzAC2AxgbQAmhsAC2AxgbQAmhsAC2AZnoDLjH56/Mf/0eV2fnLGccAAAAASUVORK5CYII=",
//4、三角形
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAWBJREFUeJztm8sNg0AMRE1EETRCCxRNCzRCF8lpLpGA/dgeEPOuhF37jZ1TMpjZ117MaGa2bju7DgrLPNmHXQQbCWAXwEYC2AWwkQB2AWwkgF0AGwlgXr7Mky3zxCyBJ2CZJ1u33dZtp0rQCjAuRfqAOQXpAv6bBywJWoHMy47SB4wpSBNw1TzIlqAVyLikNH2QOQWagOgLatMHWVMQKqC1eZAhQSsQdXBv+iB6CkIEeDUPIiVoBbwP9E4fRE2Bq4Co5kGEBK2A10HR6QPvKXARkNU88JSgFeg9IDt94DUFXQJYzQMPCVqB1hfZ6YPeKWgScJfmQY8ErUDtC3dLH7ROgSag5sN3TR+0TEGxgLs3D2olaAVKPvSU9EHNFFwKeFrzoFSCVuDs4VPTByVTMB49wIvsX3F5cBbkoYAnJ1+DvgPYBbCRAHYBbCSAXQAbCWAXwEYC2AWweb2AwV7+9/kfDsqdPL6Q998AAAAASUVORK5CYII=",
//5、点
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAASpJREFUeJztm8ERgjAQRReHImiEFijaFmzELvSUCzOOELL/Oe5/Nw+an8diNhmYIuIVhZkjIu6PJ50DYVuXuNEhaCyADkBjAXQAGgugA9BYAB2AxgLoADQWQA6+rUts60JGcAVYAB2AxgLoADQWQAegKS9gJgbdNz/tM3E6LRXwresjRMhugTMtr7I9lgjomZBKQrqAKxNRSCi/CqQKGHEFs6ugfAV0L4PKf+ojY/Uuna6A3i8eMT6qSjIbo/IVYAGZPz6idLP3Ba6A7AGuXEHFrlBSAT0TUW2JZbfAmQkpzwOkByJtYp/6g78/EWrsRZAPanoVoAPQWAAdgMYC6AA0FkAHoEEaocYvvKlSvgIsgA5AYwF0ABoLoAPQWAAdgMYC6AA0UxR/ff4N7qM8IG+aAC8AAAAASUVORK5CYII=",
//6、透明背景
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERJREFUWIXt1cEJwDAMBEE7pDCVptLUmVPEGfKZ+y8M+mh391nBqirJ1xPVFwYAAAAAAADwpv98ZqL+9wsAAAAAAAAAfOInBoFAMEILAAAAAElFTkSuQmCC"
];

//默认行走动画
$DWFA = {
	"id":0,"name":"","processingpriority":1,"isloop":false,
	"animatedframe":[
	{"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""},
	{"characterIndex":0,"pattern":2,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""},
	{"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""},
	{"characterIndex":0,"pattern":0,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""}
]};

//默认待机动画
$DSFA = {
    "id":0,"name":"","processingpriority":1,"isloop":false,
    "animatedframe":[
    {"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""},
    {"characterIndex":0,"pattern":2,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""},
	{"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""},
	{"characterIndex":0,"pattern":0,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
	"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0},"ismy":false,"ismx":false,"ffunc":""}
]};
		
//新建动画
$XJDH = {
	"id":0,"name":"","processingpriority":1,"isloop":false,
	"animatedframe":[
	{"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},
	"ofxy":{"sdmx":true,"sdmy":true,"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},
	"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}
	,"ismy":false,"ismx":false,"ffunc":""}
]};

Graphics.ftroattfpc = function (ax,ay,x1,y1,x2,y2,x3,y3) {
	var LA2 = Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2);
	var LB2 = Math.pow((x3 - x1),2) + Math.pow((y3 - y1),2);
	var LC2 = Math.pow((x3 - x2),2) + Math.pow((y3 - y2),2);
	var LB = Math.sqrt(LB2);
	var rlc = Math.acos((LB2 + LA2 - LC2) / (2 * Math.sqrt(LB2) * Math.sqrt(LA2)));
	var radian = Math.atan2((y2 - y1),(x2 - x1));
	var cx = (x3 + x1) / 2 - ax;
	var cy = (y3 + y1) / 2 - ay;
	var hh = LB * Math.sin(rlc) / 2;
	var hw = LB * Math.cos(rlc) / 2;
	//alert("angle:" + (180/Math.PI*radian) + " cx:" + cx + " cy:" + cy + " hh:" + hh + " hw:" + hw);
	return {"ro":radian,"cx":cx,"cy":cy,"hh":hh,"hw":hw}
}

//在画布上绘制OBB矩形框
Bitmap.drawOBB = function(ctx,ro,cx,cy,hw,hh,fc) {
	var sra = Math.sin(ro); var cra = Math.cos(ro);
	
	//求hh和hw的水平分量和垂直分量
	var hwox  = hw * cra; var hwoy = hw * sra;
	var hhox  = hh * -sra; var hhoy = hh * cra;

	//求矩形四条边的中心点坐标
	var zxd0x = cx - hwox; var zxd0y = cy - hwoy;
	var zxd1x = cx - hhox; var zxd1y = cy - hhoy;
	var zxd2x = cx + hwox; var zxd2y = cy + hwoy;
	var zxd3x = cx + hhox; var zxd3y = cy + hhoy;
	
	//求矩形四个顶点的坐标
	var dd0x = zxd1x - hwox; var dd0y = zxd1y - hwoy;
	var dd1x = zxd1x + hwox; var dd1y = zxd1y + hwoy;
	var dd2x = zxd3x + hwox; var dd2y = zxd3y + hwoy;
	var dd3x = zxd3x - hwox; var dd3y = zxd3y - hwoy;
		
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.moveTo(dd0x,dd0y);
	ctx.lineTo(dd1x,dd1y);
	ctx.lineTo(dd2x,dd2y);
	ctx.lineTo(dd3x,dd3y);
	ctx.lineTo(dd0x,dd0y);
	ctx.fillStyle = fc || 'rgba(20,250,40,0.32)';
	ctx.closePath();
	ctx.fill();
	ctx.stroke(); 
	
}

//在画布上绘制三角形
Bitmap.drawTriangle = function(ctx,x1,y1,x2,y2,x3,y3,fc) {
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x1,y1);
	ctx.fillStyle = fc || 'rgba(250,0,0,0.32)';
	ctx.closePath();
	ctx.fill();
	ctx.stroke(); 
}

//在画布上绘制圆形
Bitmap.drawCircular = function(ctx,x,y,r,fc) {
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fillStyle = fc || 'rgba(100,60,240,0.32)';
	ctx.closePath();
	ctx.fill();
	ctx.stroke(); 
}

//在画布上绘制点
Bitmap.drawPoint = function(ctx,x,y,fc) {
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.arc(x,y,8,0,2*Math.PI);
	ctx.moveTo(x,y-2);
	ctx.lineTo(x,y-12);
	ctx.moveTo(x+2,y);
	ctx.lineTo(x+12,y);
	ctx.moveTo(x,y+2);
	ctx.lineTo(x,y+12);
	ctx.moveTo(x-2,y);
	ctx.lineTo(x-12,y);
	ctx.fillStyle = fc || 'rgba(20,40,250,0.2)';
	ctx.closePath();
	ctx.fill();
	ctx.stroke(); 
}

//移动选择索引--前
Graphics.mdxzsyq = function (i,l) {
	return i > 0 && i < l - 1 ? i + 1 : i == l - 1 && i == 0 ? -1 : i == 0 ? 1 : i - 1
}

//查找元素索引
Graphics.eivof = function (arr,k,v) {
	var index = -1;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][k] == v) {index = i; break;};
	}
	return index;
}

//移动数组元素
Graphics.marri = function (arr,oi,ni) {
	if (oi == ni) return arr;
	if (ni >= arr.length) ni = arr.length;
	if (ni <= 0) ni = 0;
	var ti = arr[oi];
	if (ni > oi) {arr.splice(ni+1,0,ti);arr.splice(oi,1);};
	if (ni < oi) {arr.splice(oi,1);arr.splice(ni,0,ti);};
	return arr;
}

//获取修改Key后的JSON
Graphics.gcky = function (j,o,n) {
	if (o == n) return j;
	var tj = j;
	j = JSON.parse(JSON.stringify(j));
	for (var key in j) {
		j[key] = null;
	}
	j = JSON.parse(JSON.stringify(j).replace("\""+o+"\":","\""+n+"\":"));//alert(JSON.stringify(j));
	for (var key in j) {
		if (key == n) j[n] = tj[o];else j[key] = tj[key];
	}
	//console.log(JSON.stringify(j));
	return j;
}

Input._shouldPreventDefault = function(keyCode) {
    return false;
};

TouchInput._setupEventHandlers = function() {
    Graphics._BKIVB.addEventListener('mousedown', this._onMouseDown.bind(this));
    Graphics._BKIVB.addEventListener('mousemove', this._onMouseMove.bind(this));
    Graphics._BKIVB.addEventListener('mouseup', this._onMouseUp.bind(this));
    Graphics._BKIVB.addEventListener('wheel', this._onWheel.bind(this));
    Graphics._BKIVB.addEventListener('touchstart', this._onTouchStart.bind(this));
    Graphics._BKIVB.addEventListener('touchmove', this._onTouchMove.bind(this));
    Graphics._BKIVB.addEventListener('touchend', this._onTouchEnd.bind(this));
    Graphics._BKIVB.addEventListener('touchcancel', this._onTouchCancel.bind(this));
    Graphics._BKIVB.addEventListener('pointerdown', this._onPointerDown.bind(this));
};

if(Graphics.fs.existsSync("data/FramesAnimation.json")){
	var fa = JSON.parse(Graphics.fs.readFileSync("data/FramesAnimation.json").toString());
	$dataFramesAnimationKSH = fa["dataFramesAnimation"];
	$QJSZ = fa.qjsz || {"SFXSPZK":true,"PZKFZ":[{"name":"hitbox","color":'rgba(20,30,240,0.32)'},{"name":"damagebox","color":'rgba(250,10,20,0.32)'}],"CZMS":"选择","CPZKXZSL":-1};
} else {
	$QJSZ = {"SFXSPZK":true,"PZKFZ":[{"name":"hitbox","color":'rgba(20,30,240,0.32)'},{"name":"damagebox","color":'rgba(250,10,20,0.32)'}],"CZMS":"选择","CPZKXZSL":-1};
}
//alert(Graphics.fs.readdirSync("img/characters"));

Graphics.savejsonfile = function (jsonf) {
	try {
		if (!Graphics.fs.existsSync("data")) {
			Graphics.fs.mkdirSync("data");
        } 
        Graphics.fs.writeFileSync("data/" + "FramesAnimation.json", jsonf);
		Graphics._TISD.GShowModal("生成文件成功\n");
        return true;
    } catch (e) {
        console.error(e);
		Graphics._TISD.GShowModal("生成文件失败：\n");
        return false;
    }
}

Graphics._updateErrorPrinter = function() {
    this._errorPrinter.width = this._width * 0.9;
    this._errorPrinter.height = 40;
    this._errorPrinter.style.textAlign = 'center';
    this._errorPrinter.style.textShadow = '1px 1px 3px #000';
    this._errorPrinter.style.fontSize = '20px';
    this._errorPrinter.style.zIndex = 20;
    this._centerElement(this._errorPrinter);
};

Graphics._createBKIVB = function() {
	
	/*this.openfile = document.createElement("input");
    this.openfile.type = "file";
    this.openfile.onchange = function(){alert(Graphics.openfile.value.split("\\"));};
	this.openfile.click();*/
	
    this._BKIVB = document.createElement('div');
    this._BKIVB.id = 'BKIVB';
	this._BKIVB.style.margin = "0px";
	this._BKIVB.style.padding = "0px";
	this._BKIVB.style.border = "0px";
	document.body.style.backgroundColor = 'rgb(180,200,220)';
	document.body.style.overflow = "hidden";
	//this._BKIVB.style.overflow = "hidden";
    this._updateBKIVB();
    document.body.appendChild(this._BKIVB);
};

Graphics._updateBKIVB = function() {
    this._BKIVB.width = 1280;
    this._BKIVB.height = 720;
	this._BKIVB.Gwidth = 1280;
    this._BKIVB.Gheight = 720;
    this._BKIVB.style.zIndex = 21;
    this._centerElement(this._BKIVB);
	//this._updateMIBTS();
};

//创建可等比缩放的节点
Graphics._createWHTLRBElement = function(e,w,h,t,l,o,f,pgw,pgh) {
    var te = document.createElement(e);
	te.style.overflow = o || "auto";
	te.style.padding = "0px";
	te.style.position = 'absolute';
    te.style.margin = '0px';
	te.Gwidth = w;te.Gheight = h;te.Gfontsize = f || 16;
	te.Gtop = t;te.Gleft = l;
	
	Graphics._SetEWHTLRB(te,pgw,pgh);
	
	return te;
};

Graphics._resetGETL = function(te,t,l) {
	te.Gtop = t;te.Gleft = l;
	this._SetEWHTLRB(te,te.parentNode.Gwidth || 1280,te.parentNode.Gheight || 720);
};

//设置节点宽高位置等
Graphics._SetEWHTLRB = function(ce,pgw,pgh) {
	var tw = ce.Gwidth * this._realScale;
	var th = ce.Gheight * this._realScale;
    ce.style.top = ce.Gtop  * this._realScale + 'px';
    ce.style.left = ce.Gleft * this._realScale + 'px';
    ce.style.right = ((pgw || 1280) - (ce.Gleft + ce.Gwidth)) * this._realScale + 'px';
    ce.style.bottom = ((pgh || 720) - (ce.Gtop + ce.Gheight)) * this._realScale + 'px';
    ce.style.width = tw + 'px';
    ce.style.height = th + 'px';
	ce.style.fontSize = ce.Gfontsize * this._realScale + "px";//ce.style.lineHeight = ce.style.fontSize;ce.style.letterSpacing = "0px";
};

//创建可跟随鼠标移动的对话框
Graphics._createCanMoveDialog = function(name,title,w,h,t,l,o,f) {
   Graphics[name] = this._createWHTLRBElement('dialog',w,h+30,t,l,o,f);
   $DIALOG.push({"name":name,"dialog":Graphics[name]});
   document.body.appendChild(Graphics[name]);
   Graphics[name].GShowModal = function(){this.showModal();};
   Graphics[name].GCloseModal = function(){this.close();};
   Graphics[name].onxztpting = false;
   var btldiv = this._createWHTLRBElement('div',w,30,0,0,"hidden");
	btldiv.style.backgroundColor = 'rgb(255,255,0)';
	btldiv.style.borderBottom = "1px solid #000";
	btldiv.innerText = title;
	btldiv.onmousedown = function(e){
		Graphics[name].onxztpting = true;
		Graphics[name].Glept = (e.pageY - this._BKIVB.offsetTop) / this._realScale;
		Graphics[name].Glepl = (e.pageX - this._BKIVB.offsetLeft) / this._realScale;
		}.bind(this);
	Graphics[name].onmousemove = function(e){
		if (Graphics[name].onxztpting)
		{
			Graphics[name].Gtop += (e.pageY - this._BKIVB.offsetTop) / this._realScale - Graphics[name].Glept;
			Graphics[name].Gleft += (e.pageX - this._BKIVB.offsetLeft) / this._realScale - Graphics[name].Glepl;
			Graphics[name].Glept = (e.pageY - this._BKIVB.offsetTop) / this._realScale;
		    Graphics[name].Glepl = (e.pageX - this._BKIVB.offsetLeft) / this._realScale;
			this._updateDIALOGWHTLRB(Graphics[name]);
		}
		}.bind(this);
			
	Graphics[name].onmouseup = function(){Graphics[name].onxztpting = false;}.bind(this);
	this._appendCElement(Graphics[name],btldiv);
	var gbdiv = this._createWHTLRBElement('div',30,28,1,w-31,"auto",16);
	//gbdiv.style.background = 'url('+'img/system/' + 'gbdiv' +'.png) top left / contain no-repeat';
	gbdiv.style.background = 'url('+$db64img[0]+') top left / contain no-repeat';
	gbdiv.onclick = function(){Graphics[name].GCloseModal();};
	this._appendCElement(btldiv,gbdiv);
};

Graphics._createDIVTEXT = function(w,h,t,l,o,tex,f,pgw,pgh) {
	var te = this._createWHTLRBElement("div",w,h,t,l,o,f,pgw,pgh);
	te.innerText = tex;
	return te;
};

Graphics._createMaskDIV = function(pd,w,h,t,l) {
	pd.MaskDIV = this._createWHTLRBElement('div',w || pd.Gwidth,h || pd.Gheight,t || 0,l || 0);
	pd.MaskDIV.style.backgroundColor = 'rgba(205,205,205,0.5)';
	pd.MaskDIV.style.visibility = "hidden";//visible,hidden
	pd.MaskDIV.style.zIndex = 99;
	this._appendCElement(pd,pd.MaskDIV);
	return pd.MaskDIV;
};

//移动div子元素
Graphics.mdivi = function (div,oi,ni) {
	if (oi == ni) return div.children;
	if (ni >= div.children.length) ni = div.children.length;
	if (ni <= 0) ni = 0;
	var ti = div.children[oi];
	if (ni > oi) {div.insertBefore(ti,div.children[ni].nextSibling);/*div.removeChild(div.children[oi]);*/};
	if (ni < oi) {/*div.removeChild(div.children[oi]);*/div.insertBefore(ti,div.children[ni]);};
	return div.children;
}

Graphics._appendCElement = function(p,c) {
    p.appendChild(c);
};

Graphics._updateCElement = function(ce, pgw = 1280, pgh = 720) {
	Graphics._SetEWHTLRB(ce,pgw,pgh);
	for (var i = 0; i < ce.childNodes.length; i++)
	{
		if (ce.childNodes[i].style)
		{
			Graphics._updateCElement(ce.childNodes[i],ce.Gwidth,ce.Gheight);
		}
	}
};

Graphics._updateDIALOGWHTLRB = function(dialog) {
	var tw = dialog.Gwidth * this._realScale;
	var th = dialog.Gheight * this._realScale;
		
    dialog.style.position = 'absolute';
    dialog.style.margin = 'auto';
	//dialog.style.border = '0px';
    dialog.style.top = dialog.Gtop  * this._realScale + 'px';
    dialog.style.left = dialog.Gleft * this._realScale + 'px';
    dialog.style.right = (1280 - (dialog.Gleft + dialog.Gwidth)) * this._realScale + 'px';
    dialog.style.bottom = (720 - (dialog.Gtop + dialog.Gheight)) * this._realScale + 'px';
    dialog.style.width = tw + 'px';
    dialog.style.height = th + 'px';
	dialog.style.fontSize = dialog.Gfontsize * this._realScale + "px";
	for (var i = 0; i < dialog.childNodes.length; i++)
	{
		if (dialog.childNodes[i].style)
		{
			Graphics._updateCElement(dialog.childNodes[i],dialog.Gwidth,dialog.Gheight);
		}
	}
};

Graphics._createDHLB = function() {
    this._DHLB = this._createWHTLRBElement('div',145,708,4,2,"hidden");
    this._DHLB.id = 'DHLB';
	this._DHLB.style.backgroundColor = 'rgb(255,255,0)';
	this._DHLB.style.border = "1px solid #000";
    this._BKIVB.appendChild(this._DHLB);
	//alert(JSON.stringify($dataFramesAnimationKSH));
	
	this._DHLB.jysymb = function(){
		Graphics._MYXB.MaskDIV.style.visibility = "visible";
		Graphics._KZMB.MaskDIV.style.visibility = "visible";
		Graphics._XXMB.MaskDIV.style.visibility = "visible";
		Graphics._DHZMB.MaskDIV.style.visibility = "visible";
		Graphics._CZMBL.MaskDIV.style.visibility = "visible";
		Graphics._CZMBR.MaskDIV.style.visibility = "visible";
	}
	
	this._DHLB.qysymb = function(){
		Graphics._MYXB.MaskDIV.style.visibility = "hidden"
		Graphics._KZMB.MaskDIV.style.visibility = "hidden";
		Graphics._XXMB.MaskDIV.style.visibility = "hidden";
		Graphics._DHZMB.MaskDIV.style.visibility = "hidden";
		Graphics._CZMBL.MaskDIV.style.visibility = "hidden";
		Graphics._CZMBR.MaskDIV.style.visibility = "hidden";
	}
	
	var bt = this._createWHTLRBElement('button',140,40,2,2,"auto",16);
	bt.innerText = "新建帧动画";
	bt.onclick = function(){Graphics._TPXZDIALOG.GShowModal();}
	this._appendCElement(this._DHLB,bt);
	//bt.disabled = true;//bt.disabled = false;
	
	this._DHLB.itemsDIV = this._createWHTLRBElement('div',140,654,48,2);
	this._DHLB.itemsDIV.onsichange = function (si) {
		var i = Graphics.eivof(this.children,"iname",$CZDHZZ.Name);
		if (i >= 0) this.children[i].style.backgroundColor = 'rgb(250,250,250)';
		si.style.backgroundColor = 'rgb(250,0,250)';
	};
	this._DHLB.itemsDIV.style.backgroundColor = 'rgba(0,255,255,0.5)';
	this._DHLB.itemsDIV.style.border = "1px solid #000";
	this._DHLB.itemsDIV.addCitem = function(i,key){
		Graphics._DHLB.qysymb();
		var tfsdiv = Graphics._createWHTLRBElement('div',135,20,2 + i * 24,1,"hidden",12,140,654);
		tfsdiv.style.backgroundColor = 'rgb(250,250,250)';
		tfsdiv.style.border = "1px solid #00f";
		tfsdiv.style.textAlign = "center";
		//tfsdiv.style.verticalAlign = "middle";
		tfsdiv.iname = key;
		tfsdiv.innerText = key;
		tfsdiv.iid = i;
		//tfsdiv.onclick = function(k){console.log(JSON.stringify($dataFramesAnimationKSH[k]));}.bind(this,key);
		tfsdiv.onclick = function(){
			this.parentNode.children[Graphics.eivof(this.parentNode.children,"iname",$CZDHZZ.Name)].style.backgroundColor = 'rgb(250,250,250)';
			this.style.backgroundColor = 'rgb(250,0,250)';
			$CZDHZZ.Name = this.iname;
			Graphics._CHLB.itemsDIV.refresh();
		};
		tfsdiv.cde = Graphics._createWHTLRBElement('div',32,16,1,100,"hidden",12);
		tfsdiv.cde.innerText = "删除";
		tfsdiv.cde.style.border = "1px solid #00f";
		tfsdiv.cde.style.backgroundColor = 'rgb(240,240,240)';
		tfsdiv.cde.style.visibility = "hidden";Graphics._appendCElement(tfsdiv,tfsdiv.cde);
		tfsdiv.cde.onclick = function(e){
			e.stopPropagation();
			//var r = confirm("是否确认删除？");
			//if (!r) return;
			var delf = function() {
				var p = this.parentNode;var pp = p.parentNode;
				var si = p.iname == $CZDHZZ.Name ? Graphics.mdxzsyq(p.iid,pp.children.length) : -2;
				if (si >= 0) {
					Graphics._DHLB.itemsDIV.onsichange(pp.children[si]);
					}
				$CZDHZZ.Name = si >= 0 ? pp.children[si].iname : si == -2 ? $CZDHZZ.Name : "";
				for(var j = p.iid+1;j < pp.children.length;j++){pp.children[j].iid--;Graphics._resetGETL(pp.children[j],2 + j * 24 - 24,1);}
				delete $dataFramesAnimationKSH[p.iname];
				if (si != -2) Graphics._CHLB.itemsDIV.refresh();
				pp.removeChild(p);
				if (pp.children.length == 0) {Graphics._DHLB.jysymb();};
				}
			Graphics._QRD.GShowModal(this,"确认删除？",delf);
			};
		tfsdiv.onmouseover = function(){this.cde.style.visibility = "visible";};
		tfsdiv.onmouseout = function(){this.cde.style.visibility = "hidden";};
		Graphics._appendCElement(this,tfsdiv);
		return tfsdiv;
	}
	this._appendCElement(this._DHLB,this._DHLB.itemsDIV);
	
	
	
	this._DHLB.itemsDIV.refresh = function () {
		var i = 0;
		for (var key in $dataFramesAnimationKSH) {
			this.addCitem(i,key);
			i++;
			}
	
		if(this.children.length > 0){
			$CZDHZZ.Name = this.children[0].innerText;
			this.children[0].style.backgroundColor = 'rgb(250,0,250)';
			}else{$CZDHZZ.Name = "";}
	}
	
	
	this._updateCElement(this._DHLB);
};

Graphics._createCHLB = function() {
    this._CHLB = this._createWHTLRBElement('div',145,708,4,158,"hidden");
    this._CHLB.id = 'CHLB';
	this._CHLB.style.backgroundColor = 'rgb(255,255,0)';
	this._CHLB.style.border = "1px solid #000";
    this._BKIVB.appendChild(this._CHLB);
	
	this._createCanMoveDialog("_XJCHLBMC","输入名称",100,100,0,0,"hidden");
	this._XJCHLBMC.GShowModal = function(x,y){this.Gleft = x;this.Gtop = y;Graphics._updateDIALOGWHTLRB(this);this.showModal();};
	this._XJCHLBMC.GCloseModal = function(){this.it.value = "";this.close();};
	this._XJCHLBMC.it = this._createWHTLRBElement("input",96,20,36,0,"hidden",16);
	this._XJCHLBMC.it.value = "";
	this._appendCElement(Graphics._XJCHLBMC,this._XJCHLBMC.it);
	var dbt = this._createWHTLRBElement('button',80,30,70,10);
	dbt.innerText = "确定";
	dbt.onclick = function(){//alert(getSelection().toString().length);
		var tt = Graphics._XJCHLBMC.it.value.trim();var tc = $dataFramesAnimationKSH[$CZDHZZ.Name];
		if(tt == "") {Graphics._TISD.GShowModal("请输入名称");return;};
	    if(!!tc[tt]) {Graphics._TISD.GShowModal("名称重复\n请重新输入");return;};
		if(tt.indexOf("\"")>-1 || tt.indexOf("\'")>-1 || tt.indexOf("\\")>-1) {Graphics._TISD.GShowModal("包含非法字符:\" \' \\\n请重新输入");return;};
		//var qrf = function(i,j,k){alert(i+j+k)};var qxf = function(){alert(this.it.value)};
		//Graphics._QRD.GShowModal(this.parentNode,"确认删除？",qrf,qxf,[2,3,4],null/*[]*/);
		var ti = Graphics._CHLB.itemsDIV.addCitem(Graphics._CHLB.itemsDIV.children.length,tt);
		tc[tt] = JSON.parse(JSON.stringify($XJDH));
		Graphics._CHLB.itemsDIV.onsichange(ti);
		$CZDHZZ.Cut = tt;
		Graphics._CHLB.itemsDIV.refreshzmb();
		
		};
	this._appendCElement(this._XJCHLBMC,dbt);
	
	var bt = this._createWHTLRBElement('button',140,40,2,2,"auto",16);
	bt.innerText = "新建动画剪辑";
	bt.onclick = function(e){if($CZDHZZ.Name != "") Graphics._XJCHLBMC.GShowModal(e.pageX,e.pageY);}
	this._appendCElement(this._CHLB,bt);
	//bt.disabled = true;//bt.disabled = false;
	
	this._CHLB.itemsDIV = this._createWHTLRBElement('div',140,654,48,2);
	this._CHLB.itemsDIV.style.backgroundColor = 'rgba(0,255,255,0.5)';
	this._CHLB.itemsDIV.style.border = "1px solid #000";
	this._CHLB.itemsDIV.onsichange = function (si) {
		var i = Graphics.eivof(this.children,"iname",$CZDHZZ.Cut);
		if (i >= 0) this.children[i].style.backgroundColor = 'rgb(250,250,250)';
		si.style.backgroundColor = 'rgb(250,0,250)';
	};
	this._CHLB.itemsDIV.addCitem = function(i,key){
		var tfsdiv = Graphics._createWHTLRBElement('div',135,20,2 + i * 24,1,"hidden",12);
		tfsdiv.iname = key;
		tfsdiv.innerText = key;
		tfsdiv.iid = i;
		tfsdiv.style.backgroundColor = 'rgb(250,250,250)';
		tfsdiv.style.border = "1px solid #00f";
		tfsdiv.style.textAlign = "center";
		//tfsdiv.style.verticalAlign = "middle";
		tfsdiv.onclick = function(){
			Graphics._CHLB.itemsDIV.onsichange(this);
			$CZDHZZ.Cut = this.iname;
			Graphics._CHLB.itemsDIV.refreshzmb();
		};
		//tfsdiv.onclick = function(k){alert(JSON.stringify($dataFramesAnimationKSH[$CZDHZZ.Name][k]));}.bind(Graphics,key);
		tfsdiv.cde = Graphics._createWHTLRBElement('div',32,16,1,100,"hidden",12);
		tfsdiv.cde.innerText = "删除";
		tfsdiv.cde.style.border = "1px solid #00f";
		tfsdiv.cde.style.backgroundColor = 'rgb(240,240,240)';
		tfsdiv.cde.style.visibility = "hidden";Graphics._appendCElement(tfsdiv,tfsdiv.cde);
		tfsdiv.cde.onclick = function(e){
			e.stopPropagation();
			var delf = function() {
				var p = this.parentNode;var pp = p.parentNode;
				var si = p.iname == $CZDHZZ.Cut ? Graphics.mdxzsyq(p.iid,pp.children.length) : -2;
				if (si >= 0) {
					Graphics._CHLB.itemsDIV.onsichange(pp.children[si]);
					}
				$CZDHZZ.Cut = si >= 0 ? pp.children[si].iname : si == -2 ? $CZDHZZ.Cut : "";
				for(var j = p.iid+1;j < pp.children.length;j++){pp.children[j].iid--;Graphics._resetGETL(pp.children[j],2 + j * 24 - 24,1);}
				delete $dataFramesAnimationKSH[$CZDHZZ.Name][p.iname];
				pp.removeChild(p);
				Graphics._CHLB.itemsDIV.refreshzmb();
				}
			Graphics._QRD.GShowModal(this,"确认删除？",delf);
			};
		tfsdiv.onmouseover = function(){if (this.parentNode.children.length > 1) this.cde.style.visibility = "visible";};
		tfsdiv.onmouseout = function(){this.cde.style.visibility = "hidden";};
		Graphics._appendCElement(this,tfsdiv);
		return tfsdiv;
	}
	this._CHLB.itemsDIV.refresh = function(){
		this.innerHTML = "";
		var i = 0;
	    for (var key in $dataFramesAnimationKSH[$CZDHZZ.Name]) {
			this.addCitem(i,key);
			i++;
			}
		if (i > 0) {
			$CZDHZZ.Cut = this.children[0].innerText;//alert(this.children[0].innerText);
		    this.children[0].style.backgroundColor = 'rgb(250,0,250)';
			Graphics._MYXB.refresh();
			Graphics._DHZMB.fsdiv.refresh();
		}
		//for (var key in $dataFramesAnimationKSH[""]) {}
	};
	this._CHLB.itemsDIV.refreshzmb = function(){
		Graphics._MYXB.refresh();
		Graphics._DHZMB.fsdiv.refresh();
	};
	this._appendCElement(this._CHLB,this._CHLB.itemsDIV);
	
	//this._createMaskDIV(this._CHLB);this._CHLB.MaskDIV.style.visibility = "visible";
	//this._createMaskDIV(this._CHLB,10,10,10,10)//.style.visibility = "visible";
	
	this._updateCElement(this._CHLB);
};

Graphics._createMYXB = function() {
	this._MYXB = this._createWHTLRBElement('div',320,136,4,380,"hidden");
    this._MYXB.id = 'MYXB';
	this._MYXB.style.backgroundColor = 'rgb(255,255,0)';
	this._MYXB.style.border = "1px solid #000";
    this._BKIVB.appendChild(this._MYXB);
	
	this._MYXB.refresh = function(){
		this.it.value = $CZDHZZ.Cut;
		this.yxj.value = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["processingpriority"];
		this.sfxhbf.checked = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["isloop"];
		this.fx.value = $CZDHZZ.Direction;
		this.sfxspzk.checked = $QJSZ.SFXSPZK;
	}
	
	//this._CMD = this._createWHTLRBElement('div',528,432,144,376,"hidden");
	//this._CMD.style.backgroundColor = 'rgba(205,205,205,0.5)';
	//this._CMD.style.visibility = "visible";//visible,hidden
    //this._BKIVB.appendChild(this._CMD);
	
	this._appendCElement(this._MYXB,this._createDIVTEXT(36,20,2,2,"hidden","名称:"));
	this._MYXB.it = this._createWHTLRBElement("input",96,20,2,60,"hidden",16);
	this._MYXB.it.value = $CZDHZZ.Name == "" ? "" : $CZDHZZ.Cut;
	this._MYXB.it.onkeyup = function(e){if(e.keyCode == 13) {this.blur();/*alert(this.value.trim());*/}}
	this._MYXB.it.onblur = function(e){
		var tt = this.value.trim();var tc = $dataFramesAnimationKSH[$CZDHZZ.Name];
		var gcic = Graphics._CHLB.itemsDIV.children;var gcici = Graphics.eivof(gcic,"iname",$CZDHZZ.Cut);
		if(tt == $CZDHZZ.Cut) return;
		if(tt == "") {Graphics._TISD.GShowModal("请输入名称");this.value = $CZDHZZ.Cut;return;};
	    if(!!tc[tt]) {Graphics._TISD.GShowModal("名称重复\n请重新输入");this.value = $CZDHZZ.Cut;return;};
		if(tt.indexOf("\"")>-1 || tt.indexOf("\'")>-1 || tt.indexOf("\\")>-1) {Graphics._TISD.GShowModal("包含非法字符:\" \' \\\n请重新输入");this.value = $CZDHZZ.Cut;return;};
		this.value = tt;
		gcic[gcici].innerText = tt;gcic[gcici].iname = tt;
		//tc[tt] = JSON.parse(JSON.stringify(tc[$CZDHZZ.Cut]));
		//delete tc[$CZDHZZ.Cut];
	    $dataFramesAnimationKSH[$CZDHZZ.Name] = Graphics.gcky(tc,$CZDHZZ.Cut,tt);
		$CZDHZZ.Cut = tt;
		}
	this._appendCElement(Graphics._MYXB,this._MYXB.it);
	
	this._appendCElement(this._MYXB,this._createDIVTEXT(54,20,28,2,"hidden","优先级:"));
	this._MYXB.yxj = this._createWHTLRBElement("input",96,20,28,60,"hidden",16);
	this._MYXB.yxj.type = "number";this._MYXB.yxj.value = 0;this._MYXB.yxj.max = 99;this._MYXB.yxj.min = 0;
	this._MYXB.yxj.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 2) {e.preventDefault(); return;};
		}
	this._MYXB.yxj.oninput = function(){this.value = this.value * 1;$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut].processingpriority = this.value * 1;};
	this._appendCElement(Graphics._MYXB,this._MYXB.yxj);
	
	this._appendCElement(this._MYXB,this._createDIVTEXT(100,20,54,2,"hidden","是否循环播放:"));
	this._MYXB.sfxhbf = this._createWHTLRBElement("input",20,20,54,108,"hidden",16);
	this._MYXB.sfxhbf.type = "checkbox";this._MYXB.sfxhbf.checked = false;
	this._MYXB.sfxhbf.onchange = function(){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut].isloop = this.checked;};
	this._appendCElement(Graphics._MYXB,this._MYXB.sfxhbf);
	
	this._appendCElement(this._MYXB,this._createDIVTEXT(54,24,80,2,"hidden","方向:"));
	this._MYXB.fx = this._createWHTLRBElement("select",48,24,80,60,"hidden",16);
	var fxi = this._createWHTLRBElement("option",100,24,0,0,"hidden",16);fxi.value = "8";fxi.innerText = "上";this._appendCElement(this._MYXB.fx,fxi);
	fxi = this._createWHTLRBElement("option",100,24,0,0,"hidden",16);fxi.value = "2";fxi.innerText = "下";fxi.selected = true;this._appendCElement(this._MYXB.fx,fxi);
	fxi = this._createWHTLRBElement("option",100,24,0,0,"hidden",16);fxi.value = "4";fxi.innerText = "左";this._appendCElement(this._MYXB.fx,fxi);
	fxi = this._createWHTLRBElement("option",100,24,0,0,"hidden",16);fxi.value = "6";fxi.innerText = "右";this._appendCElement(this._MYXB.fx,fxi);
	this._MYXB.fx.onchange = function(){$CZDHZZ.Direction = this.value * 1;};
	this._appendCElement(Graphics._MYXB,this._MYXB.fx);
	
	this._appendCElement(this._MYXB,this._createDIVTEXT(100,20,110,2,"hidden","显示碰撞框:"));
	this._MYXB.sfxspzk = this._createWHTLRBElement("input",20,20,110,108,"hidden",16);
	this._MYXB.sfxspzk.type = "checkbox";this._MYXB.sfxspzk.checked = true;
	this._MYXB.sfxspzk.onchange = function(){$QJSZ.SFXSPZK = this.checked;};
	this._appendCElement(Graphics._MYXB,this._MYXB.sfxspzk);
	
	this._MYXB.typzkfz = this._createWHTLRBElement('div',152,129,4,164,"hidden");
	this._appendCElement(this._MYXB.typzkfz,this._createDIVTEXT(100,20,2,36,"hidden","碰撞框分组"));
	this._MYXB.typzkfz.style.backgroundColor = 'rgb(0,255,255)';
	this._MYXB.typzkfz.style.border = "1px solid #000";
	
	this._MYXB.pzkfzaibt = this._createWHTLRBElement('div',20,12,22,66,"hidden",6);
	this._MYXB.pzkfzaibt.innerText = "+";
	this._MYXB.pzkfzaibt.style.backgroundColor = 'rgb(220,225,230)';
	this._MYXB.pzkfzaibt.style.border = "1px solid #000";
	this._MYXB.pzkfzaibt.style.textAlign = 'center';
	this._MYXB.pzkfzaibt.style.lineHeight = "10px";
	this._MYXB.pzkfzaibt.onclick = function(){Graphics._BJOBBFZZYS.GShowModal();};
	this._appendCElement(this._MYXB.typzkfz,this._MYXB.pzkfzaibt);
	
	this._MYXB.pzkfzidiv = this._createWHTLRBElement('div',146,88,38,2);
	this._MYXB.pzkfzidiv.style.backgroundColor = 'rgb(25,225,225)';
	this._MYXB.pzkfzidiv.style.border = "1px solid #000";
	this._MYXB.pzkfzidiv.addCitem = function(i,key){
		var tfsdiv = Graphics._createWHTLRBElement('div',142,20,1 + i * 22,1,"hidden",12);
		tfsdiv.iname = key;
		tfsdiv.innerText = key;
		tfsdiv.iid = i;
		tfsdiv.style.backgroundColor = Graphics._BJOBBFZZYS.xsysdiv.style.backgroundColor;
		tfsdiv.style.border = "1px solid #00f";
		tfsdiv.style.textAlign = "center";
		tfsdiv.onclick = function(){$QJSZ.CPZKXZSL = this.iid;Graphics._CZMBL.sxpzk.value = $QJSZ.PZKFZ[$QJSZ.CPZKXZSL].name;};
		tfsdiv.cde = Graphics._createWHTLRBElement('div',32,16,1,108,"hidden",12);
		tfsdiv.cde.innerText = "删除";
		tfsdiv.cde.style.border = "1px solid #00f";
		tfsdiv.cde.style.backgroundColor = 'rgb(240,240,240)';
		tfsdiv.cde.style.visibility = "hidden";Graphics._appendCElement(tfsdiv,tfsdiv.cde);
		tfsdiv.cde.onclick = function(e){
			e.stopPropagation();
			var delf = function() {
				var p = this.parentNode;var pp = p.parentNode;
				var si = p.iid == $QJSZ.CPZKXZSL ? Graphics.mdxzsyq(p.iid,pp.children.length) : -2;//alert(p.iid);
				for(var j = p.iid+1;j < pp.children.length;j++){pp.children[j].iid--;Graphics._resetGETL(pp.children[j],1 + j * 22 - 22,1);}
				var ti = si >= 0 ? pp.children[si] : si == -2 ? pp.children[$QJSZ.CPZKXZSL] : null;//alert(si);
				$QJSZ.PZKFZ.splice(p.iid,1);
				$QJSZ.CPZKXZSL = !!ti ? ti.iid : -1;
				pp.removeChild(p);
				if ($QJSZ.CPZKXZSL > -1) {Graphics._CZMBL.sxpzk.value = $QJSZ.PZKFZ[$QJSZ.CPZKXZSL].name;}
				else {Graphics._CZMBL.sxpzk.value = "无";};
				}
			Graphics._QRD.GShowModal(this,"确认删除？",delf);
			};
		tfsdiv.bje = Graphics._createWHTLRBElement('div',32,16,1,74,"hidden",12);
		tfsdiv.bje.innerText = "编辑";
		tfsdiv.bje.style.border = "1px solid #00f";
		tfsdiv.bje.style.backgroundColor = 'rgb(240,240,240)';
		tfsdiv.bje.style.visibility = "hidden";Graphics._appendCElement(tfsdiv,tfsdiv.bje);
		tfsdiv.bje.onclick = function(e){
			e.stopPropagation();
			Graphics._BJOBBFZZYS.GShowModal({"name":this.parentNode.iname,"color":this.parentNode.style.backgroundColor});
			};
		tfsdiv.onmouseover = function(){if (this.iname != "hitbox" && this.iname != "damagebox") this.cde.style.visibility = "visible";this.bje.style.visibility = "visible";};
		tfsdiv.onmouseout = function(){this.cde.style.visibility = "hidden";this.bje.style.visibility = "hidden";};
		Graphics._appendCElement(this,tfsdiv);
		return tfsdiv;
	}
	this._MYXB.pzkfzidiv.refresh = function(){
		for (var i = 0;i < $QJSZ.PZKFZ.length;i++) {
			this.addCitem(i,$QJSZ.PZKFZ[i].name);
		}
		if ($QJSZ.PZKFZ.length > 0) {$QJSZ.CPZKXZSL = 0;Graphics._CZMBL.sxpzk.value = $QJSZ.PZKFZ[$QJSZ.CPZKXZSL].name;}
	}
	
	this._MYXB.pzkfzidiv.csh = function(){
		for (var i = 0;i < $QJSZ.PZKFZ.length;i++) {
			this.addCitem(i,$QJSZ.PZKFZ[i].name);
			this.children[i].style.backgroundColor = $QJSZ.PZKFZ[i].color;
		}
		if ($QJSZ.PZKFZ.length > 0) {$QJSZ.CPZKXZSL = 0;Graphics._CZMBL.sxpzk.value = $QJSZ.PZKFZ[$QJSZ.CPZKXZSL].name;}
	}
	
	this._appendCElement(this._MYXB.typzkfz,this._MYXB.pzkfzidiv);
    this._appendCElement(this._MYXB,this._MYXB.typzkfz);
	
	
	this._createCanMoveDialog("_BJOBBFZZYS","编辑",120,210,200,580,"hidden");
	Graphics._BJOBBFZZYS.xsysdiv = this._createWHTLRBElement("div",40,40,36,40,"hidden",16);
	Graphics._BJOBBFZZYS.xsysdiv.style.borderRadius = "50%";
	Graphics._BJOBBFZZYS.xsysdiv.style.backgroundColor = 'rgba(255,0,0,0.5)';
	Graphics._BJOBBFZZYS.GShowModal = function(fy){
		fy = fy || {"name":"","color":"rgba(255,0,0,1)"};
		if (fy.color.indexOf('a') == -1) {fy.color = "rgba(" + fy.color.slice(4,fy.color.length)};//alert(fy.color);
		var strs = fy.color.slice(5,fy.color.length - 1).split(',');//alert(strs.toString());alert(strs[1]);
		this.iR.value = strs[0] * 1;
		this.iG.value = strs[1] * 1;
		this.iB.value = strs[2] * 1;
		this.iA.value = Math.round((strs[3] || 1) * 255);
		this.it.value = fy.name;
		this.xsysdiv.changeColor();
		this.showModal();
		};
    Graphics._BJOBBFZZYS.GCloseModal = function(){this.close();};
	Graphics._BJOBBFZZYS.xsysdiv.changeColor = function(){
		this.style.backgroundColor = 'rgba('+Graphics._BJOBBFZZYS.iR.value+','
		                                    +Graphics._BJOBBFZZYS.iG.value+','
											+Graphics._BJOBBFZZYS.iB.value+','
											+(Graphics._BJOBBFZZYS.iA.value / 255)+')';//alert(this.style.backgroundColor);
		}
	this._appendCElement(Graphics._BJOBBFZZYS,Graphics._BJOBBFZZYS.xsysdiv);
	this._appendCElement(Graphics._BJOBBFZZYS,this._createDIVTEXT(28,20,84,2,"hidden","R:"));
	this._appendCElement(Graphics._BJOBBFZZYS,this._createDIVTEXT(28,20,108,2,"hidden","G:"));
	this._appendCElement(Graphics._BJOBBFZZYS,this._createDIVTEXT(28,20,132,2,"hidden","B:"));
	this._appendCElement(Graphics._BJOBBFZZYS,this._createDIVTEXT(28,20,156,2,"hidden","A:"));
	Graphics._BJOBBFZZYS.iR = this._createWHTLRBElement("input",90,20,84,24,"hidden",16);
	Graphics._BJOBBFZZYS.iR.type = "number";Graphics._BJOBBFZZYS.iR.value = 0;Graphics._BJOBBFZZYS.iR.max = 255;Graphics._BJOBBFZZYS.iR.min = 0;
	Graphics._BJOBBFZZYS.iR.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 3) {e.preventDefault(); return;};
		}
	Graphics._BJOBBFZZYS.iR.oninput = function(){this.value = this.value * 1;if (this.value > 255) {this.value = 255};Graphics._BJOBBFZZYS.xsysdiv.changeColor();};
	this._appendCElement(Graphics._BJOBBFZZYS,Graphics._BJOBBFZZYS.iR);
	Graphics._BJOBBFZZYS.iG = this._createWHTLRBElement("input",90,20,108,24,"hidden",16);
	Graphics._BJOBBFZZYS.iG.type = "number";Graphics._BJOBBFZZYS.iG.value = 0;Graphics._BJOBBFZZYS.iG.max = 255;Graphics._BJOBBFZZYS.iG.min = 0;
	Graphics._BJOBBFZZYS.iG.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 3) {e.preventDefault(); return;};
		}
	Graphics._BJOBBFZZYS.iG.oninput = function(){this.value = this.value * 1;if (this.value > 255) {this.value = 255};Graphics._BJOBBFZZYS.xsysdiv.changeColor();};
	this._appendCElement(Graphics._BJOBBFZZYS,Graphics._BJOBBFZZYS.iG);
	Graphics._BJOBBFZZYS.iB = this._createWHTLRBElement("input",90,20,132,24,"hidden",16);
	Graphics._BJOBBFZZYS.iB.type = "number";Graphics._BJOBBFZZYS.iB.value = 0;Graphics._BJOBBFZZYS.iB.max = 255;Graphics._BJOBBFZZYS.iB.min = 0;
	Graphics._BJOBBFZZYS.iB.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 3) {e.preventDefault(); return;};
		}
	Graphics._BJOBBFZZYS.iB.oninput = function(){this.value = this.value * 1;if (this.value > 255) {this.value = 255};Graphics._BJOBBFZZYS.xsysdiv.changeColor();};
	this._appendCElement(Graphics._BJOBBFZZYS,Graphics._BJOBBFZZYS.iB);
	Graphics._BJOBBFZZYS.iA = this._createWHTLRBElement("input",90,20,156,24,"hidden",16);
	Graphics._BJOBBFZZYS.iA.type = "number";Graphics._BJOBBFZZYS.iA.value = 0;Graphics._BJOBBFZZYS.iA.max = 255;Graphics._BJOBBFZZYS.iA.min = 0;
	Graphics._BJOBBFZZYS.iA.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 3) {e.preventDefault(); return;};
		}
	Graphics._BJOBBFZZYS.iA.oninput = function(){this.value = this.value * 1;if (this.value > 255) {this.value = 255};Graphics._BJOBBFZZYS.xsysdiv.changeColor();};
	this._appendCElement(Graphics._BJOBBFZZYS,Graphics._BJOBBFZZYS.iA);
	this._appendCElement(Graphics._BJOBBFZZYS,this._createDIVTEXT(48,20,180,2,"hidden","名称:"));
	Graphics._BJOBBFZZYS.it = this._createWHTLRBElement("input",70,20,180,44,"hidden",16);
	this._appendCElement(Graphics._BJOBBFZZYS,Graphics._BJOBBFZZYS.it);
	var dbt = this._createWHTLRBElement('button',80,30,208,20);
	dbt.innerText = "确定";
	dbt.onclick = function(){
		var tt = Graphics._BJOBBFZZYS.it.value.trim();var gbxs = Graphics._BJOBBFZZYS.xsysdiv;var gmp = Graphics._MYXB.pzkfzidiv;
		if(tt == "") {Graphics._TISD.GShowModal("请输入名称");return;};
	    if(tt.indexOf("\"")>-1 || tt.indexOf("\'")>-1 || tt.indexOf("\\")>-1) {Graphics._TISD.GShowModal("包含非法字符:\" \' \\\n请重新输入");return;};
		if(Graphics.eivof($QJSZ.PZKFZ,"name",tt) != -1) {
			var i = Graphics.eivof($QJSZ.PZKFZ,"name",tt);var gsbc = gbxs.style.backgroundColor;
			$QJSZ.PZKFZ[i].color = gbxs.style.backgroundColor;
		    gmp.children[i].style.backgroundColor = gsbc;
			return;
			};
		var ti = Graphics._MYXB.pzkfzidiv.addCitem(gmp.children.length,tt);
		$QJSZ.PZKFZ.push({"name":tt,"color":Graphics._BJOBBFZZYS.xsysdiv.style.backgroundColor});
		if ($QJSZ.CPZKXZSL == -1) {$QJSZ.CPZKXZSL = 0;Graphics._CZMBL.sxpzk.value = $QJSZ.PZKFZ[$QJSZ.CPZKXZSL].name;}
		
		};
	this._appendCElement(Graphics._BJOBBFZZYS,dbt);
	
	this._createMaskDIV(this._MYXB);//.style.visibility = "visible";
	
	this._updateCElement(this._MYXB);
}

Graphics._createKZMB = function() {
    this._KZMB = this._createWHTLRBElement('div',145,708,4,977,"hidden");
    this._KZMB.id = 'KZMB';
	this._KZMB.style.backgroundColor = 'rgb(255,255,0)';
	this._KZMB.style.border = "1px solid #000";
    this._BKIVB.appendChild(this._KZMB);
	
	this._KZMB.refresh = function(){
		var FNCAI = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex];
		
		this.rwxh.value = FNCAI.characterIndex;
		this.taxh.value = FNCAI.pattern;
		
		this.sfbfyx.checked = FNCAI.ispse;
		this.yxmb.mc.value = FNCAI.se.name;
		this.yxmb.yl.value = FNCAI.se.volume;
		this.yxmb.yd.value = FNCAI.se.pitch;
		this.yxmb.yx.value = FNCAI.se.pan;
		
		this.sfqhyd.checked = FNCAI.ismy || false;
		this.qhydkz.sfzzmryd.checked = FNCAI.ofxy.sdmy || false;
		this.qhydkz.xqorxhyd[0].checked = this.qhydkz.xqorxhyd[0].value == FNCAI.ofxy.dy;
		this.qhydkz.xqorxhyd[1].checked = this.qhydkz.xqorxhyd[1].value == FNCAI.ofxy.dy;
		this.qhydkz.qhydjl.value = FNCAI.ofxy.y;
		
		this.sfzyyd.checked = FNCAI.ismx || false;
		this.zyydkz.sfzzmryd.checked = FNCAI.ofxy.sdmx || false;
		this.zyydkz.xzorxyyd[0].checked = this.zyydkz.xzorxyyd[0].value == FNCAI.ofxy.dx;
		this.zyydkz.xzorxyyd[1].checked = this.zyydkz.xzorxyyd[1].value == FNCAI.ofxy.dx;
		this.zyydkz.zyydjl.value = FNCAI.ofxy.x;
		
		this.hsdy.innerText = FNCAI.ffunc || "";
	}
	
	this._appendCElement(this._KZMB,this._createDIVTEXT(120,20,2,2,"hidden","人物序号:"));
	this._KZMB.rwxh = this._createWHTLRBElement("input",56,20,2,80,"hidden",16);
	this._KZMB.rwxh.type = "number";this._KZMB.rwxh.value = 0;this._KZMB.rwxh.max = 7;this._KZMB.rwxh.min = 0;
	this._KZMB.rwxh.onkeydown = function(e){
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106))) {this.value = ""};
		}
	this._KZMB.rwxh.oninput = function(){
		if(this.value > 7) {this.value = 7};
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].characterIndex = this.value * 1;
		};
	this._appendCElement(this._KZMB,this._KZMB.rwxh);
	
	this._appendCElement(this._KZMB,this._createDIVTEXT(120,20,28,2,"hidden","图案序号:"));
	this._KZMB.taxh = this._createWHTLRBElement("input",56,20,28,80,"hidden",16);
	this._KZMB.taxh.type = "number";this._KZMB.taxh.value = 0;this._KZMB.taxh.max = 2;this._KZMB.taxh.min = 0;
	this._KZMB.taxh.onkeydown = function(e){
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106))) {this.value = ""};
		}
	this._KZMB.taxh.oninput = function(){
		if(this.value > 2) {this.value = 2};
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].pattern = this.value * 1;
		};
	this._appendCElement(this._KZMB,this._KZMB.taxh);
	
	this._appendCElement(this._KZMB,this._createDIVTEXT(100,20,56,2,"hidden","是否播放音效:"));
	this._KZMB.sfbfyx = this._createWHTLRBElement("input",20,20,56,108,"hidden",16);
	this._KZMB.sfbfyx.type = "checkbox";this._KZMB.sfbfyx.checked = true;
	this._KZMB.sfbfyx.onchange = function () {$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ispse = this.checked;};
	this._appendCElement(this._KZMB,this._KZMB.sfbfyx);
	
	this._KZMB.yxmb = this._createWHTLRBElement('div',136,104,80,4,"hidden");
	this._KZMB.yxmb.style.backgroundColor = 'rgb(0,255,255)';
	this._KZMB.yxmb.style.border = "1px solid #000";
	this._appendCElement(this._KZMB,this._KZMB.yxmb);
	this._appendCElement(this._KZMB.yxmb,this._createDIVTEXT(36,20,4,2,"hidden","名称:"));
	this._appendCElement(this._KZMB.yxmb,this._createDIVTEXT(36,20,28,2,"hidden","音量:"));
	this._appendCElement(this._KZMB.yxmb,this._createDIVTEXT(36,20,52,2,"hidden","音调:"));
	this._appendCElement(this._KZMB.yxmb,this._createDIVTEXT(36,20,76,2,"hidden","声像:"));
	this._KZMB.yxmb.mc = this._createWHTLRBElement("input",90,20,4,40,"hidden",16);
	this._KZMB.yxmb.mc.onkeydown = function(e){}
	this._KZMB.yxmb.mc.onblur = function(){
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].se.name = this.value;
		/*var str = this.value;var ssz = []; ssz[0] = str;alert(ssz[0]);*/
		};
	this._appendCElement(this._KZMB.yxmb,this._KZMB.yxmb.mc);
	this._KZMB.yxmb.yl = this._createWHTLRBElement("input",90,20,28,40,"hidden",16);
	this._KZMB.yxmb.yl.type = "number";this._KZMB.yxmb.yl.value = 0;this._KZMB.yxmb.yl.max = 100;this._KZMB.yxmb.yl.min = 0;
	this._KZMB.yxmb.yl.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 3) {e.preventDefault(); return;};
		}
	this._KZMB.yxmb.yl.oninput = function(){this.value = this.value * 1;if (this.value > 100) {this.value = 100};};
	this._KZMB.yxmb.yl.onblur = function(){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].se.volume = this.value * 1;};
	this._appendCElement(this._KZMB.yxmb,this._KZMB.yxmb.yl);
	this._KZMB.yxmb.yd = this._createWHTLRBElement("input",90,20,52,40,"hidden",16);
	this._KZMB.yxmb.yd.type = "number";this._KZMB.yxmb.yd.value = 0;this._KZMB.yxmb.yd.max = 150;this._KZMB.yxmb.yd.min = 0;
	this._KZMB.yxmb.yd.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 109 || ec == 110) {e.preventDefault(); return;};
		if (((ec > 47 && ec < 58) || (ec > 95 && ec < 106)) && getSelection().toString().length == 0 && this.value.length == 3) {e.preventDefault(); return;};
		}
	this._KZMB.yxmb.yd.onblur = function(){
		this.value = this.value * 1;if (this.value > 150) this.value = 150; if (this.value < 50) this.value = 50;
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].se.pitch = this.value * 1;
		};
	this._appendCElement(this._KZMB.yxmb,this._KZMB.yxmb.yd);
	this._KZMB.yxmb.yx = this._createWHTLRBElement("input",90,20,76,40,"hidden",16);
	this._KZMB.yxmb.yx.type = "number";this._KZMB.yxmb.yx.value = 0;this._KZMB.yxmb.yx.max = 50;this._KZMB.yxmb.yx.min = -50;
	this._KZMB.yxmb.yx.onkeydown = function(e){//alert(e.keyCode);
	    var ec = e.keyCode;
		if (ec == 107 || ec == 110) {e.preventDefault(); return;};
		}
	this._KZMB.yxmb.yx.onblur = function(){
		this.value = this.value * 1;if (this.value > 50) this.value = 50;if (this.value < -50) this.value = -50;
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].se.pan = this.value * 1;
		};
	this._appendCElement(this._KZMB.yxmb,this._KZMB.yxmb.yx);
	
	this._appendCElement(this._KZMB,this._createDIVTEXT(100,20,188,2,"hidden","是否上下移动:"));
	this._KZMB.sfqhyd = this._createWHTLRBElement("input",20,20,188,108,"hidden",16);
	this._KZMB.sfqhyd.type = "checkbox";this._KZMB.sfqhyd.checked = true;
	this._KZMB.sfqhyd.onchange = function(){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ismy = this.checked;};
	this._appendCElement(this._KZMB,this._KZMB.sfqhyd);
	
	this._KZMB.qhydkz = this._createWHTLRBElement('div',136,120,210,4,"hidden");
	this._KZMB.qhydkz.style.backgroundColor = 'rgb(0,255,255)';
	this._KZMB.qhydkz.style.border = "1px solid #000";
	this._appendCElement(this._KZMB,this._KZMB.qhydkz);
    this._appendCElement(this._KZMB.qhydkz,this._createDIVTEXT(100,20,2,2,"hidden","阻止默认移动:"));
	this._KZMB.qhydkz.sfzzmryd = this._createWHTLRBElement("input",20,20,2,108,"hidden",16);
	this._KZMB.qhydkz.sfzzmryd.type = "checkbox";this._KZMB.qhydkz.sfzzmryd.checked = true;
	this._KZMB.qhydkz.sfzzmryd.onchange = function(){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.sdmy = this.checked;};
	this._appendCElement(this._KZMB.qhydkz,this._KZMB.qhydkz.sfzzmryd);
	this._appendCElement(this._KZMB.qhydkz,this._createDIVTEXT(100,20,28,2,"hidden","向上移动"));
	this._appendCElement(this._KZMB.qhydkz,this._createDIVTEXT(100,20,54,2,"hidden","向下移动"));
	this._KZMB.qhydkz.xqorxhyd = [];
	this._KZMB.qhydkz.xqorxhyd[0] = this._createWHTLRBElement("input",20,20,28,108,"hidden",16);
	this._KZMB.qhydkz.xqorxhyd[0].type = "radio";this._KZMB.qhydkz.xqorxhyd[0].name = "qhydkz";this._KZMB.qhydkz.xqorxhyd[0].value = -1;this._KZMB.qhydkz.xqorxhyd[0].checked = true;
	this._KZMB.qhydkz.xqorxhyd[0].onchange = function(){
		if(this.checked){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.dy = -1;}
	    /*alert(-1)};*/
		};
	this._KZMB.qhydkz.xqorxhyd[1] = this._createWHTLRBElement("input",20,20,54,108,"hidden",16);
	this._KZMB.qhydkz.xqorxhyd[1].type = "radio";this._KZMB.qhydkz.xqorxhyd[1].name = "qhydkz";this._KZMB.qhydkz.xqorxhyd[1].value = 1;
	this._KZMB.qhydkz.xqorxhyd[1].onchange = function(){
		if(this.checked){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.dy = 1;}
	    /*alert(1)};*/
		};
	this._appendCElement(this._KZMB.qhydkz,this._KZMB.qhydkz.xqorxhyd[0]);
	this._appendCElement(this._KZMB.qhydkz,this._KZMB.qhydkz.xqorxhyd[1]);
	this._appendCElement(this._KZMB.qhydkz,this._createDIVTEXT(120,20,82,2,"hidden","移动距离:"));
	this._KZMB.qhydkz.qhydjl = this._createWHTLRBElement("input",52,20,82,76,"hidden",16);
	this._KZMB.qhydkz.qhydjl.type = "number";this._KZMB.qhydkz.qhydjl.value = 0;this._KZMB.qhydkz.qhydjl.min = 0;
	this._KZMB.qhydkz.qhydjl.onkeydown = function(e){var ec = e.keyCode;if (ec == 107 || ec == 109) {e.preventDefault(); return;};}
	this._KZMB.qhydkz.qhydjl.oninput = function(){
		this.value = this.value * 1;
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.y = this.value * 1;
		/*alert(this.value);*/
		};
	this._appendCElement(this._KZMB.qhydkz,this._KZMB.qhydkz.qhydjl);
	
	this._appendCElement(this._KZMB,this._createDIVTEXT(100,20,334,2,"hidden","是否左右移动:"));
	this._KZMB.sfzyyd = this._createWHTLRBElement("input",20,20,334,108,"hidden",16);
	this._KZMB.sfzyyd.type = "checkbox";this._KZMB.sfzyyd.checked = true;
	this._KZMB.sfzyyd.onchange = function(){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ismx = this.checked;};
	this._appendCElement(this._KZMB,this._KZMB.sfzyyd);
	
	this._KZMB.zyydkz = this._createWHTLRBElement('div',136,120,356,4,"hidden");
	this._KZMB.zyydkz.style.backgroundColor = 'rgb(0,255,255)';
	this._KZMB.zyydkz.style.border = "1px solid #000";
	this._appendCElement(this._KZMB,this._KZMB.zyydkz);
    this._appendCElement(this._KZMB.zyydkz,this._createDIVTEXT(100,20,2,2,"hidden","阻止默认移动:"));
	this._KZMB.zyydkz.sfzzmryd = this._createWHTLRBElement("input",20,20,2,108,"hidden",16);
	this._KZMB.zyydkz.sfzzmryd.type = "checkbox";this._KZMB.zyydkz.sfzzmryd.checked = true;
	this._KZMB.zyydkz.sfzzmryd.onchange = function(){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.sdmx = this.checked;};
	this._appendCElement(this._KZMB.zyydkz,this._KZMB.zyydkz.sfzzmryd);
	this._appendCElement(this._KZMB.zyydkz,this._createDIVTEXT(100,20,28,2,"hidden","向左移动"));
	this._appendCElement(this._KZMB.zyydkz,this._createDIVTEXT(100,20,54,2,"hidden","向右移动"));
	this._KZMB.zyydkz.xzorxyyd = [];
	this._KZMB.zyydkz.xzorxyyd[0] = this._createWHTLRBElement("input",20,20,28,108,"hidden",16);
	this._KZMB.zyydkz.xzorxyyd[0].type = "radio";this._KZMB.zyydkz.xzorxyyd[0].name = "zyydkz";this._KZMB.zyydkz.xzorxyyd[0].value = -1;this._KZMB.zyydkz.xzorxyyd[0].checked = true;
	this._KZMB.zyydkz.xzorxyyd[0].onchange = function(){
		if(this.checked){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.dx = -1;}
	    /*alert(-1)};*/
		};
	this._KZMB.zyydkz.xzorxyyd[1] = this._createWHTLRBElement("input",20,20,54,108,"hidden",16);
	this._KZMB.zyydkz.xzorxyyd[1].type = "radio";this._KZMB.zyydkz.xzorxyyd[1].name = "zyydkz";this._KZMB.zyydkz.xzorxyyd[1].value = 1;
	this._KZMB.zyydkz.xzorxyyd[1].onchange = function(){
		if(this.checked){$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.dx = 1;}
	    /*alert(1)};*/
		};
	this._appendCElement(this._KZMB.zyydkz,this._KZMB.zyydkz.xzorxyyd[0]);
	this._appendCElement(this._KZMB.zyydkz,this._KZMB.zyydkz.xzorxyyd[1]);
	this._appendCElement(this._KZMB.zyydkz,this._createDIVTEXT(120,20,82,2,"hidden","移动距离:"));
	this._KZMB.zyydkz.zyydjl = this._createWHTLRBElement("input",52,20,82,76,"hidden",16);
	this._KZMB.zyydkz.zyydjl.type = "number";this._KZMB.zyydkz.zyydjl.value = 0;this._KZMB.zyydkz.zyydjl.min = 0;
	this._KZMB.zyydkz.zyydjl.onkeydown = function(e){var ec = e.keyCode;if (ec == 107 || ec == 109) {e.preventDefault(); return;};}
	this._KZMB.zyydkz.zyydjl.oninput = function(){
		this.value = this.value * 1;
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ofxy.x = this.value * 1;
		/*alert(this.value);*/
		};
	this._appendCElement(this._KZMB.zyydkz,this._KZMB.zyydkz.zyydjl);
	
	this._appendCElement(this._KZMB,this._createDIVTEXT(90,20,480,2,"hidden","函数调用"));
	this._KZMB.hsdy = this._createWHTLRBElement("div",134,200,504,4);
	this._KZMB.hsdy.contentEditable = "true";
	this._KZMB.hsdy.style.whiteSpace = "nowrap";
	this._KZMB.hsdy.style.backgroundColor = 'rgb(255,255,255)';
	this._KZMB.hsdy.style.border = "1px solid #000";
	this._KZMB.hsdy.onkeydown = function(e){}
	this._KZMB.hsdy.onblur = function(){
		//(new Function("$I = \"dff\""))();console.log(JSON.stringify([this.innerText]));console.log($I);
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex].ffunc = this.innerText;
		//alert(JSON.stringify($dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]));
		};
	this._createMaskDIV(this._KZMB);//.style.visibility = "visible";
	this._appendCElement(this._KZMB,this._KZMB.hsdy);
	
	
}

Graphics._createXXMB = function() {
    this._XXMB = this._createWHTLRBElement('div',145,708,4,1130,"hidden");
    this._XXMB.id = 'XXMB';
	this._XXMB.style.backgroundColor = 'rgb(255,255,0)';
	this._XXMB.style.border = "1px solid #000";
    this._createMaskDIV(this._XXMB);//.style.visibility = "visible";
	this._BKIVB.appendChild(this._XXMB);
	
	this._XXMB.MBS = [];
	
	this._XXMB.csrk = function (i,t,b,m) {
		Graphics._appendCElement(this.MBS[i],Graphics._createDIVTEXT(120,20,t,2,"hidden",b+":"));
		this.MBS[i][m] = Graphics._createWHTLRBElement("input",72,20,t,56,"hidden",16);
		this.MBS[i][m].type = "number";this.MBS[i][m].value = 0;
		this.MBS[i][m].onkeydown = function(e){var ec = e.keyCode;if (ec == 107 || ec == 109) {e.preventDefault(); return;};}
		Graphics._appendCElement(this.MBS[i],this.MBS[i][m]);
	}
	
	this._XXMB.cmb = function (i,v) {
		this.MBS[i] = Graphics._createWHTLRBElement('div',140,220,2,1);
		this.MBS[i].style.backgroundColor = 'rgba(0,255,255,1)';
		this.MBS[i].style.border = "1px solid #000";
		this.MBS[i].style.visibility = v || "visible";//"hidden"
		Graphics._appendCElement(this,this.MBS[i]);
	}
	
	this._XXMB.showcmb = function (i) {
		for (var j = 0; j < this.MBS.length; j++) {
			if (j == i) {
				this.MBS[j].style.visibility = "visible";
			} else {
				this.MBS[j].style.visibility = "hidden";
			}
		}
	}
	
	this._XXMB.setcmbdata = function (i,obj) {
		if (i == 0) {
			this.MBS[i].ax.value = obj.x;
			this.MBS[i].ay.value = obj.y;
		} else if (i == 1) {
			this.MBS[i].fz.value = SceneManager._scene._OBBEidtWindow.getOBJFZ("collisionbox",obj);
			this.MBS[i].ro.value = obj.ro;
			this.MBS[i].cx.value = obj.cx;
			this.MBS[i].cy.value = obj.cy;
			this.MBS[i].hw.value = obj.hw;
			this.MBS[i].hh.value = obj.hh;
		} else if (i == 2) {
			this.MBS[i].fz.value = SceneManager._scene._OBBEidtWindow.getOBJFZ("collisiontriangle",obj);
			this.MBS[i].x1.value = obj[0];
			this.MBS[i].y1.value = obj[1];
			this.MBS[i].x2.value = obj[2];
			this.MBS[i].y2.value = obj[3];
			this.MBS[i].x3.value = obj[4];
			this.MBS[i].y3.value = obj[5];
		} else if (i == 3) {
			this.MBS[i].fz.value = SceneManager._scene._OBBEidtWindow.getOBJFZ("collisioncircular",obj);
			this.MBS[i].x.value = obj[0];
			this.MBS[i].y.value = obj[1];
			this.MBS[i].r.value = obj[2];
		} else if (i == 4) {
			this.MBS[i].did.value = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["connectpoint"][$CZDHZZ.Direction].indexOf(obj);
			this.MBS[i].x.value = obj.x;
			this.MBS[i].y.value = obj.y;
		}
	}
	
	//设置原点
	this._XXMB.cmb(0,"hidden");
	this._XXMB.csrk(0,2,"原点X","ax");
	this._XXMB.MBS[0].ax.oninput = function(){
		this.value = this.value * 1;
		var ssoc = SceneManager._scene._OBBCharacterSprite;
		var tanchor = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["anchor"][$CZDHZZ.Direction];
		var tx = tanchor.x;
		tanchor.x = this.value * 1;
		SceneManager._scene._OBBEidtWindow.refreshPZKPY((tx - tanchor.x) * ssoc._frame.width,0);
	};
	this._XXMB.csrk(0,28,"原点Y","ay");
	this._XXMB.MBS[0].ay.oninput = function(){
		this.value = this.value * 1;
		var ssoc = SceneManager._scene._OBBCharacterSprite;
		var tanchor = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["anchor"][$CZDHZZ.Direction];
		var ty = tanchor.y;
		tanchor.y = this.value * 1;
		SceneManager._scene._OBBEidtWindow.refreshPZKPY(0,(ty - tanchor.y) * ssoc._frame.height);
	};
	
	//设置旋转矩形
	this._XXMB.cmb(1,"hidden");
	this._XXMB.csrk(1,2,"分组","fz");
	this._XXMB.MBS[1].fz.type = "text";this._XXMB.MBS[1].fz.value = "";
	this._XXMB.MBS[1].fz.onkeydown = function(e){e.preventDefault();}
	this._XXMB.csrk(1,28,"弧度","ro");
	this._XXMB.MBS[1].ro.oninput = function(){
	    if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.ro = this.value * 1;
	};
	this._XXMB.csrk(1,54,"x偏移","cx");
	this._XXMB.MBS[1].cx.oninput = function(){
	    if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.cx = this.value * 1;
	};
	this._XXMB.csrk(1,80,"y偏移","cy");
	this._XXMB.MBS[1].cy.oninput = function(){
	    if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.cy = this.value * 1;
	};
	this._XXMB.csrk(1,106,"半宽","hw");
	this._XXMB.MBS[1].hw.min = 0;
	this._XXMB.MBS[1].hw.oninput = function(){
	    if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.hw = this.value * 1;
	};
	this._XXMB.csrk(1,132,"半高","hh");
	this._XXMB.MBS[1].hh.min = 0;
	this._XXMB.MBS[1].hh.oninput = function(){
	    if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.hh = this.value * 1;
	};
	this._XXMB.MBS[1].del = this._createWHTLRBElement('div',32,22,160,100);
	this._XXMB.MBS[1].del.innerText = "删除";
	this._XXMB.MBS[1].del.style.backgroundColor = 'rgb(230,240,250)';
	this._XXMB.MBS[1].del.style.border = "1px solid #000";
	this._XXMB.MBS[1].del.onclick = function () {
		var dobj = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"];
		var sow = SceneManager._scene._OBBEidtWindow;
		var objn = sow.getOBJFZ("collisionbox",sow.CSOBJ.parent.obj);
		dobj = dobj[objn][$CZDHZZ.Direction];
		var di = dobj.indexOf(sow.CSOBJ.parent.obj);
		dobj.splice(di,1);
		var dfz = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"][objn];
		if ((!dfz["2"] || dfz["2"].length == 0) && (!dfz["4"] || dfz["4"].length == 0) && (!dfz["6"] || dfz["6"].length == 0) && (!dfz["8"] || dfz["8"].length == 0)) 
			delete $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"][objn];
		//alert(JSON.stringify($dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"]));
		sow.CSOBJ = {"parent":null,"child":null};
		Graphics._XXMB.showcmb(-1);
	}
	this._appendCElement(this._XXMB.MBS[1],this._XXMB.MBS[1].del);
	
	//设置三角形
	this._XXMB.cmb(2,"hidden");
	this._XXMB.csrk(2,2,"分组","fz");
	this._XXMB.MBS[2].fz.type = "text";this._XXMB.MBS[1].fz.value = "";
	this._XXMB.MBS[2].fz.onkeydown = function(e){e.preventDefault();}
	this._XXMB.csrk(2,28,"X1","x1");
	this._XXMB.MBS[2].x1.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[0] = this.value * 1;
	};
	this._XXMB.csrk(2,54,"Y1","y1");
	this._XXMB.MBS[2].y1.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[1] = this.value * 1;
	};
	this._XXMB.csrk(2,80,"X2","x2");
	this._XXMB.MBS[2].x2.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[2] = this.value * 1;
	};
	this._XXMB.csrk(2,106,"Y2","y2");
	this._XXMB.MBS[2].y2.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[3] = this.value * 1;
	};
	this._XXMB.csrk(2,132,"X3","x3");
	this._XXMB.MBS[2].x3.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[4] = this.value * 1;
	};
	this._XXMB.csrk(2,158,"Y3","y3");
	this._XXMB.MBS[2].y3.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[5] = this.value * 1;
	};
	this._XXMB.MBS[2].del = this._createWHTLRBElement('div',32,22,186,100);
	this._XXMB.MBS[2].del.innerText = "删除";
	this._XXMB.MBS[2].del.style.backgroundColor = 'rgb(230,240,250)';
	this._XXMB.MBS[2].del.style.border = "1px solid #000";
	this._XXMB.MBS[2].del.onclick = function () {
		var dobj = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"];
		var sow = SceneManager._scene._OBBEidtWindow;
		var objn = sow.getOBJFZ("collisiontriangle",sow.CSOBJ.parent.obj);
		dobj = dobj[objn][$CZDHZZ.Direction];
		var di = dobj.indexOf(sow.CSOBJ.parent.obj);
		dobj.splice(di,1);
		var dfz = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"][objn];
		if ((!dfz["2"] || dfz["2"].length == 0) && (!dfz["4"] || dfz["4"].length == 0) && (!dfz["6"] || dfz["6"].length == 0) && (!dfz["8"] || dfz["8"].length == 0)) 
			delete $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"][objn];
		//alert(JSON.stringify($dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"]));
		sow.CSOBJ = {"parent":null,"child":null};
		Graphics._XXMB.showcmb(-1);
	}
	this._appendCElement(this._XXMB.MBS[2],this._XXMB.MBS[2].del);
	
	//设置圆形
	this._XXMB.cmb(3,"hidden");
	this._XXMB.csrk(3,2,"分组","fz");
	this._XXMB.MBS[3].fz.type = "text";this._XXMB.MBS[1].fz.value = "";
	this._XXMB.MBS[3].fz.onkeydown = function(e){e.preventDefault();}
	this._XXMB.csrk(3,28,"x偏移","x");
	this._XXMB.MBS[3].x.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[0] = this.value * 1;
	};
	this._XXMB.csrk(3,54,"y偏移","y");
	this._XXMB.MBS[3].y.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[1] = this.value * 1;
	};
	this._XXMB.csrk(3,80,"半径","r");
	this._XXMB.MBS[3].r.min = 0;
	this._XXMB.MBS[3].r.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj[2] = this.value * 1;
	};
	this._XXMB.MBS[3].del = this._createWHTLRBElement('div',32,22,108,100);
	this._XXMB.MBS[3].del.innerText = "删除";
	this._XXMB.MBS[3].del.style.backgroundColor = 'rgb(230,240,250)';
	this._XXMB.MBS[3].del.style.border = "1px solid #000";
	this._XXMB.MBS[3].del.onclick = function () {
		var dobj = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"];
		var sow = SceneManager._scene._OBBEidtWindow;
		var objn = sow.getOBJFZ("collisioncircular",sow.CSOBJ.parent.obj);
		dobj = dobj[objn][$CZDHZZ.Direction];
		var di = dobj.indexOf(sow.CSOBJ.parent.obj);
		dobj.splice(di,1);
		var dfz = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"][objn];
		if ((!dfz["2"] || dfz["2"].length == 0) && (!dfz["4"] || dfz["4"].length == 0) && (!dfz["6"] || dfz["6"].length == 0) && (!dfz["8"] || dfz["8"].length == 0))
			delete $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"][objn];
		//alert(JSON.stringify($dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"]));
		sow.CSOBJ = {"parent":null,"child":null};
		Graphics._XXMB.showcmb(-1);
	}
	this._appendCElement(this._XXMB.MBS[3],this._XXMB.MBS[3].del);
	
	//设置点
	this._XXMB.cmb(4,"hidden");
	this._XXMB.csrk(4,2,"编号","did");
	this._XXMB.MBS[4].did.onkeydown = function(e){e.preventDefault();}
	this._XXMB.csrk(4,28,"x偏移","x");
	this._XXMB.MBS[4].x.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.x = this.value * 1;
	};
	this._XXMB.csrk(4,54,"y偏移","y");
	this._XXMB.MBS[4].y.oninput = function(){
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent) return;
		if (!SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj) return;
		this.value = this.value * 1;
		var obj = SceneManager._scene._OBBEidtWindow.CSOBJ.parent.obj;
		obj.y = this.value * 1;
	};
	this._XXMB.MBS[4].del = this._createWHTLRBElement('div',32,22,82,100);
	this._XXMB.MBS[4].del.innerText = "删除";
	this._XXMB.MBS[4].del.style.backgroundColor = 'rgb(230,240,250)';
	this._XXMB.MBS[4].del.style.border = "1px solid #000";
	this._XXMB.MBS[4].del.onclick = function () {
		var dobj = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["connectpoint"][$CZDHZZ.Direction];
		var sow = SceneManager._scene._OBBEidtWindow;
		dobj.splice(dobj.indexOf(sow.CSOBJ.parent.obj),1);
		sow.CSOBJ = {"parent":null,"child":null};
		Graphics._XXMB.showcmb(-1);
	}
	this._appendCElement(this._XXMB.MBS[4],this._XXMB.MBS[4].del);
}

Graphics._createDHZMB = function() {
    this._DHZMB = this._createWHTLRBElement('div',668,138,578,306,"hidden");
    this._DHZMB.id = 'DHZMB';
	this._DHZMB.style.backgroundColor = 'rgb(255,255,0)';
	this._DHZMB.style.border = "1px solid #000";
	this._DHZMB.fzztnr = null;
    this._BKIVB.appendChild(this._DHZMB);
	
	this._DHZMB.fz = this._createWHTLRBElement('div',54,20,4,2,"hidden");
	this._DHZMB.fz.innerText = "复制";
	this._DHZMB.fz.style.backgroundColor = 'rgb(230,240,250)';
	this._DHZMB.fz.style.border = "1px solid #000";
	this._DHZMB.fz.onclick = function(){
		this.parentNode.fzztnr = JSON.stringify($dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]);
		Graphics._TISD.GShowModal("成功复制");
		};
	this._appendCElement(this._DHZMB,this._DHZMB.fz);
	
	this._DHZMB.zt = this._createWHTLRBElement('div',54,20,28,2,"hidden");
	this._DHZMB.zt.innerText = "粘贴";
	this._DHZMB.zt.style.backgroundColor = 'rgb(230,240,250)';
	this._DHZMB.zt.style.border = "1px solid #000";
	this._DHZMB.zt.onclick = function(){
		if (!!this.parentNode.fzztnr) {
			$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex] = JSON.parse(this.parentNode.fzztnr);
		    Graphics._DHZMB.fsdiv.refreshzmb();
		    }
	    }
	this._appendCElement(this._DHZMB,this._DHZMB.zt);
	
	this._DHZMB.fsdiv = this._createWHTLRBElement("div",604,130,4,60);
	this._DHZMB.fsdiv.onme = null;
	this._DHZMB.fsdiv.style.backgroundColor = 'rgb(0,255,255)';
	this._DHZMB.fsdiv.style.border = "1px solid #000";
	this._appendCElement(this._DHZMB,this._DHZMB.fsdiv);
	
	this._DHZMB.fsdiv.addCitem = function(i){
		var tfsdiv = Graphics._createWHTLRBElement('div',24,126,1,1 + i * 26,"hidden",12);
		tfsdiv.iid = i;
		tfsdiv.style.zIndex = 1;
		tfsdiv.style.backgroundColor = 'rgb(250,250,250)';
		tfsdiv.style.border = "1px solid #00f";
		tfsdiv.style.textAlign = "center";
		
		for (var j = i; j < this.children.length;j++) {
			Graphics._resetGETL(this.children[j],1,1 + j * 26 + 26);
			this.children[j].iid++;
			this.children[j].numdiv.innerText = this.children[j].iid;
		}
		
        tfsdiv.btldiv = Graphics._createWHTLRBElement('div',20,20,2,1,"hidden");
		tfsdiv.btldiv.style.backgroundColor = 'rgb(255,255,0)';
		tfsdiv.btldiv.style.border = "1px solid #000";
		tfsdiv.btldiv.onclick = function(){
			this.parentNode.parentNode.children[$CZDHZZ.FIndex].btldiv.style.backgroundColor = 'rgb(255,255,0)';
			$CZDHZZ.FIndex = this.parentNode.iid;//alert($CZDHZZ.FIndex);
			this.style.backgroundColor = 'rgb(255,0,255)';
			Graphics._DHZMB.fsdiv.refreshzmb();
			}
		tfsdiv.btldiv.onmousedown = function(e){
			if (this.parentNode.iid != $CZDHZZ.FIndex) return;
			var tp = this.parentNode;Graphics._DHZMB.fsdiv.onme = tp;tp.style.zIndex = 99;
			//tp.Glept = (e.pageY - Graphics._BKIVB.offsetTop) / Graphics._realScale - tp.parentNode.Gtop - tp.parentNode.parentNode.Gtop;
			tp.Glepl = (e.pageX - Graphics._BKIVB.offsetLeft) / Graphics._realScale - tp.parentNode.Gleft - tp.parentNode.parentNode.Gleft;
			};
		this.onmousemove = function(e){
			if (!this.onme) return;
			var tp = this.onme.parentNode;
			if (this.onme) {
				var sl = (e.pageX - Graphics._BKIVB.offsetLeft) / Graphics._realScale - tp.Gleft - tp.parentNode.Gleft;
				if (sl < 4 || sl > this.children.length * 26 - 2) return;
				//this.onme.Gtop += (e.pageY - Graphics._BKIVB.offsetTop) / Graphics._realScale - tp.Gtop - tp.parentNode.Gtop - this.onme.Glept;
				this.onme.Gleft += (e.pageX - Graphics._BKIVB.offsetLeft) / Graphics._realScale - tp.Gleft - tp.parentNode.Gleft - this.onme.Glepl;
				//this.onme.Glept = (e.pageY - Graphics._BKIVB.offsetTop) / Graphics._realScale - tp.Gtop - tp.parentNode.Gtop;
				this.onme.Glepl = (e.pageX - Graphics._BKIVB.offsetLeft) / Graphics._realScale - tp.Gleft - tp.parentNode.Gleft;
				this.onme.Gleft = Math.max(this.onme.Gleft,1);
				this.onme.Gleft = Math.min(this.onme.Gleft,1 + (this.children.length - 1) * 26);
				Graphics._updateCElement(this.onme);
				var xi = Math.floor((this.onme.Gleft - 1) / 26);var arr = [];
				for (var j = 0;j < this.children.length;j++) {
					arr.push(j);
				}
				Graphics.marri(arr,this.onme.iid,xi);
				for (var j = 0;j < this.children.length;j++) {
					if (arr[j] == this.onme.iid) continue;
					Graphics._resetGETL(this.children[arr[j]],1,1 + j * 26);
				}
				
				}};
		tfsdiv.onmouseup = function(){
			this.style.zIndex = 1;
			if (!Graphics._DHZMB.fsdiv.onme) return;
		        var xi = Math.floor((Graphics._DHZMB.fsdiv.onme.Gleft - 1) / 26);
			    Graphics._resetGETL(Graphics._DHZMB.fsdiv.onme,1,1 + xi * 26);
				Graphics.mdivi(Graphics._DHZMB.fsdiv,Graphics._DHZMB.fsdiv.onme.iid,xi);
				Graphics.marri($dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"],Graphics._DHZMB.fsdiv.onme.iid,xi);
				
				for (var i = 0;i < Graphics._DHZMB.fsdiv.children.length;i++) {
					Graphics._DHZMB.fsdiv.children[i].iid = i;
					Graphics._DHZMB.fsdiv.children[i].numdiv.innerText = i;
					Graphics._DHZMB.fsdiv.children[i].btldiv.style.backgroundColor = 'rgb(255,255,0)';
				}
				$CZDHZZ.FIndex = xi;
				Graphics._DHZMB.fsdiv.onme.btldiv.style.backgroundColor = 'rgb(255,0,255)';
		        Graphics._DHZMB.fsdiv.onme = null;
				};
		Graphics._appendCElement(tfsdiv,tfsdiv.btldiv);
		
		tfsdiv.numdiv = Graphics._createWHTLRBElement('div',18,36,26,2,"hidden",12);
		tfsdiv.numdiv.style.overflowX = "scroll";
		tfsdiv.numdiv.innerText = i;
		tfsdiv.numdiv.style.backgroundColor = 'rgb(255,255,0)';
		tfsdiv.numdiv.style.border = "1px solid #000";
		Graphics._appendCElement(tfsdiv,tfsdiv.numdiv);
	
		tfsdiv.bta = Graphics._createWHTLRBElement('div',20,16,66,1,"hidden",6);
		tfsdiv.bta.innerText = "+";
		tfsdiv.bta.style.border = "1px solid #00f";
		tfsdiv.bta.style.backgroundColor = 'rgb(240,240,240)';
		tfsdiv.bta.style.visibility = "hidden";Graphics._appendCElement(tfsdiv,tfsdiv.bta);
		tfsdiv.bta.onclick = function(e){
			e.stopPropagation();
			this.parentNode.parentNode.children[$CZDHZZ.FIndex].btldiv.style.backgroundColor = 'rgb(255,255,0)';
			Graphics._DHZMB.fsdiv.addCitem(this.parentNode.iid+1,"+").btldiv.style.backgroundColor = 'rgb(255,0,255)';
			$CZDHZZ.FIndex = this.parentNode.iid+1;
			$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"].splice(this.parentNode.iid+1,0,JSON.parse(JSON.stringify($XJDH.animatedframe[0])));
			Graphics._DHZMB.fsdiv.refreshzmb();
			};
		tfsdiv.btd = Graphics._createWHTLRBElement('div',20,16,86,1,"hidden",6);
		tfsdiv.btd.innerText = "-";
		tfsdiv.btd.style.border = "1px solid #00f";
		tfsdiv.btd.style.backgroundColor = 'rgb(240,240,240)';
		tfsdiv.btd.style.visibility = "hidden";Graphics._appendCElement(tfsdiv,tfsdiv.btd);
		tfsdiv.btd.onclick = function(e){
			e.stopPropagation();
			if(this.parentNode.parentNode.children.length == 1) return;
			var delf = function() {
				var p = this.parentNode;var pp = p.parentNode;
				var si = p.iid == $CZDHZZ.FIndex ? Graphics.mdxzsyq(p.iid,pp.children.length) : -2;//alert(p.iid);
				if (si >= 0) {
					this.parentNode.parentNode.children[si].btldiv.style.backgroundColor = 'rgb(255,0,255)';
					}
				var ti = si >= 0 ? pp.children[si] : si == -2 ? pp.children[$CZDHZZ.FIndex] : null;//alert(si);
				for(var j = p.iid+1;j < pp.children.length;j++){pp.children[j].iid--;Graphics._resetGETL(pp.children[j],1,1 + j * 26 - 26);pp.children[j].numdiv.innerText = pp.children[j].iid;}
				$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"].splice(p.iid,1);
				$CZDHZZ.FIndex = ti.iid;
				pp.removeChild(p);
				Graphics._DHZMB.fsdiv.refreshzmb();
				}
			Graphics._QRD.GShowModal(this,"确认删除？",delf);
			};
		tfsdiv.onmouseover = function(){this.btd.style.visibility = "visible";this.bta.style.visibility = "visible";};
		tfsdiv.onmouseout = function(){this.btd.style.visibility = "hidden";this.bta.style.visibility = "hidden";};
		this.insertBefore(tfsdiv,this.children[i]);
		return tfsdiv;
	}
	
	this._DHZMB.fsdiv.refresh = function(){
		this.innerHTML = "";
	    for (var i = 0; i < $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"].length;i++) {
			this.addCitem(i);
			}
		$CZDHZZ.FIndex = 0;
		this.children[0].btldiv.style.backgroundColor = 'rgb(250,0,250)';
	    Graphics._KZMB.refresh();
	};
	
	this._DHZMB.fsdiv.refreshzmb = function(){
	    Graphics._KZMB.refresh();
	};
	
	this._createMaskDIV(this._DHZMB);//.style.visibility = "visible";
}

Graphics._createCZMB = function() {
    this._CZMBL = this._createWHTLRBElement('div',60,360,180,310,"hidden");
    this._CZMBL.id = 'CZMB';
	this._CZMBL.style.backgroundColor = 'rgb(255,255,0)';
	this._CZMBL.style.border = "1px solid #000";
    this._BKIVB.appendChild(this._CZMBL);
	
	this._CZMBR = this._createWHTLRBElement('div',60,360,180,910,"hidden");
    this._CZMBR.id = 'CZMB';
	this._CZMBR.style.backgroundColor = 'rgb(255,255,0)';
	this._CZMBR.style.border = "1px solid #000";
    this._BKIVB.appendChild(this._CZMBR);
	
	this._CZMBL.xzbt = this._createWHTLRBElement('div',54,54,2,2,"hidden");
	this._CZMBL.xzbt.style.background = 'url('+$db64img[1]+') top left / contain no-repeat';
	this._CZMBL.xzbt.onclick = function(){Graphics._resetGETL(this.parentNode.xzczdiv,6,4);};
	this._appendCElement(this._CZMBL,this._CZMBL.xzbt);
	
	this._CZMBL.jbt = this._createWHTLRBElement('div',54,54,56,2,"hidden");
	this._CZMBL.jbt.style.background = 'url('+$db64img[2]+') top left / contain no-repeat';
	this._CZMBL.jbt.onclick = function(){
		Graphics._resetGETL(this.parentNode.xzczdiv,60,4);
		var objfz = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex];
		objfz["collisionbox"] = objfz["collisionbox"] || {};
		objfz = objfz["collisionbox"];
		var fxpzks = objfz[Graphics._CZMBL.sxpzk.value] = objfz[Graphics._CZMBL.sxpzk.value] || {"2": [],"4": [],"6": [],"8": []};
		fxpzks[$CZDHZZ.Direction] = fxpzks[$CZDHZZ.Direction] || [];
		fxpzks[$CZDHZZ.Direction].push({"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24});
		
	};
	this._appendCElement(this._CZMBL,this._CZMBL.jbt);
	
	this._CZMBL.ybt = this._createWHTLRBElement('div',54,54,110,2,"hidden");
	this._CZMBL.ybt.style.background = 'url('+$db64img[3]+') top left / contain no-repeat';
	this._CZMBL.ybt.onclick = function(){
		Graphics._resetGETL(this.parentNode.xzczdiv,114,4);
		var objfz = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex];
		objfz["collisioncircular"] = objfz["collisioncircular"] || {};
		objfz = objfz["collisioncircular"];
		var fxpzks = objfz[Graphics._CZMBL.sxpzk.value] = objfz[Graphics._CZMBL.sxpzk.value] || {"2": [],"4": [],"6": [],"8": []};
		fxpzks[$CZDHZZ.Direction] = fxpzks[$CZDHZZ.Direction] || [];
		fxpzks[$CZDHZZ.Direction].push([0,0,10]);
	};
	this._appendCElement(this._CZMBL,this._CZMBL.ybt);
	
	this._CZMBL.sbt = this._createWHTLRBElement('div',54,54,164,2,"hidden");
	this._CZMBL.sbt.style.background = 'url('+$db64img[4]+') top left / contain no-repeat';
	this._CZMBL.sbt.onclick = function(){
		Graphics._resetGETL(this.parentNode.xzczdiv,168,4);
		var objfz = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex];
		objfz["collisiontriangle"] = objfz["collisiontriangle"] || {};
		objfz = objfz["collisiontriangle"];
		var fxpzks = objfz[Graphics._CZMBL.sxpzk.value] = objfz[Graphics._CZMBL.sxpzk.value] || {"2": [],"4": [],"6": [],"8": []};
		fxpzks[$CZDHZZ.Direction] = fxpzks[$CZDHZZ.Direction] || [];
		fxpzks[$CZDHZZ.Direction].push([-10,10,0,-10,10,10]);
	};
	this._appendCElement(this._CZMBL,this._CZMBL.sbt);
	
	this._CZMBL.dbt = this._createWHTLRBElement('div',54,54,218,2,"hidden");
	this._CZMBL.dbt.style.background = 'url('+$db64img[5]+') top left / contain no-repeat';
	this._CZMBL.dbt.onclick = function(){
		Graphics._resetGETL(this.parentNode.xzczdiv,222,4);
		var objd = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["connectpoint"];
		objd[$CZDHZZ.Direction] = objd[$CZDHZZ.Direction] || [];
		objd[$CZDHZZ.Direction].push({"x":0,"y":-10});
	};
	this._appendCElement(this._CZMBL,this._CZMBL.dbt);
	
	this._CZMBL.sxpzk = this._createWHTLRBElement('input',54,20,274,2,"hidden");
	this._CZMBL.sxpzk.type = "text";
	this._CZMBL.sxpzk.onkeydown = function(e){e.preventDefault();}
	this._CZMBL.sxpzk.value = "无";
	this._CZMBL.sxpzk.style.backgroundColor = 'rgb(230,240,250)';
	this._CZMBL.sxpzk.style.border = "1px solid #000";
	this._appendCElement(this._CZMBL,this._CZMBL.sxpzk);
	
	this._CZMBL.bcbt = this._createWHTLRBElement('div',54,20,298,2,"hidden");
	this._CZMBL.bcbt.innerText = "保存";
	this._CZMBL.bcbt.style.backgroundColor = 'rgb(230,240,250)';
	this._CZMBL.bcbt.style.border = "1px solid #000";
	this._CZMBL.bcbt.onclick = function(){
		var jsonf = {"qjsz":$QJSZ,"dataFramesAnimation":$dataFramesAnimationKSH};
		Graphics.savejsonfile(JSON.stringify(jsonf));
	};
	this._appendCElement(this._CZMBL,this._CZMBL.bcbt);
	
	this._CZMBL.xzczdiv = this._createWHTLRBElement("div",10,10,6,4);
	this._CZMBL.xzczdiv.style.borderRadius = "50%";
	this._CZMBL.xzczdiv.style.backgroundColor = 'rgba(255,0,255,0.5)';
	this._appendCElement(this._CZMBL,this._CZMBL.xzczdiv);
	
	this._createMaskDIV(this._CZMBL);//.style.visibility = "visible";
	this._createMaskDIV(this._CZMBR);//.style.visibility = "visible";
	
}

Graphics._createTPXZDIALOG = function() {
    this._createCanMoveDialog("_TPXZDIALOG","选择图片",500,380,160,390,"hidden");
    this._TPXZDIALOG.id = 'xjdialog';
	this._TPXZDIALOG.selectimg = -1;
	this._TPXZDIALOG.GShowModal = function(){
		var tfs = Graphics.fs.readdirSync("img/characters");//alert(tfs[0].substr(tfs[0].length - 4,4));
	    for(var i = 0; i < tfs.length; i++) {
		    var tfsdiv = Graphics._createWHTLRBElement('div',138,20,0 + i * 24,1,"visible",12);
			tfsdiv.index = i;
			tfsdiv.style.backgroundColor = 'rgb(250,250,250)';
			tfsdiv.style.borderTop = "1px solid #000";
			tfsdiv.style.borderBottom = "1px solid #000";
			tfsdiv.innerText = tfs[i].slice(0,tfs[i].length - 4);
			//tfsdiv.onclick = function(ki){this._TPXZDIALOG.TPXSDIV.style.background = 'url('+'img/characters/' + Graphics.fs.readdirSync("img/characters")[ki] +') top left / contain no-repeat';}.bind(this,i);
			tfsdiv.onclick = function(){
			Graphics._TPXZDIALOG.TPXSDIV.style.background = 'url('+'img/characters/' + this.innerText +'.png) top left / contain no-repeat';
			if(Graphics._TPXZDIALOG.selectimg >= 0){this.parentNode.children[Graphics._TPXZDIALOG.selectimg].style.backgroundColor = 'rgb(250,250,250)';};
			    Graphics._TPXZDIALOG.selectimg = this.index;
				this.parentNode.children[Graphics._TPXZDIALOG.selectimg].style.backgroundColor = 'rgb(250,0,250)';
				};
		this.sidiv.appendChild(tfsdiv);
	}
	this.showModal();};
    this._TPXZDIALOG.GCloseModal = function(){this.sidiv.innerHTML = "";this.close();};
	
	var bt = this._createWHTLRBElement('button',80,30,360,410);
	bt.innerText = "取消";
	bt.onclick = function(){Graphics._TPXZDIALOG.GCloseModal();};
	this._appendCElement(this._TPXZDIALOG,bt);
	
	bt = this._createWHTLRBElement('button',80,30,360,320);
	bt.innerText = "确定";
	bt.onclick = function(){//Graphics.csd.GShowModal();/*Graphics._TPXZDIALOG.GCloseModal();*/
	    if (Graphics._TPXZDIALOG.selectimg < 0) return;
		var ts = Graphics._TPXZDIALOG.sidiv.children[Graphics._TPXZDIALOG.selectimg];
		if (!!$dataFramesAnimationKSH[ts.innerText]) {/*$CZDHZZ.Name = ts.innerText;Graphics._CHLB.itemsDIV.refresh();Graphics._TPXZDIALOG.GCloseModal();*/return;};
	    var ti = Graphics._DHLB.itemsDIV.addCitem(Graphics._DHLB.itemsDIV.children.length,ts.innerText);
		$dataFramesAnimationKSH[ts.innerText] = {"WalkAnime_0":JSON.parse(JSON.stringify($DWFA)),"StepAnime_0":JSON.parse(JSON.stringify($DSFA))};
		//$dataFramesAnimationKSH[ts.innerText][ts.innerText] = JSON.parse(JSON.stringify($XJDH));
		Graphics._DHLB.itemsDIV.onsichange(ti);
		$CZDHZZ.Name = ts.innerText;
		Graphics._CHLB.itemsDIV.refresh();
		//Graphics._TPXZDIALOG.GCloseModal();
	};
	this._appendCElement(this._TPXZDIALOG,bt);
	
	this._TPXZDIALOG.sidiv = this._createWHTLRBElement('div',140,300,40,0,/*"hidden"*//*"visible"*/"auto"/*null*/,16);
	this._TPXZDIALOG.sidiv.style.backgroundColor = 'rgb(255,255,0)';
	this._TPXZDIALOG.sidiv.style.border = "2px solid #00f";
	this._appendCElement(this._TPXZDIALOG,this._TPXZDIALOG.sidiv);
	
	this._TPXZDIALOG.TPXSDIV = this._createWHTLRBElement('div',320,300,40,160,/*"hidden"*//*"visible"*/"auto"/*null*/,16);
	//this._TPXZDIALOG.TPXSDIV.style.backgroundColor = 'rgb(255,255,0)';
	//this._TPXZDIALOG.TPXSDIV.style.background = 'url('+'img/enemies/' + 'Goddess' +'.png) top left / contain no-repeat';
	this._TPXZDIALOG.TPXSDIV.style.border = "2px solid #00f";
	this._appendCElement(this._TPXZDIALOG,this._TPXZDIALOG.TPXSDIV);
	
	this._updateDIALOGWHTLRB(this._TPXZDIALOG);
	
	Graphics._createCSD();
};

Graphics._createTISD = function() {
	this._createCanMoveDialog("_TISD","提示",160,140,0,0,"hidden");
	this._TISD.GShowModal = function(t){this.Gleft = 520;this.Gtop = 310;Graphics._updateDIALOGWHTLRB(this);this.tstdiv.innerText = t || "";this.showModal();};
    this._TISD.GCloseModal = function(){this.tstdiv.innerText = "";this.close();};
	
	this._TISD.tstdiv = this._createWHTLRBElement('div',156,96,32,0);
	this._TISD.tstdiv.style.backgroundColor = 'rgb(255,255,255)';
	this._TISD.tstdiv.style.border = "1px solid #000";
	this._TISD.tstdiv.style.padding = "1px";
	this._TISD.tstdiv.style.textAlign = 'center';
	this._appendCElement(this._TISD,this._TISD.tstdiv);
	
	var bt = this._createWHTLRBElement('button',80,30,136,35);
	bt.innerText = "确定";
	bt.onclick = function(){this.parentNode.GCloseModal();};
	this._appendCElement(this._TISD,bt);
	
	this._updateDIALOGWHTLRB(this._TISD);
}

Graphics._createQRD = function() {
	this._createCanMoveDialog("_QRD","确认",160,140,0,0,"hidden");
	this._QRD.GShowModal = function(fzx,t,qrf,qxf,qrfcsz,qxfcsz){
		this.Gleft = 520;this.Gtop = 310;Graphics._updateDIALOGWHTLRB(this);this.tstdiv.innerText = t || "";
		this.qrf = qrf || function(){};this.qxf = qxf || function(){};this.fzx = fzx;this.qrfcsz = qrfcsz || [];this.qxfcsz = qxfcsz || [];
		this.showModal();};
    this._QRD.GCloseModal = function(){this.tstdiv.innerText = "";this.qrf = function(){};this.qxf = function(){};this.fzx = null;this.close();};
	this._QRD.qrf = function(){};this._QRD.qxf = function(){};this._QRD.fzx = null;this._QRD.qrfcsz = [];this._QRD.qxfcsz = [];
	
	this._QRD.tstdiv = this._createWHTLRBElement('div',156,96,32,0);
	this._QRD.tstdiv.style.backgroundColor = 'rgb(255,255,255)';
	this._QRD.tstdiv.style.border = "1px solid #000";
	this._QRD.tstdiv.style.padding = "1px";
	this._QRD.tstdiv.style.textAlign = 'center';
	this._appendCElement(this._QRD,this._QRD.tstdiv);
	
	var btqr = this._createWHTLRBElement('button',60,30,136,10);
	btqr.innerText = "确定";
	btqr.onclick = function(){
		var p = this.parentNode;;
		p.qrf.bind(p.fzx || this)(...p.qrfcsz);
		p.GCloseModal();
		};
	this._appendCElement(this._QRD,btqr);
	
	var btqx = this._createWHTLRBElement('button',60,30,136,90);
	btqx.innerText = "取消";
	btqx.onclick = function(){
		var p = this.parentNode;
		p.qxf.bind(p.fzx || this)(...p.qxfcsz);
		p.GCloseModal();
		};
	this._appendCElement(this._QRD,btqx);
	
	this._updateDIALOGWHTLRB(this._QRD);
}

Graphics._createCSD = function() {
	this._createCanMoveDialog("csd","csd",150,300,100,100,"hidden");
	this.csd.ts = this._createWHTLRBElement("input",100,16,30,0,"hidden",16);
	this.csd.ts.type = "number";
	this.csd.ts.value = 0;
	this.csd.ts.max = 255;
	this.csd.ts.min = 0;
	this.csd.ts.onkeydown = function(e){/*alert(e.keyCode);*/if (e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 110) e.preventDefault();}
	this.csd.ts.onkeyup = function(){/*this.value = this.value.replace(/[^0-9]/g,'') * 1;*/ if (this.value > 255) this.value = 255;if (this.value < 0) this.value = 0;}
	/* var ts = this._createWHTLRBElement("div",100,16,30,0,"hidden",16);
	ts.contentEditable = "true"; */
	/*var ts = this._createWHTLRBElement("div",100,100,30,0,"hidden",16);
	ts.style.borderRadius = "50%";*/
	this.csd.ts.style.backgroundColor = 'rgb(255,0,0)';
	this._appendCElement(Graphics.csd,this.csd.ts);
	var ts = this._createWHTLRBElement("input",100,16,46,0,"hidden",16);//document.createElement(e);
	ts.type = "range";
	ts.value = this.csd.ts.value;
	ts.max = 255;
	ts.min = 0;
	ts.oninput = function(){Graphics.csd.ts.value = this.value;}
	this._appendCElement(Graphics.csd,ts);
	ts = this._createWHTLRBElement("select",100,28,62,0,"hidden",16);ts.onchange = function(){alert(this.value)}
	this._appendCElement(Graphics.csd,ts);
	var tsle = this._createWHTLRBElement("option",100,28,0,0,"hidden",16);tsle.value = "cs";tsle.innerText = "cs";this._appendCElement(ts,tsle);
	tsle = this._createWHTLRBElement("option",100,28,0,0,"hidden",16);tsle.value = "选择";tsle.innerText = "选择";tsle.selected = true;this._appendCElement(ts,tsle);
	this._updateDIALOGWHTLRB(Graphics.csd);
}

//创建全部对话框
Graphics._createAllDIALOG = function() {
    this._createTPXZDIALOG();
	this._createTISD();
	this._createQRD();
};

//更新全部对话框
Graphics._updateAllDIALOG = function() {
    //this._updateDIALOGWHTLRB(this._TPXZDIALOG);
	//this._updateDIALOGWHTLRB(this._XJCHLBMC);
	for(var i = 0; i < $DIALOG.length; i++) {
		this._updateDIALOGWHTLRB($DIALOG[i].dialog);
	}
};

//创建全部DIV
Graphics._createAllDIVB = function() {
    this._createBKIVB();
	this._createDHLB();
	this._createCHLB();
	this._createMYXB();
	this._createKZMB();
	this._createXXMB();
	this._createDHZMB();
	this._createCZMB();
};

//更新全部DIV
Graphics._updateAllDIVB = function() {
    this._updateBKIVB();
	this._updateCElement(this._DHLB);
	this._updateCElement(this._CHLB);
	this._updateCElement(this._MYXB);
	this._updateCElement(this._KZMB);
	this._updateCElement(this._XXMB);
	this._updateCElement(this._DHZMB);
	this._updateCElement(this._CZMBL);
	this._updateCElement(this._CZMBR);
};

//初始化面板信息
Graphics._CSHMBXX = function() {
	this._DHLB.jysymb();
	this._DHLB.itemsDIV.refresh();
    this._CHLB.itemsDIV.refresh();
	this._MYXB.pzkfzidiv.csh();
};

var Graphics_d4mjjscfajyksh_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
    Graphics_d4mjjscfajyksh_createAllElements.call(this);
	this._createAllDIVB();
	this._createAllDIALOG();
	this._CSHMBXX();
};

var Graphics_d4mjjscfajyksh_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
    Graphics_d4mjjscfajyksh_updateAllElements.call(this);
	this._updateAllDIVB();
	this._updateAllDIALOG();
};

Graphics._updateRealScale = function() {
    if (this._stretchEnabled) {
        var h = window.innerWidth / 1280;
        var v = window.innerHeight / 720;
        this._realScale = Math.min(h, v);
    } else {
        this._realScale = this._scale;
    }
};


TouchInput._onMiddleButtonDown = function(event) {
	var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._mouseMPressed = true;
		this.mx = x;this.my = y;
		this._x = x;this._y = y;
    }
};

TouchInput._onMouseMove = function(event) {
    if (this._mousePressed) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);
    }
	if (this._mouseMPressed) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
		this._x = x;this._y = y;
    }
	this.ommx = Graphics.pageToCanvasX(event.pageX);this.ommy = Graphics.pageToCanvasY(event.pageY);
};

TouchInput._onMouseUp = function(event) {
    if (event.button === 0) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = false;
        this._onRelease(x, y);
    }
	if (event.button === 1) {
        this._mouseMPressed = false;
    }
};



ImageManager.loadBase64Bitmap = function(path, hue) {
    bitmap = Bitmap.load(path);
    bitmap.addLoadListener(function() {
		bitmap.rotateHue(hue || 0);
	});
    return bitmap; 
};

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_OBBEdit);
        Window_TitleCommand.initCommandPosition();
    } 
    this.updateDocumentTitle();
};

function Scene_OBBEdit() {
    this.initialize.apply(this, arguments);
}

Scene_OBBEdit.prototype = Object.create(Scene_Base.prototype);

Scene_OBBEdit.prototype.constructor = Scene_OBBEdit;

Scene_OBBEdit.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_OBBEdit.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this._backSprite = new TilingSprite(ImageManager.loadBase64Bitmap($db64img[6]));
	this._backSprite.move(0,0,SceneManager._screenWidth,SceneManager._screenHeight);
    this.addChild(this._backSprite);
	
	this._OBBCharacterSprite = new Sprite_OBBCharacter($CZDHZZ.Name);
	this._backSprite.addChild(this._OBBCharacterSprite);
	
	this._OBBEidtWindow = new Window_OBBEidt(0, 0, SceneManager._screenWidth, SceneManager._screenHeight);
    this.addChild(this._OBBEidtWindow);
	this._OBBEidtWindow.opacity = 0;
	
};

Scene_OBBEdit.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
};

Scene_OBBEdit.prototype.update = function() {
	//if (!this.isReady()) return;
    Scene_Base.prototype.update.call(this);
};

function Sprite_OBBCharacter() {
    this.initialize.apply(this, arguments);
}

Sprite_OBBCharacter.prototype = Object.create(Sprite_Base.prototype);
Sprite_OBBCharacter.prototype.constructor = Sprite_OBBCharacter;

Sprite_OBBCharacter.prototype.initialize = function(characterName) {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
    this.setCharacter(characterName);
};

Sprite_OBBCharacter.prototype.initMembers = function() {
	this.scalesz = [0.25,0.5,0.75,1,2,3,4,5,6,7,8];
	this.scaleszi = 3;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
	this.x = SceneManager._screenWidth / 2;
	this.y = SceneManager._screenHeight / 2;
};

Sprite_OBBCharacter.prototype.setCharacter = function(characterName) {
    this._characterName = characterName || "";
	this.setCharacterBitmap();
};

Sprite_OBBCharacter.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	if ($CZDHZZ.Name == "") return;
	this.updatAnchor();
    this.updateBitmap();
    this.updateFrame();
	this.updateScale();
	this.updatePosition();
};

Sprite_OBBCharacter.prototype.updatAnchor = function() {
    this.anchor = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["anchor"][$CZDHZZ.Direction];
};

Sprite_OBBCharacter.prototype.updateBitmap = function() {
    if (this.isImageChanged()) {
        this.setCharacter($CZDHZZ.Name);
    }
};

Sprite_OBBCharacter.prototype.updateScale = function() {
	if (TouchInput.wheelY >= 20) {
		if (this.scaleszi == 0) return;
		this.scaleszi--;
		this.scale.x = this.scalesz[this.scaleszi];
		this.scale.y = this.scalesz[this.scaleszi];
	}
	if (TouchInput.wheelY <= -20) {
		if (this.scaleszi == 10) return;
		this.scaleszi++;
		this.scale.x = this.scalesz[this.scaleszi];
		this.scale.y = this.scalesz[this.scaleszi];
    }
};

Sprite_OBBCharacter.prototype.updatePosition = function() {
	if (TouchInput._mouseMPressed) {
		this.x += TouchInput._x - TouchInput.mx;
		this.y += TouchInput._y - TouchInput.my;
		TouchInput.mx = TouchInput._x;TouchInput.my = TouchInput._y;
	}
};

Sprite_OBBCharacter.prototype.isImageChanged = function() {
    return this._characterName !== $CZDHZZ.Name;
};

Sprite_OBBCharacter.prototype.setCharacterBitmap = function() {
    this.bitmap = ImageManager.loadCharacter(this._characterName);
};

Sprite_OBBCharacter.prototype.updateFrame = function() {
	var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
	this.setFrame(sx, sy, pw, ph);
};
//人物块x
Sprite_OBBCharacter.prototype.characterBlockX = function() {
	var index = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["characterIndex"];
	return index % 4 * 3;
};
//人物块y
Sprite_OBBCharacter.prototype.characterBlockY = function() {
	var index = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["characterIndex"];
	return Math.floor(index / 4) * 4;
};
//人物图案x
Sprite_OBBCharacter.prototype.characterPatternX = function() {
    return $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["pattern"];
};
//人物图案y
Sprite_OBBCharacter.prototype.characterPatternY = function() {
    return ($CZDHZZ.Direction - 2) / 2;
};

Sprite_OBBCharacter.prototype.patternWidth = function() {
	return this.bitmap.width / 12;
};

Sprite_OBBCharacter.prototype.patternHeight = function() {
	return this.bitmap.height / 8;
};

function Window_OBBEidt() {
    this.initialize.apply(this, arguments);
	this.initMembers();
}


Window_OBBEidt.prototype = Object.create(Window_Base.prototype);
Window_OBBEidt.prototype.constructor = Window_OBBEidt;

Window_OBBEidt.prototype.initMembers = function() {
	this.ctx = this.contents.canvas.getContext('2d');
	this.CSOBJ = {"parent":null,"child":null};
	this.CCAC = null;
	this.Direction = $CZDHZZ.Direction;
	this.omx = null;
	this.omy = null;
	
	//测试
	//this.initMembersCS();
};

Window_OBBEidt.prototype.initMembersCS = function() {
	//三角形与三角形碰撞测试
	console.log(this.isTOT([50,50,60,50,60,70],[100,100,110,110,110,130]));
	console.log(this.isTOT([2,1,2,1,2,1],[2.1,1,2.1,1,2.1,1]));
	console.log(this.isTOT([2,1,2,1,2,1],[2,1,2,1,2,1]));
	console.log(this.isTOT([2,1,2,1,2,1],[2.1,1,2,2,2,2]));
	console.log(this.isTOT([0,0,1,1,2,2],[2+4,2+4,1+4,1+4,0+4,0+4]));
	console.log(this.isTOT([0,0,1,1,2,2],[0+1,0+1,1+1,1+1,2+1,2+1]));
	console.log(this.isTOC([0,0,1,1,2,2],100,200,20));
};

Window_OBBEidt.prototype.standardPadding = function() {
    return 0;
};

//获取旋转矩形八个定位点坐标
Window_OBBEidt.prototype.getOBBR8DWDXY = function(ro,cx,cy,hw,hh) {
	var sra = Math.sin(ro); var cra = Math.cos(ro);
	
	//求hh和hw的水平分量和垂直分量
	var hwox  = hw * cra; var hwoy = hw * sra;
	var hhox  = hh * -sra; var hhoy = hh * cra;

	//求矩形四条边的中心点坐标
	var zxd0x = cx - hwox; var zxd0y = cy - hwoy;
	var zxd1x = cx - hhox; var zxd1y = cy - hhoy;
	var zxd2x = cx + hwox; var zxd2y = cy + hwoy;
	var zxd3x = cx + hhox; var zxd3y = cy + hhoy;
	
	//求矩形四个顶点的坐标
	var dd0x = zxd1x - hwox; var dd0y = zxd1y - hwoy;
	var dd1x = zxd1x + hwox; var dd1y = zxd1y + hwoy;
	var dd2x = zxd3x + hwox; var dd2y = zxd3y + hwoy;
	var dd3x = zxd3x - hwox; var dd3y = zxd3y - hwoy;
	
	return [[zxd0x,zxd0y],[dd0x,dd0y],[zxd1x,zxd1y],[dd1x,dd1y],[zxd2x,zxd2y],[dd2x,dd2y],[zxd3x,zxd3y],[dd3x,dd3y]];
}

//绘制BBT
Window_OBBEidt.prototype.drawBBT = function(ctx,ro,x,y,l,r) {
	var sra = Math.sin(ro); var cra = Math.cos(ro);
	var xl = l * cra; var yl = l * sra;
	var xr = r * cra; var yr = r * sra;
	
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.moveTo(x,y);
	ctx.lineTo(x + xl,y + yl);
	ctx.closePath();
	ctx.stroke();
	
	Bitmap.drawCircular(ctx,x + xl + xr,y + yl + yr,r,'rgb(255,255,255)');
}

Window_OBBEidt.prototype.update = function() {
	this.updatedraw();
	Window_Base.prototype.update.call(this);
};

Window_OBBEidt.prototype.updatedraw = function() {
	this.contents.clear();
	if(!$QJSZ.SFXSPZK) return;
	if ($CZDHZZ.Name == "") return;
	this.updateCCACD();
	this.updateCSOBJ();
	this.updateCSOBJMoved();
	this.drawCollisionBox();
	this.drawCollisionTriangle();
	this.drawCollisionCircular();
	this.drawConnectPoint();
	this.drawAnchorPoint();
	this.updatedrawCSOBJC();
	this.drawPZKSLXX();
	
	//测试
	//this.updatedrawcs();
};

Window_OBBEidt.prototype.updateCCACD = function() {
	if (this.CCAC != $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]) {
		this.CCAC = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex];
		this.CSOBJ = {"parent":null,"child":null};
		Graphics._XXMB.showcmb(-1);
		
		//测试
		//this.updateCCACDcs();
	}
	
	if (this.Direction != $CZDHZZ.Direction) {
		this.Direction = $CZDHZZ.Direction;
		this.CSOBJ = {"parent":null,"child":null};
		Graphics._XXMB.showcmb(-1);
	}
};

Window_OBBEidt.prototype.updateCCACDcs = function() {
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"] = {"ct":{"6":[[0,0,15,20,10,10]]}};
		$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"] = {"cc":{"6":[[0,0,20]]}};
};

//更新当前选择的对象
Window_OBBEidt.prototype.updateCSOBJ = function() {
	//当左键按下
	if (TouchInput.isTriggered()) {
		this.omx = TouchInput._x; this.omy = TouchInput._y;
		this.CSOBJ.child = null;
		var SSOCS = SceneManager._scene._OBBCharacterSprite;
		var SSOCSSI = SSOCS.scalesz[SSOCS.scaleszi];
		
		if (!!this.CSOBJ.parent) {
			var obj = this.CSOBJ.parent.obj;
			
			if (this.CSOBJ.parent.category == "ac") {
				//无操作
			} else if (this.CSOBJ.parent.category == "cb") {
				
				var DWDS = this.getOBBR8DWDXY(obj.ro,SSOCS.x + obj.cx * SSOCSSI,SSOCS.y + obj.cy * SSOCSSI,obj.hw * SSOCSSI,obj.hh * SSOCSSI);
				var sra = Math.sin(obj.ro); var cra = Math.cos(obj.ro);
	            var xl = 20 * cra; var yl = 20 * sra;
	            var xr = 5 * cra; var yr = 5 * sra;
				for (var i = 0; i < 8; i++) {
					if (this.isPointinOBBRectangle([TouchInput._x,TouchInput._y],obj.ro,DWDS[i][0],DWDS[i][1],4,4)) {
						this.CSOBJ.child = {"si":i};
					}
				}
				if (this.isPointinCircular([TouchInput._x,TouchInput._y],DWDS[4][0] + xl + xr,DWDS[4][1] + yl + yr,5)) {
					this.CSOBJ.child = {"si":8};
				}
				
			} else if (this.CSOBJ.parent.category == "ct") {
				for (var i = 0; i < 3; i++) {
					if (this.isPointinCircular([TouchInput._x,TouchInput._y],SSOCS.x + obj[i * 2] * SSOCSSI,SSOCS.y + obj[i * 2 + 1] * SSOCSSI,4)) {
						this.CSOBJ.child = {"si":i};
					}
				}
				
			} else if (this.CSOBJ.parent.category == "cc") {
				if (this.isPointinCircular([TouchInput._x,TouchInput._y],SSOCS.x + (obj[0] - obj[2]) * SSOCSSI,SSOCS.y + obj[1] * SSOCSSI,4)) {
						this.CSOBJ.child = {"si":-1};
					}
				if (this.isPointinCircular([TouchInput._x,TouchInput._y],SSOCS.x + (obj[0] + obj[2]) * SSOCSSI,SSOCS.y + obj[1] * SSOCSSI,4)) {
						this.CSOBJ.child = {"si":1};
					}
			} else if (this.CSOBJ.parent.category == "cp") {
				//无操作
			}
		}
		
		if (!this.CSOBJ.child) {
			this.CSOBJ.parent = null;
			
			//旋转矩形
			var FNCAICB = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"];
			for (var key in FNCAICB) {
				if (!FNCAICB[key][$CZDHZZ.Direction]) continue;
				for (var i = 0;i < FNCAICB[key][$CZDHZZ.Direction].length;i++) {
					var obj = FNCAICB[key][$CZDHZZ.Direction][i];
					if (this.isPointinOBBRectangle([TouchInput._x,TouchInput._y],
					obj.ro,SSOCS.x + obj.cx * SSOCSSI,SSOCS.y + obj.cy * SSOCSSI,obj.hw * SSOCSSI,obj.hh * SSOCSSI)) {
						this.CSOBJ.parent = {"category":"cb","obj":obj};
					}
				}
			}
			//三角形
			var FNCAICT = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"];
			for (var key in FNCAICT) {
				if (!FNCAICT[key][$CZDHZZ.Direction]) continue;
				for (var i = 0;i < FNCAICT[key][$CZDHZZ.Direction].length;i++) {
					var obj = FNCAICT[key][$CZDHZZ.Direction][i];
					if (this.isPointinTriangle([TouchInput._x,TouchInput._y],[
					SSOCS.x + obj[0] * SSOCSSI,
					SSOCS.y + obj[1] * SSOCSSI,
					SSOCS.x + obj[2] * SSOCSSI,
					SSOCS.y + obj[3] * SSOCSSI,
					SSOCS.x + obj[4] * SSOCSSI,
					SSOCS.y + obj[5] * SSOCSSI])) {
						this.CSOBJ.parent = {"category":"ct","obj":obj};
					}
				}
			}
			//圆形
			var FNCAICC = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"];
			for (var key in FNCAICC) {
				if (!FNCAICC[key][$CZDHZZ.Direction]) continue;
				for (var i = 0;i < FNCAICC[key][$CZDHZZ.Direction].length;i++) {
					var obj = FNCAICC[key][$CZDHZZ.Direction][i];
					if (this.isPointinCircular([TouchInput._x,TouchInput._y],SSOCS.x + obj[0] * SSOCSSI,SSOCS.y + obj[1] * SSOCSSI,obj[2] * SSOCSSI)) {
						this.CSOBJ.parent = {"category":"cc","obj":obj};
					}
				}
			}
			//点
			var FNCAICP = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["connectpoint"];
			if (!!FNCAICP[$CZDHZZ.Direction]) {
				for (var i = 0; i < FNCAICP[$CZDHZZ.Direction].length; i++) {
					var obj = FNCAICP[$CZDHZZ.Direction][i];
					if (this.isPointinCircular([TouchInput._x,TouchInput._y],SSOCS.x + obj.x * SSOCSSI,SSOCS.y + obj.y * SSOCSSI,8)) {
						this.CSOBJ.parent = {"category":"cp","obj":obj};
					}
				}
			}
			//原点
			if (this.isPointinCircular([TouchInput._x,TouchInput._y],SSOCS.x,SSOCS.y,8)) {
				this.CSOBJ.parent = {"category":"ac","obj":null};
			}
		}
		this.showCSOBJMB();
	}
	
	//当左键抬起
	if (TouchInput.isReleased()) {
		this.CSOBJ.child = null;
	}
};

//更新当前选择对象移动
Window_OBBEidt.prototype.updateCSOBJMoved = function() {
	//当左键按下
	if (TouchInput.isMoved()) {
		var SSOCS = SceneManager._scene._OBBCharacterSprite;
		var SSOCSSI = SSOCS.scalesz[SSOCS.scaleszi];
		
		if (!!this.CSOBJ.parent && !!this.CSOBJ.child) {
			var obj = this.CSOBJ.parent.obj;
			
			if (this.CSOBJ.parent.category == "ac") {
				//无操作
			} else if (this.CSOBJ.parent.category == "cb") {
				var tobj = this.adjustBox(
				                          obj.ro,SSOCS.x + obj.cx * SSOCSSI,SSOCS.y + obj.cy * SSOCSSI,obj.hw * SSOCSSI,obj.hh * SSOCSSI,
				                          this.CSOBJ.child.si,TouchInput._x,TouchInput._y);
				obj.ro = tobj.ro;
				obj.cx = (tobj.cx - SSOCS.x) / SSOCSSI;
				obj.cy = (tobj.cy - SSOCS.y) / SSOCSSI;
				obj.hw = tobj.hw / SSOCSSI;
				obj.hh = tobj.hh / SSOCSSI;
				this.CSOBJ.child.si = tobj.i;
				Graphics._XXMB.setcmbdata(1,obj);
				
			} else if (this.CSOBJ.parent.category == "ct") {
				obj[this.CSOBJ.child.si * 2] = (TouchInput._x - SSOCS.x) / SSOCSSI;
				obj[this.CSOBJ.child.si * 2 + 1] = (TouchInput._y - SSOCS.y) / SSOCSSI;
				Graphics._XXMB.setcmbdata(2,obj);
			} else if (this.CSOBJ.parent.category == "cc") {
				obj[2] = Math.sqrt(Math.pow((TouchInput._x - obj[0] * SSOCSSI - SSOCS.x) / SSOCSSI,2) + Math.pow((TouchInput._y - obj[1] * SSOCSSI - SSOCS.y) / SSOCSSI,2));
				Graphics._XXMB.setcmbdata(3,obj);
			} else if (this.CSOBJ.parent.category == "cp") {
				//无操作
			}
		} else if (!!this.CSOBJ.parent) {
			var obj = this.CSOBJ.parent.obj;
			if (this.CSOBJ.parent.category == "ac") {
				var tx = SSOCS.x; var ty = SSOCS.y;
				SSOCS.x = TouchInput._x; SSOCS.y = TouchInput._y;
				this.CCAC.anchor[$CZDHZZ.Direction].x += (TouchInput._x - tx) / SSOCSSI / SSOCS._frame.width;
				this.CCAC.anchor[$CZDHZZ.Direction].y += (TouchInput._y - ty) / SSOCSSI / SSOCS._frame.height;
				SSOCS.anchor = this.CCAC.anchor[$CZDHZZ.Direction];
				this.refreshPZKPY((tx - TouchInput._x) / SSOCSSI,(ty - TouchInput._y) / SSOCSSI);
				Graphics._XXMB.setcmbdata(0,this.CCAC.anchor[$CZDHZZ.Direction]);
			} else if (this.CSOBJ.parent.category == "cb") {
				obj.cx += (TouchInput._x - this.omx) / SSOCSSI;
		        obj.cy += (TouchInput._y - this.omy) / SSOCSSI;
				Graphics._XXMB.setcmbdata(1,obj);
			} else if (this.CSOBJ.parent.category == "ct") {
				for (var i = 0; i < 3; i++) {
					obj[i * 2] += (TouchInput._x - this.omx) / SSOCSSI;
				    obj[i * 2 + 1] += (TouchInput._y - this.omy) / SSOCSSI;
				}
				Graphics._XXMB.setcmbdata(2,obj);
			} else if (this.CSOBJ.parent.category == "cc") {
				obj[0] += (TouchInput._x - this.omx) / SSOCSSI;
				obj[1] += (TouchInput._y - this.omy) / SSOCSSI;
				Graphics._XXMB.setcmbdata(3,obj);
			} else if (this.CSOBJ.parent.category == "cp") {
				obj.x += (TouchInput._x - this.omx) / SSOCSSI;
				obj.y += (TouchInput._y - this.omy) / SSOCSSI;
				Graphics._XXMB.setcmbdata(4,obj);
			}
			
		}
		this.omx = TouchInput._x; this.omy = TouchInput._y;
	}
};

//绘制当前选择对象的子对象
Window_OBBEidt.prototype.updatedrawCSOBJC = function() {
	if (!this.CSOBJ.parent) return;
	
	var obj = this.CSOBJ.parent.obj;
	var SSOCS = SceneManager._scene._OBBCharacterSprite;
	var SSOCSSI = SSOCS.scalesz[SSOCS.scaleszi];
	
	if (this.CSOBJ.parent.category == "ac") {
		//暂未定义操作
	} else if (this.CSOBJ.parent.category == "cb") {
		var DWDS = this.getOBBR8DWDXY(obj.ro,SSOCS.x + obj.cx * SSOCSSI,SSOCS.y + obj.cy * SSOCSSI,obj.hw * SSOCSSI,obj.hh * SSOCSSI);
		for (var i = 0; i < 8; i++) {
			Bitmap.drawOBB(this.ctx,obj.ro,DWDS[i][0],DWDS[i][1],4,4,'rgb(255,255,255)');
		}
		this.drawBBT(this.ctx,obj.ro,DWDS[4][0],DWDS[4][1],20,5);
	} else if (this.CSOBJ.parent.category == "ct") {
		Bitmap.drawCircular(this.ctx,SSOCS.x + obj[0] * SSOCS.scalesz[SSOCS.scaleszi],SSOCS.y + obj[1] * SSOCS.scalesz[SSOCS.scaleszi],4,'rgb(255,255,255)');
		Bitmap.drawCircular(this.ctx,SSOCS.x + obj[2] * SSOCS.scalesz[SSOCS.scaleszi],SSOCS.y + obj[3] * SSOCS.scalesz[SSOCS.scaleszi],4,'rgb(255,255,255)');
		Bitmap.drawCircular(this.ctx,SSOCS.x + obj[4] * SSOCS.scalesz[SSOCS.scaleszi],SSOCS.y + obj[5] * SSOCS.scalesz[SSOCS.scaleszi],4,'rgb(255,255,255)');
			
	} else if (this.CSOBJ.parent.category == "cc") {
		Bitmap.drawCircular(this.ctx,SSOCS.x + (obj[0] - obj[2]) * SSOCS.scalesz[SSOCS.scaleszi],SSOCS.y + obj[1] * SSOCS.scalesz[SSOCS.scaleszi],4,'rgb(255,255,255)');
		Bitmap.drawCircular(this.ctx,SSOCS.x + (obj[0] + obj[2]) * SSOCS.scalesz[SSOCS.scaleszi],SSOCS.y + obj[1] * SSOCS.scalesz[SSOCS.scaleszi],4,'rgb(255,255,255)');	
	} else if (this.CSOBJ.parent.category == "cp") {
		//暂未定义操作
	}
};

//
Window_OBBEidt.prototype.showCSOBJMB = function() {
	if (!this.CSOBJ.parent) {Graphics._XXMB.showcmb(-1);return;}
	
	var obj = this.CSOBJ.parent.obj;
	
	if (this.CSOBJ.parent.category == "ac") {
		Graphics._XXMB.setcmbdata(0,this.CCAC.anchor[$CZDHZZ.Direction]);
		Graphics._XXMB.showcmb(0);
	} else if (this.CSOBJ.parent.category == "cb") {
		Graphics._XXMB.setcmbdata(1,obj);
		Graphics._XXMB.showcmb(1);
	} else if (this.CSOBJ.parent.category == "ct") {
		Graphics._XXMB.setcmbdata(2,obj);
		Graphics._XXMB.showcmb(2);
	} else if (this.CSOBJ.parent.category == "cc") {
		Graphics._XXMB.setcmbdata(3,obj);
		Graphics._XXMB.showcmb(3);	
	} else if (this.CSOBJ.parent.category == "cp") {
		Graphics._XXMB.setcmbdata(4,obj);
		Graphics._XXMB.showcmb(4);
	}
};

//调整旋转矩形
Window_OBBEidt.prototype.adjustBox = function(ro,cx,cy,hw,hh,i,x,y) {
	var sra = Math.sin(ro); var cra = Math.cos(ro);
	
	var xzb = [cra,sra];
	var yzb = [sra,-cra];
	
	//求hh和hw的水平分量和垂直分量
	var hwox  = hw * cra; var hwoy = hw * sra;
	var hhox  = hh * -sra; var hhoy = hh * cra;

	//求矩形四条边的中心点坐标
	var zxd0x = cx - hwox; var zxd0y = cy - hwoy;
	var zxd1x = cx - hhox; var zxd1y = cy - hhoy;
	var zxd2x = cx + hwox; var zxd2y = cy + hwoy;
	var zxd3x = cx + hhox; var zxd3y = cy + hhoy;
	
	//求矩形四个顶点的坐标
	var dd0x = zxd1x - hwox; var dd0y = zxd1y - hwoy;
	var dd1x = zxd1x + hwox; var dd1y = zxd1y + hwoy;
	var dd2x = zxd3x + hwox; var dd2y = zxd3y + hwoy;
	var dd3x = zxd3x - hwox; var dd3y = zxd3y - hwoy;
	
	var dwds = [[zxd0x,zxd0y],[dd0x,dd0y],[zxd1x,zxd1y],[dd1x,dd1y],[zxd2x,zxd2y],[dd2x,dd2y],[zxd3x,zxd3y],[dd3x,dd3y]];
	
	var ti = i;
	var mbxl = [x - cx,y - cy];
	
	if (i == 0 || i == 4) {
		var ty = xzb[0] * mbxl[0] + xzb[1]*mbxl[1];
		var thw = Math.abs((hw * ((i - 2) / 2) + ty) / 2);
		var tcx = (cx + xzb[0] * ty + dwds[(i + 4) % 8][0]) / 2;
		var tcy = (cy + xzb[1] * ty + dwds[(i + 4) % 8][1]) / 2;
		mbxl = [x - tcx,y - tcy];
		ty = xzb[0] * mbxl[0] + xzb[1]*mbxl[1];
		if (ty > 0) {
			ti = 4;
		} else if (ty < 0) {
			ti = 0;
		}
		
		return {"ro":ro,"cx":tcx,"cy":tcy,"hw":thw,"hh":hh,"i":ti}
		
	} else if (i == 2 || i == 6) {
		var ty = yzb[0] * mbxl[0] + yzb[1]*mbxl[1];
		var thh = Math.abs((hh * ((4 - i) / 2) + ty) / 2);
		var tcx = (cx + yzb[0] * ty + dwds[(i + 4) % 8][0]) / 2;
		var tcy = (cy + yzb[1] * ty + dwds[(i + 4) % 8][1]) / 2;
		mbxl = [x - tcx,y - tcy];
		ty = yzb[0] * mbxl[0] + yzb[1]*mbxl[1];
		if (ty > 0) {
			ti = 2;
		} else if (ty < 0) {
			ti = 6;
		}
		
		return {"ro":ro,"cx":tcx,"cy":tcy,"hw":hw,"hh":thh,"i":ti}
		
	} else if (i == 1 || i == 3 || i == 5 || i == 7) {
		var tyz = [[0,2],[4,2],[4,6],[0,6]];
		var xty = xzb[0] * mbxl[0] + xzb[1]*mbxl[1];
		var yty = yzb[0] * mbxl[0] + yzb[1]*mbxl[1];
		var thw = Math.abs((hw * ((tyz[(i - 1) / 2][0] - 2) / 2) + xty) / 2);
		var thh = Math.abs((hh * ((4 - tyz[(i - 1) / 2][1]) / 2) + yty) / 2);
		var tcx = (x + dwds[(i + 4) % 8][0]) / 2;
		var tcy = (y + dwds[(i + 4) % 8][1]) / 2;
		mbxl = [x - tcx,y - tcy];
		xty = xzb[0] * mbxl[0] + xzb[1]*mbxl[1];
		yty = yzb[0] * mbxl[0] + yzb[1]*mbxl[1];
		if (xty < 0 && yty > 0) {
			ti = 1;
		} else if (xty > 0 && yty > 0) {
			ti = 3;
		} else if (xty > 0 && yty < 0) {
			ti = 5;
		} else if (xty < 0 && yty < 0) {
			ti = 7;
		}
		
		return {"ro":ro,"cx":tcx,"cy":tcy,"hw":thw,"hh":thh,"i":ti}
		
	} else if (i == 8) {
		var tro = Math.atan2(mbxl[1],mbxl[0]);
		return {"ro":tro,"cx":cx,"cy":cy,"hw":hw,"hh":hh,"i":i}
	} 
	
	
};

Window_OBBEidt.prototype.refreshPZKPY = function(ox,oy) {
	var FNCAICB = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"];
	for (var key in FNCAICB) {
		if (!FNCAICB[key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < FNCAICB[key][$CZDHZZ.Direction].length;i++) {
			var fncaicki = FNCAICB[key][$CZDHZZ.Direction][i];
			fncaicki.cx += ox; fncaicki.cy += oy;
		}
	}

	var FNCAICT = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"];
	for (var key in FNCAICT) {
		if (!FNCAICT[key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < FNCAICT[key][$CZDHZZ.Direction].length;i++) {
			var fncaicki = FNCAICT[key][$CZDHZZ.Direction][i];
			fncaicki[0] += ox; fncaicki[1] += oy;
			fncaicki[2] += ox; fncaicki[3] += oy;
			fncaicki[4] += ox; fncaicki[5] += oy;
		}
	}

	var FNCAICC = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"];
	for (var key in FNCAICC) {
		if (!FNCAICC[key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < FNCAICC[key][$CZDHZZ.Direction].length;i++) {
			var fncaicki = FNCAICC[key][$CZDHZZ.Direction][i];
			fncaicki[0] += ox; fncaicki[1] += oy;
		}
	}

	var FNCAICP = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["connectpoint"];
	if (!FNCAICP[$CZDHZZ.Direction]) return;
	for (var i = 0; i < FNCAICP[$CZDHZZ.Direction].length; i++) {
		FNCAICP[$CZDHZZ.Direction][i].x += ox;
		FNCAICP[$CZDHZZ.Direction][i].y += oy;
	}
};

//获取碰撞框分组
Window_OBBEidt.prototype.getOBJFZ = function(cl,obj) {
	for (var key in this.CCAC[cl]) {
		if (!this.CCAC[cl][key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < this.CCAC[cl][key][$CZDHZZ.Direction].length;i++) {
			if (obj == this.CCAC[cl][key][$CZDHZZ.Direction][i]) return key;
		}
	}
	return "";
};

Window_OBBEidt.prototype.updatedrawcs = function() {
	//$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"] = {"ct":{"6":[[0,0,15,20,10,10]]}};
	this.drawCollisionTriangle();
	//$dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"] = {"cc":{"6":[[0,0,20]]}};
	this.drawCollisionCircular();
	Bitmap.drawPoint(this.ctx,450,300);//console.log(TouchInput.ommx+":"+TouchInput.ommy);
	Bitmap.drawOBB(this.ctx,Math.PI / 6,200,200,30,20);
	if (this.isPointinOBBRectangle([TouchInput.ommx,TouchInput.ommy],Math.PI / 6,200,200,30,20)) {
		console.log("cb");
	}
	Bitmap.drawCircular(this.ctx,100,200,20);
	if (this.isPointinCircular([TouchInput.ommx,TouchInput.ommy],100,200,20)) {
		console.log("cc");
	}
	this.drawBBT(this.ctx,Math.PI / 4,300,300,20,20);
	
	/* Bitmap.drawTriangle(this.ctx,50,50,80,50,80,70);
	Bitmap.drawTriangle(this.ctx,TouchInput.ommx - 20,TouchInput.ommy,TouchInput.ommx + 20,TouchInput.ommy - 20,TouchInput.ommx + 20,TouchInput.ommy + 20);
	if (this.isTOT([50,50,80,50,80,70],
	[TouchInput.ommx - 20,TouchInput.ommy,TouchInput.ommx + 20,TouchInput.ommy - 20,TouchInput.ommx + 20,TouchInput.ommy + 20])) {
		console.log("tot");
	}
	
	if (this.isTOR(
	[TouchInput.ommx - 20,TouchInput.ommy,TouchInput.ommx + 20,TouchInput.ommy - 20,TouchInput.ommx + 20,TouchInput.ommy + 20],
	Math.PI / 6,200,200,30,20)) {
		console.log("tor");
	}
	
	if (this.isTOC(
	[TouchInput.ommx - 20,TouchInput.ommy,TouchInput.ommx + 20,TouchInput.ommy - 20,TouchInput.ommx + 20,TouchInput.ommy + 20],
	100,200,20)) {
		console.log("toc");
	} */
	
	/* Bitmap.drawOBB(this.ctx,Math.PI / 4.5,TouchInput.ommx,TouchInput.ommy,40,20);
	if (this.isROR(Math.PI / 4.5,TouchInput.ommx,TouchInput.ommy,40,20,Math.PI / 6,200,200,30,20)) {
		console.log("ror");
	} */
	
	/*if (this.isROC(Math.PI / 4.5,TouchInput.ommx,TouchInput.ommy,40,20,100,200,20)) {
		console.log("roc");
	}*/
	
	/* Bitmap.drawCircular(this.ctx,TouchInput.ommx,TouchInput.ommy,50);
	if (this.isCOC(100,200,20,TouchInput.ommx,TouchInput.ommy,50)) {
		console.log("coc");
	} */
	
};

Window_OBBEidt.prototype.drawPZKSLXX = function() {
	this.drawTextEx("旋转矩形数: " + this.CBN,10,10);
	this.drawTextEx("三角形数: " + this.CTN,10,40);
	this.drawTextEx("圆形数: " + this.CCN,10,70);
	this.drawTextEx("连接点数: " + this.CCAC["connectpoint"][$CZDHZZ.Direction].length,10,100);
};

//绘制当前帧所有矩形碰撞框
Window_OBBEidt.prototype.drawCollisionBox = function() {
	var FNCAICB = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisionbox"];
	var SSOCS = SceneManager._scene._OBBCharacterSprite;
	this.CBN = 0;
	for (var key in FNCAICB) {
		if (!FNCAICB[key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < FNCAICB[key][$CZDHZZ.Direction].length;i++) {
			this.CBN++;
			var fncaicki = FNCAICB[key][$CZDHZZ.Direction][i];
			var kc = Graphics.eivof($QJSZ.PZKFZ,"name",key);
			Bitmap.drawOBB(
			this.ctx,
			fncaicki.ro,
			SSOCS.x+fncaicki.cx * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.y+fncaicki.cy * SSOCS.scalesz[SSOCS.scaleszi],
			fncaicki.hw * SSOCS.scalesz[SSOCS.scaleszi],
			fncaicki.hh * SSOCS.scalesz[SSOCS.scaleszi],
			kc == -1 ? null : $QJSZ.PZKFZ[kc].color);
		}
	}
};

//绘制当前帧所有三角形碰撞框
Window_OBBEidt.prototype.drawCollisionTriangle = function() {
	var FNCAICT = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisiontriangle"];
	var SSOCS = SceneManager._scene._OBBCharacterSprite;
	this.CTN = 0;
	for (var key in FNCAICT) {
		if (!FNCAICT[key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < FNCAICT[key][$CZDHZZ.Direction].length;i++) {
			this.CTN++;
			var fncaicki = FNCAICT[key][$CZDHZZ.Direction][i];
			var kc = Graphics.eivof($QJSZ.PZKFZ,"name",key);
			Bitmap.drawTriangle(
			this.ctx,
			SSOCS.x + fncaicki[0] * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.y + fncaicki[1] * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.x + fncaicki[2] * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.y + fncaicki[3] * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.x + fncaicki[4] * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.y + fncaicki[5] * SSOCS.scalesz[SSOCS.scaleszi],
			kc == -1 ? null : $QJSZ.PZKFZ[kc].color);
			
		}
	}
};

//绘制当前帧所有圆形碰撞框
Window_OBBEidt.prototype.drawCollisionCircular = function() {
	var FNCAICC = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["collisioncircular"];
	var SSOCS = SceneManager._scene._OBBCharacterSprite;
	this.CCN = 0;
	for (var key in FNCAICC) {
		if (!FNCAICC[key][$CZDHZZ.Direction]) continue;
		for (var i = 0;i < FNCAICC[key][$CZDHZZ.Direction].length;i++) {
			this.CCN++;
			var fncaicki = FNCAICC[key][$CZDHZZ.Direction][i];
			var kc = Graphics.eivof($QJSZ.PZKFZ,"name",key);
			Bitmap.drawCircular(
			this.ctx,
			SSOCS.x + fncaicki[0] * SSOCS.scalesz[SSOCS.scaleszi],
			SSOCS.y + fncaicki[1] * SSOCS.scalesz[SSOCS.scaleszi],
			fncaicki[2] * SSOCS.scalesz[SSOCS.scaleszi],
			kc == -1 ? null : $QJSZ.PZKFZ[kc].color);
		}
	}
};

//绘制当前帧所有连接点
Window_OBBEidt.prototype.drawConnectPoint = function() {
	var FNCAICP = $dataFramesAnimationKSH[$CZDHZZ.Name][$CZDHZZ.Cut]["animatedframe"][$CZDHZZ.FIndex]["connectpoint"];
	var SSOCS = SceneManager._scene._OBBCharacterSprite;
	if (!FNCAICP[$CZDHZZ.Direction]) return;
	for (var i = 0; i < FNCAICP[$CZDHZZ.Direction].length; i++) {
		Bitmap.drawPoint(this.ctx,SSOCS.x + FNCAICP[$CZDHZZ.Direction][i].x * SSOCS.scalesz[SSOCS.scaleszi],SSOCS.y + FNCAICP[$CZDHZZ.Direction][i].y * SSOCS.scalesz[SSOCS.scaleszi]);
	}
};

//绘制原点
Window_OBBEidt.prototype.drawAnchorPoint = function() {
	var SSOCS = SceneManager._scene._OBBCharacterSprite;
	Bitmap.drawPoint(this.ctx,SSOCS.x,SSOCS.y,'rgba(250,20,40,0.4)');
};

//判断点是否在三角形内(不包含边)
Window_OBBEidt.prototype.isPointinTriangle = function(point,triangle) {
	if (triangle.length < 3) return false;
	var txls = [
	[triangle[2] - triangle[0],triangle[3] - triangle[1]],
	[triangle[4] - triangle[2],triangle[5] - triangle[3]],
	[triangle[0] - triangle[4],triangle[1] - triangle[5]]];
	var pxls = [
	[point[0] - triangle[0],point[1] - triangle[1]],
	[point[0] - triangle[2],point[1] - triangle[3]],
	[point[0] - triangle[4],point[1] - triangle[5]]];
	var xzs = [
	pxls[0][0]*txls[0][1] - txls[0][0]*pxls[0][1],
	pxls[1][0]*txls[1][1] - txls[1][0]*pxls[1][1],
	pxls[2][0]*txls[2][1] - txls[2][0]*pxls[2][1]];
	
	if (xzs[0] == 0 || xzs[1] == 0 || xzs[2] == 0) return false;
	if ((xzs[0] / Math.abs(xzs[0]) == xzs[1] / Math.abs(xzs[1])) && (xzs[1] / Math.abs(xzs[1]) == xzs[2] / Math.abs(xzs[2]))) return true;
	return false;
	
};

//判断点是否在OBB矩形内(包含边)
Window_OBBEidt.prototype.isPointinOBBRectangle = function(point,ro,cx,cy,hw,hh) {
	var sra = Math.sin(-ro); var cra = Math.cos(-ro);
	var tx = cx + (point[0] - cx) * cra - (point[1] - cy) * sra;
	var ty = cy + (point[0] - cx) * sra + (point[1] - cy) * cra;
	if (tx >= cx - hw && tx <= cx + hw && ty >= cy - hh && ty <= cy + hh) {
		return true;
	}
	return false;
};

//判断点是否在圆形内(包含边)
Window_OBBEidt.prototype.isPointinCircular = function(point,x,y,r) {
	if (Math.pow(point[0] - x,2) + Math.pow(point[1] - y,2) <= r * r) return true;
	return false;
};

//**碰撞检测代码组S**\\

//三角形与三角形的碰撞检测
Window_OBBEidt.prototype.isTOT = function(t1,t2) {
	var txls = [[],[]]; var czxls = [[[],[],[]],[[],[],[]]];
	txls[0] = [[t1[2] - t1[0],t1[3] - t1[1]],[t1[4] - t1[2],t1[5] - t1[3]],[t1[0] - t1[4],t1[1] - t1[5]]];
	txls[1] = [[t2[2] - t2[0],t2[3] - t2[1]],[t2[4] - t2[2],t2[5] - t2[3]],[t2[0] - t2[4],t2[1] - t2[5]]];
	
	//获取垂直向量
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 3; j++) {
			czxls[i][j] = [-txls[i][j][1],txls[i][j][0]];
			//如果为零向量，将其方向坍缩
			if (Math.pow(czxls[i][j][0],2) + Math.pow(czxls[i][j][1],2) == 0) czxls[i][j] = [1,0];
		}
	}
	
	//如果三个垂直向量共线，则将其中一个转90°
	for (var i = 0; i < 2; i++) {
		if (czxls[i][1][0]*czxls[i][0][1] - czxls[i][0][0]*czxls[i][1][1] == 0 && czxls[i][1][0]*czxls[i][2][1] - czxls[i][2][0]*czxls[i][1][1] == 0) {
			czxls[i][1] = [-czxls[i][1][1],czxls[i][1][0]];
		}
	}
	
	//检测碰撞(分离轴)
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 3; j++) {
			var d1,min1,max1;
			min1 = max1 = czxls[i][j][0] * t1[0] + czxls[i][j][1] * t1[1];//console.log(min1)
			d1 = czxls[i][j][0] * t1[2] + czxls[i][j][1] * t1[3];//console.log(d1)
			min1 = d1 < min1 ? d1 : min1;
			max1 = d1 > max1 ? d1 : max1;
			d1 = czxls[i][j][0] * t1[4] + czxls[i][j][1] * t1[5];//console.log(d1)
			min1 = d1 < min1 ? d1 : min1;
			max1 = d1 > max1 ? d1 : max1;
			
			var d2,min2,max2;
			min2 = max2 = czxls[i][j][0] * t2[0] + czxls[i][j][1] * t2[1];//console.log(min2)
			d2 = czxls[i][j][0] * t2[2] + czxls[i][j][1] * t2[3];//console.log(d2)
			min2 = d2 < min2 ? d2 : min2;
			max2 = d2 > max2 ? d2 : max2;
			d2 = czxls[i][j][0] * t2[4] + czxls[i][j][1] * t2[5];//console.log(d2)
			min2 = d2 < min2 ? d2 : min2;
			max2 = d2 > max2 ? d2 : max2;
			
			var rs = min1 < min2 ? min2 - max1 : min1 - max2;
			if (rs > 0) return false;//console.log(rs+":"+min1+":"+max1+":"+min2+":"+max2);
		}
	}
	return true;
};

//三角形与旋转矩形的碰撞检测
Window_OBBEidt.prototype.isTOR = function(t,ro,cx,cy,hw,hh) {
	var txls = [[],[],[]]; var czxls = [[],[],[],[],[]];var sra = Math.sin(ro); var cra = Math.cos(ro);
	txls = [[t[2] - t[0],t[3] - t[1]],[t[4] - t[2],t[5] - t[3]],[t[0] - t[4],t[1] - t[5]]];
	
	//求hh和hw的水平分量和垂直分量
	var hwox  = hw * cra; var hwoy = hw * sra;
	var hhox  = hh * -sra; var hhoy = hh * cra;

	//求矩形四条边的中心点坐标
	var zxd0x = cx - hwox; var zxd0y = cy - hwoy;
	var zxd1x = cx - hhox; var zxd1y = cy - hhoy;
	var zxd2x = cx + hwox; var zxd2y = cy + hwoy;
	var zxd3x = cx + hhox; var zxd3y = cy + hhoy;
	
	//求矩形四个顶点的坐标
	var dd0x = zxd1x - hwox; var dd0y = zxd1y - hwoy;
	var dd1x = zxd1x + hwox; var dd1y = zxd1y + hwoy;
	var dd2x = zxd3x + hwox; var dd2y = zxd3y + hwoy;
	var dd3x = zxd3x - hwox; var dd3y = zxd3y - hwoy;
	
	//获取垂直向量
	for (var i = 0; i < 3; i++) {
		czxls[i] = [-txls[i][1],txls[i][0]];
		//如果为零向量，将其方向坍缩
		if (Math.pow(czxls[i][0],2) + Math.pow(czxls[i][1],2) == 0) czxls[i] = [1,0];
	}
	czxls[3] = [cra,sra];czxls[4] = [-sra,cra];
	
	//如果三个垂直向量共线，则将其中一个转90°
	if (czxls[1][0]*czxls[0][1] - czxls[0][0]*czxls[1][1] == 0 && czxls[1][0]*czxls[2][1] - czxls[2][0]*czxls[1][1] == 0) {
		czxls[1] = [-czxls[1][1],czxls[1][0]];
	}
	
	//检测碰撞(分离轴)
	for (var i = 0; i < 5; i++) {
		var d1,min1,max1;
		min1 = max1 = czxls[i][0] * t[0] + czxls[i][1] * t[1];//console.log(min1)
		d1 = czxls[i][0] * t[2] + czxls[i][1] * t[3];//console.log(d1)
		min1 = d1 < min1 ? d1 : min1;
		max1 = d1 > max1 ? d1 : max1;
		d1 = czxls[i][0] * t[4] + czxls[i][1] * t[5];//console.log(d1)
		min1 = d1 < min1 ? d1 : min1;
		max1 = d1 > max1 ? d1 : max1;
		
		var d2,min2,max2;
		min2 = max2 = czxls[i][0] * dd0x + czxls[i][1] * dd0y;//console.log(min2)
		d2 = czxls[i][0] * dd1x + czxls[i][1] * dd1y;//console.log(d2)
		min2 = d2 < min2 ? d2 : min2;
		max2 = d2 > max2 ? d2 : max2;
		d2 = czxls[i][0] * dd2x + czxls[i][1] * dd2y;//console.log(d2)
		min2 = d2 < min2 ? d2 : min2;
		max2 = d2 > max2 ? d2 : max2;
		d2 = czxls[i][0] * dd3x + czxls[i][1] * dd3y;//console.log(d2)
		min2 = d2 < min2 ? d2 : min2;
		max2 = d2 > max2 ? d2 : max2;
		
		var rs = min1 < min2 ? min2 - max1 : min1 - max2;
		if (rs > 0) return false;//console.log(rs+":"+min1+":"+max1+":"+min2+":"+max2);
	}
	return true;
};

//三角形与圆形的碰撞检测
Window_OBBEidt.prototype.isTOC = function(t,x,y,r) {
	var txls = [[],[],[]]; var czxls = [[],[],[],[]]; var lyxzjd = [t[0],t[1]];
	txls = [[t[2] - t[0],t[3] - t[1]],[t[4] - t[2],t[5] - t[3]],[t[0] - t[4],t[1] - t[5]]];
	
	//获取垂直向量
	for (var i = 0; i < 3; i++) {
		czxls[i] = [-txls[i][1],txls[i][0]];
		if (Math.pow(czxls[i][0],2) + Math.pow(czxls[i][1],2) == 0) czxls[i] = [1,0];
	}
	lyxzjd = Math.pow(x - t[2],2) + Math.pow(y - t[3],2) < Math.pow(x - lyxzjd[0],2) + Math.pow(y - lyxzjd[1],2) ? [t[2],t[3]] : lyxzjd;
	lyxzjd = Math.pow(x - t[4],2) + Math.pow(y - t[5],2) < Math.pow(x - lyxzjd[0],2) + Math.pow(y - lyxzjd[1],2) ? [t[4],t[5]] : lyxzjd;
	czxls[3] = [x - lyxzjd[0],y - lyxzjd[1]];
	if (Math.pow(czxls[3][0],2) + Math.pow(czxls[3][1],2) == 0) return true;
	
	//如果三个垂直向量共线，则将其中一个转90°
	if (czxls[1][0]*czxls[0][1] - czxls[0][0]*czxls[1][1] == 0 && czxls[1][0]*czxls[2][1] - czxls[2][0]*czxls[1][1] == 0) {
		czxls[1] = [-czxls[1][1],czxls[1][0]];
	}
	
	//检测碰撞(分离轴)
	for (var i = 0; i < 4; i++) {
		var d1,min1,max1;
		min1 = max1 = czxls[i][0] * t[0] + czxls[i][1] * t[1];//console.log(min1)
		d1 = czxls[i][0] * t[2] + czxls[i][1] * t[3];//console.log(d1)
		min1 = d1 < min1 ? d1 : min1;
		max1 = d1 > max1 ? d1 : max1;
		d1 = czxls[i][0] * t[4] + czxls[i][1] * t[5];//console.log(d1)
		min1 = d1 < min1 ? d1 : min1;
		max1 = d1 > max1 ? d1 : max1;
		
		var min2 = czxls[i][0] * x + czxls[i][1] * y - r * Math.sqrt((Math.pow(czxls[i][0],2) + Math.pow(czxls[i][1],2)));//console.log(min2)
		var max2 = czxls[i][0] * x + czxls[i][1] * y + r * Math.sqrt((Math.pow(czxls[i][0],2) + Math.pow(czxls[i][1],2)));//console.log(max2)
		
		
		var rs = min1 < min2 ? min2 - max1 : min1 - max2;//console.log(rs+":"+min1+":"+max1+":"+min2+":"+max2);
		if (rs > 0) return false;
	}
	return true;
};

//旋转矩形与旋转矩形的碰撞检测
Window_OBBEidt.prototype.isROR = function(tsro,tsbcx,tsbcy,tshw,tshh,tero,tebcx,tebcy,tehw,tehh) {
	var cdv = [tsbcx - tebcx, tsbcy - tebcy];
	var cros = [Math.cos(tsro),Math.cos(tsro + Math.PI / 2),Math.cos(tero),Math.cos(tero + Math.PI / 2)]
	var sros = [Math.sin(tsro),Math.sin(tsro + Math.PI / 2),Math.sin(tero),Math.sin(tero + Math.PI / 2)]
	
	for (var i = 0; i < 4; i++) {
		var tspax = Math.abs(cros[i] * cros[0] + sros[i] * sros[0]);
        var tspay = Math.abs(cros[i] * -sros[0] + sros[i] * cros[0]);
		var tepax = Math.abs(cros[i] * cros[2] + sros[i] * sros[2]);
        var tepay = Math.abs(cros[i] * -sros[2] + sros[i] * cros[2]);
		
		if(tshw * tspax + tshh * tspay + tehw * tepax + tehh * tepay <
		Math.abs(cdv[0] * cros[i] + cdv[1] * sros[i])) 
		{
			return false;
		}
	}
	return true;
};

//旋转矩形与圆形的碰撞检测
Window_OBBEidt.prototype.isROC = function(ro,cx,cy,hw,hh,x,y,r) {
	var sra = Math.sin(-ro); var cra = Math.cos(-ro);
	var yx = cx + (x - cx) * cra - (y - cy) * sra;
	var yy = cy + (x - cx) * sra + (y - cy) * cra;
	var tx = yx < cx - hw ? cx - hw : yx > cx + hw ? cx + hw : yx;
	var ty = yy < cy - hh ? cy - hh : yy > cy + hh ? cy + hh : yy;
	tx -= yx;
	ty -= yy;
	return tx * tx + ty * ty < r * r;
};

//圆形与圆形的碰撞检测
Window_OBBEidt.prototype.isCOC = function(x1,y1,r1,x2,y2,r2) {
	return Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2) < Math.pow(r1 + r2,2);
};


//**碰撞检测代码组E**\\
