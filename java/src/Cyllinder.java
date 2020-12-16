
public class Cyllinder {
	int r;
  public void Cylinder(){
	  r = 1;
	  
  }
	public int getR() {
		return r;
	}
	public void setR(int r) {
		this.r = r;
	}
	public float findArea(){
		float area = (float) (r*r*3.14);
		return area;
	}
}
