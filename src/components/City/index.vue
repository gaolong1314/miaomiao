<template>
  <div class="city_body">
    <!-- <div class="cityInfo"> -->
    <div class="city_list">
      <Loading v-if="loading" />
      <Scroll v-else class="scroll" ref="scroll" :tap="true">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotList"
                :key="item.id"
                @tap="handleToCity(item.nm, item.id)"
              >
                {{ item.nm }}
              </li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="(item1, index) in cityList" :key="index">
              <h2>{{ item1.index }}</h2>
              <ul>
                <li
                  v-for="(item2, index) in item1.list"
                  :key="index"
                  @tap="handleToCity(item2.nm, item2.id)"
                >
                  {{ item2.nm }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
    <!-- </div> -->

    <div class="city_index">
      <ul>
        <li
          v-for="(item3, index) in cityList"
          :key="index"
          @touchstart="handToIndex(index)"
        >
          {{ item3.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/Scroller/Scroll";
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      loading: true
    };
  },
  components: {
    Scroll
  },
  mounted() {
    var cityList = window.localStorage.getItem("cityList");
    var hotList = window.localStorage.getItem("hotList");

    if (cityList && hotList) {
      this.cityList = JSON.parse(cityList);
      this.hotList = JSON.parse(hotList);
      this.loading = false;
    } else {
      this.$axios
        .get("/api/cityList")
        .then(result => {
          var msg = result.data.msg;
          if (msg === "ok") {
            var cities = result.data.data.cities;
            var { cityList, hotList } = this.formatCityList(cities);
            this.cityList = cityList;
            this.hotList = hotList;
            this.loading = false;
            window.localStorage.setItem("cityList", JSON.stringify(cityList));
            window.localStorage.setItem("hotList", JSON.stringify(hotList));
          }
        })
        .catch(err => {});
    }
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];

      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }

      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (tocom(firstLetter)) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }

      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function tocom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      console.log(cityList);
      return {
        cityList,
        hotList
      };
    },
    handToIndex(index) {
      console.log("2323");
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.scroll.scrollTo(0, -h2[index].offsetTop);
      // this.$refs.city_sort.parentElement.scrollTop = h2[index].offsetTop;
    },
    handleToCity(nm, id) {
      this.$store.state.city.nm = nm;
      this.$store.state.city.id = id;
      window.localStorage.setItem("nm", nm);
      window.localStorage.setItem("id", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  height: 100%;
  width: 100%;
}
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>