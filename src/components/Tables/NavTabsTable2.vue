<template>
  <div>
    <md-table v-model="users" @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-just-icon md-simple md-primary">
            <md-icon>forward</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "nav-tabs-table2",
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
      ]
    };
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    }
  }
};
</script>
