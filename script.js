let memoryBits = []; 
let originalInput = "";
let secilenBitModu = 8;
let toplamHucreSayisi = 12; 
let pariteSayisi = 4;

window.onload = function() {
    inputPlaceholderGuncelle();
};

function inputPlaceholderGuncelle() {
    let selectBox = document.getElementById("bitSelect");
    let inputField = document.getElementById("dataInput");
    let mode = selectBox.value;
    
    if (!mode) {
        inputField.placeholder = "Önce mod seçiniz...";
        inputField.disabled = true;
        inputField.value = "";
        return;
    }
    
    inputField.disabled = false;
    inputField.placeholder = mode + " bitlik veri girin (Örn: " + "1".repeat(mode) + ")";
    inputField.value = "";
    inputField.focus();
}


function avatarKonus(yeniMetin) {
    let img = document.querySelector(".avatar-img");
    let bubble = document.getElementById("avatarBubble");
    
    bubble.innerText = yeniMetin;
    img.classList.remove("avatar-bounce");
    void img.offsetWidth; 
    img.classList.add("avatar-bounce");
}


function bellegeYaz() {
    let selectBox = document.getElementById("bitSelect");
    secilenBitModu = parseInt(selectBox.value);
    
    if (!selectBox.value) {
        alert("Lütfen önce listeden bir bit modu seçin!");
        return;
    }
    
    let inputVal = document.getElementById("dataInput").value;
    
    if (inputVal.length !== secilenBitModu || !/^[01]+$/.test(inputVal)) {
        alert("Lütfen seçtiğiniz moda uygun, tam " + secilenBitModu + " bit uzunluğunda (sadece 0 ve 1 içeren) geçerli bir veri girin!");
        return;
    }

    originalInput = inputVal;

    if (secilenBitModu === 8) {
        pariteSayisi = 4; toplamHucreSayisi = 12;
    } else if (secilenBitModu === 16) {
        pariteSayisi = 5; toplamHucreSayisi = 21;
    } else if (secilenBitModu === 32) {
        pariteSayisi = 6; toplamHucreSayisi = 38;
    }

    document.getElementById("inputCard").classList.add("hidden");
    document.getElementById("summaryBar").classList.remove("hidden");
    document.getElementById("summaryModText").innerText = "Aktif Donanım Durumu: Mod " + secilenBitModu + "-Bit (M=" + secilenBitModu + ", K=" + pariteSayisi + ")";
    document.getElementById("summaryData").innerText = inputVal;
    document.getElementById("dynamicSections").classList.remove("hidden");

    document.getElementById("progressBar").style.width = "50%";
    document.getElementById("step2").classList.add("active");

    avatarKonus("Harika! " + secilenBitModu + " bitlik veriyi bellek matrisine yerleştirdim. Şimdi bozmak istediğin herhangi bir bitin üzerine tıkla! 🛠️");

    
    let d = inputVal.split("").reverse().map(Number); 
    let h = new Array(toplamHucreSayisi + 1).fill(0);

    let dataIdx = 0;
    for (let i = 1; i <= toplamHucreSayisi; i++) {
        if ((i & (i - 1)) !== 0) {
            h[i] = d[dataIdx];
            dataIdx++;
        }
    }

    for (let p = 0; p < pariteSayisi; p++) {
        let parityPos = Math.pow(2, p);
        let xorSum = 0;
        for (let i = 1; i <= toplamHucreSayisi; i++) {
            if (i !== parityPos && (i & parityPos) !== 0) {
                xorSum ^= h[i];
            }
        }
        h[parityPos] = xorSum;
    }

    memoryBits = h; 
    arayuzuGuncelle();
    analizEt(false); 
}

