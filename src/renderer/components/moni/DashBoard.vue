<template>
  <div>
    <!--https://material.io/resources/icons/?style=baseline-->
    <v-toolbar height="35px">
      <v-spacer></v-spacer>
      <v-btn icon v-if="isEdit" @click="addItem('lineChart')">
        <v-icon>show_chart</v-icon>
      </v-btn>

      <v-btn icon v-if="isEdit" @click="addItem('barChart')">
        <v-icon>insert_chart_outlined</v-icon>
      </v-btn>

      <!--<v-btn icon v-if="isEdit" @click="addItem('table')">
        <v-icon>table_view</v-icon>
      </v-btn>-->

      <v-btn icon v-if="isEdit" @click="addItem('label')">
        <v-icon>label</v-icon>
      </v-btn>

      <v-btn icon v-if="isEdit" @click="addItem('label')">
        <v-icon>save_alt</v-icon>
      </v-btn>

      <v-btn icon v-if="isEdit" @click="isEdit=false">
        <v-icon>edit</v-icon>
      </v-btn>

      <v-btn icon v-if="!isEdit" @click="isEdit=true" >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-toolbar>

    <grid-layout
        :layout.sync="itemList" :col-num="colNum" :row-height="80" :is-draggable="true" :is-resizable="true" :is-mirrored="false"
        :vertical-compact="false" :responsive="true" :prevent-colllision="true" :margin="[5, 5]" :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent" @layout-created="layoutCreatedEvent">
      <grid-item v-for="item in itemList" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" :class="item.i">
          <v-flex md12 sm12>
            <v-card>
              <v-card-title  class="pb-0">
                <h1 class="title font-weight-thick">{{item.title}}</h1>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item v-for="set in settingMenu" :key="set.i">
                      <v-list-item-title>
                        <v-btn icon  @click="settingItem(set.id, item.i)"><v-icon>{{set.icon}}</v-icon></v-btn></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>

              <!--<p class="category d-inline-flex font-weight-light" id="ddd" v-bind:style="{height: (item.h*60)+'px'}">-->
                <line-chart v-if="item.type == 'lineChart'" :chart-data="item.data" :options="lineChartOption" :ref="'chart'+item.i"></line-chart>
                <bar-chart v-if="item.type == 'barChart'" :chart-data="item.data" :options="{responsive: true, maintainAspectRatio: false}"></bar-chart>
              <!--</p>-->
            </v-card>
          </v-flex>
      </grid-item>
    </grid-layout>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            <v-icon>mdi-delete-empty</v-icon>
          </v-card-title>
          <v-card-text>Item 을 삭제 하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" rounded small text @click="dialog = false">취소</v-btn>
            <v-btn color="success" rounded small text @click="dialog = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <dialog-item-setting v-if="isSetting" :options="itemOptions" :isSetting="isSetting" @completeSet="completeSet"></dialog-item-setting>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import lineChart from '../../components/core/chart/LineChart'
import barChart from '../../components/core/chart/BarChart'
import dialogItemSetting from '../../components/popup/DialogItemSetting'
/*import data from '../../components/setting.json'*/

