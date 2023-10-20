<template>
  <div class="home">
      <div class="query">
          <label>书名</label><input v-model="query.name" placeholder="按书名查询" />&nbsp;
          <label>作者</label><input v-model="query.author" placeholder="按作者查询" />&nbsp;
          <label>出版社</label><input v-model="query.publisher" placeholder="按出版社查询" />&nbsp;
          <button @click="queryBook">查询</button>&nbsp;
          <button @click="addBook">新增</button>
      </div>
    <table style="width:100%;" border="1">
        <thead>
            <tr>
                <th>书名</th>
                <th>作者</th>
                <th>出版社</th>
                <th>数量</th>
                <th>单价</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data,key,index) in tableData" v-bind:key="data.id">
                <td>{{ data.name }}</td>
                <td>{{ data.author }}</td>
                <td>{{ data.publisher }}</td>
                <td>{{ data.stockNumber }}</td>
                <td>{{ data.price }}</td>
                <td><router-link :to="'/book/edit?id='+data.id">修改</router-link>&nbsp;
                <a href="javascript:void(0)" @click="deleteBook(data.id,key,index)">删除</a></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<style scoped>
    .home{
        width:1024px;
        margin:50px auto;
        background:#fff;
        padding:10px;
    }
    .query{
        padding:10px 0;
    }
</style>
<script>
    import { load, dialog,confirm } from "../util/layer.js";
    import { post,del } from "../util/http.js";
import router from "../router/index.js";
export default {
        data() {
            return {
                query: {
                    name: "",
                    author: "",
                    publisher:""
                },
                tableData:[]
            }
        },
        methods: {
            queryBook() {
                load();
                post("/book/query",this.query).then(res => {
                    if (!res.success) {
                        dialog("查询失败！" + JSON.stringify(res));
                        return;
                    }

                    this.tableData = res.result.items;

                });
            },
            addBook() {
                router.push("/book/add");
            },
            deleteBook(id){
                var that = this;
                confirm("确定删除图书信息？",function(){
                    load();
                    del("/book/delete",{id}).then(res => {
                        if (!res.success) {
                            dialog("删除失败！" + JSON.stringify(res));
                            return;
                        }
                        dialog("删除成功",function(){
                            that.queryBook();
                        })
                    });
                });
            }
        },
        mounted() {
            this.queryBook();
        }
}
</script>
