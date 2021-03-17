var SSR_NODE = 1;
var TEXT_NODE = 3;
var EMPTY_OBJ = {
};
var EMPTY_ARR = [];
var SVG_NS = "http://www.w3.org/2000/svg";
var id = (a)=>a
;
var map = EMPTY_ARR.map;
var isArray = Array.isArray;
var enqueue = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
var createClass = (obj)=>{
    var out = "";
    if (typeof obj === "string") return obj;
    if (isArray(obj)) {
        for(var k = 0, tmp; k < obj.length; k++){
            if (tmp = createClass(obj[k])) {
                out += (out && " ") + tmp;
            }
        }
    } else {
        for(var k in obj){
            if (obj[k]) out += (out && " ") + k;
        }
    }
    return out;
};
var shouldRestart = (a, b)=>{
    for(var k in {
        ...a,
        ...b
    }){
        if (typeof (isArray(a[k]) ? a[k][0] : a[k]) === "function") {
            b[k] = a[k];
        } else if (a[k] !== b[k]) return true;
    }
};
var patchSubs = (oldSubs, newSubs, dispatch)=>{
    for(var subs = [], i = 0, oldSub, newSub; i < oldSubs.length || i < newSubs.length; i++){
        oldSub = oldSubs[i];
        newSub = newSubs[i];
        subs.push(newSub && newSub !== true ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [
            newSub[0],
            newSub[1],
            (oldSub && oldSub[2](), newSub[0](dispatch, newSub[1])), 
        ] : oldSub : oldSub && oldSub[2]());
    }
    return subs;
};
var getKey = (vdom)=>vdom == null ? vdom : vdom.key
;
var patchProperty = (node, key, oldValue, newValue, listener, isSvg)=>{
    if (key === "key") {
    } else if (key === "style") {
        for(var k in {
            ...oldValue,
            ...newValue
        }){
            oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
            if (k[0] === "-") {
                node[key].setProperty(k, oldValue);
            } else {
                node[key][k] = oldValue;
            }
        }
    } else if (key[0] === "o" && key[1] === "n") {
        if (!((node.events || (node.events = {
        }))[key = key.slice(2)] = newValue)) {
            node.removeEventListener(key, listener);
        } else if (!oldValue) {
            node.addEventListener(key, listener);
        }
    } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
        node[key] = newValue == null ? "" : newValue;
    } else if (newValue == null || newValue === false || key === "class" && !(newValue = createClass(newValue))) {
        node.removeAttribute(key);
    } else {
        node.setAttribute(key, newValue);
    }
};
var createNode = (vdom, listener, isSvg)=>{
    var props = vdom.props;
    var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, {
        is: props.is
    }) : document.createElement(vdom.tag, {
        is: props.is
    });
    for(var k in props){
        patchProperty(node, k, null, props[k], listener, isSvg);
    }
    for(var i = 0; i < vdom.children.length; i++){
        node.appendChild(createNode(vdom.children[i] = maybeVNode(vdom.children[i]), listener, isSvg));
    }
    return vdom.node = node;
};
var patch = (parent, node, oldVNode, newVNode, listener, isSvg)=>{
    if (oldVNode === newVNode) {
    } else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
        if (oldVNode.tag !== newVNode.tag) node.nodeValue = newVNode.tag;
    } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
        node = parent.insertBefore(createNode(newVNode = maybeVNode(newVNode), listener, isSvg), node);
        if (oldVNode != null) {
            parent.removeChild(oldVNode.node);
        }
    } else {
        var tmpVKid;
        var oldVKid;
        var oldKey;
        var newKey;
        var oldProps = oldVNode.props;
        var newProps = newVNode.props;
        var oldVKids = oldVNode.children;
        var newVKids = newVNode.children;
        var oldHead = 0;
        var newHead = 0;
        var oldTail = oldVKids.length - 1;
        var newTail = newVKids.length - 1;
        isSvg = isSvg || newVNode.tag === "svg";
        for(var i in {
            ...oldProps,
            ...newProps
        }){
            if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
                patchProperty(node, i, oldProps[i], newProps[i], listener, isSvg);
            }
        }
        while(newHead <= newTail && oldHead <= oldTail){
            if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
                break;
            }
            patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = maybeVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
        }
        while(newHead <= newTail && oldHead <= oldTail){
            if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
                break;
            }
            patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = maybeVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
        }
        if (oldHead > oldTail) {
            while(newHead <= newTail){
                node.insertBefore(createNode(newVKids[newHead] = maybeVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
            }
        } else if (newHead > newTail) {
            while(oldHead <= oldTail){
                node.removeChild(oldVKids[oldHead++].node);
            }
        } else {
            for(var keyed = {
            }, newKeyed = {
            }, i = oldHead; i <= oldTail; i++){
                if ((oldKey = oldVKids[i].key) != null) {
                    keyed[oldKey] = oldVKids[i];
                }
            }
            while(newHead <= newTail){
                oldKey = getKey(oldVKid = oldVKids[oldHead]);
                newKey = getKey(newVKids[newHead] = maybeVNode(newVKids[newHead], oldVKid));
                if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
                    if (oldKey == null) {
                        node.removeChild(oldVKid.node);
                    }
                    oldHead++;
                    continue;
                }
                if (newKey == null || oldVNode.type === SSR_NODE) {
                    if (oldKey == null) {
                        patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
                        newHead++;
                    }
                    oldHead++;
                } else {
                    if (oldKey === newKey) {
                        patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
                        newKeyed[newKey] = true;
                        oldHead++;
                    } else {
                        if ((tmpVKid = keyed[newKey]) != null) {
                            patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
                            newKeyed[newKey] = true;
                        } else {
                            patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
                        }
                    }
                    newHead++;
                }
            }
            while(oldHead <= oldTail){
                if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
                    node.removeChild(oldVKid.node);
                }
            }
            for(var i in keyed){
                if (newKeyed[i] == null) {
                    node.removeChild(keyed[i].node);
                }
            }
        }
    }
    return newVNode.node = node;
};
var propsChanged = (a, b)=>{
    for(var k in a)if (a[k] !== b[k]) return true;
    for(var k in b)if (a[k] !== b[k]) return true;
};
var maybeVNode = (newVNode, oldVNode)=>newVNode !== true && newVNode !== false && newVNode ? typeof newVNode.tag === "function" ? ((!oldVNode || oldVNode.memo == null || propsChanged(oldVNode.memo, newVNode.memo)) && ((oldVNode = newVNode.tag(newVNode.memo)).memo = newVNode.memo), oldVNode) : newVNode : text("")
;
var recycleNode = (node)=>node.nodeType === TEXT_NODE ? text(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), SSR_NODE, node)
;
var createVNode = (tag, props, children, type, node)=>({
        tag,
        props,
        key: props.key,
        children,
        type,
        node
    })
