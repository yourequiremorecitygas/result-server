<template>
  <div class="content">
    <div class="md-layout">

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>devices</md-icon>
          </template>

          <template slot="content">
            <p class="category">Active Devices</p>
            <h3 class="title">{{activeDevices}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>info_outline</md-icon>
              현재 활성화된 모듈 개수 
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">Ongoing Devices</p>
            <h3 class="title">{{ongoingDevices}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>info_outline</md-icon>
              현재 검침중인 모듈 개수 
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Finished Devices</p>
            <h3 class="title">{{finishedDevices}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>info_outline</md-icon>
              검침 완료된 모듈 개수
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>watch_later</md-icon>
          </template>

          <template slot="content">
            <p class="category">{{currentDate}}</p>
            <h3 class="title">{{currentTime}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              현재시각
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">Tasks:</span>
            <md-tabs md-sync-route class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="검침하기" md-icon="forward">
                <div>
                  <md-table>
                    <md-table-row>
                      <md-table-cell>전체검침</md-table-cell>
                      <md-table-cell></md-table-cell>

                      <md-table-cell>
                        <md-button class="md-raised md-danger" @click="allGumchim">전체검침</md-button>
                      </md-table-cell>
                    </md-table-row>

                    <md-table-row>
                      <md-table-cell>지역검침</md-table-cell>
                      <md-table-cell>
                        <md-autocomplete v-model="selectedRegion" :md-options="activeRegion" md-dense>
                          <label>지역을 선택해주세요.</label>
                        </md-autocomplete>
                      </md-table-cell>

                      <md-table-cell>
                        <md-button class="md-raised md-danger" @click="regionGumchim">지역검침</md-button>
                      </md-table-cell>
                    </md-table-row>

                    <md-table-row>
                      <md-table-cell>개별검침</md-table-cell>
                      <md-table-cell>
                        <md-autocomplete v-model="selectedNode" :md-options="activeNode" md-dense>
                          <label>노드를 선택해주세요.</label>
                        </md-autocomplete>
                      </md-table-cell>

                      <md-table-cell>
                        <md-button class="md-raised md-danger" @click="nodeGumchim">개별검침</md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                </div>
              </md-tab>

              <md-tab id="tab-pages" md-label="유지보수" md-icon="code">
                <!-- <nav-tabs-table></nav-tabs-table> -->
                <div>
                  <md-table>
                    <md-table-row>
                      <md-table-cell>LED TEST</md-table-cell>
                      <md-table-cell>
                        <md-autocomplete v-model="selectedLED" :md-options="activeNode" md-dense>
                          <label>노드를 선택해주세요.</label>
                        </md-autocomplete>
                      </md-table-cell>

                      <md-table-cell>
                        <md-button class="md-raised md-danger" @click="turnLED(true)">켜기</md-button>
                        <md-button class="md-raised md-danger" @click="turnLED(false)">끄기</md-button>
                      </md-table-cell>
                    </md-table-row>

                    <md-table-row>
                      <md-table-cell>배터리 점검</md-table-cell>
                      <md-table-cell>
                        <md-autocomplete v-model="selectedBattery" :md-options="activeNode" md-dense>
                          <label>노드를 선택해주세요.</label>
                        </md-autocomplete>
                      </md-table-cell>

                      <md-table-cell>
                        <md-button class="md-raised md-danger" @click="readVCC">배터리 점검</md-button>
                      </md-table-cell>
                    </md-table-row>

                  </md-table>
                </div>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>


      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Latest Actions</h4>
            <p class="category">최근 작업 명령</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div>

    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  NavTabsTable2,
  OrderedTable
} from "@/components";
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },

  computed: {
    activeNode: function(){
      return this.$store.state.dashboard.activeRegion
    },
    activeRegion: function(){
      const acitveRegionArr = this.$store.state.dashboard.activeRegion
      const regionArr = Array.from(new Set(acitveRegionArr)).map(r => {
        const s = r.split("/")
        return `/${s[1]}/${s[2]}`
      })
      return regionArr
    },
    activeDevices: function(){
      return this.activeNode.length
    },
    ongoingDevices: function(){
      return this.$store.state.dashboard.ongoingNode.length
    },
    finishedDevices: function(){
      return this.$store.state.dashboard.finishedDevice.length
    }
  },

  data() {
    return {
      selectedRegion: "",
      selectedNode: "",
      selectedLED: "",
      selectedBattery: "",

      currentDate: "----/--/--",
      currentTime: "--:--:--",
    };
  },

  mounted: function(){

    this.$store.dispatch('dashboard/fetchLatestLog');

    const self = this

    setInterval(function(){
      const now = moment();
      self.currentDate = now.format('YYYY/MM/DD')
      self.currentTime = now.format('HH:mm:ss')
    }, 1000)
  },

  methods: {

    allGumchim: function(){
      this.activeNode.forEach(n => this.$mqtt.publish(n, 'AT'))
      this.$notify({
          message: "전체 검침 명령을 내렸습니다",
          icon: "add_alert",
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
      });
    },

    regionGumchim: function(){
      this.activeNode.filter(n => n.startsWith(this.selectedRegion)).forEach(n => this.$mqtt.publish(n, 'AT'))
      this.$notify({
          message: `지역 검침 명령을 내렸습니다 (${this.selectedRegion})`,
          icon: "add_alert",
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
      });
    },

    nodeGumchim: function(){
      this.$mqtt.publish(this.selectedNode, 'AT')
      this.$notify({
          message: `개별 검침 명령을 내렸습니다 (${this.selectedNode})`,
          icon: "add_alert",
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
      });
    },


    turnLED: function(on){
      const cmd = (on)? 'CT+' : 'CT-'
      const msg = (on)? "켭니다." : "끕니다."

      this.$mqtt.publish(this.selectedLED, cmd)
      this.$notify({
          message: `LED를 ${msg}`,
          icon: "add_alert",
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
      });
    },

    readVCC: function(){
      this.$mqtt.publish(this.selectedBattery, 'BT+')
    }

  }
};
</script>
