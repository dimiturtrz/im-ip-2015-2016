
public class ClassesExample {
	public static void main(String[] args) {
		// CTRL+2 -> L = local variable
		final Room room = new Room();

		room.setHeight(10);
		room.setWidth(12);
		
		room.getHeight();
		room.getWidth();
		
		System.out.println(room.calculateArea());
	}

	public void setDimensions(Room room){
	}
}