"""
This script is used to add a map to SORA-SVL cloud.
"""
from pathlib import Path
import sys
from zipfile import ZipFile
import json
from uuid import uuid4
from typing import Dict, List
from datetime import datetime


def get_global_map_object(
    cid: str, name: str, description: str, hdmaps: List[str]
) -> Dict:
    return {
        "isShared": False,
        "isFavored": False,
        "isOwned": True,
        "accessInfo": {
            "userAccessType": "favored",
            "owner": {
                "id": "00000000-0000-0000-0000-000000000000",
                "firstName": "Uploaded",
                "lastName": "Content",
            },
        },
        "supportedSimulatorVersions": ["!x-debug-map"],
        "id": cid,
        "name": name,
        "description": description,
        "copyright": "",
        "licenseName": "",
        "ownerId": "00000000-0000-0000-0000-000000000000",
        "accessType": "public",
        "imageUrl": f"/api/v1/assets/download/preview/{cid}",
        "hdmaps": ",".join(x.strip() for x in hdmaps),
        "status": "active",
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "firstName": "Uploaded",
            "lastName": "Content",
        },
        "shareRequests": [],
    }


def get_map_object(cid: str, name: str, description: str, assetGuid: str, hdmaps: List[str], supportedSimulatorVersions=[
    "2021.3",
    "2021.2",
    "2021.2.2",
    "2021.1",
    "2021.1.1",
]) -> Dict:
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")

    return {
        "cid": cid,
        "name": name,
        "endpoint": f"/api/v1/maps/{cid}",
        "data": {
            "assetGuid": assetGuid,
            "isShared": False,
            "isFavored": False,
            "isOwned": True,
            "accessInfo": {
                "userAccessType": "public",
                "owner": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "firstName": "Uploaded",
                    "lastName": "Content",
                },
            },
            # "geoJsonUrl": f"/api/v1/assets/download/geojson/{assetGuid}", # geojson temporarily unavailable
            "supportedSimulatorVersions": supportedSimulatorVersions,
            "id": cid,
            "name": name,
            "description": description,
            "imageUrl": f"/api/v1/assets/download/preview/{assetGuid}",
            "lastVersionDate": current_time,
            "lastAssetGuid": assetGuid,
            "ownerId": "00000000-0000-0000-0000-000000000000",
            "supportedPlatforms": None,
            "version": None,
            "licenseName": "",
            "authorName": None,
            "authorUrl": None,
            "copyright": "",
            "hdmaps": ",".join([x.strip() for x in hdmaps]),
            "status": "active",
            "accessType": "public",
            "createdAt": current_time,
            "updatedAt": current_time,
            "tags": [
            ],
            "owner": {
                "id": "00000000-0000-0000-0000-000000000000",
                "firstName": "Uploaded",
                "lastName": "Content",
            },
        },
    }


def require_confirm(map_id: str, map_name: str, assetGuid: str) -> bool:
    while True:
        user_response = input(
            "Pending map info:\n"
            f"  map_id: {map_id}\n"
            f"  map_name: {map_name}\n"
            f"  assetGuid: {assetGuid}\n"
            "Are you sure to add this map to SORA-SVL cloud? [Y/n]: "
        )
        if user_response == "Y":
            return True
        elif user_response == "n":
            return False
        else:
            print("Please input Y or n.")
            continue


def add_map(svl_asset_path: Path):
    # open asset as zip file
    with ZipFile(svl_asset_path, "r") as zip_file:
        # get manifest.json from zip
        manifest = zip_file.read("manifest.json")
        data = json.loads(manifest)
        print(data)

        assert data["assetType"] == "map", "The asset type is not map."

        map_name = data["assetName"]
        map_description = data["description"]
        assetGuid = data["assetGuid"]
        hdmaps: List[str] = []
        if "attachments" in data and "hdMaps" in data["attachments"]:
            hdmaps = list(data["attachments"]["hdMaps"].keys())

        cid = str(uuid4())
        if require_confirm(cid, map_name, assetGuid):
            # add
            global_obj = get_global_map_object(
                cid, map_name, map_description, hdmaps)
            # assert Path(
            #     "../server/assets"
            # ).exists(), (
            #     "The server's assets path does not exist, please check, exiting now ..."
            # )
            map_obj = get_map_object(
                cid, map_name, map_description, assetGuid, hdmaps)
            print(map_obj)
        else:
            print("Canceled.")


if __name__ == "__main__":
    # assert len(sys.argv) == 2, 'Please input the path of the map.'
    # map_path = Path(sys.argv[1])
    # assert Path(map_path).exists(), 'The map path does not exist.'
    # assert Path(map_path).is_file(), 'The map path is not a file.'
    # add_map(svl_asset_path=Path(map_path))

    add_map(Path("/Users/yuqihuai/Downloads/fce86ba3-a4d3-4a56-9b18-97975168cbc8"))
