import karax / [karax, karaxdsl, vdom, kdom], datatype, global, asyncjs
from json import getStr

proc loading(e : Event, n : VNode) {.exportc.} =
    
    proc getData() {.closure, async.} =
        
        let
            note = document.getElementById("note")
            data = await callApi($(window.location.pathname))
            info = data.getStr()

        note.innerHTML = info.parseMarkdown()
    
    discard getData()

proc note() : VNode =
    result = buildHtml(span(id = "notecover")):
        tdiv(id = "note")
        footbar()
        footbar2()

when isMainModule:
    setRenderer(note, "app")
