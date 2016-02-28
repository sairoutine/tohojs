'use strict';

/* オープニング画面 */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseScene = require('./base');

// constructor
var OpeningScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
_.extend(OpeningScene.prototype, BaseScene.prototype);
_.extend(OpeningScene, BaseScene);

// 画面切り替え効果時間
OpeningScene.prototype.SHOW_TRANSITION_COUNT = 1000;


// 初期化
OpeningScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.game.playBGM('title');
};

// キー押下
OpeningScene.prototype.handleKeyDown = function(e){
	switch( e.keyCode ) {
		case 90: // z
			console.log('ok');
			this.game.playSound('select') ;
			this.game.notifyOpeningDone( ) ;
			break;
	}
};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);
};

// 画面更新
OpeningScene.prototype.updateDisplay = function(){
	this.game.surface.save( ) ;

	// 切り替え効果
	if( this.frame_count < this.SHOW_TRANSITION_COUNT ) {
		this.game.surface.globalAlpha = this.frame_count / this.SHOW_TRANSITION_COUNT;
	}
	else {
		this.game.surface.globalAlpha = 1.0 ;
	}

	var title_bg = this.game.getImage('title_bg');

	// 魔理沙背景画像表示
	this.game.surface.drawImage(title_bg,
					0,
					0,
					title_bg.width,
					title_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);

	this.game.surface.font = "24px 'Comic Sans MS'" ;
	this.game.surface.textAlign = 'center' ;
	this.game.surface.textBaseAlign = 'middle' ;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;
	this.game.surface.fillText( 'Touhou Project', 120, 200 ) ;
	this.game.surface.fillText( 'on Javascript',  120, 250 ) ;
	this.game.surface.fillText('Press Z to Start',120, 350 ) ;

	this.game.surface.restore( ) ;

};

module.exports = OpeningScene;
