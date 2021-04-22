<template>
  <div id="swiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide><img src="../../assets/p1.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../../assets/p2.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../../assets/p3.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../../assets/p4.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../../assets/p5.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../../assets/p6.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../../assets/p7.jpg" alt=""></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
  // require styles
  import '../../../node_modules/swiper/css/swiper.css'
  //
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'MySwiper',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          autoplay: {
            //用户操作后是否禁止自动循环
            disableOnInteraction: false,
            //自自动循环时间
            delay: 3000
          }, //可选选项，自动滑动
          //切换速度，即slider自动滑动开始到结束的时间（单位ms）
          speed: 2000,
          //循环切换
          loop: true,
          //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
          grabCursor: true,
          // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
          //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
          autoHeight: true,
           scrollbar: '.swiper-scrollbar',
          //设置为true时，能使用鼠标滚轮控制slide滑动
          mousewheelControl: true,
          //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
          observeParents: true,
          //分页器
          pagination: {
            el: '.swiper-pagination',
            // type : 'progressbar', //分页器形状
            clickable: true, //点击分页器的指示点分页器会控制Swiper切换
          },
           //导航
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style scoped>
  #swiper {
    font-size: 16px;
    width: 100%;
    height: 60%;
    background-color: lightcoral;
    text-align: center;
  }
  img{

    width: 600px;
    height: auto;
  }
</style>
