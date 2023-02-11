<template>
    <div class="ma-2">
        <v-breadcrumbs :items="breadcrumbsItems" density="comfortable">
            <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>

        <div id="content" class="mx-4">
            <p class="text-h6 mb-6">{{ title }}</p>
            <v-card>
                <v-card-text class="ma-4">
                    <v-row>
                        <v-col cols="6">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    <p>Fee type Name <span class="text-red">*</span></p>
                                </v-col>

                                <v-col cols="8">
                                    <v-text-field :disabled="title === 'Fee Type Details'" density="compact" style="width: 300px;" variant="outlined" v-model="form.name" />
                                </v-col>

                                <v-col cols="4">
                                    <p>Description</p>
                                </v-col>

                                <v-col cols="8">
                                    <v-textarea :disabled="title === 'Fee Type Details'" density="compact" variant="outlined" v-model="form.description" />
                                </v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="6">
                            <v-card flat color="#F3F4F4" class="mx-4" rounded="lg">
                                <v-card-text class="ma-2">
                                    <p class="text-subtitle-2 mb-2">For Interface Purpose</p>
                                    <v-row no-gutters>
                                        <v-col cols="4">
                                            <p class="mt-2">Fee type Code <span class="text-red">*</span> <span> <v-icon class="mt-n4" size="x-small" color="red">mdi-information-outline</v-icon></span></p>
                                        </v-col>

                                        <v-col cols="8">
                                            <v-text-field :disabled="title === 'Fee Type Details'" hide-details bg-color="white" density="compact" style="width: 200px;" variant="outlined" v-model="form.code" />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            
            <div id="action-btn" class="mt-3 d-flex flex-row">
                <v-btn
                v-if="title!== 'Fee Type Details'"
                color="#027F71"
                class="text-white mr-4"
                flat
                width="80"
                @click="save()"
                >
                    SAVE
                </v-btn>
                <v-btn
                flat
                color="#333333"
                variant="outlined"
                width="80"
                @click="back()"
                >
                    CANCEL  
                </v-btn>
            </div>
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
import { store } from '@/store/store'


export default{
    data(){
        return{
            store,
            title: 'Create Fee Type',
            currentCode: '',
            snackbar: false,
            text: '',
            breadcrumbsItems: [
                { title: 'Master Data Management', href: '/', color: '#818181', disabled: true },
                { title: 'Fee Type', href: '/', color: '#818181', disabled: false },
                { title: 'Create Fee Type', href: '/', color: '#E84D0E', disabled: true },
            ],
            form: {
                code: '',
                name: '',
                description: '',
                status: 'Active',
            },
            tab: 0,
        }
    },

    mounted(){
        if(this.$route.params.code){
            this.title = this.$route.params.mode === 'view' ? 'Fee Type Details' : 'Edit Fee Type'
            this.breadcrumbsItems[2].title = this.title
            this.currentCode = parseInt(this.$route.params.code)

            let found = store.feeTypeList.find(el => el.code === this.currentCode)
            this.form.code = found.code
            this.form.name = found.name
            this.form.description = found.description
        }
    },

    methods: {
        isCodeUnique(){
            let obj = store.feeTypeList.find(el => el.code === parseInt(this.form.code))
            if(obj && this.currentCode !== parseInt(obj.code))
                return false

            return true
        },
        back(){
            this.$router.push('/')
        },
        save(){
            if(!this.form.code || !this.form.name){
                this.snackbar = true
                this.text = '* Field must be filled'
            } else if(isNaN(this.form.code)){
                this.snackbar = true
                this.text = 'Fee Type Code must be number value'
            } else if(!this.isCodeUnique()){
                this.snackbar = true
                this.text = 'Fee Type Code already used, please input another code !'
            } else if(this.currentCode !== ''){
                store.updateItem(this.form)

                this.$router.push('/')
            } else{
                store.createItem(this.form)

                this.$router.push('/')
            }
        }
    }
    
}
</script>