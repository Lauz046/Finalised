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
  "fgCarousel": "HeroCarousel-module__kybdLG__fgCarousel",
  "fgVideo": "HeroCarousel-module__kybdLG__fgVideo",
  "fgVideoContainer": "HeroCarousel-module__kybdLG__fgVideoContainer",
  "fullView": "HeroCarousel-module__kybdLG__fullView",
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
  "scrollSectionContainer": "HeroCarousel-module__kybdLG__scrollSectionContainer",
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
"[project]/src/components/ScrollSection/ScrollSection.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "articleItem": "ScrollSection-module__5_nnia__articleItem",
  "articleRow": "ScrollSection-module__5_nnia__articleRow",
  "articleTitle": "ScrollSection-module__5_nnia__articleTitle",
  "caption": "ScrollSection-module__5_nnia__caption",
  "container": "ScrollSection-module__5_nnia__container",
  "content": "ScrollSection-module__5_nnia__content",
  "fullView": "ScrollSection-module__5_nnia__fullView",
  "image": "ScrollSection-module__5_nnia__image",
  "imageWrapper": "ScrollSection-module__5_nnia__imageWrapper",
  "title": "ScrollSection-module__5_nnia__title",
});
}}),
"[project]/src/components/ScrollSection/ScrollSection.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ScrollSection/ScrollSection.module.css [ssr] (css module)");
'use client';
;
;
;
;
const ScrollSection = ({ onExpandChange })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            if (!containerRef.current) return;
            const scrollY = window.scrollY;
            const triggerPoint = window.innerHeight * 0.6;
            if (scrollY > triggerPoint && !isExpanded) {
                containerRef.current.classList.add(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fullView);
                setIsExpanded(true);
                onExpandChange?.(true);
            } else if (scrollY <= triggerPoint && isExpanded) {
                containerRef.current.classList.remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fullView);
                setIsExpanded(false);
                onExpandChange?.(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, [
        isExpanded,
        onExpandChange
    ]);
    const articles = [
        {
            id: 1,
            title: "CARTIER CELEBRATES 100 YEARS OF TRINITY",
            image: "/watches.jpg"
        },
        {
            id: 2,
            title: "TRINITY: A CONTEMPORARY ICON",
            image: "/caps.jpg"
        },
        {
            id: 3,
            title: "ALL LINKED BY TRINITY",
            image: "/perfumes.jpg"
        },
        {
            id: 4,
            title: "TRINITY, A SYMBOL OF UNITY",
            image: "/sunglasses.jpg"
        },
        {
            id: 5,
            title: "TRINITY 100, THE JOURNEY OF TRINITY",
            image: "/jackets.jpg"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                    children: "CHAPTER ONE"
                }, void 0, false, {
                    fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: "3 IS THE MAGIC NUMBER"
                }, void 0, false, {
                    fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].articleRow,
                    children: articles.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].articleItem,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].imageWrapper,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: article.image,
                                        alt: "",
                                        fill: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].image,
                                        sizes: "(max-width: 768px) 100vw, 33vw"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].articleTitle,
                                    children: article.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, article.id, true, {
                            fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ScrollSection;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollSection/ScrollSection.tsx [ssr] (ecmascript)");
'use client';
;
;
;
;
const HeroCarousel = ()=>{
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [isScrollExpanded, setIsScrollExpanded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const progressInterval = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const fgVideoRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroWrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
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
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            }, `bg-${index}`, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 81,
                        columnNumber: 9
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
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, `fg-${index}`, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 96,
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
                                lineNumber: 112,
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
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                        children: "READ ARTICLE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 111,
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
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navHoverEffect
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 125,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].divider
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 127,
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
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navHoverEffect
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 120,
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
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nextTitle,
                                        children: carouselItems[(activeIndex + 1) % carouselItems.length].nextTitle
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].progressBar,
                                        style: {
                                            width: `${progress}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].scrollSectionContainer} ${isScrollExpanded ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fullView : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onExpandChange: setIsScrollExpanded
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = HeroCarousel;
}}),
"[project]/src/pages/index.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// pages/index.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeroCarousel/HeroCarousal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollSection/ScrollSection.tsx [ssr] (ecmascript)");
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
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "A premium brand experience inspired by Cartier"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "homePage",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = HomePage;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__94342829._.js.map