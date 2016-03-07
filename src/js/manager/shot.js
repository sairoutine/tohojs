'use strict';

/* 自機の弾を管理するクラス */

// lodash
var _ = require('lodash');

// 弾を生成するクラス
var ShotFactory = require('../factory/shot');
// 基底クラス
var BaseManager = require('./base');

// constructor
var ShotManager = function(scene) {
	// 継承元new呼び出し
	BaseManager.apply(this, arguments);

	// 弾生成クラス
	this.factory = new ShotFactory(this);
};

// 基底クラスを継承
_.extend(ShotManager.prototype, BaseManager.prototype);
_.extend(ShotManager, BaseManager);

// 初期化
ShotManager.prototype.init = function() {
	BaseManager.prototype.init.apply(this, arguments);
};

// 弾生成
ShotManager.prototype.create = function() {
	BaseManager.prototype.create.apply(this, arguments);
};

// 弾削除
ShotManager.prototype.remove = function(id) {
	BaseManager.prototype.remove.apply(this, arguments);
};

// フレーム処理
ShotManager.prototype.run = function(){
	BaseManager.prototype.run.apply(this, arguments);
};

// 画面更新
ShotManager.prototype.updateDisplay = function(){
	BaseManager.prototype.updateDisplay.apply(this, arguments);
};

// 敵との衝突判定
ShotManager.prototype.checkCollisionWithEnemies = function(enemy_manager) {
	// 衝突判定
	for(var shot_id in this.objects) {
		for(var enemy_id in enemy_manager.objects) {
			if(this.objects[shot_id].checkCollision(enemy_manager.objects[enemy_id])) {
				// 弾に衝突を通知
				this.objects[shot_id].notifyCollision(enemy_manager.objects[enemy_id]);
				// 敵に衝突を通知
				enemy_manager.objects[enemy_id].notifyCollision(this.objects[shot_id]);

				break;
			}
		}
	}
};

module.exports = ShotManager;
