<script lang="ts">
    import NotLoggedIn from '$lib/NotLoggedIn.svelte';
    import { onMount } from 'svelte';
    import Locked from "carbon-icons-svelte/lib/Locked.svelte";
    import ChevronRight from "carbon-icons-svelte/lib/ChevronRight.svelte";

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
			<span class="username">molaix</span>
        </div>
        <div class="security">
            <div class="label">
                <Locked size={32} />
                <span>Account Security</span>
            </div>
            <div class="arrow">
                <ChevronRight size={32} />
            </div>
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
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            

            .user {
                cursor: pointer;
                margin-top: 15px;
                margin-bottom: 15px;
                max-width: 350px;
                width: 350px;
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

            .security {
                cursor: pointer;
                margin-bottom: 15px;
                max-width: 350px;
                width: 350px;
			    height: 45px;
			    border-radius: 25px;
			    background-color: #434343;
			    box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			    -webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			    -moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			    padding: 15px;
			    display: inline-flex;
			    flex-direction: row;
			    align-items: center;
                justify-content: space-between;

                .label {
                    display: flex;
                    gap: 10px;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-evenly;

                    span {
                        font-size: 24px;
                    }
                }

                .arrow {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-height: 45px;
                    min-width: 45px;
                    border-radius: 25px;
                    transition: 600ms ease-in-out;
                    justify-content: center;
                }

                &:hover {
                    .arrow {
                        background: #292929;
                    }
                }
            }
        }
    }
</style>