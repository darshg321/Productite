import os

for filename in os.listdir('assets/images/taskicons'):
    print(f"{filename.removesuffix('.png')}: require('@/assets/images/taskicons/{filename}'),")
