'use strict';

var LoadingScene = require('./scene/loading');
var OpeningScene = require('./scene/opening');
var StageScene   = require('./scene/stage');

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
	this.scenes[ this.STAGE_SCENE ]   = new StageScene(this);
	// エンディング画面
	this.scenes[ this.ENDING_SCENE ]  = null;

	// 画像一覧
	this.images = {};

	// SE一覧
	this.sounds = {};

	// どのSEを再生するかのフラグ
	this.soundflag = 0x00;

	// BGM一覧
	this.bgms = {};

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
	title_bg:  'image/title_bg.png',
	stage1_bg: 'image/stage1_bg.jpg',
	reimu:     'image/reimu.png',
	shot:      'image/shot.png',
	enemy:     'image/enemy.png',
	bullet:    'image/bullet.png',
	item:      'image/item.png',
};

// ゲームに必要なSE一覧
Game.prototype.SOUNDS = {
	select: {
		id: 0x01,
		path:   'sound/select.wav',
		volume: 1.00
	},
	shot: {
		id: 0x02,
		path: 'sound/shot.wav',
		volume: 0.1
	},
	enemy_vanish: {
		id: 0x04,
		path: 'sound/enemy_vanish.wav',
		volume: 0.03
	},
	dead: {
		id: 0x08,
		path: 'sound/dead.wav',
		volume: 0.05
	}
};

// ゲームに必要なBGM一覧
Game.prototype.BGMS = {
	title: {
		path:   'bgm/title.mp3',
		volume: 0.50
	},
	stage1: {
		path:   'bgm/stage1.mp3',
		volume: 0.50
	},
};





// キー押下
Game.prototype.handleKeyDown = function(e){
	this.scenes[ this.state ].handleKeyDown(e);
	e.preventDefault( ) ;
};
// キー押下解除
Game.prototype.handleKeyUp   = function(e){
	this.scenes[ this.state ].handleKeyUp(e);
	e.preventDefault( ) ;
};

// 初期化
Game.prototype.init = function () {
	// 経過フレーム数を初期化
	this.frame_count = 0;

	// シーンをローディング画面にする
	this.changeScene(this.LOADING_SCENE);
};

// ゲーム起動
Game.prototype.run = function(){
	// シーン更新
	this.scenes[ this.state ].run();
	this.scenes[ this.state ].updateDisplay();

	// SEを再生
	this.runPlaySound();

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

// 画像を取得
Game.prototype.getImage = function(key) {
	return this.images[key];
};

// BGMを再生
Game.prototype.playBGM = function(bgm) {
	// 全てのBGM再生をストップ
	for(var key in this.bgms) {
		this.bgms[key].pause();
		this.bgms[key].currentTime = 0;
	}

	// 再生をループする
	this.bgms[bgm].loop = true ;
	// 再生
	this.bgms[bgm].play();
} ;

// 再生するSEをセット
Game.prototype.playSound = function(key) {
	this.soundflag |= this.SOUNDS[key].id;
};

// セットされたフラグにもとづいてSEを再生
Game.prototype.runPlaySound = function() {
	for(var key in this.SOUNDS) {
		// フラグが立ってたら
		if(this.soundflag & this.SOUNDS[key].id) {
			// 再生
			this.sounds[key].pause();
			this.sounds[key].currentTime = 0;
			this.sounds[key].play();

			// フラグを削除
			this.soundflag &= ~this.SOUNDS[key].id;

			// 1フレームに1つしか再生しない
			break;
		}
	}
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

// タイトル画面が終わったら
Game.prototype.notifyOpeningDone = function( ) {
	// ゲーム画面に切り替え
	this.changeScene(this.STAGE_SCENE);
};

// コンティニューで終了を選択したら
Game.prototype.notifySelectQuit = function( ) {
	// オープニング画面に切り替え
	this.changeScene(this.OPENING_SCENE);
};

module.exports = Game;
