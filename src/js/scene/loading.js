'use strict';

/* ローディング画面 */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseScene = require('./base');

// constructor
var LoadingScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);

	// 読み込んだ画像の数
	this.loadedImageNum = 0;
	// 読み込んだSEの数
	this.loadedSoundNum = 0;
	// 読み込んだBGMの数
	this.loadedBGMNum = 0;
};

// 基底クラスを継承
_.extend(LoadingScene.prototype, BaseScene.prototype);
_.extend(LoadingScene, BaseScene);

// 初期化
LoadingScene.prototype.init = function() {
	// ゲームで使う画像の読み込み
	this._loadImages();
	// SE の読み込み
	this._loadSounds();
	// BGM の読み込み
	this._loadBGMs();
};

// フレーム処理
LoadingScene.prototype.run = function(){
	// 全素材数
	var material_num = Object.keys(this.game.images).length + Object.keys(this.game.sounds).length + Object.keys(this.game.bgms).length;
	// 読み込んだ素材数
	var loaded_material_num = this.loadedImageNum + this.loadedSoundNum  + this.loadedBGMNum;

	// 素材を全て読み込んだら
	if(loaded_material_num >= material_num) {
		// 読み込み終わったことをゲームに通知
		this.game.notifyLoadingDone();
	}
};

// 画面更新
LoadingScene.prototype.updateDisplay = function(){
	// 全素材数
	var material_num = Object.keys(this.game.images).length + Object.keys(this.game.sounds).length + Object.keys(this.game.bgms).length;
	// 読み込んだ素材数
	var loaded_material_num = this.loadedImageNum + this.loadedSoundNum  + this.loadedBGMNum;

	this.game.surface.save( ) ;
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;
	this.game.surface.textAlign = 'right' ;
	this.game.surface.fillText( 'loading...', 180, 200 ) ;
	this.game.surface.fillText( loaded_material_num + '/' + material_num, 200, 240 ) ;
	this.game.surface.restore();
};

LoadingScene.prototype._loadImages = function() {
	var self = this;

	// 画像が読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedImageNum++;
	};

	for(var key in this.game.IMAGES) {
		this.game.images[key] = new Image();
		this.game.images[key].src = this.game.IMAGES[key] ;
		this.game.images[key].onload = onload_function;
	}

};

LoadingScene.prototype._loadSounds = function() {
	var self = this;

	// SEが読み込まれたら読み込んだ数を+1
	var onload_function = function(e) {
		self.loadedBGMNum++;
	};

	for(var key in this.game.SOUNDS) {
		this.game.sounds[key] = new Audio(this.game.SOUNDS[key].path);
		this.game.sounds[key].volume = this.game.SOUNDS[key].volume;
		this.game.sounds[key].addEventListener('canplay', onload_function);
		this.game.sounds[key].load();
	}

};

LoadingScene.prototype._loadBGMs = function() {
	var self = this;

	// BGMが読み込まれたら読み込んだ数を+1
	var onload_function = function(e) {
		self.loadedBGMNum++;
	};

	for(var key in this.game.BGMS) {
		this.game.bgms[key] = new Audio(this.game.BGMS[key].path);
		this.game.bgms[key].volume = this.game.BGMS[key].volume;
		this.game.bgms[key].addEventListener('canplay', onload_function);
		this.game.bgms[key].load();
	}
};


module.exports = LoadingScene;
