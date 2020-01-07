<template>
    <div>
        <p>请登录</p>
        用户名:<input v-model="uname" type="text"/>
        密码:<input v-model="pass" type="password"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                uname:'',
                pass:''
            }
        },
        methods:{
            login(){
                const {uname,pass} = this;
                if(uname==='pl'&&pass==='123'){
                    // 跳转
                    // this.$router.push('/');
                    this.$router.push({
                        path:'/',   
                        query:{
                            name:'pl'
                        }
                    });

                }else if(uname==='nxg'&&pass==='123'){
                    // 替换路由，跳转之后不能后退到上一个路径(因为被替换掉了)
                    this.$router.replace({
                        name:'home', //跳转到命名的路由
                        params:{
                            un:'nxg'
                        }
                    });
                }else{
                    if(confirm('用户名、密码错误')){
                        this.uname = '';
                        this.pass = ''
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>