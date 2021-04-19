/*:
 * @plugindesc HBABS即时战斗系统插件
 * @author 第四梦境
 * @help HBABS即时战斗系统插件
 * 利用规约：你可以免费将本插件用于免费或商业游戏，不得修改本插件的作者名
 *
 * 注意事项：使用该插件，事件接触触发和玩家接触触发都失效，请不要使用这两种触发方式
 *
 * 插件指令说明：
 * jumpwithcgv 数字参数1 数字参数2  ;人物跳跃，数字参数1小于0表示玩家、等于0表示本事件、大于0表示数字对应ID的地图事件；数字参数2表示初速度，个人建议初速度为-0.2，只在重力模式下生效
 * setcharactercgav 数字参数1 数字参数2  ;设置人物重力加速度，数字参数1小于0表示玩家、等于0表示本事件、大于0表示数字对应ID的地图事件；数字参数2表示重力加速度，个人建议重力加速度为0.00625，只在重力模式下生效
 * cgcb 类 子弹种类 ...  ;生成子弹，类是用户自己编写的子弹类的函数名，子弹种类在gcBulletTypes里注册，...是以空格分开的其他字符串，可以作为子弹类初始化时的数组参数
 *
 * 子弹类使用说明及示例（所有子弹的父类为Game_gcBullets，继承自Character类）:
 * function Game_gcBullets_cs() {
 *   this.initialize.apply(this, arguments);
 *  }
 *  Game_gcBullets_cs.prototype = Object.create(Game_gcBullets.prototype);
 *  Game_gcBullets_cs.prototype.constructor = Game_gcBullets_cs;
 *  Game_gcBullets_cs.prototype.start = function(ams) {
 *  this.xxx = ams[i];
 *	};
 * 以上为子弹类的继承和初始化代码示例
 * Game_gcBullets_cs.prototype.update = function() {
 * 	Game_gcBullets.prototype.update.call(this);
 * };update函数每一帧执行一次
 * Game_gcBullets.prototype.DestorySelf = function() {
 *     this.isDestoryed = true;
 * };DestorySelf函数用于销毁子弹
 * 用户可以通过代码直接生成子弹，无需插件指令，例：
 * var ngcb = new Game_gcBullets_cs([this._realX + this.connectpoint[this._direction][0].x,this._realY + this.connectpoint[this._direction][0].y]);
 * $gcBullets["子弹种类"].push(ngcb);
 * SceneManager._scene._spriteset._tilemap.addChild(new Sprite_gcBullets(ngcb));
 * 
 * 帧动画使用说明:
 * 本插件需要放一个FramesAnimation.json文件到data文件夹下，文件保存用户自定义的帧动画数据，可以使用本人编写的d4mjscfajyksh插件FramesAnimation.json文件。
 * 通过character.requestFramesAnimation("帧动画名称");可以播放指定的帧动画，
 * 例：$gamePlayer.requestFramesAnimation("acttack");
 * 使用character.stopFramesAnimation();停止角色播放动画，例：$gamePlayer.stopFramesAnimation();
 * 使用character.isTSBCollideWithTTBBYF函数可以检测碰撞框是否发生碰撞，例：
 * $gameMap.event(this._eventId).isTSBCollideWithTTBBYF($gameMap.event(this._eventId)碰撞框分组,$gameMap.event(this._eventId)碰撞框序号,$gamePlayer,$gamePlayer碰撞框分组,$gamePlayer碰撞框序号)
 * character.setStaticImg(人物序号,图案序号,原点,碰撞框集合,连接点集合)可以设置角色为静态图片
 * character.closeStaticImgMode()函数停止静态图片模式
 *
 * @param isGMode
 * @desc 是否启用重力模式
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default true
 *
 * @param gamePlayerInitialDirection
 * @type select
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @desc 设置玩家初始方向，只在重力模式下生效
 * @default 6
 *
 * @param isGCPBtUpActive
 * @desc 玩家能否向上移动，只在重力模式下生效
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default false
 *
 * @param isGCPBtDownActive
 * @desc 玩家能否向下移动，只在重力模式下生效
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default false
 *
 * @param isGCPBtLeftActive
 * @desc 玩家能否向左移动，只在重力模式下生效
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default true
 *
 * @param isGCPBtRightActive
 * @desc 玩家能否向右移动，只在重力模式下生效
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default true
 *
 * @param gamePlayerCgav
 * @desc 设置玩家的重力加速度，个人建议可以将重力加速度为0.00625，初速度为-0.2，只在重力模式下生效
 * @type string
 * @default 0.00625
 *
 * @param gcBulletTypes
 * @desc 注册子弹的种类
 * @type string[]
 * @default []
 *
 */
 
 var $d4mj_rmmv_GravitySystem = {};
 $d4mj_rmmv_GravitySystem.parameters = PluginManager.parameters('d4mj_rmmv_HBABS_BASE');
 
 var $d4mj_gcBullets = {};
 
$d4mj_gcBullets.Parameters = PluginManager.parameters('d4mj_rmmv_HBABS_BASE');
var $gcBullets = {};
 
var $dataFramesAnimation = null;
DataManager._databaseFiles.push({ name: '$dataFramesAnimation',         src: 'FramesAnimation.json'         });

