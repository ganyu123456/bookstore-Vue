<template>
    <div id="app">
        <div class="img" />
        <nav v-if="checkLogin()">
            <router-link to="/">图书信息</router-link> |
            <router-link to="/logout">退出登录</router-link>
        </nav>
        <nav v-if="!checkLogin()">
            <router-link to="/login">登录</router-link> |
            <router-link to="/register">注册</router-link>
        </nav>
        <router-view />
    </div>
</template>
<script>
    import { isLogin } from "./util/auth";
    export default {
        methods: {
            checkLogin() {
                return isLogin();
            }
        }
    }
</script>
<style>
    .img {
        z-index: -1;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: url(/bg.jpg);
        background-size: cover;
    }

    body {
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    nav {
        padding: 20px;
        text-align: center;
        background: #148ee9;
    }

        nav a {
            font-weight: bold;
            color: #fff;
        }

            nav a.router-link-exact-active {
                color: #aadb12;
            }
</style>
