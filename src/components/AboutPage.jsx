import React from 'react';
import { AuthProvider } from './AuthContext';
import Header from './Header'; // Assuming you have a Header component
import './AboutPage.css';

function AboutPage() {
  return (
    <AuthProvider>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <Header headerText='About' />
        <hr
          style={{
            width: '200px',
            margin: '10px auto',
            borderColor: '#888',
            borderStyle: 'solid',
          }}
        />
        <div style={{ margin: '20px' }}>
          <p>
            Welcome to the Stanford Dorm Review platform! FAQ: 
            
            <strong>What?</strong> This website hosts information about every dorm in all 8 Staford neigbhoords. You can read honest reviews and view images by other students. You can also contribute your own  and you can contribute your own.
          </p>
          <p>
          <strong>Why?</strong>Our goal is to help you make informed decisions about where to live during your time at Stanford. Here, you can:
          </p>
          <ul>
            <li>
              <strong>View Reviews:</strong> Read honest and detailed reviews from fellow students about their experiences in various dorms.
            </li>
            <li>
              <strong>View Images:</strong> Explore images of dorm rooms and common areas to get a visual sense of each residence.
            </li>
            <li>
              <strong>Leave Reviews:</strong> Share your own experiences and insights by leaving reviews and ratings for the dorms you've lived in.
            </li>
            <li>
              <strong>Upload Images:</strong> Contribute to the community by uploading images that showcase the dorms.
            </li>
          </ul>
          <p>
            Whether you're a prospective student, a current resident, or simply curious about Stanford's housing options, this platform aims to be your go-to resource. We believe that student perspectives are invaluable in understanding the true living experience in each dorm.
          </p>
          <p>
            We hope this website empowers you to find the perfect dorm that meets your needs and preferences, enhancing your Stanford experience.
          </p>
        </div>
      </div>
    </AuthProvider>
  );
}

export default AboutPage;