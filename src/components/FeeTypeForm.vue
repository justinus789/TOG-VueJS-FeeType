<template>
    <div class="ma-2">
        <v-breadcrumbs :items="breadcrumbsItems" density="comfortable">
            <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>

        <div id="content" class="mx-4">
            <p class="text-h6 mb-6">{{ title }}</p>
        </div>
    </div>
</template>

<script>

export default{
    data(){
        return{
            title: 'Create Fee Type',
            breadcrumbsItems: [
                { title: 'Master Data Management', href: '/', color: '#818181', disabled: true },
                { title: 'Fee Type', href: '/', color: '#818181', disabled: false },
                { title: 'Create Fee Type', href: '/', color: '#E84D0E', disabled: true },
            ],
        }
    },
    mounted(){
        if(this.$route.params.code){
            this.title = this.$route.params.mode === 'view' ? 'Fee Type Details' : 'Edit Fee Type'
            this.breadcrumbsItems[2].title = this.title

        }
    }
    
}
</script>