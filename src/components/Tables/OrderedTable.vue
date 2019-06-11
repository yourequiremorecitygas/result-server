<template>
  <div>
    <md-table v-model="actions" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Command">{{ item.cmd }}</md-table-cell>
        <!-- <md-table-cell md-label="Result">{{ item.result }}</md-table-cell> -->
        <md-table-cell md-label="Datetime">{{ wrapTime(item.datetime) }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },

  methods: {
    wrapTime: function(date){
      const d = moment(date * 1000)
      
      return (d.year() !== 2019)? "" : d.format('YYYY/MM/DD HH:mm:ss')
    }
  },

  computed: {
    actions: {
        get () { return this.$store.state.dashboard.latestActions.reverse().slice(0, 6) },
        set (value) { this.tableData = value }
    }
  },

  data: ()=>{
    tableData: []
  }

};
</script>
