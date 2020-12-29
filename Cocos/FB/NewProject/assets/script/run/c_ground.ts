import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private wid:number;//地面素材的宽度
    private inPx:number;//x的初始位置
    private dx:number = 0;//每帧移动的x距离
    private disCu:number = 0;//当前移动的距离
    private pause:boolean = true;//是否暂停

    onLoad(){
        this.wid = this .node.width*0.5;
        this.inPx = this.node.x;
        this.dx = c_event.ins.flyVx;
        c_event.ins.node.on("gameBegin",this.on_gameBegin,this);
        c_event.ins.node.on("gamePause",this.on_gamePause,this);
        c_event.ins.node.on("gameResume",this.on_gameResume,this);
        c_event.ins.node.on("gameDie",this.on_gameDie,this);
    }
    on_gameBegin(){
        this.pause = false;
    }
    on_gamePause(){
        this.pause = true;
    }
    on_gameResume(){
        this.pause = false;
    }
    on_gameDie(){
        this.pause = true;
    }
    update(){
        if(!this.pause){
            this.disCu += this.dx;
           if (this.disCu >= this.wid){
               this.disCu = 0;
           }
           this.node.x = this.inPx - this.disCu;
        }
    }
    onDestroy(){
        c_event.ins.node.off("gameBegin",this.on_gameBegin,this);
        c_event.ins.node.off("gamePause",this.on_gamePause,this);
        c_event.ins.node.off("gameResume",this.on_gameResume,this);
        c_event.ins.node.off("gameDie",this.on_gameDie,this);
    }
}
