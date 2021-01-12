
const {ccclass, property} = cc._decorator;

@ccclass
export default class enable_phy extends cc.Component {

    @property(cc.Vec2)
    gravity: cc.Vec2 = cc.v2(0,-320);//引擎默认重力

    @property
    is_debug: boolean = false;//是否打开调试区域

    //开启物理引擎，一定要写到onload里面，否则在start里写是无效的
     onLoad () {
         //开启物理引擎
         cc.director.getPhysicsManager().enabled = true;

         //配置物理引擎的重力
         cc.director.getPhysicsManager().gravity = this.gravity;

         //配置调试区域
         if(this.is_debug){
            var Bits :any = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_pairBit |
                                                             Bits.e_centerOfMassBit | 
                                                             Bits.e_jointBit | 
                                                             Bits.e_shapeBit;
                                                             
         }else{
            cc.director.getPhysicsManager().debugDrawFlags = 0;
         }
     }

    start () {

    }

}
