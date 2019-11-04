import React, { useState } from "react";

import FMTableData from "../contexts/FMTableData";
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
    this.state = { fmTables: [] };
  }

  setFMTables = data => {
    this.setState({ fmTables: data });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <FMTableData.Provider
        value={{ fmTables: this.state.fmTables, setFMTables: this.setFMTables }}
      >
        <Component {...pageProps} />
      </FMTableData.Provider>
    );
  }
}

export default MyApp;