;
var text = (value, node)=>createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node)
;
var h = (tag, props, children = EMPTY_ARR)=>createVNode(tag, props, isArray(children) ? children : [
        children
    ])
;
const h1 = h;
var app = ({ init =EMPTY_OBJ , view , subscriptions , dispatch =id , node ,  })=>{
    var vdom = node && recycleNode(node);
    var subs = [];
    var state;
    var busy;
    var setState = (newState)=>{
        if (state !== newState) {
            state = newState;
            if (subscriptions) {
                subs = patchSubs(subs, subscriptions(state), dispatch);
            }
            if (view && !busy) enqueue(render, busy = true);
        }
    };
    var render = ()=>node = patch(node.parentNode, node, vdom, vdom = view(state), listener, busy = false)
    ;
    var listener = function(event) {
        dispatch(this.events[event.type], event);
    };
    return (dispatch = dispatch((action, props)=>typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], action[1]) : action.slice(1).map((fx)=>fx && fx !== true && fx[0](dispatch, fx[1])
        , setState(action[0])) : action == null ? patchSubs(subs, EMPTY_ARR, dispatch = id) : setState(action)
    ))(init), dispatch;
};
const app1 = app;
const inc = (count, len)=>count === len - 1 ? count : count + 1
;
const dec = (count)=>count === 0 ? count : count - 1
;
const jump = (state, event)=>({
        ...state,
        count: parseInt(event.target.value) - 1
    })
