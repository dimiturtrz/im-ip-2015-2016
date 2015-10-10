// CTRL+1 = 42 = the solution for everything
public class ControlFlow {

	public static void main(String[] args) {
		// CTRL+1(code marked)->extract to method = extract to method
		extracted();
		forExample();
	}

	private static void forExample() {
		for(int i=0; i<10; i++)
			System.out.println(i);
	}

	private static void extracted() {
		if(1>2)
			System.out.println("not called");
		else
			System.out.println("called");
	}

}
