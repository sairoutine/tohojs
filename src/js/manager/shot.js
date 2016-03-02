'use strict';

/* 自機の弾を管理するクラス */

// lodash
var _ = require('lodash');

// 自機弾クラス
var Shot = require('../object/shot');
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

module.exports = ShotManager;


/* 自機の弾を生成するクラス */

// lodash
var _ = require('lodash');

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
