import click
import requests


def test_method(name):
	response = requests.get(url="http://demo7636223.mockable.io/submit")
	response = response.json()
	click.echo("response: "+response["msg"])
	click.echo("Hello "+name)
