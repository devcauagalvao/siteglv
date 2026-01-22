import React from "react";
import GlobalMap from "../components/GlobalMap";

const MapPage: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <GlobalMap />
    </div>
  );
};

export default MapPage;
