'use strict';

/* 自機の弾を生成するクラス */

// lodash
var _ = require('lodash');

// 自機弾クラス
var Shot = require('../object/shot');

// constructor
var ShotFactory = function(manager) {
	// 継承元new呼び出し
	//BaseObject.apply(this, arguments);

	// ステージシーン
	this.stage = manager.stage;

	// 生成した弾
	this.pool = [];

	// 弾に付与する一意なID(連番)
	this.incremental_id = 0;
};

// 基底クラスを継承
//_.extend(ShotManager.prototype, BaseObject.prototype);
//_.extend(ShotManager, BaseObject);

// 弾を生成
ShotFactory.prototype.get = function() {
	this.incremental_id++;

	var shot = new Shot(this.incremental_id, this.stage);
	// 初期化
	shot.init();

	return shot;
};

// 弾を削除
ShotFactory.prototype.free = function(id) {

};

module.exports = ShotFactory;