(function () {
	
	
	
var Game_CharacterBase_d4mj_rmmv_FramesAnimation_xg_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    Game_CharacterBase_d4mj_rmmv_FramesAnimation_xg_initMembers.call(this);
    this.d4mj_rmmv_FramesAnimation_xzj_initMembers();
	this.needsTint  = false;
	this.colorTone = [0,0,0,0];
};

Game_CharacterBase.prototype.d4mj_rmmv_FramesAnimation_xzj_initMembers = function() {
    this.currentFramesAnimation = {};
	this.walkFramesAnimation = {};
	this.stepFramesAnimation = {};
	this.anchor = {"x":0.5,"y":1};
	this.collisionbox = {"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}};
	this.connectpoint = {"2":[],"4":[],"6":[],"8":[]};
	this.rotation = 0;
	this.isFramesAnimationPlay = false;
	this.currentFramesAnimationIndex = 0;
	this.currentFramesAnimationName = "";
	this.isCurrentFramesAnimationHoldPositon = false;
	this.staticImg = {"staticImgMode":false,"characterIndex":-1,"pattern":-1,"anchor":{"x":0.5,"y":1},"collisionbox":{},"connectpoint":{"2":[],"4":[],"6":[],"8":[]}};
	//this.ivs = [];
};
	
//更新动画计数
Game_CharacterBase.prototype.updateAnimationCount = function() {
    if (this.isFramesAnimationPlaying()) {
        this._animationCount += 2.5;
    } else if (this.staticImg.staticImgMode) {
        this._animationCount += 1.5;
    } else if (this.isMoving() && this.hasWalkAnime()) {
        this._animationCount += 1.5;
    } else if (this.hasStepAnime() || !this.isOriginalPattern()) {
        this._animationCount++;
    }
};

//更新图案
Game_CharacterBase.prototype.updatePattern = function() {
    if (this.isFramesAnimationPlaying()) {
        this.updateCurrentFramesAnimation();
    } else if (this.staticImg.staticImgMode) {
        this.updateStaticImg();
    } else if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else if (!this.isMoving()) {
        this.updateStepFramesAnimation();
    } else if (this.hasWalkAnime()){
		this.updateWalkFramesAnimation();
    }
};
	
//更新当前帧动画
Game_CharacterBase.prototype.updateCurrentFramesAnimation = function() {
	var cfa = this.currentFramesAnimation["animatedframe"][this.currentFramesAnimationIndex];
	this._characterIndex = cfa["characterIndex"];
    this._pattern = cfa["pattern"];
	this.anchor = cfa["anchor"][this._direction];
	this.collisionbox = cfa["collisionbox"];
	this.connectpoint = cfa["connectpoint"];
	
	var dmtx = cfa["ofxy"].x;
	var dmty = cfa["ofxy"].y;
	var dx = cfa["ofxy"].dx;
	var dy = cfa["ofxy"].dy;
	var fd = dx == 1 ? this.direction() : 10 - this.direction();
	var rd = dy == 1 ? (this.direction() % 5) * 2 : 10 - (this.direction() % 5) * 2;
		var des = this.canMoveDisplacement(this._realX,this._realY,fd,dmtx);
	    this._x = des.x;
	    this._y = des.y;
		des = this.canMoveDisplacement(this._x,this._y,rd,dmty);
	    this._x = des.x;
	    this._y = des.y;
		this._realX = this._x;
		this._realY = this._y;
		
	if(cfa["ispse"]) {
		AudioManager.playSe(cfa["se"]);
	}
	
	for (var i = 0; i < cfa["callfunc"].length; i++) {
		if (this[cfa["callfunc"][i].fname]) {
			this[cfa["callfunc"][i].fname](cfa["callfunc"][i].arms);
		}
	}
	//this.rotation = this.angleTOradian(cfa["angle"]);
    this.currentFramesAnimationIndex++;
	if(this.currentFramesAnimationIndex >= this.currentFramesAnimation["animatedframe"].length) {
		if(this.currentFramesAnimation["isloop"]) {
			this.currentFramesAnimationIndex = 0;
		}
		else {
			this.stopFramesAnimation();
		}
	}
};

//更新静态图片
Game_CharacterBase.prototype.updateStaticImg = function() {
	this._characterIndex = this.staticImg.characterIndex;
    this._pattern = this.staticImg.pattern;
	this.anchor = this.staticImg.anchor;
	this.collisionbox = this.staticImg.collisionbox;
	this.connectpoint = this.staticImg.connectpoint;
    
};

//更新行走动画
Game_CharacterBase.prototype.updateWalkFramesAnimation = function() {
	this.currentFramesAnimationIndex = (this.currentFramesAnimationIndex + 1) % this.walkFramesAnimation["animatedframe"].length;
	var cfa = this.walkFramesAnimation["animatedframe"][this.currentFramesAnimationIndex];
	this._characterIndex = cfa["characterIndex"];
    this._pattern = cfa["pattern"];
	this.anchor = cfa["anchor"][this._direction];
	this.collisionbox = cfa["collisionbox"];
	this.connectpoint = cfa["connectpoint"];
	//this.rotation = this.angleTOradian(cfa["angle"]);
    
};
	
//更新踏步动画
Game_CharacterBase.prototype.updateStepFramesAnimation = function() {
	//if (this._tileId > 0) return;
	this.currentFramesAnimationIndex = (this.currentFramesAnimationIndex + 1) % this.stepFramesAnimation["animatedframe"].length;
	var cfa = this.stepFramesAnimation["animatedframe"][this.currentFramesAnimationIndex];
	this._characterIndex = cfa["characterIndex"];
    this._pattern = cfa["pattern"];
	this.anchor = cfa["anchor"][this._direction];
	this.collisionbox = cfa["collisionbox"];
	this.connectpoint = cfa["connectpoint"];
	//this.rotation = this.angleTOradian(cfa["angle"]);
    
};

//角度转弧度函数
Game_CharacterBase.prototype.angleTOradian = function(angle) {
	return Math.PI/180*angle;
};

//弧度转角度函数
Game_CharacterBase.prototype.radianTOangle = function(radian) {
	return 180/Math.PI*radian;
};

Game_CharacterBase.prototype.isTSBCollideWithTTB = function(tsb,tt,ttb) {
	var tssx = this.screenX();var tssy = this.screenY();
	var ttsx = tt.screenX();var ttsy = tt.screenY();
	var tsxyr = RectangleOBB.getaImageXYR(this.rotation || 0,tsb.cx,tsb.cy,tsb.ro);
	var ttxyr = RectangleOBB.getaImageXYR(tt.rotation || 0,ttb.cx,ttb.cy,ttb.ro);//alert(ttxyr.r+":"+ttxyr.x+":"+ttxyr.y);
	return RectangleOBB.isOnCollide(tsxyr.r,tssx + tsxyr.x,tssy + tsxyr.y,tsb.hw,tsb.hh,ttxyr.r,ttsx + ttxyr.x,ttsy + ttxyr.y,ttb.hw,ttb.hh);
	
};

//根据四点坐标求obb矩形碰撞框函数（近似算法）
Game_CharacterBase.prototype.ftroattfpc = function (ax,ay,x1,y1,x2,y2,x3,y3) {
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
	alert("angle:" + (180/Math.PI*radian) + " cx:" + cx + " cy:" + cy + " hh:" + hh + " hw:" + hw);
	return {"ro":radian,"cx":cx,"cy":cy,"hh":hh,"hw":hw}
}

//检测人物身上的碰撞框是否发生碰撞
Game_CharacterBase.prototype.isTSBCollideWithTTBBYF = function(tsbf,tsi,tt,ttbf,tti) {
	if (this.collisionbox[tsbf] && tt.collisionbox[ttbf]) {
		if (this.collisionbox[tsbf][this._direction] && tt.collisionbox[ttbf][tt._direction]) {
			if (this.collisionbox[tsbf][this._direction][tsi] && tt.collisionbox[ttbf][tt._direction][tti]) {
				return this.isTSBCollideWithTTB(this.collisionbox[tsbf][this._direction][tsi],tt,tt.collisionbox[ttbf][tt._direction][tti]);
				}
		}
		
	}

	return false;

};

Game_CharacterBase.prototype.setColorTone = function(tone) {
        this.colorTone = tone;
		this.needsTint = true;
};

Game_CharacterBase.prototype.pattern = function() {
return this._pattern;
};

//是否正在播放帧动画
Game_CharacterBase.prototype.isFramesAnimationPlaying = function() {
return this.isFramesAnimationPlay;
};

//是否是最初图案
Game_CharacterBase.prototype.isOriginalPattern = function() {
    /*return this.characterIndex() === this.walkFramesAnimation["animatedframe"][0]["characterIndex"] &&
           this.pattern() === this.walkFramesAnimation["animatedframe"][0]["pattern"];*/
		   return false;
};

//设置静态图像
Game_CharacterBase.prototype.setStaticImg = function(ci,pt,ac,cb,cp) {
	    this.staticImg.staticImgMode = true;
        this.staticImg.characterIndex = ci;
		this.staticImg.pattern = pt;
		this.staticImg.anchor = ac || {"x":0.5,"y":1};
		this.staticImg.collisionbox = cb || {};
		this.staticImg.connectpoint = cp || {"2":[],"4":[],"6":[],"8":[]};
		if (!this.isFramesAnimationPlaying()) {
			this._animationCount = this.animationWait();
		}
};

//关闭静态图像模式
Game_CharacterBase.prototype.closeStaticImgMode = function() {
	    this.staticImg.staticImgMode = false;
        this.staticImg.characterIndex = -1;
		this.staticImg.pattern = -1;
		this._animationCount = this.animationWait();
};

//重设图案
Game_CharacterBase.prototype.resetPattern = function() {
    this._characterIndex = this.walkFramesAnimation["animatedframe"][0]["characterIndex"];
    this._pattern = this.walkFramesAnimation["animatedframe"][0]["pattern"];
	this.anchor = this.walkFramesAnimation["animatedframe"][0]["anchor"][this._direction];
	this.collisionbox = this.walkFramesAnimation["animatedframe"][0]["collisionbox"];
	this.connectpoint = this.walkFramesAnimation["animatedframe"][0]["connectpoint"];
	this.currentFramesAnimationIndex = 0;
};

Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
    this._tileId = 0;
    this._characterName = characterName;
    this._characterIndex = characterIndex;
	
	//配置行走图
	if ($dataFramesAnimation["dataFramesAnimation"][this._characterName] && $dataFramesAnimation["dataFramesAnimation"][this._characterName]["WalkAnime_" + this._characterIndex]) {
	this.walkFramesAnimation = $dataFramesAnimation["dataFramesAnimation"][this._characterName]["WalkAnime_" + this._characterIndex];
	}
	else {
		this.walkFramesAnimation = {
        "id":0,"name":"","processingpriority":1,"isloop":false,
        "animatedframe":[
        {"characterIndex":characterIndex,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}},
		{"characterIndex":characterIndex,"pattern":2,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}},
		{"characterIndex":characterIndex,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}},
		{"characterIndex":characterIndex,"pattern":0,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}}
        ]};
	}
	
	//配置状态图
	if ($dataFramesAnimation["dataFramesAnimation"][this._characterName] && $dataFramesAnimation["dataFramesAnimation"][this._characterName]["StepAnime_" + this._characterIndex]) {
	this.stepFramesAnimation = $dataFramesAnimation["dataFramesAnimation"][this._characterName]["StepAnime_" + this._characterIndex];
	}
	else {
	    this.stepFramesAnimation = {
        "id":0,"name":"","processingpriority":1,"isloop":false,
        "animatedframe":[
        {"characterIndex":characterIndex,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}},
		{"characterIndex":characterIndex,"pattern":2,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}},
		{"characterIndex":characterIndex,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}},
		{"characterIndex":characterIndex,"pattern":0,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"collisionbox":{"hitbox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]},
		"damagebox":{"2":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"4":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"6":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}],"8":[{"ro":0,"cx":0,"cy":-24,"hw":24,"hh":24}]}},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}}
        ]};
	}
	
	this.collisionbox = this.walkFramesAnimation["animatedframe"][0]["collisionbox"];
	this.anchor = this.walkFramesAnimation["animatedframe"][0]["anchor"][this._direction];
	
    this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);
};

