<template>
  <div class="form">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          Name&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              initialValue: '',
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          Username&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'userName',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="Confirm Password"
        has-feedback
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Phone Number">
        <a-input
          v-decorator="[
            'phone',
            {
              initialValue: '',
              rules: [
                { required: true, message: 'Please input your phone number!' },
              ],
            },
          ]"
          style="width: 100%"
        >
          <!-- <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '84' }]"
            style="width: 70px"
          >
            <a-select-option value="84"> +84 </a-select-option>
            <a-select-option value="86"> +86 </a-select-option>
            <a-select-option value="87"> +87 </a-select-option>
          </a-select> -->
        </a-input>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="address">
        <a-cascader
          v-decorator="[
            'address',
            {
              initialValue: ['haiduong', 'kinhmon', 'anphu'],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: 'Please select your habitual residence!',
                },
              ],
            },
          ]"
          :options="address"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Gender">
        <a-select
          v-decorator="[
            'gender',
            {
              initialValue: '0',
              rules: [
                { required: true, message: 'Please select your gender!' },
              ],
            },
          ]"
        >
          <a-select-option value="1"> Nam </a-select-option>
          <a-select-option value="0"> Nữ </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item class="buttonSunbmit">
        <a-button type="primary" html-type="submit"> Xác nhận </a-button>
        <a-button type="danger" @click="resetFrom" >Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import EventBus from '../../EventBus';

const address = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
  {
    value: "haiduong",
    label: "Hải Dương",
    children: [
      {
        value: "kinhmon",
        label: "Kinh Môn",
        children: [
          {
            value: "anphu",
            label: "An Phụ",
          },
        ],
      },
    ],
  },
];

export default {
  data() {
    return {
      confirmDirty: false,
      address,
      autoCompleteResult: [],
      user: {},
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  created() {
    // EventBus.$on('isModalAddUserClose', (status) => {
    //   if(status === false) {
    //     this.form.resetFields();
    //   }
    // });
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },

   methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);

          axios.post(`http://localhost:3004/users`,
            {
              ...values,
              dateUpdate: moment().format(),
              dateCreate: moment().format(),
              cart: [],
              oder: [],
            }
          )
          .then( (res) =>{
            console.log('ádasd', res);
            this.$store.dispatch('fetchUser')
          })
          .catch((err) => {
            console.log(err)
          })
          EventBus.$emit('isModalAddUser', false);
          this.form.resetFields();
        }
      });
    },

    resetFrom() {
      this.form.resetFields();
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },

    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },

    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
  },
}
</script>

<style scoped lang="scss">
  .buttonSunbmit {
    width: 50%;
    margin: auto;
    .ant-form-item-children {
      button {
        width: 20%;
        height: 40px;
        &:nth-child(2) {
          margin-left: 270px;
        }
      }
    }

  }
</style>
