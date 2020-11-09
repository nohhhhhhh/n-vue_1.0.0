<template>
  <v-row justify="center">
    <v-dialog v-model="isSetting" persistent max-width="550px">
      <v-card>
        <v-card-title class="primary darken-2">
          <span class="headline"><v-icon>mdi-wrench</v-icon>  Setting</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6"  md="5">
                <v-select :items="arrItemType" label="item type*" required v-model="vItemType"></v-select>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="item title" v-model="vItemTitle"></v-text-field>
              </v-col>

              <v-col cols="12" v-if="vItemType=='label'">
                <v-text-field label="item value*" required></v-text-field>
              </v-col>

              <template v-if="vItemType=='lineChart'">
                <v-col cols="12" sm="4">
                  <v-select :items="arrSocketType" label="socket type*" required v-model="socketType"></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field label="socket Url*" required v-model="vSocketUrl"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" v-if="socketType!='sockJs'">
                  <v-text-field label="socket port*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" v-if="socketType=='sockJs'">
                  <v-text-field label="subscribe Url*" required v-model="vSubscribeUrl"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="key*" required v-model="vKey"></v-text-field>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="blue darken-1"
                  text
                  @click="$emit('completeSet', false)"
          >
            Close
          </v-btn>
          <v-btn
                  color="blue darken-1"
                  text
                  @click="SaveSetting"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'StepperItemSetting',
  props: ['options','isSetting'],
  data () {
    return {
      vItemType:'',
      vItemTitle:'',
      vSocketType:'',
      vSocketUrl:'',
      vSubscribeUrl:'',
      vKey:'',

      parentOptions:this.options,
      socketType:'',
      arrItemType:[
         {text:'table', value: 'table'}
        ,{text:'lineChart', value: 'lineChart'}
        ,{text:'barChart', value: 'barChart'}
        ,{text:'label', value: 'label'}
      ],
      arrSocketType:[
         {text:'sockJs', value: 'sockJs'}
        ,{text:'socket.io', value: 'socket.io'}
      ]
    }
  },
  mounted:function(){
   this.vItemType = this.options.type;
   console.log(this.isSetting);
  },
  methods:{
    SaveSetting(){
      this.parentOptions.socketUrl=this.vSocketUrl
      this.parentOptions.subscribeUrl=this.vSubscribeUrl
      this.parentOptions.title=this.vItemTitle
      this.parentOptions.key=this.vKey

      let param ={};
      param.data = this.parentOptions
      param.isSetting = false

     this.$emit('completeSet', param);
    },
  }
}
</script>
<style scoped>
.vue-grid-item {
  height: fit-content!important;
}
</style>
