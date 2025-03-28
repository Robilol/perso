import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/router';
import { RiCloseLine } from 'react-icons/ri';
import { Dispatch, FC, SetStateAction } from 'react';

const MobileNavigation: FC<{
  changeState: Dispatch<SetStateAction<boolean>>
}> = ({ changeState }) => {
  const router = useRouter();

  const checkroute =
    router.route !== '/homepage2' && router.route !== '/homepage3';

  const handleClick = () => {
    changeState(false);
  };

  return (
    <>
      <button
        className="btn btn-small btn-transparent absolute left-auto right-4 top-4 z-10 h-10 w-10 rounded-full p-0 text-center text-3xl"
        onClick={() => changeState(false)}
      >
        <RiCloseLine className="inline" />
      </button>
      <nav className="relative max-h-full w-full overflow-y-auto">
        <ul className="mb-0 list-none pl-0">
          <li className="block">
            <ScrollLink
              activeClass="text-primary"
              to="section-home"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
              onClick={() => handleClick()}
            >
              Accueil
              <span className="absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          </li>
          <li className="block">
            <ScrollLink
              activeClass="text-primary"
              to="section-about"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
              onClick={() => handleClick()}
            >
              À propos
              <span className="absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          </li>
          <li className="block">
            <ScrollLink
              activeClass="text-primary"
              to="section-resume"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
              onClick={() => handleClick()}
            >
              CV
              <span className="absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          </li>
          <li className="block">
            <ScrollLink
              activeClass="text-primary"
              to="section-portfolios"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
              onClick={() => handleClick()}
            >
              Réalisations
              <span className="absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          </li>
          {/*<li className="block">*/}
          {/*  <Link*/}
          {/*    href="/posts/1"*/}
          {/*    className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"*/}
          {/*    onClick={() => handleClick()}>*/}
          {/*    Blog<span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>*/}

          {/*  </Link>*/}
          {/*</li>*/}
          <li className="block">
            <ScrollLink
              activeClass="text-primary"
              to="section-contact"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
              onClick={() => handleClick()}
            >
              Contact
              <span className="absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          </li>
        </ul>
        <div className="header-button pt-8">
          <ScrollLink
            activeClass="active"
            to="section-contact"
            spy={true}
            smooth="easeInQuad"
            offset={-74}
            duration={1000}
            className="btn btn-small"
            onClick={() => handleClick()}
          >
            <span>Me contacter</span>
          </ScrollLink>
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation
