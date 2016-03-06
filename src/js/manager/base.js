'use strict';

// lodash
var _ = require('lodash');

// constructor
var BaseManager = function(scene) {
	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	// オブジェクト生成クラス
	this.factory = null;

	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// 初期化
BaseManager.prototype.init = function() {
	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// オブジェクト生成
BaseManager.prototype.create = function(params) {
	var obj = this.factory.get(params);

	this.objects[obj.id] = obj;
};

// オブジェクト削除
BaseManager.prototype.remove = function(id) {
	delete this.objects[id];

	this.factory.free(id);
};

// フレーム処理
BaseManager.prototype.run = function(){
	this.frame_count++;

	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].run();
	}
};

// 画面更新
BaseManager.prototype.updateDisplay = function(){
	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].updateDisplay();
	}

};

module.exports = BaseManager;

