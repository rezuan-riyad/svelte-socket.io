<script>
  import { onMount, createEventDispatcher } from "svelte";
  import socket from "../socket";
  import UserList from "./UserList.svelte";

  let selectedUser;

  let all_users;
  let content;
  // let selectedUser;
  const dispatch = createEventDispatcher();
  // Handler for users event
  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userId === socket.id;
    });
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    all_users = users;
  });

  socket.on("user connected", (user) => {
    selectedUser = user;
    if (all_users) {
      all_users = [...all_users, user];
    }
  });

  const onMessage = () => {
    // dispatch("message-conent", text);
    if(!content) return;
    if(selectedUser){
      console.log(selectedUser.userId)
      socket.emit("private message", {
        content,
        to: selectedUser.userId
      })
      selectedUser.messages.push({
        content, fromSelf: true
      })
    }
  }

  const onUserSelection = (e) => {
    // selectedUser = e.detail
  }

</script>

<div class="container">
  <UserList {all_users} on:selected-user={onUserSelection}/>
  <div class="message-box">
    <!-- <h1>{selectedUser ? selectedUser.username : "" }</h1> -->
    <form on:submit|stopPropagation|preventDefault={onMessage}>
      <input
        bind:value={content}
        type="text"
        placeholder="write something here ...."
      />
      <button type="submit">Send</button>
    </form>
  </div>
</div>

<style>
  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
  }
  .message-box {
    height: 100%;
    overflow-y: auto;
    position: absolute;
    right: 0;
    left: 200px;
  }
  form {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 200px;
  }
  form input {
    width: 80%;
    outline: none;
    border: none;
    background-color: #f4f4f4;
    padding: 0.5rem 1rem;
  }
  form button {
    width: 20%;
    border: none;
    background-color: black;
    color: white;
  }
</style>
