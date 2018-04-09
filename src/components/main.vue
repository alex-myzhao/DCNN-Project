<template>
  <div class="main">
    <h1>Group Owner</h1>
  </div>
</template>

<script>
import GroupOwner from '@/kernels/groupOwner'

export default {
  name: 'Main',
  data () {
    return {
      imgData: null
    }
  },
  methods: {
    async loadImages () {}
  },
  created () {
    let go = new GroupOwner()
    go.testTF()
  }
}
</script>