Game_CharacterBase.prototype.setTileImage = function(tileId) {
    this._tileId = tileId;
    this._characterName = '';
    this._characterIndex = 0;
    this._isObjectCharacter = true;
	this.walkFramesAnimation = {
        "id":0,"name":"","processingpriority":1,"isloop":false,
        "animatedframe":[
        {"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}}]};
	this.stepFramesAnimation = {
        "id":0,"name":"","processingpriority":1,"isloop":false,
        "animatedframe":[
        {"characterIndex":0,"pattern":1,"anchor":{"2":{"x":0.5,"y":1},"4":{"x":0.5,"y":1},"6":{"x":0.5,"y":1},"8":{"x":0.5,"y":1}},"ofxy":{"dx":0,"dy":0,"x":0,"y":0},"connectpoint":{"2":[],"4":[],"6":[],"8":[]},"angle":0,"ispse":false,"se":{"name":"","volume":90,"pitch":100,"pan":0}}]};
};

//请求帧动画
Game_CharacterBase.prototype.requestFramesAnimation = function(FAN,ICFAHP) {
	if (!$dataFramesAnimation["dataFramesAnimation"][this._characterName]) return;
	if (!$dataFramesAnimation["dataFramesAnimation"][this._characterName][FAN]) return;
    this.currentFramesAnimation = $dataFramesAnimation["dataFramesAnimation"][this._characterName][FAN];
	this.currentFramesAnimationIndex = 0;
	this.currentFramesAnimationName = FAN;
	this.isFramesAnimationPlay = true;
	this.isCurrentFramesAnimationHoldPositon = ICFAHP || true;
	this._x = this._realX;
	this._y = this._realY;
	this._animationCount = this.animationWait();
};

//停止帧动画
Game_CharacterBase.prototype.stopFramesAnimation = function() {
	this.currentFramesAnimation = {};
	this.currentFramesAnimationIndex = 0;
	this.currentFramesAnimationName = "";
	this.isFramesAnimationPlay = false;
	this.isCurrentFramesAnimationHoldPositon = false;
	//this._animationCount = this.animationWait();
};

Game_CharacterBase.prototype.moveStraight = function(d,displacement) {
        this.setDirection(d);
		var dmt = displacement || 1;
		var des = this.canMoveDisplacement(this._realX,this._realY,d,dmt);
	    this._x = des.x;
	    this._y = des.y;
		this.increaseSteps();
        
        
};

Game_CharacterBase.prototype.moveDiagonally = function(horz, vert,dhplacement,dvplacement) {
    var dmth = dhplacement || Math.sqrt(2) / 2;
	var dmtv = dvplacement || Math.sqrt(2) / 2;
		var des = this.canMoveDisplacement(this._realX,this._realY,horz,dmth);
	    this._x = des.x;
	    this._y = des.y;
		des = this.canMoveDisplacement(this._x,this._y,vert,dmtv);
	    this._x = des.x;
	    this._y = des.y;
		this.increaseSteps();
    if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
    }
};

//可以移动的位移
Game_CharacterBase.prototype.canMoveDisplacement = function(x,y,dire,des) {
	if (dire == 2) {
		var tpy = y;
		var cvdes = Math.ceil(y) - y;
		var fx = Math.floor(x); var cx = Math.ceil(x);
		for (var i = 0; i < des; i++) {
			if (this.canPass(fx,tpy + cvdes,dire) && this.canPass(cx,tpy + cvdes,dire)) {
				tpy += 1;
			}
			else {
				tpy += cvdes;
				break;
			}
		}
		var canMove = !(Math.min(tpy,y + des) == y);
		return {"x":x,"y":Math.min(tpy,y + des),"canMove":canMove};
	}
	else if (dire == 4) {
		var tpx = x;
		var cvdes = x - Math.floor(x);
		var fy = Math.floor(y); var cy = Math.ceil(y);
		for (var i = 0; i < des; i++) {
			if (this.canPass(tpx - cvdes,fy,dire) && this.canPass(tpx - cvdes,cy,dire)) {
				tpx -= 1;
			}
			else {
				tpx -= cvdes;
				break;
			}
		}
		var canMove = !(Math.max(tpx,x - des) == x);
		return {"x":Math.max(tpx,x - des),"y":y,"canMove":canMove};
	}
	else if (dire == 6) {
		var tpx = x;
		var cvdes = Math.ceil(x) - x;
		var fy = Math.floor(y); var cy = Math.ceil(y);
		for (var i = 0; i < des; i++) {
			if (this.canPass(tpx + cvdes,fy,dire) && this.canPass(tpx + cvdes,cy,dire)) {
				tpx += 1;
			}
			else {
				tpx += cvdes;
				break;
			}
		}
		var canMove = !(Math.min(tpx,x + des) == x);
		return {"x":Math.min(tpx,x + des),"y":y,"canMove":canMove};
	}
	else if (dire == 8) {
		var tpy = y;
		var cvdes = y - Math.floor(y);
		var fx = Math.floor(x); var cx = Math.ceil(x);
		for (var i = 0; i < des; i++) {
			if (this.canPass(fx,tpy - cvdes,dire) && this.canPass(cx,tpy - cvdes,dire)) {
				tpy -= 1;
			}
			else {
				tpy -= cvdes;
				break;
			}
		}
		var canMove = !(Math.max(tpy,y - des) == y);
		return {"x":x,"y":Math.max(tpy,y - des),"canMove":canMove};
	}
};

var Game_Player_d4mj_rmmv_FramesAnimation_xg_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	Game_Player_d4mj_rmmv_FramesAnimation_xg_initMembers.call(this);
    this.isDirectionInputPress = {"2":false,"4":false,"6":false,"8":false};
};

//更新玩家动画计数
Game_Player.prototype.updateAnimationCount = function() {
    if (this.isFramesAnimationPlaying()) {
        this._animationCount += 3;
    } else if (this.staticImg.staticImgMode) {
        this._animationCount += 1.5;
    } else if ((this.isDirectionInputPress[this._direction] || this.isMoving()) > 0 && this.hasWalkAnime()) {
        this._animationCount += 1.5;
		this.isDirectionInputPress[this._direction] = false;
    } else if (this.hasStepAnime() || !this.isOriginalPattern()) {
        this._animationCount++;
    }
};

Game_Player.prototype.updatePattern = function() {
    if (this.isFramesAnimationPlaying()) {
        this.updateCurrentFramesAnimation();
    } else if (this.staticImg.staticImgMode) {
        this.updateStaticImg();
    } else if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else if (this.getInputDirection() == 0) {
        this.updateStepFramesAnimation();
    } else {
		this.updateWalkFramesAnimation();
    }
};

Game_Player.prototype.moveByInput = function() {
    if (!this.isCurrentFramesAnimationHoldPositon && !this.isMoving() && this.canMove()) {
        var direction = this.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()){
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
        }
        if (direction > 0) {
			if (this._direction == direction) {
				this.isDirectionInputPress[direction] = true;
				if (this.isTriggeredMove(direction)) {
					this._animationCount = this.animationWait();
				}
                this.executeMove(direction,this.distancePerFrame());
			}
			else {
				this.setDirection(direction);
			}
			
        }
		
    }
};

