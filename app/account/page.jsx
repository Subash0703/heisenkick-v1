"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail } from "react-icons/fi";

const FloatingParticles = ({ count = 50 }) => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () =>
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const particles = Array.from({ length: count });

    return (
        <>
            {windowSize.width > 0 &&
                particles.map((_, index) => {
                    const startX = Math.random() * windowSize.width;
                    const startY = Math.random() * windowSize.height;
                    const scale = Math.random() * 0.5 + 0.3;
                    const duration = Math.random() * 20 + 10;

                    return (
                        <motion.div
                            key={index}
                            className="absolute w-2 h-2 rounded-full bg-green-400 opacity-50"
                            initial={{ x: startX, y: startY, scale }}
                            animate={{
                                y: [startY, windowSize.height + 10, -10],
                                x: [
                                    startX + Math.random() * 50,
                                    startX - Math.random() * 50,
                                    startX + Math.random() * 50,
                                ],
                            }}
                            transition={{
                                duration,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "linear",
                            }}
                        />
                    );
                })}
        </>
    );
};

const LoginSignupPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => setIsLogin((prev) => !prev);

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0b0f] to-[#13161d] overflow-hidden px-4">
            <div className="absolute inset-0 z-0">
                <FloatingParticles count={60} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-xl"
            >
                <h2 className="text-3xl font-bold text-green-400 text-center mb-6">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <motion.form
                    key={isLogin ? "login" : "signup"}
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                    className="flex flex-col gap-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {!isLogin && (
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-10 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full pl-10 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-2 py-3 rounded-xl bg-green-400 text-black font-semibold hover:bg-green-500 transition-all duration-300"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </motion.form>

                <p className="mt-4 text-center text-white/70 text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={toggleForm}
                        className="text-green-400 font-semibold hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginSignupPage;