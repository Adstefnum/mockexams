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
