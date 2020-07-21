<template>
  <div class="main">
    <div class="left">
      <div class="air-column">
        <h2>乘机人</h2>
        <el-form
          class="member-info"
          :model="{customerList}"
          ref="usersForm"
        >
          <div class="member-info-item" v-for="(item,index) in customerList">

            <el-form-item label="乘机人类型"
                          :prop="`customerList[${index}].username`"
                          :rules="[
                              {required:true,message:'请输入乘车人姓名！',trigger:'blur'}
                            ]"
            ><br/>
              <el-input
                placeholder="姓名"
                class="input-with-select"
                v-model="item.username"
              >
                <el-select
                  slot="prepend"
                  value="1"
                  placeholder="请选择">
                  <el-option label="成人" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item label="证件类型"
                          :prop="`customerList[${index}].id`"
                          :rules="[
                            {required: true,message: '请输入合法的身份证号码！',trigger:'blur',pattern:/^\d{17}[\d|x]|\d{15}$/}
                          ]"
            ><br/>
              <el-input
                placeholder="证件号码"
                class="input-with-select"
                v-model="item.id"
              >
                <el-select
                  slot="prepend"
                  value="1"
                  placeholder="请选择">
                  <el-option label="身份证" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <span class="delete-user" @click="customerList.splice(index,1)">-</span>
          </div>
        </el-form>

        <el-button class="add-member" type='primary' @click="addCustomer">添加乘机人</el-button>
      </div>


      <div class="air-column">
        <h2>保险</h2>
        <div>

          <el-checkbox-group v-model="insuranceList">


            <div class="insurance-item"
                 v-for="(item,index) in detailTicket.insurances"
                 :key="index"
            >
              <el-checkbox
                :label="item.id"
                border>
                {{`${item.type}：￥${item.price}/份×${customerList.length} 最高赔付${item.compensation}`}}
              </el-checkbox>
            </div>


          </el-checkbox-group>


        </div>
      </div>


      <div class="air-column">
        <h2>联系人</h2>
        <div class="contact">
          <el-form label-width="60px" :model="{
            contactPerson,
            contactNum,
            yanzhengma
          }"
                   ref="contactForm"
          >
            <el-form-item label="姓名"
                          prop="contactPerson"
                          :rules="[
                            {required:true,message:'联系人不可以为空！',trigger:'blur'}
                          ]"
            >
              <el-input v-model="contactPerson"></el-input>
            </el-form-item>

            <el-form-item label="手机"
                          prop="contactNum"
                          :rules="[
                            {required:true,message:'请输入合法的手机号！',trigger:'blur',pattern: /^0?(13|14|15|18|17)[0-9]{9}$/}
                          ]"
            >
              <el-input placeholder="请输入内容" v-model="contactNum">
                <template slot="append">
                  <el-button @click="handleSendCaptcha">发送验证码</el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="验证码"
                          prop="yanzhengma"
                          :rules="[
                            {required:true,message:'验证码不能为空！',trigger:'blur'}
                          ]"
                          width="100px"
            >
              <el-input v-model="yanzhengma"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="warning" class="submit" @click="handleSubmit" ref="submitForm">提交订单</el-button>
        </div>
      </div>
    </div>
    <OrderAside
      :detailTicket="detailTicket"
      :totalPrice="totalPrice"
      :userLen="customerList.length"
      :adultPrice="adultPrice"
    />
  </div>
</template>

