import { NavLink } from "react-router-dom";

const SectionAndOptions = ({ section }) => {
  return (
    <section className="w-full border-b-10 border-gray-300 bg-white">
      <div className="w-full bg-primary text-white font-semibold text-xl px-1.5 py-2">
        {section.heading}
      </div>
      <div className="flex flex-col justify-center p-1.5 gap-2">
        {section.data.map((item, index) => (
          <NavLink
            key={index}
            className="border-b-[1px] border-gray-300 last:border-b-0 pb-1 flex justify-between items-center"
            to={`/mbStaticData?type=Support${item.question === "Contact Us" ? "&mode=form" : ""}`}
            state={{data : item}}
          >
            <p>{item.question}</p>
            <i className="ri-arrow-drop-right-line text-3xl font-extralight" />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default SectionAndOptions;
