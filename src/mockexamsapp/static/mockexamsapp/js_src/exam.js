import { h, text} from "https://unpkg.com/hyperapp"

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

app({
    init : {data : examinfo},
    view : ({ data }) =>
        h('main', {id : 'background'}, exampanel(data)),
    node: document.getElementById("app"),
})