<script>
  import OrderAside from "~/components/air/orderAside";

  export default {
    name: "order",
    components: {
      OrderAside
    },
    data() {
      return {
        customerList: [
          {username: "", id: ""}
        ],
        detailTicket: {},
        rules: {
          username: [
            {
              required: true,
              message: "请输入你的真实姓名",
              trigger: "blur"
            }
          ],
          id: [
            {
              required: true,
              message: "请输入正确的身份证号码",
              trigger: "blur"
            }
          ]
        },
        insuranceList: [],
        contactPerson: "",
        contactNum: "",
        yanzhengma: "",
        // totalPrice: 0,
        adultPrice: 0
      }
    },
    created() {
      this.$axios({
        url: "/airs/" + this.$route.query.id,
        params: {
          seat_xid: this.$route.query.seat_xid
        }
      }).then(res => {
        if (res.status === 200) {
          this.detailTicket = res.data;
          this.adultPrice = this.detailTicket.seat_infos.org_settle_price
        }
      })
    },
    // watch: {
    //   insuranceList() {
    //     this.computedTotalPrice();
    //   },
    //   customerList: {
    //     handler() {
    //       console.log(2)
    //       this.computedTotalPrice();
    //     },
    //     immediate: true
    //   },
    //   totalPrice:{
    //     handler(){
    //       this.computedTotalPrice();
    //     },
    //     immediate:true
    //   }
    //
    // },
    computed: {
      totalPrice() {
        let res = 0;
        if (this.detailTicket.seat_infos) {
          res += this.detailTicket.seat_infos.org_settle_price * this.customerList.length;
          this.detailTicket.insurances.forEach(element => {
            if (this.insuranceList.indexOf(element.id) !== -1) {
              res += element.price * this.customerList.length;
            }
          });
          return res;
        }

      },
    },

    methods: {
      addCustomer() {
        const newPer = {
          username: "",
          id: ""
        }
        this.customerList.push(newPer);
      },
      handleSendCaptcha() {
        this.$refs.contactForm.validateField('contactNum',(errMsg)=>{
          console.log(errMsg)
        }).then(()=>{
          this.$axios({
            url: "/captchas",
            method: "post",
            data: {
              tel: this.contactNum
            }
          }).then(res => {
            if (res.status === 200) {
              this.$message.success("验证码为：" + res.data.code);
            }
          })
        })

      },
      async handleSubmit() {
        //表单提交之前要进行验证
        let isValidUsersForm = await this.$refs.usersForm.validate().catch(e=>{});
        let isValidContactForm = await this.$refs.contactForm.validate().catch(e=>{});
        if (isValidUsersForm && isValidContactForm) {
        const data = {
          users: this.customerList,
          insurances: this.insuranceList,
          contactName: this.contactPerson,
          contactPhone: this.contactNum,
          invoice: false,
          seat_xid: this.$route.query.seat_xid,
          air: this.$route.query.id,
          captcha: this.yanzhengma
        };

          this.$axios({
            url: "/airorders",
            method: "post",
            data,
            headers: {
              Authorization: "Bearer " + this.$store.state.user.userInfo.token
            }
          }).then(res => {
            this.$router.push("/air/pay?id=" + res.data.data.id);
          })
        }

      }
      // computedTotalPrice() {
      //   let res = 0;
      //   // console.log(this.detailTicket);
      //   if (this.detailTicket.seat_infos) {
      //     res += this.adultPrice * this.customerList.length;
      //     this.detailTicket.insurances.forEach(element => {
      //       if (this.insuranceList.indexOf(element.id) !== -1) {
      //         res += element.price * this.customerList.length;
      //       }
      //     });
      //   }
      //   this.totalPrice = res;
      // }
    }

  }
</script>

<style scoped lang="less">
  .main {
    display: flex;
    justify-content: center;
    padding-top: 30px;

    .left {
      margin-right: 60px;
    }
  }

  .air-column {
    border-bottom: 1px #ddd dashed;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .air-column h2 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: normal;
  }

  /deep/ .el-select .el-input {
    width: 130px;
  }

  .input-with-select {
    width: 590px;
  }

  .input-with-select /deep/ .el-input-group__prepend {
    background-color: #fff;
  }

  .member-info /deep/ .el-form-item {
    margin-bottom: 0;
  }

  .member-info-item {
    border-bottom: 1px #eee dashed;
    padding-bottom: 20px;
    position: relative;

    &:first-child {
      .delete-user {
        display: none;
      }
    }
  }

  .add-member {
    margin-top: 20px;
  }

  .delete-user {
    display: block;
    background: #ddd;
    width: 16px;
    height: 16px;
    font-size: 14px;
    text-align: center;
    line-height: 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 50px;
    position: absolute;
    right: -30px;
    top: 50%;
  }

  .insurance {
    > div {
      margin-top: 10px;
    }
  }

  .insurance-item {
    margin-bottom: 20px;
  }

  .contact {
    /deep/ .el-input {
      width: 50%;
    }
  }

  .submit {
    margin: 50px auto;
    display: block;
    width: 250px;
    height: 50px;
  }
</style>
