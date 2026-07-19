import React, { useState } from 'react'
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedinIn, 
  FaYoutube,
  FaArrowUp
} from 'react-icons/fa'
import { MdCheckCircle } from 'react-icons/md'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [hoveredIcon, setHoveredIcon] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  const quickLinks = [
    { name: 'About', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ]

  const socialLinks = [
    { name: 'Twitter', icon: FaTwitter },
    { name: 'GitHub', icon: FaGithub },
    { name: 'LinkedIn', icon: FaLinkedinIn },
    { name: 'YouTube', icon: FaYoutube },
  ]

  return (
    <footer className="bg-white border-t border-gray-200/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4 group cursor-pointer">
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                TodoApp
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Organize your tasks efficiently with our modern todo application. Stay productive and achieve more.
            </p>
            <div className="mt-4 flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <button
                    key={social.name}
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-black transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-95"
                  >
                    <Icon 
                      size={18} 
                      className={`transition-all duration-300 ${
                        hoveredIcon === social.name ? 'text-white scale-110' : 'text-gray-700'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative text-gray-600 hover:text-black transition-all duration-300 text-sm group inline-block"
                  >
                    <span className="relative">
                      {link.name}
                      <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black transition-all duration-300 ${
                        hoveredLink === link.name ? 'w-full' : ''
                      }`}></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm group inline-flex items-center">
                  <span className="relative">
                    Help Center
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm group inline-flex items-center">
                  <span className="relative">
                    Privacy Policy
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm group inline-flex items-center">
                  <span className="relative">
                    Terms of Service
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm group inline-flex items-center">
                  <span className="relative">
                    FAQ
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Subscribe for updates and new features.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-300"
                  required
                />
                {subscribed && (
                  <div className="absolute -top-8 left-0 text-xs text-green-600 font-medium flex items-center gap-1 animate-slideDown">
                    <MdCheckCircle size={14} />
                    Subscribed!
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-black rounded-xl hover:shadow-lg hover:shadow-black/20 transition-all duration-300 active:scale-95 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-linear-to-r from-gray-800 to-black rounded-xl"></span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative">Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TodoApp. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <button className="text-sm text-gray-500 hover:text-black transition-colors group">
              <span className="relative">
                Privacy
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </span>
            </button>
            <button className="text-sm text-gray-500 hover:text-black transition-colors group">
              <span className="relative">
                Terms
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </span>
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 text-sm text-gray-500 hover:text-black transition-colors group"
            >
              <span>Back to Top</span>
              <FaArrowUp 
                size={14} 
                className="transform group-hover:-translate-y-0.5 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx="true">{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  )
}

export default Footer