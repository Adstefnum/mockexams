import karax / [karax, karaxdsl, vdom, kdom], global, datatype

proc home(): VNode =
  proc cancel(ev: Event, n: VNode) {.closure.} =
    let
      canvas = document.getElementById("app")
      prevchild = document.getElementById("authcontainer")

    canvas.removeChild(prevchild)

  proc showAuth(ev: Event, n: VNode) {.closure.} =
    let
      canvas = document.getElementById("app")
      prevchild = document.getElementById("authcontainer")

    var nextchild = buildHtml(span(id = "authcontainer")):
      auth(cancel)

    canvas.appendChild(nextchild.vnodeToDom())
    canvas.removeChild(prevchild)

  proc examConfig(ev : Event, n : VNode) {.closure.} =
    var
      testconfig : ConfigExam = ConfigExam(exam : Exam(name: "UTME", description: """
      Practice utme computer based tests by using
      mockexams tools
      """, image: "/static/mockexamsapp/imgs/jamb.png", url: "/"),
      multipleexams : true,
      time : "120 min")
      nextchild = buildHtml(span(id = "authcontainer")):
        configexam(testconfig, cancel)

    let
      canvas = document.getElementById("app")
      prevchild = document.getElementById("authcontainer")

    canvas.appendChild(nextchild.vnodeToDom())
    canvas.removeChild(prevchild)

  result = buildHtml(main):
    span(class = "background", id = "topbackground"):
      navbar()

      span:
        tdiv:
          h2:
            text "Ace your exams on the first try"

          li:
            text """practice authentic CBT past questions in a controlled enviroment"""
          li:
            text """familiarize yourself with the test enviroment"""
          li:
            text """get better with every attempt"""

        button(`type` = "button", class = "btn", onclick = showAuth):
          text "Get Started"

    span(class = "background", id = "middlebackground"):
      exam(Exam(name: "UTME", description: """
      Practice utme computer based tests by using
      mockexams tools
      """, image: "/static/mockexamsapp/imgs/jamb.png", url: "/"), examConfig)

      exam(Exam(name: "UTME", description: """
      Practice utme computer based tests by using
      mockexams tools
      """, image: "/static/mockexamsapp/imgs/abu.png", url: "/"), examConfig)

      exam(Exam(name: "UTME", description: """
      Practice utme computer based tests by using
      mockexams tools
      """, image: "/static/mockexamsapp/imgs/unilorin.png", url: "/"), examConfig)

      exam(Exam(name: "UTME", description: """
      Practice utme computer based tests by using
      mockexams tools
      """, image: "/static/mockexamsapp/imgs/unilag.png", url: "/"), examConfig)

    footbar()
    footbar2()
    #[span(id = "authcontainer", class = "hidden"):
      span(id = "auth", class = "hidden")]#

when isMainModule:
  setRenderer(home, "app")
