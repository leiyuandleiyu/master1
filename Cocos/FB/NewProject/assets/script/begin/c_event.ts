
const {ccclass, property} = cc._decorator;
//消息中心，游戏控制中心
@ccclass
export default class c_event extends cc.Component {

    static ins:c_event = null;//实例
    scoreCu:number = 0;//当前得分
    flyVx:number = 1.5;//小鸟移动速度

    onLoad(){
        c_event.ins = this;
        cc.game.addPersistRootNode(this.node);//常驻节点
        cc.director.getCollisionManager().enabled = true;//开启了碰撞检测
    }
    //开始游戏
    gameBegin(){
        this.node.emit("gameBegin");
    }
    //暂停游戏
    gamePause(){
        this.node.emit("gamePause");
    }
    //恢复游戏
    gameResume(){
        this.node.emit("gameResume");
    }
    //玩家死亡
    gameDie(){
        this.node.emit("gameDie");
    }
    //死亡结束
    gameDieOver(){
        cc.director.loadScene("s_voer");
    }
    //小鸟煽动翅膀
    fly(){
        this.node.emit("fly");
    }
    //得分
    addScore(n:number){
      this.scoreCu += n;
      this.node.emit("addScore",this.scoreCu);
    }
    //****************** */
    //结束了
    //储存当前分数
    saveSoreCu(){
        cc.sys.localStorage.setItem("cu",this.scoreCu);
        let best:number = this.getScoreBest();
        if(this.scoreCu > best){
            this.saveSoreBest(this.scoreCu);
        }
    }
    //储存最高分
    saveSoreBest(n:number){
        cc.sys.localStorage.setItem("best",n);
    }
    //获得当前得分
    getScoreCu():number{
        return(this.scoreCu);
    }
    //获得最高分
    getScoreBest():number{
        let best = cc.sys.localStorage.getItem("best");
        if(best){
            return(best);
        }else{
            cc.sys.localStorage.setItem("best",0);
            return(0);
        }
    }

}
