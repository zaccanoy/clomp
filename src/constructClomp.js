import React, { forwardRef } from "react";
import domElements from "./domElements";
import parseClompString from "./parseClompString";
import PropTypes from "prop-types";

const constructClomp = (target) =>
  function (clompTemplates, ...fns) {
    const ClompComponent = forwardRef((props, ref) => {
      const clompClassNames = parseClompString(props, clompTemplates, ...fns);
      const classNames = props.className
        ? [clompClassNames, props.className].join(" ")
        : clompClassNames;

      let Component = target;

      return <Component {...props} className={classNames} ref={ref} />;
    });

    ClompComponent.displayName = "ClompComponent";

    ClompComponent.propTypes = {
      className: PropTypes.string,
    };

    return ClompComponent;
  };

domElements.forEach((el) => (constructClomp[el] = constructClomp(el)));

export default constructClomp;
