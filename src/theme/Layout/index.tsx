import React from "react";
import Layout from "@theme-original/Layout";
import IframeModeProvider from "../../components/IFrame/iFrameHelper";

export default function LayoutWrapper(props) {
  return (
    <>
      <IframeModeProvider />
      <Layout {...props} />
    </>
  );
}
