// 1. دالة توجيه الزائر لصفحة البث المباشر المناسبة
function goToStream(matchId) {
    if (matchId === 'match6') {
        window.open("https://nhnlive-now.com/S1/stream1.html", "_blank");
    } else if (matchId === 'match2') {
        window.open("https://nhnlive-now.com/S2/stream2.html", "_blank");
    } else {
        window.open("https://nhnlive-now.com/S1/stream1.html", "_blank");
    }
}

// 2. نظام التبديل بين الأيام بدون أي سحب أو نزول للشاشة إطلاقاً
document.addEventListener("DOMContentLoaded", function() {
    var dateButtons = document.querySelectorAll(".date-btn");
    var tabContents = document.querySelectorAll(".tab-content");

    function switchTab(targetId) {
        // إخفاء كافة الحاويات وإظهار الحاوية المطلوبة فقط
        tabContents.forEach(function(content) {
            content.classList.remove("active");
        });
        var activeTab = document.getElementById(targetId);
        if (activeTab) {
            activeTab.classList.add("active");
        }

        // تفعيل الزر النشط
        dateButtons.forEach(function(btn) {
            btn.classList.remove("active");
            if (btn.getAttribute("data-target") === targetId) {
                btn.classList.add("active");
            }
        });

        // تغيير الرابط في شريط المتصفح بدون أي قفز أو نزول للشاشة
        if (window.history.replaceState) {
            window.history.replaceState(null, null, '#' + targetId);
        }
    }

    // تفعيل أزرار الأيام عند النقر
    dateButtons.forEach(function(button) {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            var targetId = this.getAttribute("data-target");
            switchTab(targetId);
        });
    });

    // قراءة الرابط فور فتح الصفحة لتحديد اليوم المختار بدون سحب الصفحة
    var hash = window.location.hash.replace("#", "");
    if (hash === "yesterday-matches" || hash === "tomorrow-matches") {
        switchTab(hash);
    } else {
        tabContents.forEach(function(content) { content.classList.remove("active"); });
        var todayEl = document.getElementById("today-matches");
        if (todayEl) todayEl.classList.add("active");

        dateButtons.forEach(function(btn) {
            btn.classList.remove("active");
            if (btn.getAttribute("data-target") === "today-matches") {
                btn.classList.add("active");
            }
        });
    }

    // روابط الهيدر والتمرير السلس
    var navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            navLinks.forEach(function(nav) { nav.classList.remove("active"); });
            this.classList.add("active");

            var buttonText = this.textContent.trim();
            if (buttonText.includes("أخبار")) {
                var newsSection = document.getElementById("news-section");
                if (newsSection) newsSection.scrollIntoView({ behavior: "smooth" });
            } else if (buttonText.includes("الرئيسية")) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });
});

// 3. التحكم في الوضع الليلي (Dark Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}