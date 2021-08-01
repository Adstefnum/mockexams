import karax / [karax, karaxdsl, vdom, kdom], datatype, global

const subjects = [
    (name : "English"),
    (name : "Chemistry"),
    (name : "Physics"),
    (name : "Biology")
]

var examinfo : Exam

proc sidebar() : VNode =
    result = buildHtml(tdiv(id = "sidebar")):

        tdiv(id = "userinfo"):
            img(src = "../../../media/mockexamsapp/imgs/avatar.png", id = "profilepic")
            p:
                text "C-NERD"

        span(id = "examinfo"):
            p:
                text "Exam : UTME"
            p:
                text "Time : 120:00"

        span(id = "subjectsinfo"):
            for each in subjects:
                button(`type` = "button", class = "btn"):
                    text each.name

proc showSidebar(e : Event, n : VNode) =

    proc removeSidebar(e: Event, n : VNode) {.closure.} =
        let
            burgercontainer = document.getElementById("burgerholder")
            cancel = document.getElementById("cancel")
            background = document.getElementById("app")
            sidebar = document.getElementById("sidebar")

        var flukebar = buildHtml(tdiv(id = "flukebar"))

        background.replaceChild(flukebar.vnodeToDom(), sidebar)
        burgercontainer.replaceChild(burger(showSidebar).vnodeToDom(), cancel)

    let
        burgercontainer = document.getElementById("burgerholder")
        burger = document.getElementById("burger")
        background = document.getElementById("app")
        flukebar = document.getElementById("flukebar")

    burgercontainer.replaceChild(cancel(removeSidebar).vnodeToDom(), burger)
    background.replaceChild(sidebar().vnodeToDom(), flukebar)

proc examarea() : VNode =
    result = buildHtml(span(id = "mainarea")):
        tdiv(id = "questionpanel"):
            tdiv(id = "question")
            tdiv(id = "navbtnspanel"):
                button(`type` = "button", class = "btn"):
                    text "previous"
                button(`type` = "button", class = "btn"):
                    text "next"

        tdiv(id = "questionnavpanel")

proc loading(e : Event, n : VNode) {.exportc.} =
    let
        app = document.getElementById("app")
        mainarea = document.getElementById("mainarea")

    app.replaceChild(examarea().vnodeToDom(), mainarea)

proc exam() : VNode = 

    result = buildHtml(main(id = "background")):
        tdiv(id = "flukebar")
        tdiv(id = "burgerholder"):
            burger(showSidebar)
        tdiv(id = "mainarea")

when isMainModule:
    setRenderer(exam, "app")