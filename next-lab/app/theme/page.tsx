"use client";

import { useEffect } from "react";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function Theme() {
  function toggleDark2() {
    const el = document.getElementById("theme-manual");
    el?.classList.toggle("dark2");
  }

  function toggleThreeTheme(t: number) {
    switch (t) {
      case 0:
        localStorage.setItem("next-lab-theme", "light"); // can be anything other than dark2, depends on css
        break;
      case 1:
        localStorage.setItem("next-lab-theme", "dark2");
        break;
      case 2:
        localStorage.removeItem("next-lab-theme");
        break;
    }
    updateThemeThree();
  }

  function updateThemeThree() {
    const el = document.getElementById("theme-three")!;
    el.classList.forEach((className) => {
      el.classList.toggle(className, false);
    });
    const storedTheme = localStorage.getItem("next-lab-theme");
    if (storedTheme) {
      console.log("applying stored theme: ", storedTheme);
      el.classList.toggle(storedTheme, true);
    } else {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark2"
        : "light";
      console.log("applying system theme: ", theme);
      el.classList.toggle(theme, true);
    }
  }

  function toggleMultiTheme(t: number) {
    const el = document.getElementById("theme-multiple")!;
    el.classList.forEach((className) => {
      el.classList.toggle(className, false);
    });
    switch (t) {
      case 0:
        break;
      case 1:
        el.classList.toggle("dark2", true);
        break;
      case 2:
        el.classList.toggle("special", true);
        break;
    }
  }

  useEffect(() => {
    updateThemeThree();
  }, []);

  return (
    <>
      {/* System driven */}
      <div className="flex flex-row justify-center gap-8">
        <div>
          <div className="mb-4 h-16">System driven (prefers-color-scheme)</div>
          <div className="theme-system-driven max-w-[500px]">{text}</div>
        </div>

        {/* Manual light-dark */}
        <div>
          <div className="mb-4 h-16">
            Manual light/dark
            <button className="border" onClick={toggleDark2}>
              Toggle
            </button>
          </div>
          <div id="theme-manual" className="theme-manual max-w-[500px]">
            <div className="dark2">{text}</div>
          </div>
        </div>

        {/* Manual light/dark/system */}
        <div>
          <div className="mb-4 h-16">
            Manual light/dark/system
            <div>
              <button
                className="border"
                onClick={() => {
                  toggleThreeTheme(0);
                }}
              >
                Light
              </button>
              <button
                className="border"
                onClick={() => {
                  toggleThreeTheme(1);
                }}
              >
                Dark
              </button>
              <button
                className="border"
                onClick={() => {
                  toggleThreeTheme(2);
                }}
              >
                System
              </button>
            </div>
          </div>
          <div id="theme-three" className="">
            <div className="theme-three max-w-[500px]">{text}</div>
          </div>
        </div>

        {/* Manual multiple */}
        <div>
          <div className="mb-4 h-16">
            Manual light/dark
            <div>
              <button
                className="border"
                onClick={() => {
                  toggleMultiTheme(0);
                }}
              >
                Light
              </button>
              <button
                className="border"
                onClick={() => {
                  toggleMultiTheme(1);
                }}
              >
                Dark2
              </button>
              <button
                className="border"
                onClick={() => {
                  toggleMultiTheme(2);
                }}
              >
                Special
              </button>
            </div>
          </div>
          <div id="theme-multiple" className="">
            <div className="theme-multiple max-w-[500px]">{text}</div>
          </div>
        </div>
      </div>
    </>
  );
}
