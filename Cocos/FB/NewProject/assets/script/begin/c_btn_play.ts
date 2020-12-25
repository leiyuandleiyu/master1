import c_audio from "./c_audio";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_btn_play extends cc.Component {

  onLoad(){
          this.node.on("click",this.onClick,this);
      }
  onClick(){
    console.debug('-----------onClick------12-------')
    c_audio.ins.playSound("button");
    cc.director.loadScene("s_run");
  } 
  onDestroy(){
      this.node.off("click",this.onClick,this);

  }



}
