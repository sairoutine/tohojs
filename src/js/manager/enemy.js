'use strict';

/* 敵を管理するクラス */

// lodash
var _ = require('lodash');

// 敵のパラメータ
var enemies_params = require('../data/enemies_params');

// 敵を生成するクラス
var EnemyFactory = require('../factory/enemy');
// 基底クラス
var BaseManager = require('./base');

// constructor
var EnemyManager = function(scene) {
	// 継承元new呼び出し
	BaseManager.apply(this, arguments);

	// 弾生成クラス
	this.factory = new EnemyFactory(this);

	// どこまで敵を出現させたか
	this.enemy_index = 0;

	// 敵のパラメータ一一覧
	this.enemies_params = enemies_params;
};

// 基底クラスを継承
_.extend(EnemyManager.prototype, BaseManager.prototype);
_.extend(EnemyManager, BaseManager);

// 初期化
EnemyManager.prototype.init = function() {
	BaseManager.prototype.init.apply(this, arguments);

	// どこまで敵を出現させたか
	this.enemy_index = 0;
};

// 敵生成
EnemyManager.prototype.create = function() {
	// 現在フレームに出現予定の敵を出現させる
	while(this.enemies_params[ this.enemy_index ] &&
		this.enemies_params[ this.enemy_index ].count === this.frame_count) {
		var obj = this.factory.get(this.enemies_params[this.enemy_index]);
		this.objects[obj.id] = obj;
		this.enemy_index++ ;
	}
};

// 敵削除
EnemyManager.prototype.remove = function(id) {
	BaseManager.prototype.remove.apply(this, arguments);
};

// フレーム処理
EnemyManager.prototype.run = function(){
	BaseManager.prototype.run.apply(this, arguments);

	// 敵生成
	this.create();
};

// 画面更新
EnemyManager.prototype.updateDisplay = function(){
	BaseManager.prototype.updateDisplay.apply(this, arguments);
};

// 自機との衝突判定
EnemyManager.prototype.checkCollisionWithCharacter = function(character) {
	// 衝突判定
	for(var id in this.objects) {
		if(character.checkCollision(this.objects[id])) {
			// TODO: キャラとショットで衝突した時の処理を分ける
			// 敵に衝突を通知
			//this.objects[id].notifyCollision(character);
			// 自機に衝突を通知
			character.notifyCollision(this.objects[id]);

			break;
		}
	}
};

module.exports = EnemyManager;
