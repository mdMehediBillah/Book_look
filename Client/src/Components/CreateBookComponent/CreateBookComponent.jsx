import React, { useState } from "react";
import axios from "axios";
const CreateBookComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    covers: [],
    author: "",
    description: "",
    subjects: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title: formData.title,
      image: formData.covers[0], // Assuming covers is an array of image URLs
      author: formData.author,
      description: formData.description,
      subjects: formData.subjects,
    };
    console.log(newBook);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/v1/books",
    //     newBook
    //   );
    //   console.log("Book created successfully:", response.data);
    // } catch (error) {
    //   console.error("Error creating book:", error);
    // }
  };

  return (
    <main className=" container screen-max-lg rounded-lg">
      <div className="container mx-auto p-4">
        <h2 className="text-lg py-4  text-center ">Type book's information</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-[600px] min-w-[380px] mx-auto p-4 bg-cyan-800 rounded-lg text-white"
        >
          <div className="flex flex-col">
            <label className="text-sm text-white mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book title"
              required
              className="mb-1 border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
              className=" mb-1 border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            />
          </div>
          <div>
            <label className="text-sm text-white mb-1">Subjects</label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="Book subjects"
              className=" mb-1 border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            />
          </div>
          <div>
            <label className="text-sm text-white mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Book description"
              className="mb-1 border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50 min-h-[120px]"
            />
          </div>

          <div className="flex flex-col ">
            <label className="">Upload photo</label>
            <input
              type="file"
              name="banner"
              onChange={handleChange}
              className=""
            />
          </div>
          <button
            type="submit"
            className="bg-rose-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-cyan-500"
          >
            Create Book
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateBookComponent;
