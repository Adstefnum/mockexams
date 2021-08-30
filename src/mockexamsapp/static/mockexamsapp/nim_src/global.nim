import karax / [karax, karaxdsl, vdom, kdom, kajax], datatype, asyncjs, json
from strutils import format, split, strip

proc fluke*(e : Event, n : VNode) {.deprecated.} =
    discard

proc readCookies*(keyword : string) : string =
    let cookies = $document.cookie

    for cookie in cookies.split(";"):
        let splitcookie = cookie.strip.split("=")

        if splitcookie[0] == keyword:
            return splitcookie[1]

proc toCstr*[T](item: T): cstring =
    let item: cstring = $item
    return item

proc parseMarkdown*(markdownText : cstring) : cstring {.importc.}

proc callBackend*[T](url: string, form: T, headers : seq[(cstring, cstring)]): Future[JsonNode] =

    var
        url: cstring = url
        info : string = $(%*form)

    var
        data = (info).toCstr()
        headers = headers
        promise = newPromise() do (resolve: proc(response: JsonNode)):
            ajaxPost(url, headers, data, proc (status: int, resp: cstring) =
                if status == 200:
                    let jsonresp = parseJson($resp)
                    resolve(jsonresp)
            )
    
    return promise

proc callApi*(url: string, useget: bool = false): Future[JsonNode] =
    let
        url: cstring = url

    var
        headers: seq[(cstring, cstring)]
        data: cstring
        promise: Future[JsonNode]

    if useget:
        promise = newPromise() do (resolve: proc(response: JsonNode)):
            ajaxGet(url, headers, proc (status: int, resp: cstring) =
                if status == 200:
                    echo resp, url
                    let jsonresp = parseJson($resp)
                    resolve(jsonresp)
            )

    else:
        promise = newPromise() do (resolve: proc(response: JsonNode)):
            ajaxPost(url, headers, data, proc (status: int, resp: cstring) =
                if status == 200:
                    let jsonresp = parseJson($resp)
                    resolve(jsonresp)
            )

    return promise

proc cancel*(action : proc(e : Event, n : VNode) = fluke) : VNode =
    result = buildHtml(tdiv(id = "cancel", onclick = action)):
        tdiv(id = "cancelline1")
        tdiv(id = "cancelline2")

proc add*(action : proc(e : Event, n : VNode) = fluke) : VNode =
    result = buildHtml(tdiv(id = "add", onclick = action)):
        tdiv(class = "addline1")
        tdiv(class = "addline2")

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

proc socialMedia*(socialmedia: SocialMedia) : VNode =
    
    proc mediaImg(name, url: string): VNode =
        
        result = buildHtml(a(href = url)):
            tdiv(class = "socialmedia", id = name)
    
    result = buildHtml(span(id = "socialmedia")):
        
        mediaImg("Gmail", socialmedia.Gmail)
        mediaImg("Twitter", socialmedia.Twitter)
        mediaImg("Telegram", socialmedia.Telegram)

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
    
    proc getSocialMedia() {.closure, async.} =
    
        let 
            data = await callApi("/socialmedia")
            info = data.to(SocialMedia)
            footer = document.getElementById("footbar")
            oldsm = document.getElementById("socialmedia")
        
        footer.replaceChild(socialMedia(info).vnodeToDom, oldsm)
        
    result = buildHtml(footer(id = "footbar")):
        column(("Legal", @[
            ("Terms and Conditions", "/terms"),
            ("Privacy policy", "/policy")
            ]))

        column(("Site", @[
            ("Developers", "/devs"),
            ("FAQ", "/faq")
            ]))
        span(id = "socialmedia")
            
    discard getSocialMedia()

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

proc auth*(cancelproc: proc(ev: Event, n: VNode) = fluke, showcancel : bool = true): VNode =
    proc login(): VNode {.closure.} =

        proc actionLogin(e : Event, n : VNode) {.closure.} =

            proc loginUser(data : tuple[username, password : string]) {.async.} =

                let response = await callBackend[BackendUser]("/users/v1/login/", BackendUser(
                    username : data.username,
                    password : data.password
                ), @[
                    ("Authorization".toCstr, "Token e9c4c24be896d4a7f280a8f029dea8e5ed8c661c".toCstr), 
                    ("Content-Type".toCstr, "application/json".toCstr)])

                echo response

            let
                username = document.getElementById("username").value
                password = document.getElementById("password").value

            discard loginUser((username : $username, password : $password))

        result = buildHtml(tdiv(id = "authmode")):
            tdiv(class = "authcapsule"):
                label:
                    text "Username"
                input(`type` = "text", placeholder = "username", id = "username")

            tdiv(class = "authcapsule"):
                label:
                    text "Password"
                input(`type` = "password", placeholder = "password", id = "password")

            button(`type` = "button", onclick = actionLogin):
                text "Login"

    proc register(): VNode {.closure.} =

        proc createUser(e : Event, n : VNode) {.closure.} =

            proc addUser(data : tuple[username, password, number, email : string]) {.async.} =

                let response = await callBackend[BackendUser]("/users/v1/register/", BackendUser(
                    user_name : data.username,
                    password : data.password,
                    phone_num : data.number,
                    email : data.email,
                    last_name : "whatever",
                    first_name : "oknow"
                ), @[
                    ("Authorization".toCstr, "Token e9c4c24be896d4a7f280a8f029dea8e5ed8c661c".toCstr), 
                    ("Content-Type".toCstr, "application/json".toCstr)])
                
                echo response

            let
                username = document.getElementById("username").value
                password = document.getElementById("password").value
                number = document.getElementById("number").value
                email = document.getElementById("email").value

            discard addUser(($username, $password, $number, $email))

        result = buildHtml(tdiv(id = "authmode")):
            tdiv(class = "authcapsule"):
                label:
                    text "Username"
                input(`type` = "text", placeholder = "username", id = "username")

            tdiv(class = "imgcapsule"):
                label(id = "whatsapp", class = "formimg")
                input(`type` = "tel", placeholder = "whatsapp number", id = "number")

            tdiv(class = "authcapsule"):
                label:
                    text "Email"
                input(`type` = "email", placeholder = "email", id = "email")

            tdiv(class = "authcapsule"):
                label:
                    text "Password"
                input(`type` = "password", placeholder = "password", id = "password")

            tdiv(class = "authcapsule"):
                label:
                    text "Retype Password"
                input(`type` = "password", placeholder = "retype password")

            button(`type` = "button", onclick = createUser):
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

        if showcancel:
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
