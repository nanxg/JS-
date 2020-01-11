<template>
    <ul class="todo-list">
        <li :class="{editing:val.onoff===true,completed:val.checked===true}"
             v-for="(val,key) in fary"
             :key="val.id"
        >
            <div class="view">
                <input class="toggle" type="checkbox" 
                    v-model="val.checked"
                >
                <!-- :checked="val.checked" -->
                <label @dblclick="dbclk(val,key)">{{val.txt}}</label>
                <button class="destroy" @click="del(val.id)"></button>
            </div>
            <input
                class="edit"
                ref="input"
                v-model="changetxt"
                @blur="blur(val)"
                @keyup.esc="esc(val)"
            />
        </li>
    </ul>
</template>

<script>
    export default {
        data(){
            return {
                changetxt:'',
                // ary:Object.assign({},this.fary)
            }
        },
        watch: {
            // ary:{
            //     handler(val,oldVal){
            //         console.log(val);
            //         this.$emit('ch',val.checked,val.id);
            //     },
            //     //深度监听
            //     deep:true,
            //     immediate: true
            // }    
        },
        methods:{
            dbclk(val,key){
                val.onoff = true;
                // this.isblur = false; 
                this.changetxt = val.txt;
                //input元素获取焦点
                this.$nextTick((x) => { //延迟回调，在修改数据DOM更新之后执行
                    console.dir(this.$refs.input[key])
                    this.$refs.input[key].select();
                })
            },
            blur(val){
                if(this.changetxt) {
                    val.txt = this.changetxt;
                }
                val.onoff = false;
            },
            esc(val){
                this.$emit('es',val);
                this.changetxt = val.txt; // 把要修改的值赋值为原始值，避免esc自动触发失焦时更改值
                val.onoff = false;
            },
            del(id){
                this.$emit('de',id);
            },
        },
        props:['fary']
    }
</script>

<style scoped>

</style>