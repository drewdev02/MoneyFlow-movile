import { SignUp } from '../components/SignUpCompound';

const SignUpScreen: React.FC = () => {
  return (
    <SignUp>
      <SignUp.BackButton />
      <SignUp.Logo />
      <SignUp.Title />
      <SignUp.Form>
        <SignUp.NameInput />
        <SignUp.EmailInput />
        <SignUp.PasswordInput />
        <SignUp.RepeatPasswordInput />
        <SignUp.Error />
        <SignUp.SubmitButton />
        <SignUp.Success />
      </SignUp.Form>
      <SignUp.Footer />
    </SignUp>
  );
};

export default SignUpScreen;
