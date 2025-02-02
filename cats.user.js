// ==UserScript==
// @name         CATS Loader
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  Chat Auto Translator Addon
// @author       Ciber, dDeepLb, Felix and Chastity
// @match        https://bondage-europe.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bondage-europe.com
// @grant        none
// ==/UserScript==

// Bondage Club Mod Development Kit (1.2.0)
// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
/** @type {ModSDKGlobalAPI} */
var SDK = function () { "use strict"; const o = "1.2.0"; function e(o) { alert("Mod ERROR:\n" + o); const e = new Error(o); throw console.error(e), e } const t = new TextEncoder; function n(o) { return !!o && "object" == typeof o && !Array.isArray(o) } function r(o) { const e = new Set; return o.filter((o => !e.has(o) && e.add(o))) } const i = new Map, a = new Set; function c(o) { a.has(o) || (a.add(o), console.warn(o)) } function s(o) { const e = [], t = new Map, n = new Set; for (const r of f.values()) { const i = r.patching.get(o.name); if (i) { e.push(...i.hooks); for (const [e, a] of i.patches.entries()) t.has(e) && t.get(e) !== a && c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e) || ""}\nPatch2:\n${a}`), t.set(e, a), n.add(r.name) } } e.sort(((o, e) => e.priority - o.priority)); const r = function (o, e) { if (0 === e.size) return o; let t = o.toString().replaceAll("\r\n", "\n"); for (const [n, r] of e.entries()) t.includes(n) || c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(o.original, t); let i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, o.name, n), c = r.apply(this, e); return null == a || a(), c }; for (let t = e.length - 1; t >= 0; t--) { const n = e[t], r = i; i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, o.name, n.mod), c = n.hook.apply(this, [e, o => { if (1 !== arguments.length || !Array.isArray(e)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`); return r.call(this, o) }]); return null == a || a(), c } } return { hooks: e, patches: t, patchesSources: n, enter: i, final: r } } function l(o, e = !1) { let r = i.get(o); if (r) e && (r.precomputed = s(r)); else { let e = window; const a = o.split("."); for (let t = 0; t < a.length - 1; t++)if (e = e[a[t]], !n(e)) throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const c = e[a[a.length - 1]]; if ("function" != typeof c) throw new Error(`ModSDK: Function ${o} to be patched not found`); const l = function (o) { let e = -1; for (const n of t.encode(o)) { let o = 255 & (e ^ n); for (let e = 0; e < 8; e++)o = 1 & o ? -306674912 ^ o >>> 1 : o >>> 1; e = e >>> 8 ^ o } return ((-1 ^ e) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(c.toString().replaceAll("\r\n", "\n")), d = { name: o, original: c, originalHash: l }; r = Object.assign(Object.assign({}, d), { precomputed: s(d), router: () => { }, context: e, contextProperty: a[a.length - 1] }), r.router = function (o) { return function (...e) { return o.precomputed.enter.apply(this, [e]) } }(r), i.set(o, r), e[r.contextProperty] = r.router } return r } function d() { for (const o of i.values()) o.precomputed = s(o) } function p() { const o = new Map; for (const [e, t] of i) o.set(e, { name: e, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((o => o.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return o } const f = new Map; function u(o) { f.get(o.name) !== o && e(`Failed to unload mod '${o.name}': Not registered`), f.delete(o.name), o.loaded = !1, d() } function g(o, t) { o && "object" == typeof o || e("Failed to register mod: Expected info object, got " + typeof o), "string" == typeof o.name && o.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o.name); let r = `'${o.name}'`; "string" == typeof o.fullName && o.fullName || e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`), r = `'${o.fullName} (${o.name})'`, "string" != typeof o.version && e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`), o.repository || (o.repository = void 0), void 0 !== o.repository && "string" != typeof o.repository && e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`), null == t && (t = {}), t && "object" == typeof t || e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`); const i = !0 === t.allowReplace, a = f.get(o.name); a && (a.allowReplace && i || e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(a)); const c = o => { let e = g.patching.get(o.name); return e || (e = { hooks: [], patches: new Map }, g.patching.set(o.name, e)), e }, s = (o, t) => (...n) => { var i, a; const c = null === (a = (i = m.errorReporterHooks).apiEndpointEnter) || void 0 === a ? void 0 : a.call(i, o, g.name); g.loaded || e(`Mod ${r} attempted to call SDK function after being unloaded`); const s = t(...n); return null == c || c(), s }, p = { unload: s("unload", (() => u(g))), hookFunction: s("hookFunction", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); "number" != typeof t && e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`), "function" != typeof n && e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`); const s = { mod: g.name, priority: t, hook: n }; return a.hooks.push(s), d(), () => { const o = a.hooks.indexOf(s); o >= 0 && (a.hooks.splice(o, 1), d()) } })), patchFunction: s("patchFunction", ((o, t) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); n(t) || e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`); for (const [n, i] of Object.entries(t)) "string" == typeof i ? a.patches.set(n, i) : null === i ? a.patches.delete(n) : e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`); d() })), removePatches: s("removePatches", (o => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const t = l(o); c(t).patches.clear(), d() })), callOriginal: s("callOriginal", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`); const i = l(o); return Array.isArray(t) || e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`), i.original.apply(null != n ? n : globalThis, t) })), getOriginalHash: s("getOriginalHash", (o => { "string" == typeof o && o || e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`); return l(o).originalHash })) }, g = { name: o.name, fullName: o.fullName, version: o.version, repository: o.repository, allowReplace: i, api: p, loaded: !0, patching: new Map }; return f.set(o.name, g), Object.freeze(p) } function h() { const o = []; for (const e of f.values()) o.push({ name: e.name, fullName: e.fullName, version: e.version, repository: e.repository }); return o } let m; const y = void 0 === window.bcModSdk ? window.bcModSdk = function () { const e = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) }; return m = e, Object.freeze(e) }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();

var CATS = SDK.registerMod({
    name: "CATS",
    fullName: "Chat Auto Translator Script",
    version: "1.1.1",
    repository: "https://github.com/ciberweaboo/cats"
});

const languageNames = {
    "auto": "Auto Detect",
    "af": "Afrikaans",
    "ay": "Aymara",
    "sq": "Albanian",
    "de": "German",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "as": "Assamese",
    "az": "Azerbaijani",
    "bm": "Bambara",
    "bn": "Bengali",
    "bho": "Bhojpuri",
    "be": "Belarusian",
    "my": "Burmese",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "km": "Khmer",
    "kn": "Kannada",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "cs": "Czech",
    "ny": "Nyanja",
    "zh-cn": "Chinese (Simplified)",
    "zh-tw": "Chinese (Traditional)",
    "si": "Sinhala",
    "ko": "Korean",
    "co": "Corsican",
    "ht": "Haitian Creole",
    "hr": "Croatian",
    "da": "Danish",
    "dv": "Dhivehi",
    "doi": "Dogri",
    "sk": "Slovak",
    "sl": "Slovenian",
    "es": "Spanish",
    "eo": "Esperanto",
    "et": "Estonian",
    "eu": "Basque",
    "ee": "Ewe",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gd": "Scottish Gaelic",
    "cy": "Welsh",
    "gl": "Galician",
    "ka": "Georgian",
    "el": "Greek",
    "gn": "Guarani",
    "gu": "Gujarati",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "iw": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "ig": "Igbo",
    "ilo": "Ilocano",
    "id": "Indonesian",
    "en": "English",
    "ga": "Irish",
    "is": "Icelandic",
    "it": "Italian",
    "ja": "Japanese",
    "jw": "Javanese",
    "kk": "Kazakh",
    "rw": "Kinyarwanda",
    "ky": "Kirghiz",
    "gom": "Goan Konkani",
    "kri": "Krio",
    "ku": "Kurdish",
    "ckb": "Central Kurdish",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "ln": "Lingala",
    "lt": "Lithuanian",
    "lg": "Luganda",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mai": "Maithili",
    "ml": "Malayalam",
    "ms": "Malay",
    "mg": "Malagasy",
    "mt": "Maltese",
    "mi": "Māori",
    "mr": "Marathi",
    "mni-mtei": "Manipuri",
    "lus": "Mizo",
    "mn": "Mongolian",
    "nl": "Dutch",
    "ne": "Nepali",
    "no": "Norwegian",
    "or": "Odia",
    "om": "Oromo",
    "pa": "Punjabi",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "qu": "Quechua",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "sa": "Sanskrit",
    "nso": "Northern Sotho",
    "sr": "Serbian",
    "st": "Southern Sotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "so": "Somali",
    "sw": "Swahili",
    "sv": "Swedish",
    "su": "Sundanese",
    "tl": "Tagalog",
    "th": "Thai",
    "ta": "Tamil",
    "tt": "Tatar",
    "tg": "Tajik",
    "te": "Telugu",
    "ti": "Tigrinya",
    "ts": "Tswana",
    "tr": "Turkish",
    "tk": "Turkmen",
    "ak": "Akan",
    "uk": "Ukrainian",
    "ug": "Uyghur",
    "ur": "Urdu",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu"
};
window.languageNames = languageNames;

function setLanguage(lang, sORl) {
    if (sORl === "s") {
        Player.OnlineSettings.CATS.sourceLang = lang;
        quickForcedOnlineSettingsUpdate();
        const fullLangName = languageNames[lang];
        ChatRoomSendLocal(`Source language set to [${lang.toUpperCase()}] (${fullLangName})`, 3000);
    } else if (sORl === "t") {
        Player.OnlineSettings.CATS.targetLang = lang;
        quickForcedOnlineSettingsUpdate();
        const fullLangName = languageNames[lang];
        ChatRoomSendLocal(`Target language set to [${lang.toUpperCase()}] (${fullLangName})`, 3000);
    } else {
        ChatRoomSendLocal("Something is really wrong", 3000);
    }
    Catsify();
}
window.setLanguage = setLanguage;

function Catsify() {
    setTimeout(() => {
        const messages = document.querySelectorAll('.ChatMessageLocalMessage');
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            // Add a "background" container for the emojis
            const emojiBackground = document.createElement('div');
            emojiBackground.style.position = "absolute";
            emojiBackground.style.top = "-10%"; // Slightly extend above
            emojiBackground.style.left = "-10%"; // Slightly extend left
            emojiBackground.style.width = "120%"; // Extend width to ensure full coverage
            emojiBackground.style.height = "120%"; // Extend height to ensure full coverage
            emojiBackground.style.pointerEvents = "none"; // So it doesn't interfere with clicks
            emojiBackground.style.overflow = "hidden";
            emojiBackground.style.zIndex = "0"; // Ensure it stays behind the text

            // Create a sparse grid of emojis
            const rows = 3; // Fewer rows for less density
            const cols = 6; // Fewer columns for less density
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (Math.random() < 0.3) { // 30% chance for an emoji (reduced probability)
                        const emoji = document.createElement('span');
                        emoji.textContent = Math.random() > 0.5 ? "🐱" : "🐾"; // Alternate between emojis
                        emoji.style.position = "absolute";
                        emoji.style.fontSize = "1em"; // Keep them small to avoid distraction
                        emoji.style.opacity = "0.3"; // Slightly ghosted appearance
                        emoji.style.transform = `translate(-50%, -50%)`; // Center emojis on the grid points

                        // Place the emoji in a grid-like fashion
                        emoji.style.top = `${(row + 0.5) * (100 / rows)}%`;
                        emoji.style.left = `${(col + 0.5) * (100 / cols)}%`;

                        emojiBackground.appendChild(emoji);
                    }
                }
            }

            // Convert Player.LabelColor (hex) to rgba with transparency
            const hexColor = Player.LabelColor || "#000000"; // Default to black if no LabelColor is set
            const rgbaColor = hexToRgba(hexColor, 0.1);

            // Insert the emoji background and set the message to relative positioning
            lastMessage.style.position = "relative";
            lastMessage.appendChild(emojiBackground);

            // Set the background color using the calculated rgba value
            lastMessage.style.backgroundColor = rgbaColor;
        }
    }, 10);
}

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
    // Remove the '#' if present
    hex = hex.replace(/^#/, "");

    // Parse r, g, b values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Return rgba string with specified alpha
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    // Example: rgba(255, 165, 0, 0.1)
}

//rework for CATS
async function translate(message, sl, tl) {
    //quick return if source and target languages are the same
    if (sl == tl) {
        return message;
    }
    try {
        const responsegt = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sl + "&tl=" + tl + "&dt=t&q=" + encodeURI(message));
        const response = await responsegt.json();
        //handle returns for the first translation request
        if (response[0][0][0].toLowerCase() == message.toLowerCase()) {
            return message;
        }
        try {
            const responsegt2 = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + tl + "&dt=t&q=" + encodeURI(message));
            const response2 = await responsegt2.json();
            //handle returns for the second translation request
            if (response2[0][0][0].toLowerCase() == message.toLowerCase() || response2[2] == tl) {
                return message;
            }
        } catch (e) {
            console.warn("CATS: Translation phase(2) failed: " + e);
        }
        if (response[6]) {
            if (response[6] > 0.36 && response[6] < 0.4) {
                return message;
            }
        }
        //return normal message if the language is translatable, but not in our list... (most likely cat/animal like moans/sounds being ruined by it...)
        if (!languageNames[response[2]]) {
            return message;
        }
        const safetySpace = " ";
        //finally return the translated message
        return `${safetySpace}[<span style="cursor: pointer; 
        color: ${Player.LabelColor || '#000000'}; 
        text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8), 0px 0px 5px rgba(0, 0, 0, 0.3);" 
        onclick="ChatRoomSendLocal('Original ${languageNames[response[2]]} message: ' + decodeURIComponent('${encodeURIComponent(message)}'), 3000),Catsify()" 
        title="Click to see the original message">${response[2]}</span> > ${tl}]${response[0][0][0]}`;

    } catch (e) {
        console.warn("CATS: Translation phase(1) failed: " + e);
        return message;
    }
}

function initWait() {
    if (CurrentScreen == null || CurrentScreen === "Login") {
        CATS.hookFunction("LoginResponse", 0, (args, next) => {
            next(args);
            const response = args[0];
            if (response && typeof response.Name === "string" && typeof response.AccountName === "string") {
                init();
            }
        });
    } else {
        init();
    }
}

function quickForcedOnlineSettingsUpdate() {
    ServerAccountUpdate.QueueData({
        OnlineSettings: Player.OnlineSettings
    }, true);
}
window.quickForcedOnlineSettingsUpdate = quickForcedOnlineSettingsUpdate;

function init() {
    if (!Player?.OnlineSettings?.CATS) {
        Player.OnlineSettings.CATS = {
            sourceLang: "auto",
            targetLang: "en",
            enabled: false
        };
        quickForcedOnlineSettingsUpdate();
    }

    // Updated for clean HTML and handling
    CATS.hookFunction("ChatRoomMessage", 0, async (args, next) => {
        var message = args[0];
        if ((message.Type === "Chat" || message.Type === "Whisper"/* || message.Type === "Action" */|| message.Type === "Emote") && message.Sender !== Player.MemberNumber && Player.OnlineSettings.CATS.enabled) {
            var sourceMessage = message.Content;
            //if (message.Content == "ServerDisconnect" || message.Content == "ServerLeave" || message.Content == "Beep") { return next(args); }
            const SenderCharacter = ChatRoomCharacter.find(C => C.MemberNumber == message.Sender);
            if (SpeechGetTotalGagLevel(SenderCharacter) > 1) { return next(args); }
            //avoid html injection
            if (sourceMessage) {
                //add "\" infront of all html elements like: <, >, /, ", ' , & , ` and \ to prevent html injection
                sourceMessage = sourceMessage
                .replace(/\\/g, "\\")
                .replace(/</g, "<")
                .replace(/>/g, ">")
                .replace(/\//g, "/")
                .replace(/"/g, '"')
                .replace(/'/g, "")
                .replace(/&/g, "&")
                .replace(/`/g, "`");
                sourceMessage = encodeURIComponent(sourceMessage);
            }
            try {
                // Translate the message
                var finalMessage = await translate(decodeURIComponent(sourceMessage), Player.OnlineSettings.CATS.sourceLang, Player.OnlineSettings.CATS.targetLang);
                // Split the response into two parts: the HTML language part and the translated message
                if (finalMessage.startsWith(" ")) {
                    var translationInfo = finalMessage.split("]");
                    if (translationInfo[1]) {
                        // Send the clickable HTML part as a local message
                        var languagePart = translationInfo[0].toString() + "] ⤵";
                        if (message.Type === "Emote") { //remove the star from the star if there is one else add the sender's name
                            let sourceMessage2 = sourceMessage;
                            if (sourceMessage.startsWith("*")) {
                                sourceMessage2 = sourceMessage2.substring(1);
                            } else {
                                sourceMessage2 = CharacterNickname(SenderCharacter) +" "+ sourceMessage2;
                            }
                            languagePart = languagePart.replace(sourceMessage, sourceMessage2);
                        }
                        // Also replace '%20' issues if it's still there, to prevent issues with spaces
                        ChatRoomSendLocal(decodeURIComponent(languagePart));
                        Catsify();
                        // Send the translated message as a separate message
                        finalMessage = finalMessage.replace(translationInfo[0] + "]", "");
                        // Remove the safety space before sending
                        finalMessage = finalMessage.trimStart();
                    }
                }
                // Update the message content to be the translated message
                message.Content = finalMessage;
                return next([message]);
            } catch (e) {
                console.warn("CATS: Translation failed: " + e);
                return next(args);
            }
        } else {
            return next(args);
        }
    });

    CommandCombine([
        {
            Tag: "cats",
            Action: () => {
                ChatRoomSendLocal(`CATS is a Chat Auto Translator Script.\nUse [/ttoggle] to enable or disable it.\nUse [/tlang] to set the target language.\nUse [/slang] to set the Source language.\nCurrently turned: [${Player.OnlineSettings.CATS.enabled ? "ON" : "OFF"}]\nTarget Language: [${Player.OnlineSettings.CATS.targetLang.toUpperCase()}] (${languageNames[Player.OnlineSettings.CATS.targetLang]})\nSource Language: [${Player.OnlineSettings.CATS.sourceLang.toUpperCase()}] (${languageNames[Player.OnlineSettings.CATS.sourceLang]})`);
                Catsify();
            },
            Description: "Gives information about the CATS settings and commands."
        },
        {
            Tag: "ttoggle",
            Action: () => {
                if (!Player.OnlineSettings.CATS.enabled) {
                    Player.OnlineSettings.CATS.enabled = true;
                    quickForcedOnlineSettingsUpdate();
                    ChatRoomSendLocal("Chat Translator is now ON", 3000);
                    Catsify();
                } else {
                    Player.OnlineSettings.CATS.enabled = false;
                    quickForcedOnlineSettingsUpdate();
                    ChatRoomSendLocal("Chat Translator is now OFF", 3000);
                    Catsify();
                }
            },
            Description: "Toggle CATS on or off"
        },
        {
            Tag: "tlang",
            Action: (targetLang) => {
                if (targetLang) {
                    // Check if the targetLang is not "auto" and exists in the languageNames object
                    if (targetLang.toLowerCase() !== "auto" && languageNames.hasOwnProperty(targetLang)) {
                        Player.OnlineSettings.CATS.targetLang = targetLang;
                        quickForcedOnlineSettingsUpdate();
        
                        // Retrieve the full language name from the languageNames map
                        const fullLangName = languageNames[targetLang];
        
                        // Send confirmation message with code and full name
                        ChatRoomSendLocal(`Target language set to [${targetLang.toUpperCase()}] (${fullLangName})`, 3000);
                        Catsify();
                    } else {
                        // Handle the case where the targetLang is "auto" or not valid
                        const titleColor = Player.LabelColor || "#000000"; // Default to black if Player.LabelColor is undefined
        
                        // Filter out the "auto" entry from the languageNames
                        const availableLanguages = Object.entries(languageNames)
                            .filter(([key, name]) => key !== "auto") // Exclude "auto"
                            .map(([key, name]) => {
                                return `<span 
                                            class="language-option" 
                                            data-lang="${key}" 
                                            onclick="setLanguage('${key}', 't')" 
                                            style="display: inline; margin-right: 5px;"
                                        >
                                        ${key}
                                        </span>`;
                            }).join(", ");
                        ChatRoomSendLocal(
                            `<style>
                            .language-option {
                            cursor: pointer;
                            text-shadow: 1px 1px 2px ${titleColor};
                            transition: text-shadow 0.2s;
                            display: inline;
                            margin-right: 5px;
                            white-space: nowrap;
                            }
                            .language-option:hover {
                            text-shadow: 2px 2px 4px ${titleColor};
                            }
                            </style>
                            Target language ${targetLang} is not available.<br>
                            Supported languages: [${availableLanguages}]`,
                            10000);
                        Catsify();
                    }
                } else {
                    ChatRoomSendLocal("No target lang provided", 3000);
                    Catsify();
                }
            },
            Description: "Change the target language of CATS."
        },
        {
            Tag: "slang",
            Action: (sourceLang) => {
                if (sourceLang) {
                    // Check if the sourceLang exists in the languageNames object
                    if (languageNames.hasOwnProperty(sourceLang)) {
                        Player.OnlineSettings.CATS.sourceLang = sourceLang;
                        quickForcedOnlineSettingsUpdate();
                        
                        // Retrieve the full language name from the languageNames map
                        const fullLangName = languageNames[sourceLang];
                        
                        // Send confirmation message with code and full name
                        ChatRoomSendLocal(`Source language set to [${sourceLang.toUpperCase()}] (${fullLangName})`, 3000);
                        Catsify();
                    } else {
                        // Fallback for invalid sourceLang input
                        const titleColor = Player.LabelColor || "#000000"; // Default color
                        const availableLanguages = Object.entries(languageNames)
                            .map(([key, name]) => {
                                return `<span class="language-option" data-lang="${key}" onclick="setLanguage('${key}', 's')" style="display: inline; margin-right: 5px;">
                                            ${key}
                                        </span>`;
                            })
                            .join(", ");
                        ChatRoomSendLocal(
                            `<style>
                                .language-option {
                                    cursor: pointer;
                                    text-shadow: 1px 1px 2px ${titleColor};
                                    transition: text-shadow 0.2s;
                                    display: inline;
                                    margin-right: 5px;
                                    white-space: nowrap;
                                }
                                .language-option:hover {
                                    text-shadow: 2px 2px 4px ${titleColor};
                                }
                            </style>
                            Source language ${sourceLang} is not available.<br>
                            Supported languages: [${availableLanguages}]`,
                            10000);
                        Catsify();
                    }
                } else {
                    // If no sourceLang is provided
                    ChatRoomSendLocal("No source lang provided", 3000);
                    Catsify();
                }
            },
            Description: "Change the source language of CATS."
        }        
    ])
}

initWait();