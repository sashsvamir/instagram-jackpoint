const styles = require('./styles.sass')
import list from './users'
import Slider from './slider'




const app = document.querySelector('#app')

const btnStart = app.querySelector('.btn.start')
const btnFinish = app.querySelector('.btn.finish')
const wrapper = app.querySelector('.wrapper')



const slider = new Slider({ wrapper, list })

btnStart.addEventListener('click', () => {
  slider.toggleAnimation()
})

btnFinish.addEventListener('click', () => {
  slider.finishAnimation()
})


