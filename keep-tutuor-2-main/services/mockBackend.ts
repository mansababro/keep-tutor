const BASE = '/api';

const post = (url: string, body: any) =>
  fetch(BASE + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());

const patch = (url: string) =>
  fetch(BASE + url, { method: 'PATCH' }).then(r => r.json());

export const mockBackend = {
  login: (email: string, password: string, role: 'ADMIN' | 'TEACHER') =>
    post('/auth/login', { email, password, role }),

  signup: (name: string, email: string, password: string, role: 'TEACHER') =>
    post('/auth/signup', { name, email, password, role }),

  submitTeacherApplication: (formData: any) =>
    post('/teacher/apply', formData),

  requestTutor: (searchCriteria: any) =>
    post('/tutor/request', searchCriteria),

  getDatabase: () =>
    fetch(BASE + '/admin/data').then(r => r.json()),

  approveTeacher: (id: string) =>
    patch(`/admin/approve/${id}`),

  rejectTeacher: (id: string) =>
    patch(`/admin/reject/${id}`),
};
