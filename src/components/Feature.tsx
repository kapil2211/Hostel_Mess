'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './card';

const features = [
  {
    id: 1,
    image: '/images/orderFood.jpeg',
    title: 'Online Order Food',
  },
  {
    id: 2,
    image: '/images/payonline.jpeg',
    title: 'Pay Instant / Pay Later',
  },
  {
    id: 3,
    image: '/images/meal_manage.png',
    title: 'Manage Your Meal',
  },
];

const Feature = () => {
  return (
    <section className="py-15 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Features</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card image={feature.image} title={feature.title} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
