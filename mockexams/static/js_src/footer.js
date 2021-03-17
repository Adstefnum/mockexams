import { h, text } from "https://unpkg.com/hyperapp"

const linktype = ['Privacy Policy', 'Terms and Conditions', 'FAQ']

const links = (name) =>
    h('a', {href : name}, text(name))

const socialmedia = (name, medialink) =>
    h('a', {href : medialink}, [
        h('div', {class : 'socialmedia', id : name})
    ])

export const foot = (medialinks) =>
    h('footer', {id : 'footer'}, [
        h('div', {id : 'legalpanel'},
            linktype.map(
                (name) => links(name)
            )
        ),
        h('div', {id : 'mediapanel'}, 
            Object.keys(medialinks).map(
                (name) => socialmedia(name, medialinks[name])
            )
        )
    ])