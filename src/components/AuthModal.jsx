import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Film, 
  BookmarkCheck,
  ShieldCheck
} from 'lucide-react';
import { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword } from '../utils/firebase';

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const user = await loginWithGoogle();
      if (onSuccess) onSuccess(user);
      onClose();
    } catch (err) {
      console.error('Google sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled yet in Firebase Console. Please enable Google provider in Authentication.');
      } else {
        setError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) throw new Error('Please enter your name.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');
        const user = await registerWithEmail(email, password, name.trim());
        if (onSuccess) onSuccess(user);
        onClose();
      } else if (mode === 'signin') {
        const user = await loginWithEmail(email, password);
        if (onSuccess) onSuccess(user);
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err) {
      console.error('Auth error:', err);
      let msg = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Try signing in.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="auth-modal-card glass-panel" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} title="Close">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="auth-header text-center">
          <div className="auth-brand-badge">
            <img src="/favicon.png" alt="OakShow" className="auth-brand-logo" />
            <span>OAKSHOW ACCOUNT</span>
          </div>

          <h3 className="auth-title">
            {mode === 'signup' && 'Create Your OakShow Account'}
            {mode === 'signin' && 'Welcome Back to OakShow'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h3>

          <p className="auth-subtitle">
            {mode === 'signup' && 'Save movies to your cloud Watchlist, track reviews, and explore cinema.'}
            {mode === 'signin' && 'Sign in to access your synced Watchlist across all your devices.'}
            {mode === 'forgot' && 'Enter your email to receive a password reset link.'}
          </p>
        </div>

        {/* Quick Benefits Pill */}
        {mode !== 'forgot' && (
          <div className="auth-perks-bar">
            <div className="perk-item">
              <BookmarkCheck size={13} className="text-gold" />
              <span>Cloud Watchlist</span>
            </div>
            <div className="perk-divider">•</div>
            <div className="perk-item">
              <Film size={13} className="text-accent" />
              <span>Synced Reviews</span>
            </div>
            <div className="perk-divider">•</div>
            <div className="perk-item">
              <ShieldCheck size={13} className="text-emerald" />
              <span>Free Forever</span>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Password Reset Sent Notice */}
        {resetSent && mode === 'forgot' && (
          <div className="auth-success-banner animate-fade-in">
            <CheckCircle2 size={18} className="text-emerald" />
            <div>
              <strong>Reset link sent!</strong>
              <p>Check your email inbox for instructions to reset your password.</p>
            </div>
          </div>
        )}

        {/* Google 1-Click Sign-in Button */}
        {mode !== 'forgot' && (
          <>
            <button 
              type="button" 
              className="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
            >
              {googleLoading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : (
                <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            <div className="auth-separator">
              <div className="separator-line" />
              <span className="separator-text">OR WITH EMAIL</span>
              <div className="separator-line" />
            </div>
          </>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <div className="input-wrap">
                <User size={16} className="input-icon" />
                <input 
                  type="text"
                  className="auth-input"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label className="auth-label">Email Address</label>
            <div className="input-wrap">
              <Mail size={16} className="input-icon" />
              <input 
                type="email"
                className="auth-input"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="auth-input-group">
              <div className="label-with-action">
                <label className="auth-label">Password</label>
                {mode === 'signin' && (
                  <button 
                    type="button" 
                    className="forgot-link"
                    onClick={() => { setMode('forgot'); setError(null); }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="input-wrap">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password"
                  className="auth-input"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary auth-submit-btn"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" />
            ) : null}
            <span>
              {mode === 'signup' && 'Create Free Account'}
              {mode === 'signin' && 'Sign In to OakShow'}
              {mode === 'forgot' && 'Send Reset Link'}
            </span>
            {!loading && <ArrowRight size={16} className="ms-2" />}
          </button>
        </form>

        {/* Footer Toggle Modes */}
        <div className="auth-footer text-center">
          {mode === 'signin' && (
            <p>
              Don't have an account yet?{' '}
              <button 
                type="button" 
                className="auth-mode-switch"
                onClick={() => { setMode('signup'); setError(null); }}
              >
                Sign up free
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="auth-mode-switch"
                onClick={() => { setMode('signin'); setError(null); }}
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p>
              Remember your password?{' '}
              <button 
                type="button" 
                className="auth-mode-switch"
                onClick={() => { setMode('signin'); setError(null); }}
              >
                Back to Sign in
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        .auth-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal-card {
          width: 100%;
          max-width: 440px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 36px 32px;
          position: relative;
          box-shadow: var(--shadow-lg);
          animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        .auth-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .auth-close-btn:hover {
          color: var(--text-main);
          border-color: var(--accent-primary);
          transform: rotate(90deg);
        }

        .auth-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(2, 132, 199, 0.08);
          border: 1px solid rgba(2, 132, 199, 0.2);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--accent-primary);
          margin-bottom: 12px;
        }

        .auth-brand-logo {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }

        .auth-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 6px;
        }

        .auth-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
        }

        .auth-perks-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 18px 0;
          padding: 8px 12px;
          background: var(--bg-surface-elevated);
          border-radius: var(--radius-md);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .perk-divider {
          color: var(--border-subtle);
        }

        .google-signin-btn {
          width: 100%;
          padding: 11px 16px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 0.92rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .google-signin-btn:hover:not(:disabled) {
          background: var(--bg-surface-elevated);
          border-color: var(--accent-primary);
          transform: translateY(-1px);
        }

        .auth-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0;
        }

        .separator-line {
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
        }

        .separator-text {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-dim);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .label-with-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .auth-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-heading);
          margin: 0;
        }

        .forgot-link {
          background: none;
          border: none;
          padding: 0;
          color: var(--accent-primary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-dim);
          pointer-events: none;
        }

        .auth-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 0.9rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        .auth-input:focus {
          border-color: var(--accent-primary);
          background: var(--bg-surface);
          box-shadow: 0 0 0 3px var(--border-glow);
        }

        .auth-submit-btn {
          width: 100%;
          padding: 11px 18px;
          font-size: 0.94rem;
          font-weight: 800;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 6px;
          box-shadow: var(--shadow-sm);
        }

        .auth-footer {
          margin-top: 18px;
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .auth-mode-switch {
          background: none;
          border: none;
          padding: 0;
          color: var(--accent-primary);
          font-weight: 700;
          cursor: pointer;
        }

        .auth-mode-switch:hover {
          text-decoration: underline;
        }

        .auth-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: rgba(225, 29, 72, 0.1);
          border: 1px solid rgba(225, 29, 72, 0.25);
          color: var(--accent-red);
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .auth-success-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(5, 150, 105, 0.1);
          border: 1px solid rgba(5, 150, 105, 0.25);
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          margin-bottom: 12px;
          color: var(--text-main);
        }

        .auth-success-banner p {
          margin: 3px 0 0;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
