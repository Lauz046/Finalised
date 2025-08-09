import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/nav/Navbar';
import styles from './contact.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Show success popup
        setShowSuccessPopup(true);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        // Hide popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } else {
        setErrorMessage(data.message || 'Failed to submit your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - House of Plutus</title>
        <meta name="description" content="Contact House of Plutus" />
      </Head>
      
      <div className={styles.container}>
        <Navbar onSearchClick={() => {}} blueIcons={true} />

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {/* Left Section - Text and Illustration */}
            <div className={styles.leftSection}>
              <div className={styles.textContent}>
                <h2 className={styles.subtitle}>Contact Us</h2>
                <h1 className={styles.mainTitle}>Do you have any question?</h1>
              </div>
              <div className={styles.illustration}>
                <Image 
                  src="/Contact us.svg" 
                  alt="Contact Us Illustration" 
                  width={456} 
                  height={406}
                  className={styles.illustrationImage}
                />
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className={styles.rightSection}>
              <div className={styles.formPanel}>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.formTextarea}
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {/* Error Message */}
                  {errorMessage && (
                    <div className={styles.errorMessage}>
                      {errorMessage}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <span className={styles.rocketIcon}>
                      {isSubmitting ? '⏳' : '🚀'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className={styles.successPopup}>
            <div className={styles.popupContent}>
              <div className={styles.popupIcon}>✅</div>
              <h3 className={styles.popupTitle}>Success!</h3>
              <p className={styles.popupMessage}>
                Your question has been registered! We will get back to you soon.
              </p>
              <button 
                className={styles.popupClose}
                onClick={() => setShowSuccessPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactUs; 