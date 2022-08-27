<script type="ts">
	import { dev } from "$app/env";
	import trcp from "$lib/tRPC/client";
	import cookie from "cookie";

	let username: string;
	let email: string;
	let password: string;
</script>

<div class="form-container">
	<h1>Sign Up</h1>
	<form
		on:submit|preventDefault={async () => {
			let token = await trcp?.query("users:signUp", { username, email, password });

			document.cookie = cookie.serialize("token", token || "", {
				httpOnly: true,
				secure: !dev,
				path: "/trpc"
			});
		}}
	>
		<input required type="text" placeholder="Username" bind:value={username} />
		<input required type="text" placeholder="Name" />
		<br />
		<input required type="email" placeholder="Email" bind:value={email} />
		<br />
		<input required type="password" placeholder="password" bind:value={password} />
		<br />
		<input type="submit" value="Sign Up" />
	</form>
</div>

<style lang="scss">
	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		margin-top: 50px;
		font-size: 64px;
	}

	form {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		margin-top: 15px;
		padding-left: 15px;
		width: 450px;
		height: 50px;
		font-size: 24px;
		border: none;
		border-radius: 15px;
	}

	input[type="submit"] {
		width: 150px;
		font-size: 24px;
		background: #4169e1;
		height: 75px;
		border-radius: 10px;
		color: white;
		display: flex;
		padding: 0;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>
