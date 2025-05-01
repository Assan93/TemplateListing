'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Pricing = () => {
  const router = useRouter();

  const pricingPlans = [
    {
      name: 'Basic',
      price: 29,
      period: 'month',
      description: 'Perfect for starters and small projects',
      features: [
        'Access to basic templates',
        '1 download per month',
        'Basic support',
        'Preview access',
        'Commercial license',
      ],
      color: 'gray',
    },
    {
      name: 'Professional',
      price: 79,
      period: 'month',
      description: 'Ideal for professional developers',
      features: [
        'Access to all templates',
        'Unlimited downloads',
        'Priority support',
        'Source files included',
        'Commercial license',
        'Free updates',
      ],
      color: 'blue',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      description: 'For large teams and organizations',
      features: [
        'Everything in Professional',
        'Custom templates',
        '24/7 Support',
        'API access',
        'Team collaboration',
        'Custom branding',
      ],
      color: 'indigo',
    },
  ];

  return (
    <div className="bg-emerald-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to our premium templates with flexible pricing options designed to meet your needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm">
                  Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <p className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-xl text-gray-500">/{plan.period}</span>
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push('/signup')}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-${plan.color}-600 hover:bg-${plan.color}-700 transition duration-200`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;