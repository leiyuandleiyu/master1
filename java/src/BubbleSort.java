
public class BubbleSort {
	    public static void main(String[] args) {
	        int[] numbers=new int[]{1,5,8,2,3,9,4};
	        sort(numbers);
	    } //冒泡排序算法
	    public static void sort(int[]numbers){
	    	 for(int i=0;i<numbers.length-1;i++){ //需进行length-1次冒泡
		            for(int j=0;j<numbers.length-1-i;j++){
		                if(numbers[j]>numbers[j+1]){
		                    int temp=numbers[j];
		                    numbers[j]=numbers[j+1];
		                    numbers[j+1]=temp;
		                }
		            }
		        }
		        System.out.println("tttttt");
		        for(int i = 0; i<numbers.length;i++)	
		            System.out.print(numbers[i]+" ");
	    }
	    
	    
	    
	    public static void main(String[] args){
	      int [] numbers = new int []{8,5,6,9,7,2,4};
	      //Bub(numbers);
	    }
	    
	    public static void Bub(int []numbers){
	    	for(int i = 0;i < numbers.length-1;i++){
		    	 for(int j = 0;j < numbers.length-1-i;j++)
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
        }
}