Game_Player.prototype.isTriggeredMove = function(direction) {
    if (direction == 2) {
		return Input.isTriggered("down");
	}
	else if (direction == 4) {
		return Input.isTriggered("left");
	}
	else if (direction == 6) {
		return Input.isTriggered("right");
	}
	else if (direction == 8) {
		return Input.isTriggered("up");
	}
	else {
		return false;
	}
};

Game_Player.prototype.executeMove = function(direction,displacement) {
    this.moveStraight(direction,displacement);
};

Game_Player.prototype.moveStraight = function(d,displacement) {
    if (this.canPass(this.x, this.y, d)) {
        this._followers.updateMove();
    }
    Game_Character.prototype.moveStraight.call(this, d,displacement);
};

Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
	var qx = Math.round(x); var qy = Math.round(y);
    if (!$gameMap.isEventRunning()) {
        $gameMap.eventsXy(qx, qy).forEach(function(event) {
            if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                event.start();
            }
        });
    }
};

Game_Event.prototype.setupPageSettings = function() {
    var page = this.page();
    var image = page.image;
    if (image.tileId > 0) {
        this.setTileImage(image.tileId);
    } else {
        this.setImage(image.characterName, image.characterIndex);
		this._characterIndex = this.walkFramesAnimation["animatedframe"][0]["characterIndex"];
        this._pattern = this.walkFramesAnimation["animatedframe"][0]["pattern"];
	    this.anchor = this.walkFramesAnimation["animatedframe"][0]["anchor"][image.direction];
	    this.currentFramesAnimationIndex = 0;
	}
    if (this._originalDirection !== image.direction) {
        this._originalDirection = image.direction;
        this._prelockDirection = 0;
        this.setDirectionFix(false);
        this.setDirection(image.direction);
    }
	/*if (this._originalPattern !== image.pattern) {
        this._originalPattern = image.pattern;
        this.setPattern(image.pattern);
    }*/
    
	
    this.setMoveSpeed(page.moveSpeed);
    this.setMoveFrequency(page.moveFrequency);
    this.setPriorityType(page.priorityType);
    this.setWalkAnime(page.walkAnime);
    this.setStepAnime(page.stepAnime);
    this.setDirectionFix(page.directionFix);
    this.setThrough(page.through);
    this.setMoveRoute(page.moveRoute);
    this._moveType = page.moveType;
    this._trigger = page.trigger;
    if (this._trigger === 4) {
        this._interpreter = new Game_Interpreter();
    } else {
        this._interpreter = null;
    }
};

