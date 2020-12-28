import c_audio from "../begin/c_audio";
import c_event from "../begin/c_event";
 
const {ccclass, property} = cc._decorator;

@ccclass
export default class c_btn_pause extends cc.Component {

    private toggle:cc.Toggle;

onLoad(){
    this.node.on("toggle",this.onToggle,this);//玩家的点击事件
    c_event.ins.node.on("gameBegin",this.use,this);//游戏正式开始事件
    c_event.ins.node.on("gameDie",this.hid,this);//玩家死亡事件 
     this.toggle = this.getComponent(cc.Toggle);
    // this.hid();
}
//启动
use(){
    this.toggle.interactable = true;//可响应
    this.node.opacity = 255;//可见

}
//隐藏
hid(){
    this.toggle.interactable = false;//不可响应
    this.node.opacity = 0;//不可见
}
//点击
onToggle(){
    
  
    if(this.toggle.isChecked){//运行中
        c_event.ins.gamePause();
    }else{//暂停中
        c_event.ins.gameResume();
    }
    c_audio.ins.playSound("button");
}
//销毁
onDestroy(){
    this.node.off("toggle",this.onToggle,this);//玩家的点击事件
    c_event.ins.node.off("gameBegin",this.use,this);//游戏正式开始事件
    c_event.ins.node.off("gameDie",this.hid,this);
}
}
