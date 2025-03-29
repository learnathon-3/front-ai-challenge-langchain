import React, { useState } from "react";

export default function App() {
  const [showSolutions, setShowSolutions] = useState({});

  const toggleSolution = (index) => {
    setShowSolutions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex justify-between items-center">
            <div className="text-white text-xl font-bold">문제은행</div>
            <button className="bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              로그인
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-indigo-50 rounded-lg mb-8 p-6 mx-4 mt-6">
        <p className="text-2xl font-bold text-gray-800 mb-2">맞춤형 문제 생성</p>
        <p className="text-gray-600">원하는 조건에 맞는 문제를 자동으로 생성해 드립니다.</p>
      </div>

      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <p className="text-xl font-semibold text-gray-800 mb-6">문제 설정</p>
            <form className="space-y-6">
              <div>
                <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1 block">카테고리</label>
                <select id="category" className="w-full h-12 text-xs rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2">
                  <option>카테고리 선택</option>
                  <option>수학</option>
                  <option>영어</option>
                  <option>국어</option>
                  <option>과학</option>
                  <option>사회</option>
                </select>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1 block">세부 과목</label>
                <select id="subject" className="w-full h-12 text-xs rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2">
                  <option>세부 과목 선택</option>
                  <option>미적분</option>
                  <option>확률과 통계</option>
                  <option>기하</option>
                  <option>수열</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">난이도</label>
                <div className="flex space-x-4">
                  {["초급", "중급", "고급"].map((level, idx) => (
                    <div className="flex items-center" key={level}>
                      <input name="difficulty" type="radio" id={`difficulty-${idx + 1}`} className="h-4 w-4 text-indigo-600 border-gray-300 rounded-full" />
                      <label htmlFor={`difficulty-${idx + 1}`} className="ml-2 text-sm text-gray-700">{level}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="keywords" className="text-sm font-medium text-gray-700 mb-1 block">키워드</label>
                <input type="text" id="keywords" placeholder="예: 미분, 적분, 극한값 등" className="w-full h-12 text-xs rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2" />
              </div>
              <div>
                <label htmlFor="question-num" className="text-sm font-medium text-gray-700 mb-1 block">문제 수</label>
                <input type="number" id="question-num" min="1" max="50" defaultValue="10" className="w-full h-12 text-xs rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2" />
              </div>
              <div>
                <label htmlFor="specific-requirements" className="text-sm font-medium text-gray-700 mb-1 block">세부 요구사항</label>
                <textarea id="specific-requirements" placeholder="문제에 포함되어야 할 내용이나 특정 조건을 입력하세요..." className="w-full h-32 text-xs rounded-md shadow-sm border-2 border-gray-300 bg-gray-100 p-2"></textarea>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input type="checkbox" id="with-solution" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  <label htmlFor="with-solution" className="ml-2 text-sm text-gray-700">해설 포함</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="with-images" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  <label htmlFor="with-images" className="ml-2 text-sm text-gray-700">이미지 포함</label>
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm">
                문제 생성하기
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl font-semibold text-gray-800">생성된 문제</p>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-white border border-indigo-500 rounded-md">
                  PDF 저장
                </button>
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm">
                  인쇄
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-50 rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-800">문제 {n}</p>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">중급</span>
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
