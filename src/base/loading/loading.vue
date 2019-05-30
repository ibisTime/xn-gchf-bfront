<template>
  <div class="loading" v-show="isLoading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      },
      isLoading: {
        type: Boolean,
        default: true
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "~common/scss/variable";

  .loading {
    position: fixed;
    left: 50%;
    top: 150px;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    font-size: 0;

    img {
      width: 0.48rem;
      height: 0.48rem;
    }

    .desc {
      line-height: 0.4rem;
      font-size: $font-size-small;
    }
  }
</style>
