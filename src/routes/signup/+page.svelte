<div class="form-container">
	<h1>Sign Up</h1>
	<form>
		<input required type="text" placeholder="Username" />
		<input required type="text" placeholder="Name" />
		<br />
		<input required type="email" placeholder="Email" />
		<br />
		<input required type="password" placeholder="password" />
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
