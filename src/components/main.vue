<template>
  <div class="main">
    <h1>Group Owner</h1>
  </div>
</template>

<script>
import LocalInfer from '@/kernels/local-infer'

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
    let engine = new LocalInfer()
    engine.performInference()
  }
}
</script>
