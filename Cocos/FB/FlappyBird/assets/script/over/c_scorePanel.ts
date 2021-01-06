import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_scorePanel extends cc.Component {
    private label_score:cc.Label;
    private label_best:cc.Label;

    onLoad(){
        this.label_score = this.node.getChildByName("score").getComponent(cc.Label);
        this.label_best = this.node.getChildByName("best").getComponent(cc.Label);
        c_event.ins.saveSoreCu();
        this.label_score.string = c_event.ins.getScoreCu().toString();
         this.label_best.string = c_event.ins.getScoreBest().toString();        
    }
}
