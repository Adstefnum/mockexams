# Note
- run ./manage.py drf_create_token on cmd username to get your token
    - We will use the django admin for this in production
    - We have to either make the tokens never expire and think of how to hide this tokens in the source code or change it in the source code. Option 1 seems better.
- Use it for authentication as shown below for all apis.
- G is for get and P for post.
- We will have just one auth token since we are using a single source code but maybe one for each api endpoint.
- We can use the auth tokens to sell the api data

```Javascript

//use fetch or ajax or axios or anything
fetch('URL_GOES_HERE', { 
   method: 'post', 
   headers: new Headers({
     'Authorization': 'Token generated_token', 
     'Content-Type': 'application/json'
   }), 
   body: 'A=1&B=2'//params are optional so the whole body is too
 });
```

# get specific user[G]
http://127.0.0.1:8000/users/v1/8220c4d7-aee5-4044-bc35-d91e5a373924/

# logout all users[G]
http://127.0.0.1:8000/v1/users/logoutall/

# register new user[P]
http://127.0.0.1:8000/users/v1/register/

``` JSON

body:{
    "user_name": "",
    "email": "",
    "password": "",
    "current_jamb_score": 0,
    "phone_num": "",
    "last_name": "",
    "first_name": ""
}
```


# login registered user[P]
http://127.0.0.1:8000/users/v1/login/
```JSON
{
    "password": "chuchu",
    "username": "ola",
    "groups": [],
    "user_permissions": []
}

```

# logout specific user[P]
http://127.0.0.1:8000/users/logout/v1/

# get question(s) by the various filters appended[G]
http://127.0.0.1:8000/questions/v1/?sub=english&year=2008&rand=True&exam=utme&num=20
- use this like this or make the params into a body

# reset password[P]

# update email[P]

# update phone number[P]