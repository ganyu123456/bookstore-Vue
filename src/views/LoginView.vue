<template>
    <div class="login">
        <h2>用户登录</h2>
        <div class="login-item">
            <label>账号</label>
            <input v-model="loginData.code" placeholder="请输入登录账号" />
        </div>
        <div class="login-item">
            <label>密码</label>
            <input v-model="loginData.password" type="password" placeholder="请输入登录密码" />
        </div>
        <div class="login-item">
            <button @click="loginSys" style="width:100%;">登录</button>
        </div>

        <p style="font-size:9pt;">
            使用技术：<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vue2.x前端架构
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;asp.net core
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;net6.0
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;abp框架
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mysql
        </p>
    </div>
</template>
<style scoped>
    .login{
        background:#fff;
        width:240px;
        margin:50px auto;
        border:solid #000 0.2px;
        padding:10px;
    }
    .login-item{
        margin:10px;
    }
</style>
<script>
    import router from "../router";
    import { setAuth } from "../util/auth";
    import { post } from "../util/http";
    import { load,dialog,message } from "../util/layer";
    export default {
        name: 'LoginView',
        data() {
            return {
                loginData: {
                    code: "",
                    password: ""
                }
            }
        },
        methods: {
            loginSys: function () {
                if(!this.loginData.code){

                    message("请输入账号！");return;
                }
                if(!this.loginData.password){

                    message("请输入密码！");return;
                }
                load();
                post("/LoginUser/Login", this.loginData).then(res => {
                    if (!res.success) {
                        dialog("登录失败！" + JSON.stringify(res));
                        return;
                    }
                    setAuth(this.loginData.code);
                    dialog("登录成功",function(){
                        router.push("/");
                    });
                });                
            }
        }
    }

</script>