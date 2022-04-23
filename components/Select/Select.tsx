import React, { useEffect } from "react";
import { HiddenSelect, useSelect } from "react-aria";
import { useSelectState } from "@react-stately/select";
import { useButton } from "react-aria";
import ListBox from "../ListBox/ListBox";
import Popover from "../Popover/Popover";
import { useId } from "@react-aria/utils";
import type { AriaSelectProps } from "@react-types/select";
import type { CollectionChildren } from "@react-types/shared";
import { Item } from "@react-stately/collections";
import Icon from "../Icon/Icon";

export interface SelectListItem {
  id: string | number;
  name: string;
}

interface Props extends Omit<AriaSelectProps<object>, "children"> {
  options: SelectListItem[];
  defaultLabel?: string;
  children?: CollectionChildren<Object>;
}

const createListItems = (options: SelectListItem[]) => {
  return options.map((option) => {
    return <Item key={option.id}>{option.name}</Item>;
  });
};

export default function Select({
  options,
  defaultLabel = "Select an option",
  children = createListItems(options),
  ...rest
}: Props) {
  const props = { children, ...rest };

  // Create state based on the incoming (base/AriaSelectProps) props
  let state = useSelectState({ ...props });

  // Get props for child elements from useSelect
  let ref = React.useRef(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);
  const id = useId();

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      id={id}
    >
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...buttonProps}
        ref={ref}
        style={{ height: 30, minWidth: 200, fontSize: 14 }}
      >
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : defaultLabel}
        </span>
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          <Icon prefix="fas" iconName="angle-down" />
        </span>
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
