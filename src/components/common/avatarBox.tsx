import React, { ReactNode } from "react";
import style from "@src/src/components/common/avatarBox.module.scss";
import Image, { StaticImageData } from "next/image";

const AvatarBox: React.FC<{
  imageSrc: string | StaticImageData;
  title: string;
  note: string;
  icon?: ReactNode;
}> = ({ imageSrc, note, title, icon }) => {
  return (
    <div className={style.avatarBox}>
      <div className={style.avatar}>
        <Image src={imageSrc} alt="avatar" />
      </div>
      <div className={style.infor}>
        <p className={style.name}>{title}</p>
        <p className={style.role}>{note}</p>
      </div>
      {icon && <div className={style.iconExpand}>{icon}</div>}
    </div>
  );
};

export default AvatarBox;
