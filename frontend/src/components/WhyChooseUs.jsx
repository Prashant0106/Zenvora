
import React from 'react'
import { Truck, ShieldCheck, BadgeCheck, Headset } from 'lucide-react'

import '../styles/WhyChooseUs.css'

function WhyChooseUs() {

  const benefits = [
    {
      icon: Truck,
      title: 'Fast & Reliable Delivery',
      description: 'Get your favourite products delivered to your doorstep.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Shop confidently with secure checkout and protected transactions.'
    },
    {
      icon: BadgeCheck,
      title: 'Quality Products',
      description: 'Explore carefully selected products for everyday needs.'
    },
    {
      icon: Headset,
      title: 'Customer Support',
      description: "We're here to help with your shopping experience."
    }
  ]

  return (
    <section className="why-choose-section">

      <div className="why-choose-heading">
        <span>THE ZENVORA ADVANTAGE</span>
        <h2>Why Choose Zenvora?</h2>
        <p>Making your everyday shopping experience better.</p>
      </div>

      <div className="benefits-grid">

        {benefits.map((benefit, index) => {
          const Icon = benefit.icon

          return (
            <article className="benefit-card" key={index}>
              <div className="benefit-icon">
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </article>
          )
        })}

      </div>

    </section>
  )
}

export default WhyChooseUs
