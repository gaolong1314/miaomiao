<template>
  <div id="detailContainer" class="tran">
    <Header title="影片详情">
      <i class="iconfont icon-right" @click="goback"></i>
    </Header>
    <Loading v-if="isloading" />
    <div id="content" class="contentDetail" v-else>
      <div class="detail_list">
        <div
          class="detail_list_bg"
          :style="{
            'background-image':
              'url(' + detailMovie.img.replace(/w\.h/, '148.208') + ')'
          }"
        ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | setWH('120.180')" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.nm }}</h2>
            <p>{{ detailMovie.star }}</p>
            <p>{{ detailMovie.sc }}</p>
            <p>{{ detailMovie.cat }}</p>
            <p>{{ detailMovie.rt + "/" + detailMovie.src }}</p>
            <p>{{ detailMovie.pubDesc }}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{ detailMovie.dra }}
        </p>
      </div>
      <div class="detail_player swiper-container">
        <ul class="swiper-wrapper">
          <li
            class="swiper-slide"
            v-for="(item, index) in detailMovie.photos"
            :key="index"
          >
            <div>
              <img :src="item | setWH('120.180')" alt="" />
            </div>
            <p>陈建斌</p>
            <p>马先勇</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

export default {
  name: "detail",
  components: {
    Header
  },
  data() {
    return {
      detailMovie: null,
      isloading: true
    };
  },
  props: ["movieId"],
  mounted() {
    this.$axios
      .get("/api/detailmovie?movieId=" + this.movieId)
      .then(result => {
        if (result.data.msg) {
          this.detailMovie = result.data.data.detailMovie;
          (this.isloading = false),
            this.$nextTick(() => {
              var mySwiper = new Swiper(".swiper-container", {
                autoplay: true, //可选选项，自动滑动
                effect: "coverflow",
                delay: 1000,
                autoHeight: true
                // freeMode : true,
                // freeModeSticky:true
              });
            });
        }
      })
      .catch(err => {});
  },
  methods: {
    goback() {
      // this.$router.go(-1);
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.tran {
  animation: showDetail 0.3s ease;
}
@keyframes showDetail {
  0% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}
#detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
  display: flex;
  flex: 1;
  flex-direction: column;
}
#content {
  top: 50px;
  bottom: 0px;
  width: 100%;
  flex: 1;
  overflow: hidden;
  margin-bottom: 50px;
  position: absolute;
  display: flex;
  flex-direction: column;
}

#content.contentDetail {
  display: block;
  margin-bottom: 0;
  overflow: auto;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: url(../../../public/images/movie_1.jpg) 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}

#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  // margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>