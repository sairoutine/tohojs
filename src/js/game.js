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

	// キー押下フラグ
	this.keyflag = 0x0;

	// 一つ前のフレームで押下されたキー
	this.before_keyflag = 0x0;
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

// キー押下フラグ
Game.prototype.BUTTON_LEFT  = 0x01;
Game.prototype.BUTTON_UP    = 0x02;
Game.prototype.BUTTON_RIGHT = 0x04;
Game.prototype.BUTTON_DOWN  = 0x08;
Game.prototype.BUTTON_Z     = 0x10;
Game.prototype.BUTTON_X     = 0x20;
Game.prototype.BUTTON_SHIFT = 0x40;
Game.prototype.BUTTON_SPACE = 0x80;


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
		volume: 0.08
	},
	enemy_vanish: {
		id: 0x04,
		path: 'sound/enemy_vanish.wav',
		volume: 0.1
	},
	dead: {
		id: 0x08,
		path: 'sound/dead.wav',
		volume: 0.08
	},
	graze: {
		id: 0x10,
		path: 'sound/graze.wav',
		volume: 0.1
	}
};

// ゲームに必要なBGM一覧
Game.prototype.BGMS = {
	title: {
		path:   'bgm/title.mp3',
		volume: 0.40
	},
	stage1: {
		path:   'bgm/stage1.mp3',
		volume: 0.50
	},
};

// キー押下
Game.prototype.handleKeyDown = function(e){
	this.keyflag |= this._keyCodeToBitCode(e.keyCode);
	e.preventDefault( ) ;
};
// キー押下解除
Game.prototype.handleKeyUp   = function(e){
	this.keyflag &= ~this._keyCodeToBitCode(e.keyCode);
	e.preventDefault( ) ;
};

// 指定のキーが押下状態か確認する
Game.prototype.isKeyDown = function(flag) {
	return this.keyflag & flag;
};

// 指定のキーが押下されたか確認する
Game.prototype.isKeyPush = function(flag) {
	// 1フレーム前に押下されておらず、現フレームで押下されてるなら true
	return !(this.before_keyflag & flag) && this.keyflag & flag;
};

// キーコードをBitに変換
Game.prototype._keyCodeToBitCode = function(keyCode) {
	var flag;
	switch(keyCode) {
		case 16: // shift
			flag = this.BUTTON_SHIFT;
			break;
		case 32: // space
			flag = this.BUTTON_SPACE;
			break;
		case 37: // left
			flag = this.BUTTON_LEFT;
			break;
		case 38: // up
			flag = this.BUTTON_UP;
			break;
		case 39: // right
			flag = this.BUTTON_RIGHT;
			break;
		case 40: // down
			flag = this.BUTTON_DOWN;
			break;
		case 88: // x
			flag = this.BUTTON_X;
			break;
		case 90: // z
			flag = this.BUTTON_Z;
			break;
	}
	return flag;
};





// 初期化
Game.prototype.init = function () {
	// 経過フレーム数を初期化
	this.frame_count = 0;

	// キー押下フラグ
	this.keyflag = 0x0;

	// 一つ前のフレームで押下されたキー
	this.before_keyflag = 0x0;

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

	// 押下されたキーを保存しておく
	this.before_keyflag = this.keyflag;

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
