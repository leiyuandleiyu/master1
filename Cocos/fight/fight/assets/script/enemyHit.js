// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
  
    },
 onLoad(){
     this.enemy = this.node.parent.getComponent('enemy');
 },

 //碰撞回调
 onCollisionEnter(other,self){
    if(other.node.group == 'hero' && other.tag == 1){
      this.enemy.hurt();
    }
}

});
