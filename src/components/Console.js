"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CONSOLE_KEYS, CONSOLE_PALETTE } from "./ConsoleConfig";
import { getAudioEngine } from "@/utils/audio";
import ConsoleModal from "./ConsoleModal";

export default function Console({ displayName, profile, basics, repos, stats }) {
  // Summary Box Open / Closed State (starts closed by default)
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [justClosed, setJustClosed] = useState(false);

  // Mouse Parallax tracking for subtle 3D tilt (max 3-5 degrees)
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  // Terminal State (housed inside the opened lid)
  const defaultHeader = "> SYSTEM READY";
  const defaultTitle = `Hi, I'm ${displayName || "Moazzem Hossain"}.`;
  const defaultDesc = "Building intelligent AI models, agents & data systems.";

  const [termHeader, setTermHeader] = useState("> INITIALIZING SUMMARY BOX...");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDesc, setDisplayedDesc] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeKeyId, setActiveKeyId] = useState(null);
  const [pressedKeyId, setPressedKeyId] = useState(null);

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [switchType, setSwitchType] = useState("graphite"); // 'graphite' | 'clicky' | 'tactile' | 'linear'

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKeyData, setSelectedKeyData] = useState(null);

  // Timers and cancellation refs
  const typingTimerRef = useRef(null);
  const restoreTimerRef = useRef(null);
  const lastTargetRef = useRef(defaultTitle);

  // Audio helpers
  const playClick = useCallback(
    (isRelease = false) => {
      if (!soundEnabled) return;
      try {
        const engine = getAudioEngine();
        engine.setSwitchType(switchType);
        if (isRelease) {
          engine.playUp();
        } else {
          engine.playDown();
        }
      } catch {}
    },
    [soundEnabled, switchType]
  );

  const playLatchSound = useCallback(
    (open = true) => {
      if (!soundEnabled) return;
      try {
        const engine = getAudioEngine();
        engine.playLatch(open);
      } catch {}
    },
    [soundEnabled]
  );

  // Open Console Interaction (Spring rotation around rear hinge)
  const handleOpenConsole = () => {
    if (isConsoleOpen) return;
    setJustClosed(false);
    playLatchSound(true);
    setShowBurst(true);
    setIsConsoleOpen(true);
    setTimeout(() => {
      setShowBurst(false);
    }, 850);
  };

  // Close Console Interaction (Rotates lid back to closed Summary Box)
  const handleCloseConsole = (e) => {
    if (e) e.stopPropagation();
    if (!isConsoleOpen) return;
    playLatchSound(false);
    setIsConsoleOpen(false);
    setJustClosed(true);
    setTimeout(() => {
      setJustClosed(false);
    }, 650);
  };

  // Accessible keyboard toggle on closed lid
  const handleLidKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenConsole();
    }
  };

  // Mouse parallax handler for subtle physical tilt
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMouseTilt({ x: x * 2, y: y * 2 }); // -1 to 1 range
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Typewriter text animation on the Terminal Screen
  const typeText = useCallback((titleText, descText = null, headerText = "> SYSTEM READY") => {
    if (lastTargetRef.current === titleText) return;
    lastTargetRef.current = titleText;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    setTermHeader(headerText);
    if (descText !== null) {
      setDisplayedDesc(descText);
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayedTitle(titleText);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let index = 0;
    setDisplayedTitle("");

    const startTimeout = setTimeout(() => {
      typingTimerRef.current = setInterval(() => {
        index++;
        setDisplayedTitle(titleText.slice(0, index));
        if (index >= titleText.length) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
          setIsTyping(false);
        }
      }, 70);
    }, 200);

    return () => clearTimeout(startTimeout);
  }, []);

  // When console opens, initialize typewriter sequence on the terminal
  useEffect(() => {
    if (isConsoleOpen) {
      const openTimer = setTimeout(() => {
        typeText(defaultTitle, defaultDesc, defaultHeader);
      }, 450);
      return () => clearTimeout(openTimer);
    }
  }, [isConsoleOpen, defaultTitle, defaultDesc, typeText]);

  // Hover keycap: update terminal with destination
  const handleKeyHover = (key) => {
    if (!isConsoleOpen) return;
    setActiveKeyId(key.id);
    if (restoreTimerRef.current) {
      clearTimeout(restoreTimerRef.current);
      restoreTimerRef.current = null;
    }
    const hoverHeader = `> TARGET: [${key.char}] ${key.sublabel}`;
    typeText(key.terminalHoverText, key.tagline, hoverHeader);
  };

  // Leave keycap hover: restore default welcome
  const handleKeyLeave = () => {
    if (!isConsoleOpen) return;
    setActiveKeyId(null);
    if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current);
    restoreTimerRef.current = setTimeout(() => {
      if (!modalOpen) {
        typeText(defaultTitle, defaultDesc, defaultHeader);
      }
    }, 400);
  };

  // Click keycap: press down, sound, open portfolio section modal
  const handleKeyClick = (key) => {
    if (!isConsoleOpen) return;
    setPressedKeyId(key.id);
    playClick(false);

    setTimeout(() => {
      playClick(true);
      setPressedKeyId(null);
    }, 130);

    setSelectedKeyData(key);
    setModalOpen(true);
  };

  // Physical keyboard listeners (Escape closes console, key letters trigger shortcuts)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Escape") {
        if (modalOpen) {
          setModalOpen(false);
        } else if (isConsoleOpen) {
          handleCloseConsole();
        }
        return;
      }

      if (!isConsoleOpen) {
        if (e.key === "Enter" || e.key === " ") {
          handleOpenConsole();
        }
        return;
      }

      const keyChar = e.key.toLowerCase();
      const matchedKey = CONSOLE_KEYS.find((k) => {
        if (k.shortcut === "Enter" && e.key === "Enter") return true;
        if (k.shortcut === " " && e.key === " ") return true;
        return k.shortcut === keyChar;
      });

      if (matchedKey) {
        setPressedKeyId(matchedKey.id);
        setActiveKeyId(matchedKey.id);
        playClick(false);
        typeText(
          matchedKey.terminalHoverText,
          matchedKey.tagline,
          `> SHORTCUT TRIGGERED: [${matchedKey.char}]`
        );

        setTimeout(() => {
          playClick(true);
          setPressedKeyId(null);
        }, 130);

        setSelectedKeyData(matchedKey);
        setModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isConsoleOpen, modalOpen, playClick, typeText]);

  // Switch sound profile cycle
  const cycleSwitch = (e) => {
    if (e) e.stopPropagation();
    const types = ["graphite", "clicky", "tactile", "linear"];
    const nextIdx = (types.indexOf(switchType) + 1) % types.length;
    const nextType = types[nextIdx];
    setSwitchType(nextType);
    const engine = getAudioEngine();
    engine.setSwitchType(nextType);
    playClick(false);
  };

  // Keycap groups
  const topRowKeys = CONSOLE_KEYS.slice(0, 5); // P, O, R, T, F
  const bottomRowKeys = CONSOLE_KEYS.slice(5); // O, L, I, O, ★, LET'S TALK ↵

  // Render individual 3D comic mechanical keycap
  const renderKeycap = (k) => {
    const isHovered = activeKeyId === k.id;
    const isPressed = pressedKeyId === k.id;

    return (
      <button
        key={k.id}
        id={`keycap-${k.id}`}
        type="button"
        className={`comic-keycap ${k.isWide ? "key-wide" : ""} accent-${k.accentType} ${
          isHovered ? "is-hovered" : ""
        } ${isPressed ? "is-pressed" : ""}`}
        style={{
          "--key-color": k.color,
          "--key-base": k.baseColor,
          "--key-ink": k.textColor,
          "--stagger-idx": k.staggerIndex,
        }}
        onMouseEnter={() => handleKeyHover(k)}
        onMouseLeave={handleKeyLeave}
        onFocus={() => handleKeyHover(k)}
        onBlur={handleKeyLeave}
        onClick={() => handleKeyClick(k)}
        aria-label={`${k.char} - ${k.title}`}
      >
        {/* Switch Well Collar / Base */}
        <span className="keycap-base-ring" aria-hidden="true" />

        {/* 3D Chunky Keycap Body with visible sidewalls */}
        <span className="keycap-chunky-body">
          {/* Front Sidewall with dense manga sketch cross-hatching */}
          <span className="keycap-sidewall-front" aria-hidden="true" />
          <span className="keycap-sidewall-left" aria-hidden="true" />
          <span className="keycap-sidewall-right" aria-hidden="true" />

          {/* Top Face Dish */}
          <span className="keycap-top-dish">
            {/* Spacebar 3 Marker Dashes (Yellow, Blue, Red - from reference photo!) */}
            {k.isSpacebar && (
              <span className="spacebar-marker-dashes" aria-hidden="true">
                <span className="marker-dash dash-yellow" />
                <span className="marker-dash dash-blue" />
                <span className="marker-dash dash-red" />
              </span>
            )}

            <span className="keycap-glyph">{k.char}</span>
            {k.sublabel && <span className="keycap-subtext">{k.sublabel}</span>}

            {/* Spacebar Speed Lines (from reference photo!) */}
            {k.isSpacebar && <span className="spacebar-speedlines" aria-hidden="true" />}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div
      className="summary-box-stage"
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Onomatopoeia Comic Burst (*CLACK!*) on opening */}
      {showBurst && (
        <div className="comic-action-burst" aria-hidden="true">
          <div className="burst-star-shape"></div>
          <span className="burst-action-text">*CLACK!*</span>
        </div>
      )}

      {/* Prominent Floating Close Button when Summary Box is OPEN */}
      {isConsoleOpen && (
        <button
          type="button"
          className="box-close-floating-btn"
          onClick={handleCloseConsole}
          aria-label="Close the Summary Box"
          title="Click to shut the Summary Box"
        >
          <span className="close-btn-icon">✕</span>
          <span className="close-btn-text">CLOSE THE BOX</span>
        </button>
      )}

      {/* 3D Physical Summary Box Console Assembly */}
      <div
        className={`summary-box-3d ${isConsoleOpen ? "is-open" : "is-closed"}`}
        style={{
          "--mouse-x": mouseTilt.x,
          "--mouse-y": mouseTilt.y,
        }}
      >
        {/* Contact Shadow beneath the box */}
        <div className="summary-box-contact-shadow" aria-hidden="true" />

        {/* Rear Hinge Structure connecting Lid to Tray */}
        <div className="summary-box-hinges" aria-hidden="true">
          <div className="hinge-barrel hinge-left" />
          <div className="hinge-barrel hinge-center" />
          <div className="hinge-barrel hinge-right" />
        </div>

        {/* ===================================================================
            THE 3D HINGED LID
            - When CLOSED: covers the tray, shows Summary Box exterior with clasp
            - When OPENED: rotates -108deg upward around rear hinge,
              displaying the comic Terminal Screen inside the lid facing the user!
           =================================================================== */}
        <div
          className={`summary-box-lid ${isConsoleOpen ? "lid-open" : "lid-closed"} ${
            justClosed ? "lid-just-closed" : ""
          }`}
          onClick={!isConsoleOpen ? handleOpenConsole : undefined}
          role={!isConsoleOpen ? "button" : undefined}
          tabIndex={!isConsoleOpen ? 0 : -1}
          onKeyDown={!isConsoleOpen ? handleLidKeyDown : undefined}
          aria-label={
            !isConsoleOpen
              ? "The 3D Summary Box is closed. Click or press Enter to open."
              : undefined
          }
        >
          {/* --- LID EXTERIOR FACE (Visible when closed) --- */}
          <div className="lid-face-exterior">
            <div className="lid-exterior-surface">
              {/* Corner Inked Screw Rivets */}
              <div className="lid-rivet rivet-tl" aria-hidden="true">＋</div>
              <div className="lid-rivet rivet-tr" aria-hidden="true">＋</div>
              <div className="lid-rivet rivet-bl" aria-hidden="true">＋</div>
              <div className="lid-rivet rivet-br" aria-hidden="true">＋</div>

              {/* Top Tape Sticker */}
              <div className="lid-top-tape">
                <span className="tape-yellow-tag">
                  /// THE SUMMARY BOX • INTERACTIVE ARCHIVE ///
                </span>
                <span className="tape-status-badge">🔒 CLOSED // STANDBY</span>
              </div>

              {/* Center Tactile Clasp & Open Button */}
              <div className="lid-center-clasp">
                <div className="clasp-metal-housing">
                  <div className="clasp-lines" />
                  <button
                    type="button"
                    className="clasp-power-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenConsole();
                    }}
                    aria-label="Click to open the Summary Box to discover featured projects and interactive highlights"
                  >
                    <span className="clasp-pulse-ring" aria-hidden="true" />
                    <span className="clasp-btn-icon">⚡</span>
                    <div className="clasp-btn-info">
                      <span className="clasp-btn-title">CLICK TO OPEN THE BOX</span>
                      <span className="clasp-btn-sub">
                        EXPLORE SELECTED WORK &amp; INTERACTIVE CONSOLE ➜
                      </span>
                    </div>
                    <span className="clasp-btn-arrow">➜</span>
                  </button>
                </div>

                {/* Sticky Note Callout with Caveat font */}
                <div className="lid-sticky-callout">
                  <span className="note-pin" aria-hidden="true">📌</span>
                  <p className="note-handwriting">
                    &ldquo;Step inside the Summary Box! Discover my curated portfolio, AI research models, live tools &amp; interactive mechanical terminal.&rdquo;
                  </p>
                  <span className="note-action-tag">✦ CLICK OR TAP TO OPEN THE BOX ✦</span>
                </div>
              </div>

              {/* Bottom Seam Lip & Model Branding */}
              <div className="lid-bottom-seam">
                <span className="seam-spec">MODEL MP-75 • SUMMARY BOX CHASSIS</span>
                <span className="seam-stat">50+ MODELS &amp; REPOSITORIES VERIFIED</span>
              </div>
            </div>
          </div>

          {/* --- LID INTERIOR FACE (Visible when opened) --- */}
          {/* Houses the Comic Terminal Screen directly inside the opened lid! */}
          <div className="lid-face-interior">
            <div className="lid-interior-bezel">
              {/* Comic Corner Screws */}
              <div className="bezel-screw screw-tl" aria-hidden="true">＋</div>
              <div className="bezel-screw screw-tr" aria-hidden="true">＋</div>
              <div className="bezel-screw screw-bl" aria-hidden="true">＋</div>
              <div className="bezel-screw screw-br" aria-hidden="true">＋</div>

              {/* Terminal Screen Inside Lid (Courier New / monospace) */}
              <div className="lid-terminal-screen">
                {/* Screen Header Line */}
                <div className="term-header-line">
                  <span className="term-sys-tag">
                    [ 📓 THE SUMMARY BOX // V2.4 ]
                  </span>
                  <div className="term-header-right">
                    <span className="term-pill-status">
                      STATUS: [{isTyping ? "TYPING" : "READY"}]
                    </span>
                    <span className="term-pill-audio">
                      SWITCH: [{soundEnabled ? switchType.toUpperCase() : "MUTED"}]
                    </span>
                    {/* Header Quick Close Button */}
                    <button
                      type="button"
                      className="term-chip-btn close-header-btn"
                      onClick={handleCloseConsole}
                      title="Close the Summary Box"
                    >
                      ✕ CLOSE
                    </button>
                  </div>
                </div>

                {/* Screen Main Display */}
                <div className="term-screen-body">
                  <div className="term-command-line">
                    <span className="prompt-prefix">root@summary-box:~$</span>
                    <span className="prompt-cmd">{termHeader}</span>
                  </div>
                  <h2 className="term-main-title">
                    {displayedTitle}
                    <span className="term-caret-cursor" aria-hidden="true">▍</span>
                  </h2>
                  <p className="term-main-desc">
                    {displayedDesc}
                  </p>
                </div>

                {/* Screen Footer Line & Quick Controls */}
                <div className="term-footer-line">
                  <span className="term-action-hint">
                    [HOVER KEYCAP TO INSPECT // CLICK TO OPEN SECTION]
                  </span>
                  <div className="term-controls-group">
                    <button
                      type="button"
                      className="term-chip-btn"
                      onClick={cycleSwitch}
                      title="Cycle Switch Sound Profile"
                    >
                      ⚙ {switchType}
                    </button>
                    <button
                      type="button"
                      className="term-chip-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSoundEnabled(!soundEnabled);
                      }}
                      title="Toggle Audio Feedback"
                    >
                      {soundEnabled ? "🔊 ON" : "🔇 OFF"}
                    </button>
                    {/* Physical Close Control in Footer */}
                    <button
                      type="button"
                      className="term-chip-btn close-btn"
                      onClick={handleCloseConsole}
                      title="Close the Summary Box"
                    >
                      🔒 CLOSE BOX
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            THE BOTTOM BASE TRAY (Houses the 3D Mechanical Keyboard)
           =================================================================== */}
        <div className="summary-box-tray">
          <div className="tray-physical-walls">
            {/* Recessed Keyboard Bed with Manga Cross-Hatch Shading */}
            <div className="tray-keyboard-bed">
              {/* Keyboard Switch Plate */}
              <div className="tray-switch-plate">
                {/* Top Row: ESC/CLOSE Keycap + P - O - R - T - F */}
                <div className="key-row key-row-top">
                  {/* Physical ESC / Close Keycap on the Keyboard */}
                  <button
                    type="button"
                    className="comic-keycap key-esc-close accent-red"
                    onClick={handleCloseConsole}
                    title="Press ESC to close the Summary Box"
                    aria-label="Close the Summary Box"
                    style={{
                      "--key-color": CONSOLE_PALETTE.comicRed,
                      "--key-base": "#8f1e1e",
                      "--key-ink": "#FFFFFF",
                      "--stagger-idx": 0,
                    }}
                  >
                    <span className="keycap-base-ring" aria-hidden="true" />
                    <span className="keycap-chunky-body">
                      <span className="keycap-sidewall-front" aria-hidden="true" />
                      <span className="keycap-sidewall-left" aria-hidden="true" />
                      <span className="keycap-sidewall-right" aria-hidden="true" />
                      <span className="keycap-top-dish">
                        <span className="keycap-glyph">ESC</span>
                        <span className="keycap-subtext">CLOSE ✕</span>
                      </span>
                    </span>
                  </button>

                  {topRowKeys.map((k) => renderKeycap(k))}
                </div>

                {/* Bottom Row: O - L - I - O - ★ - LET'S TALK ↵ */}
                <div className="key-row key-row-bottom">
                  {bottomRowKeys.map((k) => renderKeycap(k))}
                </div>
              </div>

              {/* Bottom Inked Skirt with Core Stats */}
              <div className="tray-bottom-skirt">
                <span className="skirt-text">✦ 100% GRAPHITE MECHANICAL CORE</span>
                <span className="skirt-serial">SN #2026-BD • THE SUMMARY BOX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Portfolio Section Modal View */}
      <ConsoleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        modalData={selectedKeyData}
        basics={basics}
        profile={profile}
        repos={repos}
      />
    </div>
  );
}
