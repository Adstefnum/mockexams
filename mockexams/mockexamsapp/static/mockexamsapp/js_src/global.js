import { h, text} from "https://unpkg.com/hyperapp"

const linktype = {
    'Authentication' : ['Login', 'Register'],
    'Legal' : ['Terms and Conditions', 'Privacy Policy', 'FAQ'],
    'Team' : ['Team']
}

function makefootdiv(name) {
    var result = [h('h4', {class : 'titles'}, text(name))];
    const list = linktype[name]
    
    for (var i = 0; i < list.length; i++) {
        result.push(links(list[i]))
    }

    return result
}

const links = (name) =>
    h('a', {href : name}, text(name))

const socialmedia = (name, medialink) =>
    h('a', {href : medialink}, [
        h('div', {class : 'socialmedia', id : name})
    ])

const foot = () =>
    h('footer', {id : 'footer'}, [
        h('div', {id : 'auth', class : 'footerdivs'}, 
            makefootdiv('Authentication')
        ),
        h('div', {id : 'legal', class : 'footerdivs'}, 
            makefootdiv('Legal')
        ),
        h('div', {id : 'team', class : 'footerdivs'}, 
            makefootdiv('Team')
        )
        /*h('div', {id : 'mediapanel'}, 
            Object.keys(medialinks).map(
                (name) => socialmedia(name, medialinks[name])
            )
        )*/
    ])

const horizontal = (content) =>
    h('span', {class : 'horizontalcontainer'}, content)

const userinfo = () =>
    h('section', {id : 'profilepic'}, [
        h('img', {src : 'imgs/avatar.png'}, []),
        h('p', {id : 'username'}, text('username')),
        h('p', {id : 'id'}, text('09838839BD'))
    ])

export {userinfo, horizontal, foot, foot2}