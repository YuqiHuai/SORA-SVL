# resolves issue #33

import lgsvl
from environs import Env

print('SORA SVL Quickstart #1: Loading a map')
env = Env()

# connect to simulator

sim = lgsvl.Simulator(
    env.str("LGSVL__SIMULATOR_HOST", lgsvl.wise.SimulatorSettings.simulator_host),
    env.int("LGSVL__SIMULATOR_PORT", lgsvl.wise.SimulatorSettings.simulator_port)
)

print('Version = ', sim.version)
print('Current Time = ', sim.current_time)
print('Current Frame = ', sim.current_frame)

# load scene and show spawns

sim.load('e6dc21da-0105-4534-a30d-c1939a8a4ff6') # WideFlatMap

print(f'Current Scene = {sim.current_scene}')
print(f'Current Scene ID = {sim.current_scene_id}')

spawns = sim.get_spawn()
for spawn in sim.get_spawn():
    print(spawn)