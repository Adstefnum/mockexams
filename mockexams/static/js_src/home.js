import { h, text, app } from "https://unpkg.com/hyperapp"
import { nav } from "./navbar.js"
import { foot } from "./footer.js"
import { wallpaper } from "./global.js"

let describe = {
  name : 'Mock Exams',
  description : `Hello guys welcome to mockexams, we are a group of inovators looking to make
  studing for CBT exams easier and cheaper for all while abiding by the rules set by the examination
  body`
}

let medialinks = {
  'youtube' : '/',
  'twitter' : '/',
  'mail' : '/'
}

let examinfo = [
  {
    name : 'utme',
    image : `./imgs/jamb.png`, //'data:image;base64,'
    description : 'Practice for the utme CBT exams by completing questions within a specified time'
  },
  {
    name : 'unilorin post utme',
    image : `./imgs/unilorin.png`,
    description : 'Practice for the unilorin post utme CBT exams by completing questions within a specified time'
  },
  {
    name : 'unilag post utme',
    image : `./imgs/unilag.png`,
    description : 'Practice for the unilorin post utme CBT exams by completing questions within a specified time'
  },
  {
    name : 'Abu post utme',
    image : `./imgs/abu.png`,
    description : 'Practice for the unilorin post utme CBT exams by completing questions within a specified time'
  }
]

const landing = (describe) =>
    h('span', {id : 'landing'}, [
      h('div', {id : 'descriptionpanel'}, [
        h('p', {id : 'description'}, text(describe)),
        h('span', {id : 'signinpanel'}, [
          h('a', {href : '/leaderboard'}, [
            h('div', {class : 'btn'}, text('View leaderboard')),
          ]),
          h('a', {href : '/signup'}, [
            h('div', {class : 'btn'}, text('Sign Up')),
          ]),
          h('a', {href : '/signup'}, [
            h('div', {class : 'btn'}, text('Login'))
          ])
        ])
      ]),
      h('div', {id : 'fancyimage'})
    ])

const exams = (examinfo) =>
    h('a', {class : 'examlinks', href : '/cbt/' + examinfo.name}, [
      h('span', {id : examinfo.name, class : 'exam'}, [
        h('img', {class : 'examimage', src : examinfo.image, alt : examinfo.name}),
        h('h4', {class : 'examname'}, text(examinfo.name)),
        h('p', {class : 'examdescription'}, text(examinfo.description))
      ])
    ])

const exampanel = (examinfo) =>
    h('span', {id : 'exampanel'}, 
      examinfo.map(
        (value) => exams(value)
      )
    )

const layout = (medialinks, describe, examinfo) => [
  wallpaper(),
  h('span', {id : 'columncontent'}, [
    nav(describe.name),
    landing(describe.description),
    exampanel(examinfo),
    foot(medialinks)
  ])
]  

app({
    init: {links : medialinks, info : describe, exams : examinfo},
    node: document.getElementById("app"),
    view: ({links, info, exams}) =>
        h("main", {id : "background"}, layout(links, info, exams))
})