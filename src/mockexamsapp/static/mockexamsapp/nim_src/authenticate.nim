import karax / [karax, karaxdsl, vdom, kdom], datatype, global

proc authenticate() : VNode =
    result = buildHtml(main):
        span(id = "authcontainer"):
            auth(showcancel = false)

when isMainModule:
  setRenderer(authenticate, "app")