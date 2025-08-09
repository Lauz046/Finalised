import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/nav/Navbar';
import styles from './terms.module.css';

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions - House of Plutus</title>
        <meta name="description" content="Terms and conditions for House of Plutus" />
      </Head>
      
      <div className={styles.container}>
        <Navbar onSearchClick={() => {}} blueIcons={true} />
        
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>Terms & Conditions</h1>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <div className={styles.overview}>
            <h2 className={styles.overviewTitle}>Overview</h2>
            <p className={styles.overviewText}>
              House of Plutus operates this website. Throughout the site, the terms "we", "us," and "our" refer to House of Plutus.
            </p>
            <p className={styles.overviewText}>
              House of Plutus is a curated marketplace for brand-new, verified luxury products, including limited edition and high-demand items. We do not manufacture the products listed — we act as a trusted intermediary between buyers and verified sellers. Due to the exclusive nature of these items, products may be priced above original retail value.
            </p>
            <p className={styles.overviewText}>
              By accessing our website or purchasing from us, you agree to be bound by these Terms of Service, which include all additional policies and conditions linked or referenced throughout the site. These terms apply to all users of the platform — including browsers, buyers, sellers, and content contributors. If you do not agree with any part of these terms, you should not access the website or use our services.
            </p>
            <p className={styles.overviewText}>
              We may update or revise these Terms of Service at any time by posting changes to this page. It is your responsibility to review them periodically. Continued use of our site indicates your acceptance of these changes.
            </p>
            <p className={styles.overviewText}>
              Our store is hosted on Shopify Inc., which provides a secure platform for us to offer our products and services online.
            </p>
          </div>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>1. Our Promise</h3>
              <p className={styles.sectionText}>
                We list only brand-new, verified luxury products sourced directly from trusted vendors and outlets. Each product is manually verified before going live.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>2. Pricing</h3>
              <p className={styles.sectionText}>
                All prices are listed in INR and inclusive of taxes unless mentioned otherwise. No hidden commissions. What you see is what you pay.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>3. Shipping & Delivery</h3>
              <ul className={styles.sectionList}>
                <li>Orders are shipped within 3–5 business days</li>
                <li>Delivery takes approx. 4–8 working days</li>
                <li>You will receive tracking information as soon as your order is dispatched</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>4. Returns & Refunds</h3>
              <ul className={styles.sectionList}>
                <li>Returns are accepted only if the product is incorrect or damaged.</li>
                <li>You must notify us within 48 hours of delivery with photo proof</li>
                <li>Refunds are processed within 7–10 working days of return approval.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>5. Cancellations</h3>
              <p className={styles.sectionText}>
                Orders can only be cancelled within 2 hours of placing them. After that, the order is processed.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>6. Intellectual Property</h3>
              <p className={styles.sectionText}>
                All product images, logos, and written content are owned by House of Plutus or their respective licensors. Reproduction without permission is not allowed.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>7. User Conduct</h3>
              <p className={styles.sectionText}>
                You agree to use the site respectfully, legally, and without violating the rights of others.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>8. Updates to Policy</h3>
              <p className={styles.sectionText}>
                We may update these Terms & Conditions or our Privacy Policy as needed. You'll always find the most current version right here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions; 