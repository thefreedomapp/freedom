<template>
    <div>
        <h1>{{ page.title }}</h1>
        <p>{{ page.description }}</p>
        <nuxt-content :document="page" />
    </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
export default {
    async asyncData({ $content, params, error }: Context) {
        const slug = params.slug || 'index'
        const page = await $content(slug)
            .fetch()
            .catch(() => {
                error({ statusCode: 404, message: 'Page not found' })
            })

        return {
            page,
        }
    },
}
</script>
