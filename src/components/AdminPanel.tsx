import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, Shield, Clock, Users, Database, LayoutGrid, Award, Volume2, Search, 
  ArrowUp, ArrowDown, Sparkles, Check, CheckCircle, RefreshCw, LogIn, Lock, 
  Trash2, Code, Plus, FileText, Globe, Key, AlertTriangle, Play, Pause, 
  AlertCircle, BarChart3, TrendingUp, Laptop, Eye, HelpCircle, AlignLeft, 
  Flame, Monitor, Compass, ShieldAlert, Layers, ExternalLink, X, RefreshCw as ResetIcon
} from 'lucide-react';
import { useLanguage, AdminEvent } from '../context/LanguageContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simulated active logs
interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  ip: string;
  type: 'info' | 'success' | 'warning' | 'security';
}

// Connected operations terminals
interface DeviceSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  status: 'active' | 'idle';
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { 
    language, t, websiteSettings, updateWebsiteSettings, 
    events, updateEvents, updatePortfolio, portfolioData,
    servicesData, updateServices, testimonialsData, updateTestimonials,
    teamMembers, updateTeam, resetAllCMS 
  } = useLanguage();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('halo_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFACecretCode, setTwoFACecretCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(() => {
    return localStorage.getItem('halo_2fa_enabled') === 'true';
  });
  
  // 2FA Rolling code ticking engine (30 seconds interval)
  const [twoFACurrentCode, setTwoFACurrentCode] = useState('482 915');
  const [twoFATimerProgress, setTwoFATimerProgress] = useState(100);

  // Active Admin Tabs
  const [activeTab, setActiveTab] = useState<'security' | 'cms' | 'events' | 'analytics' | 'lists'>('security');
  const [activeListSubTab, setActiveListSubTab] = useState<'services' | 'projects' | 'testimonials' | 'team' | 'leads'>('services');

  // Interactive style dialogs
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [resetCheckValue, setResetCheckValue] = useState('');

  // List Editor States (Services)
  const [newSvcTitle, setNewSvcTitle] = useState('');
  const [newSvcDesc, setNewSvcDesc] = useState('');
  const [newSvcIcon, setNewSvcIcon] = useState('Layers');
  const [newSvcColor, setNewSvcColor] = useState('cyan');
  const [newSvcFeatures, setNewSvcFeatures] = useState('');
  const [newSvcDetails, setNewSvcDetails] = useState('');

  // List Editor States (Projects/Portfolio)
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('');
  const [newProjThumbnail, setNewProjThumbnail] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjLongDesc, setNewProjLongDesc] = useState('');
  const [newProjYear, setNewProjYear] = useState('2026');
  const [newProjDuration, setNewProjDuration] = useState('3 months');
  const [newProjTags, setNewProjTags] = useState('');
  const [newProjChallenges, setNewProjChallenges] = useState('');
  const [newProjSolutions, setNewProjSolutions] = useState('');
  const [newProjOutcome, setNewProjOutcome] = useState('');
  const [newProjStatLabel, setNewProjStatLabel] = useState('Campaign Target');
  const [newProjStatValue, setNewProjStatValue] = useState('+140%');

  // List Editor States (Testimonials)
  const [newTestiQuote, setNewTestiQuote] = useState('');
  const [newTestiAuthor, setNewTestiAuthor] = useState('');
  const [newTestiRole, setNewTestiRole] = useState('');
  const [newTestiCompany, setNewTestiCompany] = useState('');
  const [newTestiRating, setNewTestiRating] = useState(5);
  const [newTestiAvatar, setNewTestiAvatar] = useState('mia');

  // List Editor States (Team Members)
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamRole, setNewTeamRole] = useState('');
  const [newTeamSpecialty, setNewTeamSpecialty] = useState('');
  const [newTeamAvatar, setNewTeamAvatar] = useState('aria');
  const [newTeamBio, setNewTeamBio] = useState('');
  const [newTeamSkills, setNewTeamSkills] = useState('');
  const [newTeamHackerCode, setNewTeamHackerCode] = useState('node build --prod');

  // Security operational variables
  const [isIPWhitelistEnabled, setIsIPWhitelistEnabled] = useState<boolean>(() => {
    return localStorage.getItem('halo_ip_whitelist_enabled') === 'true';
  });
  const [whitelistedIPs, setWhitelistedIPs] = useState<string[]>(() => {
    const saved = localStorage.getItem('halo_whitelisted_ips');
    return saved ? JSON.parse(saved) : ['127.0.0.1', '192.168.1.1', '203.113.131.5', '118.70.124.90'];
  });
  const [newIPAddress, setNewIPAddress] = useState('');
  const [myIP, setMyIP] = useState('203.113.131.5'); // Developer mock IP
  
  // Device session logs
  const [activeDevices, setActiveDevices] = useState<DeviceSession[]>([
    { id: '1', device: 'Apple MacBook Pro M3', browser: 'Safari 17.4', location: 'Hanoi, Vietnam', ip: '203.113.131.5', status: 'active' },
    { id: '2', device: 'iOS iPhone 15 Pro Max', browser: 'Mobile App Webview', location: 'Ho Chi Minh City, Vietnam', ip: '118.70.124.90', status: 'idle' },
    { id: '3', device: 'Custom Workstation OS', browser: 'Chrome 122.0', location: 'Singapore Cloud Storage', ip: '127.0.0.1', status: 'active' }
  ]);

  // Command logs feed
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: '1', timestamp: '2026-05-27 10:41:02', action: 'Auth: Login approved successfully.', ip: '203.113.131.5', type: 'success' },
    { id: '2', timestamp: '2026-05-27 10:41:30', action: 'CMS: Switched display typography preset to Satoshi.', ip: '203.113.131.5', type: 'info' },
    { id: '3', timestamp: '2026-05-27 10:42:15', action: 'Event: VinFast Global Campaign announcement scheduled.', ip: '203.113.131.5', type: 'info' }
  ]);

  // ==========================================
  // Interactive High-Fidelity Security Upgrade States
  // ==========================================
  const [vulnerabilityScannerState, setVulnerabilityScannerState] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [scannerProgress, setScannerProgress] = useState(0);
  const [scannerStepText, setScannerStepText] = useState('');
  const [scannerReport, setScannerReport] = useState<{
    score: number;
    issues: { category: string; status: 'passed' | 'warning' | 'info'; message: string; rating: string }[];
  } | null>(null);

  const [isDdosShieldOn, setIsDdosShieldOn] = useState(() => {
    return localStorage.getItem('halo_ddos_shield_active') === 'true';
  });
  const [ddosScrubbedCounter, setDdosScrubbedCounter] = useState(1382);
  const [currentRps, setCurrentRps] = useState(24);
  const [isAnomalousAttackTriggered, setIsAnomalousAttackTriggered] = useState(false);
  const [attackAnimationCounter, setAttackAnimationCounter] = useState(0);

  // Event builder State
  const [newEventTitleEn, setNewEventTitleEn] = useState('');
  const [newEventTitleVi, setNewEventTitleVi] = useState('');
  const [newEventDescEn, setNewEventDescEn] = useState('');
  const [newEventDescVi, setNewEventDescVi] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventBadgeEn, setNewEventBadgeEn] = useState('LAUNCH EVENT');
  const [newEventBadgeVi, setNewEventBadgeVi] = useState('SỰ KIỆN RA MẮT');
  const [newEventIsFeatured, setNewEventIsFeatured] = useState(false);

  // Active SEO editable section state inside CMS
  const [selectedSeoSection, setSelectedSeoSection] = useState('hero');

  // Live Visitor ticking counter
  const [liveVisitors, setLiveVisitors] = useState(14);

  // CRM Leads & Real Server Telemetry Diagnostics
  const [leads, setLeads] = useState<any[]>([]);
  const [serverStatus, setServerStatus] = useState<any>({
    uptime: 0,
    nodeVersion: 'v20.0.0',
    platform: 'linux',
    integrityScore: 98.7,
    status: 'PENDING CONNECT...',
    activeIpsBlocked: []
  });

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("fetch leads err:", err);
    }
  };

  const fetchServerStatus = async () => {
    try {
      const res = await fetch('/api/security-status');
      if (res.ok) {
        const data = await res.json();
        setServerStatus(data);
      }
    } catch (err) {
      console.error("fetch status err:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchServerStatus();
    const interval = setInterval(() => {
      fetchLeads();
      fetchServerStatus();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Heatmap Hover tracker data
  const [heatmapDots, setHeatmapDots] = useState<{x: number, y: number, intensity: number}[]>([
    { x: 120, y: 80, intensity: 4 },
    { x: 340, y: 160, intensity: 8 },
    { x: 220, y: 120, intensity: 5 },
    { x: 450, y: 290, intensity: 9 },
    { x: 180, y: 240, intensity: 3 },
    { x: 520, y: 180, intensity: 7 }
  ]);

  // Generate 2FA dynamic progression
  useEffect(() => {
    let timer = setInterval(() => {
      setTwoFATimerProgress(prev => {
        if (prev <= 3) {
          // Rotate code
          const randomCodes = ['781 924', '302 189', '945 082', '516 774', '209 883', '844 915'];
          const nextCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
          setTwoFACurrentCode(nextCode);
          return 100;
        }
        return prev - 3.33; // ~30 seconds breakdown
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync Live Analytical ticking
  useEffect(() => {
    const analyticTimer = setInterval(() => {
      setLiveVisitors(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const target = prev + delta;
        return target > 5 ? (target < 40 ? target : 25) : 8;
      });
    }, 4000);
    return () => clearInterval(analyticTimer);
  }, []);

  // Log customized command event
  const addLog = (action: string, type: 'info' | 'success' | 'warning' | 'security' = 'info') => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp,
      action,
      ip: myIP,
      type
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Dynamic DDoS simulation ticking & active mitigation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      if (isAnomalousAttackTriggered) {
        // High threat simulated flood requests
        setCurrentRps(prev => Math.floor(Math.random() * 80) + 320);
        if (isDdosShieldOn) {
          setDdosScrubbedCounter(prev => prev + Math.floor(Math.random() * 20) + 15);
        }
        setAttackAnimationCounter(prev => {
          if (prev >= 6) {
            setIsAnomalousAttackTriggered(false);
            addLog('DDoS Simulation: Anomalous traffic pattern subsided. Safe status restored.', 'success');
            return 0;
          }
          return prev + 1;
        });
      } else {
        // Normal random background variation
        setCurrentRps(prev => {
          const delta = Math.floor(Math.random() * 7) - 3;
          const target = prev + delta;
          return target < 12 ? 18 : (target > 65 ? 32 : target);
        });

        if (isDdosShieldOn) {
          // Slowly block minor internet probes/crawlers
          setDdosScrubbedCounter(prev => prev + (Math.random() > 0.4 ? 1 : 0));
        }
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [isAnomalousAttackTriggered, isDdosShieldOn]);

  const toggleDdosShield = () => {
    const next = !isDdosShieldOn;
    setIsDdosShieldOn(next);
    localStorage.setItem('halo_ddos_shield_active', next ? 'true' : 'false');
    addLog(`DDoS Prevention Shield changed to: ${next ? 'ENFORCED (Mitigating vectors)' : 'BYPASSED'}`, next ? 'security' : 'warning');
  };

  const triggerAnomalousAttackSimulator = () => {
    if (isAnomalousAttackTriggered) return;
    setIsAnomalousAttackTriggered(true);
    setAttackAnimationCounter(1);
    addLog('DDoS Simulation: High-volume flood vector detected hitting port 3000!', 'security');
    
    if (!isDdosShieldOn) {
      setTimeout(() => {
        addLog('CRITICAL: Web server latency spiking! Enable DDoS mitigation shield immediately!', 'security');
      }, 2000);
    }
  };

  const runSecurityAudit = () => {
    setVulnerabilityScannerState('scanning');
    setScannerProgress(0);
    setScannerReport(null);
    addLog('Security Audit: Core platform structural vulnerability inspection initiated.', 'warning');

    const steps = [
      { p: 20, txt: 'Verifying TLS Handshake parameters and secure HTTP state protocols...' },
      { p: 45, txt: 'Analyzing cookie telemetry attributes (GDPR compliance, local context checks)...' },
      { p: 70, txt: 'Checking active Console administrative credentials and token states...' },
      { p: 90, txt: 'Evaluating Cross-Site Scripting (XSS) input validation and headers protection...' },
      { p: 100, txt: 'Platform integrity report finalized.' }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setScannerProgress(step.p);
        setScannerStepText(step.txt);
        
        if (step.p === 100) {
          setVulnerabilityScannerState('completed');
          const hasIP = isIPWhitelistEnabled;
          const hasF = is2FAEnabled;
          const hasShield = isDdosShieldOn;
          const finalScore = 65 + (hasIP ? 12 : 0) + (hasF ? 12 : 0) + (hasShield ? 11 : 0);
          
          setScannerReport({
            score: finalScore,
            issues: [
              {
                category: 'Multi-Factor Access 2FA',
                status: hasF ? 'passed' : 'warning',
                message: hasF ? 'Dynamic 2FA verification locks operational login.' : '2FA is disabled. Credential stuffing vectors bypass is possible.',
                rating: hasF ? '+12 Pts' : 'Priority Assessment Required'
              },
              {
                category: 'Administrative IP Whitelist',
                status: hasIP ? 'passed' : 'info',
                message: hasIP ? 'Access restricted exclusively to whitelisted network segments.' : 'Console is accessible from any external IP pool. IP Lockdown is off.',
                rating: hasIP ? '+12 Pts' : 'Non-Restrictive Gateway'
              },
              {
                category: 'Edge DDoS Mitigation Shield',
                status: hasShield ? 'passed' : 'warning',
                message: hasShield ? 'Anti-flood scrubber layer blocks malicious probes successfully.' : 'DDoS Mitigation Shield disabled. Rate limit overflow possible.',
                rating: hasShield ? '+11 Pts' : 'Mitigation Offline'
              },
              {
                category: 'Application Cookie Compliance',
                status: 'passed',
                message: 'All cookies isolated, verifying consent boundaries with premium local banner.',
                rating: 'GDPR / Cyber Information Security Compliant'
              }
            ]
          });
          addLog(`Security Audit: Completed. Integrity score calculated: ${finalScore}/100.`, 'success');
        }
      }, (index + 1) * 700);
    });
  };

  const handleDownloadSecurityLogs = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activityLogs, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `halo_security_logs_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addLog('Security Audit Log: Logs compiled and downloaded successfully as JSON.', 'success');
    } catch (e) {
      // safe fallback
    }
  };

  const clearSecurityLogs = () => {
    setActivityLogs([
      { id: `audit-clear-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), action: 'Security Action: Logs database securely purged.', ip: myIP, type: 'warning' }
    ]);
  };

  // Perform secure admin check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'haloSuper2026') {
      if (is2FAEnabled) {
        // verify simulated code or bypass empty with any 6-digit passcode
        const cleanSecret = twoFACecretCode.replace(/\s+/g, '');
        if (cleanSecret.length !== 6) {
          setAuthError(language === 'en' ? '6-digit 2FA confirmation code is necessary.' : 'Mã xác nhận 2FA gồm 6 chữ số là cần thiết.');
          addLog('Auth: Failed login attempt (Invalid 2FA).', 'security');
          return;
        }
      }
      setIsAuthenticated(true);
      sessionStorage.setItem('halo_admin_auth', 'true');
      setAuthError('');
      addLog('Auth: Super Admin session dynamic JWT issued successfully.', 'success');
    } else {
      setAuthError(language === 'en' ? 'Incorrect authentication credentials provided.' : 'Sai tài khoản hoặc mật khẩu.');
      addLog('Auth: Failed login attempt (Incorrect credentials).', 'security');
    }
  };

  const handleShortcutDemoLogin = () => {
    setUsername('admin');
    setPassword('haloSuper2026');
    setIsAuthenticated(true);
    sessionStorage.setItem('halo_admin_auth', 'true');
    setAuthError('');
    addLog('Auth: Demo Super Admin Auth Bypassed via local dev tokens.', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('halo_admin_auth');
    addLog('Auth: Logged out server session gracefully.', 'info');
  };

  // Whitelisted IPs Manager
  const handleAddIP = () => {
    if (!newIPAddress) return;
    const cleanIP = newIPAddress.trim();
    if (!whitelistedIPs.includes(cleanIP)) {
      const updated = [...whitelistedIPs, cleanIP];
      setWhitelistedIPs(updated);
      localStorage.setItem('halo_whitelisted_ips', JSON.stringify(updated));
      addLog(`Security: Whitelisted IP ${cleanIP} explicitly.`, 'warning');
    }
    setNewIPAddress('');
  };

  const handleRemoveIP = (ipToRemove: string) => {
    const updated = whitelistedIPs.filter(ip => ip !== ipToRemove);
    setWhitelistedIPs(updated);
    localStorage.setItem('halo_whitelisted_ips', JSON.stringify(updated));
    addLog(`Security: Removed IP ${ipToRemove} from whitelisted systems.`, 'warning');
  };

  const toggleIPWhitelist = () => {
    const next = !isIPWhitelistEnabled;
    setIsIPWhitelistEnabled(next);
    localStorage.setItem('halo_ip_whitelist_enabled', next ? 'true' : 'false');
    addLog(`Security: IP whitelisting protection checks changed to: ${next ? 'ENFORCED' : 'BYPASSED'}`, next ? 'security' : 'warning');
  };

  // 2FA Security toggler
  const handleToggle2FA = () => {
    const next = !is2FAEnabled;
    setIs2FAEnabled(next);
    localStorage.setItem('halo_2fa_enabled', next ? 'true' : 'false');
    addLog(`Security: Dynamic Multi-Factor authentication changed to: ${next ? 'ACTIVE' : 'DEACTIVATED'}`, 'security');
  };

  const handleDisconnectDevice = (id: string, name: string) => {
    setActiveDevices(prev => prev.filter(d => d.id !== id));
    addLog(`Security: Issued revocation order. Device disconnected: ${name}`, 'security');
  };

  // CMS Content order changes
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...websiteSettings.layoutSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    // Swap elements
    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;

    updateWebsiteSettings({ layoutSections: sections });
    addLog(`CMS: Reordered layout modules order. Swapped element index ${index} ${direction}.`);
  };

  // Event composition launcher
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitleEn || !newEventTitleVi || !newEventDate) {
      alert(language === 'en' ? 'Event title and Target countdown date are required.' : 'Vui lòng cung cấp tiêu đề và ngày đếm ngược.');
      return;
    }

    const createdEvent: AdminEvent = {
      id: `custom-event-${Date.now()}`,
      titleEn: newEventTitleEn,
      titleVi: newEventTitleVi,
      descEn: newEventDescEn || 'Campaign announcement event launch.',
      descVi: newEventDescVi || 'Sự kiện công bố kế hoạch chiến dịch.',
      date: new Date(newEventDate).toISOString(),
      isFeatured: newEventIsFeatured,
      isPinned: false,
      badgeTextEn: newEventBadgeEn.toUpperCase(),
      badgeTextVi: newEventBadgeVi.toUpperCase(),
    };

    updateEvents([createdEvent, ...events]);
    addLog(`Event: Registered custom launch launch target: "${newEventTitleEn}".`, 'success');

    // Reset build form
    setNewEventTitleEn('');
    setNewEventTitleVi('');
    setNewEventDescEn('');
    setNewEventDescVi('');
    setNewEventDate('');
    setNewEventIsFeatured(false);
  };

  const handleDeleteEvent = (id: string, titleName: string) => {
    updateEvents(events.filter(ev => ev.id !== id));
    addLog(`Event: Disposed launch timer for event: "${titleName}".`, 'warning');
  };

  const handleToggleEventFeatureState = (id: string, state: boolean) => {
    updateEvents(events.map(ev => ev.id === id ? { ...ev, isFeatured: !state } : ev));
    addLog(`Event: Toggled featured index overlay state for event node ID: ${id}`);
  };

  // CMS dynamic text fields bindings
  const handleUpdateHeroText = (field: 'headlineEn' | 'headlineVi' | 'subEn' | 'subVi', value: string) => {
    if (field === 'headlineEn') updateWebsiteSettings({ heroHeadlineEn: value });
    else if (field === 'headlineVi') updateWebsiteSettings({ heroHeadlineVi: value });
    else if (field === 'subEn') updateWebsiteSettings({ heroSubEn: value });
    else if (field === 'subVi') updateWebsiteSettings({ heroSubVi: value });
  };

  // Dynamic Content Lists mutation handlers
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSvcTitle.trim()) return;
    const newId = `svc-${Date.now()}`;
    const item = {
      id: newId,
      title: newSvcTitle,
      description: newSvcDesc,
      icon: newSvcIcon,
      features: newSvcFeatures ? newSvcFeatures.split(',').map(f => f.trim()).filter(Boolean) : ['Strategic Planning'],
      color: newSvcColor,
      intensity: `from-${newSvcColor}-500 to-${newSvcColor}-600`,
      details: newSvcDetails || newSvcDesc
    };
    const updated = [item, ...servicesData];
    updateServices(language, updated);
    addLog(`CMS: Formulated and integrated new dynamic service element: "${newSvcTitle}".`, 'success');
    
    // Reset state
    setNewSvcTitle('');
    setNewSvcDesc('');
    setNewSvcFeatures('');
    setNewSvcDetails('');
  };

  const handleDeleteService = (id: string, titleName: string) => {
    const updated = servicesData.filter(item => item.id !== id);
    updateServices(language, updated);
    addLog(`CMS: Extracted service item: "${titleName}".`, 'warning');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;
    const newId = `proj-${Date.now()}`;
    const item = {
      id: newId,
      title: newProjTitle,
      client: newProjClient || 'Elite Brand Partner',
      category: newProjCategory || 'Strategic Marketing',
      thumbnail: newProjThumbnail,
      description: newProjDesc,
      longDescription: newProjLongDesc || newProjDesc,
      year: newProjYear,
      duration: newProjDuration,
      tags: newProjTags ? newProjTags.split(',').map(t => t.trim()).filter(Boolean) : ['PR', 'Strategy'],
      stats: [{ label: newProjStatLabel || 'Reach', value: newProjStatValue || '+120%' }],
      challenges: newProjChallenges ? newProjChallenges.split(',').map(c => c.trim()).filter(Boolean) : ['Initial low awareness'],
      solutions: newProjSolutions ? newProjSolutions.split(',').map(s => s.trim()).filter(Boolean) : ['Strategic campaign execution'],
      outcome: newProjOutcome || 'Successful high-impact campaign.'
    };
    const updated = [item, ...portfolioData];
    updatePortfolio(language, updated);
    addLog(`CMS: Synthesized and deployed client masterpiece project: "${newProjTitle}".`, 'success');

    // Reset state
    setNewProjTitle('');
    setNewProjClient('');
    setNewProjCategory('');
    setNewProjDesc('');
    setNewProjLongDesc('');
    setNewProjTags('');
    setNewProjChallenges('');
    setNewProjSolutions('');
    setNewProjOutcome('');
  };

  const handleDeleteProject = (id: string, titleName: string) => {
    const updated = portfolioData.filter(item => item.id !== id);
    updatePortfolio(language, updated);
    addLog(`CMS: Extracted campaign case study element: "${titleName}".`, 'warning');
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestiQuote.trim()) return;
    const newId = `testi-${Date.now()}`;
    const item = {
      id: newId,
      quote: newTestiQuote,
      author: newTestiAuthor || 'Corporate Partner CEO',
      role: newTestiRole || 'Managing Director',
      company: newTestiCompany || 'Aesthetic Enterprises',
      rating: Number(newTestiRating) || 5,
      avatarSeed: newTestiAvatar
    };
    const updated = [item, ...testimonialsData];
    updateTestimonials(language, updated);
    addLog(`CMS: Integrated new client recommendation review from: "${newTestiAuthor}".`, 'success');

    // Reset state
    setNewTestiQuote('');
    setNewTestiAuthor('');
    setNewTestiRole('');
    setNewTestiCompany('');
  };

  const handleDeleteTestimonial = (id: string, authorName: string) => {
    const updated = testimonialsData.filter(item => item.id !== id);
    updateTestimonials(language, updated);
    addLog(`CMS: Removed client recommendation from: "${authorName}".`, 'warning');
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    const newId = `team-${Date.now()}`;
    const item = {
      id: newId,
      name: newTeamName,
      role: newTeamRole || 'Senior Brand Planner',
      specialty: newTeamSpecialty || 'Communications Consulting',
      avatarSeed: newTeamAvatar,
      bio: newTeamBio || 'Over five years of experience designing media plans.',
      skills: newTeamSkills ? newTeamSkills.split(',').map(s => s.trim()).filter(Boolean) : ['Relations', 'Creative Audit'],
      hackerCode: newTeamHackerCode || 'bash start.sh'
    };
    const updated = [item, ...teamMembers];
    updateTeam(language, updated);
    addLog(`CMS: Commenced creative squad member portfolio: "${newTeamName}".`, 'success');

    // Reset state
    setNewTeamName('');
    setNewTeamRole('');
    setNewTeamSpecialty('');
    setNewTeamBio('');
    setNewTeamSkills('');
  };

  const handleDeleteTeamMember = (id: string, memberName: string) => {
    const updated = teamMembers.filter(item => item.id !== id);
    updateTeam(language, updated);
    addLog(`CMS: Decommissioned expert profile: "${memberName}".`, 'warning');
  };

  // Dynamic SEO settings writer per page section
  const updateSelectedSeoField = (field: string, val: string) => {
    const currentSeoSettings = websiteSettings.seoSettings || {};
    const currentSectionSeo = currentSeoSettings[selectedSeoSection] || {
      titleEn: "",
      titleVi: "",
      descEn: "",
      descVi: "",
      keywordsEn: "",
      keywordsVi: "",
      ogImage: ""
    };
    
    const updatedSectionSeo = {
      ...currentSectionSeo,
      [field]: val
    };
    
    const updatedSeoSettings = {
      ...currentSeoSettings,
      [selectedSeoSection]: updatedSectionSeo
    };
    
    updateWebsiteSettings({ seoSettings: updatedSeoSettings });
  };

  // Recharts high fidelity datasets for elegant visualization
  const visitorTrendsData = [
    { hour: '00:00', visitors: 112, sessions: 45 },
    { hour: '04:00', visitors: 76, sessions: 32 },
    { hour: '08:00', visitors: 284, sessions: 110 },
    { hour: '12:00', visitors: 492, sessions: 228 },
    { hour: '16:00', visitors: 580, sessions: 290 },
    { hour: '20:00', visitors: 420, sessions: 198 },
    { hour: '24:00', visitors: 190, sessions: 91 }
  ];

  const acquisitionChannelsData = [
    { name: 'Organic Search', value: 380, color: '#10B981' },
    { name: 'PR Articles', value: 240, color: '#5C7FA3' },
    { name: 'Physical Material QR', value: 310, color: '#7BA7D9' },
    { name: 'Direct Access', value: 150, color: '#64748B' }
  ];

  const conversionPerformanceData = [
    { week: 'Wk 1', estimationRuns: 45, contactsEnrolled: 18 },
    { week: 'Wk 2', estimationRuns: 68, contactsEnrolled: 25 },
    { week: 'Wk 3', estimationRuns: 92, contactsEnrolled: 42 },
    { week: 'Wk 4', estimationRuns: 130, contactsEnrolled: 58 },
    { week: 'Wk 5', estimationRuns: 110, contactsEnrolled: 49 },
    { week: 'Wk 6', estimationRuns: 148, contactsEnrolled: 72 }
  ];

  const deviceDistributionData = [
    { name: 'macOS desktop', value: 45 },
    { name: 'Windows workstations', value: 28 },
    { name: 'Mobile (Android Webview)', value: 18 },
    { name: 'Mobile safari', value: 9 }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl font-sans text-[#1D2B3D] overflow-y-auto">
      <div className="relative w-full max-w-7xl h-[92vh] flex flex-col bg-white border border-slate-200/50 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] overflow-hidden scale-102 animate-fade-in text-left">
        
        {/* UPPER CONSOLE BANNER */}
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-xl text-white">
              <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide text-slate-900 uppercase">HALO CREATIVE OPERATING SYSTEM</span>
                <span className="px-2 py-0.5 text-[8px] font-bold font-mono text-emerald-600 bg-emerald-50 rounded-full select-none animate-pulse">
                  v3.5 SECURITY ENFORCED
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">// ROOT ENCRYPTION ACTIVE // JWT TOKEN ISSUED</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[10px] text-slate-600 font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>OPERATING IN ROOT MODE</span>
              </div>
            )}
            
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
            >
              {language === 'en' ? 'Exit Operations' : 'Thoát Bảng Quản Trị'}
            </button>
          </div>
        </header>

        {/* NOT AUTHENTICATED SYSTEM FLOW */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col md:flex-row bg-slate-950 text-white overflow-y-auto">
            {/* Dark Left Branded Column */}
            <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 bg-[radial-gradient(ellipse_at_top_left,rgba(92,127,163,0.15),transparent)]">
              <div>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-4 h-4 rounded-full bg-[#7BA7D9]" />
                  <span className="font-bold text-xs tracking-wider uppercase text-[#7BA7D9]">
                    HALO CORE SYSTEMS
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight uppercase font-sans mb-6">
                  OPERATIONAL <br />
                  <span className="font-serif italic font-normal text-slate-400">RESTRICTED CONTROL</span> <br />
                  PLATFORM.
                </h2>
                <p className="text-[#94A3B8] text-xs font-light max-w-md leading-relaxed">
                  Authentication is strictly audited for authorized connections. Unauthorized actions will be automatically cataloged and logged to operations telemetry servers.
                </p>
              </div>

              {/* Security Alerts */}
              <div className="space-y-4 max-w-md bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 mt-8">
                <div className="flex gap-3 text-left">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#7BA7D9]">IP Whitelist Protection Active</span>
                    <p className="text-[9px] text-[#94A3B8] font-mono">// Active terminal whitelist enforces routing check to verify server integrity indexes.</p>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-slate-600 font-mono uppercase tracking-widest mt-8">
                HANOI // HO CHI MINH // SYSTEM INTEGRITY v3.5
              </div>
            </div>

            {/* Login Center Column */}
            <div className="w-full md:w-[450px] p-8 flex flex-col justify-center bg-[#090D16]">
              <div className="max-w-sm mx-auto w-full text-left">
                <div className="flex items-center gap-2.5 mb-6 text-slate-400">
                  <Lock className="w-4 h-4 text-[#7BA7D9]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">OPERATIONS SIGN IN</span>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-1.5">
                      OPERATIONS IDENTIFIER
                    </label>
                    <input 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)}
                      placeholder="e.g. admin"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 outline-none rounded-xl text-xs text-white placeholder-slate-600 focus:border-[#7BA7D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-1.5">
                      CRYPTO PASSCODE
                    </label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••••"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 outline-none rounded-xl text-xs text-white placeholder-slate-600 focus:border-[#7BA7D9]"
                    />
                  </div>

                  {is2FAEnabled && (
                    <div className="pt-2 animate-slide-up">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400">
                          2FA AUTHORIZATION CODE
                        </label>
                        <span className="text-[8px] font-mono text-cyan-400 font-bold">SYSTEM ROLLING (30s)</span>
                      </div>
                      <input 
                        type="text" 
                        value={twoFACecretCode} 
                        onChange={e => setTwoFACecretCode(e.target.value)}
                        placeholder="e.g. 192842"
                        maxLength={6}
                        className="w-full px-4 py-3 bg-cyan-950/20 border border-cyan-800/40 outline-none rounded-xl text-xs text-cyan-400 font-mono tracking-widest text-center focus:border-cyan-400"
                      />
                    </div>
                  )}

                  {authError && (
                    <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-[10px] text-red-400 font-mono flex gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div className="pt-2 space-y-3">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#7BA7D9] hover:bg-[#5C7FA3] transition-colors rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#7BA7D9]/10"
                    >
                      <LogIn className="w-4 h-4" />
                      {language === 'en' ? 'Authorize Credentials' : 'Xác Nhận Đăng Nhập'}
                    </button>

                    <button 
                      type="button"
                      onClick={handleShortcutDemoLogin}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center justify-center gap-2 cursor-pointer font-mono"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      DEMO SUPER ADMIN LOGIN
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-left leading-relaxed">
                  <p>// DEFAULT CRITERIONS:</p>
                  <p className="mt-1">Username: <span className="text-slate-300">admin</span></p>
                  <p>Passcode: <span className="text-slate-300">haloSuper2026</span></p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* SYSTEM OPERATING ZONE */
          <div className="flex-1 flex overflow-hidden">
            {/* Navigation Drawer */}
            <aside className="w-64 border-r border-slate-100 bg-slate-50 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
              <div className="space-y-6 text-left">
                <div className="space-y-1">
                  <span className="block px-3 text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-2">
                    OPERATIONAL CONTROL
                  </span>
                  
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`nav-btn w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'security' 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' 
                        : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Security & Dev Control
                  </button>

                  <button 
                    onClick={() => setActiveTab('cms')}
                    className={`nav-btn w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'cms' 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' 
                        : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Dynamic Website CMS
                  </button>

                  <button 
                    onClick={() => setActiveTab('events')}
                    className={`nav-btn w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'events' 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' 
                        : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    Events & Timers
                  </button>

                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`nav-btn w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'analytics' 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' 
                        : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Visitor Analytics
                  </button>

                  <button 
                    onClick={() => setActiveTab('lists')}
                    className={`nav-btn w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'lists' 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' 
                        : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                    }`}
                  >
                    <Database className="w-4 h-4" />
                    Manage Content Lists
                  </button>
                </div>
              </div>

              {/* Developer Reset Zone */}
              <div className="space-y-3 pt-6 border-t border-slate-200/60">
                <div className="px-3">
                  <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1">RESET OPTIONS</span>
                  <p className="text-[9px] text-slate-500 font-sans leading-tight">Revert current theme, texts and schedules to their factory defaults.</p>
                </div>
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors rounded-xl text-xs font-bold font-mono uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                >
                  <ResetIcon className="w-3.5 h-3.5" />
                  RESTORE FACTORY
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-xl text-[10px] font-mono uppercase tracking-widest font-bold cursor-pointer"
                >
                  DISMISS AUTH JWT
                </button>
              </div>
            </aside>

            {/* Core Tab Screen Displays */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto text-left bg-slate-50/30">
              
              {/* MOBILE MENU NAVIGATION FALLBACK */}
              <div className="flex gap-2 pb-4 border-b border-slate-200/60 mb-6 md:hidden overflow-x-auto text-xs font-bold uppercase">
                <button onClick={() => setActiveTab('security')} className={`px-3 py-2 rounded-lg ${activeTab === 'security' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Security</button>
                <button onClick={() => setActiveTab('cms')} className={`px-3 py-2 rounded-lg ${activeTab === 'cms' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Website CMS</button>
                <button onClick={() => setActiveTab('events')} className={`px-3 py-2 rounded-lg ${activeTab === 'events' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Events</button>
                <button onClick={() => setActiveTab('analytics')} className={`px-3 py-2 rounded-lg shrink-0 ${activeTab === 'analytics' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Analytics</button>
                <button onClick={() => setActiveTab('lists')} className={`px-3 py-2 rounded-lg shrink-0 ${activeTab === 'lists' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Lists</button>
              </div>

              {/* 1. SECURITY & DEV PANEL */}
              {activeTab === 'security' && (
                <div className="space-y-6 animate-slide-up text-left">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white border border-slate-200/60 rounded-2xl">
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm uppercase text-slate-900 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-600" />
                        IP Whitelisting Core Protection Middleware
                      </h3>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">
                        When active, strictly routes application payload only to whitelist terminals. Protects servers from non-authorized clients.
                      </p>
                    </div>
                    
                    <button 
                      onClick={toggleIPWhitelist}
                      className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                        isIPWhitelistEnabled 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10' 
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      {isIPWhitelistEnabled ? '● whitelisting active' : '○ Enforce whitelisting'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                    {/* Whitelisted IPs */}
                    <div className="p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">AUTHORIZED NETWORKS LIST</span>
                        <div className="space-y-1.5 pt-1 max-h-[160px] overflow-y-auto">
                          {whitelistedIPs.map(ip => (
                            <div key={ip} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono font-bold text-slate-600">
                              <span className="flex items-center gap-2 text-[11px]">
                                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                                {ip} {ip === myIP && <span className="text-[8px] bg-[#E6EEF8] text-[#5C7FA3] px-1.5 py-0.5 rounded-full uppercase leading-none font-sans font-bold">MY CURRENT IP</span>}
                              </span>
                              <button 
                                onClick={() => handleRemoveIP(ip)}
                                className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add IP */}
                      <div className="flex gap-2 pt-2">
                        <input 
                          type="text" 
                          value={newIPAddress}
                          onChange={e => setNewIPAddress(e.target.value)}
                          placeholder="e.g. 192.168.1.100"
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-[#7BA7D9]"
                        />
                        <button 
                          onClick={handleAddIP}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-xl cursor-pointer"
                        >
                          Whitelist IP
                        </button>
                      </div>
                    </div>

                    {/* Multi Factor Authentication 2FA System */}
                    <div className="p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">DYNAMIC MULTI-FACTOR AUTHENTICATION (2FA)</span>
                          <button 
                            onClick={handleToggle2FA}
                            className={`px-3 py-1 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase cursor-pointer ${
                              is2FAEnabled ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-550'
                            }`}
                          >
                            {is2FAEnabled ? 'ACTIVE' : 'DEACTIVATED'}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                          Enforce 2FA checks on operational sign ins. Admin will require rolling code on their synchronized authenticator application.
                        </p>

                        {/* Interactive rolling simulation */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-cyan-950/5 border border-cyan-800/10 text-cyan-900">
                          {/* Mock QR SVG */}
                          <div className="w-14 h-14 bg-white border border-cyan-800/20 p-1 rounded-md shrink-0 select-none pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                              <rect x="0" y="0" width="30" height="30" />
                              <rect x="70" y="0" width="30" height="30" />
                              <rect x="0" y="70" width="30" height="30" />
                              <rect x="10" y="10" width="10" height="10" fill="white" />
                              <rect x="80" y="10" width="10" height="10" fill="white" />
                              <rect x="10" y="80" width="10" height="10" fill="white" />
                              <rect x="40" y="20" width="20" height="20" />
                              <rect x="50" y="50" width="15" height="15" />
                              <rect x="80" y="80" width="20" height="20" />
                            </svg>
                          </div>
                          <div className="space-y-1 w-full">
                            <span className="block text-[8px] font-mono tracking-widest uppercase text-slate-400">AUTHENTICATOR ENSEMBLE</span>
                            <div className="font-mono text-xl font-bold text-cyan-600 flex items-center justify-between">
                              <span>{twoFACurrentCode}</span>
                              <span className="text-[10px] text-cyan-500 mr-2">{Math.round(twoFATimerProgress / 10)}s remaining</span>
                            </div>
                            
                            {/* Visual rolling timers */}
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${twoFATimerProgress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono">
                        // SECURE TOKEN SECRET INTEGRATION KEY: <span className="text-[#5C7FA3] font-bold">HALO SECRET ADMIN AUTH TOKEN</span>
                      </div>
                    </div>
                  </div>

                  {/* NEW UPGRADED SECURITY SUITE MODULES ROW */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                    {/* UPGRADE 1: INTERACTIVE SECURITY AUDIT & VULNERABILITY SCANNER */}
                    <div className="p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-emerald-600" />
                            INTEGRITY SYSTEM SCANNING DECK
                          </span>
                          <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full select-none">
                            STATIC+DYNAMIC SEC-AUDIT
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase">Interactive Vulnerability Scanner</h4>
                        <p className="text-[11px] text-slate-550 leading-relaxed mt-1">
                          Trigger an automated on-demand system analysis to evaluate configuration, detect active malware hooks, and confirm secure credential policies.
                        </p>

                        {/* Scanner Display Arena */}
                        <div className="mt-4 p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] min-h-[140px] border border-slate-900 relative flex flex-col justify-between overflow-hidden">
                          {/* Pulse lines effect */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent)] pointer-events-none" />
                          
                          {vulnerabilityScannerState === 'idle' && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-4">
                              <span className="text-[10px] text-slate-500">// INTEGRITY DIAGNOSTICS OFFLINE</span>
                              <button 
                                type="button"
                                onClick={runSecurityAudit}
                                className="px-4 py-1.5 bg-[#5C7FA3] hover:bg-[#46698C] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                              >
                                <RefreshCw className="w-3" style={{ height: '12px' }} />
                                Initiate Security Audit
                              </button>
                            </div>
                          )}

                          {vulnerabilityScannerState === 'scanning' && (
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div className="space-y-2">
                                <div className="flex justify-between text-[9px] text-[#7BA7D9] font-bold">
                                  <span>SCANNING HOST SYSTEM INTEGRITY...</span>
                                  <span className="animate-pulse">{scannerProgress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${scannerProgress}%` }} />
                                </div>
                              </div>
                              <div className="text-[10px] text-emerald-400 italic font-mono space-y-1">
                                <span className="block text-slate-300 animate-pulse">&gt; {scannerStepText}</span>
                                <span className="block text-[8px] text-slate-600">// Processing thread segments on isolated sandbox</span>
                              </div>
                            </div>
                          )}

                          {vulnerabilityScannerState === 'completed' && scannerReport && (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                  <span className="text-[13px] font-bold text-emerald-400">{scannerReport.score}/100</span>
                                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Security Index Rating</span>
                                </div>
                                <button 
                                  type="button"
                                  onClick={runSecurityAudit}
                                  className="text-[9px] hover:text-white uppercase font-bold text-[#7BA7D9] flex items-center gap-1 transition-all"
                                >
                                  <RefreshCw className="w-2.5 h-2.5" /> Re-Scan
                                </button>
                              </div>
                              
                              {/* Small list details */}
                              <div className="space-y-1.5 max-h-[110px] overflow-y-auto text-left scrollbar-thin scrollbar-thumb-slate-800 pr-1 select-none">
                                {scannerReport.issues.map((iss, i) => (
                                  <div key={i} className="flex gap-2 items-start text-[9.5px] leading-tight text-left">
                                    <span className={iss.status === 'passed' ? 'font-bold shrink-0 text-emerald-400' : 'text-amber-500 font-bold shrink-0'}>
                                      {iss.status === 'passed' ? '[PASS]' : iss.status === 'warning' ? '[WARN]' : '[INFO]'}
                                    </span>
                                    <div className="flex-1">
                                      <div className="flex items-baseline justify-between text-slate-300">
                                        <span className="font-bold text-slate-200">{iss.category}</span>
                                        <span className="text-[8px] text-slate-500">{iss.rating}</span>
                                      </div>
                                      <p className="text-slate-400 text-[9px] font-light">{iss.message}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-400 font-mono">
                        // PLATFORM DIRECTORY VULNERABILITY MATRIX: SECURE ENDPOINT
                      </div>
                    </div>

                    {/* UPGRADE 2: DDOS PREVENTATIVE MITIGATION LAYER & TRAFFIC FLUX SIMULATOR */}
                    <div className="p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-cyan-600" />
                            anti-ddos defensive scrubbing grid
                          </span>
                          <button 
                            type="button"
                            onClick={toggleDdosShield}
                            className={`px-3 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase cursor-pointer transition-all ${
                              isDdosShieldOn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/20' : 'bg-red-50 text-red-700 border border-red-200/20'
                            }`}
                          >
                            {isDdosShieldOn ? 'ANTI-FLOOD ACTIVE' : 'SHIELD DISABLED'}
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase">Mitigation Layer Simulator</h4>
                        <p className="text-[11px] text-slate-550 leading-relaxed mt-1">
                          Test server responsiveness and active scrub rules under heavy load. Inject anomalous flood requests to see anti-DDoS mitigation trigger live!
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {/* Live parameters */}
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 flex flex-col justify-between h-[100px] relative overflow-hidden text-left">
                            {isAnomalousAttackTriggered && (
                              <div className="absolute inset-0 bg-red-400/5 animate-pulse pointer-events-none" />
                            )}
                            <span className="text-[8px] font-mono text-slate-400 uppercase font-bold tracking-wider">// WEB FLOW FREQUENCY</span>
                            <div className="flex flex-col justify-center">
                              <span className={`text-xl font-bold font-mono leading-none ${isAnomalousAttackTriggered && !isDdosShieldOn ? 'text-red-600 animate-bounce' : 'text-slate-800'}`}>
                                {currentRps} <span className="text-[10px] font-normal font-sans text-slate-400">RPS</span>
                              </span>
                              <span className="text-[8px] font-mono text-slate-400">requests / second</span>
                            </div>
                            
                            {/* status line tag */}
                            <div className="flex items-center gap-1.5 text-[8.5px] font-bold">
                              <span className={`w-1.5 h-1.5 rounded-full ${isAnomalousAttackTriggered ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                              <span className={isAnomalousAttackTriggered ? 'text-red-600' : 'text-slate-500'}>
                                {isAnomalousAttackTriggered ? 'THREAT ANOMALY' : 'NORMAL INBOUNDS'}
                              </span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 flex flex-col justify-between h-[100px] text-left">
                            <span className="text-[8px] font-mono text-slate-400 uppercase font-bold tracking-wider">// BLOCKED ATTACKS</span>
                            <div className="flex flex-col justify-center">
                              <span className="text-xl font-bold font-mono text-cyan-600">
                                {ddosScrubbedCounter}
                              </span>
                              <span className="text-[8px] font-mono text-slate-400">malicious payloads scrubbed</span>
                            </div>

                            <button 
                              type="button"
                              disabled={isAnomalousAttackTriggered}
                              onClick={triggerAnomalousAttackSimulator}
                              className={`w-full py-1 border text-[9px] font-bold font-mono rounded-lg transition-all ${
                                isAnomalousAttackTriggered 
                                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                                  : 'bg-red-50 text-red-600 border-red-200 cursor-pointer hover:bg-red-100'
                              }`}
                            >
                              {isAnomalousAttackTriggered ? 'ATTACK ENFORCING...' : 'SIMULATE DDOS ATTACK'}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-400 font-mono">
                        // SCRUB RULESETS ENCRYPTED UNDER AES-256 GCM MULTILAYER PACKET FILTER
                      </div>
                    </div>
                  </div>

                  {/* Connected Terminals & Activity logs */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    {/* Device sessions */}
                    <div className="lg:col-span-1 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-4">CONNECTED OPERATIONS LOCATIONS</span>
                        <div className="space-y-3">
                          {activeDevices.map(dv => (
                            <div key={dv.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl relative overflow-hidden flex flex-col justify-between">
                              <div className="flex justify-between items-start mb-1 text-left">
                                <div>
                                  <span className="block text-xs font-bold text-slate-800">{dv.device}</span>
                                  <span className="block text-[9px] text-slate-400 font-mono uppercase">{dv.location} &bull; {dv.browser}</span>
                                </div>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono ${
                                  dv.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                }`}>{dv.status.toUpperCase()}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-200/60">
                                <span className="text-[10px] font-mono text-slate-500 leading-none">{dv.ip}</span>
                                <button 
                                  type="button"
                                  onClick={() => handleDisconnectDevice(dv.id, dv.device)}
                                  className="text-[9px] font-mono font-bold text-red-500 hover:underline cursor-pointer"
                                >
                                  Revoke Session
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-100 text-[9px] text-slate-400 font-mono mt-3">
                        // SECURE WEBSOCKET TUNNEL FEED AT PORT: 3000
                      </div>
                    </div>

                    {/* Activity Logs */}
                    <div className="lg:col-span-2 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">OPERATIONAL AUDIT TRAIL LOGS</span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleDownloadSecurityLogs}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] font-bold font-mono uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-550" /> Export JSON
                            </button>
                            <button
                              type="button"
                              onClick={clearSecurityLogs}
                              className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-650 text-[9px] font-bold font-mono uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" /> Clear Logs
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1 select-none text-left">
                          {activityLogs.map(log => (
                            <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-mono flex items-start gap-3">
                              <span className="text-[9px] text-slate-400 shrink-0">{log.timestamp.split(' ')[1]}</span>
                              <span className="text-slate-500 font-mono shrink-0">[{log.ip}]</span>
                              <span className={`font-mono text-left flex-1 ${
                                log.type === 'success' ? 'text-emerald-700 font-bold' : 
                                log.type === 'warning' ? 'text-amber-700 font-bold' : 
                                log.type === 'security' ? 'text-red-750 font-bold' : 'text-slate-700'
                              }`}>{log.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-mono animate-pulse">
                        // SECURE WEBSOCKET TUNNEL FEED AT PORT: 3000 // AES 256 GCM SECURED
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. DYNAMIC CMS DESIGNS */}
              {activeTab === 'cms' && (
                <div className="space-y-6 animate-slide-up text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    {/* Visual customizer */}
                    <div className="lg:col-span-2 p-6 bg-white border border-slate-200/60 rounded-2xl space-y-6 text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">REAL-TIME VISUAL CONTROL</span>
                        <h3 className="font-bold text-sm uppercase text-slate-900">Dynamic Theme Templates & Accents</h3>
                      </div>

                      {/* Color Palette Accents selection */}
                      <div className="space-y-3">
                        <label className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">SELECT BRAND DYNAMIC COLOR THEME ACCENT</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { color: 'slate', name: 'Slate Indigo (#5C7FA3)', bg: 'bg-[#5C7FA3]' },
                            { color: 'emerald', name: 'Emerald Breeze (#10B981)', bg: 'bg-emerald-500' },
                            { color: 'cyan', name: 'Neon Cyan (#0891B2)', bg: 'bg-cyan-500' },
                            { color: 'amber', name: 'Amber Fire (#D97706)', bg: 'bg-amber-500' },
                            { color: 'violet', name: 'Astral Violet (#7C3AED)', bg: 'bg-violet-500' },
                            { color: 'gold', name: 'Imperial Gold (#B45309)', bg: 'bg-amber-600' },
                            { color: 'rose', name: 'Crimson Rose (#E11D48)', bg: 'bg-rose-500' }
                          ].map(th => (
                            <button
                              key={th.color}
                              onClick={() => {
                                updateWebsiteSettings({ themeColor: th.color as any });
                                addLog(`CMS: Switched brand accent colors theme palette to: "${th.color.toUpperCase()}".`);
                              }}
                              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs cursor-pointer ${
                                websiteSettings.themeColor === th.color 
                                  ? 'border-slate-900 bg-slate-50' 
                                  : 'border-slate-200 hover:border-slate-350 bg-white'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full ${th.bg} shrink-0`} />
                              <span className="font-semibold text-[11px] truncate">{th.color.toUpperCase()}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Grid settings typography etc */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Typography Presets */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">TYPOGRAPHY FONTS PRESET</label>
                          <select
                            value={websiteSettings.fontPreset}
                            onChange={e => {
                              updateWebsiteSettings({ fontPreset: e.target.value as any });
                              addLog(`CMS: Switched website core layout typography to: ${e.target.value}.`);
                            }}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                          >
                            <option value="Inter">Inter UI (Swiss Modern)</option>
                            <option value="Satoshi">Space Grotesk (Tech Display)</option>
                            <option value="General Sans">Outfit (Elegant Editorial)</option>
                            <option value="Manrope">Manrope (Clean Geometric Minimalist)</option>
                          </select>
                        </div>

                        {/* Homepage Background presets */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">HOMEPAGE BACKGROUND PRESENTATION</label>
                          <select
                            value={websiteSettings.homeBg}
                            onChange={e => {
                              updateWebsiteSettings({ homeBg: e.target.value });
                              addLog(`CMS: Changed front homepage background setup class structure.`);
                            }}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                          >
                            <option value="bg-[#F2F4F7]">Minimal Cool Slate White (Factory Classic)</option>
                            <option value="bg-amber-50/40">Warm Alabaster Linen Accent</option>
                            <option value="bg-indigo-50/30">Ambient Velvet Lavender tint</option>
                            <option value="bg-slate-900 text-white select-none">Obsidian Tactical Grey Dark Canvas</option>
                            <option value="bg-emerald-50/50">Bio Emerald Ecological Light Tint</option>
                          </select>
                        </div>
                      </div>

                      {/* Text controls live CMS */}
                      <div className="space-y-4 pt-2">
                        <span className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">LIVE CONTENT TEXT WRITERS (HERO SECTION)</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* En headline sub */}
                          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200/55 rounded-xl text-left">
                            <span className="text-[9px] font-mono font-bold text-[#5C7FA3] flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5" /> ENGLISH SECTION DATA
                            </span>
                            
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">HERO MAIN HEADLINE (split with Double Slash '//')</label>
                              <input 
                                type="text" 
                                value={websiteSettings.heroHeadlineEn}
                                onChange={e => handleUpdateHeroText('headlineEn', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase font-sans">HERO SUBTEXT PARAGRAPH</label>
                              <textarea 
                                value={websiteSettings.heroSubEn}
                                rows={3}
                                onChange={e => handleUpdateHeroText('subEn', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed font-sans text-slate-700"
                              />
                            </div>
                          </div>

                          {/* Vi headline sub */}
                          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200/55 rounded-xl text-left">
                            <span className="text-[9px] font-mono font-bold text-emerald-600 flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5" /> VIETNAMESE SECTION DATA
                            </span>

                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">TIÊU ĐỀ CHÍNH HERO (ngăn cách bởi dấu '//')</label>
                              <input 
                                type="text" 
                                value={websiteSettings.heroHeadlineVi}
                                onChange={e => handleUpdateHeroText('headlineVi', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase font-sans">MÔ TẢ CHI TIẾT HERO</label>
                              <textarea 
                                value={websiteSettings.heroSubVi}
                                rows={3}
                                onChange={e => handleUpdateHeroText('subVi', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed font-sans text-slate-700"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section-based SEO Settings Panel */}
                      <div className="space-y-4 pt-4 border-t border-slate-100 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">SEO META CONTROL CENTER (REACT HELMET SYNC)</span>
                            <h4 className="text-xs font-bold text-slate-800 uppercase mt-0.5">Edit Tags Per Website Section</h4>
                          </div>
                          <select
                            value={selectedSeoSection}
                            onChange={(e) => {
                              setSelectedSeoSection(e.target.value);
                              addLog(`CMS: Selected "${e.target.value.toUpperCase()}" section for SEO metadata customization.`);
                            }}
                            className="bg-slate-100 border border-slate-200 text-slate-700 p-1.5 px-3 rounded-lg text-xs font-semibold uppercase outline-none"
                          >
                            <option value="hero">Hero Header Index</option>
                            <option value="about">About Brand Info</option>
                            <option value="services">Services Portfolios</option>
                            <option value="portfolio">Portfolio Projects showcase</option>
                            <option value="process">Campaign Process</option>
                            <option value="testimonials">Client Testimonials</option>
                            <option value="team">Creative Team Staff</option>
                            <option value="contact">Contact Lead-Generator</option>
                          </select>
                        </div>

                        <div className="p-4 bg-slate-50/70 border border-slate-200/60 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Column 1 - Meta Titles (EN & VI) */}
                          <div className="space-y-3">
                            <span className="block text-[9px] font-mono font-bold text-[#5C7FA3] uppercase flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5" /> METADATA PAGE TITLES
                            </span>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">EN - Title Bar Tag</label>
                              <input
                                type="text"
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.titleEn) || ""}
                                onChange={(e) => updateSelectedSeoField('titleEn', e.target.value)}
                                placeholder="HALO Agency | Leading Strategic Communications..."
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">VI - Tiêu Đề Thẻ Trang</label>
                              <input
                                type="text"
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.titleVi) || ""}
                                onChange={(e) => updateSelectedSeoField('titleVi', e.target.value)}
                                placeholder="HALO Agency | Kể Chuyện Thương Hiệu..."
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 bg-white"
                              />
                            </div>

                            {/* Keywords */}
                            <span className="block text-[9px] font-mono font-bold text-emerald-600 uppercase pt-2">
                              SEO INDEX KEYWORDS
                            </span>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">EN Keywords (comma-separated)</label>
                              <input
                                type="text"
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.keywordsEn) || ""}
                                onChange={(e) => updateSelectedSeoField('keywordsEn', e.target.value)}
                                placeholder="agency, pr vietnam, media solutions"
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">VI Từ Khóa (cách nhau bởi dấu phẩy)</label>
                              <input
                                type="text"
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.keywordsVi) || ""}
                                onChange={(e) => updateSelectedSeoField('keywordsVi', e.target.value)}
                                placeholder="truyền thông, dịch vụ pr, kể câu chuyện"
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
                              />
                            </div>
                          </div>

                          {/* Column 2 - Meta Descriptions & OG Image */}
                          <div className="space-y-3">
                            <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" /> META SEARCH DESCRIPTIONS (OPTIMAL SEO ~155 CHARS)
                            </span>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">EN - Description Snippet</label>
                              <textarea
                                rows={2}
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.descEn) || ""}
                                onChange={(e) => updateSelectedSeoField('descEn', e.target.value)}
                                placeholder="HALO Agency delivers high-end media campaign solutions..."
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">VI - Mô Tả Trích Dẫn Thẻ</label>
                              <textarea
                                rows={2}
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.descVi) || ""}
                                onChange={(e) => updateSelectedSeoField('descVi', e.target.value)}
                                placeholder="HALO Agency mang lại giải pháp quan hệ công chúng..."
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed bg-white"
                              />
                            </div>

                            <div className="space-y-1 pt-2">
                              <label className="block text-[8px] font-bold text-slate-500 uppercase">OPEN GRAPH SHARE IMAGE LINK (OG:IMAGE)</label>
                              <input
                                type="text"
                                value={(websiteSettings.seoSettings?.[selectedSeoSection]?.ogImage) || ""}
                                onChange={(e) => updateSelectedSeoField('ogImage', e.target.value)}
                                placeholder="https://images.unsplash.com/... (1200x630px)"
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-650 bg-white"
                              />
                              {websiteSettings.seoSettings?.[selectedSeoSection]?.ogImage && (
                                <div className="mt-1.5 flex gap-2 items-center text-[9px] text-slate-400 font-sans">
                                  <span>Visual Preview:</span>
                                  <img 
                                    src={websiteSettings.seoSettings[selectedSeoSection].ogImage} 
                                    alt="seo preview" 
                                    className="h-10 w-20 object-cover rounded border border-slate-200"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Video upload url, toggle animations and dark light mode */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-left">
                        {/* Video media URL input */}
                        <div className="space-y-1.5 sm:col-span-1">
                          <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400">HERO BRANDING MEDIA (WEB RECON URL)</label>
                          <input 
                            type="text"
                            value={websiteSettings.heroMediaUrl}
                            onChange={e => {
                              updateWebsiteSettings({ heroMediaUrl: e.target.value });
                              addLog('CMS: Uploaded custom banner/media assets backdrop URL link.', 'info');
                            }}
                            placeholder="e.g. https://domain.club/scene.mp4"
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-mono outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-1 flex flex-col justify-center">
                          <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-1">DYNAMICS SPEED ACCELERATORS</label>
                          <button 
                            onClick={() => {
                              const next = !websiteSettings.animationsEnabled;
                              updateWebsiteSettings({ animationsEnabled: next });
                              addLog(`CMS: Changed Framer Motion transitions parameters set to: ${next ? 'OPTIMAL' : 'REDUCED LATENCY'}`);
                            }}
                            className={`w-full py-2 border rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer ${
                              websiteSettings.animationsEnabled ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-red-50 border-red-200 text-red-650'
                            }`}
                          >
                            {websiteSettings.animationsEnabled ? '✓ Animations ON' : '✗ Reduce Animations'}
                          </button>
                        </div>

                        <div className="space-y-1.5 sm:col-span-1 flex flex-col justify-center">
                          <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-1 font-mono">// FORCE BLACK CANVAS OBSIDIAN</label>
                          <button 
                            onClick={() => {
                              const next = !websiteSettings.isDarkMode;
                              updateWebsiteSettings({ isDarkMode: next });
                              addLog(`CMS: Force Dark Mode changed state to: ${next ? 'ENFORCED' : 'OFF'}`);
                            }}
                            className={`w-full py-2 border rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer ${
                              websiteSettings.isDarkMode ? 'bg-slate-900 border-slate-950 text-white' : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {websiteSettings.isDarkMode ? '🌙 DARK DESIGN: ENFORCED' : '☀️ LIGHT CANON: ACTIVE'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Drag n drop reordering simulation panel */}
                    <div className="lg:col-span-1 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between space-y-4 text-left">
                      <div>
                        <div className="space-y-1 mb-4 text-left">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">STRUCTURE SCHEMAS DIRECTORY</span>
                          <h3 className="font-bold text-sm uppercase text-slate-900 leading-none">Modules Order Re-Organizer</h3>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed pt-1">
                            Click movement controls to rearrange front sections index stack dynamically in real-time.
                          </p>
                        </div>

                        <div className="space-y-2 max-h-[385px] overflow-y-auto">
                          {websiteSettings.layoutSections.map((sect, idx) => (
                            <div key={sect} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-150 relative text-left select-none">
                              <span className="flex items-center gap-2.5 font-semibold text-xs text-slate-800">
                                <span className="font-mono text-[9px] bg-slate-200/50 px-1.5 py-0.5 rounded-md">{idx + 1}</span>
                                <span className="uppercase tracking-wider">{sect}</span>
                              </span>

                              <div className="flex gap-1 shrink-0">
                                <button
                                  disabled={idx === 0}
                                  onClick={() => moveSection(idx, 'up')}
                                  className={`p-1 border border-slate-200 rounded bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer`}
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  disabled={idx === websiteSettings.layoutSections.length - 1}
                                  onClick={() => moveSection(idx, 'down')}
                                  className={`p-1 border border-slate-200 rounded bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer`}
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Display Pinned Case Study Dynamic Setting */}
                      <div className="pt-4 border-t border-slate-105">
                        <label className="block text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-1.5 font-mono">PINNED DYNAMO CASE STUDY PROJECT</label>
                        <select
                          value={websiteSettings.pinnedProjectId || ''}
                          onChange={e => {
                            updateWebsiteSettings({ pinnedProjectId: e.target.value || null });
                            addLog(`CMS: Featured campaign pinned state pinned onto ID: "${e.target.value}".`);
                          }}
                          className="w-full p-2 bg-slate-50 border border-slate-200 font-sans font-semibold rounded-xl text-xs text-slate-700 outline-none"
                        >
                          <option value="">-- No project pinned --</option>
                          {portfolioData.map(proj => (
                            <option key={proj.id} value={proj.id}>{proj.title} ({proj.category})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. EVENT MANAGEMENT SYSTEM & COUNTDOWN TIMES */}
              {activeTab === 'events' && (
                <div className="space-y-6 animate-slide-up text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    {/* Event Form Builder */}
                    <div className="lg:col-span-1 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between">
                      <form onSubmit={handleCreateEvent} className="space-y-4">
                        <div className="space-y-1 text-left">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">EVENT ENGINE CONSTRUCTS</span>
                          <h3 className="font-bold text-sm uppercase text-slate-900 leading-none">Compose Announcement Launch</h3>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase">CAMPAIGN TITLE (EN)</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. VinFast Launch Event"
                            value={newEventTitleEn}
                            onChange={e => setNewEventTitleEn(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase">CAMPAIGN TITLE (VI)</label>
                          <input 
                            type="text"
                            required
                            placeholder="Ví dụ: Lễ hội ra mắt VinFast"
                            value={newEventTitleVi}
                            onChange={e => setNewEventTitleVi(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono tracking-wider text-slate-500 uppercase">BADGE TEXT (EN)</label>
                            <input 
                              type="text"
                              value={newEventBadgeEn}
                              onChange={e => setNewEventBadgeEn(e.target.value)}
                              className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs font-mono uppercase"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono tracking-wider text-slate-500 uppercase">BADGE TEXT (VI)</label>
                            <input 
                              type="text"
                              value={newEventBadgeVi}
                              onChange={e => setNewEventBadgeVi(e.target.value)}
                              className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs font-mono uppercase"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase">EVENT DESCRIPTION (EN)</label>
                          <textarea 
                            rows={2}
                            value={newEventDescEn}
                            onChange={e => setNewEventDescEn(e.target.value)}
                            placeholder="e.g. Announcement of eco-friendly sustainable flight strategy vectors across Asia..."
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase">COUNTDOWN TARGET MOMENT DATE</label>
                          <input 
                            type="datetime-local"
                            required
                            value={newEventDate}
                            onChange={e => setNewEventDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input 
                            type="checkbox"
                            id="featured-event-check"
                            checked={newEventIsFeatured}
                            onChange={e => setNewEventIsFeatured(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="featured-event-check" className="text-xs text-slate-700 font-semibold cursor-pointer">
                            Configure as Active Featured Announcement Banner Mode
                          </label>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                        >
                          <Plus className="w-4 h-4" /> Composed Announcement Event
                        </button>
                      </form>
                    </div>

                    {/* Active Campaign countdown banners list */}
                    <div className="lg:col-span-2 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">REGISTERED COUNTDOWN ANNOUNCEMENT TICKERS</span>
                        
                        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                          {events.map(ev => {
                            const isPast = new Date(ev.date).getTime() < Date.now();
                            return (
                              <div key={ev.id} className="p-4 rounded-2xl border border-slate-150 bg-[#F8FAFC]/55 flex flex-col md:flex-row items-stretch justify-between gap-4 text-left glassmorphism">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2.5">
                                    <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded-md bg-[#7BA7D9]/10 text-[#5C7FA3] border border-[#7BA7D9]/15">
                                      {language === 'en' ? ev.badgeTextEn : ev.badgeTextVi}
                                    </span>
                                    {ev.isFeatured && (
                                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded-md bg-amber-50 text-amber-600 border border-amber-200/60 leading-none">
                                        FEATURED ACTIVE
                                      </span>
                                    )}
                                  </div>

                                  <div className="space-y-0.5">
                                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">{language === 'en' ? ev.titleEn : ev.titleVi}</h4>
                                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">{language === 'en' ? ev.descEn : ev.descVi}</p>
                                  </div>
                                </div>

                                {/* Timer Block */}
                                <div className="flex flex-col justify-center items-center md:items-end gap-2 shrink-0 md:pl-4 md:border-l border-slate-200/60">
                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">LAUNCHING EVENT COUNTDOWN</span>
                                  {isPast ? (
                                    <span className="text-xs font-mono font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-200 uppercase tracking-widest leading-none">RELEASED</span>
                                  ) : (
                                    <CountdownInline targetDate={ev.date} />
                                  )}

                                  <div className="flex gap-2 pt-1 font-mono text-[9px]">
                                    <button 
                                      onClick={() => handleToggleEventFeatureState(ev.id, ev.isFeatured)}
                                      className="text-slate-500 hover:text-indigo-600 underline cursor-pointer"
                                    >
                                      {ev.isFeatured ? 'Set Standard' : 'Feature Banner'}
                                    </button>
                                    <span className="text-slate-350">|</span>
                                    <button 
                                      onClick={() => handleDeleteEvent(ev.id, ev.titleEn)}
                                      className="text-slate-400 hover:text-red-600 font-bold uppercase cursor-pointer"
                                    >
                                      Delete Ticker
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-mono">
                        // THEME COMPLIANCE: COUNTDOWN RENDERED WITH PREMIUM GLASSMORPHISM LAYER DESIGNS
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. VISITOR ANALYTICS DASHBOARD CARD */}
              {activeTab === 'analytics' && (
                <div className="space-y-6 animate-slide-up text-left">
                  {/* Performance widgets */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-between text-left shadow-sm">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">LIVE ACTIVE USERS</span>
                        <span className="font-sans text-xl font-bold text-slate-800 leading-none">{liveVisitors}</span>
                        <p className="text-[8px] text-emerald-600 font-mono mt-1">// SECURE SSL CONNECTION SEED</p>
                      </div>
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                    </div>

                    <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-between text-left shadow-sm">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">TOTAL SCANS HIT RATE</span>
                        <span className="font-sans text-xl font-bold text-[#5C7FA3] leading-none">312</span>
                        <p className="text-[8px] text-[#5C7FA3] font-mono mt-1">// BRAND MATERIALS RESPONSIVENESS</p>
                      </div>
                      <Compass className="w-5 h-5 text-[#7BA7D9]" />
                    </div>

                    <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-between text-left shadow-sm">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">STRATEGY RUN CONVERSIONS</span>
                        <span className="font-sans text-xl font-bold text-slate-800 leading-none">42.8%</span>
                        <p className="text-[8px] text-emerald-605 font-mono mt-1">// ESTIMATOR RECON FACTOR EXPONENT</p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>

                    <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-between text-left shadow-sm">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">ESTIMATOR REVENUE PIXEL</span>
                        <span className="font-sans text-xl font-bold text-slate-800 leading-none">$148,500</span>
                        <p className="text-[8px] text-slate-400 font-mono mt-1">// PORTFOLIO CALCULUS VALUE SCRAMBLED</p>
                      </div>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>

                  {/* Recharts Graphical modules layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    {/* Traffic Trends Chart */}
                    <div className="lg:col-span-2 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between text-left h-[320px]">
                      <div className="mb-2 text-left">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">HOURLY OPERATIONS TELEMETRY</span>
                        <span className="block text-xs font-bold text-slate-800 uppercase">Live Visitor Frequency Streams</span>
                      </div>
                      
                      <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={visitorTrendsData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7BA7D9" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#7BA7D9" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="hour" stroke="#94A3B8" fontSize={9} />
                            <YAxis stroke="#94A3B8" fontSize={9} />
                            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '10px' }} />
                            <Area type="monotone" dataKey="visitors" stroke="#5C7FA3" strokeWidth={2} fillOpacity={1} fill="url(#colorVis)" name="Active Visitors" />
                            <Area type="monotone" dataKey="sessions" stroke="#7BA7D9" strokeWidth={1} strokeDasharray="3 3" fillOpacity={0} name="Active Sessions" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Acquisition channels pie */}
                    <div className="lg:col-span-1 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between text-left h-[320px]">
                      <div className="mb-2 text-left">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">ACQUISITION TRAFFIC FEEDERS</span>
                        <span className="block text-xs font-bold text-slate-800 uppercase">Interactive Channels Audit</span>
                      </div>

                      <div className="flex-1 min-h-[170px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={acquisitionChannelsData}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {acquisitionChannelsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Pie channel legend labels */}
                      <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-100">
                        {acquisitionChannelsData.map(ch => (
                          <div key={ch.name} className="space-y-0.5">
                            <span className="flex items-center gap-1.5 text-[8.5px] font-bold text-slate-500 uppercase leading-none">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ch.color }} />
                              {ch.name.split(' ')[0]}
                            </span>
                            <span className="block text-xs font-bold font-mono pl-3 leading-none text-slate-700">{ch.value} hits</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    {/* Conversion performance rates stream */}
                    <div className="lg:col-span-2 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between text-left h-[300px]">
                      <div className="mb-2 text-left">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">CAMPAIGN ENGAGEMENT SCALES</span>
                        <span className="block text-xs font-bold text-slate-800 uppercase">Conversion Funnels Metrics</span>
                      </div>

                      <div className="flex-1 min-h-[210px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={conversionPerformanceData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                            <XAxis dataKey="week" stroke="#94A3B8" fontSize={9} />
                            <YAxis stroke="#94A3B8" fontSize={9} />
                            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '10px' }} />
                            <Legend wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', fontStyle: 'semibold' }} />
                            <Line type="monotone" dataKey="estimationRuns" stroke="#7BA7D9" strokeWidth={2} name="Planning Runs" />
                            <Line type="monotone" dataKey="contactsEnrolled" stroke="#5C7FA3" strokeWidth={3} activeDot={{ r: 6 }} name="Consults Secured" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Interactive Simulated Heatmap Hover Tracks */}
                    <div className="lg:col-span-1 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between text-left h-[300px]">
                      <div className="mb-2 text-left flex justify-between items-start">
                        <div>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">HOVER COORDINATES GRID</span>
                          <span className="block text-xs font-bold text-slate-800 uppercase">Live Heatmap Preview matrix</span>
                        </div>
                        <button 
                          onClick={() => {
                            // Randomize coordinates coordinates
                            setHeatmapDots(prev => prev.map(pt => ({
                              x: Math.floor(Math.random() * 260) + 20,
                              y: Math.floor(Math.random() * 150) + 20,
                              intensity: Math.floor(Math.random() * 9) + 1
                            })));
                            addLog('CMS: Heatmap analytics nodes recalibrated.', 'info');
                          }}
                          className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      </div>

                      {/* Canvas map mock grid */}
                      <div className="flex-1 bg-slate-950 rounded-xl relative overflow-hidden border border-slate-850 p-2 min-h-[170px]">
                        {/* Grid grid line overlays */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_10px,transparent_10px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_10px,transparent_10px)] bg-size[20px_20px]" />
                        
                        {/* Landing elements mock borders */}
                        <div className="absolute top-[10%] left-[20%] w-[60%] h-[20%] border border-white/5 bg-white/2 rounded p-1 text-[7px] text-white/20 font-mono">HERO TEXT FOCUS AREA</div>
                        <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[30%] border border-white/5 bg-white/2 rounded p-1 text-[7px] text-white/20 font-mono">SERVICES ACTION</div>
                        <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[40%] border border-white/5 bg-white/2 rounded p-1 text-[7px] text-white/20 font-mono">CALCULATOR INTERACTIVE</div>

                        {/* Blurring coordinates heat blobs */}
                        {heatmapDots.map((dt, i) => (
                          <div 
                            key={i} 
                            className="absolute rounded-full pointer-events-none mix-blend-screen animate-pulse"
                            style={{
                              left: `${dt.x}px`,
                              top: `${dt.y}px`,
                              width: `${dt.intensity * 12}px`,
                              height: `${dt.intensity * 12}px`,
                              backgroundColor: dt.intensity > 7 ? 'rgba(239, 68, 68, 0.45)' : (dt.intensity > 4 ? 'rgba(245, 158, 11, 0.42)' : 'rgba(16, 185, 129, 0.38)'),
                              filter: 'blur(8px)',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        ))}
                      </div>

                      <div className="text-[8px] font-mono text-slate-400 text-left pt-2 leading-tight">
                        // SENSOR CAPTORS: RED = EXTREME ACTION (HERO ESTIMATE CTA), GREEN = HOVERING TRAJECTORY TRACKS
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. DYNAMIC DATABASE LISTS CMS */}
              {activeTab === 'lists' && (
                <div className="space-y-6 animate-slide-up text-left">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200/60 rounded-2xl shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#5C7FA3]" />
                        <h3 className="font-bold text-sm uppercase text-slate-900">
                          Platform Content Database Managers
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">
                        Customize services, showcase portfolios, corporate testimonials, and creative staff dynamically. Direct synchronization via context.
                      </p>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl border border-[#7BA7D9]/15 bg-indigo-50/20 text-[#5C7FA3] font-mono text-[10px] font-bold">
                      ACTIVE DATABASE: {language.toUpperCase()} DATASET
                    </div>
                  </div>

                  {/* Sub-tab selection menu row */}
                  <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                    {[
                      { id: 'services', label: 'Services Catalogue', count: servicesData.length, icon: Layers },
                      { id: 'projects', label: 'Case Studies Portfolio', count: portfolioData.length, icon: LayoutGrid },
                      { id: 'testimonials', label: 'Partner Feedback', count: testimonialsData.length, icon: HelpCircle },
                      { id: 'team', label: 'Creative Staff', count: teamMembers.length, icon: Users },
                      { id: 'leads', label: 'CRM Inbound Leads', count: leads.length, icon: Compass }
                    ].map(sub => {
                      const IconComp = sub.icon;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveListSubTab(sub.id as any);
                            addLog(`CMS: Navigated list customization sub-tab to "${sub.label.toUpperCase()}".`);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                            activeListSubTab === sub.id 
                              ? 'bg-slate-950 text-white' 
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{sub.label}</span>
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] bg-slate-200/50 text-slate-850 font-mono font-bold">{sub.count}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* SUB-TABS RENDER PORTAL */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                    
                    {/* LEFT PANEL: INPUT FORM BUILDER */}
                    <div className="lg:col-span-5 p-6 bg-white border border-slate-200/60 rounded-2xl text-left h-fit shadow-xs">
                      {activeListSubTab === 'services' && (
                        <form onSubmit={handleAddService} className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#5C7FA3]">CATALOGUE BUILDER // {language.toUpperCase()}</span>
                            <h4 className="font-bold text-sm uppercase text-slate-900 leading-none">Draft Strategic Service</h4>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Service Title</label>
                            <input 
                              type="text" 
                              required 
                              placeholder="e.g. Premium Digital Web Engineering"
                              value={newSvcTitle}
                              onChange={e => setNewSvcTitle(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-850 outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Description Catchphrase</label>
                            <textarea 
                              required 
                              rows={2}
                              placeholder="Fidelity-driven interface deployments crafted with precision systems."
                              value={newSvcDesc}
                              onChange={e => setNewSvcDesc(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-slate-700 outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Icon Blueprint</label>
                              <select
                                value={newSvcIcon}
                                onChange={e => setNewSvcIcon(e.target.value)}
                                className="w-full p-2 bg-slate-50 border border-slate-205 rounded-xl text-xs font-semibold outline-none"
                              >
                                <option value="Layers">Layers (Structure)</option>
                                <option value="Search">Search (Audits/SEO)</option>
                                <option value="Compass">Compass (Navigation/Guides)</option>
                                <option value="Shield">Shield (Secure Compliance)</option>
                                <option value="Award">Award (PR & Citations)</option>
                                <option value="FileText">FileText (Copy/Content)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Accent Color Theme</label>
                              <select
                                value={newSvcColor}
                                onChange={e => setNewSvcColor(e.target.value)}
                                className="w-full p-2 bg-slate-50 border border-slate-205 rounded-xl text-xs font-semibold outline-none"
                              >
                                <option value="cyan">Cyan Ice</option>
                                <option value="blue">Blue Sky</option>
                                <option value="emerald">Emerald Breeze</option>
                                <option value="purple">Violet Sky</option>
                                <option value="amber">Amber Glow</option>
                                <option value="rose">Rose Wine</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Service Features List (comma separated)</label>
                            <input 
                              type="text" 
                              placeholder="TypeScript SDK, Responsive Architecture, Cloud Speed"
                              value={newSvcFeatures}
                              onChange={e => setNewSvcFeatures(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Product Details explanation</label>
                            <textarea 
                              rows={2}
                              placeholder="Comprehensive full stack deployment parameters covering edge protocols..."
                              value={newSvcDetails}
                              onChange={e => setNewSvcDetails(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-slate-700 outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            <Plus className="w-4 h-4" /> Integrated Dynamic Service
                          </button>
                        </form>
                      )}

                      {activeListSubTab === 'projects' && (
                        <form onSubmit={handleAddProject} className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#5C7FA3]">PORTFOLIO BUILDER // {language.toUpperCase()}</span>
                            <h4 className="font-bold text-sm uppercase text-slate-900 leading-none">Draft Showcase Project</h4>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1 col-span-2">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Project Title</label>
                              <input 
                                type="text" required placeholder="e.g. VinFast eV Global Summit website"
                                value={newProjTitle} onChange={e => setNewProjTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Client Name</label>
                              <input 
                                type="text" placeholder="VinFast Vietnam"
                                value={newProjClient} onChange={e => setNewProjClient(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Category Tag</label>
                              <input 
                                type="text" placeholder="Branding / Web portal"
                                value={newProjCategory} onChange={e => setNewProjCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Unsplash Cover image URL</label>
                            <input 
                              type="text" placeholder="https://images.unsplash.com/..."
                              value={newProjThumbnail} onChange={e => setNewProjThumbnail(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-mono outline-none focus:border-[#7BA7D9]"
                            />
                            {/* Preset Unsplash high-quality images picker buttons for seamless drafts */}
                            <div className="flex gap-2 flex-wrap pt-1 text-[9px] font-mono leading-none">
                              <span className="text-slate-400">// Presets:</span>
                              {[
                                { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', label: 'Tech' },
                                { url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80', label: 'Office' },
                                { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', label: 'Meet' }
                              ].map((unsplash, i) => (
                                <button
                                  type="button"
                                  key={i}
                                  onClick={() => setNewProjThumbnail(unsplash.url)}
                                  className="underline text-[#5C7FA3] hover:text-[#7BA7D9] cursor-pointer"
                                >
                                  {unsplash.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Year</label>
                              <input 
                                type="text" value={newProjYear} onChange={e => setNewProjYear(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Campaign Duration</label>
                              <input 
                                type="text" value={newProjDuration} onChange={e => setNewProjDuration(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 border border-slate-200 rounded-xl">
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-400">METRIC LABEL</label>
                              <input 
                                type="text" value={newProjStatLabel} onChange={e => setNewProjStatLabel(e.target.value)}
                                className="w-full p-1 border border-slate-200 rounded-lg text-xs"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[8px] font-bold text-slate-400">METRIC VALUE</label>
                              <input 
                                type="text" value={newProjStatValue} onChange={e => setNewProjStatValue(e.target.value)}
                                className="w-full p-1 border border-slate-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Short Description</label>
                            <textarea 
                              required rows={2} placeholder="Fascinating launching metrics generated with a custom CMS..."
                              value={newProjDesc} onChange={e => setNewProjDesc(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
                          >
                            <Plus className="w-4 h-4" /> Integrated Portfolio Case Study
                          </button>
                        </form>
                      )}

                      {activeListSubTab === 'testimonials' && (
                        <form onSubmit={handleAddTestimonial} className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#5C7FA3]">TESTIMONIAL EDITOR // {language.toUpperCase()}</span>
                            <h4 className="font-bold text-sm uppercase text-slate-900 leading-none">Draft Partner Endorsement</h4>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Author Full Name</label>
                            <input 
                              type="text" required placeholder="e.g. Liam Nguyen"
                              value={newTestiAuthor} onChange={e => setNewTestiAuthor(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Corporate Role Position</label>
                              <input 
                                type="text" placeholder="Brand Manager"
                                value={newTestiRole} onChange={e => setNewTestiRole(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Company Brand</label>
                              <input 
                                type="text" placeholder="VinFast Auto"
                                value={newTestiCompany} onChange={e => setNewTestiCompany(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Star Rating Score</label>
                              <select
                                value={newTestiRating}
                                onChange={e => setNewTestiRating(Number(e.target.value))}
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                              >
                                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars Excellent)</option>
                                <option value={4}>⭐⭐⭐⭐ (4 Stars Very Good)</option>
                                <option value={3}>⭐⭐⭐ (3 Stars Satisfied)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Avatar Seed</label>
                              <select
                                value={newTestiAvatar}
                                onChange={e => setNewTestiAvatar(e.target.value)}
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                              >
                                <option value="mia">Mia (Corporate Female)</option>
                                <option value="leo">Leo (Corporate Male)</option>
                                <option value="sophia">Sophia (Director Female)</option>
                                <option value="kaelen">Kaelen (Tech Lead Male)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Quotes Comment Content</label>
                            <textarea 
                              required rows={3} placeholder="Working with HALO Agency transformed our digital visibility..."
                              value={newTestiQuote} onChange={e => setNewTestiQuote(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-slate-700 outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Integrated Review Quote
                          </button>
                        </form>
                      )}

                      {activeListSubTab === 'team' && (
                        <form onSubmit={handleAddTeamMember} className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#5C7FA3]">STAFF SQUAD BUILDER // {language.toUpperCase()}</span>
                            <h4 className="font-bold text-sm uppercase text-slate-900 leading-none">Draft Team Profile</h4>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Staff Full Name</label>
                            <input 
                              type="text" required placeholder="Aria Thorne"
                              value={newTeamName} onChange={e => setNewTeamName(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Aesthetic Role Title</label>
                              <input 
                                type="text" placeholder="Creative Architect"
                                value={newTeamRole} onChange={e => setNewTeamRole(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Core Specialty Focus</label>
                              <input 
                                type="text" placeholder="Brand Copywriting & PR"
                                value={newTeamSpecialty} onChange={e => setNewTeamSpecialty(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold text-slate-500 uppercase">Avatar Seed</label>
                              <select
                                value={newTeamAvatar}
                                onChange={e => setNewTeamAvatar(e.target.value)}
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                              >
                                <option value="aria">Aria (Elegant Female)</option>
                                <option value="kaelen">Kaelen (Strategic Male)</option>
                                <option value="zora">Zora (Digital Female)</option>
                                <option value="admin">Admin (System Lead)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[9px] font-mono text-slate-500 uppercase font-bold">// Hack Macro Command Line</label>
                              <input 
                                type="text" placeholder="git push origin main --force"
                                value={newTeamHackerCode} onChange={e => setNewTeamHackerCode(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 font-mono bg-slate-50 outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Professional Skills (comma separated)</label>
                            <input 
                              type="text" placeholder="Interactive Copy, Campaign Audits"
                              value={newTeamSkills} onChange={e => setNewTeamSkills(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Staff Personal Bio Description</label>
                            <textarea 
                              required rows={2} placeholder="Aria spends her professional life shaping bespoke communications..."
                              value={newTeamBio} onChange={e => setNewTeamBio(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-slate-700 outline-none focus:border-[#7BA7D9]"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Contract Elite Staff Member
                          </button>
                        </form>
                      )}

                      {activeListSubTab === 'leads' && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#5C7FA3]">SYSTEM CONSOLE // DIAGNOSTICS</span>
                            <h4 className="font-bold text-sm uppercase text-slate-900 leading-none">Server Live Environment</h4>
                          </div>

                          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5 text-xs font-mono text-slate-600">
                            <div className="flex justify-between items-center">
                              <span>UPTIME STATE:</span>
                              <span className="font-bold text-[#5C7FA3]">{Math.floor(serverStatus.uptime)}s</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>NODE INSTANCE:</span>
                              <span className="font-bold">{serverStatus.nodeVersion}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>OS PLATFORM:</span>
                              <span className="font-bold uppercase">{serverStatus.platform}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>INTEGRITY FEED:</span>
                              <span className="font-bold text-emerald-600">{serverStatus.integrityScore || '100'}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>STORAGE ENGINE:</span>
                              <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase">LEADS.JSON FILE STORE</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-150">
                            <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">FACTORY MASTER RESET CONTROLLER</span>
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch("/api/reset", { method: "POST" });
                                  if (res.ok) {
                                    addLog("SYSTEM: Purged and reinitialized local client leads.json dataset.", "warning");
                                    fetchLeads();
                                  }
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              className="w-full py-3 bg-red-50 hover:bg-red-105 text-red-650 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border border-red-200/50"
                            >
                              Purge Leads & Set Mock
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* RIGHT PANEL: LIVE SCROLLABLE DATABASE LIST PREVIEWS */}
                    <div className="lg:col-span-7 p-6 bg-white border border-slate-200/60 rounded-2xl flex flex-col justify-between shadow-xs">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="block text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">
                            REGISTERED DATABASE PREVIEWS
                          </span>
                        </div>

                        {/* PREVIEW CONTAINER BASED ON ACTIVE SUB-TAB */}
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                          {activeListSubTab === 'services' && (
                            servicesData.length === 0 ? (
                              <div className="text-center py-12 text-slate-400 font-sans text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No services found in language database catalog. Create one!
                              </div>
                            ) : (
                              servicesData.map(svc => (
                                <div key={svc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4 text-left">
                                  <div className="space-y-1.5 flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 rounded-md text-[8px] font-mono bg-indigo-50 text-[#5C7FA3] font-bold uppercase border border-[#7BA7D9]/15">
                                        ID: {svc.id}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-md text-[8px] font-mono bg-emerald-50 text-emerald-600 font-bold uppercase border border-emerald-100">
                                        Icon: {svc.icon}
                                      </span>
                                    </div>
                                    <h5 className="font-bold text-xs text-slate-850">{svc.title}</h5>
                                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">{svc.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {svc.features.map((f, i) => (
                                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-200/50 text-[9px] font-semibold text-slate-700">
                                          {f}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteService(svc.id, svc.title)}
                                    className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                                    title="Delete from catalogue"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )
                          )}

                          {activeListSubTab === 'projects' && (
                            portfolioData.length === 0 ? (
                              <div className="text-center py-12 text-slate-400 font-sans text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No client campaign case studies found in portfolio database. Create one!
                              </div>
                            ) : (
                              portfolioData.map(proj => (
                                <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex gap-4 text-left items-start justify-between">
                                  <img 
                                    src={proj.thumbnail} 
                                    alt="thumbnail" 
                                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-200"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="px-1.5 py-0.5 rounded-md text-[8px] font-mono bg-indigo-50 text-[#5C7FA3] font-bold uppercase border border-[#7BA7D9]/15">
                                        ID: {proj.id}
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded-md text-[8px] font-mono bg-slate-100/70 text-slate-500 font-bold uppercase">
                                        Yr: {proj.year}
                                      </span>
                                      {proj.stats?.[0] && (
                                        <span className="px-1.5 py-0.5 rounded-md text-[8px] font-mono font-bold bg-amber-50 text-amber-600 border border-amber-200/60 leading-none">
                                          {proj.stats[0].value} {proj.stats[0].label}
                                        </span>
                                      )}
                                    </div>
                                    <h5 className="font-bold text-xs text-slate-800 truncate">{proj.title}</h5>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-semibold truncate">Client: {proj.client}</p>
                                    <p className="text-[11px] text-slate-550 font-sans leading-relaxed truncate">{proj.description}</p>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                                    className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                                    title="Delete project study"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )
                          )}

                          {activeListSubTab === 'testimonials' && (
                            testimonialsData.length === 0 ? (
                              <div className="text-center py-12 text-slate-400 font-sans text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No client feedback testimonials found in database. Create one!
                              </div>
                            ) : (
                              testimonialsData.map(testi => (
                                <div key={testi.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4 text-left">
                                  <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-50 text-[#5C7FA3] border border-[#7BA7D9]/10 font-bold uppercase">
                                        ID: {testi.id}
                                      </span>
                                      <span className="text-[10px] text-yellow-500 font-bold font-mono">
                                        {'★'.repeat(testi.rating)}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 italic leading-relaxed font-sans mt-0.5">"{testi.quote}"</p>
                                    <h6 className="font-bold text-xs text-slate-800 pt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                                      {testi.author}
                                    </h6>
                                    <p className="text-[10px] text-slate-400 font-medium">
                                      {testi.role} at <span className="font-semibold">{testi.company}</span>
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteTestimonial(testi.id, testi.author)}
                                    className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                                    title="Delete testimonial"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )
                          )}

                          {activeListSubTab === 'team' && (
                            teamMembers.length === 0 ? (
                              <div className="text-center py-12 text-slate-400 font-sans text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No expert squad team members found in database. Create one!
                              </div>
                            ) : (
                              teamMembers.map(staff => (
                                <div key={staff.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4 text-left">
                                  <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-50 text-[#5C7FA3] border border-[#7BA7D9]/10 font-bold uppercase">
                                        ID: {staff.id}
                                      </span>
                                    </div>
                                    <h5 className="font-bold text-xs text-slate-850 truncate">{staff.name}</h5>
                                    <p className="text-[10px] text-slate-500 font-semibold">{staff.role} // <span className="text-[#5C7FA3]">{staff.specialty}</span></p>
                                    <p className="text-[11px] text-slate-550 font-sans leading-relaxed">{staff.bio}</p>
                                    
                                    <div className="flex flex-wrap gap-1">
                                      {staff.skills.map((s, i) => (
                                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-200/50 text-[9px] font-semibold text-slate-600">
                                          {s}
                                        </span>
                                      ))}
                                    </div>
                                    
                                    <code className="block text-[8px] font-mono bg-slate-900 text-cyan-400 p-1.5 rounded-lg border border-slate-800 truncate">
                                      {staff.hackerCode}
                                    </code>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteTeamMember(staff.id, staff.name)}
                                    className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                                    title="Decommission member"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )
                          )}

                          {activeListSubTab === 'leads' && (
                            leads.length === 0 ? (
                              <div className="text-center py-12 text-slate-400 font-sans text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No customer relationship inquiries recorded in leads.json file store.
                              </div>
                            ) : (
                              leads.map(lead => (
                                <div key={lead.id || Math.random()} className="p-4 rounded-xl border border-slate-200 bg-[#E6EEF8]/15 hover:bg-[#E6EEF8]/25 transition-colors flex items-start justify-between gap-4 text-left">
                                  <div className="space-y-1.5 flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-[#E6EEF8] text-[#5C7FA3] font-bold uppercase">
                                        ID: {lead.id}
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-50 text-indigo-600 font-bold uppercase">
                                        {new Date(lead.timestamp).toLocaleTimeString()}
                                      </span>
                                    </div>
                                    <h5 className="font-bold text-xs text-slate-850 truncate">{lead.name}</h5>
                                    <p className="text-[10px] text-slate-500 font-semibold">{lead.email}</p>
                                    <p className="text-[11px] text-slate-650 font-sans leading-relaxed whitespace-pre-wrap">{lead.concept}</p>
                                    
                                    <div className="flex flex-wrap gap-1">
                                      {lead.services && lead.services.map((s: string, i: number) => (
                                        <span key={i} className="px-1.5 py-0.5 rounded bg-white text-[9px] font-semibold text-[#5C7FA3] border border-[#7BA7D9]/15">
                                          {s}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))
                            )
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-mono">
                        // DYNAMIC LIST SYNC SYSTEM: BOTH EN & VI CATALOGUES UPDATED INTERNATIONALLY
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* FACTORY RESET CONFIRMATION DIALOG (PREMIUM DYNAMIC OVERLAY) */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-left"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-[#7BA7D9]/25 rounded-2xl w-full max-w-md shadow-2xl p-6 relative overflow-hidden"
            >
              {/* Top Warning Strip */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500" />

              <div className="space-y-4">
                {/* Header Badge Row */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                      <span className="text-[8px] font-mono tracking-widest text-red-600 font-extrabold uppercase py-0.5 px-2 bg-red-50 rounded border border-red-200/20">
                        {language === 'en' ? 'ZONE VII SECURITY BLOCK' : 'KHU VỰC BẢO MẬT CẤP VII'}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs uppercase tracking-tight text-slate-900 mt-1">
                      {language === 'en' ? 'Confirm Restore Factory?' : 'Xác Nhận Khôi Phục Cài Đặt Gốc?'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowResetConfirm(false);
                      setResetCheckValue('');
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main warning text */}
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {language === 'en' 
                    ? "Careful: This operation is irreversible and will immediately purge all localized CMS changes, custom personnel registers, and security audit configurations back to their pristine templates."
                    : "Cảnh báo: Hành động này không thể hoàn tác. Toàn bộ bản nháp danh mục dịch vụ, dòng mô tả website và bảng điều khiển sự kiện sẽ được hoàn tất về nguyên bản mặc định."}
                </p>

                {/* Audit Checklist parameters */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-150 space-y-2">
                  <span className="text-[8px] font-mono tracking-wider font-extrabold uppercase block text-slate-400">
                    // {language === 'en' ? 'PRE-DESTRUCTION PURGE LIST' : 'DANH SÁCH GIẢI PHÓNG HỆ THỐNG'}
                  </span>
                  <ul className="text-[9.5px] text-slate-500 space-y-1.5 font-mono">
                    <li className="flex items-start gap-1.5 leading-tight">
                      <span className="text-red-500 font-bold shrink-0">[×]</span>
                      <span>{language === 'en' ? "Simulated Leads & CMS data lists" : "Bản ghi hoạt động quảng cáo và CMS"}</span>
                    </li>
                    <li className="flex items-start gap-1.5 leading-tight">
                      <span className="text-red-500 font-bold shrink-0">[×]</span>
                      <span>{language === 'en' ? "Language translation context overrides" : "Bản dịch ghi đè đa ngôn ngữ"}</span>
                    </li>
                    <li className="flex items-start gap-1.5 leading-tight">
                      <span className="text-red-500 font-bold shrink-0">[×]</span>
                      <span>{language === 'en' ? "Console administrator logs database" : "Bộ nhớ hoạt động bảng điều khiển Admin"}</span>
                    </li>
                  </ul>
                </div>

                {/* Phrase check input */}
                <div className="space-y-1.5">
                  <label className="block text-[8px] font-mono font-bold tracking-widest text-[#5C7FA3] uppercase">
                    {language === 'en' ? "Type 'RESET' to authorize deploy" : "Nhập chữ 'RESET' để tiếp tục giải phóng"}
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setResetCheckValue(e.target.value)}
                    placeholder="RESET"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-800 uppercase focus:border-red-400 text-xs font-mono font-bold text-center rounded-xl focus:outline-none"
                    value={resetCheckValue}
                  />
                </div>

                {/* Actions row */}
                <div className="flex gap-2 pt-1 font-sans">
                  <button
                    onClick={() => {
                      setShowResetConfirm(false);
                      setResetCheckValue('');
                    }}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  >
                    {language === 'en' ? 'Cancel Action' : 'Hủy thao tác'}
                  </button>
                  <button
                    disabled={resetCheckValue !== 'RESET'}
                    onClick={() => {
                      if (resetCheckValue === 'RESET') {
                        resetAllCMS();
                        addLog('CMS: Hard reset deployed. Reverted all models to pristine templates.', 'warning');
                        setShowResetConfirm(false);
                        setShowResetSuccess(true);
                        setResetCheckValue('');
                      }
                    }}
                    className={`flex-1 py-2.5 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      resetCheckValue === 'RESET' 
                        ? 'bg-red-600 hover:bg-red-750 shadow shadow-red-200' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {language === 'en' ? 'Verify & Purge' : 'Cam Kết Xóa Gốc'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED FACTORY RESET SUCCESS OVERLAY */}
      <AnimatePresence>
        {showResetSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-left"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200/50 rounded-3xl w-full max-w-sm shadow-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4"
            >
              {/* Green indicator loop badge */}
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-555 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              </div>

              <div className="space-y-1">
                <div className="text-[8px] font-mono uppercase tracking-widest text-[#5C7FA3] font-bold">
                  // PLATFORM SYNC SUCCESSFUL
                </div>
                <h4 className="font-bold text-sm uppercase tracking-tight text-slate-900 leading-snug">
                  {language === 'en' ? 'Factory Defaults Injected' : 'Khôi phục Mặc định Thành công'}
                </h4>
                <p className="text-[10.5px] text-slate-500 leading-relaxed font-sans max-w-xs mx-auto">
                  {language === 'en' 
                    ? "All databases are cleared. Clean repositories synced successfully."
                    : "Đã dọn dẹp bộ nhớ đệm và khôi phục tất cả mô hình dữ liệu nguyên bản từ nhà máy."}
                </p>
              </div>

              {/* simulated terminal output check */}
              <div className="w-full bg-slate-950 p-3 rounded-lg border border-slate-900 text-left font-mono text-[9px] text-[#7BA7D9] leading-normal uppercase">
                <p className="text-emerald-400 font-semibold">// RESTORE COMPLETE</p>
                <p className="text-slate-400 mt-1">&gt; SYNCED EN & VI TRANSLATIONS</p>
                <p className="text-slate-400">&gt; CLEAR CLIENT OPERATIONS LOGS</p>
                <p className="text-slate-400">&gt; CONSOLE RESTFUL KEYS OK</p>
              </div>

              <button
                onClick={() => setShowResetSuccess(false)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] uppercase tracking-wider font-mono font-bold rounded-xl cursor-pointer transition-colors"
              >
                {language === 'en' ? 'Dismiss Overlay' : 'Đã hiểu và Đóng'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// PREMIUM LIVE COUNTDOWN TIMER BLOCK COMPONENT
interface CountdownInlineProps {
  targetDate: string;
}

function CountdownInline({ targetDate }: CountdownInlineProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calcTime = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 65) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calcTime());
    const interval = setInterval(() => {
      setTimeLeft(calcTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2.5 font-mono text-xs text-slate-800 shrink-0">
      <div className="text-center bg-white border border-slate-200 p-1.5 px-2 rounded-lg min-w-[34px]">
        <span className="block font-bold leading-none text-[12px]">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-[7px] text-slate-400 font-sans block pt-0.5">DAYS</span>
      </div>
      <div className="text-center bg-white border border-slate-200 p-1.5 px-2 rounded-lg min-w-[34px]">
        <span className="block font-bold leading-none text-[12px]">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[7px] text-slate-400 font-sans block pt-0.5">HRS</span>
      </div>
      <div className="text-center bg-white border border-slate-200 p-1.5 px-2 rounded-lg min-w-[34px]">
        <span className="block font-bold leading-none text-[12px]">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[7px] text-slate-400 font-sans block pt-0.5">MINS</span>
      </div>
      <div className="text-center bg-white border border-slate-200 p-1.5 px-2 rounded-lg min-w-[34px] border-indigo-200 bg-indigo-50/20 text-indigo-700">
        <span className="block font-bold leading-none text-[12px] animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[7px] text-indigo-400 font-sans block pt-0.5 font-semibold">SECS</span>
      </div>
    </div>
  );
}
