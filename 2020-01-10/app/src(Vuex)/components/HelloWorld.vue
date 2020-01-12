<template>
  <div class="hello">
    <ch1></ch1>
    <ch2></ch2>
  </div>
</template>

<script>
import ch1 from './child1';
import ch2 from './chlid2';
export default {
  name: 'home',
  components: {
    ch1,
    ch2
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
