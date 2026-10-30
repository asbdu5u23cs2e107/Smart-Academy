import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What courses does SwordNex offer?",
      answer:
        "SwordNex offers Full Stack Development, Python Programming, Java Development, AI & Machine Learning, Data Science and other technology courses."
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "You can select your preferred course, click Enroll Now, complete registration and start learning through your student dashboard."
    },
    {
      question: "Do you provide certificates?",
      answer:
        "Yes, certificates are provided after completing all lessons and successfully passing the assessments."
    },
    {
      question: "Are live classes available?",
      answer:
        "Yes, we provide live classes with expert trainers and interactive sessions for students."
    },
    {
      question: "Can I access course materials anytime?",
      answer:
        "Yes, enrolled students can access videos, notes, assignments and resources anytime from their dashboard."
    },
    {
      question: "How can I contact SwordNex support?",
      answer:
        "You can contact our support team through the Contact Us page or support email for any queries."
    }
  ];


  return (
    <div className="min-h-screen bg-slate-50 py-16">

      <div className="max-w-4xl mx-auto px-6">

        {/* Page Heading */}
        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold text-purple-600">
            Frequently Asked Questions
          </h1>

          <p className="text-slate-500 mt-3">
            Find answers to the most common questions about SwordNex.
          </p>

        </div>


        {/* FAQ List */}
        <div className="space-y-4">

          {faqData.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 shadow-sm"
            >

              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index ? null : index
                  )
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >

                <span className="font-semibold text-slate-700">
                  {faq.question}
                </span>


                <ChevronDown
                  className={`w-5 h-5 text-purple-600 transition-transform ${
                    openIndex === index
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>


              {openIndex === index && (

                <div className="px-5 pb-5">

                  <p className="text-sm text-slate-500 leading-6">
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>


      </div>

    </div>
  );
};

export default FAQ;