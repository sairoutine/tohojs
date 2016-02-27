'use strict';

var Game = function(mainCanvas) {
	// ゲームの現在のシーン
	this.state = this.LOADING_SCENE;

	// ローディング画面
	//this.scenes[ this.LOADING_SCENE ] = new LoadingScene(this);

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
	if(this.DEBUG) { console.log('run!'); }

	// シーン更新
	//this.scenes[ this.state ].run();
	//this.scenes[ this.state ].updateDisplay();

	// 経過フレーム数更新
	this.frame_count++;

	// 次の描画タイミングで再呼び出ししてループ
	requestAnimationFrame(this.run.bind(this));
};

module.exports = Game;
