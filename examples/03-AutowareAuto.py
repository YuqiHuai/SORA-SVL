import os
import lgsvl
from environs import Env
import time

env = Env()

simulator_address = env.str("LGSVL__SIMULATOR_HOST", lgsvl.wise.SimulatorSettings.simulator_host)
simulator_port = env.int("LGSVL__SIMULATOR_PORT", lgsvl.wise.SimulatorSettings.simulator_port)
bridge_address = env.str("LGSVL__AUTOPILOT_0_HOST", lgsvl.wise.SimulatorSettings.bridge_host)
bridge_port = env.int("LGSVL__AUTOPILOT_0_PORT", lgsvl.wise.SimulatorSettings.bridge_port)

print("python api address ", simulator_address)
print("python api port ", simulator_port)
print("bridge address ", bridge_address)
print("bridge port ", bridge_port)

sim = lgsvl.Simulator(simulator_address, simulator_port)

if sim.current_scene == lgsvl.wise.DefaultAssets.map_borregasave:
    sim.reset()
else:
    sim.load(lgsvl.wise.DefaultAssets.map_borregasave)

spawns = sim.get_spawn()

state = lgsvl.AgentState()
state.transform = spawns[0]

vehicle_id = '5ab8175f-e1f1-427c-a86e-e882fa842977' #Lexus2016RXHybrid
ego = sim.add_agent(vehicle_id, lgsvl.AgentType.EGO, state)
ego.connect_bridge(bridge_address, bridge_port)

# for more details check https://www.svlsimulator.com/docs/system-under-test/autoware-auto-instructions/#install-ros2-lgsvl-bridge
while not ego.bridge_connected:
    print("Connecting to R02 bridge")
    time.sleep(1)
print("Connected to ROS2 brige ", bridge_address, " ", bridge_port)

sim.add_random_agents(lgsvl.AgentType.NPC)
sim.add_random_agents(lgsvl.AgentType.PEDESTRIAN)

sim.run()
