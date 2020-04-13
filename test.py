import click
import requests


class Utils:

	def test_method(name):
		response = requests.get(url="http://demo7636223.mockable.io/submit")
		response = response.json()
		click.echo("response: "+response["msg"])
		
		
	def get_user_nb(name):
		response = requests.get(url="https://ib-mattermost.s3.ap-south-1.amazonaws.com/notebooks/MyJupyter.ipynb")
		open("../default/sample.ipynb", 'wb').write(response.content)
		click.echo("response: "+str(response.status_code))
	
