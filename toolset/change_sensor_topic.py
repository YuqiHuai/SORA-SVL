# SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
# SPDX-License-Identifier: BSD-3-Clause
# Modifications Copyright (c) 2025 Xronos Inc.

import pymongo

MONGODB_URI = "mongodb://localhost:28018"

EGO_VEHICLE_ID = "2e966a70-4a19-44b5-a5e7-64e00a7bc5de"

client = pymongo.MongoClient(MONGODB_URI)

db = client["WISE"]

col_vehicles = db["vehicles"]

vehicle_obj = col_vehicles.find_one({"cid": EGO_VEHICLE_ID})

sensors_and_topic = dict()

sensors = vehicle_obj["data"]["sensors"]
for sensor in sensors:
    if "params" in sensor:
        if "Topic" in sensor["params"]:
            sensors_and_topic[sensor["name"]] = sensor["params"]["Topic"]

print("You can change topic for one of the following sensors:")
for sensor in sensors_and_topic:
    print("*", sensor)

sensor_to_change = input("Enter sensor name: ")
if sensor_to_change not in sensors_and_topic:
    print("Invalid sensor name")
    exit(1)

print(f"Current topic is {sensors_and_topic[sensor_to_change]}")
new_topic = input("Enter new topic: ")

confirmation = input(
    f"Are you sure you want to change topic for {sensor_to_change} to {new_topic}? (y/n): "
)

if confirmation.lower() != "y":
    print("Operation cancelled")
    exit(0)

for sensor in vehicle_obj["data"]["sensors"]:
    if sensor["name"] == sensor_to_change:
        sensor["params"]["Topic"] = new_topic

col_vehicles.update_one(
    {"cid": EGO_VEHICLE_ID}, {"$set": {"data.sensors": vehicle_obj["data"]["sensors"]}}
)

print("Topic changed successfully")
