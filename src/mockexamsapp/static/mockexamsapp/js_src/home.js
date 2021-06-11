import { h, text, app } from "https://unpkg.com/hyperapp";
import { horizontal, foot } from "./global.js";

const info = `Mockexams is a Computer Based Test(CBT) platform which aims 
  to assist students to practice for common CBT exams like JAMB and post 
  UTME. The platform provides exams past questions coupled with answers, 
  and aims to simulate the examination enviroment enabling students to get
  accustomed to writing and passing CBT exams.
  `
const url = window.location.href
let formdata = new FormData
formdata.append('id', '')
formdata.append('password', '')

const param = {
  method : 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  body : formdata
}

const iconlinks = (name) =>
  h('a', {href : `/${name}`}, [
    h('div', {class : 'iconholders'}, [
      h('div', {id : `${name}icon`, class : 'menuicon'}),
    ])
  ])

const menubar = (userinfo) => 
  h('span', {id : 'menubar'}, [
    h('div', {id : 'logo'}),
    h('a', {href : `${userinfo.url}`}, [
      h('img', {src : `${userinfo.image}`, class : 'profilepic'})
    ]),
    iconlinks('exam'),
    iconlinks('ranking'),
    iconlinks('blog')
  ])

const btn = (label, url) =>
  h('a', {href : url}, [
    h('div', {class : 'btn'}, text(label)),
  ])

const description = (info) => [
  h('div', {id : 'wallpaper'}, [
    h('div', {id : 'descriptionpanel'}, [
      h('h2', {}, text('MockExams')),
      h('span', {id : 'description'}, 
        info.split('\n').map(
          (x) => h('p', {class : 'description'}, text(x))
        )
      ),
    ]),
    h('div', {id : 'fancyimage'})
  ]),
  foot()
]

const layout = (userinfo) => [
  menubar(userinfo),
  horizontal(description(info))
]  

function run(userinfo) {
  app({
    init: {userinfo : userinfo},
    node: document.getElementById("app"),
    view: ({userinfo}) =>
        h("main", {id : "background"}, layout(userinfo))
  })
}

function typeWriter() {
  let len = 0;
  const txt = document.getElementById('description').innerText;

  if (len < txt.length) {
    document.getElementById("description").innerHTML += txt.charAt(len);
    len++;
    setTimeout(typeWriter, 100);
  }
}

run({})
/*fetch(url, param)
  .then((x) => {
    run(x.json())
  })*/