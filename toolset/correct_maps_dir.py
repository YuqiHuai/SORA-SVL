"""
This script is intended to correct problems caused by Google Drive adding
unnecessary extension to assets in server/assets/maps

See Issue #33 for mode details.
"""

import shutil
from pathlib import Path

CURRENT_FILE_PATH = Path(__file__)
PROJECT_ROOT_PATH = CURRENT_FILE_PATH.parent.parent
MAPS_DIR = Path(PROJECT_ROOT_PATH, 'server', 'assets', 'maps')


def remove_zip_extension():
    counter = 0
    for f in MAPS_DIR.iterdir():
        if f.is_file() and f.name.endswith(".zip"):
            correct_filename = Path(f).with_suffix("")
            shutil.move(
                f.absolute(),
                correct_filename.absolute()
            )
            counter += 1

    if counter == 0:
        print('Nothing changed.')
    else:
        print(f'Corrected {counter} file{"s" if counter > 1 else ""}.')


if __name__ == '__main__':
    remove_zip_extension()
