import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  USERS,
  SHIFTS,
  INITIAL_RULINGS,
  INITIAL_KNOWN_ISSUES,
  INITIAL_TASKS,
  INITIAL_ARCHIVE_TASKS,
  ATTENDANCE_LIST,
  DEFAULT_FALLBACK,
  INITIAL_ALERTS,
  GOOGLE_CHAT_MESSAGES,
} from '../data/mockData';
import { soundFX } from '../utils/audio';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged in user (defaults to Associate Sophea Chhun to immediately demo Associate view)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('flowhub_user');
    return saved ? JSON.parse(saved) : USERS[0];
  });

  // Client queue simulation count
  const [queueCount, setQueueCount] = useState(() => {
    const saved = localStorage.getItem('flowhub_queue');
    return saved !== null ? Number(saved) : 38;
  });

  // Fallback instructions set by TL
  const [fallbackInstruction, setFallbackInstruction] = useState(() => {
    const saved = localStorage.getItem('flowhub_fallback');
    return saved ? JSON.parse(saved) : DEFAULT_FALLBACK;
  });

  // Alerts with mandatory acknowledgment
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('flowhub_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  // Tasks (Active turnover sheet)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('flowhub_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Archived tasks
  const [archivedTasks, setArchivedTasks] = useState(() => {
    const saved = localStorage.getItem('flowhub_archive');
    return saved ? JSON.parse(saved) : INITIAL_ARCHIVE_TASKS;
  });

  // Rulings
  const [rulings, setRulings] = useState(() => {
    const saved = localStorage.getItem('flowhub_rulings');
    return saved ? JSON.parse(saved) : INITIAL_RULINGS;
  });

  // Known issues
  const [knownIssues, setKnownIssues] = useState(() => {
    const saved = localStorage.getItem('flowhub_issues');
    return saved ? JSON.parse(saved) : INITIAL_KNOWN_ISSUES;
  });

  // Attendance
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('flowhub_attendance');
    return saved ? JSON.parse(saved) : ATTENDANCE_LIST;
  });

  // Google Chat simulated messages
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('flowhub_chat');
    return saved ? JSON.parse(saved) : GOOGLE_CHAT_MESSAGES;
  });

  // Modals & Drawers state
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [showPitchDeck, setShowPitchDeck] = useState(false);
  const [showAICopilot, setShowAICopilot] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // home, rulings, issues, tasks, attendance
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('flowhub_sidebar');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Global search term
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('flowhub_sidebar', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('flowhub_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('flowhub_queue', String(queueCount));
  }, [queueCount]);

  useEffect(() => {
    localStorage.setItem('flowhub_fallback', JSON.stringify(fallbackInstruction));
  }, [fallbackInstruction]);

  useEffect(() => {
    localStorage.setItem('flowhub_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('flowhub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('flowhub_archive', JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  useEffect(() => {
    localStorage.setItem('flowhub_rulings', JSON.stringify(rulings));
  }, [rulings]);

  useEffect(() => {
    localStorage.setItem('flowhub_issues', JSON.stringify(knownIssues));
  }, [knownIssues]);

  useEffect(() => {
    localStorage.setItem('flowhub_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('flowhub_attendance', JSON.stringify(attendance));
  }, [attendance]);

  // Switch active role/user
  const switchUser = (userId) => {
    const user = USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      soundFX.playNotify();
    }
  };

  // Check if current user has an unacknowledged alert
  const unacknowledgedAlert = alerts.find(
    (alert) => !alert.acknowledgedBy.includes(currentUser.id)
  );

  // Send an alert (Senior, TL, PM)
  const sendAlert = ({ title, message, audience, urgent = true }) => {
    const newAlert = {
      id: `alt_${Date.now()}`,
      sender: `${currentUser.name} (${currentUser.role.toUpperCase()})`,
      senderRole: currentUser.role.toUpperCase(),
      senderId: currentUser.id,
      audience,
      audienceType: 'broadcast',
      urgent,
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      acknowledgedBy: [currentUser.id], // Sender has seen it
    };

    setAlerts((prev) => [newAlert, ...prev]);

    // Play urgent alarm audio
    soundFX.playAlert(urgent);

    // Push notification to simulated Google Chat webhook
    const chatBotMsg = {
      id: `chat_${Date.now()}`,
      channel: '#car-labeling-floor3',
      sender: 'DDD FlowHub Bot',
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `🚨 [UNMISSABLE ALERT] ${currentUser.name} dispatched to ${audience}: "${title}" — Awaiting acknowledgment.`,
    };
    setChatMessages((prev) => [chatBotMsg, ...prev]);

    return newAlert;
  };

  // Acknowledge an alert
  const acknowledgeAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === alertId && !a.acknowledgedBy.includes(currentUser.id)) {
          return {
            ...a,
            acknowledgedBy: [...a.acknowledgedBy, currentUser.id],
          };
        }
        return a;
      })
    );
    soundFX.playSuccess();
  };

  // Update Fallback Instruction (TL or PM)
  const updateFallback = (newFallback) => {
    setFallbackInstruction({
      ...newFallback,
      updatedBy: `${currentUser.name} (${currentUser.role.toUpperCase()})`,
      updatedAt: 'Just now',
    });
    soundFX.playSuccess();

    // Log to Google Chat
    setChatMessages((prev) => [
      {
        id: `chat_${Date.now()}`,
        channel: '#car-labeling-shift1',
        sender: 'DDD FlowHub Bot',
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `📋 [FALLBACK UPDATED] ${currentUser.name} updated the empty queue instruction: "${newFallback.instruction}"`,
      },
      ...prev,
    ]);
  };

  // Auto-Archive & Task Submission
  const submitTask = (taskId, customNotes = '') => {
    const taskToSubmit = tasks.find((t) => t.id === taskId);
    if (!taskToSubmit) return;

    // Remove from active tasks
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    // Add to Auto-Archive
    const archivedItem = {
      id: taskToSubmit.id,
      batch: taskToSubmit.batch,
      labelName: taskToSubmit.labelName,
      assignee: taskToSubmit.assignee,
      status: 'Submitted & Auto-Archived',
      submittedAt: new Date().toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      qaScore: 'Pending Client Audit',
      archivedBy: `Auto-Archive Rule (by ${currentUser.name})`,
      notes: customNotes || taskToSubmit.notes,
    };

    setArchivedTasks((prev) => [archivedItem, ...prev]);
    soundFX.playSuccess();

    // Reduce queue count by 1
    setQueueCount((prev) => Math.max(0, prev - 1));

    // Notify simulated Google Chat
    setChatMessages((prev) => [
      {
        id: `chat_${Date.now()}`,
        channel: '#car-turnover-sync',
        sender: 'DDD FlowHub Bot',
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `✅ [AUTO-ARCHIVE] ${taskToSubmit.id} (${taskToSubmit.labelName}) submitted by ${taskToSubmit.assignee}. Automatically archived to Master Submitted Tab.`,
      },
      ...prev,
    ]);
  };

  // Auto-Turnover: Generate new task links when queue is low/empty
  const triggerAutoTurnover = (batchNumber = 'Batch #903') => {
    const nextId = 9026 + tasks.length + archivedTasks.length;
    const newTasks = [
      {
        id: `TSK-${nextId}`,
        batch: batchNumber,
        labelName: `cam_front_${nextId}.png`,
        subRole: 'first_pass',
        assignee: 'Sophea Chhun',
        assigneeEmail: 'sophea.chhun@digitaldividedata.com',
        status: 'pending',
        url: `https://client-vision.corp/label/${nextId}`,
        priority: 'Normal',
        itemsCount: 15,
        shift: currentUser.shift,
        startedAt: '-',
        notes: 'Auto-turnover batch generated by system.',
      },
      {
        id: `TSK-${nextId + 1}`,
        batch: batchNumber,
        labelName: `cam_rear_${nextId + 1}.png`,
        subRole: 'review_skip',
        assignee: 'David Men',
        assigneeEmail: 'david.men@digitaldividedata.com',
        status: 'pending',
        url: `https://client-vision.corp/label/${nextId + 1}`,
        priority: 'Normal',
        itemsCount: 8,
        shift: currentUser.shift,
        startedAt: '-',
        notes: 'Auto-turnover batch generated by system.',
      },
      {
        id: `TSK-${nextId + 2}`,
        batch: batchNumber,
        labelName: `lidar_bev_${nextId + 2}.pcd`,
        subRole: 'qa',
        assignee: 'Sreymom Roeun',
        assigneeEmail: 'sreymom.r@digitaldividedata.com',
        status: 'pending',
        url: `https://client-vision.corp/label/${nextId + 2}`,
        priority: 'Urgent',
        itemsCount: 20,
        shift: currentUser.shift,
        startedAt: '-',
        notes: 'Pre-audit QA batch item.',
      },
    ];

    setTasks((prev) => [...newTasks, ...prev]);
    setQueueCount((prev) => prev + 25);
    soundFX.playSuccess();

    // Notify Google Chat
    setChatMessages((prev) => [
      {
        id: `chat_${Date.now()}`,
        channel: '#car-turnover-sync',
        sender: 'DDD FlowHub Bot',
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `🔄 [AUTO-TURNOVER] 25 new tasks generated for ${batchNumber}. Links appended to Google Sheets turnover sheet & assigned to Shift 1.`,
      },
      ...prev,
    ]);
  };

  // Add new client ruling (PM only)
  const addRuling = (newRuling) => {
    const rulingItem = {
      id: `CR-2026-${Math.floor(882 + Math.random() * 50)}`,
      status: 'Approved by Client',
      date: new Date().toISOString().split('T')[0],
      author: `${currentUser.name} (PM)`,
      views: 1,
      ...newRuling,
    };
    setRulings((prev) => [rulingItem, ...prev]);
    soundFX.playSuccess();

    // Log to Google Chat
    setChatMessages((prev) => [
      {
        id: `chat_${Date.now()}`,
        channel: '#car-labeling-floor3',
        sender: 'DDD FlowHub Bot',
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `📘 [NEW CLIENT RULING] ${currentUser.name} published: "${rulingItem.title}". Reference code: ${rulingItem.id}. Accessible now on Rulings Board.`,
      },
      ...prev,
    ]);
  };

  // Add Known Issue (Seniors / TLs)
  const addKnownIssue = (newIssue) => {
    const issueItem = {
      id: `ISS-0${Math.floor(45 + Math.random() * 50)}`,
      upvotes: 1,
      updated: 'Just now',
      author: `${currentUser.name} (${currentUser.role.toUpperCase()})`,
      ...newIssue,
    };
    setKnownIssues((prev) => [issueItem, ...prev]);
    soundFX.playSuccess();
  };

  // Upvote issue
  const upvoteIssue = (id) => {
    setKnownIssues((prev) =>
      prev.map((iss) => (iss.id === id ? { ...iss, upvotes: iss.upvotes + 1 } : iss))
    );
    soundFX.playNotify();
  };

  // Reset demo data to defaults
  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(USERS[0]);
    setQueueCount(38);
    setFallbackInstruction(DEFAULT_FALLBACK);
    setAlerts(INITIAL_ALERTS);
    setTasks(INITIAL_TASKS);
    setArchivedTasks(INITIAL_ARCHIVE_TASKS);
    setRulings(INITIAL_RULINGS);
    setKnownIssues(INITIAL_KNOWN_ISSUES);
    setAttendance(ATTENDANCE_LIST);
    setChatMessages(GOOGLE_CHAT_MESSAGES);
    soundFX.playNotify();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        USERS,
        SHIFTS,
        queueCount,
        setQueueCount,
        fallbackInstruction,
        updateFallback,
        alerts,
        sendAlert,
        acknowledgeAlert,
        unacknowledgedAlert,
        tasks,
        archivedTasks,
        submitTask,
        triggerAutoTurnover,
        rulings,
        addRuling,
        knownIssues,
        addKnownIssue,
        upvoteIssue,
        attendance,
        setAttendance,
        chatMessages,
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        searchQuery,
        setSearchQuery,
        showSheetsModal,
        setShowSheetsModal,
        showChatDrawer,
        setShowChatDrawer,
        showPitchDeck,
        setShowPitchDeck,
        showAICopilot,
        setShowAICopilot,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
