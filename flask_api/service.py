from flask import Flask

from flask_api.azure_adapter import get_build_definitions, get_pipeline_definition

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/project/<project_id>/build')
def get_builds(project_id):
    return get_build_definitions(project_id)
    

@app.route('/project/<project_id>/pipeline/<pipeline_id>')
def get_pipeline(project_id, pipeline_id):
    return get_pipeline_definition(project_id, pipeline_id)

