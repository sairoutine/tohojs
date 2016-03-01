'use strict';

/* オブジェクトの基底クラス */

// lodash
var _ = require('lodash');

// constructor
var ObjectBase = function(scene) {
	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	this.frame_count = 0;
	// x座標(中心)
	this.x = 0;
	// y座標(中心)
	this.y = 0;
	// スプライトの開始位置
	this.indexX = 0;
	// スプライトの開始位置
	this.indexY = 0;
};

// 初期化
ObjectBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// フレーム処理
ObjectBase.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;
};

// 画面更新
ObjectBase.prototype.updateDisplay = function(){
	console.error("updateDisplay method must be overridden");
};

module.exports = ObjectBase;
