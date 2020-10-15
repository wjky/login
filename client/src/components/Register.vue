<template>
  <div class="box">
    <nav>
      <router-link to="/login">登录</router-link>
      <h2>·</h2>
      <router-link to="/register">注册</router-link>
    </nav>
    <div>
      <el-form ref="regForm" :model="formData" label-width="0" status-icon>
        <el-form-item label prop="regUserName">
          <el-input
            v-model="formData.regUserName"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item label prop="regPassword">
          <el-input
            v-model="formData.regPassword"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="checkPassword">
          <el-input
            v-model="formData.checkPassword"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" class="btn" round @click="fn('regForm')">立即注册</el-button>
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
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.regPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        regUserName: "",
        regPassword: "",
        checkPassword: "",
      },
      myrules: {
        regUserName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 15, message: "必须3-15位", trigger: "blur" },
          { validator: validateUserName, trigger: "blur" },
        ],
        regPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "必须6-12位", trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    fn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("可以提交了");
          this.axios
            .post("http://127.0.0.1:3000/user/register", this.formData)
            .then((res) => {
              console.log(res.data);
              if (res.data.code == 1) {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                });
              }
              if (res.data.code == 2) {ff
                this.$message({
                  message: res.data.message,
                  type: "warning",
                });
              }
              if (res.data.code == 3) {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                });
              }
              if (res.data.code == 4) {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                });
              }
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                });
                this.$router.push("/login");
              }
            })
            .catch((err) => {
              console.error(err);
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