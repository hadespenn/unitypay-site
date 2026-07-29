"use client";

import { useEffect } from "react";
import { defaultLocale } from "./lib/messages";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}`);
  }, []);
  return null;
}
