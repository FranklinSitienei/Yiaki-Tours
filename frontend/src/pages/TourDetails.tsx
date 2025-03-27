import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TfiCommentsSmiley } from "react-icons/tfi";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import {
  FaWhatsapp,
  FaTiktok,
  FaInstagram,
  FaSnapchat,
  FaFacebook,
  FaPlane,
  FaShip,
  FaBus,
  FaTrain,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { AnimatePresence } from "framer-motion";


const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [rated, setRated] = useState(0);
  const [booked, setBooked] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState("plane");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replies, setReplies] = useState<{ [key: number]: string }>({});



  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tours/${id}`);
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error("Failed to fetch tour:", err);
      }
    };

    const fetchUserInteractions = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const tourId = parseInt(id!);

        setLiked(data.liked?.includes(tourId));
        setBookmarked(data.bookmarks?.includes(tourId));
        // Optional: If backend returns rated tours with value
        setRated(data.ratings?.find(r => r.tourId === tourId)?.rating || 0);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchTour();
    fetchUserInteractions();
  }, [id]);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:3000/tours/${id}/comments`);
    const data = await res.json();
    setComments(data);
  };

  const postComment = async () => {
    if (!newComment.trim()) return;
    const res = await fetch(`http://localhost:3000/tours/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment }),
    });
    setNewComment("");
    fetchComments();
  };

  const postReply = async (commentId: number) => {
    if (!replies[commentId]?.trim()) return;
    const res = await fetch(`http://localhost:3000/tours/comments/${commentId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: replies[commentId] }),
    });
    setReplies((prev) => ({ ...prev, [commentId]: "" }));
    fetchComments();
  };


  const transportOptions = {
    plane: { label: "Airplane", cost: 300, icon: <FaPlane /> },
    ship: { label: "Cruise Ship", cost: 200, icon: <FaShip /> },
    bus: { label: "Bus", cost: 100, icon: <FaBus /> },
    train: { label: "Train", cost: 150, icon: <FaTrain /> },
  };

  const handleLike = async () => {
    await fetch(`http://localhost:3000/tours/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setLiked(!liked);
  };

  const handleBookmark = async () => {
    await fetch(`http://localhost:3000/tours/${id}/bookmark`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setBookmarked(!bookmarked);
  };

  const handleRating = async (ratingValue: number) => {
    if (rated === ratingValue) {
      await fetch(`http://localhost:3000/tours/${id}/unrate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRated(0);
    } else {
      await fetch(`http://localhost:3000/tours/${id}/rate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: ratingValue }),
      });
      setRated(ratingValue);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tours/${id}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        setBooked(true);
        navigate("/payment");
      } else {
        const error = await res.json();
        alert(`Booking failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${window.location.href}`,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: `https://www.instagram.com/`,
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      url: `https://www.tiktok.com/`,
    },
    {
      name: "Snapchat",
      icon: <FaSnapchat />,
      url: `https://www.snapchat.com/`,
    },
  ];

  if (!tour) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl font-semibold">Loading tour details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice =
    parseFloat(tour.price) + transportOptions[selectedTransport].cost;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="rounded-2xl shadow-lg">
            <img
              src={tour.image}
              alt={tour.title}
              className="rounded-t-2xl w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">{tour.title}</h2>
                <div className="flex items-center gap-4">
                  <button onClick={handleLike}>
                    {liked ? (
                      <AiFillHeart className="text-red-600 w-6 h-6" />
                    ) : (
                      <AiOutlineHeart className="w-6 h-6" />
                    )}
                  </button>
                  <button onClick={handleBookmark}>
                    {bookmarked ? (
                      <BsBookmarkFill className="text-yellow-600 w-5 h-5" />
                    ) : (
                      <BsBookmark className="w-5 h-5" />
                    )}
                  </button>
                  <div className="relative">
                    <button onClick={() => setShowShareMenu(!showShareMenu)}>
                      <AiOutlineShareAlt className="w-6 h-6" />
                    </button>
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md p-2 z-20 w-40">
                        {shareOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() =>
                              window.open(option.url, "_blank")
                            }
                            className="flex items-center gap-2 w-full px-2 py-1 text-sm hover:bg-gray-100"
                          >
                            {option.icon}
                            {option.name}
                          </button>
                        ))}
                        <button
                          onClick={handleCopyLink}
                          className="flex items-center gap-2 w-full px-2 py-1 text-sm hover:bg-gray-100"
                        >
                          📋 Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                  <Button onClick={() => setShowComments((prev) => !prev)}>
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {tour.description || "No description available."}
              </p>

              <div className="flex items-center mb-4">
                <span className="font-semibold mr-2">Your Rating:</span>
                {[1, 2, 3, 4, 5].map((star) =>
                  rated >= star ? (
                    <BsStarFill
                      key={star}
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleRating(star)}
                    />
                  ) : (
                    <BsStar
                      key={star}
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleRating(star)}
                    />
                  )
                )}
              </div>

              <div className="mb-4">
                <p className="font-semibold">Select Transport:</p>
                <div className="flex space-x-4 mt-2">
                  {Object.entries(transportOptions).map(([key, option]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTransport(key)}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${selectedTransport === key
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-100"
                        }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">
                  Total Price: ${totalPrice.toFixed(2)}
                </p>
                <Button
                  onClick={handleBooking}
                  disabled={booked}
                  className={booked ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {booked ? "Booked" : "Book Now"}
                </Button>
              </div>
            </CardContent>
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="md:w-[100%] w-full mt-8 md:mt-0 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
                >
                  <h2 className="text-xl font-bold mb-4">💬 Comments</h2>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-3 rounded-xl shadow-sm border border-gray-200 bg-gray-50 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={comment.user?.avatar || "/placeholder-avatar.png"}
                          alt="avatar"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {comment.user?.firstName} {comment.user?.lastName}
                            {comment.user?.role === "admin" && (
                              <span className="ml-2 text-blue-600 text-xs flex items-center gap-1">
                                <MdAdminPanelSettings className="text-sm" />
                                Admin
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 pl-12">{comment.content}</p>

                      {/* Replies */}
                      {comment.replies?.map((reply) => (
                        <motion.div
                          key={reply.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-12 mt-3 flex gap-3"
                        >
                          <img
                            src={reply.user?.avatar || "/placeholder-avatar.png"}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover mt-1"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                              {reply.user?.firstName} {reply.user?.lastName}
                              {reply.user?.role === "admin" && (
                                <span className="text-blue-600 text-xs flex items-center gap-1">
                                  <MdAdminPanelSettings className="text-sm" />
                                  Admin
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-700">{reply.content}</p>
                          </div>
                        </motion.div>
                      ))}

                      {/* Reply Input */}
                      <div className="mt-4 ml-12 flex items-start gap-3">
                        <input
                          value={replies[comment.id] || ""}
                          onChange={(e) =>
                            setReplies({ ...replies, [comment.id]: e.target.value })
                          }
                          placeholder="Write a reply..."
                          className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-blue-300 focus:ring-1 outline-none"
                        />
                        <Button size="sm" onClick={() => postReply(comment.id)}>
                          Reply
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src="/placeholder-avatar.png"
                      alt="your avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                    <Button onClick={postComment} className="ml-2">
                      Post
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default TourDetails;
