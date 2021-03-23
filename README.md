# mockexams
A website to practice cbt examination

# plans

# Getting the database
The database has been created and will soon be populated but it will not be uploaded to github rather i will include the populate_database.py file so you can run that file and populate the database on your local machine. Make sure not to upload the sqlite databse. It might be later changed to postgresql.

### scraping past questions

- The question dirrectory contains past questions to be used for testing the backend.
- The scrape.py script scrapes a particular site for past questions from 2001 to a specified year above 2001.
- The site scrape.py scrapes does not have past questions from about 2013 downwards so i will write another script to scrape past questions from some pdfs with me.
- To use the scrape tool type ```python3 scrape.py the subjects you want to scrape```
- Note you can scrape more than 1 subject at a time.

### structure of the backend

- You are free to use any database of your choice for the backend
- The database should store questions such that it is easy to retrieve questions for a particular subject in a particular year
- The database should be structured such that it is easy to pick any amount of random questions from multiple years in a particular subject

*Lets start work on the questions first, when we are done we move to users*