<template>
  <div
    class="flex lg:flex-row items-center pb-2.5 border-b-2 border-black mb-2.5"
  >
    <LeftMenu />
    <h1 class="uppercase m-auto tracking-wide font-extralight text-3xl">
      FreeVibes
    </h1>
    <SocialIcons>
      <Fb />
      <Twitter />
      <Yt />
      <Insta />
    </SocialIcons>
  </div>
  <div class="flex gap-2.5 mb-5 items-center flex-col lg:flex-row">
    <h1 class="lg:min-w-[60%] text-7xl flex-1 uppercase font-bold flex-grow">
      the art Magazine
    </h1>
    <p class="font-mono font-medium tracking-wide">
      Lorem aspernatur culpa libero sapiente! Quia beatae expedita aliquid rem
      in omnis pariatur at voluptatibus? Ad in saepe provident dolore sequi? Ad
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas odit ullam
      et reprehenderit. Adipisci deleniti explicabo debitis neque assumenda vero
      earum atque rem est iste quaerat, aliquid ea quod officiis?
    </p>
  </div>
  <div class="items-center flex flex-wrap gap-2.5 justify-center mb-5">
    <div
      class="h-0 w-0 border-transparent border-r-black box-content border-r-[100px] border-y-[5px]"
    ></div>
    <div
      :class="id == 1 ? 'bg-black text-white' : ''"
      class="uppercase text-xl tracking-widest font-bold py-3 border-black px-4 rounded-full border-2"
      v-for="(item, id) in categories"
      :key="id"
    >
      {{ item }}
    </div>
    <div
      class="h-0 w-0 border-transparent border-l-black box-content border-l-[100px] border-y-[5px]"
    ></div>
  </div>
  <div class="grid-cols-12 grid-rows-2 h-[600px] grid gap-5">
    <div
      class="bg-gradient-to-r overflow-y-scroll to-pink-400 from-orange-400 col-start-1 col-span-5 row-span-2"
    >
      <CardList :token="token" :prevCursor="prevCursor" :currentCursor="currentCursor" @handlePostUpdates="handlePostUpdates" :newPostAdded="newPostAdded" :posts="filtered"/>
    </div>
    <div class="relative col-start-6 col-span-4 row-span-1 rounded-lg">
      <Login @updateUsername="updateUsername" :username="username" />
    </div>
    <div
      class="bg-transparent col-start-10 col-span-full row-start-1 row-span-1"
    >
    <AddPost @handlePostChange="handlePostChange" :newPostAdded="newPostAdded" :token="token" :username="username"/>
    </div>
    <div class="col-start-6 col-span-3 row-start-2 row-span-1">
      <Filter @filterText="filterText" @filterDate="filterDate" />
    </div>
    <div class="bg-gradient-to-tl flex items-center from-slate-200 to-slate-300 rounded-xl col-start-9 col-span-full row-start-2 row-span-1">
      <RandomQuote />
    </div>
  </div>
</template>

<script setup>
import Fb from "./Icons/Fb.vue";
import Twitter from "./Icons/Twitter.vue";
import Yt from "./Icons/Yt.vue";
import Insta from "./Icons/Insta.vue";
import { getLastWeekStartDate, getYesterdayDate } from "./utils";
let categories = [
  "Tech",
  "Health",
  "Travel",
  "Development",
  "Lifestyle",
  "Food",
  "Finance",
];
const username = ref(null);
const token=ref("")
const newPostAdded=ref(0)

const posts = ref([]);
const filtered = ref([]);
const currentCursor = ref(null);
const prevCursor = ref(null);

const updateUsername = (data) => {
  username.value = data.username;
  token.value = data.token;
};

const handlePostUpdates=(data)=>{
  currentCursor.value=data.currentCursor
  prevCursor.value=data.prevCursor
  posts.value=data.posts
  filtered.value=data.posts
}
const handlePostChange=()=>{
  newPostAdded.value=newPostAdded.value+1
}
const filterDate=(val)=>{
  // console.log("Invoked",val)
  switch(val){
    case 1:
    filtered.value=posts.value.filter(ele=>new Date(ele.node.date) >= getYesterdayDate())
      break;
    case 7:
    filtered.value=posts.value.filter(ele=>new Date(ele.node.date) >= getLastWeekStartDate())
      break;
    case 30:
      break;
    default:
      break
  }
}
const filterText=(text)=>{
  filtered.value=posts.value.filter(ele=>ele.node.title.includes(text))
}
onMounted(() => {
  let user = window.localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    username.value = user.username;
    token.value = user.token;
    console.log("USer", user.username);
  }
  console.log("Mounted",posts.value)
});
</script>
