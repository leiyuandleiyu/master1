
public class Animal {
   String name;
   String food;
   int eye;
   int leg;
   public void getName(){
	   System.out.println("���ֶ�������:"+name);
   }
   public void eatSome(){
	   System.out.println("���ֶ����ʳ��:"+food);
   }
   public void move(String moveType){
	   System.out.println("���ֶ�����˶���ʽ:"+moveType);
   } 
   public int eyes(){
	   System.out.println("�˶����������Ϊ:"+eye);
	   return eye;
   }
   public int legs(){
	   System.out.println("�˶�����۾�����Ϊ:"+leg);
	   return leg;
   }
}