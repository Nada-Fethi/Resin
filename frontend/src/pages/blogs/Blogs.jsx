// eslint-disable-next-line no-unused-vars
import React from "react";
import blogsData from "../../data/blogs.json";
const Blogs = () => {
  return (
    <section className="section__container blog__container">
      <div className="blog">
        <h2 className="section__header">Explore Our Latest Products Creations</h2>
        <p className="section__subheader">
          Uncover the beauty of our latest resin products, from stunning designs
          to step-by-step crafting tips and trends in the resin world.
        </p>
      </div>
      <div className="grid grid-cols-1">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={blog.imageUrl} alt="blog" />
            <div className="blog__card__content">
              <h6>{blog.subtitle} </h6>
              <h4>{blog.title} </h4>
              <p>{blog.date} </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
