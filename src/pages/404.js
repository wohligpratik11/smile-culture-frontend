import Link from 'next/link';
// import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-12">
        {/* <Image
          src={ErosNow.src}
          alt="Smile Culture Logo"
          width={200}
          height={50}
          className="h-8 w-auto"
        /> */}
      </div>

      <h1 className="mb-8 text-4xl font-light text-blue md:text-5xl">
        This link is dead!
      </h1>

      <div className="text-center text-lg text-customWhite md:text-xl">
        <p>The page you are looking for no longer exists.</p>
        <p className="mt-2">
          Goto our{' '}
          <Link href="/" className="text-blue hover:text-sky-500">
            home page
          </Link>{' '}
          or back to the{' '}
          <Link
            href="#"
            onClick={() => window.history.back()}
            className="text-blue hover:text-sky-500"
          >
            previous page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
