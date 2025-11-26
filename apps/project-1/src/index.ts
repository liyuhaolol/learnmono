import { add } from "@learnmono/utils"
import {button} from "@learnmono/ui"

const oApp = document.querySelector("#app")

const oButton = button({text:"Hello Monorepo"})

oApp.innerHTML = oButton

console.log(add(1, 2))