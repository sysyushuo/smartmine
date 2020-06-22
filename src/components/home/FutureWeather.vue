<template>
    <div class="nn-bg">
        <div class="content">
            <div class="cc">
                <div id="myCharts5" v-show="a" ref="myCharts5"></div>
                <div class="tianqi" v-show="c">
                    <div class="weather" v-for="(item,index) in all">
                        <p><img style="width:37px;height:37px;margin-bottom:3px;" :src="imgs[item.wea_img]" alt=""></p>
                        <p style="height:40px;width:52px;">{{item.wea}}</p>
                        <p style="width:52px;">{{wtime1[index]}}</p>
                    </div>
                </div>
            </div>
            <p class="spa">
                <span :class="{'sets':a}" @click="set(1)">温度</span>
                <span :class="{'sets':c}" @click="set(3)">天气</span>
            </p>
        </div>
    </div>
</template>
<script>
var b = [],
  c = [],
  d = [],
  e = [],
  f = [],
  g = [],
  h = [],
  x = [],
  y = [],
  z = [],
  w = [];
export default {
  name: "FutureWeather",
  components: {},
  data: function() {
    return {
      title: "7日天气",
      a: true,
      b: false,
      c: false,
      wtime1: [],
      wtemh: [],
      wteml: [],
      wtemp: [],
      all: [],
      itimer: null,
      //天气类型图标
      imgs: {
        xue: "./img/home/snow.png",
        lei: "./img/home/ray.png",
        shachen: "./img/home/shachen.png",
        wu: "./img/home/frog.png",
        bingbao: "./img/home/rain2.png",
        yun: "./img/home/cloud.png",
        yu: "./img/home/rain.png",
        yin: "./img/home/yin.png",
        qing: "./img/home/sun.png"
      }
    };
  },
  created() {},
  methods: {
    set(x) {
      if (x == 1) {
        this.a = true;
        this.b = false;
        this.c = false;
      }
      if (x == 2) {
        this.a = false;
        this.b = true;
        this.c = false;
      }
      if (x == 3) {
        this.a = false;
        this.b = false;
        this.c = true;
      }
      console.log(this.a);
    },
    //查询数据
    querytianqi() {
      this.axios({
        method: "get",
        url:
          "www/api?version=v1&appid=42685632&appsecret=Wn7gHSug&cityid=101180112"
      }).then(res => {
        // console.log(res);
        let a = res.data.data;
        //console.log(a);
        this.all = a;
        for (var i = 0; i < a.length; i++) {
          b.push(a[i].day);
        }
        for (var i = 0; i < a.length; i++) {
          z.push(a[i].humidity);
        }
        for (var i = 0; i < a.length; i++) {
          c.push(a[i].tem1);
        }
        for (var i = 0; i < c.length; i++) {
          e.push(c[i].split("℃")[0]);
        }
        for (var i = 0; i < a.length; i++) {
          d.push(a[i].tem2);
        }
        for (var i = 0; i < d.length; i++) {
          h.push(d[i].split("℃")[0]);
        }
        for (var i = 0; i < a.length; i++) {
          g.push(a[i].date);
        }
        for (var i = 0; i < g.length; i++) {
          let dateStr =
            parseInt(g[i].split("-")[1]) +
            "-" +
            parseInt(g[i].split("-")[2]) +
            "";
          f.push(dateStr);
        }
        this.wtime1 = f;
        this.wteml = h;
        this.wtemh = e;
        //渲染图表
        this.tianqi();
      });
    },

    //渲染未来几日温度走势图
    tianqi() {
      console.log("打印查看是否更新");
      var tianqis = this.$echarts.init(document.getElementById("myCharts5"));
      let option = {
        animation: true,
        animationDuration: 3500,
        animationDelay: 1000,
        backgroundColor: "",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#fff"
            }
          },
          formatter: function(x) {
            return (
              x[0].name +
              "<br>" +
              x[0].seriesName +
              ":" +
              x[0].data +
              "℃" +
              "<br>" +
              x[1].seriesName +
              ":" +
              x[1].data +
              "℃"
            );
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          top: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#425cab"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a2b2db",
                fontSize: "12"
              }
            },
            data: this.wtime1
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位（%）",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#425cab"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a2b2db",
                fontSize: "12"
              }
            },
            splitLine: {
              lineStyle: {
                type: "solid",
                color: "#425cab"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#425cab"
              }
            }
          }
        ],
        series: [
          {
            name: "最高温度",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(16,97,204, 0.3)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(17,235,210, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(205,52,42,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(235,235,21,1)"
                  }
                ])
              },
              emphasis: {
                color: "rgb(0,196,132)",
                borderColor: "rgba(0,196,132,0.2)",
                extraCssText: "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                borderWidth: 10
              }
            },
            data: this.wtemh
          },
          {
            name: "最低温度",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(205,52,42, 0.5)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(235,235,21, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(126,927,204,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(127,235,210,1)"
                  }
                ])
              },
              emphasis: {
                color: "rgb(99,250,235)",
                borderColor: "rgba(99,250,235,0.2)",
                extraCssText: "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                borderWidth: 10
              }
            },
            data: this.wteml
          }
        ]
      };
      tianqis.clear();
      tianqis.setOption(option);
    }
  },
  mounted() {
    this.querytianqi();
  },
  beforeDestroy() {
    clearInterval(this.itimer);
    this.itimer = null;
  }
};
</script>
<style scoped>
.nn-bg {
  position: relative;
  width: 374px;
  height: 208px;
}

.weather {
  margin: 10px !important;
  width: 30px !important;
  height: 100px !important;
}

.content {
  overflow: hidden;
  padding-top: 30px;
  position: relative;
}

.tit {
  position: absolute;
  color: #ffffff;
  top: 12px;
  left: 48px;
  font-family: Microsoft YaHei;
  font-weight: 300;
}

.cc {
  color: white;
  display: flex;
  padding-top: 30px;
  /* justify-content: space-around; */
  /* align-items: center; */
  width: 100%;
  height: 86%;
}

.cc div {
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
  width: 100%;
  height: 130px;
}

.spa {
  position: absolute;
  top: 48px;
  left: 20px;
  width: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.spa span {
  display: inline-block;
  width: 28px;
  font-size: 12px;
  height: 16px;
  border: 1px solid #5b6cc6;
  padding: 3px;
  color: #fff;
  margin-left: 3px;
  cursor: pointer;
  text-align: center;
}

.sets {
  border-color: #44a8d2 !important;
  color: #44a8d2 !important;
  /* boder */
}

.tianqi {
  margin-left: 0px !important;
  /* border: 1px solid black; */
  margin-top: 20px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tianqi p {
  width: 42px;
  margin-top: 3px !important;
  text-align: center;
  margin-top: -2px;
}
</style>
