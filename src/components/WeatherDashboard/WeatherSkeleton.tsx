// WeatherSkeleton component to show a loading state
// It simulates the structure of the WeatherDashboard component
export function WeatherSkeleton() {
  return (
    <section className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="flex gap-1 text-2xl items-end">
          <div className="h-6 w-24 bg-gray-300 rounded" />
          <div className="h-6 w-24 bg-gray-300 rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-gray-300 rounded" />
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
              <div className="h-6 w-16 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-2xl h-8 w-36 bg-gray-300 rounded" />
        {[...Array(7)].map((_, index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-8 w-28 bg-gray-300 rounded" />
            <div className="h-10 w-10 bg-gray-300 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 rounded" />
            <div className="h-8 w-28 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}
