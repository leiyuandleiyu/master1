
public class BubbleSort {
	    public static void main(String[] args) {
	        int[] numbers=new int[]{1,5,8,2,3,9,4};
	        sort(numbers);
	    } //ð�������㷨
	    public static void sort(int[]numbers){
	    	 for(int i=0;i<numbers.length-1;i++){ //�����length-1��ð��
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
        System.out.println("��С���������Ľ����:");
        for(int i = 0;i<numbers.length;i++)
            System.out.print(numbers[i]+" ");
        }
}