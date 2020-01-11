<template>
    <div>
        this is foo2
    </div>
</template>

<script>
    export default {
        created() {
            console.log('foo-created',this.$route.params);
        },
    }
</script>

<style scoped>

</style>