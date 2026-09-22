import {
  initialCourses,
  initialProjects,
  initialLiveSessions,
  initialVideoPreviews,
  initialTestimonials,
  initialStudents,
  initialTransactions,
  initialCertificates
} from '../data/initialData.js';

class StateStore {
  constructor() {
    this.listeners = [];
    this.storageKey = 'apexlearn_platform_state_v2';
    this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.courses = parsed.courses || initialCourses;
        this.projects = parsed.projects || initialProjects;
        this.liveSessions = parsed.liveSessions || initialLiveSessions;
        this.students = parsed.students || initialStudents;
        this.transactions = parsed.transactions || initialTransactions;
        this.certificates = parsed.certificates || initialCertificates;
        this.studentNotes = parsed.studentNotes || {};
        this.studentUser = parsed.studentUser || null; // Authenticated student session
        this.adminUser = parsed.adminUser || null;     // Authenticated admin session
      } else {
        this.resetToDefaults();
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    this.courses = JSON.parse(JSON.stringify(initialCourses));
    this.projects = JSON.parse(JSON.stringify(initialProjects));
    this.liveSessions = JSON.parse(JSON.stringify(initialLiveSessions));
    this.students = JSON.parse(JSON.stringify(initialStudents));
    this.transactions = JSON.parse(JSON.stringify(initialTransactions));
    this.certificates = JSON.parse(JSON.stringify(initialCertificates));
    this.studentNotes = {};
    this.studentUser = null;
    this.adminUser = null;
    this.saveState();
  }

