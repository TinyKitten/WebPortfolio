<template>
  <section class="container">
    <app-title-postit
      v-if="visible"
      class="titilePostit"
      title="TinyKitten"
      subtitle="のスキル"
    />
    <div class="content">
      <div v-if="visible" class="skills">
        <app-skill-circle
          :image-path="require('~/assets/marks/js.svg')"
          skill-name="JavaScript"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/angular.svg')"
          skill-name="Angular"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/vue.svg')"
          skill-name="Vue.js"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/react.svg')"
          skill-name="React.js"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AppTitlePostit from '~/components/AppTitlePostit.vue'
import AppSkillCircle from '~/components/AppSkillCircle.vue'
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppTitlePostit,
    AppSkillCircle
  },
  mixins: [scrollMixin]
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
}

.content {
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.skills {
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 32px;
  animation: tipsPostitAnimation 1s ease forwards;
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

@keyframes tipsPostitAnimation {
  from {
    opacity: 0;
    transform: translateY(-32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
