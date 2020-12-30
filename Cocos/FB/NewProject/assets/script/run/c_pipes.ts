import c_event from "../begin/c_event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class c_pipes extends cc.Component {
    @property(cc.Prefab)pre_pipes:cc.Prefab = null;
    private pool:cc.NodePool;//对象池
    private dis_x:number = 200;//管道x间隔
    private dis_x_cu:number = 200;//当前管道x间隔的累积值
    private dis_y:number = 120;//管道y间隔
    private p_y:number = 88;//一组管道中心y的最大的随机值
    private vx:number = 0;//x移动速度
    private arr:cc.Node[] = [];//管理舞台上管道的数组
    private pause:boolean = true;//是否暂停

    onLoad(){
        this.pool_ini();
        this.vx = c_event.ins.flyVx;
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
    update(){
        if(this.pause){
            return;
        }
      //在一定的间隔后创建管道
      this.dis_x_cu += this.vx;
      if(this.dis_x_cu > this.dis_x){
        this.dis_x_cu = 0;
        this.pipe_in();
      }
      //管道的移动
      this.pipe_move(this.vx);
    }
    //对象池初始化
    pool_ini(){
        this.pool = new cc.NodePool();
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
    //创建一对管道
    pipe_in(){
        //从对象池拿出来
        let pipe:cc.Node = this.pool_get();
        //设置管道的位置
        let px:number = cc.Canvas.instance.node.width / 2 + pipe.width;
        let py:number = (Math.random()*2 -1)*this.p_y;
        pipe.setPosition(px,py);
        pipe.getChildByName("up").y = this.dis_y/2;
        pipe.getChildByName("down").y =-this.dis_y/2;
        //放进舞台
        this.node.addChild(pipe);
        //把管道放进数组
        this.arr.push(pipe);
    }
    //移除一堆管道（参数:数组序列号）
    pipe_out(index:number){
        //获得管道
        let pipe:cc.Node = this.arr[index];
        //移除舞台
        this.node.removeChild(pipe);
        //放回对象池
        this.pool_put(pipe);
        //移除出数组
        this.arr.splice(index,1);
    }
    //管道的运动，包括移除管道
    pipe_move(vx:number){
        for(let i = 0;i < this.arr.length;i++){
            let pipe:cc.Node = this.arr[i];
            pipe.x -= vx;
            if(pipe.x <- cc.Canvas.instance.node.width/2){
                this.pipe_out(i);
                break;//中断循环
            }
        }
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
