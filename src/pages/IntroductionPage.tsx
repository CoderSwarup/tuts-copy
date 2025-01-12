import React, { useState } from "react";
import Page from "../components/Intro/Page";
import IntroTab from "../components/Intro/IntroTab";

export default function IntroductionPage() {
  const [isIntroTab, setIsIntroTab] = useState(true);

  return (
    <>
      {isIntroTab ? (
        <IntroTab isIntroTab={isIntroTab} setIsIntroTab={setIsIntroTab} />
      ) : (
        <Page />
      )}
    </>
  );
}
