import Route from 'ember-route'
export default Route.extend({
  activate() {
    if (typeof FastBoot === 'undefined') {
      let preloaderEl = document.getElementById('preloader')
      preloaderEl.parentNode.removeChild(preloaderEl)
    }
  }
})
