'use strict';

/* 自機弾オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Shot = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 弾を一意に特定するID

	// 弾のスプライト上の位置
	this.indexX = 3; this.indexY = 3; //TODO:
};

// 基底クラスを継承
_.extend(Shot.prototype, BaseObject.prototype);
_.extend(Shot, BaseObject);

// 自機弾のスプライトサイズ
Shot.prototype.WIDTH  = 16;
Shot.prototype.HEIGHT = 48;

// 自機弾画像
Shot.prototype.IMAGE_KEY = 'shot';

// 自機弾の移動速度
Shot.prototype.SPEED = 8;

// 初期化
Shot.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 弾の初期位置は自機の位置
	this.x = this.stage.character.x;
	this.y = this.stage.character.y;
};

// フレーム処理
Shot.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 弾を直進させる
	this.y -= this.SPEED;
};

module.exports = Shot;
