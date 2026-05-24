import React, { useState } from 'react';
import BrandLogo from './components/BrandLogo';


const Body = () => {
  // Sample developer profile data
  const [currentProfile, setCurrentProfile] = useState({
    name: "Sarah Jenkins",
    role: "Backend Architect",
    skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
    bio: "Building robust APIs and looking for a frontend wizard to collaborate on an open-source productivity tool. Coffee enthusiast.",
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  });

  const handlePass = () => {
    console.log("Passed");
    // Logic to load next profile
  };

  const handleConnect = () => {
    console.log("Connected");
    // Logic to trigger connection/match
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col font-sans">
   
      {/* Main Content */}
      <main className="grow flex items-center justify-center p-4">
        {/* Profile Card */}
        <div className="card w-full max-w-sm bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
          <figure className="relative h-80 w-full bg-base-300">
            <img 
              src={currentProfile.avatar} 
              alt={currentProfile.name} 
              className="object-cover w-full h-full"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Basic Info overlaid on image */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {currentProfile.name}
                <div className="badge badge-success badge-sm"></div> {/* Online indicator */}
              </h2>
              <p className="text-sm font-medium opacity-90">{currentProfile.role}</p>
            </div>
          </figure>

          <div className="card-body p-6 gap-4">
            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {currentProfile.skills.map((skill, index) => (
                <div key={index} className="badge badge-outline badge-primary font-medium">
                  {skill}
                </div>
              ))}
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-2">About</h3>
              <p className="text-base-content text-sm leading-relaxed">
                {currentProfile.bio}
              </p>
            </div>

            {/* Actions */}
            <div className="card-actions justify-center mt-4 gap-6">
              <button 
                onClick={handlePass}
                className="btn btn-circle btn-lg btn-outline hover:bg-error hover:text-white hover:border-error transition-all duration-300 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <button 
                onClick={handleConnect}
                className="btn btn-circle btn-lg btn-primary text-white shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Body;