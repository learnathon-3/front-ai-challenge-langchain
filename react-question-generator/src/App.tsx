import { useState } from "react";

interface Question {
  question: string;
  // answer와 explanation은 채점 후 받을 예정이므로 제거
}

export default function App() {
  const [showSolutions, setShowSolutions] = useState<{ [key: number]: boolean }>({});
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [withSolution, setWithSolution] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ answer: string; explanation: string }[]>([]);

  const toggleSolution = (index: number) => {
    setShowSolutions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (difficulty === null) {
      alert("난이도를 선택해주세요.");
      return;
    }

    const dummyQuestions = [
      "AI에서 '딥러닝(Deep Learning)'이란 무엇인가요?",
      "자연어 처리(NLP)의 대표적인 활용 예는 무엇인가요?",
      "다음 중 지도학습(Supervised Learning)에 해당하는 예시는?",
      "GAN(Generative Adversarial Network)은 어떤 목적으로 사용되나요?",
      "'파인튜닝(Fine-tuning)'이란 무엇인가요?"
    ];

    setQuestions(dummyQuestions);
    setAnswers([]); // 초기화
  };

  const handleGrade = async () => {
    // 실제로는 FastAPI에 questions를 전송해서 answer, explanation 받아오기
    const dummyAnswers = [
      {
        answer: "인공신경망을 활용한 머신러닝의 한 분야입니다.",
        explanation: "딥러닝은 인간의 뇌를 모방한 인공신경망을 사용해 데이터를 학습하는 AI 기술입니다."
      },
      {
        answer: "챗봇, 번역기, 감정 분석 등이 있습니다.",
        explanation: "NLP는 인간 언어를 이해하고 생성하는 기술로, 다양한 언어 기반 서비스에 활용됩니다."
      },
      {
        answer: "이메일 스팸 분류",
        explanation: "지도학습은 입력과 정답(label)을 함께 제공하여 모델을 학습시키는 방식입니다."
      },
      {
        answer: "새로운 데이터를 생성하는 데 사용됩니다.",
        explanation: "GAN은 생성자와 판별자의 경쟁을 통해 실제 같은 데이터를 생성하는 모델입니다."
      },
      {
        answer: "사전 학습된 모델을 특정 작업에 맞게 추가 학습시키는 것입니다.",
        explanation: "파인튜닝은 이미 학습된 모델에 소량의 데이터로 추가 학습을 수행해 성능을 개선하는 기술입니다."
      },
    ];

    setAnswers(dummyAnswers);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col w-screen overflow-x-hidden">
      <nav className="bg-indigo-600 shadow-lg w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex justify-between items-center w-full max-w-7xl mx-auto">
            <div className="text-white text-xl font-bold">문제은행</div>
            <button className="bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              로그인
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-indigo-50 rounded-lg mb-8 p-6 mx-4 mt-6 w-full max-w-7xl mx-auto">
        <p className="text-2xl font-bold text-gray-800 mb-2">맞춤형 문제 생성</p>
        <p className="text-gray-600">원하는 조건에 맞는 문제를 자동으로 생성해 드립니다.</p>
      </div>

      <main className="w-full flex-grow px-4 pb-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 w-full">
            <p className="text-xl font-semibold text-gray-800 mb-6">문제 설정</p>
            <form className="space-y-6" onSubmit={handleGenerate}>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">난이도</label>
                <div className="flex flex-wrap gap-4">
                  {["초급", "중급", "고급"].map((level, idx) => (
                    <div className="flex items-center" key={level}>
                      <input
                        name="difficulty"
                        type="radio"
                        id={`difficulty-${idx + 1}`}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
                        checked={difficulty === idx + 1}
                        onChange={() => setDifficulty(idx + 1)}
                      />
                      <label htmlFor={`difficulty-${idx + 1}`} className="ml-2 text-sm text-gray-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="question-num" className="text-sm font-medium text-gray-700 mb-1 block">
                  문제 수
                </label>
                <input
                  type="number"
                  id="question-num"
                  min="1"
                  max="50"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full h-12 text-sm rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="with-solution"
                    checked={withSolution}
                    onChange={(e) => setWithSolution(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="with-solution" className="ml-2 text-sm text-gray-700">
                    해설 포함
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm"
              >
                문제 생성하기
              </button>
            </form>
            {questions.length > 0 && (
              <button
                onClick={handleGrade}
                className="mt-4 w-full bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm"
              >
                채점하기
              </button>
            )}
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-xl font-semibold text-gray-800">생성된 문제</p>
              <div className="flex gap-2">
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-white border border-indigo-500 rounded-md">
                  PDF 저장
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-4">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <p className="font-medium text-gray-800">문제 {index + 1}</p>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mt-2 sm:mt-0">
                      {difficulty === 1 ? "초급" : difficulty === 2 ? "중급" : "고급"}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{q}</p>
                  {answers[index] && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => toggleSolution(index)}
                        className="flex text-indigo-600 text-sm items-center"
                      >
                        해설 보기
                      </button>
                      {showSolutions[index] && (
                        <div className="mt-2 bg-indigo-50 rounded-md p-3">
                          <p className="text-gray-700 font-medium">정답: {answers[index].answer}</p>
                          <p className="text-gray-600 mt-2 text-sm">{answers[index].explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}