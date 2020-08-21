import React,  {PureComponent} from 'react';
import "./AuthPage.styles.scss";
import SignIn from '../../components/SignIn/SignIn.component';
import SignUp from '../../components/SignUp/SignUp.component';
//import AnimatedMount from '../../components/AnimateComponentMount/AnimateComponentMount.component';

class AuthPage extends PureComponent {
  render() {
    return (
      <div className="auth-container">
        <div className="auth">
          <SignIn />
          <SignUp/>
        </div>
      </div>
    )
  }
}

// export default AnimatedMount({
//   unmountedStyle: {
//     opacity: 0,
//     transform: 'translate3d(-100px, 0, 0)',
//     transition: 'opacity 250ms ease-out, transform 250ms ease-out',
//   },
//   mountedStyle: {
//     opacity: 1,
//     transform: 'translate3d(0, 0, 0)',
//     transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
//   },
// })(AuthPage);

export default AuthPage;
