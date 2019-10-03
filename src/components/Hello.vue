<template>
  <div class="hello">
    <Header />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
export default {
  name: 'Hello',
  components: {
    Header
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
