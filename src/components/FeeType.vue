<template>
  <div class="ma-2">
    <v-breadcrumbs :items="breadcrumbsItems" density="comfortable">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <div id="content" class="mx-4">
      <p class="text-h6 mb-6">Fee Type</p>

      <v-row no-gutters class="mb-3">
        <v-col cols="3">
          <v-text-field
            density="compact"
            variant="outlined"
            label="Search..."
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-col>
        
        <v-col cols="2">
          <p class="pa-2 ml-2 mr-12 text-subtitle-2" style="cursor: pointer" @click="() => isOpenFilter = !isOpenFilter">
            Advanced Options 
              <v-icon v-if="!isOpenFilter">
                mdi-chevron-double-down
              </v-icon>
              <v-icon v-else>
                mdi-chevron-double-up
              </v-icon>
          </p>
        </v-col>

        <v-col cols="7">
          <div class="d-flex justify-end mt-2">
            <v-tooltip text="Click to download" location="top">
              <template v-slot:activator="{ props : tooltip }">
                <v-btn
                  v-bind="tooltip"
                  size="x-small"
                  color="grey-darken-2"
                  icon="mdi-download"
                  class="mt-1"
                ></v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Click to print" location="top">
              <template v-slot:activator="{ props : tooltip }">
                <v-btn
                  v-bind="tooltip"
                  size="x-small"
                  color="grey-darken-2"
                  icon="mdi-printer"
                  class="mx-3 mt-1"
                ></v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Click to create" location="top">
              <template v-slot:activator="{ props : tooltip }">
                <v-btn
                  v-bind="tooltip"
                  prepend-icon="mdi-note-plus"
                  color="#F3C244"
                  class="text-none text-grey-darken-3 rounded-lg"
                  @click="() => {this.$router.push('/fee-type/create')}"
                >
                  Create New
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </v-col>

        <v-col v-if="isOpenFilter" cols="12" class="mt-3">
          <v-card
          rounded="lg"
          class="advanced-options-card" >
            <v-card-text>
              <div class="d-flex justify-space-between">
                <div id="filter-btn">
                  <p class="text-subtitle-2">Status</p>
                  <div id="filter-status-btn" style="width: 150px;margin-top: 5px;">
                    <v-select
                      bg-color="white"
                      density="compact"
                      v-model="filter"
                      :items="['Active','Inactive']"
                      variant="solo"
                      hide-details
                    ></v-select>
                  </div>
                </div>

                <div id="reset-btn">
                  <v-btn
                    size="small"
                    color="grey-darken-2"
                    icon="mdi-refresh"
                    class="mx-3 mt-1"
                    @click="filter = 'Active'"
                  ></v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="isSelectData" cols="12" class="mt-3">
          <div class="d-flex flex-row">
            <div class="dropdown-filter" style="width: 200px;">
              <v-select
                bg-color="#027F71"
                color="white"
                density="compact"
                v-model="status"
                :items="['Active','Inactive']"
                placeholder="UPDATE STATUS"
                variant="solo"
                hide-details
                @update:model-value="updateCheckedData"
              ></v-select>
            </div>

            <div class="ml-5">
              <v-btn 
                flat
                height="40"
                color="#027F71"
                class="text-white"
                @click="deleteCheckedData()" >
                Remove Fee Type
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <vue-good-table
      v-on:selected-rows-change="selectionChanged"
      ref="my-table"
      compactMode
      styleClass="vgt-table striped my-table"
      :columns="columns"
      :rows="feeTypeFilter"
      :select-options="{ enabled: true, selectOnCheckboxOnly: true, disableSelectInfo: true }"
      :pagination-options="paginationOptions" >
        <template #table-row="props">
          <span v-if="props.column.field == 'action'">
            <div class="d-flex justify-space-evenly">
              <v-tooltip text="Click to edit" location="top">
                <template v-slot:activator="{ props : tooltip }">
                  <v-icon @click="editData(props.row.code)" v-bind="tooltip" style="cursor: pointer" color="#3E40AE"> mdi-pencil-box-outline </v-icon>
                </template>
              </v-tooltip>

              <v-tooltip text="Click to view details" location="top">
                <template v-slot:activator="{ props : tooltip }">
                  <v-icon @click="viewData(props.row.code)" v-bind="tooltip" style="cursor: pointer" color="#3E40AE"> mdi-eye </v-icon>
                </template>
              </v-tooltip>

              <v-tooltip text="Click to delete" location="top">
                <template v-slot:activator="{ props : tooltip }">
                  <v-icon @click="deleteData(props.row.code)" v-bind="tooltip" style="cursor: pointer" color="#3E40AE"> mdi-delete </v-icon>
                </template>
              </v-tooltip>
              
            </div>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
      </vue-good-table>
    </div>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { store } from '../store/store.js'

