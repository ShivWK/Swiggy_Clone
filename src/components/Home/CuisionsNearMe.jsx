import PlaceCards from "./PlaceCards";
import ShowMoreBtn from "./ShowMoreBtn";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBestCuisionsNearMe } from "../../features/home/homeSlice";

export default function CuisionsNearMe() {
  const places = useSelector(selectBestCuisionsNearMe);
  const [shownPlaces, setShownPlaces] = useState([]);

  useEffect(() => {
    setShownPlaces(places.slice(0, 15));
  }, []);

  const handleShowMore = () => {
    setShownPlaces((prv) => {
     return [...prv, ...places.slice(15)];
    });
  };

  return (
    <>
      <h3 className="self-start">Best Cuisines Near Me</h3>
      <div className="flex flex-wrap justify-start gap-y-5 gap-x-8">
        {shownPlaces.map((item) => (
          <PlaceCards key={item.link} data={item} />
        ))}
        {shownPlaces.length !== places.length && (
          <ShowMoreBtn handleClick={handleShowMore} />
        )}
      </div>
    </>
  );
}
