import click
import requests


class Utils:

	def test_method(self, name):
		cell_num = 1
		with open("./sample.ipynb", "r") as file:
			content = file.read()
			import json
			content = json.loads(content)
			print(content)
			code_list = content['cells'][cell_num]['source']
			code = ''.join([line for line in code_list])
			from io import StringIO
			import sys
			codeOut = StringIO()
			codeErr = StringIO()
			sys.stdout = codeOut
			sys.stderr = codeErr
			exec(code)
			n_numbers(200)
			sys.stdout = sys.__stdout__
			sys.stderr = sys.__stderr__
			s = codeOut.getvalue()
			output = list(s.split('\n'))
			text = [each + '\n' for each in output]
			outputs = [
				{
					"name": "stdout",
					"output_type": "stream",
					"text": text
				}
			]
			content["cells"][cell_num]["outputs"] = outputs
			json.dump(content, file, ensure_ascii=False, indent=1)
			file.close()
			
		response = requests.get(url="http://demo7636223.mockable.io/submit")
		response = response.json()
		click.echo("response: "+response["msg"])
		
		
	def get_user_nb(self, name):
		response = requests.get(url="https://ib-mattermost.s3.ap-south-1.amazonaws.com/notebooks/MyJupyter.ipynb")
		open("./sample.ipynb", 'wb').write(response.content)
		click.echo("Got Notebook Successfully with status: "+str(response.status_code))			
	
