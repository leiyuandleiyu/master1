import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_pipes extends cc.Component {
    @property(cc.Prefab)pre_pipes:cc.Prefab = null;
    private pool:cc.NodePool;//对象池
    private dis_x:number = 200;//管道x间隔
    private dis_x_cu:number = 200;//当前管道x间隔的累积值
    private dia_y:number = 120;//管道y间隔
    private p_y:number = 88;//一组管道中心y的最大的随机值
    private VX:number = 0;//x移动速度
    private arr:cc.Node[] = [];//管理舞台上管道的数组
    private pause:boolean = true;//是否暂停

    onLoad(){
        this.pool_ini();
        this.VX = c_event.ins.flyVx;
        c_event.ins.node.on("gameBegin",this.on_gameBegin,this);
        c_event.ins.node.on("gamePause",this.on_gamePause,this); 
        c_event.ins.node.on("gameResume",this.on_gameResume,this);
        c_event.ins.node.on("gameDie",this.on_gamePause,this);
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
    //对象池初始化
    pool_ini(){
        this..pool = new cc.NodePool();
        for(let i = 0;i < 3;i++){
            let pipe:cc.Node = cc.instantiate(this.pre_pipes);
            this.pool.put(pipe);
        }
    }
    //从对象池取出对象
    pool_get():cc.Node{
        let pipe:cc.Node = null;
        if(this.pool.size() > 0){
            pipe = this.pool.get();
        }else{
            pipe = cc.instantiate(this.pre_pipes);
        }
        return(pipe);
    }
    //将对象放回对象池
    pool_put(pipe:cc.Node){
        this.pool.put(pipe);
    }
    //销毁
    onDestroy(){
        this.pool.clear();
        c_event.ins.node.off("gameBegin",this.on_gameBegin,this);
        c_event.ins.node.off("gamePause",this.on_gamePause,this); 
        c_event.ins.node.off("gameResume",this.on_gameResume,this);
        c_event.ins.node.off("gameDie",this.on_gamePause,this);
    }
}
