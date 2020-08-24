<template>
  <div class="home">
    <DateInfo></DateInfo>
  </div>
</template>

<script>
// @ is an alias to /src
import DateInfo from '@/components/DateInfo.vue'

export default {
  name: 'Home',
  components: {
    DateInfo
  }
}
</script>
