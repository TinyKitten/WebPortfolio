<template>
  <section class="container">
    <app-title-postit
      v-if="visible"
      class="titilePostit"
      title="TinyKitten"
      subtitle="が作ったよ"
    />
    <works-snovel />
    <works-osc-poster />
    <works-team-kitten />
  </section>
</template>

<script>
import { scrollMixin } from '~/mixins/scroll'
import AppTitlePostit from '~/components/AppTitlePostit.vue'
import WorksSnovel from '~/components/works/WorksSnovel.vue'
import WorksOscPoster from '~/components/works/WorksOscPoster.vue'
import WorksTeamKitten from '~/components/works/WorksTeamKitten.vue'

export default {
  components: {
    AppTitlePostit,
    WorksSnovel,
    WorksOscPoster,
    WorksTeamKitten
  },
  mixins: [scrollMixin]
}
</script>

<style scoped>
.container {
  overflow: hidden;
  position: relative;
  min-height: calc(100vh - 48px);
}

.titlePostit {
  animation: titlePostitAnimation 1s ease forwards;
}

/* Animation */
@keyframes titlePostitAnimation {
  from {
    transform: translateY(-147px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
