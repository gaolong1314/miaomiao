<template>
  <div class="cinema_body">
    <Loading v-if="isloading" />
    <Scroll
      v-else
      ref="wrapper"
      class="scroll"
      :listenScroll="true"
      :pullup="true"
      :pulldown="true"
      :data="cinemaList"
      @scrollToEnd="scrollToEnd"
      @setScroll="setScroll"
      @beforeScroll="beforeScroll"
      @scroll="scroll"
      @pulldown="pulldown"
    >
      <ul>
        <li v-for="(item, index) in cinemaList" :key="index">
          <div>
            <span>{{ item.nm }}</span>
            <span class="q"
              ><span class="price">{{ item.sellPrice }}</span> 元起</span
            >
          </div>
          <div class="address">
            <span>{{ item.addr }}</span>
            <span>{{ item.distance }}</span>
          </div>
          <div class="card">
            <div
              v-for="(item1, index1) in item.tag"
              v-if="item1 === 1"
              :key="index1"
            >
              {{ item1 | passCard }}
            </div>
            <div>折扣卡</div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "../Scroller/Scroll";
export default {
  name: "CList",
  data() {
    return {
      cinemaList: [],
      isloading: true,
      preCityId: -1
    };
  },
  filters: {
    passCard(card) {
      return "折扣卡";
    }
  },
  activated() {
    var cityId = this.$store.state.city.id;
    console.log(cityId)
    console.log(this.preCityId)
    if (cityId === this.preCityId) {
      this.isloading = false;
      console.log("没有进行加载");
      return;
    }
    console.log("加载了");
    this.$axios
      .get("/api/cinemaList?cityId=" + cityId)
      .then(result => {
        console.log(result);
        if (result.data.msg === "ok") {
          this.isloading = false;
          this.cinemaList = result.data.data.cinemas;
          this.preCityId = cityId;
          console.log('进行复制' + this.preCityId)
        } else {
          this.isloading = true;
        }
      })
      .catch(err => {});
  },
  components: {
    Scroll
  },
  methods: {
    scrollToEnd(scroll) {
      this.scroll = scroll;
      console.log("下拉到最底下");
    },
    setScroll(scroll) {
      this.scroll = scroll;
      console.log("scroll创建成功");
    },
    scroll(pos) {
      console.log(pos); //监听滚动坐标
    },
    beforeScroll() {
      console.log("滚动之前");
    },
    pulldown() {
      console.log("下拉刷新1111111111");
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  height: 100%;
  // position: absolute;
  // left: 0;
  // top: 46px;
  // right: 0;
  // // bottom: 0px; //预留foot组件
  // overflow: auto;
}
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  padding-left: 10px;
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>