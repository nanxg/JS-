<template>
    <div>
        <header class="header" >
            <h1>todos</h1>
            <input 
                class="new-todo" 
                placeholder="请输入内容" 
                v-model.trim='valin'
                @keyup.13='addfn'
            >
        </header>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                valin:'',

            }
        },
        methods:{
            addfn(){
                this.$emit('add',this.valin);
                this.valin = '';
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>