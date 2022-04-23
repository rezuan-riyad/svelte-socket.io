<script>
  export let all_users;
  import { createEventDispatcher } from "svelte";

  let selectedUser = { userId: null };
  const dispatch = createEventDispatcher();

  // const onUserSelection = (username) => {
  //   dispatch("select-user", username);
  // };
  const handleClickOnUser = (userId) => {
    let temp = all_users.filter((user) => user.userId == userId);
    selectedUser = temp[0];
    dispatch("selected-user", selectedUser)
  };
</script>

<div class="users">
  {#if all_users}
    {#each all_users as user}
      <div
        class="user {user.userId === selectedUser.userId ? 'selected' : ''}"
        on:click={() => handleClickOnUser(user.userId)}
      >
        <p>{user.username}{user.self ? "(Yourself)" : ""}</p>
        <div class="status">
          <div class="round online" />
          <p>Online</p>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .users {
    padding: 0.5rem 0;
    position: absolute;
    height: 100%;
    width: 200px;
    background-color: #2b2a2a;
    box-sizing: border-box;
  }
  .user {
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
  .selected {
    background-color: rgb(0, 65, 0);
  }
  .user p {
    font-size: 16px;
    margin: 0;
    color: white;
  }
  .status {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.5rem;
  }
  .status p {
    font-size: 12px;
    margin: 0;
    margin-left: 0.5rem;
    color: white;
  }
  .round {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .online {
    background-color: green;
  }
  .offline {
    background-color: rgb(153, 37, 37);
  }
  .user:hover {
    -moz-box-shadow: inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow: inset 0 0 10px gray;
    color: white !important;
  }
</style>