import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: 'Dashboard',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    lineChart,
    barChart,
    dialogItemSetting
  },
  data () {
    return {
      colNum: 12,
      dialog: false,
      isEdit: false,
      isSetting: false,
      itemOptions: [],
      /*todo : localDb or Setting file*/
      settingMenu: [
        {id:'setting',title:'setting', icon:"settings"},
        {id:'delete',title:'delete', icon:"delete"},
      ],
      /*todo : localDb*/
      itemList: [
        {
          "socketConnect": "",
          "socketUrl": "http://localhost:8080/commonSocket",
          "socketType": "sockJs",
          "subscribeUrl": "/weight/MonitoringNB08",
          "x":0,
          "y":0,
          "w":4,
          "h":2,
          "i":"0",
          "minW":4,
          "type": "lineChart",
          "title": "11호기",
          "data":{
            "datasets": [
              {
                "data": []
              }
            ]
          }
        }
      ]
      ,
      lineChartOption:{
        animation: false,
        parsing:false,
        spanGaps : true,
        normalized:true,
        legend: {
          display: false
        },
        hover: {
          animationDuration: 0
        },
        elements: {
          line: {
            tension: 0, // disables bezier curves
            fill: false,
            /*stepped: false,*/
            borderDash: []
          }
        },
        tooltips:{
          enabled : false
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        scales: {
          xAxes: [{
            type:'time',
            autoSkip: true,
            time:{
              unit:'second',
              displayFormats: {
                second: 'HH:mm:ss'
              }
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              fontSize: 8,
              maxRotation: 0,
              minRotation: 0
            },
            distribution :'series',
            gridLines: {
              drawOnChartArea: false,
              color: 'rgb(192, 208, 224)'
            }
          }],
          yAxes: [{
            ticks:{
              stepSize :5,
              fontSize: 8
            },
            gridLines: {
              drawOnChartArea: false,
              color: 'rgb(192, 208, 224)'
            }
          }]
        }
      },
    }
  },
  computed: {
  },
  methods: {
    layoutCreatedEvent: function (newLayout) {
      console.log('Created layout: ', newLayout)
      //this.connSockJs(data[0])
     // setInterval(() => this.createTestData(), 1000);
    },
    settingItem(type, key){
      console.log(key)
      if(type=="setting"){
        this.isSetting=true;
        let itemIdx = this.itemList.findIndex(({i}) => i == key);
        this.itemOptions=this.itemList[itemIdx];
        console.log(":::::::::::");
        console.log(this.itemOptions);
      }else{
        this.dialog=true;
        this.deleteItem(key);
      }

    },
    createTestData(){
      let x = new Date();
      let y = Math.random() * (120 - 110) + 110;
      let obj = {x:x, y: y}
      let dataset1 = this.itemList[0].data.datasets[0].data;
      if(dataset1.length>10) {
        dataset1.shift();
      }
      dataset1.push(obj);
      this.itemList[0].data={
        /*  labels: label,*/
        datasets: [
          {
            label: "data",
            backgroundColor: "transparent",
            borderColor: "rgb(26,111,168)",
            borderWidth:1,
            pointBackgroundColor: "rgb(26,111,168)",
            data: dataset1
          }
        ]
      }
      let self = this;
      this.$refs["chart0"][0].renderChart(self.itemList[0].data,self.lineChartOption,80);
    },
    addItem(type) {
      let key = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
      this.itemList.push({
        "socketConnect": "",
        "socketUrl": "",
        "x": this.itemList.length * 4,
        "y": 2, //this.layout.length + (this.colNum || 12),
        "w": 4,
        "h": 2,
        "i": key,
        "minW":4,
        "type":type,
        "datasets": [
          {
            "data": []
          }
        ]
      });
      console.log(":::::::::::")
      console.log(key)
      console.log(JSON.stringify(this.itemList))
    },
    deleteItem(key){
      this.itemList.splice(this.itemList.findIndex(({i}) => i == key), 1);
      console.log(key)
    },
    layoutUpdatedEvent: function(newLayout){
      console.log("Updated layout: ", newLayout)
    },
    completeSet(param){
      console.log("::::::::::::::"+ data)
      this.isSetting = param.isSetting;
      this.connSockJs(param.data)
    },
    connSockJs(param){
      console.log(param)
      let socketUrl = param.socketUrl;
      let subscribeUrl = param.subscribeUrl;

      param.socket = new SockJS(socketUrl);
      param.stompClient = Stomp.over(param.socket);

      let self = this;
      param.stompClient.connect(
              {},
              frame => {
                console.log(frame)
                param.stompClient.subscribe(subscribeUrl, tick => {
                  self.setSocektData(param, JSON.parse(tick.body))
                  console.log(JSON.parse(tick.body))
                });
              },
              error => {
                console.log(error);
              }
      );
    },
    disconnect() {
      for(var idx in this.itemList.length){
        this.itemList[idx].stompClient.disconnect(function() {
          this.itemList[idx].data.datasets[0].data=[];
        });
      }
    },
    setSocektData(param, data){
      console.log(data.prodSpecInfo[0].lcl)
      let key = param.key
      let x = new Date();
      let y = data.colWeight[key][0]["weightVal"]
      let obj = {x:x, y: y}
      let dataset1 = param.data.datasets[0].data;
      if(dataset1.length>10) {
        dataset1.shift();
      }
      dataset1.push(obj);
      param.data={
        /*  labels: label,*/
        datasets: [
          {
            label: "data",
            backgroundColor: "transparent",
            borderColor: "rgb(26,111,168)",
            borderWidth:1,
            pointBackgroundColor: "rgb(26,111,168)",
            data: dataset1
          }
        ]
      }
      let self = this;
      this.$refs["chart0"][0].renderChart(param.data,self.lineChartOption,80);
    }
  }
}
</script>
<style scoped>
.vue-grid-item {
  height: fit-content!important;
}
</style>
