import React from "react";
import MyNavBar from "../components/MyNavBar";
import { VSpace } from "../components/Utilities";
import { Container } from "reactstrap";

import App from "next/app";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  constructor() {
    super();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <MyNavBar></MyNavBar>
        <VSpace height="10px" />
        <Container fluid>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

export default MyApp;
