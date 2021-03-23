import sqlite3
import os
import json

##I think I can use python3 manage.py shell to save all the questions
##but I should save accompanies first
##first read the json files and save them to variables
##note questions that have a common accompany
##group those questions together and save the accompany first
##Then save questions using the accompany_id of the accompany as the foreign key
##Then save those questions
##Save normally for other questions


BASE_DIR = "../questions"


for _,folders,_ in os.walk(BASE_DIR):
    for folder in folders:
        SUB_DIR = BASE_DIR + '/' + folder
        subject = folder
        for _,_,files in os.walk(SUB_DIR):
            for file in files:
                with open(SUB_DIR + '/' + file,'r') as f:
                   data = json.loads(f.read())
                   print(data[0])
                   '''

                   print(data[0]['option']['a'])
                   print(data[0]['option']['b'])
                   print(data[0]['option']['c'])
                   print(data[0]['option']['d'])
                   print(data[0]['image'])
                   print(data[0]['answer'])
                   print(data[0]['solution'])
                   print(data[0]['examtype'])
                   print(data[0]['examyear'])
'''
        



