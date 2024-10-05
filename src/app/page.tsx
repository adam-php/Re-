"use client"

import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import Image from 'next/image'
import Feature from './feature'
import { Users, NotebookPen, Bot, Text, MessageCircleMore, ClipboardList, FileJson } from 'lucide-react'
import Link from 'next/link'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Float, Text3D, Center } from "@react-three/drei"
import { Suspense, useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[0, -1, 0]} />
    </Float>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-card text-card-foreground rounded-lg shadow-sm p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

const ParallaxText = ({ children, baseVelocity = 100 }: { children: string, baseVelocity?: number }) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${v % 100}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="parallax overflow-hidden whitespace-nowrap">
      <motion.div className="scroller inline-block" style={{ x }}>
        <span className="inline-block mr-4">{children} </span>
        <span className="inline-block mr-4">{children} </span>
        <span className="inline-block mr-4">{children} </span>
        <span className="inline-block mr-4">{children} </span>
      </motion.div>
    </div>
  )
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', moveCursor)

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      ref={cursorRef}
      className={`custom-cursor fixed pointer-events-none z-50 w-5 h-5 rounded-full bg-white mix-blend-difference ${isHovering ? 'hover' : ''}`}
      animate={{
        x: cursorPos.x - 10,
        y: cursorPos.y - 10,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    />
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const backgroundStyle = {
    background: `linear-gradient(180deg, #000000 0%, #4B0082 50%, #8A2BE2 100%)`,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      <motion.div style={{ ...backgroundStyle, opacity: backgroundOpacity }} />
      <main className="flex-grow text-white">
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div 
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <motion.h1 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    All-in-One Collaboration, Organization, and AI-Powered Workspace
                  </motion.h1>
                  <motion.p 
                    className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Seamlessly integrating real-time collaboration with powerful organizational tools. Whether you're managing a team, building a community, or organizing personal projects, Love helps you stay connected and organized like never before.
                  </motion.p>
                </div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate" target="_blank">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">Learn More</Button>
                </motion.div>
              </motion.div>
              <motion.div 
                className="h-[300px] sm:h-[400px] lg:h-[500px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <Suspense fallback={null}>
                    <Model url="/models/stylized_mushrooms.glb" />
                    <Environment preset="sunset" />
                  </Suspense>
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </motion.div>
            </div>
          </div>
        </section>

        <ParallaxText baseVelocity={-5}>Love • Collaborate • Organize • Innovate •</ParallaxText>

        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Why Love?
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <Feature
                  icon={<Users size={24} />}
                  headline="Real-Time Communication & Collaboration"
                  description="Stay connected with your team or community using voice, video, and chat channels. Create custom servers with private channels, roles, and permissions. Collaborate in real-time, host virtual meetings, and keep everyone on the same page."
                />
              </Card>
              <Card>
                <Feature
                  icon={<NotebookPen size={24} />}
                  headline="Organize and Plan (Notion Features)"
                  description="Keep all your tasks, notes, documents, and databases in one place. From wikis to task boards, manage your projects with flexible and intuitive tools. Create docs, track progress, and visually organize your life or business—all within Love."
                />
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Next-Gen AI features
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <Feature
                  icon={<Bot size={24} />}
                  headline="Smart Task Automation"
                  description="Let AI handle repetitive tasks, deadlines, and reminders."
                />
              </Card>
              <Card>
                <Feature
                  icon={<Text size={24} />}
                  headline="Document Summarization"
                  description="AI-powered tools summarize meeting notes, documents, and conversations, so you can focus on what matters most."
                />
              </Card>
              <Card>
                <Feature
                  icon={<MessageCircleMore size={24} />}
                  headline="Contextual Suggestions"
                  description="While you work, AI offers suggestions based on the context of your projects, boosting creativity and productivity."
                />
              </Card>
              <Card>
                <Feature
                  icon={<ClipboardList size={24} />}
                  headline="Auto-generated Reports"
                  description="Need a project update or meeting recap? Let the AI summarize and deliver a full report to your team instantly."
                />
              </Card>
              <Card>
                <Feature
                  icon={<FileJson size={24}/>}
                  headline="Exclusive Access to Fine-Tuned Coding LLMs"
                  description="Level up your coding with Love's fine-tuned AI models. Whether you're a beginner or a pro, you can utilize cutting-edge AI-powered code assistance to auto-complete your code, debug in real-time, generate code snippets for complex tasks, or even learn with step-by-step explanations tailored to your level."
                />
              </Card>
            </div>
          </div>
        </section>

        <ParallaxText baseVelocity={5}>AI-Powered • Seamless • Intuitive • Powerful •</ParallaxText>

        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Get in touch
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Book a demo, or hop on a call
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
                target="_blank"
              >
                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100">Book now</Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}