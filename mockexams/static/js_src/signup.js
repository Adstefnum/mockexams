import { h, text, app } from "https://unpkg.com/hyperapp"

const tel = (name) =>
    h('span', {class : 'dual'}, [
        /*h('select', {id : 'countrycode', name : 'countrycode'}, [
            h('options', {}, text('+234')),
            h('options', {}, text('+211')),
            h('options', {}, text('+244'))
        ]),*/
        h('input', {class : 'phonenumber', name : name, type : 'tel', placeholder : '+2349044444433'}),
        h('div', {class : 'show', id : 'telegram'})
    ])

const password = (name) =>
    h('span', {class : 'dual'}, [
        h('input', {name : name, placeholder : name, type : 'password'}),
        h('div', {class : 'show'}, text('show'))
    ])

const signinpanel = () =>
    h('form', {id : 'panel', action : '/signup', method : 'POST', enctype : 'multipart/formdata'}, [
        h('label', {id : 'title'}, text('Register')),
        tel('telegram phone number'),
        h('input', {name : 'username', placeholder : 'username', type : 'text'}),
        password('password'),
        password('retype password'),
        h('input', {name : 'email', placeholder : 'email account', type : 'email'}),
        h('input', {type : 'submit', value : 'Register'})
    ])

const logininpanel = () =>
    h('form', {id : 'panel', action : '/login', method : 'POST', enctype : 'multipart/formdata'}, [
        h('label', {id : 'title'}, text('Login')),
        h('input', {name : 'email', placeholder : 'email account', type : 'email'}),
        password('password'),
        h('input', {type : 'submit', value : 'Login'})
    ])

const layout = () =>
    signinpanel()
    //logininpanel()

app({
    init: {},
    node: document.getElementById("app"),
    view: () =>
        h("main", {id : "background"}, layout())
})