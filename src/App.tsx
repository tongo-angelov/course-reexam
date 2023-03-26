import { useState } from "react";

import PageLayout from "./components/PageLayout/PageLayout";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Header from "./components/Header/Header";
import ProductsList from "./components/Products/ProductsList";
import FilterCard from "./components/FilterCard/FilterCard";

function App() {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  return (
    <PageLayout
      drawer={
        <SideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
      }
      header={<Header toggleDrawer={() => setShowDrawer(!showDrawer)} />}
      side={<FilterCard />}
      main={<ProductsList />}
    />
  );
}

export default App;
