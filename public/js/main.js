(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var LoadingScene = require('./scene/loading');

var Game = function(mainCanvas) {
	// ゲームの現在のシーン
	this.state = this.LOADING_SCENE;

	// シーン一覧
	this.scenes = [];
	// ローディング画面
	this.scenes[ this.LOADING_SCENE ] = new LoadingScene(this);

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

module.exports = Game;

},{"./scene/loading":3}],2:[function(require,module,exports){
'use strict';
var Game = require('./game');

window.onload = function() {
	// Canvas
	var mainCanvas = document.getElementById('mainCanvas');
	// Game オブジェクト
	var game = new Game(mainCanvas);
	// キーバインド
	window.onkeydown = function(e) { game.handleKeyDown(e); };
	window.onkeyup   = function(e) { game.handleKeyUp(e); };
	// ゲーム起動
	game.run();
};


},{"./game":1}],3:[function(require,module,exports){
'use strict';

var LoadingScene = function(game) {

};

// ゲーム起動
LoadingScene.prototype.run = function(){

};

// 画面更新
LoadingScene.prototype.updateDisplay = function(){

};

module.exports = LoadingScene;

},{}]},{},[2]);
