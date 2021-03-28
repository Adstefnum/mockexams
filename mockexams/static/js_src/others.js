import { h, text, app } from "https://unpkg.com/hyperapp"

const userinfo = () =>
    h('section', {id : 'profilepic'}, [
        h('img', {src : 'imgs/avatar.png'}, []),
        h('p', {id : 'username'}, text('username')),
        h('p', {id : 'id'}, text('09838839BD'))
    ])

export {userinfo}