"use client";
import ViewUserAccountUI from "@/app/boundaries/AdminUI/ViewUserAccountUI";
import React, { Component } from "react";

const ViewUserAccountPage = () => {
  const viewUserAccountUI = ViewUserAccountUI.getInstance();

  return <>{viewUserAccountUI.displayUserAccountUI()} </>;
};

export default ViewUserAccountPage;
