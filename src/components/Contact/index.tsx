import MainHeading from "../MainHeading";

const Contact = () => {
  return (
    <section className="section-gap">
      <div className="container text-center">
        <MainHeading subTitle="Don't Hesitate" title="Contact Us" />

        <div className="mt-8">
          <a
            href="tel:+201067055256"
            className="text-4xl underline text-accent"
          >
            +201067055256
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