function arayuzuGuncelle() {
    let container = document.getElementById("memoryContainer");
    container.innerHTML = "";

    for (let i = toplamHucreSayisi; i >= 1; i--) {
        let box = document.createElement("div");
        box.className = "bit-box";
        box.id = "bitBox-" + i; // Kutulara dinamik ID veriyoruz ki uzaktan erişebilelim
        
        let isParity = ((i & (i - 1)) === 0);
        let bitType = isParity ? "Parite (P" + i + ")" : "Veri (D" + i + ")";
        box.innerHTML = "<span>" + memoryBits[i] + "</span><small>" + bitType + "</small>";
        
        box.onclick = function() {
            let buKutuHatalıMi = box.classList.contains("error");

            
            if (!buKutuHatalıMi) {
                let eskiHatalıKutu = document.querySelector(".bit-box.error");
                if (eskiHatalıKutu) {
                    
                    let eskiIdx = parseInt(eskiHatalıKutu.id.split("-")[1]);
                    
                    memoryBits[eskiIdx] = memoryBits[eskiIdx] === 0 ? 1 : 0;
                    eskiHatalıKutu.classList.remove("error");
                    eskiHatalıKutu.querySelector("span").innerText = memoryBits[eskiIdx];
                }
            }

            
            memoryBits[i] = memoryBits[i] === 0 ? 1 : 0; 
            box.classList.toggle("error");
            box.querySelector("span").innerText = memoryBits[i];
            
            analizEt(true); 
        };

        container.appendChild(box);
    }
}


function analizEt(showAnalysisCard) {
    let h = memoryBits;

    
    let sendromBits = [];
    let sendromOndalik = 0;

    for (let p = 0; p < pariteSayisi; p++) {
        let parityPos = Math.pow(2, p);
        let xorSum = 0;
        for (let i = 1; i <= toplamHucreSayisi; i++) {
            if ((i & parityPos) !== 0) {
                xorSum ^= h[i];
            }
        }
        sendromBits.push(xorSum);
        if (xorSum === 1) {
            sendromOndalik += parityPos;
        }
    }

    let gosterilecekSendrom = [...sendromBits].reverse().join("");
    document.getElementById("syndromeWord").innerText = gosterilecekSendrom;

    let errorSignal = document.getElementById("errorSignal");
    let errorLocation = document.getElementById("errorLocation");
    let dataOutSpan = document.getElementById("dataOut");

    if (sendromOndalik === 0) {
        errorSignal.innerText = "HATA YOK";
        errorSignal.className = "signal-ok";
        errorLocation.innerText = "Sistem kararlı durumda, donanım hatası yok.";
        
        dataOutSpan.innerText = originalInput;
        
        if(showAnalysisCard) {
            avatarKonus("Bütün bitleri eski haline getirdin, sistem yeniden pürüzsüz ve temiz! ✨");
        }
    } else {
        if (showAnalysisCard) {
            document.getElementById("analysisCard").classList.remove("hidden");
            document.getElementById("progressBar").style.width = "100%";
            document.getElementById("step3").classList.add("active");
            
            avatarKonus("Opps! Donanımdaki bir bit bozuldu. Ama panik yok, sendrom kelimesinden tam konumunu (Bit " + sendromOndalik + ") bulup düzelttim! 💖");
        }

        errorSignal.innerText = "HATA TESPİT EDİLDİ!";
        errorSignal.className = "signal-fail";
        errorLocation.innerText = "Hesaplanan sendrom konumu teyit etti: Bit " + sendromOndalik;

        
        let duzeltilmisH = [].concat(h);
        duzeltilmisH[sendromOndalik] = duzeltilmisH[sendromOndalik] === 0 ? 1 : 0;

        let temizVeriDizisi = [];
        for (let i = 1; i <= toplamHucreSayisi; i++) {
            if ((i & (i - 1)) !== 0) { 
                temizVeriDizisi.push(duzeltilmisH[i]);
            }
        }
        let temizVeri = temizVeriDizisi.reverse().join("");
        dataOutSpan.innerText = temizVeri + " (Düzeltildi)";
    }
}


function sistemiSifirla() {
    document.getElementById("inputCard").classList.remove("hidden");
    document.getElementById("summaryBar").classList.add("hidden");
    document.getElementById("dynamicSections").classList.add("hidden");
    document.getElementById("analysisCard").classList.add("hidden");
    
    document.getElementById("dataInput").value = "";
    inputPlaceholderGuncelle();
    
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("step2").classList.remove("active");
    document.getElementById("step3").classList.remove("active");

    avatarKonus("Sistem sıfırlandı! Başka bir bit modu seçip tekrar test edebilirsin. 💕");
    
    memoryBits = [];
}