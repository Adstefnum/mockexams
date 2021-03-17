import { h, text, app } from "https://unpkg.com/hyperapp"

var describe = `Hello guys welcome to mockexams, we are a group of inovators looking to make
studing for CBT exams easier and cheaper for all while abiding by the rules set by the examination
body`

var socialmedia = {
  'youtube' : '',
  'twitter' : '',
  'mail' : ''
}

const description = () =>
    h('div', {id : 'info'}, [
        h('h3', {id : 'logo'}, text('exams')),
        h('p', {class : 'description'}, text(describe)),
        h('div', {id : 'legalinfo'}, [
          h('a', {href : ''}, [
            h('div', {class : 'btn'}, text('Terms of use'))
          ])
          h('a', {href : ''}, [
            h('div', {class : 'btn'}, text('privacy policy'))
          ])
        ])
    ])

const exams = () =>
    h('div', {id : 'exams'}, [
        h('div', {class : 'cbt'}, [
            h('p', {class : 'description'}, text(describe))
        ])
    ])

const media = (mediainfo) =>
  Object.keys(options).map(
    (key) => h('a', {href : mediainfo(key)}, [
        h('div', {class : 'media', id : key})
    ])
  )

const foot = () =>
    h('footer', {}, [
        h('div', {id : 'media'}, [
            h('a', {href : ''}, [
                h('div', {class : 'media', id : 'youtube'})
            ])
        ])
    ])

const layout = () => [
    description(),
    exams(),
    foot()
]  

app({
    init: {},
    node: document.getElementById("app"),
    view: () =>
        h("main", {id : "background"}, layout())
})