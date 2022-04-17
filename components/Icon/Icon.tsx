import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  IconPrefix,
  IconName,
} from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler } from "react";

interface Props {
  prefix: IconPrefix;
  iconName: IconName;
  iconClass?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

function Icon({
  prefix,
  iconName,
  iconClass,
  onClick: onClickProp = () => {},
}: Props) {
  const providedIconLookup: IconLookup = { prefix: prefix, iconName: iconName };
  const providedIconDefinition: IconDefinition =
    findIconDefinition(providedIconLookup);

  return (
    <FontAwesomeIcon
      icon={providedIconDefinition}
      className={iconClass}
      onClick={(event) => onClickProp(event)}
    />
  );
}

export default Icon;
