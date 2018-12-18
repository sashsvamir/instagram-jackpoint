const confetti = require('canvas-confetti')

class Fireworks {

  /**
   * long aside fireworks
   * @param {Number} duration animation, default: 1 sec
   */
  fireworksAside (duration) {
    duration = duration || 1 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        startVelocity: 90,
        // spread: 500,
        origin: {
          x: 0,
          y: .9,
        },
        // colors: ['#bb0000', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        startVelocity: 90,
        // spread: 500,
        origin: {
          x: 1,
          y: .9,
        },
        // colors: ['#bb0000', '#ffffff']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  /**
   * fireworks in center
   * @param {Number} duration animation, default: 3 sec
   */
  fireworksCenter (duration) {
    duration = duration || 5 * 1000
    const ms = 600

    const fire = () => {
      const min = .3
      const max = .7
      confetti({
        particleCount: 150,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: (Math.random() * (max - min)) + min,
          y: (Math.random() * (max - min)) + min,
        }
      })
    }

    // loop
    let i = 0
    const interval = setInterval(() => {
      if (i * ms > duration) {
        clearInterval(interval)
      } else {
        fire()
        i++
      }
    }, ms)
  }

}

module.exports = Fireworks