import { useRef } from "react";
import BreadcrumbsWrapper from "./BreadcrumbsWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SearchContainer = ({
  placeholder,
  Child = null,
  searchTerm,
  handleSearch,
  crossHandler,
}) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [searchParams] = useSearchParams();
  const nameRef = useRef(searchParams.get("name"));

  return (
    <div className="pt-2 w-full max-md:px-2 md:max-w-[850px] mx-auto min-h-[105vh] bg-white">
      <div className="sticky top-16 bg-white pt-2 md:pt-8 z-20">
        <div className="mt-4 mb-5">
          <BreadcrumbsWrapper
            normalTextColor={"#4a5565"}
            mainTextColor={"#101828"}
            delimiterColor={"text-gray-600"}
          />
        </div>
        {!pathname.includes("searchResult") ? (<div id="searchBAr" className="flex w-full items-center justify-evenly p-2.5 py-1.5 border-b-2 rounded-md bg-gray-100 ">
          {pathname.includes("dishSearch") && (<i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-long-fill text-3xl cursor-pointer transform hover:translate-x-[-5px] transition-all duration-300 ease-in-out"
          ></i>)
          }
          <input
            className="text-gray-900 py-1 md:py-1.5 px-2 outline-none bg-transparent text-lg font-semibold basis-[95%]"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={placeholder}
          />
          {searchTerm !== "" ? (
            <i
              onClick={crossHandler}
              className="ri-close-large-fill text-2xl cursor-pointer"
            ></i>
          ) : (
            <i className="ri-search-2-line text-2xl cursor-pointer"></i>
          )}
        </div>)
          : <button onClick={() => navigate(-1)} className="w-fit flex items-center cursor-pointer">
            <i className="ri-arrow-drop-left-line text-4xl -ml-3.5"></i>
            <p className="-ml-1 font-medium">Back</p>
          </button>
        }
      </div>
      <div className="">{<Child context={searchTerm} />}</div>
    </div>
  );
};

export default SearchContainer;
