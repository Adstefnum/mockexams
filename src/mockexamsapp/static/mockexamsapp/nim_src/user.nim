import karax / [karax, karaxdsl, vdom, kdom], datatype

proc user() : VNode =

    result = buildHtml(main(id = "background")):
        tdiv(id = "navbar"):
            span(id = "userbtns"):
                tdiv(id = "usersettings", class = "usermenubtns")
                tdiv(id = "userrecord", class = "usermenubtns")
                tdiv(id = "sudoopt", class = "usermenubtns")
            
            img(src = "../../../static/imgs/avatar.png", id = "profilepic")

        tdiv(id = "userpage")

when isMainModule:
    setRenderer(user, "app")