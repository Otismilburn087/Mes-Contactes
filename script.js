/**
 * Todisoa - Digital Business Card
 * Interactive script: vCard Generation, QR Code, Theme & Language Toggles,
 * Direct Messaging, Copy Feedback, Toast System
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. STATE & STORAGE KEYS ---
    const STORAGE_THEME = 'todisoa_theme';
    const STORAGE_LANG = 'todisoa_lang';
    const STORAGE_POPUP = 'todisoa_lead_popup';
    const STORAGE_PHONE = 'todisoa_lead_phone';

    // --- 2. DICTIONARY (FR & MG) ---
    const translations = {
        fr: {
            badgeRole: "Stagiaire MID (DSID)",
            locBadge: "Antananarivo, Madagascar • MID Anosy",
            saveContactBtn: "Enregistrer le contact",
            qrShareBtn: "QR Code & Partage",
            quickCall: "Appel",
            quickEmail: "E-mail",
            tabAll: "Tous",
            tabPhone: "Téléphones",
            tabMessaging: "Messagerie",
            tabEmail: "E-mails",
            tabSocial: "Réseaux",
            titlePhone: "Numéros de Téléphone",
            subPhone: "Appel direct & SMS",
            subWhatsapp: "Message instantané & vocal",
            titleEmail: "Adresses E-mails",
            subEmail: "Pour vos correspondances professionnelles",
            subSocial: "Profils & Comptes",
            subDiscord: "Identifiant & profil",
            prepareMsg: "Rédiger un message rapide",
            quickMsgTitle: "Envoyer un message en 1 clic",
            quickMsgSub: "Préparez votre texte et choisissez l'envoi par WhatsApp ou E-mail",
            msgNameLabel: "Votre nom ou entité :",
            msgTextLabel: "Votre message :",
            sendViaWa: "Envoyer via WhatsApp",
            sendViaMail: "Envoyer via E-mail",
            thankYouText: "Je vous remercie sincèrement pour l'intérêt porté à mon profil et à mes activités.",
            thankYouSub: "Restant à votre entière disposition pour toute collaboration, opportunité professionnelle ou demande d'information.",
            qrModalTitle: "Partager la carte",
            qrModalSub: "Scannez ce QR Code avec votre téléphone pour ouvrir ou enregistrer le contact.",
            qrScanHint: "Scannez avec l'appareil photo de votre smartphone",
            btnCopy: "Copier",
            nativeShare: "Partager l'application",
            downloadQr: "Télécharger QR (PNG)",
            mapModalTitle: "Lieu de travail - MID (DSID)",
            mapModalSub: "Ministère de l'Intérieur et de la Décentralisation (DSID) - Anosy, Antananarivo",
            openInGoogleMaps: "Ouvrir dans Google Maps",
            btnClose: "Fermer",
            stayInTouchTitle: "Rester en contact",
            stayInTouchSub: "Laissez votre numéro si vous souhaitez que Todisoa vous recontacte facilement.",
            popupPhoneLabel: "Votre numéro de téléphone :",
            popupSubmit: "Enregistrer",
            popupSkip: "Plus tard",
            popupNote: "Votre préférence sera mémorisée sur cet appareil.",
            toastCopied: "Copié dans le presse-papiers !",
            toastVcard: "Fichier contact (.vcf) téléchargé avec succès !",
            toastLeadSaved: "Merci ! Votre numéro a été enregistré avec succès."
        },
        mg: {
            badgeRole: "Mpianatra asa MID (DSID)",
            locBadge: "Antananarivo, Madagasikara • MID Anosy",
            saveContactBtn: "Tehirizo ny fifandraisana",
            qrShareBtn: "QR Code & Fizarana",
            quickCall: "Antso",
            quickEmail: "E-mail",
            tabAll: "Rehetra",
            tabPhone: "Finday",
            tabMessaging: "Hafatra",
            tabEmail: "E-mails",
            tabSocial: "Tambazotra",
            titlePhone: "Laharana Finday",
            subPhone: "Antso mivantana sy SMS",
            subWhatsapp: "Hafatra mailaka sy feo",
            titleEmail: "Adiresy E-mail",
            subEmail: "Ho an'ny fifandraisana ara-kasa",
            subSocial: "Kaonty & Tranonkala",
            subDiscord: "Famantarana sy mombamomba",
            prepareMsg: "Hanomana hafatra haingana",
            quickMsgTitle: "Handefa hafatra amin'ny tsindry 1",
            quickMsgSub: "Omano ny soratrao ary fidio ny fandefasana amin'ny WhatsApp na E-mail",
            msgNameLabel: "Anaranao na orinasanao :",
            msgTextLabel: "Ny hafatrao :",
            sendViaWa: "Alefaso amin'ny WhatsApp",
            sendViaMail: "Alefaso amin'ny E-mail",
            thankYouText: "Misaotra betsaka anao tamin'ny fijerena ity pejy ity sy ny fahaliananao.",
            thankYouSub: "Vonona hatrany hiara-miasa, handray tolotr'asa na hamaly fanazavana ilainao.",
            qrModalTitle: "Hizara ny karatra",
            qrModalSub: "Atsopazo amin'ny findainao ity QR Code ity hanokafana na hitahirizana ny fifandraisana.",
            qrScanHint: "Atsopazo amin'ny fakan-tsarin'ny finday",
            btnCopy: "Adikao",
            nativeShare: "Zaraho amin'ny hafa",
            downloadQr: "Ampidino ny QR (PNG)",
            mapModalTitle: "Toeram-piasana - MID (DSID)",
            mapModalSub: "Ministeran'ny Atitany sy ny Fitsinjaram-pahefana (DSID) - Anosy, Antananarivo",
            openInGoogleMaps: "Sokafy amin'ny Google Maps",
            btnClose: "Hakatona",
            stayInTouchTitle: "Hifandray hatrany",
            stayInTouchSub: "Avelao eto ny laharanao raha tianao ny handraisan'i Todisoa anao an-tariby.",
            popupPhoneLabel: "Laharana findainao :",
            popupSubmit: "Tehirizo",
            popupSkip: "Aoriana kely",
            popupNote: "Hotadidin'ity fitaovana ity ny safidinao.",
            toastCopied: "Voadika soa aman-tsara !",
            toastVcard: "Voaomana sy tafiditra ny rakitra fifandraisana (.vcf) !",
            toastLeadSaved: "Misaotra ! Voatahiry soa aman-tsara ny laharanao."
        }
    };

    let currentLang = localStorage.getItem(STORAGE_LANG) || 'fr';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_LANG, lang);
        document.documentElement.lang = lang;
        const langLabel = document.getElementById('langLabel');
        if (langLabel) {
            langLabel.textContent = lang.toUpperCase();
        }

        const dict = translations[lang] || translations.fr;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
    }

    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'fr' ? 'mg' : 'fr');
            showToast(currentLang === 'fr' ? 'Langue : Français' : 'Fiteny : Malagasy');
        });
    }

    // --- 3. TOAST NOTIFICATION SYSTEM ---
    const toastElement = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    let toastTimeout = null;

    function showToast(message, iconClass = 'fa-circle-check', duration = 2800) {
        if (!toastElement || !toastMessage) return;
        if (toastTimeout) clearTimeout(toastTimeout);

        toastMessage.textContent = message;
        if (toastIcon) {
            toastIcon.className = `fas ${iconClass} toast-icon`;
        }
        toastElement.classList.add('show');

        toastTimeout = setTimeout(() => {
            toastElement.classList.remove('show');
        }, duration);
    }

    // --- 4. THEME SWITCHER (Cosmic -> Dark -> Light) ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themes = ['cosmic', 'dark', 'light'];
    let currentTheme = localStorage.getItem(STORAGE_THEME) || 'cosmic';

    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_THEME, theme);

        if (themeIcon) {
            if (theme === 'cosmic') {
                themeIcon.className = 'fas fa-meteor';
            } else if (theme === 'dark') {
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
            }
        }
    }

    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
            applyTheme(themes[nextIndex]);
            showToast(`Thème : ${themes[nextIndex].toUpperCase()}`);
        });
    }

    // --- 5. CLIPBOARD COPY HANDLER ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const textToCopy = button.getAttribute('data-text');
            if (!textToCopy) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = textToCopy;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                // Button visual animation
                const originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check text-success"></i>';
                setTimeout(() => {
                    button.innerHTML = originalHtml;
                }, 1800);

                const dict = translations[currentLang] || translations.fr;
                showToast(dict.toastCopied, 'fa-check');
            } catch (err) {
                console.error('Erreur copie:', err);
                showToast('Impossible de copier automatiquement.', 'fa-triangle-exclamation');
            }
        });
    });

    // --- 6. VCARD (.VCF) GENERATOR & DOWNLOAD ---
    const downloadVcardBtn = document.getElementById('downloadVcardBtn');
    if (downloadVcardBtn) {
        downloadVcardBtn.addEventListener('click', () => {
            const vCardContent = [
                'BEGIN:VCARD',
                'VERSION:3.0',
                'N:Todisoa;;;;',
                'FN:Todisoa',
                'ORG:MID (Ministère de l\'Intérieur et de la Décentralisation) - DSID',
                'TITLE:Stagiaire DSID (Systèmes d\'Information et Digitalisation)',
                'TEL;TYPE=CELL,VOICE,PREF:+261388767355',
                'TEL;TYPE=CELL,VOICE:+261330964198',
                'TEL;TYPE=WHATSAPP:+261378901866',
                'EMAIL;TYPE=INTERNET,PREF:todisoandrianjakamanana@gmail.com',
                'EMAIL;TYPE=INTERNET:gabisangelo52@gmail.com',
                'ADR;TYPE=WORK:;;Antananarivo;Analamanga;;Madagascar',
                `URL:${window.location.href}`,
                'NOTE:Contact officiel Todisoa - Stagiaire MID (DSID) Madagascar',
                'END:VCARD'
            ].join('\r\n');

            const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Todisoa_MID_DSID_Contact.vcf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Celebration confetti!
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 70,
                    spread: 60,
                    origin: { y: 0.7 }
                });
            }

            const dict = translations[currentLang] || translations.fr;
            showToast(dict.toastVcard, 'fa-address-card');
        });
    }

    // --- 7. QR CODE & SHARE MODAL ---
    const qrShareModal = document.getElementById('qrShareModal');
    const openShareModalBtn = document.getElementById('openShareModalBtn');
    const navShareBtn = document.getElementById('navShareBtn');
    const closeQrModalBtn = document.getElementById('closeQrModalBtn');
    const modalQrCode = document.getElementById('modalQrCode');
    const shareUrlInput = document.getElementById('shareUrlInput');
    const copyShareUrlBtn = document.getElementById('copyShareUrlBtn');
    const nativeShareBtn = document.getElementById('nativeShareBtn');
    const downloadQrImageBtn = document.getElementById('downloadQrImageBtn');

    let qrCodeInstance = null;

    function initQrCode() {
        const pageUrl = window.location.href;
        if (shareUrlInput) {
            shareUrlInput.value = pageUrl;
        }

        if (modalQrCode && typeof QRCode === 'function') {
            modalQrCode.innerHTML = '';
            qrCodeInstance = new QRCode(modalQrCode, {
                text: pageUrl,
                width: 200,
                height: 200,
                colorDark: '#0f172a',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    function openShareModal() {
        initQrCode();
        if (qrShareModal) {
            qrShareModal.classList.add('active');
            qrShareModal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeShareModal() {
        if (qrShareModal) {
            qrShareModal.classList.remove('active');
            qrShareModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (openShareModalBtn) openShareModalBtn.addEventListener('click', openShareModal);
    if (navShareBtn) navShareBtn.addEventListener('click', openShareModal);
    if (closeQrModalBtn) closeQrModalBtn.addEventListener('click', closeShareModal);

    if (qrShareModal) {
        qrShareModal.addEventListener('click', (e) => {
            if (e.target === qrShareModal) closeShareModal();
        });
    }

    // Copy Share URL button inside modal
    if (copyShareUrlBtn) {
        copyShareUrlBtn.addEventListener('click', async () => {
            const url = shareUrlInput?.value || window.location.href;
            try {
                await navigator.clipboard.writeText(url);
                showToast('Lien copié dans le presse-papiers !');
            } catch {
                showToast('Lien prêt à être partagé.');
            }
        });
    }

    // Native Web Share
    if (nativeShareBtn) {
        nativeShareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Todisoa - Contact MID (DSID)',
                text: 'Découvrez la carte de contact professionnelle de Todisoa (Stagiaire MID - DSID Madagascar) :',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Error sharing:', err);
                    }
                }
            } else {
                if (shareUrlInput) {
                    shareUrlInput.select();
                    document.execCommand('copy');
                }
                showToast('Lien copié (Partage natif non supporté sur ce navigateur)');
            }
        });
    }

    // Download QR Image
    if (downloadQrImageBtn) {
        downloadQrImageBtn.addEventListener('click', () => {
            const qrImg = modalQrCode?.querySelector('img') || modalQrCode?.querySelector('canvas');
            if (!qrImg) {
                showToast('QR Code non prêt.');
                return;
            }

            let dataUrl = '';
            if (qrImg.tagName.toLowerCase() === 'img') {
                dataUrl = qrImg.src;
            } else if (qrImg.tagName.toLowerCase() === 'canvas') {
                dataUrl = qrImg.toDataURL('image/png');
            }

            if (dataUrl) {
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'Todisoa_Contact_QR.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                showToast('Image du QR Code téléchargée !');
            }
        });
    }

    // --- 8. CATEGORY TABS FILTERING ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contactCards = document.querySelectorAll('.contact-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            contactCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (filter === 'all' || cardCat === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 9. QUICK DIRECT MESSAGE GENERATOR ---
    const msgSenderName = document.getElementById('msgSenderName');
    const customMsgText = document.getElementById('customMsgText');
    const sendViaWhatsAppBtn = document.getElementById('sendViaWhatsAppBtn');
    const sendViaEmailBtn = document.getElementById('sendViaEmailBtn');

    // Trigger quick message scroll from cards
    document.querySelectorAll('.open-quick-msg').forEach(btn => {
        btn.addEventListener('click', () => {
            const box = document.getElementById('quickMsgBox');
            if (box) {
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
                customMsgText?.focus();
            }
        });
    });

    if (sendViaWhatsAppBtn) {
        sendViaWhatsAppBtn.addEventListener('click', () => {
            const sender = msgSenderName?.value.trim() || '';
            const msg = customMsgText?.value.trim() || 'Bonjour Todisoa, je vous contacte depuis votre carte numérique.';
            const fullText = sender ? `Bonjour Todisoa, ici ${sender}.\n\n${msg}` : msg;
            
            const waUrl = `https://wa.me/261378901866?text=${encodeURIComponent(fullText)}`;
            window.open(waUrl, '_blank');
        });
    }

    if (sendViaEmailBtn) {
        sendViaEmailBtn.addEventListener('click', () => {
            const sender = msgSenderName?.value.trim() || '';
            const msg = customMsgText?.value.trim() || 'Bonjour Todisoa,\n\nJe vous contacte suite à la consultation de votre carte de visite.';
            const subject = sender ? `Prise de contact - ${sender}` : 'Prise de contact professionnel';
            
            const mailUrl = `mailto:todisoandrianjakamanana@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
            window.location.href = mailUrl;
        });
    }

    // --- 10. MAP MODAL (WORKPLACE LOCATION: MID ANOSY) ---
    const mapModal = document.getElementById('mapModal');
    const openMapModalBtn = document.getElementById('openMapModalBtn');
    const closeMapModalBtn = document.getElementById('closeMapModalBtn');
    const closeMapModalBtn2 = document.getElementById('closeMapModalBtn2');

    function openMapModal() {
        if (mapModal) {
            mapModal.classList.add('active');
            mapModal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeMapModal() {
        if (mapModal) {
            mapModal.classList.remove('active');
            mapModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (openMapModalBtn) openMapModalBtn.addEventListener('click', openMapModal);
    if (closeMapModalBtn) closeMapModalBtn.addEventListener('click', closeMapModal);
    if (closeMapModalBtn2) closeMapModalBtn2.addEventListener('click', closeMapModal);
    if (mapModal) {
        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) closeMapModal();
        });
    }

    // Escape key closes any active modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeShareModal();
            closeMapModal();
            closePopup('skipped');
        }
    });

    // Helper: Input sanitization to prevent XSS attacks
    function sanitizeText(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // --- 11. STAY IN TOUCH (LEAD POPUP) ---
    const contactPopupOverlay = document.getElementById('contactPopupOverlay');
    const popupPhoneInput = document.getElementById('popupPhoneInput');
    const popupPhoneError = document.getElementById('popupPhoneError');
    const popupSubmitBtn = document.getElementById('popupSubmitBtn');
    const popupSkipBtn = document.getElementById('popupSkipBtn');
    const popupCloseBtn = document.getElementById('popupCloseBtn');

    function closePopup(status) {
        if (!contactPopupOverlay) return;
        localStorage.setItem(STORAGE_POPUP, status);
        contactPopupOverlay.classList.remove('active');
        contactPopupOverlay.setAttribute('aria-hidden', 'true');
    }

    function showLeadPopup() {
        if (!contactPopupOverlay) return;
        if (localStorage.getItem(STORAGE_POPUP)) return;
        contactPopupOverlay.classList.add('active');
        contactPopupOverlay.setAttribute('aria-hidden', 'false');
    }

    if (popupSubmitBtn) {
        popupSubmitBtn.addEventListener('click', () => {
            const phoneVal = popupPhoneInput?.value.trim() || '';
            const clean = phoneVal.replace(/[^0-9+]/g, '');

            if (clean.length < 8) {
                if (popupPhoneError) {
                    popupPhoneError.textContent = currentLang === 'fr' 
                        ? 'Veuillez entrer un numéro valide (au moins 8 chiffres).' 
                        : 'Mampidira laharana marina (farafahakeliny tarehimarika 8).';
                }
                return;
            }

            localStorage.setItem(STORAGE_PHONE, clean);
            const dict = translations[currentLang] || translations.fr;
            showToast(dict.toastLeadSaved, 'fa-check');
            closePopup('submitted');
        });
    }

    if (popupSkipBtn) popupSkipBtn.addEventListener('click', () => closePopup('skipped'));
    if (popupCloseBtn) popupCloseBtn.addEventListener('click', () => closePopup('skipped'));
    if (contactPopupOverlay) {
        contactPopupOverlay.addEventListener('click', (e) => {
            if (e.target === contactPopupOverlay) closePopup('skipped');
        });
    }

    // Trigger popup after 2.5s if first visit
    setTimeout(showLeadPopup, 2500);

    // Initialize saved language
    setLanguage(currentLang);
});
