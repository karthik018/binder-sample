def test_method(name):
	return "Hello" + name
	
if __name__ == '__main__':
	import sys
	name = sys.argv[1]
	return test_method(name)
