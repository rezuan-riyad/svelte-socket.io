<script>
	// import { Router, Link, Route } from "svelte-routing";
	import Chat from "./components/Chat.svelte";
	import Messagebox from "./components/Messagebox.svelte";
	import socket from "./socket"

	let selectedUser = "";

	const handleUsernamePicked = (e) => {
		let username = e.detail;
		socket.auth = { username }
		socket.connect()
		selectedUser = username;
	};
</script>

<main>
	{#if selectedUser}
		<Messagebox />
	{:else}
		<Chat on:username-picked={handleUsernamePicked} />
	{/if}
</main>

<style>
</style>
