import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, ArrowDown } from 'lucide-react';

/**
 * PullToRefresh Component for OakShow Mobile
 * 
 * Provides native app-grade pull-down to refresh experience (like IMDb, Rotten Tomatoes,
 * BookMyShow, District), featuring:
 * - Fluid rubber-band physics with dampening
 * - Responsive rotation & directional flip on release threshold
 * - Light haptic feedback on threshold trigger
 * - Smooth spinner & auto reload
 * - Safe conflict avoidance with horizontal carousels, drawers, and open modals
 * - Seamless support for both touch devices and mobile emulator testing
 */
export default function PullToRefresh() {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [thresholdReached, setThresholdReached] = useState(false);

  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const canPullRef = useRef(false);
  const isPullingRef = useRef(false);
  const hasVibratedRef = useRef(false);

  const PULL_THRESHOLD = 70; // px needed to trigger refresh
  const MAX_PULL = 115;      // maximum visual extension

  const isModalOrOverlayOpen = () => {
    return !!(
      document.querySelector('.search-modal-overlay') ||
      document.querySelector('.search-modal-backdrop') ||
      document.querySelector('.bookmarks-drawer') ||
      document.querySelector('.auth-modal') ||
      document.querySelector('.video-modal') ||
      document.querySelector('.modal-backdrop') ||
      document.body.classList.contains('modal-open') ||
      document.body.classList.contains('overflow-hidden') ||
      document.documentElement.classList.contains('modal-open')
    );
  };

  useEffect(() => {
    const handleStart = (clientY, clientX) => {
      if (isRefreshing) return;
      if (isModalOrOverlayOpen()) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      // Only initiate if user is at the top of the viewport
      if (scrollTop <= 2) {
        canPullRef.current = true;
        startYRef.current = clientY;
        startXRef.current = clientX;
        hasVibratedRef.current = false;
      } else {
        canPullRef.current = false;
      }
    };

    const handleMove = (clientY, clientX, originalEvent) => {
      if (!canPullRef.current || isRefreshing) return;

      const deltaY = clientY - startYRef.current;
      const deltaX = Math.abs(clientX - startXRef.current);

      // If user is swiping horizontally (carousels, tabs, side gestures), cancel pull
      if (!isPullingRef.current && deltaX > Math.abs(deltaY)) {
        canPullRef.current = false;
        return;
      }

      // Check current scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop > 2 && !isPullingRef.current) {
        canPullRef.current = false;
        return;
      }

      // When dragging downwards from top
      if (deltaY > 0) {
        // Logarithmic / power damping for physical spring feel
        const damped = Math.min(MAX_PULL, Math.pow(deltaY, 0.82) * 1.5);
        
        if (damped > 8) {
          isPullingRef.current = true;
          setIsPulling(true);
          setPullDistance(damped);

          const reached = damped >= PULL_THRESHOLD;
          setThresholdReached(reached);

          // Subtle haptic click on crossing threshold
          if (reached && !hasVibratedRef.current) {
            hasVibratedRef.current = true;
            try {
              if (navigator.vibrate) navigator.vibrate(12);
            } catch (_) {}
          } else if (!reached && hasVibratedRef.current) {
            hasVibratedRef.current = false;
          }

          // Prevent default only while active pull-to-refresh gesture is in progress
          if (originalEvent && originalEvent.cancelable) {
            originalEvent.preventDefault();
          }
        }
      } else {
        // Scrolling up
        if (isPullingRef.current) {
          setIsPulling(false);
          isPullingRef.current = false;
          setPullDistance(0);
          setThresholdReached(false);
        }
      }
    };

    const handleEnd = () => {
      if (!canPullRef.current && !isPullingRef.current) return;
      canPullRef.current = false;

      if (isPullingRef.current) {
        isPullingRef.current = false;
        setIsPulling(false);

        if (thresholdReached) {
          // Trigger refresh sequence
          setIsRefreshing(true);
          setPullDistance(56); // Hold at active spinner resting position

          // Gentle haptic feedback on release
          try {
            if (navigator.vibrate) navigator.vibrate(20);
          } catch (_) {}

          // Allow the spinner to rotate cleanly for 450ms, then reload page
          setTimeout(() => {
            window.location.reload();
          }, 450);
        } else {
          // Snap back smoothly
          setPullDistance(0);
          setThresholdReached(false);
        }
      }
    };

    // Touch event handlers
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientY, e.touches[0].clientX);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientY, e.touches[0].clientX, e);
      }
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    const onTouchCancel = () => {
      canPullRef.current = false;
      isPullingRef.current = false;
      setIsPulling(false);
      setPullDistance(0);
      setThresholdReached(false);
    };

    // Mouse event handlers for mobile simulator / responsive dev tools
    const onMouseDown = (e) => {
      if (window.innerWidth > 820) return;
      if (e.button !== 0) return;
      handleStart(e.clientY, e.clientX);
    };

    const onMouseMove = (e) => {
      if (!canPullRef.current && !isPullingRef.current) return;
      if (e.buttons !== 1) {
        if (isPullingRef.current) handleEnd();
        return;
      }
      handleMove(e.clientY, e.clientX, e);
    };

    const onMouseUp = () => {
      if (canPullRef.current || isPullingRef.current) {
        handleEnd();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchCancel, { passive: true });

    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchCancel);

      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isRefreshing, thresholdReached]);

  // Don't render anything if inactive and reset
  if (pullDistance === 0 && !isRefreshing) return null;

  // Calculate rotation angle (0 to 180 degrees as user pulls to threshold)
  const progressPercent = Math.min(1, pullDistance / PULL_THRESHOLD);
  const arrowRotation = thresholdReached ? 180 : Math.round(progressPercent * 180);
  const badgeTranslateY = Math.min(pullDistance, 75);
  const badgeOpacity = Math.min(1, (pullDistance / 24));

  return (
    <div
      className={`oak-ptr-container ${isRefreshing ? 'is-refreshing' : ''} ${thresholdReached ? 'is-threshold' : ''}`}
      style={{
        transform: `translate3d(-50%, ${badgeTranslateY}px, 0)`,
        opacity: isRefreshing ? 1 : badgeOpacity,
        transition: isPulling ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.25s ease'
      }}
      aria-hidden="true"
    >
      <div className="oak-ptr-badge">
        <div className="oak-ptr-icon-wrap">
          {isRefreshing ? (
            <RefreshCw size={17} className="oak-ptr-spinner-icon" />
          ) : (
            <ArrowDown
              size={17}
              className={`oak-ptr-arrow-icon ${thresholdReached ? 'flipped' : ''}`}
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            />
          )}
        </div>
        <span className="oak-ptr-label">
          {isRefreshing ? 'Refreshing...' : thresholdReached ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </div>
    </div>
  );
}
