import Link from "next/link";
import React, { ReactNode } from "react";
import style from "@src/src/components/common/linkBox.module.scss";
import { useRouter } from "next/router";

export interface LinkList {
  name: string;
  link: string;
  notification?: number;
  icon?: ReactNode;
  isActive?: boolean;
}

interface Props {
  linkList: LinkList[];
  isLast: boolean;
  title: string;
  isExpand: boolean;
}

const LinkBox: React.FC<Props> = ({ linkList, isLast, title, isExpand }) => {
  const router = useRouter();

  const goLink = (link: string) => {
    router.push(link);
  };

  return (
    <nav
      className={`${style.linkBox} + ${isLast ? style.isLast : ""} + ${
        isExpand ? style.isExpand : ""
      }`}
    >
      <p className={style.title}>{title}</p>
      <ul>
        {linkList.map((item, idx) => {
          return (
            <li
              key={idx}
              className={`${style.navItem} + ${
                item.isActive ? style.active : ""
              }`}
              onClick={() => goLink(item.link)}
            >
              <div className={style.boxItem}>
                <div className={style.boxIcon}>
                  {item.icon}
                  <Link href={item.link}>{item.name}</Link>
                </div>
                {item.notification && (
                  <div className={style.notification}>
                    <p>{item.notification}</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LinkBox;
