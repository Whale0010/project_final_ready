"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(Math.random().toString(36))
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Quels sont vos projets environnementaux?",
    "Comment adhérer à l'association?",
    "Prochains événements?",
    "Comment faire un don?",
    "Opportunités de bénévolat",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return

    const userMessage = { text, from: "user", id: Date.now() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId,
          history: messages.slice(-5),
        }),
      })

      const data = await response.json()
      const assistantMessage = {
        text: data.response,
        from: "assistant",
        id: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-lg flex items-center justify-center text-white z-40 hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 max-h-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 text-white">
              <h3 className="font-semibold">AMED Assistant</h3>
              <p className="text-sm text-white/80">Posez-nous vos questions</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">👋</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Bonjour! Comment pouvons-nous vous aider?</p>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.from === "user"
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    {msg.from === "assistant" && (
                      <div className="flex gap-2 mt-2">
                        <button className="p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 0 && (
              <div className="px-4 py-2 space-y-2 max-h-24 overflow-y-auto">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(suggestion)}
                    className="w-full text-left text-xs p-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Votre message..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading}
                className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
