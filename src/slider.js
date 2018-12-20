const anime = require('animejs')
const Fireworks = require('./fireworks')

const fireworks = new Fireworks()


class Slider {
  /**
   * wrapper: element container where was placed user list
   * users: array of user objects
   */
  constructor({ wrapper }) {

    this.wrapper = wrapper
    this.duration = 800
    this.isAnimating = false

    // create users-list
    this.slidesEl = wrapper.querySelector('.slides')
    this.slides = this.slidesEl.querySelectorAll('.slide') // ?? Array.from(arr)

    // get height of one slides block
    this.slideHeight = this.slides[0].offsetHeight + parseInt(window.getComputedStyle(this.slides[0]).marginBottom, 10)
    this.slidesHeight = this.slideHeight * this.slides.length

    // duplicate slides block
    this.createClones(2)

    // create animation (no autostart)
    this.anim = this.createLoopAnimation({ el: this.getSlides(), destination: this.slidesHeight })
    this.animFinish = null

    // create winner element
    this.winner = document.querySelector('.winner')
  }

  /**
   * get ofsset by Y of centered arrows
   * @return {Number}
   */
  getCenterOffset() {
    return this.wrapper.parentNode.offsetHeight / 2
  }

  /**
   * get current translateY offset of animation slides
   * @return {Number}
   */
  getTranslateY() {
    return parseFloat(anime.getValue(this.getSlides()[0], 'translateY'))
  }

  /**
   * get current pointer position on `slider`
   * @return {Number}
   */
  getPointerPos() {
    let pos = this.getCenterOffset() - this.getTranslateY()
    if (pos < 0) {
      while (pos < -(this.slidesHeight)) {
        pos += this.slidesHeight
      }
      pos = this.slidesHeight - Math.abs(pos)
    }
    return pos
  }

  /**
   * get slide, where arrows pointed
   * @return {Element}
   */
  getCurrentSlide() {
    // let offsetY = parseFloat(this.anim.animations[0].currentValue)
    const pos = this.getPointerPos()
    const index = Math.floor(pos / this.slideHeight)
    // console.log(index)
    return this.slides[index] // .getAttribute('data-name')
  }

  /**
   * calculate pointer offset relatively center of cell
   * @return {Number}
   */
  getDistantPointerToCenterCell () {
    // calculate pointer offset to led to center of cell
    const pos = this.getPointerPos()
    const offsetCell = pos % this.slideHeight
    return this.slideHeight / 2 - offsetCell
  }

  /**
   * show element with pointed cell
   */
  showWinner() {
    const currentSlide = this.getCurrentSlide()
    this.winner.appendChild(currentSlide.cloneNode(true))
    this.winner.style.transform = 'scale(1)'

    anime({
      targets: this.winner,
      scale: 2,
      // rotate: { value: '2turn'},
      loop: 7,
      direction: 'alternate',
      duration: 1000,
    })
  }

  /**
   * hide winner element
   */
  hideWinner() {
    const winner = this.winner.querySelector('.slide')
    if (winner) {
      winner.remove()
    }
  }

  /**
   * add N clones of `.slides` block
   * @param {Number} n times of clones slides block (default: 1)
   */
  createClones(n = 1) {
    // add n slides before main slides block
    for (let i = 1; i <= n; i++) {
      const block = this.slidesEl.cloneNode(true)
      // if first clone, set margin
      if (i === 1) {
        const offset = this.slidesHeight * n
        block.style.marginTop = `-${offset}px`
      }
      this.wrapper.insertBefore(block, this.slidesEl)
    }
  }

  /**
   * get `.slides` blocks
   */
  getSlides() {
    return this.wrapper.querySelectorAll('.slides')
  }

  /**
   * just create roll animation
   */
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

  /**
   * play finish animation on stop rolling
   */
  finishAnimation() {
    const targets = this.getSlides()

    // get distant offset to led to center of cell
    const distantToCenterCell = this.getDistantPointerToCenterCell()
    const translateY = 150 - distantToCenterCell

    this.animFinish = anime({
      targets,
      translateY: `+=${translateY}px`,
      duration: this.duration * 4,
      // easing: 'easeOutCirc',
      elasticity: 700,
      complete: () => {
        this.pause()
        this.showWinner()
        this.showFireworks()
        this.animFinish = null
      }
    })
  }

  /**
   * play/pause roll animation
   */
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
    this.hideWinner()
    // console.log('play')
  }

  pause() {
    this.anim.pause()
    this.isAnimating = false
    // console.log('pause')
  }

  showFireworks() {
    fireworks.fireworksAside()
    fireworks.fireworksCenter()
  }

}

module.exports = Slider
