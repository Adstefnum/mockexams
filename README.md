# mockexams
A website to practice cbt examination

## Urgent
- How do we link questions and their accompaniment with the populate_databade.py script?
- Finish populate_database.py script
- Publish a first release frontend

## Timeline
- Publish a demo


## Positons

- Backend Engineer
- Frontend Engineer
- Question gathering team
- Question verification Team

## Features
- User Analyices dashboard
- Admin page(Default django or custom?)
- Quiz page
- No lagging between questions, just show next question staight, no lazy loadings


## Database

### Getting the database
The database has been created and will soon be populated but it will not be uploaded to github rather a ```populate_database.py``` file included in the github will populate the database on your local machine. Make sure not to upload the sqlite databse. It will be later changed to postgresql.

### Database schema

#### Questions 
- question 
- option_A 
- option_B 
- option_C 
- option_D 
- option_E -> can be null
- correct_ans 
- explain 
- subject
- year
- acom_type -> can be null
- exam_type 
- accompany -> can be null

#### Accompaniment
- acom_type 
- subject
- passage
- diagram

### Querying the database
- As discussed, we will have a specific question format
	- 40 english questions
		- 2 passage questions
		- other normal
	- 20 per remaining subjects
		- Some with accompaniments

- We will need to pick questions:
	- with passages
	- with diagrams etc.

- all we need to do is know the number of accompanimet questions we want and then we pick those and we then choose the rest as normal questions. Take the example below.
	- Example 1
		- we need 100 questions -> English = 40, 20 per rem subjects.
		- We need 2 passage questions each with 5 questions. We just go to the accompaniment table and pick two passages and five questions from its questions linked to it in the questions table. And then we pick normal questions from the questions table.
		- We need 2 accompaniment question each having 2 questions each per subject
		- We go to the accompaniment table and pick accompaniments by subject and pick 2 questions from the questions linked to it and pick normal questions from the normal question pool for each subject.

	- If we wanted to pick all the questions linked to an accompaniment, we do that in the same way we have been doing then we calculate how many questions we have left for the subject and pick those from the normal question pool.

## Scraping Questions

- The question dirrectory contains past questions to be used for testing the backend.
- The scrape.py script scrapes a particular site for past questions from 2001 to a specified year above 2001.
- The site scrape.py scrapes does not have past questions from about 2013 downwards so i will write another script to scrape past questions from some pdfs with me.
- To use the scrape tool type ```python3 scrape.py the subjects you want to scrape```
- Note you can scrape more than 1 subject at a time.

## Structure of the backend

- We are using sqlite for testing and will soon move to postgres.
- The database should store questions such that it is easy to retrieve questions for a particular subject in a particular year
- The database should be structured such that it is easy to pick any amount of random questions from multiple years in a particular subject

## Future plans
- Sponsored Ads to make money