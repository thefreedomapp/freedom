from sys import argv
from importlib import import_module

import_module(argv[1].replace('.py', '')).__init__(argv[1:])