Game_Event.prototype.isOriginalPattern = function() {
    /*return this.characterIndex() === this.walkFramesAnimation["animatedframe"][0]["characterIndex"] &&
           this.pattern() === this.walkFramesAnimation["animatedframe"][0]["pattern"];*/
		   return false;
};

Game_Event.prototype.resetPattern = function() {
    this._characterIndex = this.walkFramesAnimation["animatedframe"][0]["characterIndex"];
    this._pattern = this.walkFramesAnimation["animatedframe"][0]["pattern"];
	this.anchor = this.walkFramesAnimation["animatedframe"][0]["anchor"][this._direction];
	this.collisionbox = this.walkFramesAnimation["animatedframe"][0]["collisionbox"];
	this.connectpoint = this.walkFramesAnimation["animatedframe"][0]["connectpoint"];
	this.currentFramesAnimationIndex = 0;
};

Scene_Map.prototype.processMapTouch = function() {
    if (TouchInput.isTriggered() || this._touchCount > 0) {
        if (TouchInput.isPressed()) {
            /*if (this._touchCount === 0 || this._touchCount >= 15) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                if (!TouchInput.isMousePressed()) {
                    $gameTemp.setIsMapTouched(true);
                }
                $gameTemp.setDestination(x, y);
            }
            this._touchCount++;*/
        } else {
            //this._touchCount = 0;
            //$gameTemp.setIsMapTouched(false);
        }
    }
};

