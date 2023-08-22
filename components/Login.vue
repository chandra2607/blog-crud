<!-- password for graph is RgH(*PbDZ82eVzKUxfnY%m!f  -->
<template>
    <img src="https://img.freepik.com/free-photo/abstract-paint-background-with-multi-colored-watercolor-painting-generated-by-ai_188544-15558.jpg" class="z-[-1] opacity-50 rounded-xl h-full w-full absolute inset-0"/>
  <div
    v-if="props.username == null"
    class="relative m-0 flex flex-col w-full justify-center items-center"
  >
    <form @submit.prevent="handleFormSubmit" class="p-5">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <div>
        <label class="font-bold tracking-wide text-lg" for="username"
          >Username</label
        >
        <input
          class="px-1 py-1.5 outline-none border border-black block rounded-sm mb-2.5"
          type="text"
          v-model="username"
        />
      </div>
      <div>
        <label class="font-bold tracking-wide text-lg" for="password"
          >Password</label
        >
        <input
          class="px-1 py-1.5 outline-none border border-black block rounded-sm mb-2.5"
          type="password"
          v-model="password"
        />
      </div>
      <button
        class="px-3 py-2 border border-black shadow-md rounded-md block m-auto"
      >
        Login
      </button>
    </form>
  </div>
  <div v-else>
    <h1 class="mt-2.5 text-center mb-2 font-medium text-2xl tracking-widest">Hey <span class="uppercase">{{ props.username }}</span>,</h1>
    <button @click="logout" class="py-1.5 px-2.5 max-w-fit ml-[50%] rounded-md -translate-x-1/2 w-full border border-black bg-white">Logout</button>
  </div>
</template>

<script>
import { ref} from "vue";
import wpGraphClient from "../clients/wpGraphClient";

function getLoginQuery(username, password) {
  const authquery = `
      mutation LoginUser {
        login(input: {
          clientMutationId: "Login",
          username: "${username}",
          password: "${password}"
        }) {
          authToken
          user {
            id
            name
          }
        }
      }
    `;
  return authquery;
}

export default {
  props: {
    username: String,
    test: String
  },
  setup(props,{emit}) {
    const username = ref("");
    const password = ref("");
    const logout=()=>{
        let user=window.localStorage.getItem('user')
        if(user){
            window.localStorage.removeItem('user')
            emit('updateUsername',{username:null,token:null})
        }
    }
    const handleFormSubmit = async () => {
      try {
        const resp = await wpGraphClient.post("", {
          query: getLoginQuery(username.value, password.value),
        });

        if (resp.data.data.login.authToken) {
          const auth = {
            token: resp.data.data.login.authToken,
            username: resp.data.data.login.user.name,
          };
          localStorage.setItem("user", JSON.stringify(auth));
          emit('updateUsername',{username:auth.username,token:auth.token})
        } else {
          throw new Error("Login data is missing in the response.");
        }
      } catch (err) {
        console.error("Error occurred during login:", err.message);
      }
    };

    return {
      username,
      password,
      handleFormSubmit,
      props,
      logout
    };
  },
};
</script>
