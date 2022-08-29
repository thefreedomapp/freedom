<script lang="ts">
	import { dev } from "$app/environment";
	import trpc from "$lib/tRPC/client";
	import cookie from "cookie";

	let email_username: string;
	let password: string;

	const onSubmit = async () => {
		let token = await trpc.query("users:logIn", {
			email_username,
			password
		});

		cookie.serialize("token", token, {
			httpOnly: true,
			secure: !dev,
			path: "/trpc"
		});
	};
</script>

<div class="form-container">
	<h1>Log In</h1>
	<form on:submit|preventDefault={onSubmit}>
		<input required type="text" placeholder="Email or Username" bind:value={email_username} />
		<br />
		<input required type="password" placeholder="Password" bind:value={password} />
		<br />
		<input type="submit" value="Log In" />
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
		padding: 0;
		font-size: 24px;
		background: #4169e1;
		height: 75px;
		border-radius: 10px;
		border: none;
		color: white;
		text-decoration: none;
		cursor: pointer;
	}
</style>
