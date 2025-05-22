document.addEventListener('DOMContentLoaded', function() {
    const playerNameInput = document.getElementById('playerName');
    const playerScoreInput = document.getElementById('playerScore');
    const addScoreBtn = document.getElementById('addScoreBtn');
    const showResultsBtn = document.getElementById('showResultsBtn');
    const scoreTableBody = document.getElementById('scoreTableBody');
    
    let players = [];
    
    // Загрузка данных из localStorage
    if (localStorage.getItem('quizPlayers')) {
        players = JSON.parse(localStorage.getItem('quizPlayers'));
        updateLeaderboard();
    }
    
    // Добавление очков
    addScoreBtn.addEventListener('click', function() {
        const name = playerNameInput.value.trim();
        const score = parseInt(playerScoreInput.value);
        
        if (name && !isNaN(score)) {
            addOrUpdatePlayer(name, score);
            playerNameInput.value = '';
            playerScoreInput.value = '';
            playerNameInput.focus();
        } else {
            alert('Пожалуйста, введите имя и корректное количество очков');
        }
    });
    
    // Подведение итогов
    showResultsBtn.addEventListener('click', function() {
        if (players.length > 0) {
            updateLeaderboard(true);
            showWinnerModal();
        } else {
            alert('Нет участников для подведения итогов');
        }
    });

    // Получаем модальное окно и элементы
    const modal = document.getElementById('winnerModal');
    const winnerInfo = document.getElementById('winnerInfo');
    const closeBtn = document.querySelector('.close');

    // Показ модального окна с победителем
    function showWinnerModal() {
        if (players.length === 0) return;
        
        const winner = players[0]; // Первый в отсортированном списке
        winnerInfo.innerHTML = `
            <div class="winner-name">${winner.name}</div>
            <div>набрал(а)</div>
            <div class="winner-score">${winner.score} очков</div>
        `;
        
        modal.style.display = 'block';
    }

    // Закрытие модального окна при клике на крестик
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    // Функция для добавления или обновления игрока
    function addOrUpdatePlayer(name, score) {
        const existingPlayerIndex = players.findIndex(player => player.name.toLowerCase() === name.toLowerCase());
        
        if (existingPlayerIndex !== -1) {
            // Игрок уже существует - обновляем очки
            players[existingPlayerIndex].score += score;
        } else {
            // Новый игрок
            players.push({ name, score });
        }
        
        // Сортируем и сохраняем
        sortPlayers();
        savePlayers();
        updateLeaderboard();
    }
    
    // Сортировка игроков по очкам
    function sortPlayers() {
        players.sort((a, b) => b.score - a.score);
    }
    
    // Сохранение в localStorage
    function savePlayers() {
        localStorage.setItem('quizPlayers', JSON.stringify(players));
    }
    
    // Обновление таблицы лидеров
    function updateLeaderboard(showMedals = false) {
        scoreTableBody.innerHTML = '';
        
        players.forEach((player, index) => {
            const row = document.createElement('tr');
            
            // Место
            const placeCell = document.createElement('td');
            if (showMedals && index < 3) {
                const medalClasses = ['medal-gold', 'medal-silver', 'medal-bronze'];
                placeCell.innerHTML = `<span class="${medalClasses[index]}">${index + 1}</span>`;
            } else {
                placeCell.textContent = index + 1;
            }
            
            // Имя
            const nameCell = document.createElement('td');
            nameCell.textContent = player.name;
            
            // Очки
            const scoreCell = document.createElement('td');
            scoreCell.textContent = player.score;
            
            row.appendChild(placeCell);
            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            
            scoreTableBody.appendChild(row);
        });
    }
    
    // Обработка нажатия Enter в полях ввода
    playerNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            playerScoreInput.focus();
        }
    });
    
    playerScoreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addScoreBtn.click();
        }
    });
});