import React, { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import colors from '../styles/colors'; // ✅ import color constants

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginBottom: '1rem',
        borderBottom: `1px solid ${colors.border}`,
        paddingBottom: '0.75rem',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          color: colors.orange,
          fontWeight: 'bold',
          fontSize: '1.4rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {question}
        <span style={{ fontWeight: 'normal', color: colors.muted }}>{open ? '–' : '+'}</span>
      </div>
      {open && (
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '1.15rem',
            lineHeight: '1.7',
            color: colors.lightGray,
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

function AboutPage() {
  const [headingFontSize, setHeadingFontSize] = useState('3rem');

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 480) {
        setHeadingFontSize('2.2rem');
      } else {
        setHeadingFontSize('3rem');
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    
    <AuthProvider>
      <div style={{ backgroundColor: colors.darkBg, color: colors.white, minHeight: '100vh' }}>
        <Navbar />
        
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '3rem 2rem',
            textAlign: 'left',
          }}
        >
          <h1 style={{ fontSize: headingFontSize, marginBottom: '1.5rem', color: colors.orange }}>
  TreeDorms $100 Giveaway 🎉
</h1>

<p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8', color: colors.lightGray }}>
  We're giving away <strong>$20</strong> dollars to 5 randomly selected users who leave a dorm review. It only takes 2 minutes. 
</p>
<FAQItem
  question="See Details"
  answer={
    <>
      <ul style={{ paddingLeft: '1.2rem', marginTop: '0.75rem', color: colors.lightGray }}>
        <li style={{ marginBottom: '0.75rem' }}>
          Only reviews submitted during <strong>May 2025</strong> are eligible.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Winners will be contacted via email at the <strong>end of the month</strong>.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Your email is used <strong>only</strong> to notify winners — it's never shared or linked to your review.
        </li>
        <li>
          Adding your email is <strong>completely optional</strong>. If you don’t include it, your review will still be submitted normally — you just won’t be entered into the giveaway.
        </li>
        <li>
          More questions? Contact us <a href="/contact" style={{ color: colors.orange, textDecoration: 'underline' }}>here</a> — we'd love to help.
        </li>
      </ul>
    </>
  }
/>

          <h1 style={{ fontSize: headingFontSize, marginBottom: '1.5rem', color: colors.orange }}>
            Learn About TreeDorms
          </h1>

          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8', color: colors.lightGray }}>
            <strong>What:</strong> TreeDorms is a transparent hub for Stanford dorm reviews. Students leave honest feedback — both good and bad — so you get a real sense of what living there is like.
          </p>

          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8', color: colors.lightGray }}>
            <strong>Why:</strong> Choosing dorms is difficult. It only makes sense for there to be a system that helps us make more informed decisions.
          </p>

          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.8', color: colors.lightGray }}>
            <strong>How:</strong> Students leave anonymous feedback and upload images of their dorms. Others can explore that feedback freely.
          </p>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: colors.headingAccent }}>
            FAQ
          </h2>

          <FAQItem
            question="Is this really anonymous?"
            answer="100%. We never store any identifiable data when you submit reviews or upload images."
          />
          <FAQItem
            question="How are reviews moderated?"
            answer="All submissions go through a light check for spam and inappropriate content before being published. We never flag something for being honest — candid student input is crucial."
          />
          <FAQItem
            question="Have a question not listed here?"
            answer={
              <>
                Contact us <a href="/contact" style={{ color: colors.orange, textDecoration: 'underline' }}>here</a> — we'd love to help.
              </>
            }
          />

          <p
            style={{
              fontStyle: 'italic',
              fontSize: '1.2rem',
              margin: '2rem 0',
              lineHeight: '1.7',
              color: colors.lightGray,
            }}
          >
          </p>
        </div>
      </div>
    </AuthProvider>
  );
}

export default AboutPage;
