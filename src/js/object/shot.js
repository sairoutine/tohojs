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
};

// 基底クラスを継承
_.extend(Shot.prototype, BaseObject.prototype);
_.extend(Shot, BaseObject);

// 自機弾の移動速度
Shot.prototype.SPEED = 8;

// 当たり判定サイズ
Shot.prototype.collisionWidth  = function() { return this.spriteWidth();  };
Shot.prototype.collisionHeight = function() { return this.spriteHeight(); };

// スプライトの開始位置
Shot.prototype.spriteX = function() { return 3; };
Shot.prototype.spriteY = function() { return 3; };

// スプライト画像
Shot.prototype.spriteImage = function() { return 'shot'; };

// スプライトのサイズ
Shot.prototype.spriteWidth  = function() { return 16; };
Shot.prototype.spriteHeight = function() { return 48; };

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

// 衝突した時
Shot.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.shotmanager.remove(this.id);
};

module.exports = Shot;
