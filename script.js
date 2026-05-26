document.addEventListener('DOMContentLoaded', () => {
    // --- HORLOGE ---
    const clockEl = document.getElementById('clock');
    setInterval(() => { 
        if(clockEl) clockEl.textContent = new Date().toLocaleTimeString('fr-FR'); 
    }, 1000);

    // --- TO-DO LIST (Optimisée) ---
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addTodo');
    const list = document.getElementById('todoList');

    function updateStats() {
        const items = list.querySelectorAll('li');
        const done = list.querySelectorAll('.completed').length;
        const pc = items.length === 0 ? 0 : Math.round((done / items.length) * 100);
        
        document.getElementById('progression').textContent = pc + "%";
        document.getElementById('progress-fill').style.width = pc + "%";
        document.getElementById('stat-message').textContent = `${done} / ${items.length} tâche(s) faite(s)`;
    }

    addBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if(!taskText) return;

        const li = document.createElement('li');
        li.innerHTML = `<span>${taskText}</span><button class="del-btn">×</button>`;
        
        // Clic sur la tâche pour cocher
        li.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
                updateStats();
            }
        });

        // Suppression
        li.querySelector('.del-btn').addEventListener('click', () => { 
            li.remove(); 
            updateStats(); 
        });
        
        list.appendChild(li);
        todoInput.value = "";
        updateStats();
    });

    // --- BLOC-NOTES (Corrigé) ---
    const saveBtn = document.getElementById('saveNote');
    const nTitle = document.getElementById('nTitle');
    const nBody = document.getElementById('nBody');
    const savedBox = document.getElementById('savedNotes');

    saveBtn.addEventListener('click', () => {
        if(!nTitle.value && !nBody.value) return;

        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        noteDiv.style.cssText = "background:#222; padding:10px; border-radius:8px; margin-bottom:8px; position:relative;";
        
        noteDiv.innerHTML = `
            <strong>${nTitle.value || "Sans titre"}</strong>
            <p style="font-size:0.85rem; color:#ccc;">${nBody.value}</p>
            <button class="del-btn" style="position:absolute; right:10px; top:10px;">×</button>
        `;

        noteDiv.querySelector('.del-btn').addEventListener('click', () => noteDiv.remove());
        savedBox.prepend(noteDiv);
        
        nTitle.value = ""; 
        nBody.value = "";
    });
});
