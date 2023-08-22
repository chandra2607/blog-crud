<template>
    <div class="flex gap-4">
        <a :href="item.url" class="font-bold text-lg" v-for="(item,key) in items" :key="key">
        {{ item.title }}
        </a >
    </div>
</template>

<script>
// import {ref} from 'vue'
export default{
    setup(){
        let items=[
            {'title':'BLOG',url:""},
            {'title':'ABOUT',url:""},
            {'title':'AUTHORS',url:""},
            {'title':'PRICING',url:""},
            {'title':'CONTACT',url:""},
        ]
        return {items}
    }
    
}
</script>

<style lang="scss" scoped>

</style>