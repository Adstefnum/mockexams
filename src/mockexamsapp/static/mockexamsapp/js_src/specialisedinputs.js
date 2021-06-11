import { h, text } from "https://unpkg.com/hyperapp"

const show = (state, event) =>
    'password' == event.srcElement.previousSibling.type ? event.srcElement.previousSibling.type : "text"

const tel = (name) =>
    h('span', {class : 'dual'}, [
        h('input', {class : 'phonenumber', name : name, type : 'tel', placeholder : '+2349044444433'}),
        h('div', {class : 'show', id : 'telegram'})
    ])

const password = (name) =>
    h('span', {class : 'dual'}, [
        h('input', {name : name, placeholder : name, type : 'password'}),
        h('div', {class : 'show', onclick : show}, text('show'))
    ])

export {tel, password}