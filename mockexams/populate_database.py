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
        subject_ = folder
        for _,_,files in os.walk(SUB_DIR):
            for file in files:
                with open(SUB_DIR + '/' + file,'r') as f:
                   data = json.loads(f.read())

                   question = data[0]['question']
                   option_A = data[0]['option']['a']
                   option_B = data[0]['option']['b']
                   option_C = data[0]['option']['c']
                   option_D = data[0]['option']['d']
                   option_E = data[0]['option']['e']
                   correct_ans = data[0]['answer']
                   explain = data[0]['solution']
                   subject = subject_
                   year = data[0]['examyear']
                   acom_type = data[0]['image']
                   exam_type = data[0]['examtype']
                   accompany = data[0]['image']
                   

        



