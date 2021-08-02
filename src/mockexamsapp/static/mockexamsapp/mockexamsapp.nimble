# Package

version       = "0.1.0"
author        = "C-NERD"
description   = "Frontend package for mockexams"
license       = "Proprietary"
installExt    = @["nim"]
srcDir        = "nim_src"
binDir        = "js"
bin           = @["home", "note", "cbt"]
backend       = "js"

# Dependencies

requires "nim >= 1.0.0", "karax == 1.2.1"


task home, "Compiles the project's home page":
    exec "nim js -d:release -d:danger --gc:orc -o:js/home.js nim_src/home.nim"

task exam, "Compiles the project's exam page":
    exec "nim js -d:release -d:danger --gc:orc -o:js/exam.js nim_src/exam.nim"

task user, "Compiles the project's user page":
    exec "nim js -d:release -d:danger --gc:orc -o:js/user.js nim_src/user.nim"