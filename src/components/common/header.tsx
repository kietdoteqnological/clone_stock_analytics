import React, { KeyboardEvent, useRef, useState } from "react";
import style from "@src/src/styles/header.module.scss";
import TextField from "./textfield";
import { BsSearch, BsBell, BsChevronExpand } from "react-icons/bs";
import avatar from "@src/src/assets/avatar.png";
import AvatarBox from "./avatarBox";
import { AppDispatch } from "@src/src/app/store";
import { useDispatch } from "react-redux";
import {
  fetchStocksThunk,
  resetTicketState,
  searchTicketThunk,
} from "@src/src/store/stocks/slice";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggest, setShowSuggest] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      inputRef.current?.value &&
      inputRef.current?.value.trim() !== ""
    ) {
      dispatch(searchTicketThunk({ keyword: inputRef.current?.value.trim() }));
      setShowSuggest(true);
    }
  };

  const onChangeShowSuggest = () => {
    if (inputRef.current?.value.trim().length === 0) {
      setShowSuggest(false);
    }
  };

  const onSelectTicket = (symbol: string) => {
    dispatch(fetchStocksThunk({ funtion: "TIME_SERIES_WEEKLY", symbol }));
    dispatch(resetTicketState());
    setShowSuggest(false);
    if (inputRef.current?.value) inputRef.current.value = "";
  };

  return (
    <div className={style.header}>
      <div className={style.searchBox}>
        <TextField
          onSelectTicket={onSelectTicket}
          onChangeValue={onChangeShowSuggest}
          isShowSuggest={showSuggest}
          inputRef={inputRef}
          onChangeKey={handleKeyDown}
          icon={<BsSearch />}
          inputType="text"
          placeHolder={"Search..."}
          cssStyle={{ color: "#ccc", backgroundColor: "#f9fbfc" }}
        />
      </div>
      <div className={style.rest}>
        <div className={style.notify}>
          <BsBell />
        </div>
        <AvatarBox
          imageSrc={avatar}
          note="Admin"
          title="Gabe Lackmen"
          icon={<BsChevronExpand />}
        />
      </div>
    </div>
  );
};

export default Header;
