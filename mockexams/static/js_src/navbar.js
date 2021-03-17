import { h, text } from "https://unpkg.com/hyperapp"

const changetheme = () =>
    document.getElementById('themechanger').classList.toggle('sun');

export const nav = (name) =>
    h('nav', {id : 'navbar'}, [
        h('span', {id : 'logopanel'}, [
            h('div', {id : 'logo'}),
            h('label', {id : 'logoname'}, text(name))
        ]),
        h('span', {id : 'themechanger', class : 'moon', onclick : changetheme})
    ])