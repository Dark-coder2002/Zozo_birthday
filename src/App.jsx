import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Sparkles, Gift, Cake, Crown, Sun } from 'lucide-react'
import egyptianCake from './assets/egyptian-cake.jpg'
import pyramidCake from './assets/pyramid-cake.jpg'
import egyptianDecorations from './assets/egyptian-decorations.jpg'
import zozoLoly from './assets/zozo-loly.jpg'
import zozoBeach from './assets/zozo-beach.jpg'
import zozoCake from './assets/zozo-cake.jpg'
import lolyTable from './assets/loly-table.jpg'
import zozoFinal from './assets/zozo-final.jpg'
import zozoLolyNew from './assets/zozo-loly-new.jpg'
import birthdaySong from './assets/happy-birthday-song.wav'
import './App.css'

function App() {
  const [gamePhase, setGamePhase] = useState(0) // 0: first button, 1: second button, 2: third button, 3: song, 4: main content
  const [lightsOn, setLightsOn] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 })
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const sections = [
    {
      id: 'intro',
      content: 'اليوم هو...',
      subtext: 'يوم جميل كباقي الأيام',
      image: null
    },
    {
      id: 'special',
      content: 'لكن اليوم مميز جداً',
      subtext: 'مميز جداً بالنسبة لابنتي الغالية زوزو',
      image: zozoBeach
    },
    {
      id: 'celebration',
      content: 'لذلك دعينا نجعله...',
      subtext: 'أفضل احتفال على الإطلاق',
      image: egyptianDecorations
    },
    {
      id: 'happiness',
      content: 'ودعيني أشاركك...',
      subtext: 'قطعة من السعادة والفرح',
      image: zozoCake
    },
    {
      id: 'gift',
      content: 'صنعت كل هذا...',
      subtext: 'كهدية عيد ميلاد لك من ماما',
      image: null
    },
    {
      id: 'thanks',
      content: 'شكراً لوجودك',
      subtext: 'شكراً لكونك ابنتي الغالية والعزيزة على قلبي',
      image: null
    },
    {
      id: 'loly',
      content: 'وشكراً لإعطائي',
      subtext: 'حفيدتي الصغيرة الجميلة لولي',
      image: lolyTable
    },
    {
      id: 'family',
      content: 'أنتما نور حياتي',
      subtext: 'زوزو الغالية ولولي الحبيبة',
      image: zozoLoly
    },
    {
      id: 'wishes',
      content: 'أتمنى لك كل الخير',
      subtext: 'عسى أن تكون حياتك مليئة بالسعادة والنجاح',
      image: null
    },
    {
      id: 'dreams',
      content: 'تذكري أحلامك',
      subtext: 'عيشي كملكة مصرية تحلق في سماء النيل الأزرق',
      image: null
    },
    {
      id: 'support',
      content: 'لا تقلقي حبيبتي',
      subtext: 'لأنك لست وحدك في هذا العالم، ماما معك دائماً',
      image: null
    },
    {
      id: 'hope',
      content: 'هذا العام سيكون أفضل بإذن الله',
      subtext: 'وأتمنى أن تجدي السعادة في كل خطوة تخطينها أنت ولولي',
      image: pyramidCake
    },
    {
      id: 'final-wish',
      content: 'أخيراً...',
      subtext: 'أود أن أتمنى لك مرة أخرى: I love you marshmallow cheeks ❤️',
      image: zozoLolyNew
    },
    {
      id: 'birthday',
      content: '🎉 كل عام وأنت بخير يا زوزو 🎉',
      subtext: '28 يوليو - يوم مميز لابنة مميزة وأم رائعة',
      image: egyptianCake
    }
  ]

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setShowFireworks(true)
    }
  }

  const handleFirstButton = () => {
    setGamePhase(1)
    // Move button to random position
    setButtonPosition({
      x: Math.random() * 70 + 10,
      y: Math.random() * 70 + 10
    })
  }

  const handleSecondButton = () => {
    setGamePhase(2)
    // Move button to center
    setButtonPosition({ x: 50, y: 50 })
  }

  const handleThirdButton = () => {
    setGamePhase(3)
    setIsPlaying(true)
    
    // Play the audio
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
    
    // Move to main content after song duration
    setTimeout(() => {
      setIsPlaying(false)
      setGamePhase(4)
      setLightsOn(true)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }, 8000) // 8 seconds for the song
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && gamePhase === 4) {
        e.preventDefault()
        nextSection()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSection, gamePhase])

  // Game Phase Rendering
  if (gamePhase < 4) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Audio element for birthday song */}
        <audio ref={audioRef} loop>
          <source src={birthdaySong} type="audio/wav" />
        </audio>

        {/* Animated Background Elements for Game */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`game-sparkle-${i}`}
              className="absolute text-yellow-400"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: 180
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
            >
              <Sparkles size={Math.random() * 15 + 8} />
            </motion.div>
          ))}
        </div>

        {/* Birthday Song Audio */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎵
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
                Happy Birthday to You! 🎂
              </h1>
              <motion.p 
                className="text-xl text-white mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎶 Happy birthday to you, happy birthday to you 🎶
              </motion.p>
              <motion.p 
                className="text-xl text-white mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                🎶 Happy birthday dear Zozo 🎶
              </motion.p>
              <motion.p 
                className="text-xl text-white"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🎶 Happy birthday to you! 🎶
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* Game Buttons */}
        {!isPlaying && (
          <motion.div
            className="absolute"
            style={{
              left: `${buttonPosition.x}%`,
              top: `${buttonPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {gamePhase === 0 && (
              <Button
                onClick={handleFirstButton}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Cake className="mr-2" />
                أرجوك اضغطي هنا 🥺
              </Button>
            )}

            {gamePhase === 1 && (
              <motion.div
                animate={{ x: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Button
                  onClick={handleSecondButton}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Gift className="mr-2" />
                  اضغطي بشكل أسرع 🙄
                </Button>
              </motion.div>
            )}

            {gamePhase === 2 && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                <Button
                  onClick={handleThirdButton}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Crown className="mr-2" />
                  اضغطي بقوة.. ضعيفة 😏
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    )
  }

  // Main Content (after game)
  return (
    <div className="min-h-screen transition-all duration-1000 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Egyptian Sun */}
        <motion.div
          className="absolute top-10 right-10 text-yellow-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sun size={60} />
        </motion.div>

        {/* Floating Hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-red-400"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0.7
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 12 + 12,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Heart size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
        
        {/* Floating Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-600"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0.8
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
              rotate: -360
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          >
            <Star size={Math.random() * 15 + 8} />
          </motion.div>
        ))}

        {/* Egyptian Crowns */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`crown-${i}`}
            className="absolute text-yellow-700"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0.6
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
              rotate: 180
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          >
            <Crown size={Math.random() * 18 + 12} />
          </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-orange-400"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: 180
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          >
            <Sparkles size={Math.random() * 12 + 6} />
          </motion.div>
        ))}

        {/* Fireworks Effect */}
        {showFireworks && (
          <>
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`firework-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `hsl(${Math.random() * 60 + 30}, 80%, 60%)`,
                  left: Math.random() * window.innerWidth,
                  top: Math.random() * window.innerHeight
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-700 via-orange-600 to-red-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {sections[currentSection]?.content}
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-800 mb-8 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {sections[currentSection]?.subtext}
              </motion.p>

              {/* Display image if available */}
              {sections[currentSection]?.image && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="mb-8"
                >
                  <img 
                    src={sections[currentSection].image} 
                    alt="صورة جميلة"
                    className="max-w-md mx-auto rounded-lg shadow-lg border-4 border-yellow-400"
                  />
                </motion.div>
              )}

              {currentSection === sections.length - 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="flex justify-center items-center gap-4 text-6xl"
                >
                  <Cake className="text-orange-500" />
                  <Gift className="text-red-500" />
                  <Heart className="text-pink-500" />
                  <Crown className="text-yellow-600" />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex flex-col items-center gap-4">
            {currentSection < sections.length - 1 ? (
              <Button
                onClick={nextSection}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                التالي
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center"
              >
                <p className="text-lg text-gray-700 mb-4">
                  اضغطي على المساحة أو انقري للمتابعة
                </p>
                <Button
                  onClick={() => setShowFireworks(!showFireworks)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-full"
                >
                  🎆 المزيد من الألعاب النارية
                </Button>
              </motion.div>
            )}

            <p className="text-sm text-gray-600 mt-4">
              اضغطي على المساحة للمتابعة
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentSection 
                      ? 'bg-orange-500' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Egyptian themed footer */}
          <div className="fixed bottom-4 right-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-yellow-600"
            >
              <Crown size={30} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

