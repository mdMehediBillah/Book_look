import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import Loading from "../Loader/Loader";
// import coverImg from "../../images/cover_not_found.jpg";
// import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoBackComponent from "../GoBackComponent/GoBackComponent";

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);
        setFormData(data);
        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;
          const newBook = {
            description: description
              ? description.value
              : "No description found",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);
  // if (loading) return <Loading />;

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: formData.title,
      image: formData.covers[0],
      author: formData.author,
      description: formData.description,
      subjects: formData.subjects,
    };
    setFormData(newBook);
    // save changes to database
    console.log(newBook.title);
    console.log(newBook.author);
    const img = newBook.image;
    const url = `https://covers.openlibrary.org/b/id/${img}-L.jpg`;
    console.log(url);
  };

  return (
    <>
      {" "}
      <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-cyan-900 max-w-screen-lg">
        <div className="w-3/12">
          <GoBackComponent />
        </div>
        <div className="flex items-center gap-4 w-6/12 justify-center">
          <div>
            <Link
              to="/"
              className="flex justify-center items-center gap-2 text-xl"
            >
              <h3>
                <span className="text-rose-500 font-semibold ">Book</span>
                <span className="text-cyan-600 font-semibold ">Look</span>
              </h3>
            </Link>
          </div>
        </div>
        <div className="w-3/12 flex justify-end">
          <div className="py-1 px-3 font-semibold text-white">
            <h4>Book Details</h4>
          </div>
        </div>
      </section>
      <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-gray-200 max-w-screen-lg">
        <div className="container">
          <div className="grid md:grid-cols-2 justify-center py-8 px-6 gap-4 mt-4">
            <div className="">
              <img src={book?.cover_img} alt="cover img" className="w-full" />
            </div>
            <div className=" flex flex-col gap-2">
              <div className="">
                <span className="text-2xl font-bold">{book?.title}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="">
                  <span className="">{book?.description}</span>
                </div>
                <div className="book-details-item">
                  <span className="fw-6">Subject Places: </span>
                  <span className="text-italic">{book?.subject_places}</span>
                </div>
                <div className="book-details-item">
                  <span className="fw-6">Subject Times: </span>
                  <span className="text-italic">{book?.subject_times}</span>
                </div>
                <div className="book-details-item">
                  <span className="fw-6">Subjects: </span>
                  <span>{book?.subjects}</span>
                </div>
              </div>
              <button
                onClick={handleBookSubmit}
                className="bg-cyan-800 text-white py-2 rounded-xl mt-8 w-10/12 mx-auto font-semibold hover:bg-rose-600"
              >
                Add to shelf
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookDetails;
