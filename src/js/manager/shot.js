'use strict';

/* 自機の弾を管理するクラス */

// lodash
var _ = require('lodash');

// 自機弾クラス
var Shot = require('../object/shot');

// constructor
var ShotManager = function(scene) {
	// 継承元new呼び出し
	//BaseObject.apply(this, arguments);

	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	// 弾生成クラス
	this.factory = new ShotFactory(this);

	// 画面上の弾一覧
	this.objects = {};

	this.frame_count = 0;
	// x座標(弾の中心)
	this.x = 0;
	// y座標(弾の中心)
	this.y = 0;
};

// 基底クラスを継承
//_.extend(ShotManager.prototype, BaseObject.prototype);
//_.extend(ShotManager, BaseObject);

// 自機のスプライトサイズ
ShotManager.prototype.WIDTH  = 32;
ShotManager.prototype.HEIGHT = 48;

// 自機の移動速度
ShotManager.prototype.SPEED = 4;

// Nフレーム毎に自機をアニメーション
ShotManager.prototype.ANIMATION_SPAN = 2;


// 初期化
ShotManager.prototype.init = function() {
	//BaseObject.prototype.init.apply(this, arguments);
};

// 弾生成
ShotManager.prototype.create = function(character) {
	var shot = this.factory.get();

	this.objects[shot.id] = shot;
};

// フレーム処理
ShotManager.prototype.run = function(){
	//BaseObject.prototype.run.apply(this, arguments);
	this.frame_count++;

	// 弾一覧
	for(var id in this.objects) {
		this.objects[id].run();
	}
};

// 画面更新
ShotManager.prototype.updateDisplay = function(){
	//BaseObject.prototype.run.apply(this, arguments);

	// 弾一覧
	for(var id in this.objects) {
		this.objects[id].updateDisplay();
	}

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
};

// 基底クラスを継承
//_.extend(ShotManager.prototype, BaseObject.prototype);
//_.extend(ShotManager, BaseObject);

// 弾を生成
ShotFactory.prototype.get = function() {
	var shot = new Shot(this.stage);
	// 初期化
	shot.init();

	return shot;
};


