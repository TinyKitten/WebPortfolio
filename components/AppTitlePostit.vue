<template>
  <div class="titlePostit">
    <img
      class="titlePostitBg"
      src="~/assets/vertical-postit.svg"
      :alt="`${title}${subtitle}`"
    />
    <div class="titleText">
      <p class="appName">{{ title }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    subtitle: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
.titlePostit {
  position: absolute;
  top: 0;
  left: 32px;
}
.titlePostitBg {
  position: relative;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.16));
}
.titleText {
  position: absolute;
  left: auto;
  right: auto;
  top: auto;
  bottom: calc(50% - 10.5px);
  width: 100%;
  text-align: center;
  line-height: 1.2;
}
.appName {
  font-weight: bold;
  color: #03a9f4;
  font-size: 1.25rem;
}
.subtitle {
  color: #555;
  font-weight: bold;
  font-size: 1rem;
}
</style>
