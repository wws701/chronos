import { Avatar } from "evergreen-ui";
import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

import { Datum } from "./types";

interface LabelCellProps extends Datum {
  hide: boolean;
  maxValue: number;
  showIcons: boolean;
}

const THEME_BASE_SIZE = 16;
const THEME_COLOR = "#3D9CF4";
const TRANSITION_DELAY = 1000; // ms

const LabelCell = ({
  hide,
  iconSrc,
  label,
  labelSrc,
  maxValue,
  showIcons,
  value
}: LabelCellProps) => {
  const [inProp, setInProp] = React.useState(false);
  useEffect(() => {
    setInProp(true);
  }, []);

  const defaultStyles = {
    borderBottomColor: THEME_COLOR,
    transition: `width ${TRANSITION_DELAY}ms`,
    width: 0
  };
  const transitionStyles = {
    entering: { width: 0 },
    entered: { width: `${(value / maxValue) * 100}%` },
    exiting: {},
    exited: {},
    unmounted: {}
  };

  return (
    <Transition in={inProp} timeout={0}>
      {(state: TransitionStatus) => (
        <div
          className="bar-chart-table__cell"
          style={{ visibility: hide ? "hidden" : undefined }}
        >
          {showIcons && (
            <Avatar
              className="bar-chart-table__label-icon"
              src={iconSrc}
              hashValue={label}
              name={label}
              size={THEME_BASE_SIZE}
            />
          )}
          <div className="bar-chart-table__label-content">
            {labelSrc ? (
              <span>
                <a href={labelSrc} target="none">
                  {label}
                </a>
              </span>
            ) : (
              <span>{label}</span>
            )}
            <div
              className="bar-chart-table__label-bar"
              style={{
                ...defaultStyles,
                ...transitionStyles[state]
              }}
            ></div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default LabelCell;