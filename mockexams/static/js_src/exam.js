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

const sidebar = () => h('navbar', {id : 'sidebar'}, [
    burger2(),
    h('section', {id : 'profilepic'}, [
        h('img', {src : 'imgs/avatar.png'}, []),
        h('p', {id : 'username'}, text('username')),
        h('p', {id : 'id'}, text('09838839BD'))
    ]),
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
    h('div', {id : 'questionarea'}, [
        question(data[count], count + 1),
        h('section', {id : 'panel'}, panel(data.length))
    ])
]

var url = `http://0.0.0.0:3000/questions/english/2006.json`
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