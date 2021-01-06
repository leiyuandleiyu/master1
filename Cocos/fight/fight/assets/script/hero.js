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

        this.heroState = State.stand;
        this.anima = 'idle';
        this.heroAni = this.node.getComponent(cc.Animation);

        cc.systemEvent.on('keydown',this.onKeydown,this);
        cc.systemEvent.on('keyup',this.onKeyup,this);
    },
    onDestroy(){
        cc.systemEvent.off('keydown',this.onKeydown,this);
        cc.systemEvent.off('keyup',this.onKeyup,this);
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
    update (dt){
        let anima = this.anima;
        let scaleX =Math.abs(this.node.scaleX);
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]){
            this.sp.x = -1;
            this.node.scaleX = -scaleX;
            anima = 'run';
        }else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]){
            this.sp.x = 1
            this.node.scaleX = scaleX;
            anima = 'run';
        }else{
            this.sp.x = 0;
            anima =  'idle';
        }

        if(this.sp.x){
            this.lv.x = this.sp.x * this._speed;
        }else{
            this.lv.x = 0;
        }
        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;

        if(anima){
            this.setAni(anima);
        }
    },
});
