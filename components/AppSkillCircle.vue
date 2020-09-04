<template>
  <div class="skill">
    <div class="skillImageWrapper">
      <img :src="imagePath" :alt="skillName" class="skillImage" />
    </div>
    <p class="skillName">{{ skillName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imagePath: {
      type: String,
      required: true
    },
    skillName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.skill {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.skillImageWrapper {
  overflow: hidden;
  background: #fff;
  width: 120px;
  height: 120px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}

.skillImage {
  width: 50%;
  height: auto;
}

.skillName {
  color: #555;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>
