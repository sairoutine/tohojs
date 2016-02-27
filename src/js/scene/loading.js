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

};

// 画面更新
LoadingScene.prototype.updateDisplay = function(){
	// 全素材数
	var material_num = this.game.images.length + this.game.sounds.length + this.game.bgms.length;
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

};

LoadingScene.prototype._loadSounds = function() {

};

LoadingScene.prototype._loadBGMs = function() {

};


module.exports = LoadingScene;
