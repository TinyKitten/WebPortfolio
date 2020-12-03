<template>
  <div class="praiseButton">
    <button class="button" @click="handleClick()">
      {{ clicked ? 'ありがとう！' : 'ほめる' }}
    </button>
    <div class="balloon">
      {{ count }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    clicked: false
  }),
  methods: {
    ...mapActions({
      incrementCount: 'praise/incrementCountAsync'
    }),
    handleClick () {
      this.incrementCount()
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.praiseButton {
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
}

.balloon {
  display: inline-block;
  position: relative;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 14px 0;
  font-size: 1.2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-radius: 8px;
  color: #707070;
  margin-top: 14px;
  text-align: center;
  width: 210px;
}

.button {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  min-width: 210px;
  height: 48px;
  font-size: 1.2rem;
  border-radius: 1px;
  cursor: pointer;
  transition: 0.25s;
  background: #008ffe;
}

.button:focus {
  outline: none;
}

.button:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}

@media (min-width: 800px) {
  .praiseButton {
    flex-direction: row;
  }
  .balloon {
    position: absolute;
    left: 220px;
    margin-top: 0;
    width: auto;
    padding: 14px;
  }
}
</style>
