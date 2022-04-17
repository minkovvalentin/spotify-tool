import styles from "./Button.module.scss";
import classNames from "classnames";

enum ButtonThemeEnum {
  Standard = "standard",
  Danger = "danger",
}

type ButtonThemeType = "danger" | "standard";

interface Props {
  text?: string;
  click?: Function;
  buttonClass?: string;
  buttonTheme?: ButtonThemeType;
}

function Button({
  text,
  buttonClass = "",
  click = () => {},
  buttonTheme = "standard",
}: Props) {
  return (
    <button
      className={classNames(styles.button, buttonClass, {
        [styles.standard]: buttonTheme === ButtonThemeEnum.Standard,
        [styles.danger]: buttonTheme === ButtonThemeEnum.Danger,
      })}
      onClick={() => click()}
    >
      {text}
    </button>
  );
}

export default Button;
