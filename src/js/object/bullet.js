'use strict';

/* 敵弾オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var VectorBaseObject = require('./vector_base');

// constructor
var Bullet = function(id, scene) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);
};

// 基底クラスを継承
_.extend(Bullet.prototype, VectorBaseObject.prototype);
_.extend(Bullet, VectorBaseObject);

// 当たり判定サイズ
Bullet.prototype.collisionWidth  = function() { return this.spriteWidth();  };
Bullet.prototype.collisionHeight = function() { return this.spriteHeight(); };

// スプライトの開始位置
Bullet.prototype.spriteX = function() { return 3; };
Bullet.prototype.spriteY = function() { return 3; };

// スプライト画像
Bullet.prototype.spriteImage = function() { return 'bullet'; };

// スプライトのサイズ
Bullet.prototype.spriteWidth  = function() { return 16; };
Bullet.prototype.spriteHeight = function() { return 16; };

// 初期化
Bullet.prototype.init = function(params, enemy) {
	// ベクトルの初期化
	VectorBaseObject.prototype.init.apply(this, arguments);

	// 弾の初期位置は敵の位置
	this.x = enemy.x;
	this.y = enemy.y;
};

// フレーム処理
Bullet.prototype.run = function(){
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 衝突した時
Bullet.prototype.notifyCollision = function(obj) {
	// 何もしない
};

module.exports = Bullet;
