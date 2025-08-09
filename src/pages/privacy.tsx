import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/nav/Navbar';
import styles from './privacy.module.css';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - House of Plutus</title>
        <meta name="description" content="Privacy policy for House of Plutus" />
      </Head>
      
      <div className={styles.container}>
        <Navbar onSearchClick={() => {}} blueIcons={true} />
        
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>Privacy Policy</h1>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <div className={styles.introduction}>
            <p className={styles.introText}>
              This Privacy Policy outlines our approach to Data Protection and Privacy to fulfil its obligations under the applicable laws and regulations. This Privacy Policy applies to your Personal Information which is processed by us, whether in physical or electronic mode.
            </p>
            <p className={styles.introText}>
              While you may be able to browse the Platform (Website identified by the domain name – support@houseofplutus.com in referred to as "Platform") from countries outside of India, however, please note we do not offer any product/service under this Platform outside India. By visiting the Platform or providing your information, you expressly agree to be bound by this Privacy Policy and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
            </p>
            <p className={styles.introText}>
              In this Privacy Policy, the expressions 'Personal Information', 'Data Subject', 'Controller', 'Processor' and 'Processing' shall have the meanings given to them in the applicable privacy laws.
            </p>
            <p className={styles.introText}>
              We are committed to treating data privacy seriously. It is important that you know exactly what we do with your Personal Information.
            </p>
          </div>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>1. What We Collect</h3>
              <p className={styles.sectionText}>
                When you visit or interact with our platform, we may collect:
              </p>
              <ul className={styles.sectionList}>
                <li>Your name, email address, and phone number</li>
                <li>Shipping/billing address (for purchases)</li>
                <li>Payment information (securely handled by third-party payment gateways)</li>
                <li>Your interactions with our platform (like browsing behavior, purchases, etc.)</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>2. How We Use Your Information</h3>
              <p className={styles.sectionText}>
                We use your data to:
              </p>
              <ul className={styles.sectionList}>
                <li>Process and ship your orders</li>
                <li>Provide customer support</li>
                <li>Improve your shopping experience</li>
                <li>Send updates, promotions, and drops (only if you've opted in)</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>3. We Don't Sell Your Data</h3>
              <p className={styles.sectionText}>
                Your data is never sold, rented, or shared with third parties for marketing. We may share your information only with trusted partners (like courier services or payment processors) to complete your orders.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>4. Cookies</h3>
              <p className={styles.sectionText}>
                Our website uses cookies to improve your browsing experience. You can choose to accept or decline cookies in your browser settings.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>5. Security</h3>
              <p className={styles.sectionText}>
                We take your security seriously. All transactions are encrypted, and we follow industry-standard practices to keep your information safe.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>6. Your Rights</h3>
              <p className={styles.sectionText}>
                You can request:
              </p>
              <ul className={styles.sectionList}>
                <li>To view the data we store about you</li>
                <li>To update or correct your data</li>
                <li>To delete your account or personal information</li>
              </ul>
              <p className={styles.sectionText}>
                Just email us at <a href="mailto:support@houseofplutus.com" className={styles.emailLink}>support@houseofplutus.com</a> for any of these requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 