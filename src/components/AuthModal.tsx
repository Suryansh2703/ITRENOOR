import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, Check, Smartphone, Crown, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    let interval: any;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpTimer(45);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        if (loginMethod === 'phone') {
          // Map phone OTP login to mock login context
          await login(`${phone}@itrenoor.app`, 'OTP_LOGIN');
        } else {
          await login(email, password);
        }
      } else {
        await signup(email, password, name);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop for Luxury Feel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        ></motion.div>

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-zinc-950 border border-gold-600/30 p-8 w-full max-w-lg relative z-10 shadow-[0_0_50px_rgba(217,119,6,0.15)] rounded-2xl flex flex-col my-8"
        >
          {/* Top Gold Ornament Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-t-2xl" />

          {/* Close Button */}
          <button 
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-zinc-300 hover:text-gold-400 transition-all duration-300 bg-zinc-900/50 hover:bg-zinc-900 p-1.5 rounded-full border border-zinc-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Premium Logo Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold-500/40 p-1 bg-zinc-900 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <div className="w-full h-full rounded-full border border-gold-500/25 flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-950">
                <Crown className="w-7 h-7 text-gold-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gold-500 text-black text-[9px] font-bold px-1 rounded-full uppercase tracking-wider">
                VIP
              </div>
            </div>
            <span className="font-display text-2xl tracking-[0.25em] text-gold-400">ITR-E-NOOR</span>
            <span className="text-[10px] text-zinc-300 font-serif tracking-[0.15em] uppercase mt-0.5">Luxury Perfume Circle</span>
          </div>

          {/* Toggle Tab: Log In vs Create Account */}
          <div className="grid grid-cols-2 border-b border-zinc-900 mb-6">
            <button
              onClick={() => { setIsLogin(true); setOtpSent(false); }}
              className={`pb-3 text-sm font-semibold tracking-widest uppercase transition-all relative ${
                isLogin ? 'text-gold-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In
              {isLogin && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400"
                />
              )}
            </button>
            <button
              onClick={() => { setIsLogin(false); }}
              className={`pb-3 text-sm font-semibold tracking-widest uppercase transition-all relative ${
                !isLogin ? 'text-gold-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Register
              {!isLogin && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400"
                />
              )}
            </button>
          </div>

          {/* Login Options Tab (Email vs Mobile OTP) - only shown when isLogin is true */}
          {isLogin && !otpSent && (
            <div className="flex justify-center space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all rounded-full ${
                  loginMethod === 'email'
                    ? 'border-gold-500/50 bg-gold-950/20 text-gold-300'
                    : 'border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Email & Password
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all rounded-full ${
                  loginMethod === 'phone'
                    ? 'border-gold-500/50 bg-gold-950/20 text-gold-300'
                    : 'border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Mobile Number OTP
              </button>
            </div>
          )}

          {/* Form Area */}
          <form onSubmit={isLogin && loginMethod === 'phone' && !otpSent ? handleSendOtp : handleSubmit} className="space-y-4">
            
            {/* REGISTER: Name input */}
            {!isLogin && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-300 mb-1.5 font-semibold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm placeholder-zinc-600"
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Input (Form fields depend on Login vs Register & loginMethod) */}
            {(!isLogin || (isLogin && loginMethod === 'email')) && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-300 mb-1.5 font-semibold font-sans">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm placeholder-zinc-600"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
            )}

            {/* Phone Input (Shown during Register or if phone login chosen) */}
            {((isLogin && loginMethod === 'phone' && !otpSent) || !isLogin) && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-300 mb-1.5 font-semibold">Mobile Number</label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 px-3.5 bg-zinc-900 text-zinc-300 border border-r-0 border-zinc-800 text-sm rounded-l-lg select-none font-medium">
                    +91
                  </span>
                  <div className="relative w-full">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-r-lg focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm placeholder-zinc-600"
                      placeholder="98765 43210"
                      required={!isLogin || (isLogin && loginMethod === 'phone')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* OTP Input (Shown only when phone login chose & code sent) */}
            {isLogin && loginMethod === 'phone' && otpSent && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="text-center bg-gold-950/10 border border-gold-600/10 rounded-lg p-3 text-xs text-gold-300">
                  One-time authentication passcode sent to <span className="font-semibold">+91 {phone}</span>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-300 mb-1.5 font-semibold text-center">Enter 4-Digit OTP</label>
                  <div className="relative flex justify-center">
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      className="bg-zinc-900/85 border-2 border-gold-600/30 text-white tracking-[0.75em] text-center w-40 py-3 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-xl font-bold"
                      placeholder="0000"
                      required
                    />
                  </div>
                </div>

                <div className="text-center text-xs">
                  {otpTimer > 0 ? (
                    <span className="text-zinc-400">Resend code in <strong className="text-gold-400">{otpTimer}s</strong></span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setOtpTimer(45); }}
                      className="text-gold-400 hover:text-gold-300 font-semibold underline"
                    >
                      Resend Passcode
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Password Input (Email logic or SignUp) */}
            {(!isLogin || (isLogin && loginMethod === 'email')) && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-300 font-semibold">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs text-gold-400 hover:text-gold-300 transition-colors font-medium">Forgot Password?</a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-11 pr-11 py-3 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm placeholder-zinc-600"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Elite Newsletter Choice */}
            <div className="flex items-center justify-between text-xs py-1">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-zinc-200 select-none">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded bg-zinc-900 border-zinc-800 text-gold-500 focus:ring-gold-500 focus:ring-offset-zinc-950 w-4 h-4"
                />
                <span>{isLogin ? 'Keep me signed in' : 'Subscribe to Luxury Club updates'}</span>
              </label>
            </div>

            {/* Submit/Request Trigger */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold-600 to-amber-500 text-black font-semibold uppercase tracking-widest text-xs py-4.5 rounded-lg hover:from-gold-500 hover:to-amber-400 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(217,119,6,0.25)] flex items-center justify-center gap-2 font-display text-base"
            >
              {loading ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-black animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-black animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-black animate-bounce"></div>
                </div>
              ) : (
                <>
                  {isLogin 
                    ? (loginMethod === 'phone' && !otpSent ? 'Send Secure OTP' : 'Unlock Luxury Circle')
                    : 'Establish Premium Membership'
                  }
                </>
              )}
            </button>
          </form>

          {/* Social Sign-In (Styled beautifully after leading boutique stores) */}
          <div className="mt-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-900"></div>
              <span className="flex-shrink mx-4 text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Or Connect Instantly</span>
              <div className="flex-grow border-t border-zinc-900"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  await login('google-luxury@gmail.com', 'GOOGLE_LOGIN');
                  setLoading(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-semibold tracking-wider text-zinc-100 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.65 1.58 14.99 1 12 1 7.35 1 3.39 3.65 1.44 7.5l3.8 2.94C6.14 7.42 8.84 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.43-4.91 3.43-8.55z" />
                  <path fill="#FBBC05" d="M5.24 14.56c-.24-.72-.38-1.5-.38-2.31s.14-1.59.38-2.31L1.44 7.5C.52 9.3 0 11.4 0 13.7s.52 4.4 1.44 6.2l3.8-2.94z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.02.68-2.33 1.09-3.96 1.09-3.16 0-5.86-2.38-6.76-5.4l-3.8 2.94C3.39 20.35 7.35 23 12 23z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  await login('facebook-luxury@gmail.com', 'FB_LOGIN');
                  setLoading(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-semibold tracking-wider text-zinc-100 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Verification / Trust Indicators */}
          <div className="mt-8 border-t border-zinc-900 pt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>SSL Secure Encryption</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider">
              <Star className="w-4 h-4 text-gold-500" />
              <span>100% Original Attars</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

