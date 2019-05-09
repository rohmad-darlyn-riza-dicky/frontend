import React from "react";

import { Form, Input, Icon, Checkbox, Button } from "antd";

const styles = {
  form: {
    width: 400,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    yourName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
      // console.log(this.state)
    );
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div>
        <Form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
          {...formItemLayout}
          onSubmit={this.handleSubmit}
        >
          <Form.Item style={styles.form}>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input your Name!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Your Name"
                name="yourName"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item style={styles.form}>
            {getFieldDecorator("user", {
              rules: [
                { required: true, message: "Please input your User Name!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user-add" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="User Name"
                name="userName"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item style={styles.form}>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="E-mail"
                name="email"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item style={styles.form}>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item style={styles.form}>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>

          <Form.Item style={styles.form} {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="test">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
