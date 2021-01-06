import c_audio from "../begin/c_audio";
import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

enum state{ready,fly,pause,die};

@ccclass
export default class c_bird extends cc.Component {
    private pause:boolean = true;//是否暂停
    private g:number = 0.15;//重力加速度
    private vy:number = 0;//当前y速度
    private pow:number = 3.5;//动力
    private ani:cc.Animation = null;//动画控制器
    private sta:state = state.ready;//状态机

    onLoad(){
        this.ani = this.getComponent(cc.Animation);
        c_event.ins.node.on("gameBegin",this.on_gameBegin,this);
        c_event.ins.node.on("gamePause",this.on_gamePause,this); 
        c_event.ins.node.on("gameResume",this.on_gameResume,this);
        c_event.ins.node.on("fly",this.on_fly,this);
    }
    //进入碰撞
    onCollisionEnter(other,self){
        if(this.sta == state.fly){
            if(other.tag == 1){
                this.sta = state.die;
                c_audio.ins.playSound("collide");
                this.ani.play("run_bird_die");
                c_event.ins.gameDie();
            }
        }
    }
    //离开碰撞
    onCollisionExit(other,self){
        if(this.sta == state.fly){
            if(other.tag == 2){
                c_event.ins.addScore(1);
                c_audio.ins.playSound("score");
            }
        }
    }
    on_gameBegin(){
        this.sta = state.fly;
        this.ani.play("run_bird_down");
    }
    on_gamePause(){
        if(this.sta == state.fly){
            this.sta = state.pause;
        }
    }
    on_gameResume(){
        this.sta = state.fly;
        this.ani.play("run_bird_down");
    }
    on_fly(){
        if(this.sta == state.fly){
            this.vy = this.pow;
            this.ani.play("run_bird_fly");
            c_audio.ins.playSound("wing");
        }
    }
    //死亡结束
    dieOver(){
        c_event.ins.gameDieOver();
    }
    update(){
        if(this.sta == state.fly){
            this.vy -= this.g;
            this.node.y += this.vy;
        }
    }
    onDestroy(){
        c_event.ins.node.off("gameBegin",this.on_gameBegin,this);
        c_event.ins.node.off("gamePause",this.on_gamePause,this); 
        c_event.ins.node.off("gameResume",this.on_gameResume,this);
        c_event.ins.node.off("fly",this.on_fly,this);
    }
}
