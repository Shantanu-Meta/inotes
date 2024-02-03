import React from 'react'
import { useSelector } from 'react-redux';

export default function About() {
    const {bg, text} = useSelector(state => state.theme); 

    return (
        <section className="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]" style={{backgroundColor: bg, color:text}}>
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                  <h2 className="mb-3 text-3xl font-bold leading-[1.2] sm:text-4xl md:text-[40px]">
                    Services
                  </h2>
                  <p className="text-base  text-xl">
                    This is a multi-user based personalized i-note app, where user need to log in to store their notes in the cloud. This app is made with React.JS, CSS, MongoDB and Express.JS by @Shantanu Dutta.
                  </p>
                </div>
              </div>
            </div>
    
            <div className="flex flex-wrap">
              <ServiceCard
                title="Organized DataBase"
                details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
              />
              <ServiceCard
                title="Multiple User concurrency"
                details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
                
              />
              <ServiceCard
                title="High secure"
                details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
              />
              <ServiceCard
                title="Customized UI/UX"
                details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
              />
              <ServiceCard
                title="Scalable"
                details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
              />
              <ServiceCard
                title="Regular usage"
                details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
              />
            </div>
          </div>
        </section>
      );
}

const ServiceCard = ({title, details }) => {
  const {cardsBg} = useSelector(state => state.theme)
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] p-10 shadow-2 shadow-lg md:px-7 xl:px-10" style={{backgroundColor: cardsBg}}>
          <h4 className="mb-[14px] text-2xl font-semibold">
            {title}
          </h4>
          <p className="text-body-color">{details}</p>
        </div>
      </div>
    </>
  );
};
