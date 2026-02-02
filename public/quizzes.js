// Quiz data
const quizzes = {
  1: {
    title: "Quiz 1: Medicare Basics",
    questions: [
      {
        text: "Which part of Medicare covers hospital stays?",
        answer: "A",
        options: { A: "Part A", B: "Part B", C: "Part C", D: "Part D" }
      },
      {
        text: "Which part covers doctor visits and outpatient services?",
        answer: "B",
        options: { A: "Part A", B: "Part B", C: "Part C", D: "Part D" }
      },
      {
        text: "What is the Initial Enrollment Period (IEP)?",
        answer: "A",
        options: {
          A: "7-month period around your 65th birthday",
          B: "Annual open enrollment from October to December",
          C: "A permanent window to enroll",
          D: "Only for those with employer coverage"
        }
      }
    ]
  },
  2: {
    title: "Quiz 2: Plan Types & Benefits",
    questions: [
      {
        text: "What is a key advantage of Medicare Advantage?",
        answer: "C",
        options: {
          A: "Unlimited out-of-pocket costs",
          B: "No network restrictions",
          C: "Often includes dental and vision coverage",
          D: "Available to anyone regardless of age"
        }
      },
      {
        text: "Which statement is TRUE about Original Medicare?",
        answer: "B",
        options: {
          A: "Prescriptions are always included",
          B: "You need a separate Part D plan for drugs",
          C: "Network providers only",
          D: "Out-of-pocket costs are capped"
        }
      },
      {
        text: "Medigap (Supplemental Insurance) helps cover:",
        answer: "A",
        options: {
          A: "Copays and coinsurance with Original Medicare",
          B: "Everything Original Medicare doesn't",
          C: "Only prescription drugs",
          D: "Hospital stays only"
        }
      }
    ]
  },
  3: {
    title: "Quiz 3: Compliance & Marketing",
    questions: [
      {
        text: "Which is a compliant way to market Medicare plans?",
        answer: "A",
        options: {
          A: "Provide accurate information with clear disclaimers",
          B: "Claim the plan covers 'everything'",
          C: "Pressure seniors to enroll immediately",
          D: "Hide enrollment period restrictions"
        }
      },
      {
        text: "What must you do before using comparative advertising?",
        answer: "B",
        options: {
          A: "Nothing — it's always allowed",
          B: "Get written CMS approval and participant consent",
          C: "Post it only in print, not online",
          D: "Have a lawyer review it (optional)"
        }
      },
      {
        text: "Which is a CMS-required disclosure for Medicare Advantage?",
        answer: "D",
        options: {
          A: "Your sales commission",
          B: "Competitor plan details",
          C: "Your personal health history",
          D: "Network limitations and out-of-pocket maximums"
        }
      }
    ]
  },
  4: {
    title: "Quiz 4: Sales Skills",
    questions: [
      {
        text: "When a prospect says 'I'm worried about losing my doctor,' what's the BEST response?",
        answer: "A",
        options: {
          A: "Let me check if your doctor is in our network, and if not, let's discuss alternatives.",
          B: "Don't worry, you won't lose your doctor.",
          C: "That's a common misconception. Most doctors participate.",
          D: "You should keep Original Medicare then."
        }
      },
      {
        text: "What's the first step in handling an objection?",
        answer: "B",
        options: {
          A: "Immediately counter with facts",
          B: "Listen and acknowledge the concern",
          C: "Move on to the next topic",
          D: "Agree with the prospect"
        }
      },
      {
        text: "Which value proposition is most compelling?",
        answer: "C",
        options: {
          A: "Our plan is the best on the market.",
          B: "We have the lowest premiums.",
          C: "You save $2,000 annually with $0 preventive care and included prescriptions.",
          D: "Everyone is choosing our plan."
        }
      }
    ]
  }
};

// Load quiz into the page
function loadQuiz(quizNum) {
  const quiz = quizzes[quizNum];
  if (!quiz) return;

  const form = document.getElementById('quiz-form');
  form.innerHTML = '';

  quiz.questions.forEach((q, idx) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.dataset.answer = q.answer;

    const label = document.createElement('p');
    label.innerHTML = `<strong>Q${idx + 1}:</strong> ${q.text}`;
    questionDiv.appendChild(label);

    Object.keys(q.options).forEach(key => {
      const optionDiv = document.createElement('div');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${idx}`;
      input.value = key;
      input.id = `q${idx}_${key}`;

      const optionLabel = document.createElement('label');
      optionLabel.htmlFor = `q${idx}_${key}`;
      optionLabel.innerHTML = `${key}. ${q.options[key]}`;

      optionDiv.appendChild(input);
      optionDiv.appendChild(optionLabel);
      questionDiv.appendChild(optionDiv);
    });

    form.appendChild(questionDiv);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn';
  submitBtn.textContent = 'Submit Quiz';
  form.appendChild(submitBtn);

  document.getElementById('quiz-result').classList.remove('show');
  document.getElementById('quiz-result').innerHTML = '';
  document.getElementById('quiz-container').style.display = 'block';

  initQuiz();
}
