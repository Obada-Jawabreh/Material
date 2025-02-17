// src/pages/Home.jsx
import React from "react";
import Card from "./Card";
import NavBar from "../../assets/Layout/Navbar";
import imageUrl from "./../../assets/images/soon.jpg";
import Material from "./../../assets/images/Material.jpg";

function Home() {
  const cardsData = [
    {
      title: "Manage Materials",
      imageUrl: Material,
      description: "Add, edit, or delete materials from the system.",
      link: "/manage-material", // Link to Manage Materials page
      isComingSoon: false, // Active page
    },
    {
      title: "Track Candidates",
      imageUrl: imageUrl,
      description: "Track candidates and manage interview schedules.",
      link: "/track-candidates", // Link to Track Candidates page
      isComingSoon: true, // Coming Soon
    },
    {
      title: "Job Offers",
      imageUrl: imageUrl,
      description: "Create and manage job offers for candidates.",
      link: "/job-offers", // Link to Job Offers page
      isComingSoon: true, // Coming Soon
    },
  ];

  return (
    <>
      <NavBar />
      <div>
        <h1 className="text-center text-2xl font-bold my-8">
          Welcome to the Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              imageUrl={card.imageUrl}
              description={card.description}
              link={card.link}
              isComingSoon={card.isComingSoon}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
