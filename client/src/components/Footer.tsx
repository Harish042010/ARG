import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-black text-yellow-400 mb-2">ARG Academy</h3>
            <p className="text-blue-300 text-sm mb-1">Matric Higher Secondary School</p>
            <p className="text-blue-400 text-xs leading-relaxed">
              7th Cross, KRM Nagar, Annamalai Nagar,<br />
              Chidambaram – 608 002
            </p>
            <p className="mt-4 text-xs text-blue-300 italic">
              "Empowering Minds Since 2002"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {['/', '/about', '/academics', '/achievements', '/admissions', '/gallery'].map((path, i) => {
                const labels = ['Home', 'About', 'Academics', 'Achievements', 'Admissions', 'Gallery'];
                return (
                  <li key={path}>
                    <Link to={path} className="text-blue-300 hover:text-yellow-400 text-sm transition-colors">
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3 text-sm text-blue-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">📞</span>
                <div>
                  <p>Office: <a href="tel:9361520505" className="hover:text-white">93615 20505</a></p>
                  <p>Principal: <a href="tel:9361520502" className="hover:text-white">93615 20502</a></p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">✉️</span>
                <a href="mailto:argprincipalannamalainagar@gmail.com" className="hover:text-white break-all">
                  argprincipalannamalainagar@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">🎓</span>
                <span>Est. 2002 · 700+ Students</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-800 text-center">
          <p className="text-xs text-blue-500">
            © {new Date().getFullYear()} ARG Academy Matric Higher Secondary School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
