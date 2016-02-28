'use strict';

var LoadingScene = require('./scene/loading');
var OpeningScene = require('./scene/opening');

var Game = function(mainCanvas) {
	// メインCanvas
	this.surface = mainCanvas.getContext('2d');

	this.width = Number(mainCanvas.getAttribute('width'));
	this.height = Number(mainCanvas.getAttribute('height'));

	// ゲームの現在のシーン
	this.state = null;

	// シーン一覧
	this.scenes = [];
	// ローディング画面
	this.scenes[ this.LOADING_SCENE ] = new LoadingScene(this);
	// オープニング画面
	this.scenes[ this.OPENING_SCENE ] = new OpeningScene(this);
	// ゲーム画面
	this.scenes[ this.STAGE_SCENE ]   = null;
	// エンディング画面
	this.scenes[ this.ENDING_SCENE ]  = null;

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
// ゲーム開始画面
Game.prototype.OPENING_SCENE = 1;
// ゲーム画面
Game.prototype.STAGE_SCENE   = 2;
// エンディング画面
Game.prototype.ENDING_SCENE  = 3;

// ゲームに必要な画像一覧
Game.prototype.IMAGES = {
	title_bg: 'image/title_bg.png',
};

// ゲームに必要なSE一覧
Game.prototype.SOUNDS = {};

// ゲームに必要なBGM一覧
Game.prototype.BGMS = {
	title_bgm: 'bgm/title.mp3',
};





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

/*
*******************************************
* 通知を受け取るメソッド
********************************************
*/

// ローディング画面が終わったら
Game.prototype.notifyLoadingDone = function( ) {
	// オープニング画面に切り替え
	this.changeScene(this.OPENING_SCENE);
};





module.exports = Game;
