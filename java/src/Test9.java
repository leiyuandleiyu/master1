
public class Test9 {
  public static void main(String[] args){
	int[] numbers = new int[]{9,5,1,3,6,8};
	Bub(numbers);
  }
     public static void Bub(int[] numbers) {
	  for(int i = 0;i < numbers.length-1;i++){
		for(int j = 0;j < numbers.length-1-i;j++){
			if(numbers[j] > numbers[j+1]){
				int min = numbers[j];
				numbers[j] = numbers[j+1];
				numbers[j+1] = min;
			}
		}
	  }
	  System.out.println("从小到大排序后的结果是:");
      for(int i = 0;i<numbers.length;i++)
          System.out.print(numbers[i]+" ");
//	  for(int i = 0;i<numbers.length;i++){
//		  System.out.print(numbers[i]+"  ");
//	  }
//	  Single.getInstance();
//	  Single.getInstance();
//	  Single.getInstance();
//	  Single.getInstance();

	  
//	  
//	  Single s = Single.getInstance();
//	  Single s1 = Single.getInstance();
//	  Single s2 = Single.getInstance();
//	  Single s3 = Single.getInstance();
     }
}
