import click
import requests
from api.evaluate import Evaluate


class Utils:
	
	def get_metadata(data):
		url = "http://demo8180972.mockable.io/metadata"
		response = requests.post(url=url, data=data)
		response = response.json()
		
		return response["metadata"]
	
	def test_method(self, name):
		metadata = self.get_metadata(name)
		
		metrics = Evaluate().get_evaluation_metrics()
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
	
