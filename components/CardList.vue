<template>
  <div>
    <div class="flex gap-10 flex-wrap justify-items-start p-4 rounded">
      <div
        class="flex relative flex-col w-full bg-black text-white even:bg-white even:text-black rounded-lg p-2"
        v-for="(item, id) in posts"
        :key="id"
      >
        <p class="uppercase text-lg font-semibold">{{ item.node.title }}</p>
        <p class="font-mono font-light show-two-lines">
          {{ item.node.content }}
        </p>
        <p>{{ item.node.date }}</p>
        <button class="text-xs p-2 hover:text-yellow-200 uppercase absolute right-0 bottom-0" @click="deletePost(item.node.id)">Delete</button>
      </div>
      <!-- <Card v-for="(item, id) in posts" :key="id" :title="item.node.title" :content="item.node.content" /> -->
      <h1
        v-if="posts.length === 0"
        class="w-full min-h-[150px] mt-[70px] text-2xl block font-bold text-center tracking-widest"
      >
        Loading...
      </h1>
    </div>
    <div class="flex gap-2 justify-center p-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="handlePrevBlogs"
      >
        Prev Posts
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="handleNextBlogs"
      >
        Next Posts
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// import Card from './Card';
import wpGraphClient from "../clients/wpGraphClient";
import { getLastWeekStartDate, getYesterdayDate } from "./utils";
export default {
  props: {
    // username: String,
    // test: String
    posts: Array,
    newPostAdded: Number,
    currentCursor: String,
    prevCursor: String,
    token:String
  },
  name: "CardList",
  setup(props, { emit }) {
    // State variables
    const { posts, prevCursor, currentCursor } = toRefs(props);

    // Fetch posts from the WP GraphQL client
    const fetchPosts = async (cursor, cursor2) => {
      const query = `
            query NewQuery {
                posts(first: 10, before: "${cursor}", after:"${cursor2}") {
                    edges {
                        cursor
                    node {
                        slug
                        title
                        status
                        postId
                        content
                        date
                        id
                    }
                }
            }
        }
        `;
      const response = await wpGraphClient.post("", { query });

      if (response?.data?.data?.posts.edges) {
        let data = {
          posts: response.data.data.posts.edges,
          currentCursor: response.data.data.posts.edges[0].cursor,
          prevCursor:
            response.data.data.posts.edges[
              response.data.data.posts.edges.length - 1
            ].cursor,
        };
        emit("handlePostUpdates", data);
      }
    };

    const deletePost = async (id) => {
      const headers = {
        Authorization: `Bearer ${props.token}`,
      };
      const query = `mutation DeletePost {
                      deletePost(input: {id: "${id}"}) {
                        clientMutationId
                        deletedId
                      }
                    }`;
      const response = await wpGraphClient.post("", { query },{ headers });

      if (response?.data?.data?.deletePost?.deletedId) {
        console.log("Post Deleted successfully")
        // emit("handlePostUpdates", data);
        await fetchPosts(null, null);
      }
    };

    onMounted(async () => {
      await fetchPosts(null, null);
    });

    const handleNextBlogs = async () => {
      await fetchPosts(null, prevCursor.value);
    };

    const handlePrevBlogs = async () => {
      await fetchPosts(currentCursor.value, null);
    };
    watch(
      () => props.newPostAdded,
      async () => {
        await fetchPosts(null, null);
      }
    );
    return {
      posts,
      handleNextBlogs,
      handlePrevBlogs,
      fetchPosts,
      deletePost
    };
  },
};
</script>
<style scoped>
.show-two-lines {
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
}
</style>
