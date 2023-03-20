import React, {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
  RefObject,
} from "react";
import style from "@src/src/components/common/textfield.module.scss";
import { RootState } from "@src/src/app/store";
import { useSelector } from "react-redux";
import Loading from "./loading";
// import { AppDispatch, RootState } from "@src/src/app/store";
// import { useDispatch, useSelector } from "react-redux";
// import { searchTicketThunk } from "@src/src/store/stocks/slice";

const TextField: React.FC<{
  htmlFor?: string;
  labelName?: string;
  icon: ReactNode;
  inputType: "email" | "text" | "password" | "number";
  isFlex?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  placeHolder?: string;
  cssStyle?: CSSProperties;
  isShowSuggest?: boolean;
  onChangeKey?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeValue?: () => void;
  onSelectTicket?: (symbol: string) => void;
}> = ({
  icon,
  labelName,
  htmlFor,
  inputType,
  isFlex,
  inputRef,
  placeHolder,
  cssStyle,
  onChangeKey,
  isShowSuggest,
  onChangeValue,
  onSelectTicket,
}) => {
  const className = `${style.textField} +  ${isFlex ? style.isFlex : ""} `;

  const { ticket, loadingSearch } = useSelector(
    (state: RootState) => state.stocks
  );
  // const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   console.log(ticket);
  // }, [ticket, loadingSearch]);

  return (
    <div className={className}>
      {labelName && <label htmlFor={htmlFor}>{labelName}</label>}
      <div className={style.textInput} style={cssStyle}>
        {icon}
        <input
          onChange={onChangeValue}
          onKeyDown={onChangeKey}
          autoComplete="off"
          type={inputType}
          id={htmlFor}
          required
          ref={inputRef}
          placeholder={placeHolder}
        />
      </div>
      {isShowSuggest === true && onSelectTicket && (
        <div className={style.textSuggest}>
          {loadingSearch === false ? (
            ticket.bestMatches.map((tick) => {
              return (
                <div
                  key={tick["1. symbol"]}
                  className={style.textSuggestItem}
                  onClick={() => onSelectTicket(tick["1. symbol"])}
                >
                  <div className={style.textSymbol}>{tick["1. symbol"]}</div>
                  <div>{tick["2. name"]}</div>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};
export default TextField;
