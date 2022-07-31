<script lang="ts">
    import NotLoggedIn from '$lib/NotLoggedIn.svelte';
    import { onMount } from 'svelte';
    let logged_in: boolean;

    onMount(async()=>{
        logged_in = document.cookie.includes("user=");
    });
</script>

{#if logged_in === false}
<NotLoggedIn />
{:else if logged_in === true}
<div class="settings">
    <!-- TODO(@TheBotlyNoob): add avatars -->
    <div class="sidebar">
        <div class="user">
            <!-- svelte-ignore a11y-img-redundant-alt -->
			<img class="av" src="./temp/av.png" alt="friend's image">
            <!-- TODO(@TheBotlyNoob): dynamic username -->
			<span class="username">temp username</span>
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    .settings {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        height: calc(100vh - 110px);
        width: 100vw;
        

        .sidebar {
            margin-top: 10px;
            border-right: 2px solid grey;
			width: 400px;
			height: calc(100vh - 135px);
            padding-left: 20px;

            .user {
                max-width: 350px;
			    height: 75px;
			    border-radius: 25px;
			    background-color: #434343;
			    box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			    -webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			    -moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			    padding: 15px;
			    display: flex;
			    flex-direction: row;
			    align-items: center;
			    justify-content: space-between;

			    .av {
			    	height: 75px;
			    	width: 75px;
			    }

			    .username {
			    	color: rgb(255, 255, 255);
			    	font-size: 28px;
			    	margin-right: 25px;
			    }
            }
        }
    }
</style>