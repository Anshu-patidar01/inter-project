import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(""); // Start with the second item open
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  const faqItems = [
    {
      question: "What is ScriptHQ and how does it work?",
      answer:
        "ScriptHQ is a platform that connects writers and industry professionals by offering a Script Submission Platform for writers and an Industry Content Request section for producers. Writers submit their ideas, scripts, lyrics, or poems, while industry professionals can browse submitted content or post content requirements.",
    },
    {
      question: "What kind of content can be submitted?",
      answer:
        "Writers can submit story ideas, full scripts, lyrics, poems, music compositions, and more in any language and genre through our Script Submission Platform.",
    },
    {
      question: "Can producers request specific content?",
      answer:
        "Yes. Producers, directors, and content creators can submit their requirements for scripts, lyrics, stories, or any creative content through the Industry Content Request section. Writers can then work on these requirements and submit their work.",
    },
    {
      question: "Does ScriptHQ accept scripts in multiple languages?",
      answer:
        "Yes. ScriptHQ supports content in any language, making stories accessible to a global audience.",
    },
    {
      question: "What genres are accepted?",
      answer:
        "ScriptHQ accepts scripts across all genres, including Thriller, Sci-Fi, Drama, Horror, Comedy, Action, Fantasy, Historical, and Biopics, among others.",
    },
    {
      question: "Can I submit a full script instead of a synopsis?",
      answer:
        "Yes. Writers can submit either a synopsis or a full script, depending on what stage their story is in.",
    },
    {
      question: "How are script credits handled?",
      answer:
        "Writers receive due credit for their submitted content. ScriptHQ must also be credited for curating the script.",
    },
    {
      question: "How does the script acquisition process work?",
      answer:
        "Scripts are either acquired outright or licensed, with agreements structured to ensure fair compensation for writers. Remake rights in multiple languages can also be discussed.",
    },
    {
      question: "Can scriptwriters also direct their stories?",
      answer:
        "Yes, but only if the producer or lead actor agrees. While script acquisition does not guarantee a directorial role, experienced writer-directors may be considered.",
    },
    {
      question: "How secure is my intellectual property?",
      answer:
        "ScriptHQ ensures high-level security for all submitted scripts, protecting the rights of writers and preventing unauthorized access.",
    },
    {
      question: "Can industry professionals directly negotiate with writers?",
      answer:
        "No. All negotiations and agreements are handled through ScriptHQ to protect both writers and producers and ensure fair transactions.",
    },
    {
      question: "Are there any charges for submitting or reviewing content?",
      answer:
        "No. Writers can submit their content for free, and producers can review available scripts at no cost. Fees apply only when a script is finalized for acquisition.",
    },
    {
      question: "What types of scripts are available on ScriptHQ?",
      answer:
        "ScriptHQ constantly curates and updates its collection of high-quality, original scripts across multiple genres. Our platform ensures that industry professionals have access to fresh and engaging content, tailored to meet cinematic demands.",
    },
    {
      question: "Who can submit content?",
      answer:
        "Anyone with a unique and original story can submit, regardless of industry background.",
    },
    {
      question: "How do I get started with ScriptHQ?",
      answer: ` Writers: Submit your ideas via the Script Submission Platform. Industry Professionals: Find or request content through the Industry Content Request section.`,
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-3xl font-bold mb-8">
          Frequently Asked Questions (FAQs) – ScriptHQ
        </h1>
        <br />

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full bg-gray-600 hover:bg-gray-900 text-white transition-colors p-6 flex justify-between items-center"
              >
                <span className="text-lg md:text-xl text-left">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <X className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <Plus className="w-6 h-6 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="bg-gray-600 text-gray-300 p-6 text-lg">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
