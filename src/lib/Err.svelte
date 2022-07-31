<script lang="ts">
    import ErrorOutline from "carbon-icons-svelte/lib/ErrorOutline.svelte";
</script>

<div class="error">
    <ErrorOutline size={60} />
   <span>
    <slot />
   </span>
</div>

<style lang="scss">
    .error {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        min-width: 400px;
        max-width: 400px;
        align-self: center;
        justify-self: center;

        span {
            font-size: 28px;
        }
    }
</style>