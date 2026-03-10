import { useRef, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FounderSection from '../components/home/FounderSection';
import VisionMission from '../components/home/VisionMission';
import HistoryTimeline from '../components/home/HistoryTimeline';

// Reusable scroll observer for inline sections
const useInlineSectionAnimation = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const targets = container.querySelectorAll<HTMLElement>(
      '.scroll-hidden, .scroll-hidden-left, .scroll-hidden-right'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
};

// Stats banner
const StatsBanner = () => {
  const ref = useInlineSectionAnimation();
  return (
    <section ref={ref} className="bg-blue-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { number: '700+', label: 'Students Enrolled', icon: '👨‍🎓' },
            { number: '100%', label: 'Pass Rate — 22 Years', icon: '📈' },
            { number: '3', label: 'Laboratories', icon: '🔬' },
          ].map((stat, i) => (
            <div key={stat.label} className={`scroll-hidden stagger-${i + 1}`}>
              <p className="text-3xl mb-1">{stat.icon}</p>
              <p className="text-3xl md:text-4xl font-black text-yellow-400">{stat.number}</p>
              <p className="text-blue-300 text-xs mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Extracurriculars
const ExtracurricularsStrip = () => {
  const ref = useInlineSectionAnimation();
  const activities = [
    { icon: '🥋', title: 'Taekwondo', sub: 'NSNIS & PhD Coaches' },
    { icon: '🏃', title: 'Athletics', sub: 'National Athlete Coach' },
    { icon: '🤸', title: 'Kho-Kho', sub: 'NSNIS Coach' },
    { icon: '🏐', title: 'Netball', sub: 'Competitive Teams' },
    { icon: '🧘', title: 'Yoga', sub: 'Daily Practice' },
    { icon: '🪃', title: 'Silambam', sub: 'Traditional Martial Art' },
    { icon: '🪖', title: 'Scout & Guides', sub: 'Leadership Program' },
    { icon: '🗣️', title: 'Hindi Coaching', sub: 'Hindi Prachar Sabha' },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-indigo-950 via-blue-950 to-blue-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 scroll-hidden">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.25em] mb-2">Beyond the Classroom</p>
          <h2 className="text-3xl md:text-4xl font-black">Extracurricular Activities</h2>
          <p className="text-blue-300 text-sm mt-3 max-w-lg mx-auto">
            We cultivate champions — on the field, in the arts, and in life.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {activities.map((act, i) => (
            <div
              key={act.title}
              className={`scroll-hidden stagger-${i + 1} bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-default`}
            >
              <p className="text-4xl mb-2">{act.icon}</p>
              <p className="text-white font-bold text-sm">{act.title}</p>
              <p className="text-blue-300 text-xs mt-0.5">{act.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA
const CTASection = () => {
  const ref = useInlineSectionAnimation();
  return (
    <section ref={ref} className="py-16 bg-yellow-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-hidden">
          <h2 className="text-3xl md:text-4xl font-black text-blue-950 mb-3">
            Give Your Child the ARG Advantage
          </h2>
          <p className="text-blue-800 text-base mb-8 max-w-xl mx-auto">
            Admissions are open for all classes from LKG to 12th Standard.
            Fee concessions of up to 100% are available for rank holders and sports achievers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/admissions"
              className="bg-blue-950 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:scale-105"
            >
              Apply Now →
            </a>
            <a
              href="tel:9361520505"
              className="bg-white text-blue-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-50 transition-all shadow-lg hover:scale-105"
            >
              📞 Call Office: 93615 20505
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsBanner />
      <FounderSection />
      <VisionMission />
      <HistoryTimeline />
      <ExtracurricularsStrip />
      <CTASection />
    </>
  );
};

export default Home;
