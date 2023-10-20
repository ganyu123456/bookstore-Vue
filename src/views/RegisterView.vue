<template>
    <div class="register">
        <h2>用户注册</h2>
        <div class="register-item">
            <label>账号</label>
            <input v-model="registerData.id" placeholder="请输入登录账号" />
        </div>
        <div class="register-item">
            <label>密码</label>
            <input v-model="registerData.password" type="password" placeholder="请输入登录密码" />
        </div>
        <div class="register-item">
            <label>姓名</label>
            <input v-model="registerData.name" type="text" placeholder="请输入姓名" />
        </div>
        <div class="register-item">
            <label>邮箱</label>
            <input v-model="registerData.email" type="email" placeholder="请输入邮箱" />
        </div>
        <div class="register-item">
            <button @click="registerSys" style="width:100%;">注册</button>
        </div>

    </div>
</template>
<style scoped>
    .register{
        background:#fff;
        width:240px;
        margin:50px auto;
        border:solid #000 0.2px;
        padding:10px;
    }
    .register-item{
        margin:10px;
    }
</style>
<script>
    import router from "../router";
    import { post } from "../util/http";
    import { load,dialog,message } from "../util/layer";
    export default {
        name: 'registerView',
        data() {
            return {
                registerData: {
                    id: "",
                    password: "",
                    name: "",
                    email: ""
                }
            }
        },
        methods: {
            registerSys: function () {

                if (!this.registerData.id) {

                    message("请输入账号！"); return;
                }
                if (!this.registerData.password) {

                    message("请输入密码！"); return;
                }
                if (!this.registerData.name) {

                    message("请输入姓名！"); return;
                }
                if (!this.registerData.email) {

                    message("请输入邮箱！"); return;
                }
                load();
                post("/LoginUser/Register", this.registerData).then(res => {
                    if (!res.success) {
                        dialog("登录失败！" + JSON.stringify(res));
                        return;
                    }
                    dialog("注册成功,去登录吧！",function(){
                        router.push("/login");
                    });
                });                
            }
        }
    }

</script>