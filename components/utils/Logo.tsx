import Link from "next/link";

const Logo = ({ url = "/", text = false }) => {
  return (
    (<Link href={url} className="sitelogo py-2">

      {text ? (
        <span className="text-4xl font-bold uppercase leading-none text-primary">
          Robin Regis
        </span>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-8 max-h-full w-auto md:h-12 lg:h-14"
            src="/images/logo large.png"
            alt="Robin Regis"
          />
        </>
      )}

    </Link>)
  );
};

export default Logo;
