import { h, text, app } from "https://unpkg.com/hyperapp"

const userinfo = () =>
    h('section', {id : 'profilepic'}, [
        h('img', {src : 'imgs/avatar.png'}, []),
        h('p', {id : 'username'}, text('username')),
        h('p', {id : 'id'}, text('09838839BD'))
    ])

const wallpaper = () =>
    h('span', {id : 'wallpaper'}, [
        h('span', {class : 'pushright'}, [
            h('div', {class : 'largedot'})
        ]),
        h('span', {class : 'pushleft'}, [
            h('div', {class : 'smalldot'})
        ]),
        h('span', {class : 'pushright'}, [
            h('div', {class : 'largedot'})
        ])
    ])

export {userinfo, wallpaper}