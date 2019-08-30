<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isloading" />
    <div v-else ref="bsWrapper" class="pulldown-bswrapper">
      <div class="pulldown-wrapper">
        <div v-show="beforePullDown">
          <span>下拉刷新</span>
        </div>
        <div v-show="!beforePullDown">
          <div v-show="isPullingDown">
            <span>加载中...</span>
          </div>
          <div v-show="!isPullingDown"><span>刷新成功</span></div>
        </div>
      </div>
      <ul>
        <li
          v-for="(item, index) in movieList"
          :key="index"
          @tap="handToDetail(item.id)"
        >
          <div class="pic_show">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2>{{ item.nm }}</h2>
            <p>
              观众评 <span class="grade">{{ item.sc }}</span>
            </p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { truncate } from "fs";
export default {
  name: "ComingSoon",
  methods: {
    handToDetail(itemID) {
      console.log("前往详情页" + itemID);
      // this.$router.push('detail/'+itemID);
      // this.$router.push({ name: "detail", params: { movieId: itemID } });
      this.$router.push({ path: `detail/2/${itemID}` });
    }
  },
  activated() {
    var cityId = this.$store.state.city.id;
    if (cityId === this.preCityId) {
      this.isloading = false;
      console.log("没有进行加载");
      return;
    }

    this.$axios
      .get("/api/movieComingList?cityId=" + cityId)
      .then(result => {
        this.movieList = result.data.data.comingList;
        this.isloading = false;
        this.preCityId = cityId;
        this.$nextTick(() => {
          var scroll = new BScroll(this.$refs.movie_body, {
            tap: true,
            scrollbar: true,
            pullUpLoad: true,
            // probeType: 1,
            pullDownRefresh: true
          });
          scroll.on("pullingDown", () => {
            this.isPullingDown = true;
            this.beforePullDown = false;
            setTimeout(() => {
              this.isPullingDown = false;
              setTimeout(() => {
                this.beforePullDown = true;
                scroll.finishPullDown();
              }, 1000);
            }, 2000);
          });
          // scroll.on('scroll',()=>{
          //   console.log('2222222222222222');
          // })
        });
      })
      .catch(err => {});
  },
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      isPullingDown: false,
      beforePullDown: true,
      isloading: true,
      preCityId: -1
    };
  }
};
</script>

<style lang="scss" scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}

.pulldown-bswrapper {
  position: relative;
  padding: 0 0px;
  border: 1px solid transparent;
}

.pulldown-wrapper {
  position: absolute;
  height: 40px;
  width: 100%;
  line-height: 40px;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
</style>