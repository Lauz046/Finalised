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
  "char": "HeroCarousel-module__kybdLG__char",
  "cta": "HeroCarousel-module__kybdLG__cta",
  "fgCarousel": "HeroCarousel-module__kybdLG__fgCarousel",
  "fgVideo": "HeroCarousel-module__kybdLG__fgVideo",
  "fgVideoContainer": "HeroCarousel-module__kybdLG__fgVideoContainer",
  "fgVideos": "HeroCarousel-module__kybdLG__fgVideos",
  "fullView": "HeroCarousel-module__kybdLG__fullView",
  "heroCarousel": "HeroCarousel-module__kybdLG__heroCarousel",
  "heroWrapper": "HeroCarousel-module__kybdLG__heroWrapper",
  "nav": "HeroCarousel-module__kybdLG__nav",
  "navContainer": "HeroCarousel-module__kybdLG__navContainer",
  "navDivider": "HeroCarousel-module__kybdLG__navDivider",
  "navHoverEffect": "HeroCarousel-module__kybdLG__navHoverEffect",
  "next": "HeroCarousel-module__kybdLG__next",
  "nextTitle": "HeroCarousel-module__kybdLG__nextTitle",
  "nextUp": "HeroCarousel-module__kybdLG__nextUp",
  "prev": "HeroCarousel-module__kybdLG__prev",
  "progressBar": "HeroCarousel-module__kybdLG__progressBar",
  "rightSideControls": "HeroCarousel-module__kybdLG__rightSideControls",
  "scrollSectionContainer": "HeroCarousel-module__kybdLG__scrollSectionContainer",
  "siteHeadline": "HeroCarousel-module__kybdLG__siteHeadline",
  "space": "HeroCarousel-module__kybdLG__space",
  "textCarousel": "HeroCarousel-module__kybdLG__textCarousel",
  "video": "HeroCarousel-module__kybdLG__video",
  "videoContainer": "HeroCarousel-module__kybdLG__videoContainer",
  "videos": "HeroCarousel-module__kybdLG__videos",
});
}}),
"[project]/src/components/HeroCarousel/HeroCarousal.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// components/HeroCarousel/HeroCarousel.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/HeroCarousel/HeroCarousel.module.css [ssr] (css module)");
'use client';
;
;
;
const HeroCarousel = ()=>{
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const progressInterval = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const fgVideoRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const carouselItems = [
        {
            bgVideo: '/background.mp4',
            fgVideo: '/hero_video.mp4',
            title: 'A precious new hybrid',
            nextTitle: 'Venice film festival'
        },
        {
            bgVideo: '/hero_video.mp4',
            fgVideo: '/video.mp4',
            title: '3 is the magic number',
            nextTitle: 'Creative Alchemy'
        },
        {
            bgVideo: '/video.mp4',
            fgVideo: '/hero_video2.mp4',
            title: 'Shake up the senses',
            nextTitle: 'Time is an illusion'
        },
        {
            bgVideo: '/hero_video2.mp4',
            fgVideo: '/background.mp4',
            title: 'Appear and disappear',
            nextTitle: 'The power of transformation'
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
                return prev + 100 / (8 * 10); // 8 second duration
            });
        }, 100);
    };
    const handleNext = ()=>{
        setActiveIndex((prev)=>(prev + 1) % carouselItems.length);
        setProgress(0);
    };
    const handlePrev = ()=>{
        setActiveIndex((prev)=>(prev - 1 + carouselItems.length) % carouselItems.length);
        setProgress(0);
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isPlaying) {
            startProgress();
        } else if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
        return ()=>{
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [
        isPlaying,
        activeIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const safePlay = (video)=>{
            if (!video) return;
            try {
                video.currentTime = 0;
                video.play().catch((err)=>console.warn('Autoplay failed:', err));
            } catch (err) {
                console.warn('Autoplay failed:', err);
            }
        };
        // Reset all videos
        videoRefs.current.forEach((v)=>v && (v.currentTime = 0));
        fgVideoRefs.current.forEach((v)=>v && (v.currentTime = 0));
        // Play active videos
        safePlay(videoRefs.current[activeIndex]);
        safePlay(fgVideoRefs.current[activeIndex]);
    }, [
        activeIndex
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroWrapper,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroCarousel,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bgCarousel,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].videos,
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
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this)
                            }, `bg-${index}`, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgCarousel,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fgVideos,
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
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this)
                            }, `fg-${index}`, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textCarousel,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textCarouselItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].siteHeadline,
                                    children: carouselItems[activeIndex].title.split(' ').map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Fragment, {
                                            children: [
                                                i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].space,
                                                    children: " "
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 31
                                                }, this),
                                                word.split('').map((char, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].char,
                                                        style: {
                                                            opacity: 1,
                                                            filter: 'blur(0px) brightness(1)',
                                                            willChange: 'transform'
                                                        },
                                                        children: char
                                                    }, j, false, {
                                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cta,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                    children: "Read article"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightSideControls,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nav,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].prev,
                                        onClick: handlePrev,
                                        "aria-label": "Previous slide",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                viewBox: "0 0 4 5",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                    d: "M0 2.5L3.75 4.66506L3.75 0.334936L0 2.5Z",
                                                    fill: "currentColor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navHoverEffect
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navDivider
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].next,
                                        onClick: handleNext,
                                        "aria-label": "Next slide",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                viewBox: "0 0 4 5",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                    d: "M0 2.5L3.75 4.66506L3.75 0.334936L0 2.5Z",
                                                    fill: "currentColor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navHoverEffect
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nextUp,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                                    children: "Next up"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nextTitle,
                                    children: carouselItems[(activeIndex + 1) % carouselItems.length].nextTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].progressBar,
                                    style: {
                                        '--p': progress
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HeroCarousel/HeroCarousal.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = HeroCarousel;
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
  "caption": "ScrollSection-module__5_nnia__caption",
  "captionSmall": "ScrollSection-module__5_nnia__captionSmall",
  "chapterOne": "ScrollSection-module__5_nnia__chapterOne",
  "chapterTitle": "ScrollSection-module__5_nnia__chapterTitle",
  "image": "ScrollSection-module__5_nnia__image",
  "image1": "ScrollSection-module__5_nnia__image1",
  "image2": "ScrollSection-module__5_nnia__image2",
  "image3": "ScrollSection-module__5_nnia__image3",
  "image4": "ScrollSection-module__5_nnia__image4",
  "image5": "ScrollSection-module__5_nnia__image5",
  "imageInner": "ScrollSection-module__5_nnia__imageInner",
  "label1": "ScrollSection-module__5_nnia__label1",
  "label2": "ScrollSection-module__5_nnia__label2",
  "label3": "ScrollSection-module__5_nnia__label3",
  "label4": "ScrollSection-module__5_nnia__label4",
  "label5": "ScrollSection-module__5_nnia__label5",
  "section": "ScrollSection-module__5_nnia__section",
  "sectionContent": "ScrollSection-module__5_nnia__sectionContent",
  "sectionGrid": "ScrollSection-module__5_nnia__sectionGrid",
  "wrapper": "ScrollSection-module__5_nnia__wrapper",
});
}}),
"[project]/src/components/ScrollSection/ScrollSection.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// components/ScrollSection/ScrollSection.tsx
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
const ScrollSection = ()=>{
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [isActive, setIsActive] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    document.querySelector('.scrollSectionContainer')?.classList.add('fullView');
                } else {
                    document.querySelector('.scrollSectionContainer')?.classList.remove('fullView');
                }
            });
        }, {
            threshold: 0.1
        });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return ()=>{
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            if (!sectionRef.current || !containerRef.current) return;
            const sectionTop = sectionRef.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const scrollRatio = 1 - Math.max(0, Math.min(1, sectionTop / windowHeight));
            // Activate section when scrolled into view
            if (scrollRatio > 0.3 && !isActive) {
                setIsActive(true);
            } else if (scrollRatio <= 0.3 && isActive) {
                setIsActive(false);
            }
            // Scale and transform based on scroll position
            if (isActive) {
                const scaleValue = 0.8 + (1 - 0.8) * scrollRatio;
                const translateY = -100 * (1 - scrollRatio);
                containerRef.current.style.transform = `scale(${scaleValue}) translateY(${translateY}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, [
        isActive
    ]);
    const articles = [
        {
            id: 1,
            title: "Cartier Celebrates 100 Years of Trinity",
            image: "/watches.jpg",
            link: "/en/article/100-years-of-trinity/",
            width: 1920,
            height: 1080
        },
        {
            id: 2,
            title: "Trinity: A Contemporary Icon",
            image: "/caps.jpg",
            link: "/en/article/trinity-a-contemporary-icon/",
            width: 1920,
            height: 1080
        },
        {
            id: 3,
            title: "All Linked by Trinity",
            image: "/perfumes.jpg",
            link: "/en/article/all-linked-by-trinity/",
            width: 1920,
            height: 1080
        },
        {
            id: 4,
            title: "Trinity, A Symbol of Unity",
            image: "/sunglasses.jpg",
            link: "/en/article/trinity-a-symbol-of-unity/",
            width: 1920,
            height: 1080
        },
        {
            id: 5,
            title: "Trinity 100, The Journey of Trinity",
            image: "/jackets.jpg",
            link: "/en/article/trinity-1000-the-journey-of-trinity/",
            width: 1920,
            height: 1080
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].wrapper,
        id: "chapters",
        ref: sectionRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].section} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].noWebGL}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionContent} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].desktopContent}`,
                style: {
                    transform: 'scale(0.8) translateY(100px)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caption,
                            children: "Chapter One"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].chapterTitle,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            children: [
                                "3 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    children: "is the"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 120,
                                    columnNumber: 21
                                }, this),
                                " MAGIC NUMBER"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionGrid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].chapterOne}`,
                        children: articles.map((article, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].image} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"][`image${index + 1}`]}`,
                                        href: article.link,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            alt: "",
                                            fill: true,
                                            sizes: "(max-width: 768px) 100vw, 50vw",
                                            src: article.image,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].imageInner,
                                            quality: 90,
                                            placeholder: "blur",
                                            blurDataURL: `data:image/svg+xml;base64,${toBase64(shimmer(article.width, article.height))}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                            lineNumber: 130,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].captionSmall} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].label} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"][`label${index + 1}`]}`,
                                        children: article.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `desktop-${article.id}`, true, {
                                fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollSection/ScrollSection.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
};
// Utility functions for blur placeholder
const shimmer = (w, h)=>`
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
const toBase64 = (str)=>("TURBOPACK compile-time truthy", 1) ? Buffer.from(str).toString('base64') : ("TURBOPACK unreachable", undefined);
const __TURBOPACK__default__export__ = ScrollSection;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__082dd4e3._.js.map