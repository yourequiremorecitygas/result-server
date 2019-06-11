<template>
  <div>
    <md-table v-model="users" @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>
          <md-autocomplete v-model="value" :md-options="countries" @md-changed="getCountries" @md-opened="getCountries">
            <label>Options</label>
            <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
          </md-autocomplete>
        </md-table-cell>

        <md-table-cell>
          <md-button class="md-raised md-danger">검침하기</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "nav-tabs-table",
  data() {
    return {
      selected: [],
      users: [
        {
          name: '전체 검침하기'
        },
        {
          name: "지역 검침하기"
        },
        {
          name: "개별 검침하기"
        }
      ],
      countryList: [
        {
          id: 1,
          name: 'Algeria'
        },
        {
          id: 2,
          name: 'Argentina'
        },
        {
          id: 3,
          name: 'Brazil'
        },
        {
          id: 4,
          name: 'Canada'
        },
        {
          id: 5,
          name: 'Italy'
        },
        {
          id: 6,
          name: 'Japan'
        },
        {
          id: 7,
          name: 'United Kingdom'
        },
        {
          id: 8,
          name: 'United States'
        }
      ],
      countries: []
      
    };
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    },
    getCountries (searchTerm) {
      debugger;
      this.countries = this.$store.state.dashboard.activeRegion
    }
  }
};
</script>
