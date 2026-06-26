import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { getAllServices } from '../api/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getAllServices();

        // ✅ Map service names to correct routes
        const mapped = data.map((s) => {
          let path = '/';
          switch (s.service_name.toLowerCase()) {
            case 'concrete':
              path = '/concrete';
              break;
            case 'pavers':
              path = '/pavers';
              break;
            case 'retaining walls':
              path = '/retaining-walls';
              break;
            case 'carpentry':
              path = '/carpentry';
              break;
            case 'flooring':
              path = '/flooring';
              break;
            case 'decks':
              path = '/decks';
              break;
            case 'basement':
              path = '/basement';
              break;
            case 'remodeling':
              path = '/remodeling';
              break;
            default:
              path = '/';
          }
          return { ...s, path };
        });

        setServices(mapped);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;

  return (
    <section className="services-section" id="services">
      <h2>Our Services</h2>
      <div className="services-grid" data-aos="fade-up">
        {services.map((service) => (
          <Link to={service.path} key={service.id} className="service-card">
            <img
              src={`http://localhost:5000${service.profile_picture}`}
              alt={service.service_name}
              onError={(e) => (e.target.src = '/images/default.png')}
            />
            <div className="card-title">{service.service_name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
