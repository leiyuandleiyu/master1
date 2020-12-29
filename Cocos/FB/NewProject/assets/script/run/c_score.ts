import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_score extends cc.Component {

    private label:cc.Label;
    private ani:cc.Animation;

    onLoad(){
        this.label = this.getComponent(cc.Label);
        this.ani = this.getComponent(cc.Animation);
        c_event.ins.node.on("addScore",this.addScore,this);//加分
        c_event.ins.node.on("gameBegin",this.use,this);//游戏正式开始事件
        c_event.ins.scoreCu = 0;//把分数重置为0
        this.label.string = "0";
        this.node.opacity = 0;//不可见
    }
    use(){
        this.node.opacity = 255;//可见

    }
    addScore(e){
        console.log('-----------addScore----24----------');
        console.log(e);
        this.label.string = e.toLocaleString();
        this.ani.play("run_score");
    }
    onDestroy(){
        c_event.ins.node.off("addScore",this.addScore,this);
        c_event.ins.node.off("gameBegin",this.use,this);
    }
}
 