  saveState() {
    try {
      const snapshot = {
        courses: this.courses,
        projects: this.projects,
        liveSessions: this.liveSessions,
        students: this.students,
        transactions: this.transactions,
        certificates: this.certificates,
        studentNotes: this.studentNotes,
        studentUser: this.studentUser,
        adminUser: this.adminUser
      };
      localStorage.setItem(this.storageKey, JSON.stringify(snapshot));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify(event, payload) {
    this.saveState();
    this.listeners.forEach((listener) => {
      try {
        listener(event, payload, this);
      } catch (err) {
        console.error('Error in state listener:', err);
      }
    });
  }

  // ==========================================
  // AUTHENTICATION & ACCESS GUARDS
  // ==========================================

  isStudentAuthenticated() {
    return Boolean(this.studentUser);
  }

  isAdminAuthenticated() {
    return Boolean(this.adminUser);
  }

  loginStudent(email, password) {
    // Find matching registered student or create default profile for demo
    let student = this.students.find((s) => s.email.toLowerCase() === (email || '').trim().toLowerCase());
    if (!student) {
      // Default to Rahul Sharma for demo evaluation
      student = this.students[0];
    }
    this.studentUser = {
      id: student.id,
      name: student.name,
      email: student.email,
      avatar: student.avatar
    };
    this.notify('STUDENT_LOGGED_IN', { user: this.studentUser });
    return this.studentUser;
  }

  signupStudent(name, email, password) {
    const newId = `std-${Date.now()}`;
    const newStudent = {
      id: newId,
      name: name || 'New Scholar',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      enrolledCourses: [],
      progress: {},
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    this.students.unshift(newStudent);
    this.studentUser = {
      id: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
      avatar: newStudent.avatar
    };
    this.notify('STUDENT_SIGNED_UP', { user: this.studentUser });
    return this.studentUser;
  }

  logoutStudent() {
    this.studentUser = null;
    this.notify('STUDENT_LOGGED_OUT', {});
  }

  loginAdmin(email, password) {
    this.adminUser = {
      id: 'admin-001',
      name: 'Dr. Vikram Sen',
      email: email || 'director@apexlearn.edu',
      role: 'Platform Director'
    };
    this.notify('ADMIN_LOGGED_IN', { user: this.adminUser });
    return this.adminUser;
  }

  logoutAdmin() {
    this.adminUser = null;
    this.notify('ADMIN_LOGGED_OUT', {});
  }

  // Active Student Profile
  getCurrentStudent() {
    if (this.studentUser) {
      const found = this.students.find((s) => s.id === this.studentUser.id);
      if (found) return found;
    }
    return this.students[0];
  }

  // ==========================================
  // COURSE MANAGEMENT
  // ==========================================

  getCourses() {
    return this.courses;
  }

  getCourseById(courseId) {
    return this.courses.find((c) => c.id === courseId);
  }

  updateCoursePrice(courseId, newPrice, newOriginalPrice) {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.price = Number(newPrice);
      if (newOriginalPrice) course.originalPrice = Number(newOriginalPrice);
      this.notify('COURSE_PRICE_UPDATED', { courseId, price: course.price });
    }
  }

  saveCourse(courseData) {
    const existingIndex = this.courses.findIndex((c) => c.id === courseData.id);
    if (existingIndex >= 0) {
      this.courses[existingIndex] = { ...this.courses[existingIndex], ...courseData };
    } else {
      this.courses.unshift(courseData);
    }
    this.notify('COURSES_UPDATED', { course: courseData });
  }

  deleteCourse(courseId) {
    this.courses = this.courses.filter((c) => c.id !== courseId);
    this.notify('COURSE_DELETED', { courseId });
  }

  // ==========================================
  // PROGRESS & CERTIFICATION
  // ==========================================

  isLessonCompleted(courseId, lessonId) {
    const student = this.getCurrentStudent();
    if (!student || !student.progress || !student.progress[courseId]) return false;
    return student.progress[courseId].completedLessonIds.includes(lessonId);
  }

  toggleLessonCompletion(courseId, lessonId) {
    const student = this.getCurrentStudent();
    if (!student) return;
    if (!student.progress) student.progress = {};
    if (!student.progress[courseId]) {
      student.progress[courseId] = { completedLessonIds: [], percent: 0 };
    }

    const completedIds = student.progress[courseId].completedLessonIds;
    const index = completedIds.indexOf(lessonId);
    if (index >= 0) {
      completedIds.splice(index, 1);
    } else {
      completedIds.push(lessonId);
    }

    const course = this.getCourseById(courseId);
    let totalLessons = 0;
    if (course && course.modules) {
      course.modules.forEach((m) => {
        totalLessons += (m.lessons || []).length;
      });
    }

    const percent = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0;
    student.progress[courseId].percent = percent;

    if (percent === 100) {
      this.checkAndIssueCertificate(student, course);
    }

    this.notify('LESSON_PROGRESS_UPDATED', { courseId, lessonId, percent });
  }

  checkAndIssueCertificate(student, course) {
    const existing = this.certificates.find(
      (cert) => cert.studentId === student.id && cert.courseId === course.id
    );
    if (!existing) {
      const newCert = {
        id: `CERT-${course.id.toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: student.id,
        studentName: student.name,
        courseId: course.id,
        courseTitle: course.title,
        instructor: 'Dr. Vikram Sen',
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        verified: true,
        credentialUrl: `https://apexlearn.edu/verify/`
      };
      this.certificates.unshift(newCert);
      this.notify('CERTIFICATE_ISSUED', { certificate: newCert });
    }
  }

  // ==========================================
  // PAYMENTS & ENROLLMENT
  // ==========================================

  isEnrolled(courseId) {
    const student = this.getCurrentStudent();
    return student ? student.enrolledCourses.includes(courseId) : false;
  }

  processSuccessfulPayment(paymentDetails) {
    const { courseId, studentName, studentEmail, amount, paymentId, orderId, method } = paymentDetails;
    
    // Ensure student session is active
    if (!this.studentUser) {
      this.loginStudent(studentEmail, '');
    }

    const student = this.getCurrentStudent();
    const course = this.getCourseById(courseId);

    const newTx = {
      id: `tx-${Date.now()}`,
      studentName: studentName || (student ? student.name : 'Rahul Sharma'),
      studentEmail: studentEmail || (student ? student.email : 'rahul.sharma@example.com'),
      courseId,
      courseTitle: course ? course.title : 'Selected Course',
      amount,
      paymentId: paymentId || `pay_${Math.random().toString(36).substring(2, 12)}`,
      orderId: orderId || `order_${Math.random().toString(36).substring(2, 10)}`,
      method: method || 'UPI',
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Successful'
    };
    this.transactions.unshift(newTx);

    if (student && !student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
      if (!student.progress[courseId]) {
        student.progress[courseId] = { completedLessonIds: [], percent: 0 };
      }
    }

    this.notify('PAYMENT_PROCESSED', { transaction: newTx, courseId });
    return newTx;
  }

  saveNote(lessonId, noteText) {
    this.studentNotes[lessonId] = noteText;
    this.notify('NOTE_SAVED', { lessonId, noteText });
  }

  getNote(lessonId) {
    return this.studentNotes[lessonId] || '';
  }

  getLiveSessions() {
    return this.liveSessions;
  }

  addLiveSession(sessionData) {
    const newSession = {
      id: `live-${Date.now()}`,
      ...sessionData
    };
    this.liveSessions.unshift(newSession);
    this.notify('LIVE_SESSION_ADDED', { session: newSession });
  }

  getProjects() {
    return this.projects;
  }

  updateProjectStatus(projectId, status) {
    const proj = this.projects.find((p) => p.id === projectId);
    if (proj) {
      proj.status = status;
      this.notify('PROJECT_STATUS_UPDATED', { projectId, status });
    }
  }

  findCertificate(certId) {
    return this.certificates.find((c) => c.id.toLowerCase() === certId.trim().toLowerCase());
  }
}

export const stateStore = new StateStore();
