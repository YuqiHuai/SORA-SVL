=============
Dreamview API
=============

.. contents::
    :local:
    :backlinks: top

Overview
========

The Dreamview API is a subpackage of the the SVL Simulator :ref:`Python API <python_api/guide:Python API Guide>` which communicates with Apollo's Dreamview module. Apollo's Dreamview provides a web ui that allows users to enable/disable different modules within Apollo and to set destinations to navigate to. The Dreamview API enables users to automate this procedure with Python scripts. This document provides an overview of the API.

Requirements
============

- Installation of the :ref:`Python API <python_api/guide:Python API Guide>` - requires Python 3.5 or later.
- Apollo 5.0 or later
- ``ApolloControl`` sensor plugin (optional) - This plugin is already included inside the SVL Simulator release build available on GitHub. For custom builds, the sensor plugin should be placed inside the ``AssetBundles/Sensors`` folder of the simulator. The sensor checks to see if Apollo is ready (sending control commands) before starting the simulation.
- ``CheckControl`` sensor plugin (optional) - This plugin is already included inside the SVL Simulator release build available on GitHub. For custom builds, the sensor plugin should be placed inside the ``AssetBundles/Sensors`` folder of the simulator. The sensor checks to see if Apollo is ready (sending control commands) before starting the simulation.

User Guide
==========

Connection
----------

The main class in the Dreamview API is the ``Connection`` class that allows establishing a connection with Dreamview. To instantiate, the constructor may be called as follows:

.. code-block::

    dreamview.Connection(simulator, ego_agent, ip='localhost', port='8888')

where:

- ``simulator`` is an ``lgsvl.Simulator`` object
- ``ego_agentis`` an ``lgsvl.EgoVehicle`` object - this is intended to be used with a vehicle equipped with Apollo 5.0
- ``ip``: address of the machine where the Apollo stack is running (defaults to 'localhost')
- ``port``: the port number for Dreamview (defaults to '8888')

Methods
-------

check_module_status
^^^^^^^^^^^^^^^^^^^
.. code-block::

    check_module_status(self, modules)

Checks if all modules in a provided list are enabled.

disable_apollo 
^^^^^^^^^^^^^^

.. code-block::

    disable_apollo(self)

Disables all Apollo modules.

disable_module 
^^^^^^^^^^^^^^

.. code-block::

    disable_module(self, module)

Disables a specific Apollo module. module is the name of the Apollo 5.0 module as seen in the "Module Controller" tab of Dreamview.

enable_apollo 
^^^^^^^^^^^^^

.. code-block::

    enable_apollo(self, dest_x, dest_z, modules)

Enables a list of modules and then sets the destination.

enable_module 
^^^^^^^^^^^^^

.. code-block::
    
    enable_module(self, module)

Enables a specific Apollo module. module is the name of the Apollo 5.0 module as seen in the "Module Controller" tab of Dreamview.

get_current_map 
^^^^^^^^^^^^^^^

.. code-block::

    get_current_map(self)

Returns the current HD map loaded in Dreamview.

get_current_vehicle
^^^^^^^^^^^^^^^^^^^

.. code-block::

    get_current_vehicle(self)

Returns the current Vehicle configuration loaded in Dreamview.

get_module_status
^^^^^^^^^^^^^^^^^

.. code-block::

    get_module_status(self)

Returns a dict where the key is the name of the module and value is a bool based on the module's current status.

reconnect
^^^^^^^^^

.. code-block::

    reconnect(self)

Closes the websocket connection and re-creates it so that data can be received again.

set_destination
^^^^^^^^^^^^^^^

.. code-block::

    set_destination(self, x_long_east, z_lat_north, y=0, coord_type=CoordType.Unity)

Sends a RoutingRequest to Apollo for the provided coordinates. This function can accept a variety of Coordinate systems.

If using Unity World Coordinate System:

.. code-block::

    x_long_east = x
    z_lat_north = z
    y = y

If using Latitude/Longitude:

.. code-block::

    x_long_east = Longitude
    z_lat_north = Latitude

If using Easting/Northing:

.. code-block::

    x_long_east = Easting
    z_lat_north = Northing

set_hd_map
^^^^^^^^^^

.. code-block::

    set_hd_map(self, map)

