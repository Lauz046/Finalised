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
  "fgCarousel": "HeroCarousel-module__kybdLG__fgCarousel",
  "fgVideo": "HeroCarousel-module__kybdLG__fgVideo",
  "fgVideoContainer": "HeroCarousel-module__kybdLG__fgVideoContainer",
  "heroCarousel": "HeroCarousel-module__kybdLG__heroCarousel",
  "heroWrapper": "HeroCarousel-module__kybdLG__heroWrapper",
  "overlaySection": "HeroCarousel-module__kybdLG__overlaySection",
  "rightControls": "HeroCarousel-module__kybdLG__rightControls",
  "sectionGrid": "HeroCarousel-module__kybdLG__sectionGrid",
  "sectionItem": "HeroCarousel-module__kybdLG__sectionItem",
  "textContent": "HeroCarousel-module__kybdLG__textContent",
  "title": "HeroCarousel-module__kybdLG__title",
  "video": "HeroCarousel-module__kybdLG__video",
  "videoContainer": "HeroCarousel-module__kybdLG__videoContainer",
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
"[externals]/react-dom [external] (react-dom, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gsap [external] (gsap, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gsap$2f$ScrollTrigger$2e$js__$5b$external$5d$__$28$gsap$2f$ScrollTrigger$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gsap/ScrollTrigger.js [external] (gsap/ScrollTrigger.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
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
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const gridRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useLayoutEffect"])(()=>{
        if (!overlayRef.current || !gridRef.current) return;
        const tl = __TURBOPACK__imported__module__$5b$externals$5d2f$gsap__$5b$external$5d$__$28$gsap$2c$__cjs$29$__["gsap"].timeline({
            scrollTrigger: {
                trigger: overlayRef.current,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
                pin: true
            }
        });
        tl.to(overlayRef.current, {
            scaleY: 1.5,
            borderRadius: 0,
            ease: 'power2.inOut',
            transformOrigin: 'center center'
        });
        const items = gridRef.current.querySelectorAll(`.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionItem}`);
        items.forEach((item, index)=>{
            tl.to(item, {
                top: `${10 + index * 18}%`,
                height: 220,
                ease: 'power2.out'
            }, '<');
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            overflowX: 'hidden'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroWrapper,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    ref: heroRef,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroCarousel,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bgCarousel,
                            children: carouselItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].videoContainer} ${index === activeIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("video", {
                                        ref: (el)=>{
                                            videoRefs.current[index] = el;
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].video,
                                        src: item.bgVideo,
                                        playsInline: true,
                                        muted: true,
                                        loop: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this)
                                }, `bg-${index}`, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgCarousel,
                            children: carouselItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgVideoContainer} ${index === activeIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("video", {
                                        ref: (el)=>{
                                            fgVideoRefs.current[index] = el;
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgVideo,
                                        src: item.fgVideo,
                                        playsInline: true,
                                        muted: true,
                                        loop: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this)
                                }, `fg-${index}`, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                                    children: carouselItems[activeIndex].title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cta,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                            children: "ALL CHAPTERS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                            children: "READ ARTICLE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    ref: overlayRef,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overlaySection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "Discover More"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: gridRef,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionGrid,
                            children: articles.map((article, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: article.image,
                                                alt: article.title,
                                                fill: true,
                                                style: {
                                                    objectFit: 'cover',
                                                    borderRadius: 'inherit'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 172,
                                                columnNumber: 5
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 171,
                                            columnNumber: 3
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            style: {
                                                position: 'absolute',
                                                bottom: 0,
                                                background: 'rgba(255,255,255,0.7)',
                                                width: '100%',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                zIndex: 2
                                            },
                                            children: article.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 182,
                                            columnNumber: 3
                                        }, this)
                                    ]
                                }, article.id, true, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
        lineNumber: 124,
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__9de538c5._.js.map