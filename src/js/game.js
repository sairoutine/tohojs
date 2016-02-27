'use strict';

var LoadingScene = require('./scene/loading');

var Game = function(mainCanvas) {
	// メインCanvas
	this.surface = mainCanvas.getContext('2d');

	this.width = Number(mainCanvas.getAttribute('width'));
	this.height = Number(mainCanvas.getAttribute('height'));

	// ゲームの現在のシーン
	this.state = this.LOADING_SCENE;

	// シーン一覧
	this.scenes = [];
	// ローディング画面
	this.scenes[ this.LOADING_SCENE ] = new LoadingScene(this);

	// 画像一覧
	this.images = [];

	// SE一覧
	this.sounds = [];

	// BGM一覧
	this.bgms = [];

	// 経過フレーム数
	this.frame_count = 0;
};

// デバッグモード
Game.prototype.DEBUG = true;
// ローディング画面
Game.prototype.LOADING_SCENE = 0;


// キー押下
Game.prototype.handleKeyDown = function(e){

};
// キー押下解除
Game.prototype.handleKeyUp   = function(e){

};

// 初期化
Game.prototype.init = function () {
	// シーンをローディング画面にする
	this.changeScene(this.LOADING_SCENE);
};

// ゲーム起動
Game.prototype.run = function(){
	// シーン更新
	this.scenes[ this.state ].run();
	this.scenes[ this.state ].updateDisplay();

	// 経過フレーム数更新
	this.frame_count++;

	// 次の描画タイミングで再呼び出ししてループ
	requestAnimationFrame(this.run.bind(this));
};

// シーンを切り替え
Game.prototype.changeScene = function(scene) {
	// シーン切り替え
	this.state = scene;
	// 切り替え後のシーンを初期化
	this.scenes[ this.state ].init();
};

module.exports = Game;
