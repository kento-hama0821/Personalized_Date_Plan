// 質問と選択肢のリスト
const questions = [
    {
        question: "こんにちは！最高のデートプランを一緒に考えましょう。まず、今日のデートの気分はどちらに近いですか？",
        options: ["のんびりリラックス", "アクティブに楽しむ"]
    },
    {
        question: "いいですね！雰囲気はどちらがお好みですか？",
        options: ["自然を感じる場所", "都会的でおしゃれな場所"]
    },
    {
        question: "なるほど。最後に、今はどんなことに関心がありますか？",
        options: ["美味しいものを食べたい", "新しい発見や体験がしたい"]
    }
];

// ユーザーの回答を保存する配列
const userAnswers = [];

// デートプランのデータ
const datePlans = {
    relaxNature: [
        {
            image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "緑豊かな公園でのんびりピクニックデート",
            description: "手作りのお弁当と本を持って、木陰でのんびり。季節の花々を眺めながら、二人の会話も弾むはず。",
            tags: ["#リラックス", "#自然", "#ピクニック"]
        },
        {
            image: "https://images.unsplash.com/photo-1464158006789-a2ac26b10fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "日本庭園で癒しのガーデンデート",
            description: "色とりどりの花々と池の景色を楽しみながら、ゆったりとした時間を過ごせます。庭園内のカフェでのティータイムもおすすめ。",
            tags: ["#癒し", "#花", "#カフェ"]
        }
    ],
    relaxUrban: [
        {
            image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "おしゃれカフェ巡りデート",
            description: "話題の隠れ家カフェを巡って、こだわりのコーヒーとスイーツを楽しみましょう。インスタ映えも間違いなし。",
            tags: ["#カフェ", "#スイーツ", "#おしゃれ"]
        },
        {
            image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "アートギャラリーでゆったり文化デート",
            description: "現代アートに触れながら、ゆっくりと会話を楽しめます。近くのブックカフェで感想を語り合うのもおすすめ。",
            tags: ["#アート", "#文化", "#静か"]
        }
    ],
    activeNature: [
        {
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "軽いハイキングと絶景ピクニック",
            description: "初心者向けの山道を登って、頂上で特別なランチタイム。達成感と景色を二人で共有できます。",
            tags: ["#アクティブ", "#絶景", "#自然"]
        },
        {
            image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "川沿いサイクリング＆カフェデート",
            description: "爽やかな風を感じながらサイクリング。途中の素敵なカフェで休憩するのがポイントです。",
            tags: ["#サイクリング", "#カフェ", "#アウトドア"]
        }
    ],
    activeUrban: [
        {
            image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "遊園地でスリル満点デート",
            description: "様々なアトラクションを楽しんで、たくさんの思い出を作りましょう。夜のイルミネーションは特におすすめ。",
            tags: ["#遊園地", "#スリル", "#イルミネーション"]
        },
        {
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "二人でチャレンジ！料理教室デート",
            description: "プロから学ぶ本格的な料理レッスン。二人で協力して作る料理は格別の味に。",
            tags: ["#料理", "#体験", "#学び"]
        }
    ]
};

// DOM要素の取得
const messagesContainer = document.querySelector('.messages-container');
const optionsContainer = document.querySelector('.options-container');
const typingIndicator = document.querySelector('.typing-indicator');

// 現在の質問インデックス
let currentQuestionIndex = 0;

// メッセージを追加する関数
function addMessage(content, isAI = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isAI ? 'ai-message' : 'user-message'}`;

    let messageHTML = '';
    if (isAI) {
        messageHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${content}</div>
        `;
    } else {
        messageHTML = `
            <div class="message-content">${content}</div>
        `;
    }

    messageDiv.innerHTML = messageHTML;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 選択肢ボタンを表示する関数
function showOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => handleOptionClick(option));
        optionsContainer.appendChild(button);
    });
}

// タイピングインジケーターの表示/非表示を制御する関数
function toggleTypingIndicator(show) {
    typingIndicator.classList.toggle('hidden', !show);
}

// 選択肢がクリックされた時の処理
function handleOptionClick(selectedOption) {
    // ユーザーの選択を保存
    userAnswers.push(selectedOption);
    
    // ユーザーの選択を表示
    addMessage(selectedOption, false);

    // ボタンを無効化
    optionsContainer.innerHTML = '';

    // 次の質問を表示する前にタイピングインジケーターを表示
    toggleTypingIndicator(true);

    // 1.5秒後に次の質問を表示
    setTimeout(() => {
        toggleTypingIndicator(false);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            // 次の質問を表示
            addMessage(questions[currentQuestionIndex].question);
            showOptions(questions[currentQuestionIndex].options);
        } else {
            // 全質問が終了した場合
            showFinalMessage();
        }
    }, 1500);
}

// 最終メッセージとローディングアニメーションを表示する関数
function showFinalMessage() {
    const finalMessage = "ありがとうございます。二人にぴったりのプランを解析中です…";
    addMessage(finalMessage);

    // ローディングアニメーションの追加
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message';
    loadingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content loading-animation">
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3秒後に結果を表示
    setTimeout(() => {
        showDatePlans();
    }, 3000);
}

// ユーザーの回答に基づいてデートプランを選択する関数
function selectDatePlans() {
    const [mood, atmosphere] = userAnswers;
    
    if (mood === "のんびりリラックス") {
        return atmosphere === "自然を感じる場所" ? datePlans.relaxNature : datePlans.relaxUrban;
    } else {
        return atmosphere === "自然を感じる場所" ? datePlans.activeNature : datePlans.activeUrban;
    }
}

// デートプランを表示する関数
function showDatePlans() {
    // ローディング表示を削除
    const loadingMessage = messagesContainer.querySelector('.loading-animation').closest('.message');
    if (loadingMessage) {
        loadingMessage.remove();
    }

    // 結果表示用のメッセージを追加
    addMessage("あなたにぴったりのデートプランが見つかりました！");

    // デートプランのカードを表示
    const selectedPlans = selectDatePlans();
    const plansContainer = document.createElement('div');
    plansContainer.className = 'message ai-message';
    
    let plansHTML = '<div class="message-content"><div class="date-plans-container">';
    
    selectedPlans.forEach((plan, index) => {
        plansHTML += `
            <div class="date-plan-card fade-in" style="animation-delay: ${index * 0.2}s">
                <img src="${plan.image}" alt="${plan.title}" class="date-plan-image">
                <div class="date-plan-content">
                    <div class="date-plan-title">${plan.title}</div>
                    <div class="date-plan-description">${plan.description}</div>
                    <div class="date-plan-tags">
                        ${plan.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    plansHTML += '</div></div>';
    plansContainer.innerHTML = plansHTML;
    messagesContainer.appendChild(plansContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // 最初の質問を表示
    addMessage(questions[0].question);
    showOptions(questions[0].options);
}); 