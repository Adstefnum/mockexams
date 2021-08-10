import karax / [karax, karaxdsl, vdom, kdom], datatype, global

type

    Btn = object
        name : string
        action : proc(e : Event, n : VNode)

proc userNav(btns : seq[Btn]) : VNode =
    result = buildHtml(nav(id = "usernav")):
        for btn in btns:

            p(class = "usernavbtn", onclick = btn.action):
                text btn.name

proc settingPage() : VNode =
    proc fluke(e : Event, n : VNode) {.closure.} =
        discard

    result = buildHtml(tdiv(id = "userpage")):
        userNav(@[Btn(name : "User Data", action : fluke), Btn(name : "Payment Plans", action : fluke)])
        tdiv(id = "usersettingsarea")

proc logPage() : VNode =
    proc fluke(e : Event, n : VNode) {.closure.} =
        discard

    proc log() : VNode =
        result = buildHtml(tdiv(class = "log")):
            input(`type` = "hidden", value = "questionid", id = "questionid")
            p(class = "examname"):
                text "UTME"
            p(class = "examsubjects"):
                text "English Chemistry Biology Physics"
            p(class = "examsession"):
                text "Random"
            p(class = "examdate"):
                text "Thursday, 20th July 2021"

    result = buildHtml(tdiv(id = "userpage")):
        tdiv(id = "userlogarea"):

            for _ in 0..3:
                log()

proc checkLog(e : Event, n : VNode) =
    {.cast(noSideEffect).}
    let 
        userpage = document.getElementById("userpage")
        settingsarea = document.getElementById("usersettingsarea")
            
    var editarea = buildHtml(tdiv(id = "usersettingsarea")):
        tdiv(class = "addcontainer"):
            p:
                text "Clear Log"
            
        span(id = "note")

    userpage.replaceChild(editarea.vnodeToDom(), settingsarea)

proc exams() : VNode =
    result = buildHtml(tdiv(id = "usersettingsarea")):
        tdiv(class = "addcontainer"):
            p:
                text "Exams"
            p:
                text "Create Exam"
        tdiv(class = "inputandlabel")

proc sudoPage() : VNode =
    proc fluke(e : Event, n : VNode) {.closure.} =
        discard

    proc editTerms(e : Event, n : VNode) {.closure.} =
        {.cast(noSideEffect).}
        let 
            userpage = document.getElementById("userpage")
            settingsarea = document.getElementById("usersettingsarea")
            
        var editarea = buildHtml(tdiv(id = "usersettingsarea")):
                tdiv(class = "addcontainer"):
                    add()
            
                textarea(id = "note")

        userpage.replaceChild(editarea.vnodeToDom(), settingsarea)

    proc editSmedia(e : Event, n : VNode) {.closure.} =
        {.cast(noSideEffect).}
        let 
            userpage = document.getElementById("userpage")
            settingsarea = document.getElementById("usersettingsarea")
            
        var editarea = buildHtml(tdiv(id = "usersettingsarea")):
                tdiv(class = "addcontainer"):
                    add()

                tdiv(class = "inputandlabel"):
                    label:
                        text "Youtube Url"
                    input(`type` = "text", id = "youtube", placeholder = "Youtube Url")
                tdiv(class = "inputandlabel"):
                    label:
                        text "Twitter Url"
                    input(`type` = "text", id = "twitter", placeholder = "Twitter Url")
                tdiv(class = "inputandlabel"):
                    label:
                        text "Telegram Url"
                    input(`type` = "text", id = "telegram", placeholder = "Telegram Url")
                tdiv(class = "inputandlabel"):
                    label:
                        text "Instagram Url"
                    input(`type` = "text", id = "instagram", placeholder = "Instagram Url")
        

        userpage.replaceChild(editarea.vnodeToDom(), settingsarea)

    proc editExam(e : Event, n : VNode) {.closure.} =
        {.cast(noSideEffect).}
        let 
            userpage = document.getElementById("userpage")
            settingsarea = document.getElementById("usersettingsarea")

        userpage.replaceChild(exams().vnodeToDom(), settingsarea)

    result = buildHtml(tdiv(id = "userpage")):
        userNav(@[
            Btn(name : "Log", action : checkLog),
            Btn(name : "Terms", action : editTerms),
            Btn(name : "Policy", action : editTerms), 
            Btn(name : "Developers", action : editTerms), 
            Btn(name : "Faq", action : editTerms), 
            Btn(name : "Social Media", action : editSmedia),
            Btn(name : "Exams", action : editExam)])
        tdiv(id = "usersettingsarea")

proc loading(e : Event, n : VNode) {.exportc.} =
    let
        background = document.getElementById("app")
        userpage = document.getElementById("userpage")

    background.replaceChild(settingPage().vnodeToDom(), userpage)

proc user() : VNode =

    proc showSettings(e : Event, n : VNode) =
        let
            background = document.getElementById("app")
            userpage = document.getElementById("userpage")

        background.replaceChild(settingPage().vnodeToDom(), userpage)

    proc showLog(e : Event, n : VNode) =
        let
            background = document.getElementById("app")
            userpage = document.getElementById("userpage")

        background.replaceChild(logPage().vnodeToDom(), userpage)

    proc showSudo(e : Event, n : VNode) =
        let
            background = document.getElementById("app")
    
        var 
            userpage = document.getElementById("userpage")
            editarea = buildHtml(tdiv(id = "usersettingsarea")):
                tdiv(class = "addcontainer"):
                    p:
                        text "Clear Log"
            
                span(id = "note")

        background.replaceChild(sudoPage().vnodeToDom(), userpage)
        userpage = document.getElementById("userpage")
        let settingsarea = document.getElementById("usersettingsarea")
        userpage.replaceChild(editarea.vnodeToDom(), settingsarea)

    result = buildHtml(main(id = "background")):
        tdiv(id = "navbar"):
            span(id = "userbtns"):
                tdiv(id = "usersettings", class = "usermenubtns", onclick = showSettings)
                tdiv(id = "userrecord", class = "usermenubtns", onclick = showLog)
                tdiv(id = "sudoopt", class = "usermenubtns", onclick = showSudo)
            
            img(src = "../../../static/imgs/avatar.png", id = "profilepic")

        tdiv(id = "userpage")

when isMainModule:
    setRenderer(user, "app")