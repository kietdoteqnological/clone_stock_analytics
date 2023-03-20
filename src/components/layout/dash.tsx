import { LayoutProps } from "@src/src/interface/common";
import React from "react";
import SideBar from "../common/sidebar";
import style from "@src/src/styles/layoutDash.module.scss";
import Header from "../common/header";
import { Auth } from "../auth/auth";
const DashBoardLayout = ({ children }: LayoutProps) => {
  return (
    <Auth>
      <div className={style.dashboardLayout}>
        <div className={style.header}>
          <Header />
        </div>

        <div className={style.sidebar}>
          <SideBar />
        </div>

        <div className={style.main}>{children}</div>
      </div>
    </Auth>
  );
};

export default DashBoardLayout;
