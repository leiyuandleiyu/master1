import c_audio from "./begin/c_audio";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_btn_play extends cc.Component {

    onLoad(){
        this.node.on("click",this.onClick,this);
    }
 onClick(){
   c_audio.ins.playSound("button");
   cc.director.loadScene("s_run");
 } 
 onDestroy(){
    this.node.off("click",this.onClick,this);

 }
}
