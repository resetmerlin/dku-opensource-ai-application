'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/ui/Footer'

export default function LandingPage() {
  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const targetId = (this as HTMLAnchorElement).getAttribute('href')
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId)
          targetElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      })
    })

    // Parallax effect for floating cards
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 50
      const moveY = (e.clientY - window.innerHeight / 2) / 50

      const floatingElements = document.querySelectorAll('.floating, .floating-slow')
      floatingElements.forEach((element) => {
        const depth = element.classList.contains('floating-slow') ? 0.5 : 1
        const rotation = element.classList.contains('floating-slow')
          ? 'rotate(3deg)'
          : 'rotate(-3deg)'
        ;(element as HTMLElement).style.transform =
          `translateX(${moveX * depth}px) translateY(${moveY * depth}px) ${rotation}`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="gradient-bg min-h-screen relative overflow-hidden">
        {/* Navigation */}
        <header className="w-full py-5 px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="ProCraft Logo"
                width={45}
                height={45}
                className="object-contain"
              />
              <span className="text-lg font-bold text-slate-900">ProCraft</span>
            </div>

            <div className="nav-pill rounded-full px-2 py-1 flex items-center space-x-1 z-10">
              <a
                href="#"
                className="bg-slate-900 text-white px-4 py-2 rounded-full text-base font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-slate-700 hover:text-slate-900 px-4 py-2 rounded-full text-base font-medium"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-slate-700 hover:text-slate-900 px-4 py-2 rounded-full text-base font-medium"
              >
                Blog
              </a>
            </div>
            <Link
              href="/portfolio/me"
              className="bg-slate-900 text-white px-5 py-3 rounded-full text-base font-medium flex items-center space-x-2 transition-all btn-glow whitespace-nowrap hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-play-circle-line"></i>
              </span>
              <span>Start Now</span>
            </Link>
          </div>
        </header>

        {/* Hero Content */}
        <main className="w-full pt-10 pb-20 px-8">
          <div className="max-w-7xl mx-auto relative">
            {/* Floating UI Card 1 - Video Call */}
            <div className="absolute -left-10 top-1/3 z-10 floating hidden lg:block">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 card-shadow transform -rotate-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                    <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs font-semibold">
                      JK
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 text-sm font-medium">Joe Kingston</p>
                  </div>
                  <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded-full font-medium">
                    11:50
                  </div>
                </div>
                <div className="flex justify-center gap-3 mt-2">
                  <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200">
                    <i className="ri-mic-line text-slate-700"></i>
                  </button>
                  <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">
                    <i className="ri-phone-line text-white"></i>
                  </button>
                  <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200">
                    <i className="ri-vidicon-line text-slate-700"></i>
                  </button>
                </div>
              </div>
              <div className="badge bg-slate-900 text-white -bottom-3 -left-2">Ann Designer</div>
            </div>

            {/* Floating UI Card 2 - Checklist */}
            <div className="absolute -right-5 top-1/4 z-10 floating-slow hidden lg:block">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 card-shadow transform rotate-3 w-64 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-slate-900 text-sm font-medium">Checklist</h4>
                  <button className="text-slate-600 text-xs flex items-center gap-1 hover:text-slate-900">
                    <i className="ri-add-line"></i> Add Subtask
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-slate-900 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                      </div>
                    </div>
                    <p className="text-slate-900 text-xs">
                      Upload your resume to generate your portfolio
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center"></div>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Enhance your achievements with AI rewriting
                    </p>
                  </div>{' '}
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center"></div>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Review suggested skills and recruiter insights
                    </p>
                  </div>
                </div>
              </div>
              <div className="badge bg-slate-900 text-white -bottom-3 right-5">
                Jeremy Developer
              </div>
            </div>

            {/* Hero Text */}
            <div className="text-center pt-20 pb-10 z-20 relative">
              <h1 className="text-slate-900 text-5xl md:text-7xl font-bold leading-tight">
                Your career capabilities,
                <br /> elevated
                <span className="ml-3 italic font-normal">by</span> ProFound!!
              </h1>
              <p className="text-slate-700 max-w-2xl mx-auto mt-8 text-xl">
                Join thousands who transformed their career identity, improved recruiter visibility,
                and landed better opportunities with AI-powered professional branding. It’s time to
                make your career stand out.
              </p>
              <div className="flex items-center justify-center gap-4 mt-10">
                <Link
                  href="/portfolio/me"
                  className="bg-slate-900 text-white px-8 py-4 rounded-full text-base font-semibold transition-all btn-glow whitespace-nowrap hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Try New
                </Link>
                <Button
                  disabled
                  size={'lg'}
                  className="h-12 bg-white/80 backdrop-blur-md text-slate-900 px-8! py-4! rounded-full text-base font-semibold transition-all btn-glow-secondary whitespace-nowrap hover:-translate-y-0.5 hover:bg-white border border-slate-300"
                >
                  View Showreel
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section className="py-24 px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">
              Everything you need to stand out professionally
            </h2>
            <p className="text-gray-600 text-lg">
              Discover how ProFound transforms your experience, skills, and projects into a powerful
              career profile.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-slate-50 transition-all hover:-translate-y-1 border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-team-line text-slate-700 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Portfolio Generation</h3>
              <p className="text-gray-600">
                Transform resumes into beautiful, recruiter-ready portfolios with structured
                timelines, skills, and achievements.{' '}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-slate-50 transition-all hover:-translate-y-1 border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-flow-chart text-slate-700 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Achievement Rewriting</h3>
              <p className="text-gray-600">
                AI expands your bullet points into compelling, impact-driven narratives that clearly
                communicate your value.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-slate-50 transition-all hover:-translate-y-1 border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-bar-chart-box-line text-slate-700 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Recruiter Insights</h3>
              <p className="text-gray-600">
                Get instant analysis of your strengths, matching job roles, missing skills, and
                competitive positioning.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">How ProFound works</h2>
            <p className="text-gray-600 text-lg">
              Go from raw resume to a polished, recruiter-ready portfolio in just a few minutes.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  num: 1,
                  title: 'Upload Your Resume',
                  desc: 'Import your resume or LinkedIn so ProFound can analyze your experience.',
                },
                {
                  num: 2,
                  title: 'Let AI Analyze You',
                  desc: 'Our engine extracts skills, achievements, and career patterns automatically.',
                },
                {
                  num: 3,
                  title: 'Generate Your Portfolio',
                  desc: 'Get a clean, modern portfolio with achievement-focused narratives.',
                },
                {
                  num: 4,
                  title: 'Share With Recruiters',
                  desc: 'Share a single link that clearly communicates your value and fit.',
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="text-center animate-on-scroll opacity-0 translate-x-10 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-700 flex items-center justify-center mx-auto mb-6">
                    <span className="text-xl font-bold text-slate-700">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">2.5M+</div>
              <p className="text-gray-600">Portfolios Generated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">98%</div>
              <p className="text-gray-600">Users Feel More Confident</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">150+</div>
              <p className="text-gray-600">Countries With ProFound Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">4.9/5</div>
              <p className="text-gray-600">Average Portfolio Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-8 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Loved by candidates and recruiters</h2>
            <p className="text-gray-600 text-lg">
              See how professionals worldwide use ProFound to communicate their value with
              confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Software Engineer at Spotify',
                quote:
                  'ProFound turned my plain resume into a story that actually reflects my impact. Recruiters finally understand what I do.',
              },
              {
                name: 'David Chen',
                role: 'CTO at TechFlow',
                quote:
                  'We recommend ProFound to candidates applying to our roles. It makes evaluating skills and experience so much faster.',
              },
              {
                name: 'Emma Thompson',
                role: 'Marketing Director at Airbnb',
                quote:
                  'I used to dread rewriting my portfolio. ProFound did it in minutes and the result feels both polished and personal.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your team&apos;s workflow?</h2>
          <p className="text-gray-600 text-lg mb-10">
            Join thousands of teams who&apos;ve already taken their collaboration to the next level.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/portfolio/me"
              className="bg-slate-900 text-white px-8 py-4 rounded-full text-base font-semibold transition-all btn-glow whitespace-nowrap hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Start Free Trial
            </Link>
            <a
              href="#"
              className="bg-slate-100 text-slate-900 px-8 py-4 rounded-full text-base font-semibold transition-all hover:bg-slate-200 whitespace-nowrap border border-slate-300"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Add animate-in class styles */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </div>
  )
}
