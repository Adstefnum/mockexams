# Package

version       = "0.1.0"
author        = "C-NERD"
description   = "Frontend package for mockexams"
license       = "Proprietary"
installExt    = @["nim"]
srcDir        = "nim_src"
binDir        = "js"
bin           = @["home"]
backend       = "js"

# Dependencies

requires "nim >= 1.0.0", "karax == 1.2.1"
