<template>
  <div class="px-5 py-2.5 bg-black w-full h-full rounded-md text-white">
    <p class="uppercase font-semibold text-2xl font-sans mb-2.5">Filter</p>
    <div class="relative mb-2.5">
      <div
      @click="handleDateFilter"
        class="py-2.5 text-center uppercase cursor-pointer w-full h-fit border-yellow-100 border-[0.25px] rounded-sm"
      >
      <p>Filter By Date <span>&#8595;</span></p>
    </div>
    <div class="absolute bg-black" :class="showDateFilters?'block z-[10]':'hidden z-[0]'">
        <div class="p-2 w-full text-base cursor-pointer hover:bg-white hover:text-black" @click="$emit('filterDate',1)">Yasterday</div>
        <div class="p-2 w-full text-base cursor-pointer hover:bg-white hover:text-black" @click="$emit('filterDate',7)">Last week</div>
    </div>
    </div>
    <div class="relative">
      <div
      @click="handleTitleFilter"
        class="py-2.5 text-center uppercase cursor-pointer w-full h-fit border-yellow-100 border-[0.25px] rounded-sm"
      >
      <p>Filter By Title <span>&#8595;</span></p>
    </div>
    <div class="absolute" :class="showTitleFilters?'block':'hidden'">
      <input type="text" v-model="searchText" @input="$emit('filterText',searchText)"  class="px-1.5 text-black mt-1.5 py-2 box-border w-full"/>
    </div>
    </div>
  </div>
</template>

<script setup>

const showDateFilters=ref(false)
const handleDateFilter=()=>{
  showDateFilters.value=!showDateFilters.value
}

const showTitleFilters=ref(false)
const handleTitleFilter=()=>{
  showTitleFilters.value=!showTitleFilters.value
}
const searchText=ref("")
</script>

<style lang="scss" scoped></style>
