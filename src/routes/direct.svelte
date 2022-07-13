<script lang="ts">
	let current: String;
</script>

<main class="dms">
	<div class="sidebar">
		<button on:click={() => (current = "william")} class="chat-user">
			<img src="./av/william.gif" alt="william" />
			<span class="username">william.is-a.dev</span>
		</button>
	</div>
	<div id="hidden" class={current === "william" ? "showChat" : ""}>
		<span>test</span>
	</div>
</main>

<style lang="scss">
	.dms {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100vw;

		.sidebar {
			margin: 20px;
			height: 75vh;
			width: 300px;
			border: none;
			border-right: 2px solid gray;
			border-radius: 0px;
			padding: 10px;

			.chat-user {
				align-items: center;
				padding: 5px;
				width: 300px;
				height: 90px;
				display: flex;
				flex-direction: row;
				background: #292929;
				border: none;
				cursor: pointer;
				border-radius: 25px;
				gap: 15px;
				transition: 400ms ease-in-out;

				img {
					border-radius: 50px;
					height: 70px;
					width: 70px;
				}

				.username {
					color: white;
					font-size: 24px;
				}

				&:hover {
					background: #242424;
				}
			}

			#hidden {
				display: none;
			}

			.showChat {
				display: block;
			}
		}
	}
</style>
