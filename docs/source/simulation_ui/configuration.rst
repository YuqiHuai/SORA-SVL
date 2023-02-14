==============================================
Configuration File and Command Line Parameters
==============================================

Configuration File
==================

The Simulator configuration file ``config.yml`` includes parameters shared between different users and allows administrators to setup deployment specific settings. The list of supported configuration parameters is below:


.. list-table::
   :header-rows: 1

   * - Parameter Name
     - Type
     - Default Value
     - Description
   * - ``api_hostname``
     - ``string``
     - ``localhost``
     - The IP address of the network interface (or the hostname assigned to it) on which Simulator should listen for Python API commands. Specify ``"*"`` to listen on all network interfaces. 
   * - ``api_port``
     - ``integer``
     - ``8181``
     - Port number used by Python API to connect.
   * - ``cloud_url``
     - ``string``
     - ``https://wise.svlsimulator.com``
     - Address of the web user interface.
   * - ``cloud_proxy``
     - ``string``
     - ``-``
     - URL pointing to HTTP proxy server for connecting to the web user interface.
   * - ``data_path``
     - ``string``
     - OS dependent set by Unity
     - Local database path
   * - ``headless``
     - ``bool``
     - ``false``
     - Whether or not simulator should work in headless mode only.
   * - ``read_only``
     - ``bool``
     - ``false``
     - Whether or not the user is allowed to change anything in the database. This mode is used to run Simulator in public demo mode.

To use a custom ``config.yml`` file, include it in the same folder as ``Simulator.exe`` or modify the one in the root directory of the cloned project. The file is expected to be in YAML format.

Command Line Parameters
=======================

Simulator accepts command line parameters during start up. These command line parameters override the values from the configuration file. The list of supported command line parameters is below:

.. list-table::
   :header-rows: 1

   * - Parameter Name
     - Type
     - Default Value
     - Description
   * - ``--apihost``
     - ``string``
     - ``localhost``
     - The IP address of the network interface (or the hostname assigned to it) on which Simulator should listen for Python API commands. Specify ``"*"`` to listen on all network interfaces. 
   * - ``--apiport``
     - ``integer``
     - ``8181``
     - Port number used by Python API to connect.
   * - ``--cloudurl``
     - ``string``
     - ``https://wise.svlsimulator.com``
     - Address of the web user interface.
   * - ``--data`` or ``-d``
     - ``string``
     - OS dependent set by Unity
     - Local database path
   * - ``--retryForever``
     - (none)
     - ``-``
     - If present, Simulator attempts to connect to the web user interface indefinitely.
   * - ``--simid``
     - ``string``
     - auto gen
     - To overwrite simid in database or set on first start.