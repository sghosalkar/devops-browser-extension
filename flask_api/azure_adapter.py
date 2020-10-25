from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication

from flask_api.constants import personal_access_token, organization_url


def get_project(project_id):
    credentials = BasicAuthentication('', personal_access_token)
    connection = Connection(base_url=organization_url, creds=credentials)

    core_client = connection.clients.get_core_client()
    projects = core_client.get_projects()
    return projects[0]


def get_repository(project_id):
    credentials = BasicAuthentication('', personal_access_token)
    connection = Connection(base_url=organization_url, creds=credentials)

    git_client = connection.clients.get_git_client()
    repos = git_client.get_repositories(project_id)
    return repos


def get_build_definitions(project_id):
    credentials = BasicAuthentication('', personal_access_token)
    connection = Connection(base_url=organization_url, creds=credentials)

    definitions = None
    try:
        build_client = connection.clients.get_build_client()
        definitions = build_client.get_definitions(project_id)
    except Exception as e:
        definitions = "No definitions found for project id: " + project_id + "."
        print(e)
    
    return definitions


def get_pipeline_definition(project_id, pipeline_id):
    credentials = BasicAuthentication('', personal_access_token)
    connection = Connection(base_url=organization_url, creds=credentials)

    definition = None
    try:
        build_client = connection.clients.get_pipelines_client()
        definition = build_client.get_pipeline(project_id, pipeline_id)
    except Exception as e:
        definitions = "No definitions found for project id: " + project_id + ", pipeline id: " + pipeline_id + "."
        print(e)
    
    return definitions