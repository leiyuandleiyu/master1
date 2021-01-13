
cc.Class({
    extends: cc.Component,

    properties: {
      bg_1: cc.Node,
      bg_2: cc.Node,
      gameReady:cc.Node,
      gamePlaying:cc.Node,
      gamePause:cc.Node,
      hero:cc.Node,
    },


    onLoad () {
        this.isBgMove = false;
        this.bg_1.y = 0;
        this.bg_2.y = this.bg_1.y + this.bg_1.height;
        this.setTouch();
        this.gameReady.active = true;
        this.gamePlaying.active = false;
        this.gamePause.active = false;
    },

    setTouch:function(){
        this.node.on('touchstart', function (event) {
            console.log('touchstart');
            this.gameReady.active = false;
            this.gamePlaying.active = true;
            this.isBgMove = true;
          }, this);
          this.node.on('touchmove', function (event) {
            console.log('touchmove');
            var pos_hero = this.hero.getPosition();
            var pos_move = event.getDelta();
            this.hero.setPosition(cc.v2(pos_hero.x + pos_move.x,pos_hero.y + pos_move.y));
          }, this);
          this.node.on('touchend', function (event) {
            console.log('touchend');
           
          }, this);
    },

    clickBtn:function(sender,str){
        if(str == 'pause'){
            cc.log('点击了暂停按钮')
            this.gamePause.active = true;
        }else if(str == 'continue'){
            cc.log('点击了继续按钮')
            this.gamePause.active = false;
        }else if(str == 'reStart'){
            cc.log('点击了重新开始按钮')
            this.gamePause.active = false;
        }else if(str == 'backHome'){
            cc.log('点击了返回主页按钮')
            this.gamePause.active = false;
            this.gamePlaying.active = false;
            this.gameReady.active = true;
            this.isBgMove = false;
        }
    },

    setBg(){
        this.bg_1.y = this.bg_1.y - 10;
        this.bg_2.y = this.bg_2.y - 10;
        if(this.bg_1.y <= -this.bg_1.height){
            this.bg_1.y = this.bg_2.y + this.bg_1.height;
        }
        if(this.bg_2.y <= -this.bg_1.height){
            this.bg_2.y = this.bg_1.y + this.bg_1.height;
        }
    },

    update (dt) {
        if(this.isBgMove){
            this.setBg();
        }
        
    },
});
