export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center text-4xl text-red-500 mt-8" role="alert">
      <p>Something went wrong</p>
      <pre className="my-3">{error.message}</pre>
      <button
        className="bg-red-200 px-8 py-6 text-red-600 rounded-xl"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}
