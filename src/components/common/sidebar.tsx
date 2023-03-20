import React, { useState } from "react";
import style from "@src/src/styles/sidebar.module.scss";
import LinkBox, { LinkList } from "./linkBox";
import {
  IoHomeOutline,
  IoMailOutline,
  IoWalletOutline,
  IoAnalyticsOutline,
  IoNewspaperOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const SideBar = () => {
  const [expand, setExpand] = useState<boolean>(false);

  const navItemList1: LinkList[] = [
    {
      name: "Overview",
      link: "/dashboard",
      icon: <IoHomeOutline />,
      isActive: true,
    },
    {
      name: "Inbox",
      link: "/dashboard",
      icon: <IoMailOutline />,
      notification: 4,
    },
    { name: "Wallet", link: "/dashboard", icon: <IoWalletOutline /> },
    { name: "Analytics", link: "/dashboard", icon: <IoAnalyticsOutline /> },
    { name: "News", link: "/dashboard", icon: <IoNewspaperOutline /> },
  ];

  const navItemList2: LinkList[] = [
    {
      name: "Setting",
      link: "/dashboard",
      icon: <IoSettingsOutline />,
    },

    { name: "News", link: "/dashboard", icon: <IoHelpCircleOutline /> },
  ];

  // const logoutHandler = () => {
  //   const item = localStorage.getItem("LOGGED");
  //   if (item) {
  //     localStorage.removeItem("LOGGED");
  //     router.push("/");
  //   }
  // };

  const clickExpandHandler = () => {
    setExpand((prev) => !prev);
  };

  return (
    <nav className={style.sidebar}>
      <div
        className={`${style.iconBox} + ${
          expand === true ? style.isExpand : ""
        }`}
      >
        <div
          className={`${style.icon} + ${expand === true ? style.isExpand : ""}`}
        >
          <IoSettingsOutline className={style.iconApp} /> <span>Invest</span>
        </div>
        {expand === true ? (
          <BsArrowRight className={style.logout} onClick={clickExpandHandler} />
        ) : (
          <BsArrowLeft className={style.logout} onClick={clickExpandHandler} />
        )}
      </div>
      <LinkBox
        linkList={navItemList1}
        title="General"
        isLast={false}
        isExpand={expand}
      />
      <LinkBox
        linkList={navItemList2}
        title="Support"
        isLast={true}
        isExpand={expand}
      />
    </nav>
  );
};

export default SideBar;