Selects the provided HD map. Folders in ``/apollo/modules/map/data/`` are the available HD maps. Map options in Dreamview are the folder names with the following changes:

- underscores (_) are replaced with spaces

- the first letter of each word is capitalized

``map`` parameter is the modified folder name. ``map`` should match one of the options in the right-most drop down in the-right corner of Dreamview.

set_setup_mode
^^^^^^^^^^^^^^

.. code-block::

    set_setup_mode(self, mode)

``mode`` is the name of the Apollo 5.0 mode as seen in the left-most drop down in the-right corner of Dreamview.

set_vehicle
^^^^^^^^^^^

.. code-block::

    set_vehicle(self, vehicle, gps_offset_x=0.0, gps_offset_y=0.0, gps_offset_z=-1.348)

Selects the provided vehicle configuration. Folders in /apollo/modules/calibration/data/ are the available vehicle calibrations. Vehicle options in Dreamview are the folder names with the following changes:

- underscores (_) are replaced with spaces

- the first letter of each word is capitalized

``vehicle`` parameter is the modified folder name. ``vehicle`` should match one of the options in the middle drop down in the-right corner of Dreamview.

setup_apollo
^^^^^^^^^^^^

.. code-block::

    setup_apollo(self, dest_x, dest_z, modules, default_timeout=60.0)

Starts a list of Apollo modules and sets the destination. Will wait for Control module to send a message before returning. Control sending a message indicates that all modules are working and Apollo is ready to continue.

Example
=======

This example will start a simulation that will drive an ego vehicle to a destination using Apollo. The simulation will start once Apollo is ready.

To run this example you will need to have an Apollo vehicle with the ApolloControl sensor added. To add the sensor to the vehicle, add the following to the vehicle configuration JSON file:

.. code-block::

    {
        "type" : "ApolloControlSensor",
        "name" : "Apollo Control Sensor",
        "params": {
            "Topic" :"/apollo/control"
        }
    }

Before running the Python script, start the Apollo docker container and start dreamview and the cyber bridge using the following commands:

.. code-block::

    bootstrap.sh
    bridge.sh

You should not start any modules or interact with dreamview manually. You can view dreamview by navigating to `localhost:8888 <http://localhost:8888>`_ in a web browser.

Now you can start an API only simulation and run the Python script below:

.. code-block::

    import os
    import lgsvl
    from environs import env

    env = Env()

    sim = lgsvl.Simulator(
        env.str("LGSVL__SIMULATOR_HOST", lgsvl.wise.SimulatorSettings.simulator_host),
        env.int("LGSVL__SIMULATOR_PORT", lgsvl.wise.SimulatorSettings.simulator_port)
    )

    if sim.current_scene == lgsvl.wise.DefaultAssets.map_borregasave:
        sim.reset()
    else:
        sim.load(lgsvl.wise.DefaultAssets.map_borregasave)

    spawns = sim.get_spawn()

    state = lgsvl.AgentState()
    state.transform = spawns[0]

    ego = sim.add_agent(lgsvl.wise.DefaultAssets.ego_lincoln2017mkz_apollo5, lgsvl.AgentType.EGO, state)
    ego.connect_bridge(
        env.str("LGSVL__AUTOPILOT_0_HOST", lgsvl.wise.SimulatorSettings.bridge_host),
        env.int("LGSVL__AUTOPILOT_0_PORT", lgsvl.wise.SimulatorSettings.bridge_port)
    )

    # Dreamview setup
    dv = lgsvl.dreamview.Connection(sim, ego, env.str("LGSVL__AUTOPILOT_0_HOST", "127.0.0.1"))
    dv.set_hd_map('Borregas Ave')
    dv.set_vehicle('Lincoln2017MKZ')
    modules = [
        'Localization',
        'Perception',
        'Transform',
        'Routing',
        'Prediction',
        'Planning',
        'Camera',
        'Traffic Light',
        'Control'
    ]
    destination = spawns[0].destinations[0]
    dv.setup_apollo(destination.position.x, destination.position.z, modules)

    sim.run()

Upon successful execution, the Ego vehicle should navigate to a destination on the far side of the map. Note that Apollo setup can take quite a while (often up to 30 seconds) before it is ready for the simulation to be run.