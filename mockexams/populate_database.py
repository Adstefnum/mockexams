import sqlite3
import os

BASE_DIR = "../questions"


for _,folders,_ in os.walk(BASE_DIR):
    for folder in folders:
        SUB_DIR = BASE_DIR + '/' + folder
        subject = folder
        



