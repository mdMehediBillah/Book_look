import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-gray-600 w-full rounded-md text-white">
      <button
        onClick={toggleLike}
        className="flex justify-center items-center gap-2 py-1 w-full text-center"
      >
        {liked ? <FaHeart color="cyan" /> : <FaRegHeart />}
        <span>{liked ? "Liked" : "Like"}</span>
      </button>
    </div>
  );
};

export default LikeButton;
