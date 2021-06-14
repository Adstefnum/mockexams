import { h, text, app } from "https://unpkg.com/hyperapp"
import { userinfo, burger1, burger2 } from "./global.js"

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
    

const question = (data, number) => h('div', {id : 'question'}, [
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

const sidebar = () => h('navbar', {id : 'sidebar'}, [
    burger2(),
    userinfo(),
    h('section', {id : 'subjects'}, [
        h('button', {class : 'subjects'}, text('physics')),
        h('button', {class : 'subjects'}, text('biology')),
        h('button', {class : 'subjects'}, text('chemistry')),
        h('button', {class : 'subjects'}, text('english'))
    ]),
    h('section', {id : 'time'}, [
        h('p', {id : 'timetitle'}, text('Time left')),
        h('div', {class : 'time'}, text('100:00'))
    ]),
    h('button', {id : 'submit'}, text('submit'))
])

const range = (end) =>
    [...Array(end + 1).keys()]
        .filter((x) => x > 0)

const panel = number =>
    range(number).map(
        (x) => h('button', {class : 'btn', value : x, onclick : jump}, text(x))
    )

const layout = (data, count) =>[
    burger1(),
    sidebar(),
    h('div', {id : 'mainarea'}, [
        question(data[count], count + 1),
        h('section', {id : 'panel'}, panel(data.length))
    ])
]

var url = `http://0.0.0.0:3000/file/%2Fhome%2Fcnerd%2FDocuments%2FPython%2Fwebdev%2Fmockexams%2Fquestions%2Fchemistry%2F2001.json`
async function info() {
    await fetch(url)
        .then(data => data.json())
        .then(data => app({
            init: { data : data, count : 0 },
            view: ({data, count}) =>
                h('main', {id : 'background'}, layout(data, count)),
            node: document.getElementById("app"),
        }))
        .catch(function(error) {
            console.error(error)
        })
}

info();

/*const Http = new XMLHttpRequest();
Http.open("GET", url);
Http.send();
var data = [];

Http.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        data = JSON.parse(Http.responseText);
        app({
            init: { data : data, count : 0 },
            view: ({data, count}) =>
                h('main', {id : 'background'}, layout(data, count)),
            node: document.getElementById("app"),
        })       
    }
}*/