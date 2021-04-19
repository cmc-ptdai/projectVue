<template>
  <div class="hello">
    <div class="hello__box">
      <h1>phong ml</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello {
    &__box {
      width: 100px;
      height: 100px;
      background-color: red;
      h1 {
        color: black;
      }
    }
  }
</style>
