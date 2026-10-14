/* =========================================================
   🟢 إعدادات كود التضمين للمواقع
   ========================================================= */
const EMBED_CONFIG = {
    title: "📢 كود التضمين لأصحاب المواقع والقنوات",
    notice: "هذا الكود مخصص لأصحاب المواقع الذين يرغبون ببث المباراة مباشرة داخل صفحاتهم مجاناً وبجودة عالية:",
    // كود الـ iframe الرسمي لصفحة المشغل S1:
    iframeCode: `<iframe src="https://nhnlive.com/player/S1/iframe-s1.html" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`
};

// const SPONSOR_CONFIG = {
//     enabled: true, 
//     title: `مهندس مراهنات كرة القدم 💸 | عالم القمة والأرباح 💎🌍`,
//     subtitle: `أقوي قناة لتوقعات المباريات هتعمل فلوس وتعوض خسارتك خش جرب مش هتخسر 😉🔥`,
//     cardTitle: "مهندس مراهنات كرة القدم 💸 | عالم القمة والأرباح 💎🌍",
//     cardSubtitle: "سجّل الآن عبر الرابط واستخدم الكود الترويجي واحصل فوراً على بونص 100% إضافي على أول إيداع في حسابك",
//     telegramUrl: "https://t.me/bettingengineer1"
// };

const baseViewers = {
    arabic: 14842,
    english: 208
};

let counterInterval = null;

function updateSponsorCard() {
    const cardEl = document.getElementById('sponsor-link-card');
    if (!cardEl) return;
    if (!SPONSOR_CONFIG.enabled) {
        cardEl.style.display = 'none';
        return;
    }
    cardEl.style.display = 'flex';
    document.getElementById('sponsor-card-title').innerText = SPONSOR_CONFIG.cardTitle;
    document.getElementById('sponsor-card-sub').innerText = SPONSOR_CONFIG.cardSubtitle;
    cardEl.href = SPONSOR_CONFIG.telegramUrl;
}

// 🟢 تبديل السيرفر داخل الـ iframe مباشرة
function changeServer(language, clickedButton) {
    document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
    if (clickedButton) clickedButton.classList.add('active');
    
    const iframe = document.getElementById('main-stream-frame');
    if (iframe) {
        const langParam = language === 'english' ? 'en' : 'ar';
        iframe.src = `https://nhnlive.com/player/S1/iframe-s1.html?lang=${langParam}&t=${Date.now()}`;
    }
    startViewerCounter(language);
}

// 🟢 إعادة تحميل البث داخل الـ iframe
function reloadIframe() {
    const iframe = document.getElementById('main-stream-frame');
    if (iframe) {
        iframe.src = iframe.src.split('&t=')[0] + '&t=' + Date.now();
    }
}

/* =========================================================
   🟢 دوال التحكم بنافذة ونسخ كود التضمين
   ========================================================= */
function openEmbedModal() {
    const modal = document.getElementById('embed-modal');
    const textarea = document.getElementById('embed-code-text');
    const title = document.getElementById('embed-modal-title');
    const notice = document.getElementById('embed-modal-notice');
    if (modal && textarea) {
        if (title) title.innerText = EMBED_CONFIG.title;
        if (notice) notice.innerText = EMBED_CONFIG.notice;
        textarea.value = EMBED_CONFIG.iframeCode;
        modal.classList.add('show');
    }
}

function closeEmbedModal() {
    const modal = document.getElementById('embed-modal');
    if (modal) modal.classList.remove('show');
}

function copyEmbedCode() {
    const textarea = document.getElementById('embed-code-text');
    const btn = document.getElementById('copy-embed-btn');
    if (!textarea || !btn) return;
    
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(textarea.value).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "✅ تم النسخ بنجاح!";
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 2500);
    }).catch(() => {
        document.execCommand("copy");
        btn.innerText = "✅ تم النسخ!";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateSponsorCard();
    startViewerCounter('arabic');
});

function startViewerCounter(language) {
    clearInterval(counterInterval); 
    const countElement = document.getElementById('viewer-count');
    let currentViewers = baseViewers[language] || 100; 
    updateDisplay(currentViewers, countElement);

    counterInterval = setInterval(() => {
        let change = Math.floor(Math.random() * 7) - 2; 
        currentViewers += change;
        let minLimit = Math.floor((baseViewers[language] || 100) * 0.8);
        if (currentViewers < minLimit) currentViewers = minLimit;
        updateDisplay(currentViewers, countElement);
    }, 12000); 
}

function updateDisplay(currentViewers, countElement) {
    if (!countElement) return;
    let displayCount = currentViewers >= 1000 ? (currentViewers / 1000).toFixed(1) + 'K' : currentViewers;
    countElement.innerText = displayCount;
}