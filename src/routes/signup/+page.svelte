<script type="ts">
	import trpc from "$lib/tRPC/client";

	let username: string;
	let email: string;
	let password: string;

	let tokenInput: HTMLInputElement;
	let setTokenForm: HTMLFormElement;

	const onSubmit = async () => {
		const token = await trpc.query("users:signUp", {
			email,
			username,
			password
		});
		console.log(token);
		tokenInput.value = token;
		setTokenForm.submit();
	};
</script>

<div class="form-container">
	<h1>Sign Up</h1>
	<form on:submit|preventDefault={onSubmit}>
		<input required type="text" placeholder="Username" bind:value={username} />
		<input required type="text" placeholder="Name" />
		<br />
		<input required type="email" placeholder="Email" bind:value={email} />
		<br />
		<input required type="password" placeholder="password" bind:value={password} />
		<br />
		<input type="submit" value="Sign Up" />
	</form>
	<form style="display:none;" method="POST" action="/_set-token" bind:this={setTokenForm}>
		<input type="hidden" name="token" bind:this={tokenInput} />
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
