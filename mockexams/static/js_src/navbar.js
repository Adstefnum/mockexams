import { h, text } from "https://unpkg.com/hyperapp"

const changetheme = () =>
    document.getElementById('themechanger').classList.toggle('sun');

const gohome = () =>
    window.location.replace('/')

export const nav = (name) =>
    h('nav', {id : 'navbar'}, [
        h('span', {id : 'logopanel', onclick : gohome}, [
            h('div', {id : 'logo'}),
            h('label', {id : 'logoname'}, text(name))
        ]),
        h('span', {id : 'themechanger', class : 'moon', onclick : changetheme})
    ])