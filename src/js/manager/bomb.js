'use strict';

/* ボムを管理するクラス */

// lodash
var _ = require('lodash');

// ボムを生成するクラス
var BombFactory = require('../factory/item');
// 基底クラス
var BaseManager = require('./base');

// constructor
var BombManager = function(scene) {
	// 継承元new呼び出し
	BaseManager.apply(this, arguments);

	this.factory = new BombFactory(this);
};

// 基底クラスを継承
_.extend(BombManager.prototype, BaseManager.prototype);
_.extend(BombManager, BaseManager);

// 初期化
BombManager.prototype.init = function() {
	BaseManager.prototype.init.apply(this, arguments);
};

BombManager.prototype.create = function(enemy) {
	BaseManager.prototype.create.apply(this, arguments);
};

BombManager.prototype.remove = function(id) {
	BaseManager.prototype.remove.apply(this, arguments);
};

// フレーム処理
BombManager.prototype.run = function(){
	BaseManager.prototype.run.apply(this, arguments);

	// プレイヤーがXを押下したらボム使用
	if(this.game.isKeyPush(this.game.BUTTON_X)) {
		this.stage.notifyUseBomb();
	}
};

// 画面更新
BombManager.prototype.updateDisplay = function(){
	BaseManager.prototype.updateDisplay.apply(this, arguments);
};

module.exports = BombManager;
