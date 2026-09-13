import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareQuote, CheckCircle, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  // Published reviews with text
  const reviewsWithText = reviews.filter(r => r.published && r.reviewText);

  // Reviewers where names were supplied without review text
  const namedReviewers = reviews.filter(r => r.published && !r.reviewText);

  const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query=AL+Khair+Graphics+Liaquat+Park+Dera+Ismail+Khan';

  return (
    <section id="reviews" className="py-24 bg-neutral-900/30 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Authentic feedback from local clients and businesses across Dera Ismail Khan.
          </p>
        </div>

        {/* Real Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reviewsWithText.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-lg hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between transition-all duration-300 group cursor-default"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {'★★★★★'}
                  </div>
                  <MessageSquareQuote className="w-5 h-5 text-neutral-600 group-hover:text-amber-400/60 transition-colors" />
                </div>

                {/* Exact Customer Review Text */}
                <p className="text-neutral-200 text-sm sm:text-base italic leading-relaxed">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Customer Name and Badge */}
              <div className="pt-6 border-t border-neutral-800/80 flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 group-hover:border-amber-400 group-hover:bg-amber-400/20 flex items-center justify-center font-bold text-amber-400 text-xs transition-colors">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    <span>{review.customerName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-neutral-400">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Verified Reviewers Strip (No invented text or stars) */}
        {namedReviewers.length > 0 && (
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center mb-4">
              Additional Verified Reviewers on Google
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {namedReviewers.map((reviewer) => (
                <div 
                  key={reviewer.id}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300 font-medium"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{reviewer.customerName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button: View More on Google */}
        <div className="text-center">
          <a
            id="view-more-google-reviews-btn"
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white hover:text-amber-300 font-bold text-sm rounded-full border border-neutral-700 shadow-md transition-all active:scale-95"
          >
            <span>View More on Google</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
