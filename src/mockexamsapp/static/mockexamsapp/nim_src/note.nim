import karax / [karax, karaxdsl, vdom], datatype, global

proc note() : VNode =
    result = buildHtml(span(id = "notecover")):
        tdiv(id = "note"):
            text "# Some markdown stuff".markDown()

        footbar()
        footbar2()

when isMainModule:
    setRenderer(note, "app")