# Get arguments
from sys import argv
# This is how we import the file
from importlib import import_module

# Import the file, run it with the provided arguments
import_module(argv[1].replace('.py', '')).__init__(argv[2:])
