<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <pageTools :show-before="true">
      <template #before>
        <span>123333</span>
      </template>
      <template #after>
        <span>1244444</span>
      </template>
    </pageTools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