// import the styles
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import router from '@/router';

export default {
  components: {
    VueGoodTable,
  },
  data() {
      return {
          store,
          snackbar: false,
          text: '',
          search: '',
          isOpenFilter: false,
          filter: 'Active',
          status: null,
          isSelectData: false,
          breadcrumbsItems: [
            { title: 'Master Data Management', href: '/', color: '#818181', disabled: true },
            { title: 'Fee Type', href: '/', color: '#E84D0E', disabled: true },
          ],
          columns : [
            { field: 'code', label: 'Fee Type Code', width: '15%', type: 'number', thClass: 'text-center', tdClass: 'text-left', },
            { field: 'name', label: 'Fee Type Name', width: '20%', thClass: 'text-center', }, 
            { field: 'description', label: 'Description' , width: '45%', thClass: 'text-center',},
            { field: 'status', label: 'Status', width: '8%', thClass: 'text-center', tdClass: 'text-center', },
            { field: 'action', label: 'Action', width: '12%', sortable: false, thClass: 'text-center',},
          ],
          paginationOptions: {
            enabled: true,
            mode: 'records',
            perPage: 5,
            position: 'bottom',
            perPageDropdown: [5, 10, 20, 50],
          }
      };
  },

  computed: {
    feeTypeFilter(){
      return this.store.feeTypeList.filter(el => {
        if(this.search !== "" && this.isOpenFilter){
          return (el.code.toString().toLowerCase().includes(this.search.toLowerCase()) ||
            el.name.toLowerCase().includes(this.search.toLowerCase()) ||
            el.description.toLowerCase().includes(this.search.toLowerCase()) ||
            el.status.toLowerCase().includes(this.search.toLowerCase())) 
            && 
            el.status.toLowerCase() === this.filter.toLowerCase()
        }else if(this.search !== ""){
          return el.code.toString().toLowerCase().includes(this.search.toLowerCase()) ||
            el.name.toLowerCase().includes(this.search.toLowerCase()) ||
            el.description.toLowerCase().includes(this.search.toLowerCase()) ||
            el.status.toLowerCase().includes(this.search.toLowerCase())
        }else if(this.isOpenFilter){
          return el.status.toLowerCase() === this.filter.toLowerCase()
        }else{
          return el
        }
      })
    }
  },

  methods: {
    selectionChanged() {
      if(this.$refs['my-table'].selectedRows.length) {
        this.isSelectData = true
      }
      else {
        this.isSelectData = false
        this.status = null
      }
    },
    updateCheckedData() {
      store.updateMultipleItem(this.$refs['my-table'].selectedRows,this.status)
      this.snackbar = true
      this.text = 'Selected Fee Type status updated !'
    },
    deleteCheckedData() {
      store.deleteMultipleItem(this.$refs['my-table'].selectedRows)
      this.snackbar = true
      this.text = 'Selected Fee Type deleted !'
    },
    viewData(code) {
      this.$router.push(`fee-type/view/${code}`)
    },
    editData(code) {
      this.$router.push(`fee-type/edit/${code}`)
    },
    deleteData(code) {
      var index = store.feeTypeList.findIndex(x => x.code === code)

      store.deleteItem(index)
      this.snackbar = true
      this.text = 'Fee Type deleted !'
    },
  }
}
</script>

<style scoped>
.advanced-options-card{
  height: 120px;
  background: #F5F7F9 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #3C46531A;
  border: 1px solid #C7CDD6D9;
  opacity: 1;
}
</style>

<style>
.dropdown-filter .v-field__input {
  color: white;
}

.vgt-table thead th {
  background: #027F71;
  color: white;
}

.vgt-table th.vgt-checkbox-col {
  background: transparent;
}

.vgt-wrap__footer {
  color: #4D4D4D;
  background: transparent;
}
</style>
