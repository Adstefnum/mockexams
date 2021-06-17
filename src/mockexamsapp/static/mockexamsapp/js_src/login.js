import { h, text, app } from "https://unpkg.com/hyperapp"
import {password } from "./global.js"

const logininpanel = () =>
    h('form', {id : 'panel', action : '/login', method : 'POST', enctype : 'multipart/formdata'}, [
        h('label', {id : 'title'}, text('Login')),
        h('input', {name : 'email', placeholder : 'email account', type : 'email'}),
        password('password'),
        h('input', {type : 'submit', value : 'Login'})
    ])

const layout = () =>
    //signinpanel()
    logininpanel()

app({
    init: {},
    node: document.getElementById("app"),
    view: () =>
        h("main", {id : "background"}, layout())
})