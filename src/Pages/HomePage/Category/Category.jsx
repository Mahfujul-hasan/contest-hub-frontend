import React from "react";
import { FaCamera, FaPalette, FaRegEdit } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
import { MdBusinessCenter, MdSportsEsports } from "react-icons/md";

const categories = [
  { name: "Design", icon: <FaPalette /> },
  { name: "Gaming", icon: <MdSportsEsports /> },
  { name: "Writing", icon: <FaRegEdit /> },
  { name: "Photography", icon: <FaCamera /> },
  { name: "Business", icon: <MdBusinessCenter /> },
  { name: "Music", icon: <IoMdMusicalNote /> },
];

const Category = () => {
  return (
    <section className="py-10">
      <h3 className="text-3xl text-primary font-semibold text-center mb-10">
        Contest Categories
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="card bg-base-200 border border-base-300 p-6 text-center cursor-pointer
                       transition hover:bg-black/5 hover:text-primary"
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center
                            rounded-full bg-base-200 text-xl">
              {category.icon}
            </div>

            <h4 className="font-medium">{category.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
