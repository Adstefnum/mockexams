import karax / [karax, karaxdsl, vdom, kdom], datatype
from strutils import format

proc fluke(e : Event, n : VNode) =
    discard

proc cancel*(action : proc(e : Event, n : VNode) = fluke) : VNode =
    result = buildHtml(tdiv(id = "cancel", onclick = action)):
        tdiv(id = "cancelline1")
        tdiv(id = "cancelline2")

proc burger*(action : proc(e : Event, n : VNode) = fluke): VNode =
    result = buildHtml(tdiv(id = "burger", onclick = action)):
        tdiv(id = "upperburger"):
            tdiv(class = "line")
            tdiv(class = "line")

        tdiv(id = "lowerburger"):
            tdiv(class = "line")
            tdiv(class = "line")

proc navbar*(): VNode =
    result = buildHtml(nav(class = "navbar")):
        a(href = "/"):
            span(id = "logo")

        #[span(id = "authenticate"):
            button(`type` = "button", class = "menubtn"):
                text "Login"

            button(`type` = "button", class = "menubtn"):
                text "Register"]#
            #burger()

proc exam*(exam: Exam, action: proc(ev: Event, n: VNode)): VNode =
    result = buildHtml(tdiv(class = "exams", onclick = action)):
        img(alt = "examimage", src = exam.image)

        span:
            h4:
                text exam.name
            p:
                text exam.description

proc footbar*(): VNode =
    proc column(data: tuple[name: string, content: seq[tuple[name,
            url: string]]]): VNode {.closure.} =
        result = buildHtml(ol(class = "footcolumn")):
            h4:
                text data.name

            for each in data.content:
                a(href = each.url):
                    text each.name

    result = buildHtml(footer(id = "footbar")):
        column(("Legal", @[
            ("Terms and Conditions", "/terms"),
            ("Privacy policy", "/policy")
            ]))

        column(("Site", @[
            ("Developers", "/devs"),
            ("FAQ", "/faq")
            ]))

proc footbar2*(): VNode =
    result = buildHtml(footer(id = "footbar2")):
        text "Copyright © 2021 Mockexams.com All Rights Reserved"

proc menu*(): VNode =
    proc testevent(ev: Event, n: VNode) {.closure.} =
        discard

    proc menubtn(data: tuple[name, image: string, event: proc(ev: Event,
            n: VNode)]): VNode {.closure.} =
        result = buildHtml(tdiv(class = "menubtn", onclick = data.event)):
            tdiv(class = "menuicon", id = data.image)
            p:
                text data.name

    result = buildHtml(span(id = "menu")):
        menubtn(("Home", "homeicon", testevent))
        menubtn(("Login", "loginicon", testevent))
        menubtn(("Register", "registericon", testevent))

proc auth*(cancelproc: proc(ev: Event, n: VNode)): VNode =
    proc login(): VNode {.closure.} =
        result = buildHtml(tdiv(id = "authmode")):
            tdiv(class = "authcapsule"):
                label:
                    text "Username"
                input(`type` = "text", placeholder = "username")

            tdiv(class = "authcapsule"):
                label:
                    text "Password"
                input(`type` = "password", placeholder = "password")

            button(`type` = "button"):
                text "Login"

    proc register(): VNode {.closure.} =
        result = buildHtml(tdiv(id = "authmode")):
            tdiv(class = "authcapsule"):
                label:
                    text "Username"
                input(`type` = "text", placeholder = "username")

            tdiv(class = "imgcapsule"):
                label(id = "whatsapp", class = "formimg")
                input(`type` = "tel", placeholder = "whatsapp number")

            tdiv(class = "authcapsule"):
                label:
                    text "Email"
                input(`type` = "email", placeholder = "email")

            tdiv(class = "authcapsule"):
                label:
                    text "Password"
                input(`type` = "password", placeholder = "password")

            tdiv(class = "authcapsule"):
                label:
                    text "Retype Password"
                input(`type` = "password", placeholder = "retype password")

            button(`type` = "button"):
                text "Register"

    proc showLogin(ev: Event, n: VNode) {.closure.} =
        let
            canvas = document.getElementById("auth")
            previtem = document.getElementById("authmode")

        canvas.replaceChild(login().vnodeToDom(), previtem)

    proc showRegister(ev: Event, n: VNode) {.closure.} =
        let
            canvas = document.getElementById("auth")
            previtem = document.getElementById("authmode")

        canvas.replaceChild(register().vnodeToDom(), previtem)

    result = buildHtml(span(id = "auth")):
        tdiv(class = "cancelcontainer"):
            cancel(cancelproc)
        tdiv(id = "authswap"):
            span(class = "authbtns", onclick = showLogin):
                text "Login"

            span(class = "authbtns", onclick = showRegister):
                text "Register"

        #login()
        register()

proc configexam*(exam: ConfigExam, cancelproc: proc(ev: Event,
        n: VNode)): VNode =
    result = buildHtml(span(id = "auth")):
        tdiv(class = "cancelcontainer"):
            cancel(cancelproc)

        tdiv(id = "configexam"):
            span(id = "examstab"):
                img(src = exam.exam.image)
                h3:
                    text exam.exam.name

                p:
                    text "Time : " & exam.time
                p:
                    text exam.exam.description

                button(`type` = "button", class = "btn"):
                    text "Start Exam"

            if exam.multipleexams:
                span(id = "subjectstab"):

                    tdiv(class = "selectcontainer"):
                        label:
                            text "Subjects"

                        for each in 1..exam.subjectnum:
                            select(class = "spinner", id = "subject" & $each):
                                for each2 in exam.subjects:
                                    option:
                                        text each2.name

                    tdiv(class = "selectcontainer"):
                        label:
                            text "Session"

                        select(class = "spinner", id = "session"):
                            for index in countdown((exam.sessions.len - 1), 0):
                                option:
                                    text "$1/$2".format([
                                        exam.sessions[index].`from`,
                                        exam.sessions[index].to
                                    ])
