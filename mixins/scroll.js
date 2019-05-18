export const scrollMixin = {
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      if (!this.visible) {
        const top = this.$el.getBoundingClientRect().top
        this.visible = top < window.innerHeight / 1.5
      }
    }
  }
}
