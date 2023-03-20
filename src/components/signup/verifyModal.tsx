import React, { useEffect, useState } from "react";
import style from "@src/src/components/signup/verifyModal.module.scss";
import ReactDOM from "react-dom";
import { Urbanist } from "next/font/google";
import OtpInput from "react-otp-input";
import GreenButton from "../common/greenButton";
import { useRouter } from "next/dist/client/router";

const urbanist = Urbanist({ subsets: ["latin"] });
const VerifyModal: React.FC<{ onClose: () => void; isShow: boolean }> = ({
  onClose,
  isShow,
}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const router = useRouter();

  const goLogin = () => {
    router.push("/");
  };

  const [OTP, setOTP] = useState("");
  const handleChange = (otp: string) => {
    setOTP(otp);
  };
  const handleCloseClick = () => {
    onClose();
  };
  const modalContent = isShow ? (
    <div className={`${style.modalOverlay} + ${urbanist.className}`}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <a onClick={handleCloseClick}>x</a>
        </div>
        <div className={style.modalBody}>
          <div className={style.description}>
            <p className={style.title}>Enter Verification Code</p>
            <p className={style.note}>
              We have just sent a verification code to
            </p>
            <p className={style.emailNote}>barly@dipainhouse.com</p>
          </div>
          <div className={style.otpInput}>
            <OtpInput
              numInputs={6}
              value={OTP}
              onChange={handleChange}
              isInputNum
              inputStyle={{
                display: "flex",
                alignSelf: "center",
                width: "50px",
                height: "50px",
                marginRight: "1em",
                fontSize: "1rem",
                borderRadius: 4,
                border: "2px solid rgba(0,0,0,0.3)",
                backGround: "#f3f5f7",
                fontWeight: "bold",
              }}
            />
          </div>

          <a href="" className={style.sendCodeAgain}>
            send the code again
          </a>
          <GreenButton
            type="button"
            content="Verify Account"
            onCick={goLogin}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as HTMLElement
    );
  } else {
    return null;
  }
};

export default VerifyModal;
