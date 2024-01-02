import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative  space-y-4 p-8 border-solid border-2 rounded-lg border-indigo-600">
        <p className=" text-center text-gray-800 text-3xl">
          <strong>Zdarek parek</strong>
        </p>
        <p className=" text-gray-800 text-3xl">
          Zkus demo chatbota
        </p>
        <Link
          href="/chat"
          className="flex justify-center items-center gap-5 self-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Lets go</span>
        </Link>
      </div>
    </div>
  );
}
