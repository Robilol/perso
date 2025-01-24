import { motion } from "framer-motion";
import Link from "next/link";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import { getInformation } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { Spinner } from "../utils";
import ContactForm from "./ContactForm";
import { useQuery } from '@tanstack/react-query'

const ContactSection = () => {
  const { data, isFetching } = useQuery({ queryKey: ['information'], queryFn: getInformation })

  if (isFetching)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );

  if (!data) return null;

  return (
    <div className="grid grid-cols-9 gap-7">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        variants={childrenAnimation}
        className="col-span-9 lg:col-span-4"
      >
        <div className="contact-information">
          <h4>Coordonnées</h4>
          <p>
            N'hesitez pas à me contacter de préférence par le formulaire de contact ou par mail pour des missions freelance ou pour toute demande de création de site.
          </p>
          <span className="inline-block h-1 w-20 rounded-full bg-primary bg-opacity-20"></span>
          <div className="contact-blocks mt-5 space-y-5">
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiPhoneLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Par téléphone</h5>
                {data.phoneNumbers.map((number, index) => (
                  <p className="mb-0" key={index}>
                    <Link href={`tel:${number.split("-").join("")}`} className="no-underline">
                      {number}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMailLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Par mail</h5>
                {data.emailAddress.map((email, index) => (
                  <p className="mb-0" key={index}>
                    <Link href={`mailto:${email}`} className="no-underline">
                      {email}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMapPinLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Addresse</h5>
                <p className="mb-0">
                  {data.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        variants={childrenAnimation}
        className="col-span-9 lg:col-span-5"
      >
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default ContactSection;
