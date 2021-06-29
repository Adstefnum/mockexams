import karax / [karax, karaxdsl, vdom], datatype, global

const testsubjects = [
    (name : "English"),
    (name : "Chemistry"),
    (name : "Physics"),
    (name : "Biology")
]

proc sidebar() : VNode =
    result = buildHtml(span(id = "sidebar")):
        tdiv(class = "cancelcontainer"):
            tdiv(id = "cancel")

        tdiv(id = "userinfo"):
            img(src = "mockexamsapp/static/imgs/avatar.png")

            span(id = "examinfo"):
                p:
                    text "Exam : UTME"
                p:
                    text "Time : 120:00"
                p:
                    text "C-NERD"

            span:
                for each in testsubjects:
                    button(`type` = "button", class = "btn"):
                        text each.name

proc cbt() : VNode = 
    proc question(question : Question, number : int) : VNode {.closure.} =
        result = buildHtml(tdiv(class = "question")):
            section:
                p:
                    text $number

                p:
                    text question.instructions

            section:
                text question.question

            if question.image != "":
                section:
                    img(src = question.image)

            section:
                ul:
                    tdiv:
                        p:
                            text "a."
                        input(`type` = "radio", name = $number & question.options.a, value = question.options.a)

                    tdiv:
                        p:
                            text "b."
                        input(`type` = "radio", name = $number & question.options.b, value = question.options.b)

                    tdiv:
                        p:
                            text "c."
                        input(`type` = "radio", name = $number & question.options.c, value = question.options.c)

                    tdiv:
                        p:
                            text "d."
                        input(`type` = "radio", name = $number & question.options.d, value = question.options.d)

            section:
                button(`type` = "button", class = "btn"):
                    text "Previous"
                
                button(`type` = "button", class = "btn"):
                    text "Next"

    result = buildHtml(main(id = "background")):
        #burger()
        sidebar()
        tdiv(id = "mainarea"):
            #question()
            section(id = "panel"):
                for each in 0..40:
                    button(`type` = "button", class = "smallbtn"):
                        text $each

when isMainModule:
    setRenderer(cbt, "app")