
public class Point {
		public Point(int m,int n,int k){
			x = m;
			y = m;
			z = k;
		}
		int x;
		int y;
		int z;
		
		public void setPoint(int m,int n,int k){
			x = m;
			y = n;
			z = k;
			
			System.out.println("x="+x+" "+"y="+y+"z="+z);
			System.out.println(y);
			System.out.println(z);
		}
}
