'use strict';

/* 敵を生成するクラス */

// lodash
var _ = require('lodash');

// 敵クラス
var Enemy = require('../object/enemy');

// constructor
var EnemyFactory = function(manager) {
	// 継承元new呼び出し
	//BaseObject.apply(this, arguments);

	// ステージシーン
	this.stage = manager.stage;

	// 生成した敵
	this.pool = [];

	// 敵に付与する一意なID(連番)
	this.incremental_id = 0;
};

// 基底クラスを継承
//_.extend(EnemyManager.prototype, BaseObject.prototype);
//_.extend(EnemyManager, BaseObject);

// 敵を生成
EnemyFactory.prototype.get = function(params) {
	this.incremental_id++;

	var enemy = new Enemy(this.incremental_id, this.stage);
	// 初期化
	enemy.init(params);

	return enemy;
};

// 弾を削除
EnemyFactory.prototype.free = function(id) {

};

module.exports = EnemyFactory;
