import { h } from "https://unpkg.com/hyperapp"

const slideopen = () => (
    document.getElementById('sidebar').classList.toggle('opensidebar')
)

const burger1 = () => h('div', {id : 'burger', onclick : slideopen}, [
    h('div', {id : 'upperburger'}, [
        h('div', {class : 'line'}),
        h('div', {class : 'line'})
    ]),
    h('div', {id : 'lowerburger'}, [
        h('div', {class : 'line'}),
        h('div', {class : 'line'})
    ])
])

const burger2 = () => h('div', {id : 'burger2', onclick : slideopen}, [
    h('div', {id : 'line1'}),
    h('div', {id : 'line2'})
])

export { burger1, burger2 }