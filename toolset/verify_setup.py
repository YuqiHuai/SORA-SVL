"""
This script is intended to verify if you have correctly setted up the
project, by checking the directory structure and expected number of
assets in each directory
"""

from pathlib import Path
import re
import subprocess

CURRENT_FILE_PATH = Path(__file__)
PROJECT_ROOT_PATH = CURRENT_FILE_PATH.parent.parent
SERVER_ASSETS_PATH = Path(PROJECT_ROOT_PATH, 'server', 'assets')

# asset name regex pattern
ASSET_NAME_PATTERN = r'^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$'

EXPECTED_MAP_SIZE = 94  # number of map assets provided by default
EXPECTED_PLUGIN_SIZE = 59  # number of plugin assets provided by default
EXPECTED_VEHICLE_SIZE = 31  # number of vehicle assets provided by default


def check_dot_env():
    server_dot_env = Path(PROJECT_ROOT_PATH, 'server', '.env')
    client_dot_env = Path(PROJECT_ROOT_PATH, 'client', '.env')

    assert server_dot_env.exists(), 'Did you create .env file for the server?'
    assert client_dot_env.exists(), 'Did you create .env file for the client?'


def check_directory_structure():
    """
    Checks if the directory structure for server/assets is correct.
    """
    if SERVER_ASSETS_PATH.exists():
        expected_directories = ['maps', 'plugins',
                                'vehicles', 'hdmaps', 'preview']
        actual_directories = list()
        for path in SERVER_ASSETS_PATH.iterdir():
            if path.is_dir():
                actual_directories.append(path.name)

        for ed in expected_directories:
            if ed not in actual_directories:
                raise Exception(f'server/assets/{ed} not found')
    else:
        raise Exception('server/assets not found!')


def check_asset_size(asset_dir_name: str, expected_asset_size: int):
    """
    Checks if the correct number of assets is in each directory.
    """
    assets_dir = Path(SERVER_ASSETS_PATH, asset_dir_name)
    actual_assets = list()
    for f in assets_dir.iterdir():
        if f.is_file() and re.match(ASSET_NAME_PATTERN, f.name) is not None:
            actual_assets.append(f.name)

    if len(actual_assets) == 0:
        raise Exception(
            f'no asset found in server/assets/{asset_dir_name}. check if the file names are correct (e.g., is there extra extension?)')
    if len(actual_assets) < expected_asset_size:
        print(f'[Warning]: Found {len(actual_assets)} assets under server/assets/' +
              f'{asset_dir_name}, which differs from provided ({expected_asset_size}).')


def check_maps():
    check_asset_size('maps', EXPECTED_MAP_SIZE)


def check_plugins():
    check_asset_size('plugins', EXPECTED_PLUGIN_SIZE)


def check_vehicles():
    check_asset_size('vehicles', EXPECTED_VEHICLE_SIZE)


def check_container_status():
    docker_filter = "--filter \"status=running\""
    docker_format = "--format '{{.Names}}'"
    running_containers = subprocess.run(
        f"docker ps {docker_filter} {docker_format}", shell=True, capture_output=True)
    container_names = running_containers.stdout.decode().strip().split('\n')
    expected_container_names = [
        'sorasvl-' + x for x in ['router', 'client', 'server', 'mongo']]
    for ecn in expected_container_names:
        if ecn not in container_names:
            raise Exception(f'Container {ecn} not running')


def check_docker_asset_size(asset_dir_name: str):
    docker_cmd = f'docker exec sorasvl-server ls assets/{asset_dir_name}'

    expected_files = list()
    for f in Path(SERVER_ASSETS_PATH, asset_dir_name).iterdir():
        if f.is_file():
            expected_files.append(f.name)

    actual_files = subprocess.run(
        docker_cmd, shell=True, capture_output=True).stdout.decode().strip().split('\n')

    if len(actual_files) == 0:
        raise Exception(
            f'server container cannot access files under server/assets{asset_dir_name}')
    if len(actual_files) != len(actual_files):
        print(
            f'[Warning]: container found {len(actual_files)} assets under ' +
            f'server/assets/{asset_dir_name}, but should be {len(actual_files)}.')


def check_maps_docker():
    check_docker_asset_size('maps')


def check_plugins_docker():
    check_docker_asset_size('plugins')


def check_vehicles_docker():
    check_docker_asset_size('vehicles')


if __name__ == '__main__':
    check_dot_env()
    check_directory_structure()
    check_maps()
    check_plugins()
    check_vehicles()
    check_container_status()
    check_maps_docker()

    print('[Success]: Everything looks good')
