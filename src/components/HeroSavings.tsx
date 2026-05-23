interface HeroSavingsProps {
  annualSavings: number;
  monthlySavings: number;
}

export default function HeroSavings({ annualSavings, monthlySavings }: HeroSavingsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-center shadow-xl border border-gray-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-20"></div>
      <h2 className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-4">Your Potential Savings</h2>
      <div className="flex justify-center items-baseline space-x-2">
        <span className="text-6xl font-black tracking-tighter text-green-400">
          ${annualSavings.toLocaleString()}
        </span>
        <span className="text-xl text-gray-500 font-medium">/year</span>
      </div>
      <p className="mt-4 text-gray-400 text-lg">
        That's <span className="text-white font-semibold">${monthlySavings.toLocaleString()}/month</span> in reclaimed capital.
      </p>
    </div>
  );
}