import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { selectFaqs } from "../../features/home/helpPageSlice";
import { legal, faqs } from "../../utils/helpAndSupportData";

const LegalAndFaqs = memo(() => {
    const [activeIndex, setActiveIndex] = useState(0);
    const faqsStatus = useSelector(selectFaqs);

    console.log(faqsStatus)

    const handleClick = (index) => {
        if (activeIndex === null) {
            setActiveIndex(index);
        } else if(activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    }

    const data = faqsStatus ? faqs : legal;
    const heading = faqsStatus ? "FAQs" : "Legal"
    
    return (<div className="basis-[75%] pl-7 py-7">
        <p className="text-[28px] font-bold text-black tracking-tight mb-4 ">{heading}</p>
        {data.map((obj, index) => {
            return (
                <div key={index} className="border-b-2 border-gray-300">
                    <div onClick={() => handleClick(index)} className="group flex justify-between items-center py-3 px-3 cursor-pointer" style={{
                        backgroundColor: activeIndex === index ? "rgba(255,81,0,0.15)" : "white"
                    }}>
                        <h2 className="grouh2-hover:text-primary text-[18px] font-semibold transition-all duration-150 ease-in select-none text-gray-800">{obj.question}</h2>
                        <i
                            className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] -ml-2.5 inline-block"
                            style={{
                                transform: activeIndex === index ? "rotate(-180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s linear",
                            }}
                        ></i>
                    </div>
                    <div
                        className="p-3 py-5"
                        style={{
                            display: activeIndex === index ? "block" : "none",
                        }}
                    >
                        <p className="text-gray-700 font-medium">{obj.description}</p>
                    </div>
                </div>
            );
        })}
    </div>)
});

export default LegalAndFaqs;