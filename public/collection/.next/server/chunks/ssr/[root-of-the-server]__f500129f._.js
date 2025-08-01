module.exports = {

"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[project]/src/components/HeroCarousel/HeroCarousel.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "HeroCarousel-module__kybdLG__active",
  "bgCarousel": "HeroCarousel-module__kybdLG__bgCarousel",
  "caption": "HeroCarousel-module__kybdLG__caption",
  "cta": "HeroCarousel-module__kybdLG__cta",
  "divider": "HeroCarousel-module__kybdLG__divider",
  "expandContainer": "HeroCarousel-module__kybdLG__expandContainer",
  "fgCarousel": "HeroCarousel-module__kybdLG__fgCarousel",
  "fgVideo": "HeroCarousel-module__kybdLG__fgVideo",
  "fgVideoContainer": "HeroCarousel-module__kybdLG__fgVideoContainer",
  "heroCarousel": "HeroCarousel-module__kybdLG__heroCarousel",
  "heroWrapper": "HeroCarousel-module__kybdLG__heroWrapper",
  "nav": "HeroCarousel-module__kybdLG__nav",
  "navHoverEffect": "HeroCarousel-module__kybdLG__navHoverEffect",
  "next": "HeroCarousel-module__kybdLG__next",
  "nextTitle": "HeroCarousel-module__kybdLG__nextTitle",
  "nextUp": "HeroCarousel-module__kybdLG__nextUp",
  "prev": "HeroCarousel-module__kybdLG__prev",
  "progressBar": "HeroCarousel-module__kybdLG__progressBar",
  "rightControls": "HeroCarousel-module__kybdLG__rightControls",
  "textContent": "HeroCarousel-module__kybdLG__textContent",
  "title": "HeroCarousel-module__kybdLG__title",
  "video": "HeroCarousel-module__kybdLG__video",
  "videoContainer": "HeroCarousel-module__kybdLG__videoContainer",
});
}}),
"[externals]/react-dom [external] (react-dom, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}}),
"[project]/src/components/ScrollSection/ExpandingSection.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "caption": "ExpandingSection-module__RRCxxG__caption",
  "content": "ExpandingSection-module__RRCxxG__content",
  "grid": "ExpandingSection-module__RRCxxG__grid",
  "image": "ExpandingSection-module__RRCxxG__image",
  "imageContainer": "ExpandingSection-module__RRCxxG__imageContainer",
  "item": "ExpandingSection-module__RRCxxG__item",
  "label": "ExpandingSection-module__RRCxxG__label",
  "title": "ExpandingSection-module__RRCxxG__title",
  "wrapper": "ExpandingSection-module__RRCxxG__wrapper",
});
}}),
"[externals]/gsap [external] (gsap, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("gsap", () => require("gsap"));

module.exports = mod;
}}),
"[externals]/gsap/ScrollTrigger.js [external] (gsap/ScrollTrigger.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("gsap/ScrollTrigger.js", () => require("gsap/ScrollTrigger.js"));

