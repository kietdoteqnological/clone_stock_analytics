import { FormEvent, useRef } from "react";
// import { fetchTodosThunk } from "../store/todos/slice";
import TextField from "../components/common/textfield";
import style from "@src/src/styles/signin.module.scss";
import {
  IoSettingsOutline,
  IoLockClosedOutline,
  IoMailOutline,
} from "react-icons/io5";
import GreenButton from "../components/common/greenButton";
import { useRouter } from "next/router";
// import { LoginItem } from "../interface/auth";
import { toast } from "react-toastify";
import { useSession, signIn, signOut } from "next-auth/react";
// import { GetServerSidePropsContext } from "next/types";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const refForm = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const loginItem = localStorage.getItem("LOGIN_ITEM");
    // let item: LoginItem = { username: "", password: "" };
    // if (loginItem) {
    //   item = JSON.parse(loginItem) as LoginItem;
    // }
    // if (emailRef.current?.value && pwRef.current?.value) {
    //   if (
    //     item.username === emailRef.current.value &&
    //     item.password === pwRef.current.value
    //   ) {
    //     localStorage.setItem("LOGGED", "true");
    //     router.push("/dashboard");
    //     toast.success("Login success !!");
    //     return;
    //   }
    // }
    signIn("credentials");
    // console.log(csrfToken);
    toast.error("Wrong username or password !!");
  };

  const handleGoSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className={style.container}>
      <div className={style.iconContainer}>
        <IoSettingsOutline className={style.icon} /> <span>Invest</span>
      </div>
      <div className={style.box}>
        <div>
          <p className={style.title}>Login Page</p>
          <p className={style.des}>Required fields have an asterisk: *</p>
        </div>
        <form
          className={style.loginForm}
          ref={refForm}
          onSubmit={handleSubmitForm}
        >
          <div className={style.signInForm}>
            <TextField
              htmlFor="email"
              icon={<IoMailOutline />}
              labelName="Email: *"
              inputType="text"
              inputRef={emailRef}
            />

            <TextField
              htmlFor="password"
              icon={<IoLockClosedOutline />}
              labelName="Password: *"
              inputType="password"
              inputRef={pwRef}
            />
          </div>

          <div className={style.buttonContainer}>
            <GreenButton content="Sign in" type="submit" />
            <GreenButton
              content="Sign up"
              type="button"
              onCick={handleGoSignUp}
            />
          </div>
        </form>
        {session && session.user ? (
          <>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn("google")}>Sign in</button>
        )}
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   console.log(context);
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
