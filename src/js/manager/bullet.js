'use strict';

/* 敵の弾を管理するクラス */

// lodash
var _ = require('lodash');

// 弾を生成するクラス
var BulletFactory = require('../factory/bullet');
// 弾のデータ
var bullets_params = require('../data/bullets_params');

// 基底クラス
var BaseManager = require('./base');

// constructor
var BulletManager = function(scene) {
	// 継承元new呼び出し
	BaseManager.apply(this, arguments);

	// 弾生成クラス
	this.factory = new BulletFactory(this);

	this.bullets_params = bullets_params;
};

// 基底クラスを継承
_.extend(BulletManager.prototype, BaseManager.prototype);
_.extend(BulletManager, BaseManager);

// 初期化
BulletManager.prototype.init = function() {
	BaseManager.prototype.init.apply(this, arguments);
};

// 弾生成
BulletManager.prototype.create = function(enemy) {
	for( var i = 0; i < this.bullets_params[ enemy.shots.bullet ].length; i++ ) {
		// 敵弾生成
		var bullet = this.factory.get(this.bullets_params[ enemy.shots.bullet ][i], enemy);

		this.objects[bullet.id] = bullet;
	}
};

// 弾削除
BulletManager.prototype.remove = function(id) {
	BaseManager.prototype.remove.apply(this, arguments);
};

// フレーム処理
BulletManager.prototype.run = function(){
	BaseManager.prototype.run.apply(this, arguments);
};

// 画面更新
BulletManager.prototype.updateDisplay = function(){
	BaseManager.prototype.updateDisplay.apply(this, arguments);
};

// 自機との衝突判定
BulletManager.prototype.checkCollisionWithCharacter = function(character) {
	// 衝突判定
	for(var bullet_id in this.objects) {
		if(this.objects[bullet_id].checkCollision(character)) {
			// 敵弾に衝突を通知
			this.objects[bullet_id].notifyCollision(character);
			// 自機に衝突を通知
			character.notifyCollision(this.objects[bullet_id]);

			break;
		}
	}
};

module.exports = BulletManager;
