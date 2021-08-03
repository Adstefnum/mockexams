# get specific user
http://127.0.0.1:8000/users/8220c4d7-aee5-4044-bc35-d91e5a373924/

# logout all users
http://127.0.0.1:8000/users/logoutall/v1/

# register new user
http://127.0.0.1:8000/users/register/v1/

``` JSON
{
    "password": "chuchu",
    "email": "chacha@gmail.com",
    "user_name": "ola",
    "first_name": "bab",
    "last_name": "sis",
    "phone_num": "2349090909090",
    "is_staff": false,
    "is_superuser": false,
    "is_active": true,
    "last_login": null,
    "current_jamb_score": 276,
    "groups": [],
    "user_permissions": []
}
```


# login registered user
http://127.0.0.1:8000/users/login/v1/
```JSON
{
    "password": "chuchu",
 "username": "ola",
    "groups": [],
    "user_permissions": []
}

```

# logout specific user
http://127.0.0.1:8000/users/logout/v1/

# get question(s) by the various filters appended
http://127.0.0.1:8000/questions/v1/?sub=englishyear=2008&rand=True&exam=utme&num=20

# reset password

# update email

# update phone number