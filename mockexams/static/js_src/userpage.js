import { h, text, app } from "https://unpkg.com/hyperapp"
import { userinfo, wallpaper } from "./global.js"

const userbuttons = ['CBT', 'Analytics', 'Leaderboard', 'Payments', 'Settings']
const adminbuttons = ['CBT', 'Overview', 'Blog', 'New Questions', 'LogCat', 'Privilege']

const testdata = {
    log : `
    New User test created
    User test bought 10 trials
    Django Error
    `,
    overview : {
        topics : ['UTME', 'ABU', 'UNILORIN', 'UNILAG'],
        values : [30, 6, 18, 10],
        info : ''
    },
    privilege : {
        minimenu : ['General Settings', 'Site Settings', 'List Users'],
        general : {
            name : 'Alaya Abdullahi',
            email : 'alayaa694@gmail.com',
            number : '+2349065739180'
        }
    }

}

const buttons = (name) =>
    h('div', {class : 'btn'}, [
        h('div', {id : name.replace(' ', '_')}, []),
        text(name)
    ])

const menuoptions = (menubuttons) =>
    h('section', {id : 'menuoptions'}, menubuttons.map(
        (x) => buttons(x)
    ))

const info = (name) =>
    h('span', {id : 'profileinfo1'}, [
        h('div', {id : 'profilepic'}),
        h('label', {}, text(name))
    ])

const minimenu = (mininfo) =>
    h('span', {id : 'minimenu'}, 
        mininfo.map(
            (x) => h('div', {class : 'menubtn', onclick : Site_Settings}, text(x))
        )
    )

const containerbar = (title) =>
    h('div', {class : 'containerbar', id : 'privilegelabel'}, [
            text(title),
            h('div', {class : 'btn', class : 'containerbtn'}, text('save'))
    ])

const infocollecters = (title, type, classes, values) =>
    h('div', {class : 'nanocontainer'}, [
        h('label', {class : 'title'}, text(title)),
        h('input', {type : type, name : title, class : classes, value : values})
    ])

const personnalinformation = (info) =>
    h('span', {class : 'minicontainer'}, [
        containerbar('Personal Information'),
        h('span', {class : 'mainminicontainer', id : 'mainminicontainer'}, [
            h('div', {class : 'personnalinfo'}, [
                h('div', {class : 'subpersonnal'}, [
                    infocollecters('Full name', 'text', 'long', info.name),
                    infocollecters('Email', 'email', 'long', info.email),
                    infocollecters('Phone Number', 'tel', 'short', info.number)
                ]),
                h('div', {class : 'subpersonnal'}, [
                    infocollecters('Old Password', 'password', 'short', ''),
                    infocollecters('New Password', 'password', 'short', ''),
                    infocollecters('Retype Password', 'password', 'short', '')
                ])
            ]),
            h('input', {type : 'file', name : 'profilepic', id : 'profilepicker'}),
            h('label', {for : 'profilepicker', id : 'changepic'}, [
                text('Profile picture'),
                h('img', {src : '../imgs/user.png'}),
                text('Click or drag an image over here')
            ])
        ])
    ])

const clearcontainer = () =>
    Object.keys(document.getElementById('mainminicontainer').children).map(
        (x) => document.getElementById('mainminicontainer').removeChild(x)
    );

const Site_Settings = () => 
    /*document.getElementById('privilegelabel').innerText = 'Settings',*/
    clearcontainer()


const privilege = (info) =>
    h('span', {id : 'privilege'}, [
        minimenu(info.minimenu),
        personnalinformation(info.general)
    ])

const logcat = (info) =>
    h('textarea', {id : 'terminal', readonly : ''}, text(info))

const overview = (info) =>
    h('span', {id : 'overview'}, [
        h('canvas', {id : 'graph'}),
        h('div', {id : 'siteinfo'}, text('some shit'))
    ])

const sidemenu = (baroptions) =>
    h('span', {id : 'sidebar'}, [
        userinfo(),
        menuoptions(baroptions)
    ])

const adminlayout = (data) => [
    wallpaper(),
    h('span', {id : 'content'}, [
        sidemenu(adminbuttons),
        h('span', {id : 'mainarea'}, [
            //logcat(data.log),
            //overview(data.overview),
            privilege(data.privilege),
        ])
    ])
]

const userlayout = (data) => [
    wallpaper(),
    h('span', {id : 'content'}, [
        sidemenu(userbuttons),
        h('span', {id : 'mainarea'}, [
            //logcat(data.log),
            overview(data.overview),
            //privilege(data.privilege),
        ])
    ])
]

app({
    init: {data : testdata},
    node: document.getElementById("app"),
    view: ({ data }) =>
        h("main", {id : "background"}, userlayout(data))
})