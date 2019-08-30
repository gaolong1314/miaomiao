<template>
  <div id="main">
    <Header title="喵喵电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link to="city" class="city_name" tag="div">
          <span>{{ $store.state.city.nm }}</span
          ><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link to="nowPlaying" class="hot_item" tag="div"
            >正在热映</router-link
          >
          <router-link to="comingSoon" class="hot_item" tag="div"
            >即将上映</router-link
          >
        </div>
        <router-link to="search" tag="div" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <Tabbar />
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Tabbar from "@/components/Tabbar";
import { messageBox } from "../../components/js";
import detail from "../Movie/detail";

export default {
  name: "Movie",
  components: {
    Header,
    Tabbar,
    detail
  },
  mounted() {
    this.$axios
      .get("/api/getLocation")
      .then(result => {
        console.log(result);
        var rs = result.data;
        if (rs.msg === "ok") {
          if (window.localStorage.getItem("id") == rs.data.id) return;
          messageBox({
            title: "定位",
            content: rs.data.nm,
            cancel: "取消",
            ok: "切换定位",
            handleOk() {
              window.localStorage.setItem("nm", rs.data.nm);
              window.localStorage.setItem("id", rs.data.id);
              window.location.reload();
            }
          });
        }
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}

.slide-enter-active {
  animation: 13s detailMove;
}
@keyframes detailMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>