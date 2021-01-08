const State = {
    stand:1,
    attack:2,
    hurt:3,
};
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
        this.hp = 5;
        this.isHit = false;
        this.anima = 'idle';
        this.ani = this.node.getChildByName('body').getComponent(cc.Animation);
        this.rb = this.node.getComponent(cc.RigidBody);
        this._speed = 80;
        this.sp = cc.v2(0 , 0);
        this.tt = 0;
        this.heroState = State.stand;
        this.enemyState = State.stand;
        this.ani.on('finished',(e,data) => {
            if(data.name == 'hurt'){
                this.hp--;
                this.isHit = false;
                this.heroState = State.stand;

                if(this.hp == 0){
                this.node.destroy();
                } 
            }else if(data.name == 'attack'){
                this.ani.play('idle');
                this.heroState = State.stand;
            }
        });

        this.moveLeft = false;
        this.moveRight = false;

        this.playerNode = cc.find('Canvas/bg/hero');

    // setInterval(() => {
    //     this.moveLeft = !this.moveLeft;
    //     this.moveRight = !this.moveRight;
    // },1000);        //隔一秒换个方向
    },
   hurt(){
    if(this.isHit)return;
    this.isHit = true;
    this.enemyState = State.hurt;
    this.lv = this.rb.linearVelocity;
    this.lv.x = 0;
    this.rb.linearVelocity = this.lv;
    this.ani.play('hurt');
   },

   setAni(anima){
    if(this.anima == anima)return;

    this.anima = anima;
    this.ani.play(anima);
},

enemyAction(tt){
    let p_pos = this.playerNode.position;
    let e_pos = this.node.position;
    console.log(e_pos);
    let dis = cc.Vec2.distance(e_pos,p_pos);
    
    if(dis <= 30){
        console.log("攻击");
    }else if(dis <= 150){
        console.log("追击");
    }else{
        console.log("静止");
    }
   },

attack(){
    this.setAni('attack');
    this.lv = this.rb.linearVelocity;
    this.lv.x = 0;
    this.rb.linearVelocity = this.lv;
},
move(){
    let scaleX =Math.abs(this.node.scaleX);
    this.lv = this.rb.linearVelocity;
    if(this.moveLeft){
        this.sp.x = -1;
        this.node.scaleX = -scaleX;
        this.setAni('run');
    }else if (this.moveRight){
        this.sp.x = 1
        this.node.scaleX = scaleX;
        anima = 'run';
        this.setAni('run');
    }else{
        this.sp.x = 0;
        this.setAni('idle');
    }
    if(this.sp.x){
        this.lv.x = this.sp.x * this._speed;
    }else{
        this.lv.x = 0;
    }
    this.rb.linearVelocity = this.lv;

},
   update (dt){   
    //状态切换
    this.tt += dt;
    if(this.tt >= 0.3 && this.enemyState == State.stand){
        this.enemyAction(dt);
        this.tt = 0;
    }
   
    if (this.heroState == State.attack){
       this.attack(); //攻击
    }else if(this.heroState == State.stand){
        this.move(); //移动
    }
},
});
