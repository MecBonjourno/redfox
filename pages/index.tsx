import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Head from 'next/head'
import { motion, useScroll, useTransform, useTime } from 'framer-motion'
import 'tailwindcss/tailwind.css'
import Header from './components/Header'
import { useInView } from 'react-intersection-observer'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useRef, useLayoutEffect } from 'react'
import { degreesToRadians, progress, mix } from 'popmotion'
import Footer from './components/Footer'

const companyName = 'Red Fox'
const footerLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]

const color = '#fff'

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color={color} />
  </mesh>
)

const Star = ({ p }: { p: number }) => {
  //@ts-ignore
  const ref = useRef<THREE.Object3D>(null)

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random())
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random(),
    )
    const xAngle = degreesToRadians(360) * p
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle)
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  )
}

function Scene({ numStars = 100 }) {
  const gl = useThree((state) => state.gl)
  const { scrollYProgress } = useScroll()
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)],
  )
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3])
  const time = useTime()

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005,
    )
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  useLayoutEffect(() => gl.setPixelRatio(0.3))

  const stars = []
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />)
  }

  return (
    <>
      <Icosahedron />
      {stars}
    </>
  )
}

export default function Home() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.8,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      <Head>
        <title>Red Fox Team</title>
      </Head>
      <Header />

      <main className="flex flex-col min-h-screen justify-center items-center text-center p-10 bg-[#0e0e0e]">
        <motion.section
          className="flex-1 flex flex-col justify-center items-center min-h-screen"
          variants={container}
          initial="hidden"
          animate="show"
          ref={ref}
        >
          <motion.h2 className="text-5xl font-semibold text-white mb-6">
            Who We Are
          </motion.h2>
          <motion.p variants={item} className="text-xl text-white">
            Red Fox Team is a company specialized in AI, GPT, and LLM
            technologies. We are dedicated to creating innovative solutions and
            pushing the boundaries of whats possible in the world of AI.
          </motion.p>
        </motion.section>

        <motion.section
          className="flex-1 flex flex-col justify-center items-center min-h-screen"
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          ref={ref}
        >
          <motion.h2
            className="text-5xl font-semibold text-white mb-6"
            variants={item}
          >
            Our Differentials
          </motion.h2>
          <motion.p variants={item} className="text-xl text-white">
            At Red Fox, we stand out from the rest of the companies because of
            our unique approach to AI. We focus not only on the technology but
            also on its impact on peoples lives. Our team is made up of experts
            in AI, as well as in the fields of psychology, ethics, and design.
            This interdisciplinary approach allows us to create AI solutions
            that are not only efficient but also ethical, empathetic, and
            user-friendly. We believe that AI should serve people, not the other
            way around, and we work tirelessly to make that a reality.
          </motion.p>
        </motion.section>

        <motion.section
          className="flex-1 flex flex-col justify-center items-center min-h-screen"
          initial="hidden"
          animate="show"
        >
          <motion.h2 className="text-5xl font-semibold text-white mb-6">
            Our Approach
          </motion.h2>
          <motion.p className="text-xl text-white">
            At Red Fox, we take a human-centered approach to AI. We believe that
            AI should serve people, not the other way around. Thats why we work
            closely with experts in psychology, ethics, and design to create AI
            solutions that are not only efficient but also ethical, empathetic,
            and user-friendly.
          </motion.p>
        </motion.section>

        <div className="min-h-screen  fixed top-0 right-0 bottom-0 left-0 opacity-50">
          <Canvas gl={{ antialias: false }} className="min-h-screen">
            <Scene />
          </Canvas>
        </div>
      </main>
      <Footer companyName={companyName} links={footerLinks} />
    </div>
  )
}
