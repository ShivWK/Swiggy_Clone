import { useState, memo } from "react";
import { selectWishlistItems, addToWishlistItem, deleteItemFromWishlist } from "../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import AddToCartBtn from "../AddToCartBtn";

const TopPicksCard = memo(({ data, restaurantData }) => {
  const dispatch = useDispatch()
  const wishlist = useSelector(selectWishlistItems);
  const isWishListed = data?.id in wishlist || false;

  const [isError, setIsError] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(isWishListed)
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${data?.creativeId}`;

  const defaultPrice = data?.price / 100 || data?.defaultPrice / 100 || 0;
  const finalPrice = data?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="tracking-tight flex gap-1 items-center font-semibold text-white">
      <span className="line-through text-gray-300">₹{defaultPrice} </span>₹
      {finalPrice} {" "}
      <svg className="inline" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z" fill="#1BA672"></path></svg>
    </p>
  ) : (
    <p className="tracking-tight font-semibold text-white">₹{defaultPrice}</p>
  );

  const wishlistAddHandler = (wishlistObject, id) => {
    if (id in wishlist) {
      setWishlistAdded(false);
      dispatch(deleteItemFromWishlist(id))
    } else {
      setWishlistAdded(true);
      dispatch(addToWishlistItem(wishlistObject));
    }
  }
  return (
    <div
      className={`relative flex flex-col shrink-0 justify-between w-72 h-72 my-2 p-4 mb-8`}
    >
      <img
        src={isError ? "/images/fallback.png" : imageUrl}
        alt={data?.name}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl -z-10"
        onError={() => setIsError(true)}
      />

      {isError && (
        <div id="decription">
          <p className="text-black font-bold text-lg">{data?.name}</p>
          <p className="">
            {data?.description ? data?.description.match(/\w+.*?\./)?.[0] : ""}
          </p>
        </div>
      )}
      <div
        id="button"
        className="flex items-center justify-between mt-auto pl-0.5"
      >
        <div
          className="flex items-center gap-1.5 text-lg font-semibold"
          style={{
            color: !isError ? "white" : "black",
          }}
        >
          {price}
          <div className="cursor-pointer inline-flex items-center justify-center rounded-full p-0.5" onClick={() => wishlistAddHandler({ restaurantData, item: data, quantity: 1 }, data?.id)} style={{ backgroundColor: wishlistAdded ? "red" : "rgba(0, 0, 0, 0.6)" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6 wishlist-icon"
            >
              <path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736ZM5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701C17.3397 4.67979 14.9458 4.60806 13.3743 5.98376L9.17157 10.1869L7.75736 8.77264L10.582 5.946L10.5002 5.87701C8.92545 4.61197 6.62322 4.71993 5.17157 6.17157Z"></path>
            </svg>
          </div>
        </div>
        {/* <button className="py-1 px-7 bg-green-500 text-white rounded-md cursor-pointer active:scale-95 transition-all duration-150 ease-in-out font-semibold">
          Add
        </button> */}
          <AddToCartBtn data={{restaurantData, item: data, quantity: 1}} pX="px-7" />
      </div>
    </div>
  );
});

export default TopPicksCard;