;
const increase = (state)=>({
        ...state,
        count: inc(state.count, state.data.length)
    })
;
const decrease = (state)=>({
        ...state,
        count: dec(state.count)
    })
;
const options = (options1, number)=>Object.keys(options1).map((key)=>h('li', {
            class: 'options'
        }, [
            h('input', {
                type: 'radio',
                name: number,
                value: key
            }),
            h('p', {
            }, text(options1[key]))
        ])
    )
;
const question = (data, number)=>h('div', {
        id: 'question'
    }, [
        h('section', {
            class: 'paragraph'
        }, text(data.section)),
        h('section', {
            class: 'question'
        }, [
            h('p', {
                class: 'number'
            }, text(number)),
            h('p', {
                class: 'qinfo'
            }, text(data.question))
        ]),
        h('section', {
            id: 'options'
        }, [
            h('ul', {
            }, options(data.option, number))
        ]),
        h('section', {
            id: 'buttons'
        }, [
            h('button', {
                class: 'prev',
                onclick: decrease
            }, text('previous')),
            h('button', {
                class: 'next',
                onclick: increase
            }, text('next'))
        ])
    ])
;
const slideopen = ()=>document.getElementById('sidebar').classList.toggle('opensidebar')
;
const burger1 = ()=>h('div', {
        id: 'burger',
        onclick: slideopen
    }, [
        h('div', {
            id: 'upperburger'
        }, [
            h('div', {
                class: 'line'
            }),
            h('div', {
                class: 'line'
            })
        ]),
        h('div', {
            id: 'lowerburger'
        }, [
            h('div', {
                class: 'line'
            }),
            h('div', {
                class: 'line'
            })
        ])
    ])
;
const burger2 = ()=>h('div', {
        id: 'burger2',
        onclick: slideopen
    }, [
        h('div', {
            id: 'line1'
        }),
        h('div', {
            id: 'line2'
        })
    ])
;
const sidebar = ()=>h('navbar', {
        id: 'sidebar'
    }, [
        burger2(),
        h('section', {
            id: 'profilepic'
        }, [
            h('img', {
                src: 'imgs/avatar.png'
            }, []),
            h('p', {
                id: 'username'
            }, text('username')),
            h('p', {
                id: 'id'
            }, text('09838839BD'))
        ]),
        h('section', {
            id: 'subjects'
        }, [
            h('button', {
                class: 'subjects'
            }, text('physics')),
            h('button', {
                class: 'subjects'
            }, text('biology')),
            h('button', {
                class: 'subjects'
            }, text('chemistry')),
            h('button', {
                class: 'subjects'
            }, text('english'))
        ]),
        h('section', {
            id: 'time'
        }, [
            h('p', {
                id: 'timetitle'
            }, text('Time left')),
            h('div', {
                class: 'time'
            }, text('100:00'))
        ]),
        h('button', {
            id: 'submit'
        }, text('submit'))
    ])
;
const range = (end)=>[
        ...Array(end + 1).keys()
    ].filter((x)=>x > 0
    )
;
const panel = (number)=>range(number).map((x)=>h('button', {
            class: 'btn',
            value: x,
            onclick: jump
        }, text(x))
    )
;
const layout = (data, count)=>[
        burger1(),
        sidebar(),
        h('div', {
            id: 'questionarea'
        }, [
            question(data[count], count + 1),
            h('section', {
                id: 'panel'
            }, panel(data.length))
        ])
    ]
;
var url = `http://0.0.0.0:3000/questions/english/2006.json`;
const Http = new XMLHttpRequest();
Http.open("GET", url);
Http.send();
var data = [];
Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(Http.responseText);
        app1({
            init: {
                data: data,
                count: 0
            },
            view: ({ data: data1 , count  })=>h1('main', {
                    id: 'background'
                }, layout(data1, count))
            ,
            node: document.getElementById("app")
        });
    }
};
