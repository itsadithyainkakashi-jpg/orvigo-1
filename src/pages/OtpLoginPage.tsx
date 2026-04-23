import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { firebaseAuth } from "@/lib/firebase";

const OtpLoginPage = () => {
  const navigate = useNavigate();
  const { user, firebaseUser, loading: authLoading } = useAuth();
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const RESEND_SECONDS = 30;
  const validMobile = /^\d{10}$/.test(mobile);
  const validOtp = otp.every((d) => /^\d$/.test(d));

  // Auto-login: if already signed in (Firebase or Supabase), skip the screen
  useEffect(() => {
    if (authLoading) return;
    if (user || firebaseUser) navigate("/home", { replace: true });
  }, [user, firebaseUser, authLoading, navigate]);

  // Countdown tick
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      try {
        recaptchaRef.current?.clear();
      } catch {
        /* noop */
      }
      recaptchaRef.current = null;
    };
  }, []);

  const ensureRecaptcha = () => {
    if (recaptchaRef.current) return recaptchaRef.current;
    recaptchaRef.current = new RecaptchaVerifier(firebaseAuth, "recaptcha-container", {
      size: "invisible",
    });
    return recaptchaRef.current;
  };

  const friendlySendError = (err: unknown): string => {
    const code = (err as { code?: string })?.code ?? "";
    const raw = err instanceof Error ? err.message : "";
    switch (code) {
      case "auth/billing-not-enabled":
        return "Phone Auth isn't enabled on the Firebase project (billing required).";
      case "auth/invalid-phone-number":
        return "That phone number isn't valid. Check the digits and try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a few minutes before trying again.";
      case "auth/quota-exceeded":
        return "Daily SMS quota exceeded. Please try again later.";
      case "auth/captcha-check-failed":
        return "reCAPTCHA check failed. Reload the page and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and retry.";
      default:
        return raw.includes("BILLING_NOT_ENABLED")
          ? "Phone Auth isn't enabled on the Firebase project (billing required)."
          : raw || "Failed to send OTP. Please try again.";
    }
  };

  const friendlyVerifyError = (err: unknown): { message: string; reset: boolean } => {
    const code = (err as { code?: string })?.code ?? "";
    switch (code) {
      case "auth/invalid-verification-code":
        return { message: "Invalid OTP. Please check and try again.", reset: false };
      case "auth/code-expired":
        return { message: "OTP expired. Please request a new code.", reset: true };
      case "auth/missing-verification-code":
        return { message: "Please enter the 6-digit OTP.", reset: false };
      case "auth/session-expired":
        return { message: "Session expired. Please request a new OTP.", reset: true };
      case "auth/too-many-requests":
        return { message: "Too many attempts. Try again in a few minutes.", reset: true };
      default:
        return {
          message: err instanceof Error ? err.message : "Verification failed",
          reset: false,
        };
    }
  };

  const resetToPhoneStep = () => {
    confirmationRef.current = null;
    setOtp(["", "", "", "", "", ""]);
    setResendIn(0);
    try {
      recaptchaRef.current?.clear();
    } catch {
      /* noop */
    }
    recaptchaRef.current = null;
    setStep("phone");
  };

  const sendOtp = async (isResend = false) => {
    if (!validMobile) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (resendIn > 0) return;
    setLoading(true);
    try {
      const verifier = ensureRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        `+91${mobile}`,
        verifier,
      );
      confirmationRef.current = confirmation;
      setOtp(["", "", "", "", "", ""]);
      setStep("otp");
      setResendIn(RESEND_SECONDS);
      toast.success(isResend ? "OTP sent again" : `OTP sent to +91 ${mobile}`);
    } catch (err: unknown) {
      toast.error(friendlySendError(err));
      try {
        recaptchaRef.current?.clear();
      } catch {
        /* noop */
      }
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = () => sendOtp(false);
  const handleResend = () => sendOtp(true);

  const phoneToCreds = (phone: string) => ({
    email: `user_91${phone}@orvigo.app`,
    password: `Orvigo!${phone}#secure`,
  });

  const handleVerify = async () => {
    if (!validOtp) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    if (!confirmationRef.current) {
      toast.error("Session expired. Please request a new OTP.");
      resetToPhoneStep();
      return;
    }
    setLoading(true);
    try {
      await confirmationRef.current.confirm(otp.join(""));

      const { email, password } = phoneToCreds(mobile);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { phone: `+91${mobile}`, name: `User ${mobile.slice(-4)}` },
            emailRedirectTo: `${window.location.origin}/home`,
          },
        });
        if (signUpError) throw signUpError;
        const retry = await supabase.auth.signInWithPassword({ email, password });
        if (retry.error) throw retry.error;
      }

      setStep("done");
      toast.success("Verified successfully!");
    } catch (err: unknown) {
      const { message, reset } = friendlyVerifyError(err);
      toast.error(message);
      if (reset) {
        resetToPhoneStep();
      } else {
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-between px-6 pt-4 pb-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(220, 75%, 18%) 0%, hsl(215, 80%, 35%) 55%, hsl(205, 85%, 65%) 100%)",
      }}
    >
      {/* Subtle stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.7 ? 2 : 1,
              height: Math.random() > 0.7 ? 2 : 1,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Animated Logo - large prominent splash-style */}
      <div className="relative mt-10 sm:mt-14 mb-0 animate-logo-float flex-shrink-0">
        {/* Soft dual-color glow halo */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-logo-glow"
          style={{
            background:
              "radial-gradient(circle at 35% 40%, hsla(210, 100%, 70%, 0.55), transparent 60%), radial-gradient(circle at 70% 60%, hsla(25, 95%, 60%, 0.45), transparent 65%)",
            filter: "blur(22px)",
            transform: "scale(0.85)",
          }}
        />
        <div className="relative">
          <img
            src="/orvigo-logo.png"
            alt="Orvigo"
            className="w-52 h-52 sm:w-64 sm:h-64 object-contain relative z-10"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Shine sweep overlay */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-20"
            style={{ mixBlendMode: "overlay" }}
          >
            <div
              className="absolute top-0 bottom-0 w-1/3 animate-logo-shine"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.65), transparent)",
              }}
            />
          </div>
        </div>
      </div>

      <p
        className="tracking-[0.35em] text-[10px] font-medium mt-4 mb-6 z-10"
        style={{ color: "hsla(0,0%,100%,0.85)" }}
      >
        EVERYTHING IN ONE APP
      </p>

      {/* Glass card */}
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
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl font-bold text-white">Welcome to Orvigo</h1>
              <p className="text-sm mt-1" style={{ color: "hsla(0,0%,100%,0.75)" }}>
                Sign in to continue
              </p>

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
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                  style={{ color: "hsl(220,40%,15%)" }}
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading || resendIn > 0 || !validMobile}
                className="w-full rounded-2xl py-3 mt-4 text-base font-semibold transition-all disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 90%, 75%), hsl(200, 95%, 80%))",
                  color: "hsl(220,40%,20%)",
                  boxShadow: "0 8px 24px hsla(210,90%,50%,0.3)",
                }}
              >
                {loading
                  ? "Sending..."
                  : resendIn > 0
                  ? `Resend in ${resendIn}s`
                  : "Send OTP"}
              </button>

              <p className="text-center text-xs mt-3" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                By continuing, you agree to our{" "}
                <span className="underline font-semibold" style={{ color: "hsl(210,100%,85%)" }}>Terms</span>
                {" "}&{" "}
                <span className="underline font-semibold" style={{ color: "hsl(210,100%,85%)" }}>Privacy Policy</span>
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
              <p className="text-sm mt-1" style={{ color: "hsla(0,0%,100%,0.75)" }}>
                Sent to +91 {mobile}
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
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[i] && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    className="w-11 h-12 rounded-xl text-center text-lg font-bold outline-none"
                    style={{
                      background: "hsla(0,0%,100%,0.4)",
                      color: "hsl(220,40%,15%)",
                      border: "1px solid hsla(0,0%,100%,0.3)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full rounded-2xl py-3.5 mt-5 text-base font-semibold transition-all disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 90%, 75%), hsl(200, 95%, 80%))",
                  color: "hsl(220,40%,20%)",
                  boxShadow: "0 8px 24px hsla(210,90%,50%,0.3)",
                }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="flex items-center justify-between mt-4 text-xs" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                <button
                  onClick={() => setStep("phone")}
                  className="underline"
                >
                  Change mobile number
                </button>
                <button
                  onClick={handleResend}
                  disabled={resendIn > 0 || loading}
                  className="underline disabled:opacity-60 disabled:no-underline"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                </button>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-2"
            >
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
                style={{ background: "hsla(140,70%,55%,0.25)" }}
              >
                ✓
              </div>
              <h1 className="text-xl font-bold text-white mt-4">You're all set!</h1>
              <p className="text-sm mt-1" style={{ color: "hsla(0,0%,100%,0.75)" }}>
                Welcome to Orvigo
              </p>
              <button
                onClick={() => navigate("/home")}
                className="w-full rounded-2xl py-3.5 mt-6 text-base font-semibold"
                style={{
                  background: "linear-gradient(135deg, hsl(25, 95%, 60%), hsl(15, 90%, 55%))",
                  color: "white",
                  boxShadow: "0 8px 24px hsla(25,95%,55%,0.4)",
                }}
              >
                Continue to App
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Invisible reCAPTCHA container required by Firebase phone auth */}
      <div id="recaptcha-container" />
    </div>
  );
};

export default OtpLoginPage;
