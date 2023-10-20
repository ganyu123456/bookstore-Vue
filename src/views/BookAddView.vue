<template>
    <div class="edit">
        <h2>新增图书</h2>
        <div class="edit-item">
            <label>书名</label>
            <input v-model="editData.name" placeholder="请输入书名" />
        </div>
        <div class="edit-item">
            <label>作者</label>
            <input v-model="editData.author" type="text" placeholder="请输入作者" />
        </div>
        <div class="edit-item">
            <label>出版社</label>
            <input v-model="editData.publisher" type="text" placeholder="请输入出版社" />
        </div>
        <div class="edit-item">
            <label>数量</label>
            <input v-model="editData.stockNumber" type="number" placeholder="请输入数量" min="0" step="1" />
        </div>
        <div class="edit-item">
            <label>单价</label>
            <input v-model="editData.price" type="number" placeholder="请输入单价" min="0" step="0.01" />
        </div>
        <div class="edit-item">
            <button @click="addBook" style="width:100%;">新增</button>
        </div>

    </div>
</template>
<style scoped>
    .edit{
        background:#fff;
        width:260px;
        margin:50px auto;
        border:solid #000 0.2px;
        padding:10px;
    }
    .edit-item{
        margin:10px;
    }
    .edit-item input{
        margin-left:10px;
    }
</style>
<script>
    import router from "../router";
    import { post } from "../util/http";
    import { load,dialog,message } from "../util/layer";
    export default {
        data() {
            return {
                editData: {
                    price: 0,
                    stockNumber: 0,
                    publisher: "",
                    name: "",
                    author: ""
                }
            }
        },
        methods: {
            loadData(id) {
                console.log(id);
            },
            addBook: function () {

                if (!this.editData.name) {

                    message("请输入书名！"); return;
                }
                if (!this.editData.author) {

                    message("请输入作者！"); return;
                }
                if (!this.editData.publisher) {

                    message("请输入出版社！"); return;
                }
                if (!this.editData.stockNumber) {

                    message("请输入数量！"); return;
                }
                if (!this.editData.price) {

                    message("请输入单价！"); return;
                }
                
                load();
                post("/Book/Create", this.editData).then(res => {
                    if (!res.success) {
                        dialog("新增图书失败！" + JSON.stringify(res));
                        return;
                    }
                    dialog("新增图书成功！",function(){
                        router.push("/");
                    });
                });                
            }
        },
        mounted() {
            this.loadData(this.$route.query.id);
        }
    }

</script>