var Sprite_Character_d4mj_rmmv_FramesAnimation_xg_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    Sprite_Character_d4mj_rmmv_FramesAnimation_xg_update.call(this);
	this.d4mj_rmmv_FramesAnimation_xzj_update();
    
};

Sprite_Character.prototype.d4mj_rmmv_FramesAnimation_xzj_update = function() {
	this.anchor = this._character.anchor || {"x":0.5,"y":1};
	this.rotation = this._character.rotation || 0;
	if (this._character.needsTint == true) {
		this.setColorTone(this._character.colorTone);
		this._character.needsTint = false;
	}
};

Sprite_Character.prototype.isImageChanged = function() {
    return (this._tilesetId !== $gameMap.tilesetId() ||
            this._tileId !== this._character.tileId() ||
            this._characterName !== this._character.characterName());
};

Sprite_Character.prototype.setCharacter = function(character) {
    this._character = character;
	this.anchor = this._character.anchor || {"x":0.5,"y":1};
	this.rotation = this._character.rotation || 0;
};

})();

//矩形OBB碰撞算法函数
function RectangleOBB() {
    
}

//检测是否发生碰撞
RectangleOBB.isOnCollide = function(tsro,tsbcx,tsbcy,tshw,tshh,tero,tebcx,tebcy,tehw,tehh) {
	var cdv = [tsbcx - tebcx, tsbcy - tebcy];
	var ros = [tsro, tsro + Math.PI / 2, tero, tero + Math.PI / 2];
	
	for (var i = 0; i < ros.length; i++) {
		
		var tspax = Math.abs(Math.cos(ros[i]) * Math.cos(tsro) + Math.sin(ros[i]) * Math.sin(tsro));
        var tspay = Math.abs(Math.cos(ros[i]) * -Math.sin(tsro) + Math.sin(ros[i]) * Math.cos(tsro));
		var tepax = Math.abs(Math.cos(ros[i]) * Math.cos(tero) + Math.sin(ros[i]) * Math.sin(tero));
        var tepay = Math.abs(Math.cos(ros[i]) * -Math.sin(tero) + Math.sin(ros[i]) * Math.cos(tero));
		
		if(tshw * tspax + tshh * tspay + tehw * tepax + tehh * tepay <
		Math.abs(cdv[0] * Math.cos(ros[i]) + cdv[1] * Math.sin(ros[i]))) 
		{
			return false;
		}
		
	}
	
	return true;
	
};

//获取原点图像坐标和弧度
RectangleOBB.getaImageXYR = function(arotation,x,y,r) {
	var rol = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	var roor = Math.atan2(y , x); var rocr = roor + arotation;
	var aixyr = {};
	aixyr.x = rol * Math.cos(rocr);
	aixyr.y = rol * Math.sin(rocr);
	aixyr.r = r + arotation;
	return aixyr;
};

