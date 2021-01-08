const Input = {};
const State = {
    stand:1,
    attack:2,
};
cc.Class({
    extends: cc.Component,

    properties: {

    },
    
    onLoad(){
        this._speed = 200;
        this.sp = cc.v2(0 , 0);
        this.combo = 0;
        this.heroState = State.stand;
        this.anima = 'idle';
        this.heroAni = this.node.getChildByName('body').getComponent(cc.Animation);
        this.rb = this.node.getComponent(cc.RigidBody);
        this.heroAni.on('finished',this.onAnimaFinished,this);

        cc.systemEvent.on('keydown',this.onKeydown,this);
        cc.systemEvent.on('keyup',this.onKeyup,this);
    },
    onDestroy(){
        this.heroAni.off('finished',this.onAnimaFinished,this);
        cc.systemEvent.off('keydown',this.onKeydown,this);
        cc.systemEvent.off('keyup',this.onKeyup,this);
        
    },
    onAnimaFinished(e,data){
        if(data.name == 'attack' || data.name == 'attack2' || data.name == 'attack3'){
            this.heroState = State.stand;
            this.combo = (this.combo + 1) % 3;
            setTimeout(() => {
                if(this.heroState == State.attack) return;
                this.combo = 0;
            },500);
        }
    },
    setAni(anima){
        if(this.anima == anima)return;

        this.anima = anima;
        this.heroAni.play(anima);
    },
    onKeydown(e){
        Input[e.keyCode] = 1;
    },
    onKeyup(e){
        Input[e.keyCode] = 0;
    },

    //攻击
    attack(){
        this.lv = this.rb.linearVelocity;
        if(Input[cc.macro.KEY.j]){
            if (this.combo == 0){
                this.setAni('attack');
            }else if(this.combo == 1){
                this.setAni('attack2');
            }else if(this.combo == 2){
                this.setAni('attack3');
            }
            this.lv.x = 0;
        }
        this.rb.linearVelocity = this.lv;
    },

    //移动
    move(){
        let scaleX =Math.abs(this.node.scaleX);
        this.lv = this.rb.linearVelocity;
        if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]){
            this.sp.x = -1;
            this.node.scaleX = -scaleX;
            this.setAni('run');
        }else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]){
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
        switch (this.heroState){
            case State.stand:{
                if (Input[cc.macro.KEY.j]){
                    this.heroState = State.attack;
                }
                break;
            }
        }
       
        if (this.heroState == State.attack){
           this.attack(); //攻击
        }else if(this.heroState == State.stand){
            this.move(); //移动
        }
    },
});
