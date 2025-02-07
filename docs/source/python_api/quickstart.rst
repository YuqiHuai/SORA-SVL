.. SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
   SPDX-License-Identifier: BSD-3-Clause
   Modifications Copyright (c) 2025 Xronos Inc.

=========================================
Python API Quickstart Guide
=========================================

This document describes the example Python scripts that use the SVL Simulator Python API.
These scripts are located `here <https://github.com/lgsvl/PythonAPI/tree/master/quickstart>`_. 
You can find the documentation on the API :ref:`here <python_api/guide:Python API Guide>`.

- `01-connecting-to-simulator.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/01-connecting-to-simulator.py>`_:
  How to connect to an already running instance of the simulator and some information you can get about the instance
- `02-loading-scene-show-spawns.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/02-loading-scene-show-spawns.py>`_:
  How to load a scene and get the scene's predefined spawn transforms
- `03-raycast.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/03-raycast.py>`_:
  How to create an EGO vehicle and do raycasting from a point
- `04-ego-drive-straight.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/04-ego-drive-straight.py>`_:
  How to create an agent with a velocity and then run the simulator for a set amount of time
- `05-ego-drive-in-circle.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/05-ego-drive-in-circle.py>`_:
  How to apply control to an EGO vehicle and then run the simulator indefinitely
- `06-save-camera-image.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/06-save-camera-image.py>`_:
  How to save a camera image in different formats and with various settings
- `07-save-lidar-point-cloud.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/07-save-lidar-point-cloud.py>`_:
  How to save a LiDAR point cloud
- `08-create-npc.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/08-create-npc.py>`_:
  How to create several types of NPC vehicles and spawn them in different positions
- `09-reset-scene.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/09-reset-scene.py>`_:
  How to empty the scene of all EGOs, NPCs, and Pedestrians, but keep the scene loaded
- `10-npc-follow-the-lane.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/10-npc-follow-the-lane.py>`_:
  How to create NPCs and then let them drive in the nearest annotated lane
- `11-collision-callbacks.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/11-collision-callbacks.py>`_:
  How to setup the simulator so that whenever the 3 created agents collide with anything, the name of the agent and the collision point is printed
- `12-create-npc-on-lane.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/12-create-npc-on-lane.py>`_:
  How to create NPC vehicles in random position in a radius around the EGO vehicle, but the NPCs are placed on the nearest lane to the initial random position
- `13-npc-follow-waypoints.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/13-npc-follow-waypoints.py>`_:
  How to create a list of waypoints with fixed wait times and direct an NPC to follow them
- `14-create-pedestrians.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/14-create-pedestrians.py>`_:
  How to create pedestrians in rows in front of the spawn position
- `15-pedestrian-walk-randomly.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/15-pedestrian-walk-randomly.py>`_:
  How to start and stop a pedestrian walking randomly on the sidewalk
- `16-pedestrian-follow-waypoints.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/16-pedestrian-follow-waypoints.py>`_:
  How to create a list of waypoints and direct a pedestrian to follow them
- `17-many-pedestrians-walking.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/17-many-pedestrians-walking.py>`_:
  How to generate an army of pedestrians and have them walk back and forth
- `18-weather-effects.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/18-weather-effects.py>`_:
  How to get the current weather state of the simulator and how to adjust the various settings
- `19-time-of-day.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/19-time-of-day.py>`_:
  How to get the time of date in the simulator and how to set it to a fixed time and a moving time
- `20-enable-sensors.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/20-enable-sensors.py>`_:
  How to enable a specific sensor so that it can send data over a bridge
- `21-map-coordinates.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/21-map-coordinates.py>`_:
  How to convert from simulator coordinates to GPS coordinates and back. Latitude/Longitude and Northing/Easting are supported along with altitude and orientation
- `22-connecting-bridge.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/22-connecting-bridge.py>`_:
  How to command an EGO vehicle to connect to a bridge at a specific IP address and port and then wait for the connection to be established
- `23-npc-callbacks.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/23-npc-callbacks.py>`_:
  How to setup the simulator so that whenever an NPC reaches a stopline or changes lane, the name of the NPC is printed
- `24-ego-drive-straight-non-realtime.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/24-ego-drive-straight-non-realtime.py>`_:
  How to run the simulator at non-realtime.
- `25-waypoint-flying-npc.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/25-waypoint-flying-npc.py>`_:
  How to use waypoints to define customized motion for NPC.
- `26-npc-trigger-waypoints.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/26-npc-trigger-waypoints.py>`_:
  How to use trigger waypoints that pause npc motion until an ego vehicle approaches.
- `27-control-traffic-lights.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/27-control-traffic-lights.py>`_:
  How to get and set the control policy of a controllable object (e.g., changing a traffic light signal)
- `28-control-traffic-cone.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/28-control-traffic-cone.py>`_:
  How to add and move a controllable object (e.g. a traffic cone)
- `29-add-random-agents.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/29-add-random-agents.py>`_:
  How to use random NPCs and pedestrians in a simulation
- `30-time-to-collision-trigger.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/30-time-to-collision-trigger.py>`_:
  How to use time-to-collision triggers
- `31-wait-for-distance-trigger.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/31-wait-for-distance-trigger.py>`_:
  How to use wait-for-distance triggers
- `32-pedestrian-time-to-collision.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/32-pedestrian-time-to-collision.py>`_:
  How to use time-to-collision on pedestrians
- `33-ego-drive-stepped.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/33-ego-drive-stepped.py>`_:
  How to run a stepped simulation using the Python Api
- `34-simulator-cam-set.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/34-simulator-cam-set.py>`_:
  How to set up fixed camera positions in a simulation
- `35-spawn-multi-robots.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/35-spawn-multi-robots.py>`_:
  How to spawn multiple robots and connect to a bridge
- `36-send-destination-to-nav2.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/36-send-destination-to-nav2.py>`_:
  How to send destinations of a robot to Navigation2 stack over a bridge
- `98-npc-behaviour.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/98-npc-behaviour.py>`_:
  How to get and set available NPC behaviors
- `99-utils-examples.py <https://github.com/lgsvl/PythonAPI/blob/master/quickstart/99-utils-examples.py>`_:
  How to use several of the utility scripts to transform an arbitrary point to the coordinate system of a local transform (relative to sensor)