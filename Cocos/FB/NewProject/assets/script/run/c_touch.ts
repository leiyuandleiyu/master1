import c_audio from "../begin/c_audio";
import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_touch extends cc.Component {
    onLoad(){
        c_event.ins.node.on("gameBegin",this.on,this);
        c_event.ins.node.on("gamePause",this.off,this);
        c_event.ins.node.on("gameResume",this.on,this);
        c_event.ins.node.on("gameDie",this.off,this);
}
//手指点击屏幕
    on_touch(){
        c_event.ins.fly();
        c_audio.ins.playSound("wing");
    }
    on(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.on_touch,this);
    }
    off(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.on_touch,this);
    }
    onDestroy(){
        c_event.ins.node.off("gameBegin",this.on,this);
        c_event.ins.node.off("gamePause",this.off,this);
        c_event.ins.node.off("gameResume",this.on,this);
        c_event.ins.node.off("gameDie",this.off,this);
        this.off();
    }
}
