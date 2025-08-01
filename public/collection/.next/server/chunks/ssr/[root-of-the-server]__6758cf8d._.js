module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/components/HeroCarousel/HeroCarousel.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "HeroCarousel-module__UHK0hG__active",
  "bgCarousel": "HeroCarousel-module__UHK0hG__bgCarousel",
  "caption": "HeroCarousel-module__UHK0hG__caption",
  "carouselWrapper": "HeroCarousel-module__UHK0hG__carouselWrapper",
  "char": "HeroCarousel-module__UHK0hG__char",
  "cover": "HeroCarousel-module__UHK0hG__cover",
  "cta": "HeroCarousel-module__UHK0hG__cta",
  "cursorLabel": "HeroCarousel-module__UHK0hG__cursorLabel",
  "cursorOutline": "HeroCarousel-module__UHK0hG__cursorOutline",
  "fg": "HeroCarousel-module__UHK0hG__fg",
  "fgCarousel": "HeroCarousel-module__UHK0hG__fgCarousel",
  "heroCarousel": "HeroCarousel-module__UHK0hG__heroCarousel",
  "nav": "HeroCarousel-module__UHK0hG__nav",
  "next": "HeroCarousel-module__UHK0hG__next",
  "nextTitle": "HeroCarousel-module__UHK0hG__nextTitle",
  "prev": "HeroCarousel-module__UHK0hG__prev",
  "progress": "HeroCarousel-module__UHK0hG__progress",
  "progressBar": "HeroCarousel-module__UHK0hG__progressBar",
  "siteHeadline": "HeroCarousel-module__UHK0hG__siteHeadline",
  "space": "HeroCarousel-module__UHK0hG__space",
  "textCarousel": "HeroCarousel-module__UHK0hG__textCarousel",
  "textCarouselItem": "HeroCarousel-module__UHK0hG__textCarouselItem",
  "video": "HeroCarousel-module__UHK0hG__video",
  "videoMask": "HeroCarousel-module__UHK0hG__videoMask",
  "videos": "HeroCarousel-module__UHK0hG__videos",
});
}}),
"[project]/src/app/components/HeroCarousel/HeroCarousal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/components/HeroCarousel/HeroCarousel.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/components/HeroCarousel/HeroCarousel.module.css [app-ssr] (css module)");
'use client';
;
;
;
const HeroCarousel = ()=>{
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const progressInterval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const fgVideoRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const carouselItems = [
        {
            bgVideo: '/videos/hero-carousel/1_Creative_Alchemy_Desktop.mp4',
            fgVideo: '/videos/hero-carousel/1_Creative_Alchemy_Secondary.mp4',
            title: 'A precious new hybrid',
            nextTitle: 'Venice film festival'
        },
        {
            bgVideo: '/videos/hero-carousel/2_Trinity_Desktop.mp4',
            fgVideo: '/videos/hero-carousel/2_Trinity-secondary-test.mp4',
            title: '3 is the magic number',
            nextTitle: 'Creative Alchemy'
        },
        {
            bgVideo: '/videos/hero-carousel/3_Precious_Hybrid_Desktop.mp4',
            fgVideo: '/videos/hero-carousel/3_Precious_Hybrid_Secondary-test.mp4',
            title: 'Shake up the senses',
            nextTitle: 'Time is an illusion'
        },
        {
            bgVideo: '/videos/hero-carousel/4_Venice_Desktop.mp4',
            fgVideo: '/videos/hero-carousel/4_Venice_Secondary-test.mp4',
            title: 'Appear and disappear',
            nextTitle: 'The power of transformation'
        },
        {
            bgVideo: '/videos/hero-carousel/5_TimeIllusion_Desktop.mp4',
            fgVideo: '/videos/hero-carousel/5_TimeIllusion-secondary-test.mp4',
            title: 'Create the unexpected',
            nextTitle: 'The 365 rendez-vous'
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
                return prev + 0.5;
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const safePlay = (video)=>{
            if (!video) return;
            try {
                video.currentTime = 0;
                video.pause();
                video.play();
            } catch (err) {
                console.warn('Autoplay failed:', err);
            }
        };
        videoRefs.current.forEach((v)=>{
            if (v) {
                v.currentTime = 0;
                v.pause();
            }
        });
        fgVideoRefs.current.forEach((v)=>{
            if (v) {
                v.currentTime = 0;
                v.pause();
            }
        });
        safePlay(videoRefs.current[activeIndex]);
        safePlay(fgVideoRefs.current[activeIndex]);
        const prevIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
        safePlay(videoRefs.current[prevIndex]);
        safePlay(fgVideoRefs.current[prevIndex]);
    }, [
        activeIndex
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroCarousel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].carouselWrapper,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bgCarousel,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].videos,
                            children: carouselItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
                  ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].videoMask}
                  ${index === activeIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}
                  ${index === (activeIndex - 1 + carouselItems.length) % carouselItems.length ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].prev : ''}
                `,
                                    style: {
                                        transform: `
                    ${index === activeIndex ? 'scale(1.09328) skewX(4deg)' : ''}
                    ${index < activeIndex ? 'translateX(-110%) scale(1.09328) skewX(4deg)' : ''}
                    ${index > activeIndex ? 'translateX(110%) scale(1.09328) skewX(4deg)' : ''}
                  `
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].videoMask} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cover}`,
                                        style: {
                                            transform: `
                      ${index === activeIndex ? 'scale(1.09328) skewX(-4deg)' : ''}
                      ${index < activeIndex ? 'translateX(110%) scale(1.09328) skewX(-4deg)' : ''}
                      ${index > activeIndex ? 'translateX(-110%) scale(1.09328) skewX(-4deg)' : ''}
                    `
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                            ref: (el)=>{
                                                videoRefs.current[index] = el;
                                            },
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].video,
                                            src: item.bgVideo,
                                            playsInline: true,
                                            loop: true,
                                            muted: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this)
                                }, `bg-${index}`, false, {
                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fg,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fgCarousel,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].videos,
                                    children: carouselItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `
                    ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].videoMask}
                    ${index === activeIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}
                    ${index === (activeIndex - 1 + carouselItems.length) % carouselItems.length ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].prev : ''}
                  `,
                                            style: {
                                                transform: `
                      ${index === activeIndex ? 'scale(1.08975) skewX(4deg)' : ''}
                      ${index < activeIndex ? 'translateX(-110%) scale(1.08975) skewX(4deg)' : ''}
                      ${index > activeIndex ? 'translateX(110%) scale(1.08975) skewX(4deg)' : ''}
                    `
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].videoMask} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cover}`,
                                                style: {
                                                    transform: `
                        ${index === activeIndex ? 'scale(1.08975) skewX(-4deg)' : ''}
                        ${index < activeIndex ? 'translateX(110%) scale(1.08975) skewX(-4deg)' : ''}
                        ${index > activeIndex ? 'translateX(-110%) scale(1.08975) skewX(-4deg)' : ''}
                      `
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    ref: (el)=>{
                                                        fgVideoRefs.current[index] = el;
                                                    },
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].video,
                                                    src: item.fgVideo,
                                                    playsInline: true,
                                                    loop: true,
                                                    muted: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this)
                                        }, `fg-${index}`, false, {
                                            fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textCarousel,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textCarouselItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].siteHeadline,
                                                children: carouselItems[activeIndex].title.split(' ').map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                        children: [
                                                            i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].char} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].space}`,
                                                                children: " "
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 33
                                                            }, this),
                                                            word.split('').map((char, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].char,
                                                                    style: {
                                                                        opacity: 1,
                                                                        filter: 'blur(0px) brightness(1)',
                                                                        willChange: 'transform'
                                                                    },
                                                                    children: char
                                                                }, j, false, {
                                                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                                    lineNumber: 224,
                                                                    columnNumber: 25
                                                                }, this))
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 219,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].next,
                                            style: {
                                                opacity: 1,
                                                willChange: 'transform'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                                                    children: "Next up"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nextTitle,
                                                    children: carouselItems[(activeIndex + 1) % carouselItems.length].nextTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].progressBar,
                                                    style: {
                                                        '--v': 'visible',
                                                        '--p': progress
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cta,
                                            style: {
                                                opacity: 1,
                                                willChange: 'transform'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                                                children: "Read article"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nav,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].prev,
                                onClick: handlePrev,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 4 5",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 2.5L3.75 4.66506L3.75 0.334936L0 2.5Z",
                                        fill: "currentColor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].next,
                                onClick: handleNext,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 4 5",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 2.5L3.75 4.66506L3.75 0.334936L0 2.5Z",
                                        fill: "currentColor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].progress,
                        children: carouselItems.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].progressBar,
                                style: {
                                    '--v': index === activeIndex ? 'visible' : 'hidden',
                                    '--p': index === activeIndex ? progress : 0
                                }
                            }, `progress-${index}`, false, {
                                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cursorOutline,
                style: {
                    opacity: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    "aria-hidden": "true",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                    children: "Read article"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cursorLabel,
                style: {
                    opacity: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$HeroCarousel$2f$HeroCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                    children: "Read article"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/HeroCarousel/HeroCarousal.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = HeroCarousel;
}}),
"[project]/src/app/components/ScrollSection/ScrollSection.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "caption": "ScrollSection-module__NtoM5q__caption",
  "captionSmall": "ScrollSection-module__NtoM5q__captionSmall",
  "chapterOne": "ScrollSection-module__NtoM5q__chapterOne",
  "chapterTitle": "ScrollSection-module__NtoM5q__chapterTitle",
  "desktopContent": "ScrollSection-module__NtoM5q__desktopContent",
  "image": "ScrollSection-module__NtoM5q__image",
  "image1": "ScrollSection-module__NtoM5q__image1",
  "image2": "ScrollSection-module__NtoM5q__image2",
  "image3": "ScrollSection-module__NtoM5q__image3",
  "image4": "ScrollSection-module__NtoM5q__image4",
  "image5": "ScrollSection-module__NtoM5q__image5",
  "label": "ScrollSection-module__NtoM5q__label",
  "label1": "ScrollSection-module__NtoM5q__label1",
  "label2": "ScrollSection-module__NtoM5q__label2",
  "label3": "ScrollSection-module__NtoM5q__label3",
  "label4": "ScrollSection-module__NtoM5q__label4",
  "label5": "ScrollSection-module__NtoM5q__label5",
  "mobileContent": "ScrollSection-module__NtoM5q__mobileContent",
  "section": "ScrollSection-module__NtoM5q__section",
  "sectionContent": "ScrollSection-module__NtoM5q__sectionContent",
  "sectionGrid": "ScrollSection-module__NtoM5q__sectionGrid",
  "transitionImage": "ScrollSection-module__NtoM5q__transitionImage",
  "wrapper": "ScrollSection-module__NtoM5q__wrapper",
});
}}),
"[project]/src/app/components/ScrollSection/ScrollSection.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// components/ScrollSection/ScrollSection.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/components/ScrollSection/ScrollSection.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
const ScrollSection = ()=>{
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            if (!sectionRef.current) return;
            const sectionTop = sectionRef.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const scrollRatio = 1 - Math.max(0, Math.min(1, sectionTop / windowHeight));
            // Scale the desktop content based on scroll position
            if (sectionRef.current) {
                const scaleValue = 0.821 + (1 - 0.821) * scrollRatio;
                sectionRef.current.style.transform = `scale(${scaleValue})`;
            }
            // Animate images based on scroll position
            imagesRef.current.forEach((img, index)=>{
                if (img) {
                    const delay = index * 0.1;
                    const opacity = scrollRatio > delay ? 1 : 0;
                    const blur = scrollRatio > delay ? 0 : 10;
                    const brightness = scrollRatio > delay ? 1 : 0.5;
                    img.style.opacity = `${opacity}`;
                    img.style.filter = `blur(${blur}px) brightness(${brightness})`;
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    const articles = [
        {
            id: 1,
            title: "Cartier Celebrates 100 Years of Trinity",
            image: "/images/chapter-1/article-1/Article-Header.jpg",
            link: "/en/article/100-years-of-trinity/",
            description: "Explore how Trinity, Cartier's founding icon, embodies love and emotion through its timeless beauty and innovative design.",
            width: 1920,
            height: 1080
        },
        {
            id: 2,
            title: "Trinity: A Contemporary Icon",
            image: "/images/chapter-1/article-2/Article-Header.jpg",
            link: "/en/article/trinity-a-contemporary-icon/",
            description: "Discover how the iconic 1924 Trinity ring redefined jewelry as a timeless symbol of love and creativity.",
            width: 1920,
            height: 1080
        },
        {
            id: 3,
            title: "All Linked by Trinity",
            image: "/images/chapter-1/article-3/Article-Header.jpg",
            link: "/en/article/all-linked-by-trinity/",
            description: "Five Cartier global ambassadors share their personal connections to Cartier's iconic Trinity rings, symbols rich in meaning and emotion.",
            width: 1920,
            height: 1080
        },
        {
            id: 4,
            title: "Trinity, A Symbol of Unity",
            image: "/images/chapter-1/article-4/Article-Header.jpg",
            link: "/en/article/trinity-a-symbol-of-unity/",
            description: "An icon whose values are passed on by the Friends of the Maison.",
            width: 1920,
            height: 1080
        },
        {
            id: 5,
            title: "Trinity 100, The Journey of Trinity",
            image: "/images/chapter-1/article-5/Article-Header.jpg",
            link: "/en/article/trinity-1000-the-journey-of-trinity/",
            description: "Cartier Celebrates Trinity's 100th Anniversary With an Immersive Journey in the Form of a Unique Pop-Up",
            width: 1920,
            height: 1080
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].wrapper,
        id: "chapters",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].noWebGL}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: sectionRef,
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionContent} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].desktopContent}`,
                    "aria-hidden": "true",
                    style: {
                        transform: 'scale(0.821)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'block',
                                    overflow: 'hidden',
                                    willChange: 'transform'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        display: 'inline-block',
                                        willChange: 'transform',
                                        transform: 'none'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                                        children: "Chapter One"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                        lineNumber: 104,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chapterTitle,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'block',
                                    overflow: 'hidden',
                                    willChange: 'transform'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        display: 'inline-block',
                                        willChange: 'transform',
                                        transform: 'none'
                                    },
                                    children: [
                                        "3 ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            children: "is the"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this),
                                        " MAGIC NUMBER"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionGrid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chapterOne}`,
                            children: articles.map((article, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][`image${index + 1}`]}`,
                                            ref: (el)=>{
                                                imagesRef.current[index] = el;
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                            lineNumber: 118,
                                            columnNumber: 5
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].captionSmall} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][`label${index + 1}`]}`,
                                            children: article.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                            lineNumber: 124,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, `desktop-${article.id}`, true, {
                                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 117,
                                    columnNumber: 3
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionContent} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileContent}`,
                    "aria-hidden": "false",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                                children: "Chapter One"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chapterTitle,
                            children: [
                                "3 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    children: "is the"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 138,
                                    columnNumber: 49
                                }, this),
                                " MAGIC NUMBER"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionGrid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chapterOne}`,
                            children: articles.map((article, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].image} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][`image${index + 1}`]}`,
                                            href: article.link,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].transitionImage,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    alt: "",
                                                    role: "presentation",
                                                    loading: "lazy",
                                                    quality: 85,
                                                    fill: true,
                                                    sizes: "(max-width: 768px) 100vw, 50vw",
                                                    src: article.image,
                                                    style: {
                                                        objectFit: 'cover',
                                                        color: 'transparent'
                                                    },
                                                    placeholder: "blur",
                                                    blurDataURL: `data:image/svg+xml;base64,${toBase64(shimmer(article.width, article.height))}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                                lineNumber: 146,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].captionSmall} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ScrollSection$2f$ScrollSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][`label${index + 1}`]}`,
                                            children: article.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `mobile-${article.id}`, true, {
                                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/ScrollSection/ScrollSection.tsx",
        lineNumber: 91,
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

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6758cf8d._.js.map