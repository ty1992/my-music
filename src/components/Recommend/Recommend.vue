<template>
  <div>
    <slide>
      <div v-for="item in 5">
        {{item}}
        <!--<a :href="item.linkUrl">
          <img class="needsclick" @load="loadImage" :src="item.picUrl">
        </a>-->
      </div>
    </slide>
  </div>
</template>

<script>
    import slide from '@/base/Slide/Slide'
    export default {
      name: "recommend",
      components: {
        slide
      }
    }
</script>

<style scoped>

</style>
