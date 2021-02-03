import { h, text, app } from "https://unpkg.com/hyperapp"

const inc = (count, len) =>
    count === len -1 ? count : count + 1

const dec = (count) =>
    count === 0 ? count : count -1

const jump = (state, event) =>({
    ...state,
    count : parseInt(event.target.value) - 1
})

const increase = (state) =>({
    ...state,
    count : inc(state.count, state.data.length)
})

const decrease = (state) =>({
    ...state,
    count : dec(state.count)
})

const options = (options, number) =>
    Object.keys(options).map(
        (key) => h('li', {class : 'options'}, [
            h('input', {type : 'radio', name : number, value : key}),
            h('p', {}, text(options[key]))
        ])
    )
    

const question = (data, number) => h('main', {id : 'question'}, [
    h('section', {class : 'paragraph'}, text(data.section)),
    h('section', {class : 'question'}, [
        h('p', {class : 'number'}, text(number)),
        h('p', {class : 'qinfo'}, text(data.question))
    ]),
    h('section', {id : 'options'}, [
        h('ul', {}, options(data.option, number))
    ]),
    h('section', {id : 'buttons'}, [
        h('button', {class : 'prev', onclick : decrease}, text('previous')),
        h('button', {class : 'next', onclick : increase}, text('next'))
    ])
])

const range = (end) =>
    [...Array(end + 1).keys()]
        .filter((x) => x > 0)

const panel = number =>
    range(number).map(
        (x) => h('button', {class : 'btn', value : x, onclick : jump}, text(x))
    )

async function info () {
  await fetch("http://0.0.0.0:3000/http%3A%2F%2F0.0.0.0:10000%2Fquestions%2Fenglish%2F2006.json")
    .then((r) => r.json())
    .then(
            (data) => app({
                init: ({data : data, count : 0}),
                node: document.getElementById("app"),
                view: ({data, count}) =>
                    h('main', {id : 'background'}, [
                        question(data[count], count + 1),
                        h('section', {id : 'panel'}, panel(data.length))
                    ])
            })
        )
}
info();