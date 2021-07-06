import React, { useEffect, useState } from "react";
import DotStepper from "../components/DotStepper";
import FoodLists from "../components/FoodLists";
import AppBar from "../components/AppBar";
function Home() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "a9f80d22-c733-4985-9187-56b2d514aceb", // The ID of this integration.
      region: "eu-gb", // The region your integration is hosted in.
      serviceInstanceID: "9fe04d4b-3465-4b80-ba19-7a9aee7930b9", // The ID of your service instance.
      onLoad: function (instance) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
  }, []);

  return (
    <>
      <AppBar props={{ searchValue, setSearchValue }} />
      <DotStepper />
      <FoodLists filters={{ searchValue }} />
    </>
  );
}

export default Home;
