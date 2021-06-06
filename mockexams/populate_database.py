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


conn = sqlite3.connect('./db.sqlite3')
c = conn.cursor()

'''write a stament to chcek if there is an accompany if so put it first in their
 table then link its questions to it while adding these same questions to their
 table'''

sql = """

    INSERT INTO mockexamsapp_question ( 

    question, option_A, option_B, option_C, option_D , option_E ,
    correct_ans , explain , subject, year, acom_type , exam_type , accompany_id 

    ) 

    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"""



    

def _valid(field):
  
  return field if not KeyError and field else None


for _, folders, _ in os.walk(BASE_DIR):
    for folder in folders:
        SUB_DIR = BASE_DIR + '/' + folder
        subject_ = folder
        for _, _, files in os.walk(SUB_DIR):
            for file in files:
                with open(SUB_DIR + '/' + file, 'r') as f:
                   data = json.loads(f.read())

                   for i in range(len(data)-1):
                     question = data[i]['question']
                     option_A = data[i]['option']['a']
                     option_B = data[i]['option']['b']
                     option_C = data[i]['option']['c']
                     option_D = data[i]['option']['d']
                     option_E = None#_valid(data[i]['option']['e']) make it check if e is a valid key
                     #should above be used on all, yes but i think for question with null values in non-
                     #nullable fields we should scrap them completely if the field is too crucial e.g the 
                     #question itself. Divide fields into nullable, non-nullable, and crucial
                     correct_ans = data[i]['answer']
                     explain = data[i]['solution']
                     subject = subject_
                     year = data[i]['examyear']
                     acom_type = None #data[i]['image'] determine if image or passage
                     exam_type = data[i]['examtype']
                     accompany_id = None#data[i]['image'] or passage

                     values = [
     question , option_A , option_B , option_C , option_D , option_E , 
    correct_ans , explain , subject, year, acom_type, exam_type, accompany_id

    ]

                     c.execute(sql,values)

conn.commit()
conn.close()
                   

      