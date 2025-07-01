import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const DeviceBlock = ({ className, isAnimationStarted, isRTL = false }) => {
  const calculateLeftPosition = (ref) => {
    if (isRTL) return null;
    const clientRect = ref.current?.getBoundingClientRect();
    return -(clientRect?.left + clientRect?.width) + "px";
  };

  const phoneIconRef = useRef();
  const tabletIconRef = useRef();
  const laptopIconRef = useRef();

  const [phoneLeftPosition, setPhoneLeftPosition] = useState(
    isRTL ? null : "inherit"
  );
  const [tabletLeftPosition, setTabletLeftPosition] = useState(
    isRTL ? null : "inherit"
  );
  const [laptopLeftPosition, setLaptopLeftPosition] = useState(
    isRTL ? null : "inherit"
  );

  useEffect(() => {
    if (!isRTL) {
      setPhoneLeftPosition(calculateLeftPosition(phoneIconRef));
    }
  }, [phoneIconRef, isRTL]);

  useEffect(() => {
    if (!isRTL) {
      setTabletLeftPosition(calculateLeftPosition(tabletIconRef));
    }
  }, [tabletIconRef, isRTL]);

  useEffect(() => {
    if (!isRTL) {
      setLaptopLeftPosition(calculateLeftPosition(laptopIconRef));
    }
  }, [laptopIconRef, isRTL]);

  useEffect(() => {
    if (isAnimationStarted || isRTL) {
      setLaptopLeftPosition(null);
      setTabletLeftPosition(null);
      setPhoneLeftPosition(null);
    }
  }, [isAnimationStarted, isRTL]);

  return (
    <div className={cn("device-block", className)}>
      <img
        ref={phoneIconRef}
        src="/images/icons/phone.svg"
        alt="Phone"
        style={{ left: phoneLeftPosition }}
        className={cn(
          "device-block__img",
          "device-block__img--phone",
          "hidden-on-mobile"
        )}
      />
      <img
        ref={tabletIconRef}
        src="/images/icons/tablet.svg"
        alt="Tablet"
        style={{ left: tabletLeftPosition }}
        className={cn(
          "device-block__img",
          "device-block__img--tablet",
          "hidden-on-mobile"
        )}
      />
      <img
        ref={laptopIconRef}
        src="/images/icons/laptop.svg"
        alt="Laptop"
        style={{ left: laptopLeftPosition }}
        className={cn(
          "device-block__img",
          "device-block__img--laptop",
          "hidden-on-mobile"
        )}
      />
      <img
        src="/images/icons/devices-sm.svg"
        alt="Devices"
        className={cn("device-block__img--all-devices")}
      />
    </div>
  );
};

DeviceBlock.propTypes = {
  className: PropTypes.string,
  isAnimationStarted: PropTypes.bool.isRequired,
  isRTL: PropTypes.bool,
};

export default DeviceBlock;
