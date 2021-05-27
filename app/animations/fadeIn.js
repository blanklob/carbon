import { gsap } from 'GSAP'

function animation () {
  gsap.to('.title', {
    x: 400,
    duration: 3,
    onComplete: function() {
      console.log('Animation finished.')
    }
  })
}

export {
  animation
}

