<template>
    <v-navigation-drawer
      width="280"
      color="#027F71"
      expand-on-hover
      rail
      permanent
    >
      <v-list v-model:opened="openedMenu" class="drawer-list mt-4" density="compact" nav>
        <v-list-item prepend-icon="mdi-home-outline" title="Dashboard"></v-list-item>
        <v-list-group value="master">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="$masterDataManagement"
              title="Master Data Management"
              active-class="drawer-active-class"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="data in masterDataList"
            :key="data.id"
            :title="data.title"
            :value="data.title"
            :active="data.active"
            active-color="#FDC300"
            variant="plain"
            :ripple="false"
            @click="selectActiveMenu(data.id)"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      masterDataList: [
        { id: 1, title: 'Standard Mark-Up', active: 0 },
        { id: 2, title: 'Standard Service Fee', active: 0 },
        { id: 3, title: 'Fee Type', active: 1 },
        { id: 4, title: 'Frequent Traveler Program', active: 0 },
        { id: 5, title: 'Standard Ancillary Fee', active: 0 },
        { id: 6, title: 'Rating Type', active: 0 },
        { id: 7, title: 'Setup Flight Commision', active: 0 },
        { id: 8, title: 'Special Dates', active: 0 },
        { id: 9, title: 'Corporate Rating', active: 0 },
      ],
      openedMenu: ['master','Fee Type'],
    }
  },

  methods: {
    selectActiveMenu(dataID) {
      this.masterDataList.forEach(el => {
        if(el.id === dataID)
          el.active = 1
        else
          el.active = 0
      });

    }
  }
}
</script>

<style scoped>
.drawer-list .v-list-item {
  color: white;
}
.drawer-active-class {
  background-color: #FDC300;
}
.sub-drawer-active-class {
  color: #FDC300;
}
/* .drawer-list .v-list-item:hover {
  background-color: #FDC300;
} */
</style>