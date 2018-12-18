const anime = require('animejs')
const Fireworks = require('./fireworks')

const fireworks = new Fireworks()


class Slider {
  /**
   * wrapper: element container where was placed user list
   * users: array of user objects
   */
  constructor({ wrapper, list }) {
    this.duration = 800
    this.rootElement = wrapper
    this.isAnimating = false

    // create users-list
    this.slides = document.createElement('div')
    this.slides.classList.add('slides')

    // fill users-list by users
    list.forEach(slide => {
      const el = document.createElement('div')
      el.classList.add('slide')
      el.innerHTML = `<span class="name">${slide.name}</span>`
      this.slides.appendChild(el)
    })

    this.rootElement.appendChild(this.slides)

    // get height of one slides block
    this.height = this.slides.offsetHeight

    // duplicate slides block
    this.createClones(2)

    // create animation (no autostart)
    this.anim = this.createLoopAnimation({ el: this.getSlides(), destination: this.height })
  }

  /**
   * @param {Number} n times of clones slides block (default: 1)
   */
  createClones(n = 1) {
    // add n slides before main slides block
    for (let i = 1; i <= n; i++) {
      const block = this.slides.cloneNode(true)
      // if first clone, set margin
      if (i === 1) {
        const offset = this.height * n
        block.style.marginTop = `-${offset}px`
      }
      this.rootElement.insertBefore(block, this.slides)
    }
  }

  getSlides() {
    return this.rootElement.querySelectorAll('.slides')
  }

  createLoopAnimation({ el, destination}) {
    return anime({
      targets: el,
      translateY: [
        { value: destination, duration: this.duration },
      ],
      easing: 'linear',
      // duration: 2000,
      autoplay: false,
      loop: true,
      // update: anim => {
      // },
    })
  }

  createFinishAnimation({ el, destination }) {
    return anime({
      targets: el,
      translateY: [
        { value: destination, duration: this.duration * 4.5 },
      ],
      easing: 'easeOutQuint',
      // duration: 2000,
      // autoplay: false,
      loop: false,
      complete: () => {
        this.pause()
        this.fireworks()
      },
    })
  }

  finishAnimation() {
    // console.log('finish')
    // get current y pos
    const currentPosY = parseFloat(this.anim.animations[0].currentValue)
    let destination = currentPosY + this.height
    this.createFinishAnimation({ el: this.getSlides(), destination })
  }

  toggleAnimation() {
    if (this.isAnimating) {
      this.pause()
    } else {
      this.play()
    }
  }

  play() {
    this.anim.play()
    this.isAnimating = true
    // console.log('play')
  }

  pause() {
    this.anim.pause()
    this.isAnimating = false
    // console.log('pause')
  }


  fireworks() {
    fireworks.fireworksAside()
    fireworks.fireworksCenter()
  }

}

module.exports = Slider
