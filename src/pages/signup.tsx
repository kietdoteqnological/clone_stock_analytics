import React, { FormEvent, useRef, useState } from "react";
import style from "@src/src/styles/signup.module.scss";
import {
  IoSettingsOutline,
  IoArrowBack,
  IoLockClosedOutline,
  IoPersonOutline,
  IoMailOutline,
  IoArrowUp,
} from "react-icons/io5";
import { BsCoin, BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import TextField from "../components/common/textfield";

import GreenButton from "../components/common/greenButton";
import Link from "next/link";
import ImageDiv from "../components/signup/imageDiv";
import VerifyModal from "../components/signup/verifyModal";
import Tab from "../components/common/tab";
import shopify from "@src/src/assets/shopify.png";
import amazon from "@src/src/assets/amazon.png";
import paypal from "@src/src/assets/paypal.png";
import stripe from "@src/src/assets/stripe.png";
import { LoginItem } from "../interface/auth";

const Signup = () => {
  const router = useRouter();
  const refForm = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const goBack = () => {
    router.back();
  };

  const [chooseButton, setChooseButton] = useState<
    "shopify" | "amazon" | "stripe" | "paypal"
  >("shopify");

  const handleClickChooseButton = (
    value: "shopify" | "amazon" | "stripe" | "paypal"
  ) => {
    setChooseButton(value);
  };

  const listItemTabs: string[] = ["1 Year", "2 Year", "3 Year", "4 Year"];
  const [activeTab, setActiveTab] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const setTabHandler = (idx: number) => {
    setActiveTab(idx);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current?.value && pwRef.current?.value) {
      const loginItem: LoginItem = {
        username: emailRef.current.value,
        password: pwRef.current.value,
      };
      localStorage.setItem("LOGIN_ITEM", JSON.stringify(loginItem));
    }

    setShowModal(true);
  };

  return (
    <div className={style.container}>
      <div className={style.leftContainer}>
        <div className={style.leftIcon}>
          <IoSettingsOutline className={style.icon} /> <span>Invest</span>
        </div>
        <div className={style.leftBox}>
          <button className={style.backButton} onClick={goBack}>
            <IoArrowBack />
          </button>
          <div>
            <p className={style.title}>Create an account</p>
            <p className={style.des}>Required fields have an asterisk: *</p>
          </div>
          <form
            className={style.form}
            ref={refForm}
            onSubmit={handleSubmitForm}
          >
            <div className={style.nameForm}>
              <TextField
                htmlFor="fname"
                icon={<IoPersonOutline />}
                labelName="First name: *"
                inputType="text"
                isFlex={true}
              />

              <TextField
                htmlFor="lname"
                icon={<IoPersonOutline />}
                labelName="Last name: *"
                inputType="text"
                isFlex={true}
              />
            </div>

            <TextField
              htmlFor="email"
              icon={<IoMailOutline />}
              labelName="Email address: *"
              inputType="email"
              inputRef={emailRef}
            />

            <TextField
              htmlFor="password"
              icon={<IoLockClosedOutline />}
              labelName="Password: *"
              inputType="password"
              inputRef={pwRef}
            />

            <div className={style.checkAgreement}>
              <input type="checkbox" required />
              <p>
                I certify that I am 18 years of age or older, agree to the
                <span> User Agreement</span>, and acknowledge the
                <span> Privacy Policy</span>
              </p>
            </div>
            <GreenButton content="Create free account" type="submit" />
          </form>

          <p className={style.note}>
            <b>Sign up </b>
            for a bussiness account
          </p>
        </div>
      </div>
      <div className={style.rightContainer}>
        <div className={style.information}>
          <Link className="support" href="/signup">
            Support
          </Link>
          <Link className="sign-in" href="/">
            Sign in
          </Link>
        </div>
        <h1>Your first trade & Invest in under 10 minutes.</h1>
        <div className={style.box}>
          <p>What if you invested in...</p>
          <div className={style.chooseBrand}>
            <ImageDiv
              brand="shopify"
              source={shopify}
              handleClickChooseButton={handleClickChooseButton}
              state={chooseButton}
            />
            <ImageDiv
              brand="paypal"
              source={paypal}
              handleClickChooseButton={handleClickChooseButton}
              state={chooseButton}
            />
          </div>
          <div className={style.chooseBrand}>
            <ImageDiv
              brand="amazon"
              source={amazon}
              handleClickChooseButton={handleClickChooseButton}
              state={chooseButton}
            />
            <ImageDiv
              brand="stripe"
              source={stripe}
              handleClickChooseButton={handleClickChooseButton}
              state={chooseButton}
            />
          </div>

          <TextField
            htmlFor="invest"
            icon={<BsCoin />}
            labelName="If you invested..."
            inputType="number"
          />

          <Tab
            listItem={listItemTabs}
            onSetTab={setTabHandler}
            state={activeTab}
          />

          <div className={style.infor}>
            <p>You would have</p>
            <BsInfoCircle />
          </div>

          <div className={style.investNow}>
            <div className={style.investInfo}>
              <span className={style.investResult}>$2.478.00</span>
              <span className={style.investGrow}>
                <IoArrowUp />
                <p>60.85%</p>
              </span>
            </div>
            <GreenButton content="Invest now" />
          </div>
        </div>
      </div>
      <VerifyModal
        onClose={() => setShowModal(false)}
        isShow={showModal}
      ></VerifyModal>
    </div>
  );
};
export default Signup;
