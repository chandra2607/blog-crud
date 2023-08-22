<template>
  <div class="">
    <div class="h-full flex justify-center opacity-80 items-center z-[-1]  w-full relative pointer-events-none">
      <video class="absolute inset-0 mt-[50%] -translate-y-1/2" autoplay loop controls muted >
        <source src="https://cdn.dribbble.com/users/1145170/screenshots/14925093/media/67a77c892e4f51cb9cd7928792a6f500.mp4" />
      </video>
    </div>
    <form @submit.prevent="handleFormSubmit" class="p-5">
      <h1 class="text-2xl font-bold text-center">Add New Post</h1>
      <div>
        <label class="font-bold tracking-wide text-lg" for="">Title</label>
        <input
          class="px-1 py-1.5 outline outline-black outline-[0.25px] bg-transparent focus:bg-white block w-full rounded-md mb-2.5"
          type="text"
          v-model="title"
        />
      </div>
      <div>
        <label class="font-bold tracking-wide text-lg" for="">Content</label>
        <textarea
          class="px-1 py-1.5 outline outline-black outline-[0.25px] focus:bg-white block w-full bg-transparent rounded-md mb-2.5"
          v-model="content"
        ></textarea>
      </div>
      <button
        class="w-[100px] bg-black uppercase font-medium tracking-widest text-xl text-white px-4 py-2.5 rounded-full block m-auto"
      >
        ADD
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import wpGraphClient from "../clients/wpGraphClient";
export default {
  name: "PostCreate",
  props: {
    username: String,
    token: String,
    newPostAdded: Number,
  },
  setup(props, { emit }) {
    const title = ref("");
    const content = ref("");

    const getPostQuery = (title, content) => {
      const postQuery = `mutation CREATE_POST {
          createPost(input: {
            clientMutationId: "CreatePost"
            title: "${title}",
            content:"${content}",
            status: PUBLISH
          }) {
            post {
              id
              title
              date
            }
          }
        }`;
      return postQuery;
    };

    const handleFormSubmit = async (e) => {
      const headers = {
        Authorization: `Bearer ${props.token}`,
      };
      const resp = await wpGraphClient.post(
        "",
        { query: getPostQuery(title.value, content.value) },
        { headers }
      );
     
      try {
        if (resp.data.data.createPost.post.title) {
          emit("handlePostChange");
          alert("POST CREATED SUCCESSFULLY");
        } else {
          throw new Error("Error while creating post");
        }
      } catch (err) {
        console.error("Error occurred during creating post:", err.message);
      }
    };

    return {
      title,
      content,
      handleFormSubmit,
      props,
    };
  },
};
</script>

<style></style>
