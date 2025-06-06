import HelpHeader from "./HelpHeader";
import HomeHeader from "./HomeHeader";
import ProfileHeader from "./ProfileHeader";
import CartHeader from "./CartHeader";
import RestaurantsHeader from "./RestaurantsHeader";
import SpecificFoodHeader from "./SpecificFoodHeader";
import { useLocation } from "react-router-dom";
import { memo } from "react";

const PageHeader = memo(() => {
  const { pathname } = useLocation();

  if (
    pathname === "/about" ||
    pathname === "/search" ||
    pathname === "/offers-dinouts" ||
    pathname === "/"
  ) {
    return <HomeHeader />;
  } else if (pathname === "/help") {
    return <HelpHeader />;
  } else if (pathname === "/profile") {
    return <ProfileHeader />;
  } else if (pathname === "/cart") {
    return <CartHeader />;
  } else if (pathname.includes("restaurantSpecific") || pathname.includes("dishSearch")) {
    return <RestaurantsHeader />;
  } else if (pathname.includes("specificFood")) {
    return <SpecificFoodHeader />
  }

  return null;
});

export default PageHeader;
