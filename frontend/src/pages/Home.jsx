import React, { useState, useEffect } from 'react'
import { 
  FaCheckCircle, 
  FaRocket, 
  FaShieldAlt, 
  FaMobileAlt,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaClock,
  FaChartLine
} from 'react-icons/fa'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [stats, setStats] = useState({
    users: 0,
    tasks: 0,
    satisfaction: 0
  })

  useEffect(() => {
    setIsVisible(true)
    
    // Animate stats on load
    const animateStats = () => {
      const targetUsers = 10000
      const targetTasks = 50000
      const targetSatisfaction = 98
      
      let currentUsers = 0
      let currentTasks = 0
      let currentSatisfaction = 0
      
      const interval = setInterval(() => {
        if (currentUsers < targetUsers) {
          currentUsers += Math.ceil(targetUsers / 50)
          setStats(prev => ({ ...prev, users: Math.min(currentUsers, targetUsers) }))
        }
        if (currentTasks < targetTasks) {
          currentTasks += Math.ceil(targetTasks / 50)
          setStats(prev => ({ ...prev, tasks: Math.min(currentTasks, targetTasks) }))
        }
        if (currentSatisfaction < targetSatisfaction) {
          currentSatisfaction += Math.ceil(targetSatisfaction / 50)
          setStats(prev => ({ ...prev, satisfaction: Math.min(currentSatisfaction, targetSatisfaction) }))
        }
        if (currentUsers >= targetUsers && currentTasks >= targetTasks && currentSatisfaction >= targetSatisfaction) {
          clearInterval(interval)
        }
      }, 30)
    }
    
    animateStats()
  }, [])

  const features = [
    {
      icon: FaCheckCircle,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with ease. Set priorities, deadlines, and categories.',
      color: 'hover:bg-black'
    },
    {
      icon: FaRocket,
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance with real-time updates and instant task synchronization.',
      color: 'hover:bg-gray-800'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected. We prioritize your privacy and security.',
      color: 'hover:bg-black'
    },
    {
      icon: FaMobileAlt,
      title: 'Responsive Design',
      description: 'Access your tasks from any device. Seamless experience on desktop, tablet, and mobile.',
      color: 'hover:bg-gray-800'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      text: 'TodoApp has transformed how I manage my daily tasks. The intuitive interface and powerful features make it indispensable.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      text: 'The clean design and seamless performance of TodoApp make it my go-to task management tool. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Entrepreneur',
      text: 'Managing multiple projects has never been easier. TodoApp helps me stay organized and focused on what matters.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6 group cursor-pointer hover:bg-black hover:text-white transition-all duration-300">
                <span className="text-sm font-medium group-hover:text-white">
                  🚀 New Update Available
                </span>
                <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Organize Your Life with
                <span className="block bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent mt-2">
                  TodoApp
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                The smart way to manage your tasks, boost productivity, and achieve your goals. 
                Simple, intuitive, and built for success.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 group inline-flex items-center justify-center">
                  Get Started Free
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-black border-2 border-black rounded-xl font-medium hover:bg-black hover:text-white transition-all duration-300 hover:shadow-xl active:scale-95">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-black">{stats.users.toLocaleString()}+</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-black">{stats.tasks.toLocaleString()}+</div>
                  <div className="text-sm text-gray-500">Tasks Completed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-black">{stats.satisfaction}%</div>
                  <div className="text-sm text-gray-500">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decoration */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose TodoApp?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay organized and productive in one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                  className="group p-6 bg-gray-50 rounded-2xl hover:bg-black transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 cursor-pointer relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-linear-to-br from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-black/10 group-hover:bg-white/10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                      <Icon className={`text-2xl transition-all duration-300 ${
                        activeFeature === index ? 'text-white' : 'text-black'
                      }`} />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                      activeFeature === index ? 'text-white' : 'text-black'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      activeFeature === index ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer group"
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                  ))}
                </div>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors mb-4 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black/10 group-hover:bg-white/10 rounded-full flex items-center justify-center text-lg font-bold text-black group-hover:text-white transition-colors">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold group-hover:text-white transition-colors">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users and start organizing your tasks more efficiently today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black rounded-xl font-medium hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center group">
              Start Free Trial
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home