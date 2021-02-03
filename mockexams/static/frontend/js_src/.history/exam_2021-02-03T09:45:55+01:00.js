import { h, text, app } from "https://unpkg.com/hyperapp"
import { Http } from "https://unpkg.com/hyperapp-fx@next"

/*const data = [
    {
     "question": "Unfair ",
     "option": {
      "a": "insight ",
      "b": "towards ",
      "c": "first-class",
      "d": "instant "
     },
     "section": "choose the option that has the same stress pattern as the given word.",
     "image": "",
     "answer": "c",
     "solution": "",
     "examtype": "utme",
     "examyear": "2006"
    },
    {
     "question": "Our neigbour was attracted by the \u2026\u2026\u2026. from my mother\u2019s cooking ",
     "option": {
      "a": "flavour",
      "b": "stench",
      "c": "scent",
      "d": "aroma "
     },
     "section": "choose the option that best completes the gap(s).",
     "image": "",
     "answer": "d",
     "solution": "",
     "examtype": "utme",
     "examyear": "2006"
    },
    {
     "question": "The usually hostile crowd was captivated by the .player's <i>winsome</i> attitude",
     "option": {
      "a": "obnoxious  ",
      "b": "friendly  ",
      "c": "colourful  ",
      "d": "drunken"
     },
     "section": "choose the option opposite in meaning to the word or phrase in italics.",
     "image": "",
     "answer": "a",
     "solution": "",
     "examtype": "utme",
     "examyear": "2006"
    }];*/

/*fetch('http://0.0.0.0:2000/https%3A%2F%2F0.0.0.0:10000%2Fquestions%2Fenglish%2F2006.json')
  .then(response => response.json())
  .then(data => info = data);*/

const httpFx = (dispatch, props) => {
  // Do side effects
  fetch(props.url, props.options)
    .then((res) => res.json())
    .then((data) => dispatch = data)
}

const http = (props) => [httpFx, props]

//var info = []
const data = () => [
    http({
        url: "http://0.0.0.0:2000/https%3A%2F%2F0.0.0.0:10000%2Fquestions%2Fenglish%2F2006.json",
        action: (_, response) => info = response
    })
]

/*async function data() {
    const response = await fetch("http://0.0.0.0:4000/http%3A%2F%2F0.0.0.0:10000%2Fquestions%2Fenglish%2F2006.json", {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
      return response.json();
}*/


const inc = (count, len) =>
    count == len -1 ? count : count + 1

const dec = (count) =>
    count == 0 ? count : count -1

const jump = (state, event) =>({
    ...state,
    count : parseInt(event.target.value) - 1
})

const increase = (state) =>({
    ...state,
    count : inc(state.count, data.length)
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

//data(info);
app({
    init: ({data : info, count : 0}),
    node: document.getElementById("app"),
    view: ({data, count}) =>
        h('main', {id : 'background'}, [
            //data(info),
            question(data[count], count + 1),
            h('section', {id : 'panel'}, panel(data.length))
        ])
})