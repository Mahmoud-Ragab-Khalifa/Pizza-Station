"use client";

import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { Link as IntlLink } from "@/i18n/navigation";

type CustomLinkProps = React.ComponentProps<typeof IntlLink> &
  HTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
  };

const Link: FC<CustomLinkProps> = ({ children, ...rest }) => {
  const [prefetching, setPrefetching] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const linkElement = linkRef.current;
    if (!linkElement) return;

    const onEnter = () => setPrefetching(true);
    const onLeave = () => setPrefetching(false);

    linkElement.addEventListener("mouseover", onEnter);
    linkElement.addEventListener("mouseleave", onLeave);

    return () => {
      linkElement.removeEventListener("mouseover", onEnter);
      linkElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <IntlLink ref={linkRef} prefetch={prefetching} {...rest}>
      {children}
    </IntlLink>
  );
};

export default Link;
