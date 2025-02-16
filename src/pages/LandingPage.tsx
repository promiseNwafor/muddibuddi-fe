import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to your MoodiBuddi</h1>
        <p className="text-lg">
          Track your mood and see how it relates to the weather.
        </p>
      </header>
      <main className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-secondary text-white rounded hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <div className="flex flex-col items-center space-y-2">
            <p className="flex items-center">
              <span className="mr-2">😃</span> Track your daily mood
            </p>
            <p className="flex items-center">
              <span className="mr-2">🌦️</span> Relate mood with weather data
            </p>
            <p className="flex items-center">
              <span className="mr-2">📊</span> Analyze trends and insights
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
