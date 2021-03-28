import { h, text, app } from "https://unpkg.com/hyperapp"
import { userinfo } from "./others.js"

const menubuttons = ['Analytics', 'Start CBT', 'Leaderboard', 'Make Payments', 'Settings']

const info = (name) =>
    h('span', {id : 'profileinfo1'}, [
        h('div', {id : 'profilepic'}),
        h('label', {}, text(name))
    ])

const examanalytics = () =>
    h('span', {id : 'examanalytics'}, [
        h('label', {}, text('Exam Totals')),
        h('div', {id : 'piechart'}),
        h('div', {id : 'chartdata'}, [
            h('div', {id : 'chartexplaination'}, [
                h('div', {}, [
                    h('div', {class : 'color', id : 'blue'}),
                    h('label', {class : 'colortalk'}, text('Above cut off (180+)'))
                ]),
                h('div', {}, [
                    h('div', {class : 'color', id : 'red'}),
                    h('label', {class : 'colortalk'}, text('Below cut off (180-)'))
                ])
            ]),
            h('div', {class : 'btn'}, text('show all results')),
            h('div', {class : 'btn'}, text('reset results data'))
        ])
    ])

const analytics = (data) =>
    h('span', {id : 'analytics'}, [
        h('span', {id : 'userinfo'}, [
            info(data.name),
            h('div', {}, [
                h('p', {}, text('Exam trial points remaining : ' + data.trials)),
                h('a', {href : '/' + data.id + '/' + 'newtrials'}, [
                    h('div', {class : 'btn'}, text('Purchase exam trial points'))
                ]),
                h('div', {class : 'btn'}, text('View position on leaderboard'))
            ])
        ]),
        examanalytics()
    ])

const buttons = (name) =>
    h('div', {class : 'btn'}, [
        h('div', {id : name}, []),
        text(name)
    ])

const menuoptions = () =>
    h('section', {id : 'menuoptions'}, menubuttons.map(
        (x) => buttons(x)
    ))

const sidemenu = () =>
    h('span', {id : 'sidebar'}, [
        userinfo(),
        menuoptions()
    ])

const layout = () => [
    sidemenu(),
    h('span', {id : 'mainarea'}, [])
]

app({
    init: {},
    node: document.getElementById("app"),
    view: () =>
        h("main", {id : "background"}, layout())
})