if ($d4mj_rmmv_GravitySystem.parameters["isGMode"] == "true") {
	(function () {

/*Input._signY = function() {
    return 0;
};*/

var Game_CharacterBase_d4mj_rmmv_GravitySystem_xg_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	this.cgav = 0;
	this.cgv = 0;
    Game_CharacterBase_d4mj_rmmv_GravitySystem_xg_initialize.call(this);
};

var Game_CharacterBase_d4mj_rmmv_GravitySystem_xg_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
    Game_CharacterBase_d4mj_rmmv_GravitySystem_xg_update.call(this);
	this.updateGD();
};

Game_CharacterBase.prototype.updateGD = function() {
    if (this.cgv > 0) {
		var rgd = this.canMoveGD(this._realX,this._realY,2,this.cgv * 1);
		this._y = this.canMoveGD(this._x,this._y,2,this.cgv * 1).y;
		this._realY = rgd.y;
		if (rgd.iscollided) {
			this.cgv = 0;
		}
	}
	else if (this.cgv < 0) {
		var rgd = this.canMoveGD(this._realX,this._realY,8,this.cgv * -1);
		this._y = this.canMoveGD(this._x,this._y,8,this.cgv * -1).y;
		this._realY = rgd.y;
		if (rgd.iscollided) {
			this.cgv = 0;
		}
	}
	
	if (this.cgv < 0 || this.canMoveGD(this._realX,this._realY,2,this.cgav).canmove) {
		var tcgv = this.cgv;
		this.cgv = this.cgv + this.cgav;
	}
	else {
		this.cgv = 0;
	}
	
};

Game_CharacterBase.prototype.canMoveGD = function(x,y,dire,des) {
	if (dire == 2) {
		var tpy = y;
		var cvdes = Math.ceil(y) - y;
		var fx = Math.floor(x); var cx = Math.ceil(x);
		for (var i = 0; i < des; i++) {
			if (this.canPass(fx,tpy + cvdes,dire) && this.canPass(cx,tpy + cvdes,dire)) {
				tpy += 1;
			}
			else {
				tpy += cvdes;
				break;
			}
		}
		var canmove = !(Math.min(tpy,y + des) == y);
		var iscollided = !(Math.min(tpy,y + des) == y + des);
		return {"x":x,"y":Math.min(tpy,y + des),"canmove":canmove,"iscollided":iscollided};
	}
	else if (dire == 8) {
		var tpy = y;
		var cvdes = y - Math.floor(y);
		var fx = Math.floor(x); var cx = Math.ceil(x);
		for (var i = 0; i < des; i++) {
			if (this.canPass(fx,tpy - cvdes,dire) && this.canPass(cx,tpy - cvdes,dire)) {
				tpy -= 1;
			}
			else {
				tpy -= cvdes;
				break;
			}
		}
		var canmove = !(Math.max(tpy,y - des) == y);
		var iscollided = !(Math.max(tpy,y - des) == y - des);
		return {"x":x,"y":Math.max(tpy,y - des),"canmove":canmove,"iscollided":iscollided};
	}
};

Game_CharacterBase.prototype.setCGAV = function(tcgav) {
	this.cgav = tcgav;
};

Game_CharacterBase.prototype.setCGV = function(tcgv) {
	this.cgv = tcgv;
};

var Game_Player_d4mj_rmmv_GravitySystem_xg_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	Game_Player_d4mj_rmmv_GravitySystem_xg_initMembers.call(this);
    this._direction = $d4mj_rmmv_GravitySystem.parameters["gamePlayerInitialDirection"] * 1;
	this.cgav = $d4mj_rmmv_GravitySystem.parameters["gamePlayerCgav"] * 1;
	
	this.bt_up = {"active":$d4mj_rmmv_GravitySystem.parameters["isGCPBtUpActive"]};
	this.bt_down = {"active":$d4mj_rmmv_GravitySystem.parameters["isGCPBtDownActive"]};
	this.bt_left = {"active":$d4mj_rmmv_GravitySystem.parameters["isGCPBtLeftActive"]};
	this.bt_right = {"active":$d4mj_rmmv_GravitySystem.parameters["isGCPBtRightActive"]};
};

Game_Player.prototype.getInputDirection = function() {
	if (this.bt_down.active == "true" && Input.dir4 == 2) {
		return 2;
	}
	else if (this.bt_left.active == "true" && Input.dir4 == 4) {
		return 4;
	}
	else if (this.bt_right.active == "true" && Input.dir4 == 6) {
		return 6;
	}
	else if (this.bt_up.active == "true" && Input.dir4 == 8) {
		return 8;
	}
    return 0;
};

Game_Player.prototype.isTriggeredMove = function(direction) {
    if (this.bt_down.active == "true" && direction == 2) {
		return Input.isTriggered("down");
	}
	else if (this.bt_left.active == "true" && direction == 4) {
		return Input.isTriggered("left");
	}
	else if (this.bt_right.active == "true" && direction == 6) {
		return Input.isTriggered("right");
	}
	else if (this.bt_up.active == "true" && direction == 8) {
		return Input.isTriggered("up");
	}
	else {
		return false;
	}
};

