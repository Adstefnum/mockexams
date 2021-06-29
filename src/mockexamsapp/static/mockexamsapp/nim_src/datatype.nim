type

    Exam* = object
        name*, description*, image*, url * : string

    Subject* = object
        name*, id*: string

    Session* = object
        start*, to*: int

    ConfigExam* = object
        exam*: Exam
        time* : string
        multipleexams*: bool
        subjectnum*: int
        subjects*: seq[Subject]
        sessions*: seq[Session]

    Note* = object
        note*, page* : string

    Option* = object
        a*, b*, c*, d* : string

    Question* = object
        question*, instructions*, image*, answer* : string
        options* : Option