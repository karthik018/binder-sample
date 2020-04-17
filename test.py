import click
import requests
from api.evaluate import evaluate
import json


class Utils:
	
	def get_metadata(self, data):
		url = "http://demo7636223.mockable.io/metadata"
		response = requests.post(url=url, data=data)
		response = response.json()
		
		metadata = response["metadata"]
		metadata = json.loads(metadata)
		
		return metadata
	
	def test_method(self, name):
		metadata = self.get_metadata(name)
		cell_content = metadata["pick_cell"]
		metric = metadata["metric"]
		
		# with open("./sample.ipynb", "r") as file:
		#	content = file.read()
		#	content = json.loads(content)
		
		metrics = evaluate.evaluate_zipfile_with_test_code("./sample.ipynb", metric, cell_content)
		open("output.txt", "w").write(metrics)
		
		response = requests.post(url="http://demo7636223.mockable.io/submit", data=metrics)
		response = response.json()
		click.echo("response: "+response["msg"])
		
		
	def get_user_nb(self, name):
		url = "http://demo1984069.mockable.io/latest/notebook"
		response = requests.post(url=url, data=name)
		response = response.json()
		notebook_url = response["notebook_url"]
		
		response = requests.get(url=notebook_url)
		open("./sample.ipynb", 'wb').write(response.content)
		click.echo("Got Notebook Successfully with status: "+str(response.status_code))			
	
