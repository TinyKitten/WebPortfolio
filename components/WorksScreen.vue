<template>
  <section class="container">
    <app-title-postit
      v-if="visible"
      class="titilePostit"
      title="TinyKitten"
      subtitle="が作ったよ"
    />
    <works-train-l-c-d />
    <works-team-kitten />
    <works-near-station />
  </section>
</template>

<script>
import { scrollMixin } from '~/mixins/scroll'
import AppTitlePostit from '~/components/AppTitlePostit.vue'
import WorksTeamKitten from '~/components/works/WorksTeamKitten.vue'
import WorksTrainLCD from '~/components/works/WorksTrainLCD.vue'
import WorksNearStation from '~/components/works/WorksNearStation.vue'

export default {
  components: {
    AppTitlePostit,
    WorksTeamKitten,
    WorksTrainLCD,
    WorksNearStation
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
