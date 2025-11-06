let duration = 120;
let remaining = duration;
let timerElement = document.getElementById("timer");
let messageElement = document.getElementById("message");

function updateTimer() {
  let min = Math.floor(remaining / 60);
  let sec = remaining % 60;
  timerElement.textContent = `${min}:${String(sec).padStart(2, "0")}`;
}

function startCountdown() {
  updateTimer();
  let countdown = setInterval(() => {
    remaining--;
    updateTimer();

    if (remaining <= 0) {
      clearInterval(countdown);
      messageElement.textContent = "内容が変わりました！🎉";
      timerElement.textContent = "";

      showNotify();
    }
  }, 1000);
}

async function showNotify() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  navigator.serviceWorker.ready.then(sw => {
    sw.showNotification("時間になりました！", {
      body: "ページの内容が更新されました。",
      icon: "https://via.placeholder.com/128",
      vibrate: [200, 100, 200]
    });
  });
}

document.getElementById("resetBtn").addEventListener("click", () => {
  remaining = duration;
  messageElement.textContent = "2分後に内容が変わります";
  startCountdown();
});

startCountdown();