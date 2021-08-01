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