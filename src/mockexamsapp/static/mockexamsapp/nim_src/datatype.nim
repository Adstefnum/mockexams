type

    Session* = object
        `from`*, to*: int
        random* : bool

    Option* = object
        a*, b*, c*, d* : string
        answer* : char

    Question* = object
        instruction*, question* : string
        images* : seq[string]
        options* : Option

    Subject* = object
        name*, id*: string
        session* : Session
        questions* : seq[Question]

    User = object
        name*, image*, id* : string

    BackendUser* = object
        user_name*, email*, password*, phone_num*, last_name*, first_name* : string
        groups*, permissions* : seq[string]
        current_jamb_score* : int

    Exam* = object
        name*, description*, image* : string
        time* : int
        user* : User
        subjects* : seq[Subject]

    ConfigExam* = object
        exam*: Exam
        time* : string
        multipleexams*: bool
        subjectnum*: int
        subjects*: seq[Subject]
        sessions*: seq[Session]