
const {ccclass, property} = cc._decorator;

@ccclass
export default class c_audio extends cc.Component {

     @property(cc.AudioClip)bgmmusic:cc.AudioClip = null;
     @property(cc.AudioClip)begin:cc.AudioClip = null;
     @property(cc.AudioClip)score:cc.AudioClip = null;
     @property(cc.AudioClip)button:cc.AudioClip = null;
     @property(cc.AudioClip)collide:cc.AudioClip = null;
     @property(cc.AudioClip)wing:cc.AudioClip = null;

     private bgID:number =-1;//背景音乐id
     private id:object = {};//所有音乐id
     static ins:c_audio = null;//单例

     onLoad(){
         c_audio.ins = this;
         cc.game.addPersistRootNode(this.node);//常驻节点
         //初始化音效id
         this.id = {
             begin:{clip:this.begin,id:-1},
             score:{clip:this.score,id:-1},
             button:{clip:this.button,id:-1},
             collide:{clip:this.collide,id:-1},
             wing:{clip:this.wing,id:-1}

         }
     }
      //播放背景音乐
     playBg(){
         //获取播放状态
        let state = cc.audioEngine.getState(this.bgID);
        //根据状态播放背景音乐
        if(state!= cc.audioEngine.AudioState.PLAYING){
          this.bgID = cc.audioEngine.play(this.bgmmusic as any,true,1);
        }
     }
     //暂停背景音乐
    pauseBg(){
    //获得播放状态
      let state = cc.audioEngine.getState(this.bgID);
      if(state == cc.audioEngine.AudioState.PLAYING){  
        cc.audioEngine.pause(this.bgID);    
      }
    }
    //播放声效
    playSound(nam:string){
       this.id[nam]["id"] = cc.audioEngine.play(this.id[nam]["clip"],false,1);
    }
    //停止音效
    stopSound(nam:string){
        //找到id
     let _id = this.id[nam]["id"];
       //获得状态
       let state = cc.audioEngine.getState(_id);
       if(state == cc.audioEngine.AudioState.PLAYING){
           cc.audioEngine.stop(_id);

       }
    }


}