module.exports = mod;
}}),
"[project]/src/components/ScrollSection/ExpandingSection.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ScrollSection/ExpandingSection.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gsap [external] (gsap, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gsap/ScrollTrigger.js [external] (gsap/ScrollTrigger.js, cjs)");
'use client';
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__["ScrollTrigger"]);
const ExpandingSection = ()=>{
    const contentRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const imagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const articles = [
        {
            id: 1,
            title: "Cartier Celebrates 100 Years of Trinity",
            image: "/watches.jpg"
        },
        {
            id: 2,
            title: "Trinity: A Contemporary Icon",
            image: "/caps.jpg"
        },
        {
            id: 3,
            title: "All Linked by Trinity",
            image: "/perfumes.jpg"
        },
        {
            id: 4,
            title: "Trinity, A Symbol of Unity",
            image: "/sunglasses.jpg"
        },
        {
            id: 5,
            title: "Trinity 100, The Journey of Trinity",
            image: "/jackets.jpg"
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!contentRef.current) return;
        const tl = __TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__["gsap"].timeline({
            scrollTrigger: {
                trigger: contentRef.current,
                start: 'top bottom',
                end: 'top center',
                scrub: 1
            }
        });
        // Content animation
        tl.fromTo(contentRef.current, {
            y: 50,
            opacity: 0.7
        }, {
            y: 0,
            opacity: 1,
            duration: 1
        });
        // Images animation
        tl.fromTo(imagesRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.5");
        return ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__["ScrollTrigger"].getAll().forEach((t)=>t.kill());
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: contentRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].wrapper,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                    children: "CHAPTER ONE"
                }, void 0, false, {
                    fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: [
                        "3 ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                            children: "IS THE"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                            lineNumber: 59,
                            columnNumber: 40
                        }, this),
                        " MAGIC NUMBER"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].grid,
                    children: articles.map((article, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: (el)=>imagesRef.current[i] = el,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].item,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].imageContainer,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: article.image,
                                        alt: "",
                                        fill: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].image,
                                        sizes: "(max-width: 768px) 100vw, 50vw"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].label,
                                    children: article.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, article.id, true, {
                            fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollSection/ExpandingSection.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ExpandingSection;
}}),
"[project]/src/components/HeroCarousel/HeroCarousal.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/HeroCarousel/HeroCarousel.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollSection/ExpandingSection.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gsap [external] (gsap, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gsap/ScrollTrigger.js [external] (gsap/ScrollTrigger.js, cjs)");
'use client';
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__["ScrollTrigger"]);
const HeroCarousel = ()=>{
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const progressInterval = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const fgVideoRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const heroRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const expandRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const carouselItems = [
        {
            bgVideo: '/background.mp4',
            fgVideo: '/hero_video.mp4',
            title: 'CREATIVE ALCHEMY',
            nextTitle: 'TECHNOLOGY TRINITY'
        },
        {
            bgVideo: '/hero_video.mp4',
            fgVideo: '/video.mp4',
            title: '3 IS THE MAGIC NUMBER',
            nextTitle: 'CREATIVE ALCHEMY'
        },
        {
            bgVideo: '/video.mp4',
            fgVideo: '/hero_video2.mp4',
            title: 'SHAKE UP THE SENSES',
            nextTitle: 'TIME IS AN ILLUSION'
        }
    ];
    const startProgress = ()=>{
        if (progressInterval.current) clearInterval(progressInterval.current);
        setProgress(0);
        progressInterval.current = setInterval(()=>{
            setProgress((prev)=>{
                if (prev >= 100) {
                    handleNext();
                    return 0;
                }
                return prev + 100 / (8 * 10);
            });
        }, 100);
    };
    const handleNext = ()=>{
        setActiveIndex((prev)=>(prev + 1) % carouselItems.length);
    };
    const handlePrev = ()=>{
        setActiveIndex((prev)=>(prev - 1 + carouselItems.length) % carouselItems.length);
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isPlaying) startProgress();
        return ()=>{
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [
        isPlaying,
        activeIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const safePlay = (video)=>{
            if (!video) return;
            video.currentTime = 0;
            video.play().catch(console.warn);
        };
        videoRefs.current.forEach((v)=>v && (v.currentTime = 0));
        fgVideoRefs.current.forEach((v)=>v && (v.currentTime = 0));
        safePlay(videoRefs.current[activeIndex]);
        safePlay(fgVideoRefs.current[activeIndex]);
    }, [
        activeIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!heroRef.current || !expandRef.current) return;
        const tl = __TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__["gsap"].timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true
            }
        });
        // Hero content fades out
        tl.to(heroRef.current, {
            opacity: 0,
            y: -100,
            ease: 'power2.inOut'
        }, 0);
        // Expanding section grows
        tl.to(expandRef.current, {
            height: '100vh',
            y: 0,
            ease: 'power2.inOut'
        }, 0);
        return ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__["ScrollTrigger"].getAll().forEach((t)=>t.kill());
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroWrapper,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
            ref: heroRef,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroCarousel,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bgCarousel,
                    children: carouselItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].videoContainer} ${index === activeIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("video", {
                                ref: (el)=>videoRefs.current[index] = el,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].video,
                                src: item.bgVideo,
                                playsInline: true,
                                muted: true,
                                loop: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this)
                        }, `bg-${index}`, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgCarousel,
                    children: carouselItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgVideoContainer} ${index === activeIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("video", {
                                ref: (el)=>fgVideoRefs.current[index] = el,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgVideo,
                                src: item.fgVideo,
                                playsInline: true,
                                muted: true,
                                loop: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        }, `fg-${index}`, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: carouselItems[activeIndex].title
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cta,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                    children: "ALL CHAPTERS"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                    children: "READ ARTICLE"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightControls,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nav,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].prev,
                                    onClick: handlePrev,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 4 5",
                                            fill: "none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                d: "M0 2.5L3.75 4.66506L3.75 0.334936L0 2.5Z",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navHoverEffect
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].divider
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].next,
                                    onClick: handleNext,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 4 5",
                                            fill: "none",
                                            transform: "rotate(180)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                d: "M0 2.5L3.75 4.66506L3.75 0.334936L0 2.5Z",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navHoverEffect
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nextUp,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                    children: "NEXT UP"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nextTitle,
                                    children: carouselItems[(activeIndex + 1) % carouselItems.length].nextTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].progressBar,
                                    style: {
                                        width: `${progress}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    ref: expandRef,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].expandContainer,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = HeroCarousel;
}}),
"[project]/src/pages/index.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeroCarousel/HeroCarousal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollSection/ExpandingSection.tsx [ssr] (ecmascript)");
;
;
;
;
const HomePage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Premium Brand Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "A premium brand experience inspired by Cartier"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "homePage",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ExpandingSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = HomePage;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f500129f._.js.map