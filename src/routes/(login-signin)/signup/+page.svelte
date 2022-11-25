<script lang="ts">
	import type { ActionData } from "./$types"
	export let form: ActionData | null
</script>

<h1>Sign Up</h1>
<div style="color:red">{form?.message ?? ""}</div>
<form method="POST">
	<input required name="email" type="email" placeholder="Email" />
	<input required name="username" type="text" placeholder="Username" />
	<input required name="password" type="password" placeholder="Password" />
	<input type="submit" value="Sign Up" />
</form>
