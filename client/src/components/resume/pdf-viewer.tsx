"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const ResumeViewer = () => {
  const [isFitToScreen, setIsFitToScreen] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // A4 dimensions in pixels (approximate at 96 DPI)
  const RESUME_WIDTH = 794;
  const RESUME_HEIGHT = 1123;

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        // Small buffer to prevent scrollbars from appearing due to rounding errors
        const paddingBufferX = 0;
        const paddingBufferY = 0;

        if (isFitToScreen) {
          // FIT MODE: Calculate scale based on the tightest dimension (Width or Height)
          // We subtract a small amount (e.g. 40px) for a nice visual margin in Fit Mode
          const margin = 20;
          const scaleX = (containerWidth - margin) / RESUME_WIDTH;
          const scaleY = (containerHeight - margin) / RESUME_HEIGHT;
          setScale(Math.min(scaleX, scaleY));
        } else {
          // SCROLL MODE: Fit to width only
          // Allow full width
          const scaleX = containerWidth / RESUME_WIDTH;
          setScale(scaleX);
        }
      }
    };

    // Initial calculation
    calculateScale();

    // Recalculate on resize
    const observer = new ResizeObserver(calculateScale);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isFitToScreen]);

  return (
    <ScrollArea
      ref={containerRef}
      className={`relative w-full h-full duration-300 ${
        isFitToScreen
          ? "items-center overflow-hidden"
          : "items-start overflow-y-auto overflow-x-hidden font-montserrat"
      }`}
    >
      <Button
        onClick={() => setIsFitToScreen(!isFitToScreen)}
        className="absolute bottom-6 right-6 z-50  rounded-full  transition-all hover:scale-105 font-bold text-sm"
        size="icon"
      >
        {isFitToScreen ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
      </Button>
      <div
        className={cn(
          "relative w-full h-full flex justify-center bg-[#fff2e2] transition-all duration-300"
        )}
      >
        {/* --- TOGGLE BUTTON --- */}

        {/* --- SIZING WRAPPER --- */}
        {/* This div forces the DOM to recognize the SCALED size, preventing phantom whitespace */}
        <div
          style={{
            width: RESUME_WIDTH * scale,
            height: RESUME_HEIGHT * scale,
          }}
          className={`relative  shrink-0 transition-all duration-200 ease-in-out ${
            isFitToScreen ? "" : "my-0"
          }`}
        >
          {/* --- TRANSFORM WRAPPER --- */}
          {/* This div applies the visual scaling to the inner content */}
          <div
            style={{
              width: RESUME_WIDTH,
              height: RESUME_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left", // Crucial: Scale from top-left so it fits into the Sizing Wrapper
            }}
            className="bg-[#fff2e2] overflow-hidden origin-top-left"
          >
            {/* =====================================================================================
              RESUME CONTENT (Exact Design)
             ===================================================================================== */}

            <div className="w-full h-full p-12 flex flex-col">
              {/* --- HEADER --- */}
              <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-violet-600 uppercase tracking-wide mb-2">
                  Masani Yasovardhan
                </h1>

                <div className="text-violet-500 font-bold uppercase text-xs tracking-widest mb-3">
                  Full Stack Developer{" "}
                  <span className="text-violet-300 mx-1">•</span> Hyderabad,
                  India
                </div>

                <div className="flex justify-center items-center gap-4 text-xs text-gray-600 mb-2 font-medium">
                  <span>+91 99896 19928</span>
                  <span className="text-violet-300">•</span>
                  <a
                    href="mailto:yasovardhanmasani@gmail.com"
                    className="hover:text-violet-600"
                  >
                    yasovardhanmasani@gmail.com
                  </a>
                </div>

                <div className="flex justify-center items-center gap-3 text-xs font-medium">
                  <span className="text-violet-500">Portfolio:</span>
                  <a
                    href="https://codecomfort.online"
                    className="text-gray-600 hover:text-violet-600"
                  >
                    codecomfort.online
                  </a>
                  <span className="text-gray-300">|</span>

                  <span className="text-violet-500">GitHub:</span>
                  <a
                    href="https://www.github.com/codecomfortcc"
                    className="text-gray-600 hover:text-violet-600"
                  >
                    github.com/codecomfortcc
                  </a>
                  <span className="text-gray-300">|</span>

                  <span className="text-violet-500">LinkedIn:</span>
                  <a
                    href="https://www.linkedin.com/in/yasovardhanmasani"
                    className="text-gray-600 hover:text-violet-600"
                  >
                    linkedin.com/in/yasovardhanmasani
                  </a>
                </div>
              </header>

              {/* --- COLUMNS --- */}
              <div className="flex flex-row h-full gap-8">
                {/* LEFT COLUMN (35%) */}
                <div className="w-[32%] flex flex-col gap-6 border-r border-violet-100 pr-4">
                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-3">
                      Education
                    </h2>
                    <div className="text-xs text-gray-800 space-y-1">
                      <p className="font-bold text-sm">B. Tech</p>
                      <p className="font-bold">PBR Visvodaya Institute of</p>
                      <p className="font-bold">Technology and Science</p>
                      <p className="text-gray-600">
                        Electronics & Communication
                      </p>
                      <p className="text-gray-600">Engineering</p>
                      <p className="font-bold mt-2">2019–2023 | 63.4%</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-3">
                      Languages
                    </h2>
                    <div className="text-xs text-gray-700 space-y-2">
                      <p>English (Fluent)</p>
                      <p>Telugu (Native)</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-3">
                      Soft Skills
                    </h2>
                    <div className="text-xs text-gray-700 space-y-1.5 leading-relaxed">
                      <p>Problem Solving skills</p>
                      <p>Verbal communication skills</p>
                      <p>Attention to Detail</p>
                      <p>Clean Code Practices</p>
                      <p>API Design</p>
                      <p>UI/UX Awareness</p>
                      <p>Performance Optimization</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-3">
                      Certifications
                    </h2>
                    <div className="text-xs text-gray-700">
                      <p className="mb-1">Full stack developer –</p>
                      <p>CODEDAMN</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-3">
                      Portfolio Snapshot
                    </h2>
                    <ul className="text-xs text-gray-700 space-y-1.5 list-none">
                      <li>5+ full-stack apps</li>
                      <li>3000+ real users (Visvotsav)</li>
                      <li>Stripe payments integrations</li>
                      <li>GSAP animations</li>
                      <li>Next.js 14 server actions</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-3">
                      Deployment Skills
                    </h2>
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Vercel deployments</p>
                      <p>Environment management</p>
                      <p>Build optimization</p>
                      <p>CI/CD basics</p>
                    </div>
                  </section>
                </div>

                {/* RIGHT COLUMN (65%) */}
                <div className="w-[68%] flex flex-col gap-5 pt-1">
                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-2">
                      Summary
                    </h2>
                    <p className="text-xs text-gray-700 leading-relaxed text-justify">
                      Full-stack developer skilled in React, Next.js, Node.js,
                      MongoDB, Prisma, and modern UI libraries. Built
                      production-ready apps using Stripe, server actions, Google
                      Sheets API, and shadcn/ui. Strong in frontend + backend
                      architecture, clean code practices, and performance
                      optimization.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-2">
                      Experience
                    </h2>
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 text-sm">
                        Freelance Web Developer
                      </h3>
                      <div className="text-xs font-bold text-gray-800 mb-2">
                        Tesserart (DEC 2024 – JUL 2025)
                      </div>
                      <ul className="list-disc list-outside ml-3 text-xs text-gray-700 space-y-1 leading-normal marker:text-gray-500">
                        <li>
                          Building Tesserart a T-shirt selling brand developed
                          using Next.js.
                        </li>
                        <li>
                          100+ customers used the website. Improving the revenue
                          by 20%.
                        </li>
                        <li>
                          Migrating product catalog & improving user experience.
                        </li>
                        <li>
                          Implementing responsive UI, performance improvements,
                          and SEO.
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-2">
                      Projects
                    </h2>

                    <div className="mb-4">
                      <div className="flex items-center gap-1 mb-1 text-xs">
                        <span className="text-violet-500">[Link]</span>
                        <span className="font-bold text-gray-900">
                          - Case Code (E-commerce Website)
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-3 text-xs text-gray-700 space-y-1 marker:text-gray-500">
                        <li>
                          Built using Next.js 14 with server actions for fast
                          backend operations.
                        </li>
                        <li>
                          Integrated Stripe for secure payments (50+ test
                          transactions).
                        </li>
                        <li>Designed responsive UI with shadcn/ui.</li>
                      </ul>
                    </div>

                    <div className="mb-1">
                      <div className="flex items-center gap-1 mb-1 text-xs">
                        <span className="text-violet-500">[Link]</span>
                        <span className="font-bold text-gray-900">
                          - Visvotsav (College Fest Platform)
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-3 text-xs text-gray-700 space-y-1 marker:text-gray-500">
                        <li>
                          Handled 3000+ registration submissions from students.
                        </li>
                        <li>
                          Built React frontend + Node.js backend with Google
                          Sheets as database.
                        </li>
                        <li>
                          Designed a user-friendly registration flow used by the
                          entire student community.
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-2">
                      Skills
                    </h2>
                    <div className="text-xs text-gray-700 space-y-2 leading-relaxed">
                      <div>
                        <span className="font-bold text-gray-900">
                          Frontend:
                        </span>{" "}
                        React, Next.js, Tailwind, shadcn/ui, GSAP
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">
                          Backend:
                        </span>{" "}
                        Node.js, Express, NestJS, Hono, Socket.io, Tokio
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">
                          Databases & ORM:
                        </span>{" "}
                        MongoDB, SQL, Redis, Prisma, Drizzle
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Tools:</span>{" "}
                        Git, GitHub, Stripe API, Postman
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">
                          Programming Languages:
                        </span>{" "}
                        JavaScript, TypeScript, Rust, Java (Basics), C# (Basics)
                      </div>
                    </div>
                  </section>

                  <section className="mt-2">
                    <h2 className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-2">
                      Achievements
                    </h2>
                    <p className="text-xs text-gray-700">
                      Built and deployed Visvotsav fest platform used by 3000+
                      students for registrations.
                    </p>
                  </section>
                </div>
              </div>
            </div>
            {/* --- END RESUME CONTENT --- */}
          </div>
        </div>
      </div>
      <div className="w-full h-20 absolute bottom-0 left-0 bg-gradient-to-b from-transparent via-transparent  to-violet-400/10">
   
      </div>
    </ScrollArea>
  );
};

export default ResumeViewer;
