<script lang="ts">
	import type { ActionData } from "./$types"
	export let form: ActionData | null
</script>

<h1>Log In</h1>
<div style="color:red">{form?.message ?? ""}</div>
<form method="POST">
	<input required name="email_or_username" type="text" placeholder="Email or Username" />
	<input required name="password" type="password" placeholder="Password" />
	<input type="submit" value="Log In" />
</form>
