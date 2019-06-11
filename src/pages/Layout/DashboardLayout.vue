<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },

  mounted: function(){
    debugger;
    var that = this

    this.$mqtt.on('connect', function(){
      that.$mqtt.subscribe('/Seoul/#', function(err){
        if(!err){
          that.$notify({
            message: "처리서버에 연결되었습니다.",
            icon: "add_alert",
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          });
        }
      });
      that.$mqtt.subscribe('/stats/connected/#', function(err){
        debugger;
      })
    })

    this.$mqtt.on('offline', function(){
      debugger;
      that.$store.commit('dashboard/destoryData')
      that.$notify({
          message: "처리서버와 연결이 끊김",
          icon: "add_alert",
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'alert'
      });
    })

    this.$mqtt.on('message', function(topic, message){

      const payload = message.toString()

      if( topic.startsWith("/stats/connected/") ){
        const status = payload.split(":")

        switch(status[0]){
          case "0":
            that.$store.commit('dashboard/inactiveRegion', status[1])
            break;
          case "1":
            that.$store.commit('dashboard/activeRegion', status[1])
            break;
        }

      }

      if( payload.startsWith("AT+ONGOING") ){
        that.$store.commit('dashboard/ongoingDevice', topic)
        that.$store.dispatch('dashboard/insertLog', {
          cmd: `검침시작 (${topic})`, 
          date: Math.floor(new Date().getTime()/1000) })
      }
      
      if( payload.startsWith("AT+OCRRESULT") ){

        that.$store.commit('dashboard/finishedDevice', topic)
        
        const json = payload.replace("AT+OCRRESULT", "").trim()
        const data = { ...JSON.parse(json), region: topic }

        that.$store.dispatch('dashboard/insertLog', {
          cmd: `검침완료 (${topic}) : ${data['result'].join('')}`, 
          date: Math.floor(new Date().getTime()/1000) })
        
        that.$store.commit('dashboard/saveocr', data)

        const rdToPage = confirm(`검침이 완료 되었습니다. 검침 결과를 확인하시겠습니까? [${topic}]`)

        if( rdToPage ){
          that.$router.push('ocr')
        }

        that.$store.commit('dashboard/finishToActive', topic)

      } else {
        debugger;
        that.$notify({
          message: `[${topic}] ${payload}`,
          icon: "add_alert",
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        });
      }
    });

  }
};
</script>
