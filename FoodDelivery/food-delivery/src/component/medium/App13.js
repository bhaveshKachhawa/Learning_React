import React, { useState } from "react";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee on all items in their original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping fees vary by location.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h2>Frequently Asked Questions</h2>

      <div style={styles.accordionGroup}>
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div key={index} style={styles.item}>
              <button
                onClick={() => toggleAccordion(index)}
                style={styles.header}
              >
                <span style={styles.question}>{item.question}</span>
                <span style={styles.icon}>{isOpen ? "−" : "+"}</span>
              </button>

              <div
                style={{
                  ...styles.contentPanel,
                  maxHeight: isOpen ? "100px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p style={styles.answer}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
  },
  accordionGroup: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    overflow: "hidden",
  },
  item: { borderBottom: "1px solid #ddd" },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#f9f9f9",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    outline: "none",
  },
  question: { fontSize: "16px", fontWeight: "600", color: "#333" },
  icon: { fontSize: "18px", fontWeight: "bold", color: "#666" },
  contentPanel: {
    overflow: "hidden",
    transition: "max-height 0.25s ease, opacity 0.2s ease",
    background: "#fff",
  },
  answer: { padding: "15px 20px", margin: 0, color: "#555", lineHeight: "1.5" },
};

export default Accordion;
