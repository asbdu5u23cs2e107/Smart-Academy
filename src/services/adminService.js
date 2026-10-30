// Mock data for development
// Replace with actual API calls when backend is ready

// Mock data
const MOCK_STATS = {
  totalStudents: 12450,
  activeStudents: 8920,
  totalEnrollments: 15820,
  monthlyRevenue: 840000,
  placementRate: 53
};

const MOCK_ENROLLMENT_TRENDS = [
  { month: 'Jan', newEnrollments: 900, completed: 500 },
  { month: 'Feb', newEnrollments: 1600, completed: 850 },
  { month: 'Mar', newEnrollments: 1450, completed: 720 },
  { month: 'Apr', newEnrollments: 1800, completed: 1100 },
  { month: 'May', newEnrollments: 1550, completed: 1000 },
  { month: 'Jun', newEnrollments: 1950, completed: 1280 },
  { month: 'Jul', newEnrollments: 1750, completed: 1180 },
  { month: 'Aug', newEnrollments: 2100, completed: 1500 }
];

const MOCK_REVENUE_BREAKDOWN = [
  { name: 'Recorded Courses', value: 50 },
  { name: 'Live Classes', value: 25 },
  { name: 'Other', value: 25 }
];

const MOCK_ACTIVITIES = [
  {
    id: '1',
    type: 'enrollment',
    description: '<b>Arun</b> enrolled in <span className="text-purple-600 font-bold">React JS Mastery</span>',
    time: '10 minutes ago',
    color: 'bg-purple-600'
  },
  {
    id: '2',
    type: 'payment',
    description: 'New payment received from <b>Priya S.</b>',
    time: '45 minutes ago • ₹4,500',
    color: 'bg-emerald-500'
  },
  {
    id: '3',
    type: 'registration',
    description: 'New support ticket: <b>Login Issue</b>',
    time: '2 hours ago • Ticket #4492',
    color: 'bg-amber-400'
  },
  {
    id: '4',
    type: 'completion',
    description: 'System backup completed successfully.',
    time: 'Yesterday',
    color: 'bg-slate-300'
  }
];

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAdminDashboardStats = async (dateRange = 'last30days') => {
  // Simulate API call
  await delay(800);
  
  // Modify mock data based on date range for demo
  let stats = { ...MOCK_STATS };
  if (dateRange === 'today') {
    stats.totalStudents = Math.round(MOCK_STATS.totalStudents * 0.1);
    stats.activeStudents = Math.round(MOCK_STATS.activeStudents * 0.1);
    stats.totalEnrollments = Math.round(MOCK_STATS.totalEnrollments * 0.1);
    stats.monthlyRevenue = Math.round(MOCK_STATS.monthlyRevenue * 0.1);
  } else if (dateRange === 'last7days') {
    stats.totalStudents = Math.round(MOCK_STATS.totalStudents * 0.3);
    stats.activeStudents = Math.round(MOCK_STATS.activeStudents * 0.3);
    stats.totalEnrollments = Math.round(MOCK_STATS.totalEnrollments * 0.3);
    stats.monthlyRevenue = Math.round(MOCK_STATS.monthlyRevenue * 0.3);
  } else if (dateRange === 'last3months') {
    stats.totalStudents = Math.round(MOCK_STATS.totalStudents * 0.7);
    stats.activeStudents = Math.round(MOCK_STATS.activeStudents * 0.7);
    stats.totalEnrollments = Math.round(MOCK_STATS.totalEnrollments * 0.7);
    stats.monthlyRevenue = Math.round(MOCK_STATS.monthlyRevenue * 0.7);
  }
  
  return stats;
};

export const getEnrollmentTrends = async (dateRange = 'last30days') => {
  // Simulate API call
  await delay(800);
  
  // Modify mock data based on date range for demo
  let data = [...MOCK_ENROLLMENT_TRENDS];
  if (dateRange === 'today') {
    data = data.slice(-1);
  } else if (dateRange === 'last7days') {
    data = data.slice(-7);
  } else if (dateRange === 'last3months') {
    data = data.slice(-3);
  } else if (dateRange === 'thisyear') {
    data = data.slice(-6);
  }
  return data;
};

export const getRevenueBreakdown = async (dateRange = 'last30days') => {
  // Simulate API call
  await delay(600);
  
  // Return mock revenue data with slight variations based on date range
  let data = [...MOCK_REVENUE_BREAKDOWN];
  if (dateRange === 'today') {
    data = [
      { name: 'Recorded Courses', value: 45 },
      { name: 'Live Classes', value: 30 },
      { name: 'Other', value: 25 }
    ];
  } else if (dateRange === 'last7days') {
    data = [
      { name: 'Recorded Courses', value: 48 },
      { name: 'Live Classes', value: 28 },
      { name: 'Other', value: 24 }
    ];
  }
  return data;
};

export const getRecentActivity = async (dateRange = 'last30days') => {
  // Simulate API call
  await delay(500);
  
  // Return mock activities
  let activities = [...MOCK_ACTIVITIES];
  
  // Add some variation based on date range
  if (dateRange === 'today') {
    activities = activities.slice(0, 2);
  } else if (dateRange === 'last7days') {
    activities = activities.slice(0, 3);
  }
  
  return activities;
};

// Export all functions as a single object for convenience
const adminService = {
  getAdminDashboardStats,
  getEnrollmentTrends,
  getRevenueBreakdown,
  getRecentActivity
};

export default adminService;