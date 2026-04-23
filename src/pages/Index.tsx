import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import orvigoLogo from "@/assets/orvigo-logo-transparent.png";

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 30;

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Splash route is no longer the entry point — always send to Home
  useEffect(() => {
    navigate("/home", { replace: true });
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    if (step !== "otp" || canResend) return;
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, countdown, canResend]);

  const handleSendOtp = () => {
    if (phone.length !== 10) return;
    setStep("otp");
    setOtp(Array(OTP_LENGTH).fill(""));
    setCountdown(COUNTDOWN_SECONDS);
    setCanResend(false);
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setCountdown(COUNTDOWN_SECONDS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    setStep("phone");
    setOtp(Array(OTP_LENGTH).fill(""));
  };

  const otpFilled = otp.every((d) => d !== "");
  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const glassCard = {
    background: "hsla(0, 0%, 100%, 0.18)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: "1px solid hsla(0, 0%, 100%, 0.3)",
    boxShadow:
      "0 20px 60px hsla(210, 50%, 15%, 0.18), inset 0 1px 0 hsla(0, 0%, 100%, 0.4)",
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-between px-6 py-10 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(180deg, hsl(215, 75%, 18%) 0%, hsl(210, 70%, 40%) 30%, hsl(200, 60%, 70%) 60%, hsl(200, 30%, 92%) 85%, hsl(0, 0%, 99%) 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsla(210, 80%, 55%, 0.25) 0%, hsla(30, 90%, 55%, 0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Animated light rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none overflow-hidden">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={angle}
            className="absolute top-1/2 left-1/2 origin-bottom-left"
            style={{
              width: "2px",
              height: "220px",
              background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? "hsla(210, 80%, 60%, 0.12)" : "hsla(30, 80%, 55%, 0.08)"})`,
              transform: `rotate(${angle}deg)`,
              filter: "blur(3px)",
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + (i % 3) * 2}px`,
            height: `${2 + (i % 3) * 2}px`,
            background: i % 3 === 0
              ? "hsla(210, 80%, 65%, 0.5)"
              : i % 3 === 1
              ? "hsla(30, 80%, 60%, 0.4)"
              : "hsla(0, 0%, 100%, 0.35)",
            left: `${10 + (i * 7) % 80}%`,
            top: `${5 + (i * 11) % 40}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -20 - (i % 3) * 10, 0],
            x: [0, (i % 2 === 0 ? 8 : -8), 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Logo + Tagline */}
      <div className="flex flex-col items-center pt-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={orvigoLogo}
              alt="Orvigo"
              className="h-[33vh] w-auto object-contain"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 1.5, 0, -1.5, 0],
                filter: [
                  "drop-shadow(0 8px 24px hsla(210, 80%, 50%, 0.4)) drop-shadow(0 0 40px hsla(30, 90%, 55%, 0.15))",
                  "drop-shadow(0 14px 36px hsla(210, 80%, 50%, 0.55)) drop-shadow(0 0 60px hsla(30, 90%, 55%, 0.25))",
                  "drop-shadow(0 8px 24px hsla(210, 80%, 50%, 0.4)) drop-shadow(0 0 40px hsla(30, 90%, 55%, 0.15))",
                ],
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-2 text-xs tracking-[0.25em] uppercase font-light"
          style={{
            color: "hsla(0, 0%, 100%, 0.92)",
            textShadow: "0 0 20px hsla(210, 80%, 60%, 0.4)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Everything in one app
        </motion.p>
      </div>

      {/* Card area */}
      <div className="w-full max-w-sm mb-6 relative z-10">
        <AnimatePresence mode="wait">
          {step === "phone" ? (
            <motion.div
              key="phone-card"
              className="rounded-3xl p-7"
              style={glassCard}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-xl font-bold" style={{ color: "hsl(220, 50%, 15%)" }}>
                Welcome to Orvigo
              </h2>
              <p className="text-sm mt-1 mb-6" style={{ color: "hsla(220, 30%, 25%, 0.6)" }}>
                Sign in to continue
              </p>

              <label
                className="text-xs font-medium mb-2 block"
                style={{ color: "hsla(220, 20%, 30%, 0.55)" }}
              >
                Mobile Number
              </label>
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-5 transition-all"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  border: "1px solid hsla(210, 30%, 80%, 0.5)",
                }}
              >
                <span className="text-sm font-semibold" style={{ color: "hsl(220, 40%, 20%)" }}>
                  +91
                </span>
                <div className="w-px h-5" style={{ background: "hsla(210, 30%, 60%, 0.3)" }} />
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                  style={{ color: "hsl(220, 40%, 13%)" }}
                />
              </div>

              <motion.button
                disabled={phone.length !== 10}
                whileTap={{ scale: 0.93 }}
                onClick={handleSendOtp}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(200, 90%, 52%))",
                  color: "white",
                  boxShadow:
                    phone.length === 10 ? "0 8px 28px hsla(210, 100%, 45%, 0.45)" : "none",
                }}
              >
                Send OTP
              </motion.button>

              <p className="text-center text-xs mt-5" style={{ color: "hsla(220, 20%, 30%, 0.4)" }}>
                By continuing, you agree to our{" "}
                <span className="underline cursor-pointer" style={{ color: "hsl(210, 80%, 45%)" }}>
                  Terms
                </span>{" "}
                &{" "}
                <span className="underline cursor-pointer" style={{ color: "hsl(210, 80%, 45%)" }}>
                  Privacy Policy
                </span>
              </p>
            </motion.div>
          ) : step === "otp" ? (
            <motion.div
              key="otp-card"
              className="rounded-3xl p-7"
              style={glassCard}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-1 mb-4 text-sm font-medium"
                style={{ color: "hsl(210, 80%, 45%)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
              </button>

              <h2 className="text-xl font-bold" style={{ color: "hsl(220, 50%, 15%)" }}>
                Verify OTP
              </h2>
              <p className="text-sm mt-1 mb-6" style={{ color: "hsla(220, 30%, 25%, 0.6)" }}>
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold" style={{ color: "hsl(220, 40%, 20%)" }}>
                  +91 {phone}
                </span>
              </p>

              {/* OTP inputs */}
              <div className="flex justify-between gap-2 mb-5">
                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                  <motion.input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-13 rounded-xl text-center text-lg font-bold outline-none transition-all"
                    style={{
                      background: otp[i]
                        ? "hsla(210, 100%, 45%, 0.1)"
                        : "hsla(0, 0%, 100%, 0.55)",
                      border: otp[i]
                        ? "2px solid hsl(210, 100%, 45%)"
                        : "1px solid hsla(210, 30%, 80%, 0.5)",
                      color: "hsl(220, 40%, 13%)",
                    }}
                    whileFocus={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>

              {/* Countdown / Resend */}
              <div className="text-center mb-5">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-sm font-semibold"
                    style={{ color: "hsl(210, 80%, 45%)" }}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-sm" style={{ color: "hsla(220, 20%, 30%, 0.55)" }}>
                    Resend in{" "}
                    <span className="font-semibold" style={{ color: "hsl(210, 80%, 45%)" }}>
                      {formatTime(countdown)}
                    </span>
                  </p>
                )}
              </div>

              {/* Verify button */}
              <motion.button
                disabled={!otpFilled}
                whileTap={{ scale: 0.93 }}
                onClick={() => otpFilled && setStep("success")}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(200, 90%, 52%))",
                  color: "white",
                  boxShadow: otpFilled ? "0 8px 28px hsla(210, 100%, 45%, 0.45)" : "none",
                }}
              >
                Verify & Continue
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="success-card"
              className="rounded-3xl p-8 flex flex-col items-center"
              style={glassCard}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Checkmark circle */}
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: "linear-gradient(135deg, hsl(145, 70%, 45%), hsl(160, 60%, 50%))",
                  boxShadow: "0 8px 30px hsla(145, 70%, 45%, 0.4)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
              >
                <motion.svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  />
                </motion.svg>
              </motion.div>

              <motion.h2
                className="text-xl font-bold mb-1"
                style={{ color: "hsl(220, 50%, 15%)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Verified!
              </motion.h2>
              <motion.p
                className="text-sm mb-6 text-center"
                style={{ color: "hsla(220, 30%, 25%, 0.6)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                Your phone number has been verified successfully
              </motion.p>

              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => navigate("/auth")}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(200, 90%, 52%))",
                  color: "white",
                  boxShadow: "0 8px 28px hsla(210, 100%, 45%, 0.45)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Continue to App
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Index;
