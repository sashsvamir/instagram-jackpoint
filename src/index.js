const styles = require('./styles.sass')
import list from './users'
import Slider from './slider'




const app = document.querySelector('#app')

const btnStart = app.querySelector('.btn.start')
const btnFinish = app.querySelector('.btn.finish')
const wrapper = app.querySelector('.wrapper')

// append slides to wrapper
const slides = document.createElement('div')
slides.classList.add('slides')
list.forEach(slide => {
  const el = document.createElement('div')
  el.classList.add('slide')
  el.innerHTML = `<span class="name">${slide.name}</span>`
  el.setAttribute('data-name', slide.name)
  slides.appendChild(el)
})
wrapper.appendChild(slides)


const slider = new Slider({ wrapper })

btnStart.addEventListener('click', () => {
  slider.toggleAnimation()
})

btnFinish.addEventListener('click', () => {
  slider.finishAnimation()
})


