/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import verification from '../../utils/verificationCode';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
      verifyCode: verification.create(),
    };
  }

  componentDidMount() {
    // this.changeCode();
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      Message.success('登录成功');
      this.props.history.push('/');
    });
  };

  changeCode() {
    // this.props.dispatch({ type: 'login/createCode' });
  }

  render() {
    const { verifyCode } = this.state;
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>账户密码登录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="username" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="账户"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="username" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="phone" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="手机号"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="phone" />
            </div>
            <div style={styles.codeFormItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="code" required message="必填">
                <Input
                  size="large"
                  maxLength={6}
                  placeholder="验证码"
                  style={styles.codeInput}
                />
              </IceFormBinder>
              <IceFormError name="code" />
              <img src={verifyCode.dataURL} alt="" />
              {/* <img
                className={styles['verify-code']}
                src={verifyCode.dataURL}
                onClick={changeCode}
                alt=""
              /> */}
            </div>
            <div style={styles.formItem}>
              <IceFormBinder name="checkbox">
                <Checkbox style={styles.checkbox}>自动登录</Checkbox>
              </IceFormBinder>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/user/register" style={styles.tips}>
                立即注册
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}


// const mapDispatchToProps = {
//   userLogin,
// };

// const mapStateToProps = (state) => {
//   return { loginResult: state.login};
// };
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );

// const withReducer = injectReducer({ key: 'login', reducer });

// export default compose(
//   withReducer,
//   withConnect
// )(UserLogin);

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  codeFormItem: {
    marginBottom: '20px',
    display: 'flex',
  },
  inputIcon: {
    position: 'absolute',
    left: '10px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  codeInput: {
    width: '70%',
    paddingLeft: '20px',
    marginRight: '10px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default UserLogin;
