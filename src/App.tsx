import { useState } from "react";

export default function App() {
  const [showSolutions, setShowSolutions] = useState<{ [key: number]: boolean }>({});

  const toggleSolution = (index: number) => {
    setShowSolutions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
            <form className="space-y-6">
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
                  defaultValue="10"
                  className="w-full h-12 text-sm rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="with-solution"
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
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-50 rounded-md p-4">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <p className="font-medium text-gray-800">문제 {n}</p>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mt-2 sm:mt-0">
                      중급
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">예시 문제 {n}입니다. 다음 수식을 풀이하시오.</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => toggleSolution(n)}
                      className="flex text-indigo-600 text-sm items-center"
                    >
                      해설 보기
                    </button>
                    {showSolutions[n] && (
                      <div className="mt-2 bg-indigo-50 rounded-md p-3">
                        <p className="text-gray-700 font-medium">정답: 예시 정답 {n}</p>
                        <p className="text-gray-600 mt-2 text-sm">이곳에 해설이 표시됩니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
