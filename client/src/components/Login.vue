<template>
  <div class="box">
    <nav>
      <router-link to="/login">登录</router-link>
      <h2>·</h2>
      <router-link to="/register">注册</router-link>
    </nav>
    <div>
      <el-form ref="logForm" :model="formData" label-width="0" status-icon :rules="myrules">
        <el-form-item label prop="logUserName">
          <el-input
            v-model="formData.logUserName"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item label prop="logPassword">
          <el-input
            v-model="formData.logPassword"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" class="btn" round @click="fnlog('logForm')">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      var reg = /^\w{3,15}$/;
      if (!reg.test(value)) {
        callback(new Error("必须字母、数字、下划线组成"));
      } else {
        callback();
      }
    };

    return {
      formData: {
        logUserName: "",
        logPassword: "",
      },
      myrules: {
        logUserName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 15, message: "必须3-15位", trigger: "blur" },
          { validator: validateUserName, trigger: "blur" },
        ],
        logPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "必须6-12位", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    fnlog(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "http://127.0.0.1:3000/user/login",
            data: this.formData,
          }).then((res) => {
            console.log(res.data);
            console.log(res);
            if (res.data.code == 3) {
              this.$message({
                type: "warning",
                message: res.data.message,
              });
            }
            if (res.data.code == 4) {
              this.$message({
                type: "warning",
                message: res.data.message,
              });
            }
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.message,
              });
              console.log("登录用户名：" + res.data.logname);
              this.$router.push("/home");
            }
          });
        } else {
          console.log("不能提交");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.box {
  width: 380px;
  background: white;
  box-shadow: 0 0 5px 3px #ddd;
  border: 1px solid #ccc;
  margin: 100px auto 0;
  padding: 40px;
  text-align: center;
}
h2 {
  display: inline;
  margin: 0 6px;
}
nav a {
  text-decoration: none;
  font-size: 20px;
  color: black;
}
nav a.router-link-active {
  color: red;
  text-decoration: underline;
}
.box nav {
  margin-bottom: 30px;
}
.btn {
  width: 100%;
}
</style>