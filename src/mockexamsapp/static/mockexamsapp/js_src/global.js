import { h, text} from "https://unpkg.com/hyperapp"

const linktype = {
    'Authentication' : ['Login', 'Register'],
    'Legal' : ['Terms and Conditions', 'Privacy Policy', 'FAQ'],
    'Team' : ['Team']
}
const slideopen = () => (
    document.getElementById('sidebar').classList.toggle('opensidebar')
)

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


const burger1 = () => h('div', {id : 'burger', onclick : slideopen}, [
    h('div', {id : 'upperburger'}, [
        h('div', {class : 'line'}),
        h('div', {class : 'line'})
    ]),
    h('div', {id : 'lowerburger'}, [
        h('div', {class : 'line'}),
        h('div', {class : 'line'})
    ])
])

const burger2 = () => h('div', {id : 'burger2', onclick : slideopen}, [
    h('div', {id : 'line1'}),
    h('div', {id : 'line2'})
])

const userinfo = () =>
    h('section', {id : 'profilepic'}, [
        h('img', {src : 'imgs/avatar.png'}, []),
        h('p', {id : 'username'}, text('username')),
        h('p', {id : 'id'}, text('09838839BD'))
    ])

const tel = (name) =>
    h('span', {class : 'dual'}, [
        h('input', {class : 'phonenumber', name : name, type : 'tel', placeholder : '+2349044444433'}),
        h('div', {class : 'show', id : 'telegram'})
    ])

const password = (name) =>
    h('span', {class : 'dual'}, [
        h('input', {name : name, placeholder : name, type : 'password'}),
        h('div', {class : 'show'}, text('show'))
    ])

export {userinfo, horizontal, foot, foot2, burger1, burger2, tel, password}