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
              initialValue: this.getDataUser.name || '',
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
              initialValue: this.getDataUser.email || '',
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
              initialValue: this.getDataUser.userName || '',
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
              initialValue: this.getDataUser.password || '',
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
              initialValue: this.getDataUser.password || '',
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
              initialValue: this.getDataUser.phone || '',
              rules: [
                { required: true, message: 'Please input your phone number!' },
              ],
            },
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '84' }]"
            style="width: 70px"
          >
            <a-select-option value="84"> +84 </a-select-option>
            <a-select-option value="86"> +86 </a-select-option>
            <a-select-option value="87"> +87 </a-select-option>
          </a-select>
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
              initialValue: this.getDataUser.gender || 0,
              rules: [
                { required: true, message: 'Please select your gender!' },
              ],
            },
          ]"
        >
          <a-select-option value="0"> Nam </a-select-option>
          <a-select-option value="1"> Nữ </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-bind="buttonFormItemLayout" class="buttonSunbmit">
        <a-button type="danger" html-type="submit"> Xác nhận </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment';
import axios from 'axios'

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
      buttonFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 6,
          },
        },
      },
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },

  computed: {
    getDataUser() {
      this.form.resetFields();
      return this.$store.getters.getDataUser
    },
  },
  updated() {
    this.user = this.getDataUser;
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const valueUpdate = {
            ...this.getDataUser,
            email: values.email,
            gender: values.gender,
            name: values.name,
            phone: values.phone,
            password: values.password,
            userName: values.userName,
            dateUpdate: moment().format(),
          }

          axios.put(`http://localhost:3004/users/${valueUpdate.id}`,valueUpdate)
          .then(response =>{
            console.log(response);
            this.$store.dispatch('fetchUser')
          })
        }
      });
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
};
</script>
<style scoped lang="scss">
.form {
  margin: auto;
  width: 80%;
  .buttonSunbmit {
    button {
      width: 400px;
      height: 50px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
