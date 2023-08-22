<template>
    <div class="px-2.5 py-4 rounded-xl " v-if="content!==''">
       <p class="text-xl text-center mb-2.5 tracking-normal font-bold font-mono italic">"{{ content }}"</p>
        <p class="uppercase tracking-wider text-sm font-bold font-mono text-center">{{ author }}</p>
    </div>
</template>

<script setup>
import quoteClient from "../clients/quoteClient";
const author=ref("")
const content=ref("")
const getQuote = async () => {
   
      try {
        const resp = await quoteClient.get("/random");
        console.log("Response is",resp.data.content)
        author.value=resp.data.author
        content.value=resp.data.content
      } catch (err) {
        console.error("", err.message);
      }
    };
    onMounted(async()=>{
        await getQuote()
    })
</script>

<style lang="scss" scoped>

</style>