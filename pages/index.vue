<template>
  <section class="container">
    <welcome-screen />
    <about-me-screen />
    <skills-screen />
    <works-screen />
    <share-screen />
  </section>
</template>

<script>
import WelcomeScreen from '~/components/WelcomeScreen.vue'
import AboutMeScreen from '~/components/AboutMeScreen.vue'
import SkillsScreen from '~/components/SkillsScreen.vue'
import WorksScreen from '~/components/WorksScreen.vue'
import ShareScreen from '~/components/ShareScreen.vue'

export default {
  components: {
    WelcomeScreen,
    AboutMeScreen,
    SkillsScreen,
    WorksScreen,
    ShareScreen
  }
}
</script>

<style scoped></style>
