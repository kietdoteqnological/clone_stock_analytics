import style from "@src/src/components/signup/imageDiv.module.scss";
import Image, { StaticImageData } from "next/image";

export type ImageTypeBrand = {
  brand: "shopify" | "amazon" | "stripe" | "paypal";
};

const ImageDiv: React.FC<{
  brand: "shopify" | "amazon" | "stripe" | "paypal";
  source: StaticImageData;
  state: "shopify" | "amazon" | "stripe" | "paypal";
  handleClickChooseButton: (
    state: "shopify" | "amazon" | "stripe" | "paypal"
  ) => void;
}> = ({ brand, handleClickChooseButton, source, state }) => {
  const clickButtonHandler = () => {
    handleClickChooseButton(brand);
  };
  const className = `${style.brand} +  ${
    state === brand ? style.isChoose : ""
  } `;
  return (
    <div className={className} onClick={clickButtonHandler}>
      <Image src={source} alt={brand} className={style.img} fill />
    </div>
  );
};

export default ImageDiv;
