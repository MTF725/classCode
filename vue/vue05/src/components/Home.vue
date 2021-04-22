<template>
  <transition name="lbt">
    <div id="home" v-if="isShow">
      <p>首页</p>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(v,i) in imgArr" :key="i">
            <img :src="v" alt="">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Swiper from 'swiper';
  import "../../node_modules/swiper/css/swiper.css";

  export default {
    name: "Home",
    mounted() {
      new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      })
    },
    data() {
      return {
        imgArr: [
          "https://place-hold.it/600x301",
          "https://place-hold.it/600x302",
          "https://place-hold.it/600x303",
          "https://place-hold.it/600x304",
          "https://place-hold.it/600x305",
          "https://place-hold.it/600x306"
        ],
        isShow: true
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.isShow = true;
      });
    },
    beforeRouteLeave(to, from, next) {
      this.isShow = false;
      next();
    }
  }
</script>

<style scoped>
  #home {
    width: 100%;
    height: 65%;
    background-color: lightpink;
  }

  .swiper-container {
    width: 600px;
    height: 300px;
  }

  .lbt-enter-active, .lbt-leave-active {
    transition: opacity 2s;
  }

  .lbt-enter, .lbt-leave-to
  {
    opacity: 0;
  }
</style>
