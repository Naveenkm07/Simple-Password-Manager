// Personal Data Manager Application
class PersonalDataManager {
    constructor() {
        this.data = {
            tasks: [],
            notes: [],
            contacts: [],
            backupHistory: []
        };
        
        this.currentTab = 'dashboard';
        this.editingId = null;
        this.editingType = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.loadSampleData();
        this.setupEventListeners();
        this.updateTime();
        this.renderDashboard();
        this.renderAllTabs();
        
        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
    }

    loadData() {
        try {
            const savedData = localStorage.getItem('pdm-data');
            if (savedData) {
                this.data = { ...this.data, ...JSON.parse(savedData) };
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('pdm-data', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
            this.showToast('Error saving data', 'error');
        }
    }

    loadSampleData() {
        // Only load sample data if no existing data
        if (this.data.tasks.length === 0) {
            this.data.tasks = [
                {id: 1, title: "Complete project proposal", description: "Finish the Q1 project proposal document", priority: "high", dueDate: "2025-06-15", completed: false, createdAt: "2025-06-01"},
                {id: 2, title: "Schedule team meeting", description: "Organize weekly team sync meeting", priority: "medium", dueDate: "2025-06-10", completed: true, createdAt: "2025-06-01"},
                {id: 3, title: "Update portfolio website", description: "Add recent projects to portfolio", priority: "low", dueDate: "2025-06-20", completed: false, createdAt: "2025-06-01"}
            ];
        }

        if (this.data.notes.length === 0) {
            this.data.notes = [
                {id: 1, title: "Project Ideas", content: "Ideas for next quarter projects including mobile app development and API improvements", category: "work", encrypted: false, createdAt: "2025-06-01"},
                {id: 2, title: "Personal Goals", content: "Learning objectives for 2025: React advanced patterns, Spring Boot microservices, and cloud architecture", category: "personal", encrypted: true, createdAt: "2025-06-01"}
            ];
        }

        if (this.data.contacts.length === 0) {
            this.data.contacts = [
                {id: 1, name: "John Smith", email: "john.smith@company.com", phone: "+91-9876543210", address: "Bangalore, Karnataka", category: "work"},
                {id: 2, name: "Sarah Johnson", email: "sarah.j@gmail.com", phone: "+91-9876543211", address: "Mumbai, Maharashtra", category: "friends"},
                {id: 3, name: "David Wilson", email: "david.w@business.com", phone: "+91-9876543212", address: "Delhi, India", category: "business"}
            ];
        }

        this.saveData();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Sidebar navigation
        document.querySelectorAll('.sidebar__link').forEach(link => {
            link.addEventListener('click', (e) => this.switchTab(e));
        });

        // Sidebar toggle for mobile
        document.getElementById('sidebarToggle').addEventListener('click', () => this.toggleSidebar());

        // Quick actions
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e.target.dataset.action));
        });

        // Tasks
        this.setupTasksListeners();
        
        // Notes
        this.setupNotesListeners();
        
        // Contacts
        this.setupContactsListeners();
        
        // Backup & Restore
        this.setupBackupListeners();
        
        // Password Analysis
        this.setupPasswordListeners();

        // Modal
        this.setupModalListeners();

        // Toast
        this.setupToastListeners();
    }

    setupTasksListeners() {
        document.getElementById('addTaskBtn').addEventListener('click', () => this.showTaskForm());
        document.getElementById('saveTask').addEventListener('click', () => this.saveTask());
        document.getElementById('cancelTask').addEventListener('click', () => this.hideTaskForm());
        document.getElementById('taskFilter').addEventListener('change', () => this.renderTasks());
    }

    setupNotesListeners() {
        document.getElementById('addNoteBtn').addEventListener('click', () => this.showNoteForm());
        document.getElementById('saveNote').addEventListener('click', () => this.saveNote());
        document.getElementById('cancelNote').addEventListener('click', () => this.hideNoteForm());
        document.getElementById('notesFilter').addEventListener('change', () => this.renderNotes());
        document.getElementById('notesSearch').addEventListener('input', () => this.renderNotes());
    }

    setupContactsListeners() {
        document.getElementById('addContactBtn').addEventListener('click', () => this.showContactForm());
        document.getElementById('saveContact').addEventListener('click', () => this.saveContact());
        document.getElementById('cancelContact').addEventListener('click', () => this.hideContactForm());
        document.getElementById('contactsFilter').addEventListener('change', () => this.renderContacts());
        document.getElementById('contactsSearch').addEventListener('input', () => this.renderContacts());
    }

    setupBackupListeners() {
        document.getElementById('exportData').addEventListener('click', () => this.exportData());
        document.getElementById('importData').addEventListener('click', () => this.importData());
        document.getElementById('clearAllData').addEventListener('click', () => this.clearAllData());
    }

    setupPasswordListeners() {
        document.getElementById('passwordInput').addEventListener('input', () => this.analyzePassword());
        document.getElementById('generatePassword').addEventListener('click', () => this.generatePassword());
        document.getElementById('passwordLength').addEventListener('input', (e) => {
            document.getElementById('lengthValue').textContent = e.target.value;
        });
    }

    setupModalListeners() {
        document.getElementById('modalCancel').addEventListener('click', () => this.hideModal());
        document.getElementById('modalConfirm').addEventListener('click', () => this.confirmModalAction());
        document.querySelector('.modal__backdrop').addEventListener('click', () => this.hideModal());
    }

    setupToastListeners() {
        document.getElementById('toastClose').addEventListener('click', () => this.hideToast());
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString();
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('dashboardDate').textContent = dateString;
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-color-scheme', newTheme);
        document.getElementById('themeToggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        localStorage.setItem('pdm-theme', newTheme);
    }

    toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    }

    switchTab(e) {
        e.preventDefault();
        const tab = e.target.dataset.tab;
        
        // Update active link
        document.querySelectorAll('.sidebar__link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        
        // Show tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
        
        this.currentTab = tab;
        
        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
        
        // Render tab-specific content
        switch(tab) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'notes':
                this.renderNotes();
                break;
            case 'contacts':
                this.renderContacts();
                break;
            case 'backup':
                this.renderBackup();
                break;
            case 'passwords':
                this.renderPasswordAnalysis();
                break;
        }
    }

    handleQuickAction(action) {
        switch(action) {
            case 'add-task':
                this.switchTab({ preventDefault: () => {}, target: { dataset: { tab: 'tasks' } } });
                setTimeout(() => this.showTaskForm(), 100);
                break;
            case 'add-note':
                this.switchTab({ preventDefault: () => {}, target: { dataset: { tab: 'notes' } } });
                setTimeout(() => this.showNoteForm(), 100);
                break;
            case 'add-contact':
                this.switchTab({ preventDefault: () => {}, target: { dataset: { tab: 'contacts' } } });
                setTimeout(() => this.showContactForm(), 100);
                break;
            case 'backup':
                this.switchTab({ preventDefault: () => {}, target: { dataset: { tab: 'backup' } } });
                break;
        }
    }

    renderDashboard() {
        // Update statistics
        const totalTasks = this.data.tasks.length;
        const completedTasks = this.data.tasks.filter(t => t.completed).length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('taskCompletion').textContent = `${completionRate}% completed`;
        document.getElementById('totalNotes').textContent = this.data.notes.length;
        document.getElementById('totalContacts').textContent = this.data.contacts.length;
        document.getElementById('avgPasswordStrength').textContent = '85%'; // Mock data

        // Render charts
        this.renderTaskChart();
        this.renderPasswordChart();
    }

    renderTaskChart() {
        const chartData = [
            { month: 'Jan', completed: 15, total: 20 },
            { month: 'Feb', completed: 18, total: 22 },
            { month: 'Mar', completed: 20, total: 25 },
            { month: 'Apr', completed: 22, total: 28 },
            { month: 'May', completed: 25, total: 30 }
        ];

        const chart = document.getElementById('taskChart');
        chart.innerHTML = chartData.map(data => {
            const percentage = (data.completed / data.total) * 100;
            return `<div class="chart-bar" style="height: ${percentage}%" data-value="${data.completed}/${data.total}"></div>`;
        }).join('');
    }

    renderPasswordChart() {
        const chartData = { weak: 3, medium: 7, strong: 15 };
        const total = chartData.weak + chartData.medium + chartData.strong;
        
        const chart = document.getElementById('passwordChart');
        chart.innerHTML = `
            <div class="chart-bar" style="height: ${(chartData.weak / total) * 100}%; background: var(--color-error);" data-value="${chartData.weak}"></div>
            <div class="chart-bar" style="height: ${(chartData.medium / total) * 100}%; background: var(--color-warning);" data-value="${chartData.medium}"></div>
            <div class="chart-bar" style="height: ${(chartData.strong / total) * 100}%; background: var(--color-success);" data-value="${chartData.strong}"></div>
        `;
    }

    renderAllTabs() {
        this.renderTasks();
        this.renderNotes();
        this.renderContacts();
        this.renderBackup();
    }

    // Tasks Management
    showTaskForm(task = null) {
        const form = document.getElementById('taskForm');
        form.style.display = 'block';
        
        if (task) {
            this.editingId = task.id;
            this.editingType = 'task';
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDueDate').value = task.dueDate;
        } else {
            this.editingId = null;
            this.editingType = null;
            form.querySelector('form')?.reset();
        }
        
        form.scrollIntoView({ behavior: 'smooth' });
    }

    hideTaskForm() {
        document.getElementById('taskForm').style.display = 'none';
        this.editingId = null;
        this.editingType = null;
    }

    saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (!title) {
            this.showToast('Task title is required', 'error');
            return;
        }

        const task = {
            id: this.editingId || Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false,
            createdAt: this.editingId ? this.data.tasks.find(t => t.id === this.editingId)?.createdAt : new Date().toISOString().split('T')[0]
        };

        if (this.editingId) {
            const index = this.data.tasks.findIndex(t => t.id === this.editingId);
            if (index !== -1) {
                task.completed = this.data.tasks[index].completed; // Preserve completion status
                this.data.tasks[index] = task;
            }
        } else {
            this.data.tasks.push(task);
        }

        this.saveData();
        this.renderTasks();
        this.renderDashboard();
        this.hideTaskForm();
        this.showToast(this.editingId ? 'Task updated successfully' : 'Task added successfully', 'success');
    }

    toggleTaskCompletion(id) {
        const task = this.data.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveData();
            this.renderTasks();
            this.renderDashboard();
        }
    }

    deleteTask(id) {
        this.showModal(
            'Delete Task',
            'Are you sure you want to delete this task?',
            () => {
                this.data.tasks = this.data.tasks.filter(t => t.id !== id);
                this.saveData();
                this.renderTasks();
                this.renderDashboard();
                this.showToast('Task deleted successfully', 'success');
            }
        );
    }

    renderTasks() {
        const filter = document.getElementById('taskFilter').value;
        let tasks = [...this.data.tasks];

        // Apply filters
        switch(filter) {
            case 'completed':
                tasks = tasks.filter(t => t.completed);
                break;
            case 'pending':
                tasks = tasks.filter(t => !t.completed);
                break;
            case 'high':
            case 'medium':
            case 'low':
                tasks = tasks.filter(t => t.priority === filter);
                break;
        }

        // Update progress bar
        const totalTasks = this.data.tasks.length;
        const completedTasks = this.data.tasks.filter(t => t.completed).length;
        const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        document.getElementById('tasksProgress').style.width = `${progressPercentage}%`;

        const container = document.getElementById('tasksList');
        container.innerHTML = tasks.map(task => `
            <div class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''}">
                <div class="task-content">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                    <div class="task-meta">
                        <span class="priority-badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
                        <span>Due: ${task.dueDate}</span>
                        <span>Created: ${task.createdAt}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-btn" onclick="pdm.toggleTaskCompletion(${task.id})" title="${task.completed ? 'Mark as pending' : 'Mark as completed'}">
                        ${task.completed ? '↶' : '✓'}
                    </button>
                    <button class="action-btn" onclick="pdm.showTaskForm(${JSON.stringify(task).replace(/"/g, '&quot;')})" title="Edit task">✏️</button>
                    <button class="action-btn danger" onclick="pdm.deleteTask(${task.id})" title="Delete task">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Notes Management
    showNoteForm(note = null) {
        const form = document.getElementById('noteForm');
        form.style.display = 'block';
        
        if (note) {
            this.editingId = note.id;
            this.editingType = 'note';
            document.getElementById('noteTitle').value = note.title;
            document.getElementById('noteCategory').value = note.category;
            document.getElementById('noteContent').value = note.content;
            document.getElementById('noteEncrypted').checked = note.encrypted;
        } else {
            this.editingId = null;
            this.editingType = null;
            form.querySelector('form')?.reset();
        }
        
        form.scrollIntoView({ behavior: 'smooth' });
    }

    hideNoteForm() {
        document.getElementById('noteForm').style.display = 'none';
        this.editingId = null;
        this.editingType = null;
    }

    saveNote() {
        const title = document.getElementById('noteTitle').value.trim();
        const category = document.getElementById('noteCategory').value;
        const content = document.getElementById('noteContent').value.trim();
        const encrypted = document.getElementById('noteEncrypted').checked;

        if (!title || !content) {
            this.showToast('Title and content are required', 'error');
            return;
        }

        const note = {
            id: this.editingId || Date.now(),
            title,
            category,
            content,
            encrypted,
            createdAt: this.editingId ? this.data.notes.find(n => n.id === this.editingId)?.createdAt : new Date().toISOString().split('T')[0]
        };

        if (this.editingId) {
            const index = this.data.notes.findIndex(n => n.id === this.editingId);
            if (index !== -1) {
                this.data.notes[index] = note;
            }
        } else {
            this.data.notes.push(note);
        }

        this.saveData();
        this.renderNotes();
        this.renderDashboard();
        this.hideNoteForm();
        this.showToast(this.editingId ? 'Note updated successfully' : 'Note added successfully', 'success');
    }

    deleteNote(id) {
        this.showModal(
            'Delete Note',
            'Are you sure you want to delete this note?',
            () => {
                this.data.notes = this.data.notes.filter(n => n.id !== id);
                this.saveData();
                this.renderNotes();
                this.renderDashboard();
                this.showToast('Note deleted successfully', 'success');
            }
        );
    }

    renderNotes() {
        const filter = document.getElementById('notesFilter').value;
        const search = document.getElementById('notesSearch').value.toLowerCase();
        
        let notes = [...this.data.notes];

        // Apply category filter
        if (filter !== 'all') {
            notes = notes.filter(n => n.category === filter);
        }

        // Apply search filter
        if (search) {
            notes = notes.filter(n => 
                n.title.toLowerCase().includes(search) || 
                n.content.toLowerCase().includes(search)
            );
        }

        const container = document.getElementById('notesList');
        container.innerHTML = notes.map(note => `
            <div class="note-item ${note.encrypted ? 'encrypted' : ''}">
                <div class="note-content">
                    <h4>${note.title} ${note.encrypted ? '<span class="encryption-badge">🔒</span>' : ''}</h4>
                    <div class="note-preview">
                        <p>${note.content}</p>
                    </div>
                    <div class="note-meta">
                        <span class="priority-badge">${note.category.toUpperCase()}</span>
                        <span>Created: ${note.createdAt}</span>
                        <span>Words: ${note.content.split(' ').length}</span>
                    </div>
                </div>
                <div class="note-actions">
                    <button class="action-btn" onclick="pdm.showNoteForm(${JSON.stringify(note).replace(/"/g, '&quot;')})" title="Edit note">✏️</button>
                    <button class="action-btn danger" onclick="pdm.deleteNote(${note.id})" title="Delete note">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Contacts Management
    showContactForm(contact = null) {
        const form = document.getElementById('contactForm');
        form.style.display = 'block';
        
        if (contact) {
            this.editingId = contact.id;
            this.editingType = 'contact';
            document.getElementById('contactName').value = contact.name;
            document.getElementById('contactEmail').value = contact.email;
            document.getElementById('contactPhone').value = contact.phone;
            document.getElementById('contactAddress').value = contact.address;
            document.getElementById('contactCategory').value = contact.category;
        } else {
            this.editingId = null;
            this.editingType = null;
            form.querySelector('form')?.reset();
        }
        
        form.scrollIntoView({ behavior: 'smooth' });
    }

    hideContactForm() {
        document.getElementById('contactForm').style.display = 'none';
        this.editingId = null;
        this.editingType = null;
    }

    saveContact() {
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const address = document.getElementById('contactAddress').value.trim();
        const category = document.getElementById('contactCategory').value;

        if (!name) {
            this.showToast('Contact name is required', 'error');
            return;
        }

        // Email validation
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        const contact = {
            id: this.editingId || Date.now(),
            name,
            email,
            phone,
            address,
            category,
            createdAt: this.editingId ? this.data.contacts.find(c => c.id === this.editingId)?.createdAt : new Date().toISOString().split('T')[0]
        };

        if (this.editingId) {
            const index = this.data.contacts.findIndex(c => c.id === this.editingId);
            if (index !== -1) {
                this.data.contacts[index] = contact;
            }
        } else {
            this.data.contacts.push(contact);
        }

        this.saveData();
        this.renderContacts();
        this.renderDashboard();
        this.hideContactForm();
        this.showToast(this.editingId ? 'Contact updated successfully' : 'Contact added successfully', 'success');
    }

    deleteContact(id) {
        this.showModal(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            () => {
                this.data.contacts = this.data.contacts.filter(c => c.id !== id);
                this.saveData();
                this.renderContacts();
                this.renderDashboard();
                this.showToast('Contact deleted successfully', 'success');
            }
        );
    }

    renderContacts() {
        const filter = document.getElementById('contactsFilter').value;
        const search = document.getElementById('contactsSearch').value.toLowerCase();
        
        let contacts = [...this.data.contacts];

        // Apply category filter
        if (filter !== 'all') {
            contacts = contacts.filter(c => c.category === filter);
        }

        // Apply search filter
        if (search) {
            contacts = contacts.filter(c => 
                c.name.toLowerCase().includes(search) || 
                c.email.toLowerCase().includes(search) ||
                c.phone.includes(search)
            );
        }

        const container = document.getElementById('contactsList');
        container.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <div class="contact-content">
                    <h4>${contact.name}</h4>
                    <p>📧 ${contact.email}</p>
                    <p>📞 ${contact.phone}</p>
                    <p>📍 ${contact.address}</p>
                    <div class="contact-meta">
                        <span class="priority-badge">${contact.category.toUpperCase()}</span>
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="action-btn" onclick="pdm.showContactForm(${JSON.stringify(contact).replace(/"/g, '&quot;')})" title="Edit contact">✏️</button>
                    <button class="action-btn danger" onclick="pdm.deleteContact(${contact.id})" title="Delete contact">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Backup & Restore
    exportData() {
        const exportTasks = document.getElementById('exportTasks').checked;
        const exportNotes = document.getElementById('exportNotes').checked;
        const exportContacts = document.getElementById('exportContacts').checked;

        const exportData = {};
        if (exportTasks) exportData.tasks = this.data.tasks;
        if (exportNotes) exportData.notes = this.data.notes;
        if (exportContacts) exportData.contacts = this.data.contacts;

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `pdm-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        // Add to backup history
        this.data.backupHistory.push({
            date: new Date().toISOString(),
            types: [exportTasks && 'tasks', exportNotes && 'notes', exportContacts && 'contacts'].filter(Boolean)
        });
        this.saveData();
        this.renderBackup();
        this.showToast('Data exported successfully', 'success');
    }

    importData() {
        const fileInput = document.getElementById('importFile');
        const file = fileInput.files[0];

        if (!file) {
            this.showToast('Please select a file to import', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                
                this.showModal(
                    'Import Data',
                    'This will merge the imported data with your existing data. Continue?',
                    () => {
                        if (importedData.tasks) {
                            this.data.tasks = [...this.data.tasks, ...importedData.tasks];
                        }
                        if (importedData.notes) {
                            this.data.notes = [...this.data.notes, ...importedData.notes];
                        }
                        if (importedData.contacts) {
                            this.data.contacts = [...this.data.contacts, ...importedData.contacts];
                        }

                        this.saveData();
                        this.renderAllTabs();
                        this.renderDashboard();
                        this.showToast('Data imported successfully', 'success');
                    }
                );
            } catch (error) {
                this.showToast('Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    }

    clearAllData() {
        this.showModal(
            'Clear All Data',
            'This will permanently delete all your data. This action cannot be undone.',
            () => {
                this.data = { tasks: [], notes: [], contacts: [], backupHistory: [] };
                this.saveData();
                this.renderAllTabs();
                this.renderDashboard();
                this.showToast('All data cleared', 'success');
            }
        );
    }

    renderBackup() {
        // Data statistics
        const stats = document.getElementById('dataStats');
        const dataSize = JSON.stringify(this.data).length;
        
        stats.innerHTML = `
            <p><strong>Tasks:</strong> ${this.data.tasks.length}</p>
            <p><strong>Notes:</strong> ${this.data.notes.length}</p>
            <p><strong>Contacts:</strong> ${this.data.contacts.length}</p>
            <p><strong>Storage Used:</strong> ${(dataSize / 1024).toFixed(2)} KB</p>
        `;

        // Backup history
        const history = document.getElementById('backupHistory');
        if (this.data.backupHistory.length === 0) {
            history.innerHTML = '<p>No backup history available</p>';
        } else {
            history.innerHTML = this.data.backupHistory
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10)
                .map(backup => `
                    <div style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">
                        <strong>${new Date(backup.date).toLocaleString()}</strong><br>
                        <small>Exported: ${backup.types.join(', ')}</small>
                    </div>
                `).join('');
        }
    }

    // Password Analysis
    analyzePassword() {
        const password = document.getElementById('passwordInput').value;
        const analysis = this.getPasswordAnalysis(password);
        
        // Update strength meter
        const meter = document.getElementById('strengthMeter');
        const text = document.getElementById('strengthText');
        
        meter.className = `password-strength__fill ${analysis.strength}`;
        text.textContent = `Password Strength: ${analysis.strength.toUpperCase()}`;
        text.style.color = analysis.strength === 'strong' ? 'var(--color-success)' : 
                          analysis.strength === 'medium' ? 'var(--color-warning)' : 'var(--color-error)';

        // Update analysis details
        const analysisDiv = document.getElementById('passwordAnalysis');
        analysisDiv.innerHTML = `
            <h4>Analysis Results:</h4>
            <ul style="list-style: none; padding: 0;">
                <li style="color: ${analysis.checks.length ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${analysis.checks.length ? '✓' : '✗'} Length: ${password.length} characters (min 8)
                </li>
                <li style="color: ${analysis.checks.uppercase ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${analysis.checks.uppercase ? '✓' : '✗'} Contains uppercase letters
                </li>
                <li style="color: ${analysis.checks.lowercase ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${analysis.checks.lowercase ? '✓' : '✗'} Contains lowercase letters
                </li>
                <li style="color: ${analysis.checks.numbers ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${analysis.checks.numbers ? '✓' : '✗'} Contains numbers
                </li>
                <li style="color: ${analysis.checks.special ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${analysis.checks.special ? '✓' : '✗'} Contains special characters
                </li>
                <li style="color: ${analysis.checks.common ? 'var(--color-error)' : 'var(--color-success)'}">
                    ${analysis.checks.common ? '✗' : '✓'} ${analysis.checks.common ? 'Common password detected' : 'Not a common password'}
                </li>
            </ul>
            <p><strong>Time to crack:</strong> ${analysis.timeToCrack}</p>
        `;
    }

    getPasswordAnalysis(password) {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            common: ['password', '123456', 'qwerty', 'admin', 'welcome'].includes(password.toLowerCase())
        };

        const score = Object.values(checks).filter(Boolean).length - (checks.common ? 1 : 0);
        
        let strength, timeToCrack;
        if (score >= 5 && password.length >= 12) {
            strength = 'strong';
            timeToCrack = 'Centuries';
        } else if (score >= 4 && password.length >= 8) {
            strength = 'medium';
            timeToCrack = 'Years';
        } else {
            strength = 'weak';
            timeToCrack = 'Minutes to Days';
        }

        return { strength, checks, timeToCrack };
    }

    generatePassword() {
        const length = parseInt(document.getElementById('passwordLength').value);
        const includeUppercase = document.getElementById('includeUppercase').checked;
        const includeLowercase = document.getElementById('includeLowercase').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;

        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!charset) {
            this.showToast('Please select at least one character type', 'error');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        const generatedDiv = document.getElementById('generatedPassword');
        generatedDiv.innerHTML = `
            <strong>Generated Password:</strong><br>
            <code style="user-select: all; cursor: pointer;" onclick="navigator.clipboard.writeText('${password}'); pdm.showToast('Password copied to clipboard', 'success')">${password}</code>
            <br><small>Click to copy to clipboard</small>
        `;
    }

    renderPasswordAnalysis() {
        // Initial render - most content is static in HTML
        document.getElementById('lengthValue').textContent = document.getElementById('passwordLength').value;
    }

    // Modal and Toast
    showModal(title, message, onConfirm) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('confirmModal').classList.add('active');
        
        this.modalConfirmCallback = onConfirm;
    }

    hideModal() {
        document.getElementById('confirmModal').classList.remove('active');
        this.modalConfirmCallback = null;
    }

    confirmModalAction() {
        if (this.modalConfirmCallback) {
            this.modalConfirmCallback();
        }
        this.hideModal();
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const messageEl = document.getElementById('toastMessage');
        
        messageEl.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => this.hideToast(), 3000);
    }

    hideToast() {
        document.getElementById('toast').classList.remove('show');
    }
}

// Initialize the application
window.pdm = new PersonalDataManager();

// Load saved theme
const savedTheme = localStorage.getItem('pdm-theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}