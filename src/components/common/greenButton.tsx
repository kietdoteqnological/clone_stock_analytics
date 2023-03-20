import React from "react";
import style from "@src/src/components/common/greenButton.module.scss";

const GreenButton: React.FC<{
  content: string;
  type?: "button" | "submit" | "reset";
  isRevertColor?: boolean;
  onCick?: () => void;
}> = ({ content, type, onCick, isRevertColor }) => {
  const className = `${style.greenButton} + ${
    isRevertColor ? style.colorRevert : ""
  }`;
  return (
    <button type={type} className={className} onClick={onCick}>
      {content}
    </button>
  );
};

export default GreenButton;
