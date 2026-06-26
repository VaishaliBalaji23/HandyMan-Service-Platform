import React, { useState } from "react";
import "./Gallery.css";

const galleryData = [
  {
    id: 1,
    title:
      "Rebuilding shed walls and roof after a tree collapsed the entire right side. Included complete tree removal and gutter installation with proper runoff to prevent flooding.",
    before: ["/images/b1.jpeg", "/images/b2.jpeg", "/images/b3.jpeg"],
    after: ["/images/a1.jpeg", "/images/a2.jpeg", "/images/a3.jpeg"],
  },
  {
    id: 2,
    title:
      "Sidewalk repair transformed from a dangerous tripping hazard to a safe, even surface! Uneven sections were carefully lifted, obstructive roots were removed, and a root blocker was installed to prevent future issues while preserving the health of the tree.",
    before: ["/images/2b1.jpeg", "/images/2b2.jpeg", "/images/2b3.jpeg"],
    after: ["/images/2a1.jpeg", "/images/2a2.jpeg", "/images/2a3.jpeg"],
  },
];

const Gallery = () => {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p className="subtitle">Revive. Restore. Reimagine.</p>
        <p className="tagline">
          See how we turn problems into polished results!
        </p>
      </div>

      {/* Gallery Projects */}
      <div className="gallery-container">
        {galleryData.map((project, index) => (
          <div key={project.id} className="project-section">
            {/* Project Title */}
            <div className="project-title">
              <span>{index + 1}. </span>
              {project.title}
            </div>

            {/* Before / After Section */}
            <div className="before-after">
              <div className="column">
                <h3>BEFORE REPAIR</h3>
                <div className="image-grid">
                  {project.before.map((img, i) => (
                    <div
                      key={i}
                      className="image-card"
                      onClick={() => setLightboxImg(img)}
                    >
                      <img src={img} alt="Before Repair" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="column">
                <h3>AFTER REPAIR</h3>
                <div className="image-grid">
                  {project.after.map((img, i) => (
                    <div
                      key={i}
                      className="image-card"
                      onClick={() => setLightboxImg(img)}
                    >
                      <img src={img} alt="After Repair" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Preview" />
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <h4>Contact Us</h4>
        <p>Email: info@yourhandyman.com</p>
        <p>Phone: 862-300-5256</p>
        <p>Address:</p>
      </footer>
    </div>
  );
};

export default Gallery;
