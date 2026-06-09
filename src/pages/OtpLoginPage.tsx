import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Phone, Mail, UserRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { normalizeMobile } from "@/lib/phone";

const DEMO_OTP = "123456";
const RESEND_SECONDS = 30;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Mode = "phone" | "email";

const OtpLoginPage = () => {
  const navigate = useNavigate();
  const { user, firebaseUser, demoUser, loading: authLoading, signInDemo } = useAuth();

  const [mode, setMode] = useState<Mode>("phone");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const verifyOnceRef = useRef(false);

  const validMobile = /^[6-9]\d{9}$/.test(mobile);
  const validEmail = EMAIL_RE.test(email);
  const identifier = mode === "phone" ? mobile : email;
  const validInput = mode === "phone" ? validMobile : validEmail;

  useEffect(() => {
    if (authLoading) return;
    if (user || firebaseUser || demoUser) navigate("/home", { replace: true });
  }, [user, firebaseUser, demoUser, authLoading, navigate]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const maskIdentifier = () => {
    if (mode === "phone") {
      const last4 = mobile.slice(-4);
      return `+91 ••••••${last4}`;
    }
    const [name, domain] = email.split("@");
    const masked = name.length <= 2 ? name : name[0] + "•".repeat(name.length - 2) + name.slice(-1);
    return `${masked}@${domain}`;
  };

  const sendOtp = (isResend = false) => {
    if (mode === "phone" && !validMobile) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (mode === "email" && !validEmail) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (resendIn > 0) return;

    setLoading(true);
    // Simulated network delay for realism
    setTimeout(() => {
      setOtp(["", "", "", "", "", ""]);
      setStep("otp");
      setResendIn(RESEND_SECONDS);
      setLoading(false);
      verifyOnceRef.current = false;
      toast.success(
        `${isResend ? "OTP resent" : "OTP sent"} to ${maskIdentifier()} — use ${DEMO_OTP}`,
      );
      setTimeout(() => document.getElementById("otp-0")?.focus(), 100);
    }, 450);
  };

  const completeLogin = (profile: Parameters<typeof signInDemo>[0]) => {
    signInDemo(profile);
    toast.success("Welcome to Orvigo!");
    navigate("/home", { replace: true });
  };

  const handleVerify = (codeOverride?: string) => {
    const enteredOtp = codeOverride ?? otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    if (verifyOnceRef.current) return;
    verifyOnceRef.current = true;
    setVerifying(true);

    setTimeout(() => {
      if (enteredOtp !== DEMO_OTP) {
        setVerifying(false);
        verifyOnceRef.current = false;
        toast.error("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
        return;
      }
      const name = mode === "phone" ? `User ${mobile.slice(-4)}` : email.split("@")[0];
      completeLogin({ kind: mode, identifier, name });
    }, 600);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      completeLogin({
        kind: "google",
        identifier: "demo.user@gmail.com",
        name: "Demo Google User",
      });
    }, 400);
  };

  const handleGuest = () => {
    completeLogin({ kind: "guest", identifier: "guest", name: "Guest" });
  };

  const focusOtp = (i: number) => {
    const idx = Math.max(0, Math.min(5, i));
    (document.getElementById(`otp-${idx}`) as HTMLInputElement | null)?.focus();
  };

  const handleOtpChange = (i: number, v: string) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) {
      const next = [...otp];
      next[i] = "";
      setOtp(next);
      return;
    }
    const next = [...otp];
    let cursor = i;
    for (const ch of digits) {
      if (cursor > 5) break;
      next[cursor] = ch;
      cursor++;
    }
    setOtp(next);
    focusOtp(Math.min(cursor, 5));

    // Auto-verify when all 6 digits are filled
    if (next.every((d) => d !== "")) {
      handleVerify(next.join(""));
    }
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp];
        next[i] = "";
        setOtp(next);
        e.preventDefault();
      } else if (i > 0) {
        const next = [...otp];
        next[i - 1] = "";
        setOtp(next);
        focusOtp(i - 1);
        e.preventDefault();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleVerify();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(220, 75%, 18%) 0%, hsl(215, 80%, 35%) 55%, hsl(205, 85%, 65%) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              top: `${(i * 37) % 70}%`,
              left: `${(i * 53) % 100}%`,
              opacity: 0.3 + ((i * 7) % 50) / 100,
            }}
          />
        ))}
      </div>

      <div className="relative mt-2 mb-2 flex-shrink-0">
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 40%, hsla(210, 100%, 70%, 0.5), transparent 60%), radial-gradient(circle at 70% 60%, hsla(25, 95%, 60%, 0.4), transparent 65%)",
            filter: "blur(22px)",
            transform: "scale(0.85)",
          }}
        />
        <img
          src="/orvigo-logo.png"
          alt="Orvigo"
          className="w-32 h-32 object-contain relative z-10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <p
        className="tracking-[0.35em] text-[10px] font-medium mb-5 z-10"
        style={{ color: "hsla(0,0%,100%,0.85)" }}
      >
        EVERYTHING IN ONE APP
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl p-5 z-10"
        style={{
          background: "hsla(0,0%,100%,0.18)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid hsla(0,0%,100%,0.25)",
          boxShadow: "0 12px 40px hsla(220,80%,15%,0.25)",
        }}
      >
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl font-bold text-white">Welcome to Orvigo</h1>
              <p className="text-sm mt-1" style={{ color: "hsla(0,0%,100%,0.75)" }}>
                Sign in to continue
              </p>

              {/* Mode tabs */}
              <div
                className="flex gap-1 mt-4 p-1 rounded-2xl"
                style={{ background: "hsla(0,0%,100%,0.18)" }}
              >
                {(["phone", "email"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: mode === m ? "hsla(0,0%,100%,0.95)" : "transparent",
                      color: mode === m ? "hsl(220,40%,20%)" : "hsla(0,0%,100%,0.85)",
                    }}
                  >
                    {m === "phone" ? <Phone size={14} /> : <Mail size={14} />}
                    {m === "phone" ? "Phone" : "Email"}
                  </button>
                ))}
              </div>

              {mode === "phone" ? (
                <>
                  <label className="block text-xs font-medium mt-4 mb-1.5" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                    Mobile Number
                  </label>
                  <div
                    className="flex items-center rounded-2xl px-4 py-3 gap-3"
                    style={{ background: "hsla(0,0%,100%,0.4)" }}
                  >
                    <span className="text-base font-semibold" style={{ color: "hsl(220,40%,20%)" }}>+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(normalizeMobile(e.target.value))}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                      style={{ color: "hsl(220,40%,15%)" }}
                    />
                  </div>
                  {mobile && !validMobile && (
                    <p className="text-xs mt-1.5" style={{ color: "hsl(15, 95%, 80%)" }}>
                      Enter a valid 10-digit Indian mobile number
                    </p>
                  )}
                </>
              ) : (
                <>
                  <label className="block text-xs font-medium mt-4 mb-1.5" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                    Email Address
                  </label>
                  <div
                    className="flex items-center rounded-2xl px-4 py-3 gap-3"
                    style={{ background: "hsla(0,0%,100%,0.4)" }}
                  >
                    <Mail size={16} style={{ color: "hsl(220,40%,30%)" }} />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                      style={{ color: "hsl(220,40%,15%)" }}
                    />
                  </div>
                  {email && !validEmail && (
                    <p className="text-xs mt-1.5" style={{ color: "hsl(15, 95%, 80%)" }}>
                      Enter a valid email address
                    </p>
                  )}
                </>
              )}

              <button
                onClick={() => sendOtp(false)}
                disabled={loading || !validInput}
                className="w-full rounded-2xl py-3 mt-4 text-base font-semibold transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 90%, 75%), hsl(200, 95%, 80%))",
                  color: "hsl(220,40%,20%)",
                  boxShadow: "0 8px 24px hsla(210,90%,50%,0.3)",
                }}
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Sending..." : "Send OTP"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px" style={{ background: "hsla(0,0%,100%,0.25)" }} />
                <span className="text-[10px] font-semibold tracking-wider" style={{ color: "hsla(0,0%,100%,0.7)" }}>
                  OR
                </span>
                <div className="flex-1 h-px" style={{ background: "hsla(0,0%,100%,0.25)" }} />
              </div>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2.5 transition-all disabled:opacity-60"
                style={{
                  background: "white",
                  color: "hsl(220,40%,20%)",
                  boxShadow: "0 4px 14px hsla(220,30%,15%,0.18)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8L6.2 33.3C9.6 39.8 16.3 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.9 35.6 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5z" />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={handleGuest}
                disabled={loading}
                className="w-full rounded-2xl py-3 mt-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                style={{
                  background: "hsla(0,0%,100%,0.18)",
                  color: "white",
                  border: "1px solid hsla(0,0%,100%,0.3)",
                }}
              >
                <UserRound size={16} />
                Continue as Guest
              </button>

              <p className="text-center text-[11px] mt-4" style={{ color: "hsla(0,0%,100%,0.75)" }}>
                Demo OTP: <span className="font-bold text-white">{DEMO_OTP}</span>
              </p>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
              <p className="text-sm mt-2" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                Sent to <span className="font-semibold text-white">{maskIdentifier()}</span>
              </p>

              <div className="flex justify-between gap-2 mt-6">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onFocus={(e) => e.currentTarget.select()}
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    disabled={verifying}
                    className="w-11 h-12 rounded-xl text-center text-lg font-bold outline-none disabled:opacity-60"
                    style={{
                      background: "hsla(0,0%,100%,0.9)",
                      color: "hsl(220,40%,15%)",
                      border: "1px solid hsla(0,0%,100%,0.3)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => handleVerify()}
                disabled={verifying}
                className="w-full rounded-2xl py-3.5 mt-5 text-base font-semibold transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 90%, 75%), hsl(200, 95%, 80%))",
                  color: "hsl(220,40%,20%)",
                  boxShadow: "0 8px 24px hsla(210,90%,50%,0.3)",
                }}
              >
                {verifying && <Loader2 size={16} className="animate-spin" />}
                {verifying ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="flex items-center justify-between mt-4 text-xs" style={{ color: "hsla(0,0%,100%,0.9)" }}>
                <button
                  onClick={() => {
                    setStep("input");
                    setOtp(["", "", "", "", "", ""]);
                    setResendIn(0);
                  }}
                  className="underline"
                >
                  Change {mode === "phone" ? "number" : "email"}
                </button>
                <button
                  onClick={() => sendOtp(true)}
                  disabled={resendIn > 0 || loading}
                  className="underline disabled:opacity-60 disabled:no-underline"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                </button>
              </div>

              <p className="text-center text-[11px] mt-3" style={{ color: "hsla(0,0%,100%,0.75)" }}>
                Demo OTP: <span className="font-bold text-white">{DEMO_OTP}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OtpLoginPage;
