import c_audio from "../begin/c_audio";
import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_ready extends cc.Component {
    //播放声音
    sound(){
        c_audio.ins.playSound("begin");
    }
    //通知消息中心开始游戏
    aniEnd(){
        c_event.ins.gameBegin();
        this.node.destroy();
    }
}
