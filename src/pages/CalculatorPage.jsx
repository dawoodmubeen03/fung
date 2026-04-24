import { useState } from 'react';
import { usePageTitle, useScrollToTop } from '../hooks/useCustom';
import { Navbar, Footer } from '../components/Layout';
import { Button } from '../components/UI';

export default function CalculatorPage() {
  usePageTitle('Aggregate Calculator');
  useScrollToTop();

  const [selectedUniversity, setSelectedUniversity] = useState('nust');
  const [marks, setMarks] = useState({
    matric: 0,
    intermediate: 0,
    testScore: 0,
    testMax: 100,
  });

  const calculators = {
    nust: {
      name: 'NUST Aggregate Calculator',
      formula: 'Matric (10%) + Intermediate (15%) + NET (75%)',
      calculate: () => {
        const matricScore = (marks.matric / 1100) * 10;
        const intermediateScore = (marks.intermediate / 1100) * 15;
        const testScore = (marks.testScore / marks.testMax) * 75;
        return matricScore + intermediateScore + testScore;
      },
    },
    fast: {
      name: 'FAST-NU Merit Calculator',
      formula: 'Intermediate (30%) + NU Entry Test (70%)',
      calculate: () => {
        const intermediateScore = (marks.intermediate / 1100) * 30;
        const testScore = (marks.testScore / marks.testMax) * 70;
        return intermediateScore + testScore;
      },
    },
    uet: {
      name: 'UET ECAT Aggregate Calculator',
      formula: 'Matric (20%) + Intermediate (30%) + ECAT (50%)',
      calculate: () => {
        const matricScore = (marks.matric / 1100) * 20;
        const intermediateScore = (marks.intermediate / 1100) * 30;
        const testScore = (marks.testScore / marks.testMax) * 50;
        return matricScore + intermediateScore + testScore;
      },
    },
  };

  const current = calculators[selectedUniversity];
  const aggregate = current.calculate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Aggregate Calculator</h1>
          <p className="text-gray-600 mb-12">Calculate your admission merit for top universities</p>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* University Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Select University</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(calculators).map(([key, calc]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedUniversity(key)}
                    className={`p-4 rounded-lg font-semibold transition ${
                      selectedUniversity === key
                        ? 'bg-brand-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {calc.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Info */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Formula:</p>
              <p className="text-lg font-bold text-gray-800">{current.formula}</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matric Score (out of 1100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1100"
                  value={marks.matric}
                  onChange={(e) => setMarks({ ...marks, matric: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Intermediate Score (out of 1100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1100"
                  value={marks.intermediate}
                  onChange={(e) => setMarks({ ...marks, intermediate: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Entry Test Score
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    min="0"
                    value={marks.testScore}
                    onChange={(e) => setMarks({ ...marks, testScore: Number(e.target.value) })}
                    placeholder="Your score"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                  <input
                    type="number"
                    min="1"
                    value={marks.testMax}
                    onChange={(e) => setMarks({ ...marks, testMax: Number(e.target.value) })}
                    placeholder="Max marks"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-brand text-white rounded-xl p-8 text-center">
              <p className="text-white/80 mb-2">Your Aggregate Score</p>
              <p className="text-5xl font-bold">{aggregate.toFixed(2)}</p>
              <p className="text-white/80 mt-4">out of 100</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '📊', title: 'Accurate Calculation', desc: 'Based on official university formulas' },
              { icon: '🎯', title: 'Merit Prediction', desc: 'Compare with previous closing merits' },
              { icon: '📱', title: 'Save Results', desc: 'Track multiple calculations' },
            ].map((info, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">{info.icon}</div>
                <h3 className="font-bold mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
