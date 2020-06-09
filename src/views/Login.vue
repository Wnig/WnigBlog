<template>
  <div class="login">
    <div class="login-con">
      <img src="@/assets/img/logo.png" alt="" />
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="username">
          <Input
            class="input"
            type="text"
            v-model="formInline.username"
            @keyup.enter.native="handleSubmit('formInline')"
            placeholder="请输入账号"
            maxlength="10"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon
          ></Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            class="input"
            type="password"
            @keyup.enter.native="handleSubmit('formInline')"
            v-model="formInline.password"
            placeholder="请输入密码"
            maxlength="16"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon
          ></Input>
        </FormItem>
      </Form>
      <div class="control-btn">
        <Button
          type="primary"
          ghost
          size="small"
          @click="handleSubmit('formInline')"
          >Signin</Button
        >
        <Button size="small" @click="enterHome">Home</Button>
      </div>
    </div>
    <div class="footer">
      <p>❤我不相信所谓的命运，我只相信我自己。❤</p>
      <p>Copyright ©2017 Powered By Wnig 闽ICP备18014223号</p>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/http.js";
export default {
  name: "login",
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    enterHome() {
      this.$router.replace(`/home`);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let obj = {
            user_art: this.formInline.username,
            pwd_art: this.formInline.password
          };
          login(obj).then(res => {
            if (res.data.code === 200) {
              sessionStorage.setItem("Access-Token", res.data.token);
              sessionStorage.setItem("user_art", res.data.username);
              this.$toast(res.data.msg);
              setTimeout(() => {
                this.$router.go(-1);
              }, 200);
            } else {
              this.$toast(res.data.msg);
            }
          });
        } else {
          this.$toast("错啦！");
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  .login-con {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 250px;
    padding: 20px;
    border-radius: 5px;
    background: #fcfcfc;
    img {
      margin-bottom: 20px;
    }
    .ivu-form-item {
      width: 100%;
      margin-right: 0;
      margin-bottom: 25px;
    }
    .control-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      button {
        margin: 0 5px;
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    color: #fff;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    z-index: 10;
  }
}
</style>
