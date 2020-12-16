
public class Animal {
   String name;
   String food;
   int eye;
   int leg;
   public void getName(){
	   System.out.println("此种动物名字:"+name);
   }
   public void eatSome(){
	   System.out.println("此种动物的食物:"+food);
   }
   public void move(String moveType){
	   System.out.println("此种动物的运动方式:"+moveType);
   } 
   public int eyes(){
	   System.out.println("此动物的腿数量为:"+eye);
	   return eye;
   }
   public int legs(){
	   System.out.println("此动物的眼睛数量为:"+leg);
	   return leg;
   }
}