var Game_Interpreter_d4mj_rmmv_GravitySystem_xg_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
     Game_Interpreter_d4mj_rmmv_GravitySystem_xg_pluginCommand.call(this, command, args);
	 switch (command) {
		 case "jumpwithcgv":
		 if (args[0] * 1 < 0) {
			 var gc = $gamePlayer;
		 }
		 else if (args[0] * 1 == 0) {
			 var gc = $gameMap.event(this._eventId);
		 }
		 else {
			 var gc = $gameMap.event(args[0] * 1);
		 }
		 gc.setCGV(args[1] * 1);
		 break;
		 case "setcharactercgav":
		 if (args[0] * 1 < 0) {
			 var gc = $gamePlayer;
		 }
		 else if (args[0] * 1 == 0) {
			 var gc = $gameMap.event(this._eventId);
		 }
		 else {
			 var gc = $gameMap.event(args[0] * 1);
		 }
		 gc.setCGAV(args[1] * 1);
		 break;
	 }
};
	
})()
};

(function () {
	var gcBulletTypes = JSON.parse($d4mj_gcBullets.Parameters["gcBulletTypes"]);
    for (var i = 0; i < gcBulletTypes.length; i++) {
	     $gcBullets[gcBulletTypes[i]]  = [];
    }
})();


function Game_gcBullets() {
    this.initialize.apply(this, arguments);
}

Game_gcBullets.prototype = Object.create(Game_Character.prototype);
Game_gcBullets.prototype.constructor = Game_gcBullets;

function Sprite_gcBullets() {
    this.initialize.apply(this, arguments);
}

Sprite_gcBullets.prototype = Object.create(Sprite_Character.prototype);
Sprite_gcBullets.prototype.constructor = Sprite_gcBullets;

Sprite_gcBullets.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._character = null;
    this._balloonDuration = 0;
    this._tilesetId = 0;
    this._upperBody = null;
    this._lowerBody = null;
	this.isDestoryed = false;
};

Sprite_gcBullets.prototype.update = function() {
    Sprite_Character.prototype.update.call(this);
	if (this._character.isDestoryed == true && this.parent) {
		this.parent.removeChild(this);
	}
    
};

Game_gcBullets.prototype.initialize = function(ams) {
    Game_Character.prototype.initialize.call(this);
	this.isDestoryed = false;
	this.start(ams);
};

Game_gcBullets.UPDATE = function(active) {
    if (active) {
		for (var key in $gcBullets) {
			for (var i = 0; i < $gcBullets[key].length; i++) {
				$gcBullets[key][i].update();//console.log(i);
			}
			Game_gcBullets.delAIByBK($gcBullets[key],"isDestoryed");
		}
	}
};

Game_gcBullets.prototype.start = function(ams) {
    
};

Game_gcBullets.prototype.DestorySelf = function() {
    this.isDestoryed = true;
};

Game_gcBullets.prototype.delAIByBK = function(arr,sbk) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] != null && arr[i][sbk] == true) {
			arr.splice(i,1);
			i--;
		}
	}
};

Game_gcBullets.delAIByBK = function(arr,sbk) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] != null && arr[i][sbk] == true) {
			arr.splice(i,1);
			i--;
		}
	}
};

(function () {


var Scene_Map_d4mj_rmmv_Game_gcBullets_xg_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
    Scene_Map_d4mj_rmmv_Game_gcBullets_xg_updateMain.call(this);
	var active = this.isActive();
    Game_gcBullets.UPDATE(active);
};
	
var Game_Interpreter_d4mj_rmmv_Game_gcBullets_xg_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
     Game_Interpreter_d4mj_rmmv_Game_gcBullets_xg_pluginCommand.call(this, command, args);
	 switch (command) {
		 case "cgcb":
		 var args0 = args.shift();var args1 = args.shift();
		 var ngcb = new window[args0](args);
         $gcBullets[args1].push(ngcb);
		 SceneManager._scene._spriteset._tilemap.addChild(new Sprite_gcBullets(ngcb));
		 break;
	 }
    };

var Scene_Title_d4mj_rmmv_gcBullets_xg_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    Scene_Title_d4mj_rmmv_gcBullets_xg_start.call(this);
    for (var key in $gcBullets) {
			$gcBullets[key] = [];
		}
};

var Scene_Map_d4mj_rmmv_Scene_Map_xg_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    Scene_Map_d4mj_rmmv_Scene_Map_xg_terminate.call(this);
	if ($gamePlayer.isTransferring()) {
		for (var key in $gcBullets) {
			$gcBullets[key] = [];
		}
	}
};

var DataManager_d4mj_rmmv_gcBullets_xg_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = DataManager_d4mj_rmmv_gcBullets_xg_makeSaveContents();
    contents.gcBullets       = $gcBullets;
    return contents;
};

var DataManager_d4mj_rmmv_gcBullets_xg_extractSaveContents =  DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    DataManager_d4mj_rmmv_gcBullets_xg_extractSaveContents(contents);
    $gcBullets        = contents.gcBullets;
};

var Spriteset_Map_d4mj_rmmv_gcBullets_xg_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	Spriteset_Map_d4mj_rmmv_gcBullets_xg_createCharacters.call(this);
	for (var key in $gcBullets) {
			for (var i = 0; i < $gcBullets[key].length; i++) {
				this._tilemap.addChild(new Sprite_gcBullets($gcBullets[key][i]));
			}
		}
};

})();
