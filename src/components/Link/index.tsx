"use client";

import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

// Generate navigation utilities
const navigation = createNavigation(routing);
const { Link: IntlLink } = navigation;

type CustomLinkProps = React.ComponentProps<typeof IntlLink> &
  HTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
  };

const Link: FC<CustomLinkProps> = ({ children, ...rest }) => {
  const [prefetching, setPrefetching] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const setPrefetchListener = () => setPrefetching(true);
  const removePrefetchListener = () => setPrefetching(false);

  useEffect(() => {
    const linkElement = linkRef.current;
    if (!linkElement) return;

    linkElement.addEventListener("mouseover", setPrefetchListener);
    linkElement.addEventListener("mouseleave", removePrefetchListener);

    return () => {
      linkElement.removeEventListener("mouseover", setPrefetchListener);
      linkElement.removeEventListener("mouseleave", removePrefetchListener);
    };
  }, []);

  return (
    <IntlLink ref={linkRef} prefetch={prefetching} {...rest}>
      {children}
    </IntlLink>
  );
};

export default Link;
