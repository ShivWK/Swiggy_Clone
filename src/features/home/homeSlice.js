import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    lat: 12.9715987,
    lng: 77.5945627,
    foodieThoughtsData: [],
    topRestaurantsData: [],
    recentLocations: [],
    bestNearCuisions: [],
    bestPlacesToEat: [],
    nearByRestaurants: [],
    restaurantsWithOnlineDelivery: [],
    yourCurrentCity: "",
    searchedCity: "Bangalore",
    searchedCityAddress: ", Karnataka, India",
    topRestaurantsTitle: "Top restaurant chains in Bangalore",
    onlineDeliveryTitle: "Restaurants with online food delivery in Bangalore",
    isLoading: true,
    isOnline: true,
    availableInCityies: [],
    pathHistory: [],
    userFriendlyPathHistory: [],
}

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {
        addLatAndLng: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },

        setPathHistory: (state, action) => {
            const newPath = action.payload;
            const existingIndex = state.pathHistory.indexOf(newPath);

            if (existingIndex !== -1) {
                state.pathHistory = state.pathHistory.slice(0, existingIndex + 1)
            } else if (Array.isArray(action.payload)) {
                state.pathHistory = action.payload;
            } else if (!newPath) {
                return;
            } else {
                state.pathHistory.push(newPath);
            }

            const storedPath = JSON.parse(localStorage.getItem("pathHistory")) || [];
            if (action.payload !== storedPath.at(-1) && action.payload) {
                localStorage.setItem("pathHistory", JSON.stringify(state.pathHistory));
            }
        },

        setUserFriendlyPathHistory: (state, action) => {

            localStorage.setItem("userFriendlyPathHistory", JSON.stringify(action.payload));
            state.userFriendlyPathHistory = action.payload;
        },

        addFoodieThoughtsData: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.id === "whats_on_your_mind"
            )
                ?.card?.card?.imageGridCards?.info || [];

            state.foodieThoughtsData = result;
        },

        addTopRestaurantsData: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.id === "top_brands_for_you"
            )
                ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            state.topRestaurantsData = result;
        },


        addRestaurantsWithOnineDelivery: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.id === "restaurant_grid_listing_v2"
            )
                ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            state.restaurantsWithOnlineDelivery = result;
        },

        addBestNearCuisions: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.title === "Best Cuisines Near Me"
            )
                ?.card?.card?.brands || [];

            state.bestNearCuisions = result;
        },

        addBestPlacesToEat: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.title === "Best Places to Eat Across Cities"
            )
                ?.card?.card?.brands || [];

            state.bestPlacesToEat = result;
        },

        addNearByRestaurants: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.title === "Explore Every Restaurants Near Me"
            )
                ?.card?.card?.brands || [];

            state.nearByRestaurants = result;
        },

        addAvailableCities: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.seo.widgets.v1.FooterContent"
            )
                ?.card?.card?.cities || [];

            state.availableInCityies = result;
        },

        addTopRestaurantsTitle: (state, action) => {
            const title = action.payload?.data?.cards?.find(
                item => item?.card?.card?.id === "top_brands_for_you"
            )
                ?.card?.card?.header?.title;

            state.topRestaurantsTitle = title;
        },

        addSearchedCity: (state, action) => {
            if (typeof action.payload !== "object" || action.payload === null) {
                // we are checking for null because type of null is alos object
                state.searchedCity = action.payload;
            } else {
                const city = action.payload?.data?.cards?.find(
                    item => item?.card?.card?.id === "top_brands_for_you"
                )
                    ?.card?.card?.header?.title || "your location";
                state.searchedCity = city;
            }
        },

        addOnlineDeliveryTitle: (state, action) => {
            const title = action.payload.data.cards.find(item => {
                return item?.card?.card?.id === "popular_restaurants_title";
            })
                ?.card?.card?.title;
            state.onlineDeliveryTitle = title;
        },

        addSearchedCityAddress: (state, action) => {
            state.searchedCityAddress = action.payload;
        },

        addYourCurrentCity: (state, action) => {
            state.yourCurrentCity = action.payload;
        },

        removeYourCurrentCity: (state) => {
            state.yourCurrentCity = "";
        },

        addRecentLocations: (state, action) => {
            const newItem = Array.isArray(action.payload) ? action.payload : [action.payload];

            const combine = [...newItem, ...state.recentLocations].reduce((acc, item) => {
                if (!acc.some(element => element.place_id === item.place_id)) {
                    acc.push(item);
                }
                return acc
            }, [])

            state.recentLocations = combine;
        },

        removeARecentLocation: (state, action) => {
            state.recentLocations.splice(action.payload, 1);
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setOnline: (state, action) => {
            state.isOnline = action.payload;
        },
    }
});

export default homeSlice.reducer;
export const selectFoodieThoughtsData = state => state.home.foodieThoughtsData;
export const selectTopRestaurantsTitle = state => state.home.topRestaurantsTitle;
export const selectTopRestaurantsData = state => state.home.topRestaurantsData;
export const selectYourCurrentCity = state => state.home.yourCurrentCity;
export const selectSearchedCity = state => state.home.searchedCity;
export const selectSearchedCityAddress = state => state.home.searchedCityAddress;
export const selectIsLoading = state => state.home.isLoading;
export const selectRecentLocations = state => state.home.recentLocations;
export const selectOnlineDeliveryRestaurants = state => state.home.restaurantsWithOnlineDelivery;
export const selectOnlineDeliveryTitle = state => state.home.onlineDeliveryTitle;
export const selectBestCuisionsNearMe = state => state.home.bestNearCuisions;
export const selectBestPlacesToEat = state => state.home.bestPlacesToEat;
export const selectNearByRestaurants = state => state.home.nearByRestaurants;
export const selectOnlineStatus = state => state.home.isOnline;
export const selectAvailableCities = state => state.home.availableInCityies;
export const selectPathHistory = state => state.home.pathHistory;
export const selectUserFriendlyPathHistory = state => state.home.userFriendlyPathHistory;
export const selectLatAndLng = createSelector([state => state.home.lat, state => state.home.lng], (lat, lng) => ({ lat, lng }))

// if i dont use createSelector()_ then each time when selector is called it will create a new object though it returns the same lat and lng this will cause unnecessary rerenders because store variable are states when they change compo rerenders

export const {
    addFoodieThoughtsData,
    addTopRestaurantsData,
    addSearchedCity,
    addSearchedCityAddress,
    addYourCurrentCity,
    removeYourCurrentCity,
    addTopRestaurantsTitle,
    addRecentLocations,
    setLoading,
    removeARecentLocation,
    addRestaurantsWithOnineDelivery,
    addOnlineDeliveryTitle,
    addBestNearCuisions,
    addBestPlacesToEat,
    addNearByRestaurants,
    setOnline,
    addAvailableCities,
    addLatAndLng,
    setPathHistory,
    setUserFriendlyPathHistory,
} = homeSlice.actions;


